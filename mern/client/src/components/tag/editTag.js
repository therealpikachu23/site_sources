import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Select from 'react-select';

export default function EditTag() {
  const [form, setForm] = useState({
    name: '',
    type: [],
  });
  const [types, setTypes] = useState(['source', 'livre', 'video']); // Options disponibles
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/tag/getSingleTag/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate('/');
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedCategory = {
      name: form.name,
      type: form.type,
    };

    await fetch(`http://localhost:5050/tag/updateTag/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedCategory),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    navigate('/tagList');
  }

  return (
    <div>
      <h3>Modifier tag</h3>
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
              updateForm({ type: selectedOptions.map((option) => option.value) });
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <input type="submit" value="Modifier tag" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
