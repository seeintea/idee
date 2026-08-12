use core::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct InvalidHex;

impl fmt::Display for InvalidHex {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("invalid hex")
    }
}

pub fn hex_encode(bytes: &[u8]) -> String {
    const HEX: &[u8; 16] = b"0123456789abcdef";
    let mut output = String::with_capacity(bytes.len() * 2);
    for &byte in bytes {
        output.push(HEX[(byte >> 4) as usize] as char);
        output.push(HEX[(byte & 0x0f) as usize] as char);
    }
    output
}

pub fn hex_decode(input: &str) -> Result<Vec<u8>, InvalidHex> {
    if !input.len().is_multiple_of(2) {
        return Err(InvalidHex);
    }

    input
        .as_bytes()
        .chunks_exact(2)
        .map(|pair| {
            let high = hex_value(pair[0]).ok_or(InvalidHex)?;
            let low = hex_value(pair[1]).ok_or(InvalidHex)?;
            Ok((high << 4) | low)
        })
        .collect()
}

fn hex_value(byte: u8) -> Option<u8> {
    match byte {
        b'0'..=b'9' => Some(byte - b'0'),
        b'a'..=b'f' => Some(byte - b'a' + 10),
        b'A'..=b'F' => Some(byte - b'A' + 10),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::{hex_decode, hex_encode};

    #[test]
    fn round_trips_hex() {
        let bytes = [0x00, 0x01, 0xab, 0xcd, 0xef, 0xff];
        assert_eq!(hex_encode(&bytes), "0001abcdefff");
        assert_eq!(hex_decode("0001ABCDEFFF").unwrap(), bytes);
    }

    #[test]
    fn rejects_invalid_hex() {
        assert!(hex_decode("abc").is_err());
        assert!(hex_decode("zz").is_err());
    }
}
