import React, { useState } from "react";
import Select from 'react-select';

export default function AddTag() {
  const [form, setForm] = useState({
    name: "",
    type: [], // Type initial vide
  });
  const [types] = useState(["source", "video", "livre"]); // Options disponibles

  // Triez le tableau types par ordre alphabétique
  types.sort();

  // Ces méthodes mettront à jour les propriétés de l'état.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Cette fonction gère la soumission.
  async function onSubmit(e) {
    e.preventDefault();

    const newCategory = {
      name: form.name,
      type: form.type,
    };

    await fetch("http://localhost:5050/tag/addNewTag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", type: [] }); // Réinitialise également le type
  }

  return (
    <div>
      <h3>Nouveau tag</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            autoComplete="off"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <br />
          <Select
            options={types.map((type) => ({
              label: type,
              value: type,
            }))}
            isMulti
            value={form.type.map((type) => ({
              label: type,
              value: type,
            }))}
            onChange={(selectedOptions) => {
              const selectedTypes = selectedOptions.map((option) => option.value);
              updateForm({ type: selectedTypes });
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <input type="submit" value="Ajouter le tag" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
