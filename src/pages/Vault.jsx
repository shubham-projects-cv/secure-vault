import { useEffect, useState } from "react";
import AddSecret from "../components/AddSecret";
import Toast from "../components/Toast";
import { encryptData, decryptData } from "../services/cryptoService";
import {
  getEncryptedVault,
  saveEncryptedVault,
} from "../services/storageService";

function Vault({ cryptoKey, onLock }) {
  const [secrets, setSecrets] = useState([]);
  const [search, setSearch] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const loadVault = async () => {
      const encrypted = getEncryptedVault();
      if (encrypted && cryptoKey) {
        const decrypted = await decryptData(encrypted, cryptoKey);
        setSecrets(decrypted);
      }
    };
    loadVault();
  }, [cryptoKey]);

  const handleAddSecret = async (secret) => {
    const updated = [...secrets, secret];
    setSecrets(updated);
    saveEncryptedVault(await encryptData(updated, cryptoKey));
    setToast("Secret saved");
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Delete this secret permanently?")) return;
    const updated = secrets.filter((_, i) => i !== index);
    setSecrets(updated);
    saveEncryptedVault(await encryptData(updated, cryptoKey));
    setToast("Secret deleted");
  };

  const handleLockVault = () => {
    if (window.confirm("Lock vault now?")) onLock();
  };

  const handleCopy = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToast("Copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredSecrets = secrets.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="vault-layout">
      {/* HEADER */}
      <header className="vault-header">
        <h3>🔐 My Vault</h3>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLockVault}
        >
          Lock Vault
        </button>
      </header>

      <div className="vault-body">
        {/* SIDEBAR */}
        <aside className="vault-sidebar">
          <input
            className="form-control mb-3"
            placeholder="Search secrets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AddSecret onSave={handleAddSecret} />
        </aside>

        {/* CONTENT */}
        <main className="vault-content">
          {filteredSecrets.length === 0 ? (
            <p className="text-muted mt-4">No secrets available.</p>
          ) : (
            <div className="vault-grid">
              {filteredSecrets.map((item, index) => (
                <div className="vault-card" key={index}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column gap-2">
                      {/* Title + Delete */}
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <h5 className="mb-0 text-truncate">
                          {item.name}
                        </h5>
                        <button
                          className="btn btn-sm btn-outline-danger flex-shrink-0"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>

                      {/* Username */}
                      <div>
                        <strong>Username</strong>
                        <div className="secret-row">
                          <span className="secret-text">
                            {item.username}
                          </span>
                          <button
                            className="btn btn-link btn-sm"
                            onClick={() =>
                              handleCopy(item.username, `u-${index}`)
                            }
                          >
                            {copiedKey === `u-${index}`
                              ? "Copied"
                              : "Copy"}
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <strong>Password</strong>
                        <div className="secret-row">
                          <span>••••••••</span>
                          <button
                            className="btn btn-link btn-sm"
                            onClick={() =>
                              handleCopy(item.password, `p-${index}`)
                            }
                          >
                            {copiedKey === `p-${index}`
                              ? "Copied"
                              : "Copy"}
                          </button>
                        </div>
                      </div>

                      {/* Notes */}
                      {item.notes && (
                        <p className="text-muted mt-auto">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Toast
        message={toast}
        show={!!toast}
        onClose={() => setToast("")}
      />
    </div>
  );
}

export default Vault;
