import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select"; 

const Record = (props) => {
  return (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.type.join(", ")}</td>
      <td>
        <Link className="btn btn-link" to={`/tag/edit/${props.record._id}`}>
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


export default function TagList() {
  const [records, setRecords] = useState([]);
  const [filterValue] = useState("");
  const [sortedRecords, setSortedRecords] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]); 
  const typeOptions = [
    { value: "livre", label: "livre" },
    { value: "source", label: "source" },
    { value: "video", label: "video" },
  ];

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/tag/getAllTags`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      const sortedRecords = [...records].sort((a, b) => a.name.localeCompare(b.name));
      setRecords(records);
      setSortedRecords(sortedRecords); 
    }

    getRecords();
  }, []);

  const filteredRecords = sortedRecords.filter((record) =>
    record.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleTypeChange = (selectedOptions) => {
    setSelectedTypes(selectedOptions);
  };

  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/tag/deleteTag/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((record) => record._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    const recordsFilteredByType = filteredRecords.filter((record) =>
      selectedTypes.every((selectedType) => record.type.includes(selectedType.value))
    );

    return recordsFilteredByType.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        key={record._id}
      />
    ));
  }

  return (
    <div>
      <div>
        <h3>Tags</h3>
        <strong>Total :</strong> {filteredRecords.length} tags
        <br />
        <strong>Filtres :</strong>
        <br />
        <div className="search-container">
          <Select
            className="search-select Select"
            placeholder="Filtrer par type"
            options={typeOptions}
            isMulti
            onChange={handleTypeChange}
            value={selectedTypes}
            styles={{ control: (provided) => ({ ...provided, width: "200px" }) }}
          />
        </div>
      </div>
      <br />
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
    </div>
  );
}

