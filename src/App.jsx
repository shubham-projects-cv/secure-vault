import { useState } from "react";
import LockScreen from "./pages/LockScreen";
import Vault from "./pages/Vault";
import { deriveKey } from "./services/cryptoService";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [cryptoKey, setCryptoKey] = useState(null);

  const handleUnlock = async (password) => {
    try {
      const key = await deriveKey(password);
      setCryptoKey(key);
      setIsUnlocked(true);
    } catch (err) {
      alert("Failed to unlock vault");
    }
  };

  const handleLock = () => {
    setCryptoKey(null);
    setIsUnlocked(false);
  };

  return (
    <>
      {isUnlocked ? (
        <Vault cryptoKey={cryptoKey} onLock={handleLock} />
      ) : (
        <LockScreen onUnlock={handleUnlock} />
      )}
    </>
  );
}

export default App;
