import { useEffect } from "react";

function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast-container">
      <div className="toast-box">
        {message}
      </div>
    </div>
  );
}

export default Toast;
