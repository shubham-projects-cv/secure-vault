import { useState } from "react";

function AddSecret({ onSave }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.username || !form.password) {
      alert("Name, Username and Password are required");
      return;
    }

    onSave(form);

    setForm({
      name: "",
      username: "",
      password: "",
      notes: "",
    });
  };

  return (
    <div className="add-secret-wrapper">
      <div className="card shadow-sm add-secret-card">
        <div className="card-body">
          <h5 className="mb-3">
            ➕ Add Secret
          </h5>

          <input
            className="form-control mb-2"
            placeholder="Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            placeholder="Username *"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password *"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Notes (optional)"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100" onClick={handleSubmit}>
            Save Secret
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSecret;
