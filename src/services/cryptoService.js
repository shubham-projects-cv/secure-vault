const encoder = new TextEncoder();
const decoder = new TextDecoder();

const SALT_KEY = "secure-vault-salt"; // fixed salt label

// Derive AES key from master password
export async function deriveKey(masterPassword) {
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(SALT_KEY),
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt data
export async function encryptData(data, key) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(JSON.stringify(data))
  );

  return {
    iv: Array.from(iv),
    content: Array.from(new Uint8Array(encrypted)),
  };
}

// Decrypt data
export async function decryptData(encryptedData, key) {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(encryptedData.iv),
    },
    key,
    new Uint8Array(encryptedData.content)
  );

  return JSON.parse(decoder.decode(decrypted));
}
