import { useState } from "react";

function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");

  const handleUnlock = () => {
    if (!password.trim()) {
      alert("Please enter master password");
      return;
    }
    onUnlock(password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div className="card shadow-sm w-100" style={{ maxWidth: "420px" }}>
        <div className="card-body p-4">
          <h4 className="text-center mb-2">🔐 Secure Vault</h4>
          <p className="text-center text-muted mb-4">
            Enter your master password to unlock
          </p>

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Master Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-primary w-100"
            onClick={handleUnlock}
          >
            Unlock Vault
          </button>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;
