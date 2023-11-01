import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function AddSource() {
  const [form, setForm] = useState({
    tag: [],
    name: "",
    url: "",
    description: "",
  });
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    async function getAllTagsFromAPI() {
      try {
        const response = await fetch("http://localhost:5050/tag/getSourceTags");
        if (response.ok) {
          const data = await response.json();
          // Triez les tags ici par ordre alphabétique
          const sortedTags = data.sort((a, b) => a.name.localeCompare(b.name));
          setAllTags(sortedTags);
        } else {
          console.error("Failed to fetch tags:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    getAllTagsFromAPI();

    return;
  }, []);

  // Ces méthodes mettront à jour les propriétés de l'état.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newSource = { ...form };

    await fetch("http://localhost:5050/source/addNewSource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSource),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ tag: [], name: "", url: "", description: "" });
  }

  return (
    <div>
      <h3>Ajouter source</h3>
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
          <label htmlFor="tag">Tag</label>
          <Select
            name="tag"
            options={allTags.map((tag) => ({
              label: tag.name,
              value: tag.name,
            }))}
            isMulti
            value={form.tag.map((tag) => ({
              label: tag,
              value: tag,
            }))}
            onChange={(selectedOptions) => {
              const selectedTags = selectedOptions.map((option) => option.value);
              updateForm({ tag: selectedTags });
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={form.url}
            onChange={(e) => updateForm({ url: e.target.value })}
            autoComplete="off"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            autoComplete="off"
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Ajouter source"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}