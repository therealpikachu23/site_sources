import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const Record = (props) => {
  // Triez les tags avant de les joindre
  const sortedTags = props.record.tag.sort();

  return (
    <tr>
      <td>{sortedTags.join(", ")}</td>
      <td>{props.record.name}</td>
      <td className="td-description">{props.record.description}</td>
      <td className="td-url">
        <a
          href={props.record.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.record.url}
        </a>
      </td>
      <td className="td-action">
        <Link className="btn btn-link" to={`/source/edit/${props.record._id}`}>
          Editer
        </Link>{" "}
        |{" "}
        <button
          className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default function SourceList() {
  const [records, setRecords] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const tagOptions = tags
    .map((tag) => ({ label: tag, value: tag }))
    .sort((a, b) => a.label.localeCompare(b.label)); // Tri des options par ordre alphabétique

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/source/getAllSources`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();

      // Tri des enregistrements par ordre alphabétique sur la colonne "Nom"
      records.sort((a, b) => a.name.localeCompare(b.name));

      setRecords(records);

      const allTags = [...new Set(records.flatMap((record) => record.tag))];
      setTags(allTags.sort()); // Tri des tags par ordre alphabétique
    }

    getRecords();
  }, []);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/source/deleteSource/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // Filtrer d'abord par nom
  const sourcesFilteredByName = records.filter((source) =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ensuite, appliquer le filtrage par tag
  const filteredRecords = selectedTags.length
    ? sourcesFilteredByName.filter((source) =>
        selectedTags.every((tag) => source.tag.includes(tag))
      )
    : sourcesFilteredByName;

  const handleTagChange = (selectedOptions) => {
    const selectedTags = selectedOptions.map((option) => option.value);
    setSelectedTags(selectedTags);
  };

  return (
    <div>
      <div>
        <h3>Sources</h3>
        <strong>Total :</strong> {filteredRecords.length} sources
        <br />
        <strong>Filtres :</strong>
        <br />
        <div className="search-container">
          <Select
            className="search-select Select"
            placeholder="Trier par catégorie"
            options={tagOptions}
            isMulti
            onChange={handleTagChange}
            value={tagOptions.filter((option) =>
              selectedTags.includes(option.value)
            )}
            styles={{ control: (provided) => ({ ...provided, width: "300px" }) }}
          />
          <input
            type="search"
            className="search-input form-control"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <Record
                record={record}
                deleteRecord={() => deleteRecord(record._id)}
                key={record._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
