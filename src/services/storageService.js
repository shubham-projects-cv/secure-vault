const STORAGE_KEY = "secure-vault-data";

export function saveEncryptedVault(encryptedVault) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(encryptedVault));
}

export function getEncryptedVault() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearVault() {
  localStorage.removeItem(STORAGE_KEY);
}
