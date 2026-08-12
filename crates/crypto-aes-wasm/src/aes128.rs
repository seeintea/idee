use core::fmt;

const BLOCK_SIZE: usize = 16;
const ROUND_KEY_SIZE: usize = 176;
const S_BOX: [u8; 256] = build_s_box();
const INVERSE_S_BOX: [u8; 256] = build_inverse_s_box();

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DecryptError {
    InvalidCiphertextLength,
    InvalidPadding,
}

impl fmt::Display for DecryptError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::InvalidCiphertextLength => formatter.write_str("invalid ciphertext length"),
            Self::InvalidPadding => formatter.write_str("invalid padding"),
        }
    }
}

pub fn encrypt_cbc(key: &[u8; BLOCK_SIZE], iv: &[u8; BLOCK_SIZE], plaintext: &[u8]) -> Vec<u8> {
    let round_keys = expand_key(key);
    let padding = BLOCK_SIZE - plaintext.len() % BLOCK_SIZE;
    let mut padded = Vec::with_capacity(plaintext.len() + padding);
    padded.extend_from_slice(plaintext);
    padded.resize(plaintext.len() + padding, padding as u8);

    let mut previous = *iv;
    for block in padded.chunks_exact_mut(BLOCK_SIZE) {
        for index in 0..BLOCK_SIZE {
            block[index] ^= previous[index];
        }
        let mut state = block.try_into().expect("AES block is always 16 bytes");
        encrypt_block(&mut state, &round_keys);
        block.copy_from_slice(&state);
        previous = state;
    }
    padded
}

pub fn decrypt_cbc(
    key: &[u8; BLOCK_SIZE],
    iv: &[u8; BLOCK_SIZE],
    ciphertext: &[u8],
) -> Result<Vec<u8>, DecryptError> {
    if ciphertext.is_empty() || !ciphertext.len().is_multiple_of(BLOCK_SIZE) {
        return Err(DecryptError::InvalidCiphertextLength);
    }

    let round_keys = expand_key(key);
    let mut plaintext = Vec::with_capacity(ciphertext.len());
    let mut previous = *iv;
    for block in ciphertext.chunks_exact(BLOCK_SIZE) {
        let current: [u8; BLOCK_SIZE] = block.try_into().expect("AES block is always 16 bytes");
        let mut state = current;
        decrypt_block(&mut state, &round_keys);
        for index in 0..BLOCK_SIZE {
            state[index] ^= previous[index];
        }
        plaintext.extend_from_slice(&state);
        previous = current;
    }

    let padding = *plaintext.last().ok_or(DecryptError::InvalidPadding)? as usize;
    if padding == 0
        || padding > BLOCK_SIZE
        || !plaintext[plaintext.len() - padding..]
            .iter()
            .all(|&byte| byte as usize == padding)
    {
        return Err(DecryptError::InvalidPadding);
    }
    plaintext.truncate(plaintext.len() - padding);
    Ok(plaintext)
}

fn encrypt_block(state: &mut [u8; BLOCK_SIZE], round_keys: &[u8; ROUND_KEY_SIZE]) {
    add_round_key(state, &round_keys[..BLOCK_SIZE]);
    for round in 1..10 {
        sub_bytes(state);
        shift_rows(state);
        mix_columns(state);
        add_round_key(
            state,
            &round_keys[round * BLOCK_SIZE..(round + 1) * BLOCK_SIZE],
        );
    }
    sub_bytes(state);
    shift_rows(state);
    add_round_key(state, &round_keys[160..]);
}

fn decrypt_block(state: &mut [u8; BLOCK_SIZE], round_keys: &[u8; ROUND_KEY_SIZE]) {
    add_round_key(state, &round_keys[160..]);
    for round in (1..10).rev() {
        inverse_shift_rows(state);
        inverse_sub_bytes(state);
        add_round_key(
            state,
            &round_keys[round * BLOCK_SIZE..(round + 1) * BLOCK_SIZE],
        );
        inverse_mix_columns(state);
    }
    inverse_shift_rows(state);
    inverse_sub_bytes(state);
    add_round_key(state, &round_keys[..BLOCK_SIZE]);
}

fn expand_key(key: &[u8; BLOCK_SIZE]) -> [u8; ROUND_KEY_SIZE] {
    let mut expanded = [0_u8; ROUND_KEY_SIZE];
    expanded[..BLOCK_SIZE].copy_from_slice(key);
    let mut generated = BLOCK_SIZE;
    let mut rcon = 1_u8;
    let mut word = [0_u8; 4];

    while generated < ROUND_KEY_SIZE {
        word.copy_from_slice(&expanded[generated - 4..generated]);
        if generated.is_multiple_of(BLOCK_SIZE) {
            word.rotate_left(1);
            word.iter_mut().for_each(|byte| *byte = sbox(*byte));
            word[0] ^= rcon;
            rcon = galois_multiply(rcon, 2);
        }
        for byte in word {
            expanded[generated] = expanded[generated - BLOCK_SIZE] ^ byte;
            generated += 1;
        }
    }
    expanded
}

fn add_round_key(state: &mut [u8; BLOCK_SIZE], round_key: &[u8]) {
    for (byte, key_byte) in state.iter_mut().zip(round_key) {
        *byte ^= key_byte;
    }
}

fn sub_bytes(state: &mut [u8; BLOCK_SIZE]) {
    state.iter_mut().for_each(|byte| *byte = sbox(*byte));
}

fn inverse_sub_bytes(state: &mut [u8; BLOCK_SIZE]) {
    state
        .iter_mut()
        .for_each(|byte| *byte = inverse_sbox(*byte));
}

fn shift_rows(state: &mut [u8; BLOCK_SIZE]) {
    let old = *state;
    *state = [
        old[0], old[5], old[10], old[15], old[4], old[9], old[14], old[3], old[8], old[13], old[2],
        old[7], old[12], old[1], old[6], old[11],
    ];
}

fn inverse_shift_rows(state: &mut [u8; BLOCK_SIZE]) {
    let old = *state;
    *state = [
        old[0], old[13], old[10], old[7], old[4], old[1], old[14], old[11], old[8], old[5], old[2],
        old[15], old[12], old[9], old[6], old[3],
    ];
}

fn mix_columns(state: &mut [u8; BLOCK_SIZE]) {
    for column in state.chunks_exact_mut(4) {
        let [a, b, c, d] = [column[0], column[1], column[2], column[3]];
        column[0] = galois_multiply(a, 2) ^ galois_multiply(b, 3) ^ c ^ d;
        column[1] = a ^ galois_multiply(b, 2) ^ galois_multiply(c, 3) ^ d;
        column[2] = a ^ b ^ galois_multiply(c, 2) ^ galois_multiply(d, 3);
        column[3] = galois_multiply(a, 3) ^ b ^ c ^ galois_multiply(d, 2);
    }
}

fn inverse_mix_columns(state: &mut [u8; BLOCK_SIZE]) {
    for column in state.chunks_exact_mut(4) {
        let [a, b, c, d] = [column[0], column[1], column[2], column[3]];
        column[0] = galois_multiply(a, 14)
            ^ galois_multiply(b, 11)
            ^ galois_multiply(c, 13)
            ^ galois_multiply(d, 9);
        column[1] = galois_multiply(a, 9)
            ^ galois_multiply(b, 14)
            ^ galois_multiply(c, 11)
            ^ galois_multiply(d, 13);
        column[2] = galois_multiply(a, 13)
            ^ galois_multiply(b, 9)
            ^ galois_multiply(c, 14)
            ^ galois_multiply(d, 11);
        column[3] = galois_multiply(a, 11)
            ^ galois_multiply(b, 13)
            ^ galois_multiply(c, 9)
            ^ galois_multiply(d, 14);
    }
}

fn sbox(byte: u8) -> u8 {
    S_BOX[byte as usize]
}

fn inverse_sbox(byte: u8) -> u8 {
    INVERSE_S_BOX[byte as usize]
}

const fn build_s_box() -> [u8; 256] {
    let mut table = [0_u8; 256];
    let mut index = 0;
    while index < table.len() {
        table[index] = sbox_value(index as u8);
        index += 1;
    }
    table
}

const fn build_inverse_s_box() -> [u8; 256] {
    let mut table = [0_u8; 256];
    let mut index = 0;
    while index < table.len() {
        table[sbox_value(index as u8) as usize] = index as u8;
        index += 1;
    }
    table
}

const fn sbox_value(byte: u8) -> u8 {
    let inverse = if byte == 0 {
        0
    } else {
        galois_power_const(byte, 254)
    };
    inverse
        ^ inverse.rotate_left(1)
        ^ inverse.rotate_left(2)
        ^ inverse.rotate_left(3)
        ^ inverse.rotate_left(4)
        ^ 0x63
}

const fn galois_power_const(mut value: u8, mut exponent: u8) -> u8 {
    let mut result = 1_u8;
    while exponent > 0 {
        if exponent & 1 == 1 {
            result = galois_multiply_const(result, value);
        }
        value = galois_multiply_const(value, value);
        exponent >>= 1;
    }
    result
}

const fn galois_multiply_const(mut left: u8, mut right: u8) -> u8 {
    let mut result = 0_u8;
    let mut round = 0;
    while round < 8 {
        if right & 1 != 0 {
            result ^= left;
        }
        left = (left << 1) ^ if left & 0x80 != 0 { 0x1b } else { 0 };
        right >>= 1;
        round += 1;
    }
    result
}

fn galois_multiply(mut left: u8, mut right: u8) -> u8 {
    let mut result = 0_u8;
    for _ in 0..8 {
        if right & 1 != 0 {
            result ^= left;
        }
        left = (left << 1) ^ if left & 0x80 != 0 { 0x1b } else { 0 };
        right >>= 1;
    }
    result
}

#[cfg(test)]
mod tests {
    use super::{decrypt_cbc, encrypt_cbc};

    #[test]
    fn round_trips_empty_and_multiblock_messages() {
        let key = [0_u8; 16];
        let iv = [1_u8; 16];
        for plaintext in [
            b"".as_slice(),
            b"short",
            b"0123456789abcdef",
            b"a longer plaintext spanning blocks",
        ] {
            let ciphertext = encrypt_cbc(&key, &iv, plaintext);
            assert_eq!(decrypt_cbc(&key, &iv, &ciphertext).unwrap(), plaintext);
        }
    }
}
