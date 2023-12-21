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
      <td>{props.record.description}</td>
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
        <Link className="btn btn-link" to={`/book/edit/${props.record._id}`}>
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

export default function BooksList() {
  const [records, setRecords] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const tagOptions = tags
    .map((tag) => ({ label: tag, value: tag }))
    .sort((a, b) => a.label.localeCompare(b.label)); 

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/book/getAllBooks`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();

      records.sort((a, b) => a.name.localeCompare(b.name));

      setRecords(records);

      const allTags = [...new Set(records.flatMap((record) => record.tag))];
      setTags(allTags.sort()); 
    }

    getRecords();
  }, []);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/book/deleteBook/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  const sourcesFilteredByName = records.filter((source) =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div >
        <h3>Livres</h3>
        <strong>Total :</strong> {filteredRecords.length} livres
        <br />
        <strong>Filtres :</strong>
        <br />
        <div className="search-container">
          <Select
            className="search-select Select"
            placeholder="Trier par tag"
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
              <th>Tag</th>
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