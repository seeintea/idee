mod aes128;
mod crypto_params;
mod key_iv_codec;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt(plaintext: &str) -> String {
    let ciphertext = aes128::encrypt_cbc(
        &crypto_params::KEY,
        &crypto_params::IV,
        plaintext.as_bytes(),
    );
    key_iv_codec::hex_encode(&ciphertext)
}

#[wasm_bindgen]
pub fn decrypt(ciphertext_hex: &str) -> Result<String, JsValue> {
    let ciphertext = key_iv_codec::hex_decode(ciphertext_hex)
        .map_err(|error| JsValue::from_str(&error.to_string()))?;
    let plaintext = aes128::decrypt_cbc(&crypto_params::KEY, &crypto_params::IV, &ciphertext)
        .map_err(|error| JsValue::from_str(&error.to_string()))?;
    String::from_utf8(plaintext).map_err(|_| JsValue::from_str("invalid utf-8 plaintext"))
}

#[cfg(test)]
mod tests {
    use super::{aes128, crypto_params, key_iv_codec};

    #[test]
    fn matches_web_crypto_compatible_aes_cbc_vector() {
        let ciphertext =
            aes128::encrypt_cbc(&crypto_params::KEY, &crypto_params::IV, b"0123456789abcdef");
        assert_eq!(
            key_iv_codec::hex_encode(&ciphertext),
            "d2189d472a69b94fe8232d705d8890e20fe1dc55033fa1ea4ad0bd18d63b9c47"
        );
        assert_eq!(
            aes128::decrypt_cbc(&crypto_params::KEY, &crypto_params::IV, &ciphertext).unwrap(),
            b"0123456789abcdef"
        );
    }
}
