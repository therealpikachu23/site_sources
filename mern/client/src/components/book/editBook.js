import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Select from 'react-select';

export default function EditBook() {
  const [form, setForm] = useState({
    tag: [],
    name: '',
    url: '',
    description: '',
  });
  const params = useParams();
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5050/book/getSingleBook/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        return;
      }

      setForm(record);
    }

    fetchData();

    // Assurez-vous de récupérer toutes les valeurs de tags depuis votre API
    async function getAllTagsFromAPI() {
      try {
        const response = await fetch('http://localhost:5050/tag/getBookTags');
        if (response.ok) {
          const data = await response.json();
          setAllTags(data);
        } else {
          console.error('Failed to fetch tags:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }

    getAllTagsFromAPI();

    return;
  }, [params.id]);

  // Ces méthodes mettront à jour les propriétés de l'état.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedBook = {
      tag: form.tag,
      name: form.name,
      url: form.url,
      description: form.description,
    };

    // Cela enverra une requête PATCH pour mettre à jour les données dans la base de données.
    await fetch(`http://localhost:5050/book/updateBook/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedBook),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Cette section triera les valeurs de tags par ordre alphabétique.
  const sortedTags = allTags.sort((a, b) => {
    if (form.tag.includes(a.name)) return -1;
    if (form.tag.includes(b.name)) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <h3>Modifier livre</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Titre</label>
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
          <label htmlFor="tag">Tags</label>
          <br />
          <Select
            isMulti
            options={sortedTags.map((tag) => ({
              label: tag.name,
              value: tag.name,
            }))}
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
          <textarea
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          ></textarea>
        </div>
        <br />
        <div className="form-group">
          <input type="submit" value="Modifier livre" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
