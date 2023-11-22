import React, { useState, useEffect } from "react";
import Select from "react-select";

const Record = (props) => {
    const openImageInNewTab = () => {
        window.open(props.record.imageUrl, "_blank");
    };

    return (
        <tr>
            <td>{props.record.tags.sort().join(", ")}</td>
            <td>{props.record.title}</td>
            <td>
                <a href={props.record.url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={props.record.url}
                        alt={props.record.url}
                        style={{ maxWidth: "500px", cursor: "pointer" }}
                        onClick={openImageInNewTab}
                    />
                </a>
            </td>
        </tr>
    );
};

const compareAccentuated = (a, b) => {
    // Utiliser localeCompare avec 'fr' pour trier les caractères accentués correctement
    return a.localeCompare(b, 'fr', { sensitivity: 'base' });
};

export default function InfographicsList() {
    const [photosData, setPhotosData] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

    useEffect(() => {
        // Appeler la fonction pour récupérer les ID des infographies
        getInfographicIds();
    }, []);

    const getInfographicIds = async () => {
        try {
            const response = await fetch("http://localhost:5050/infographics/getAllInfographicsId");
            if (response.ok) {
                const data = await response.json();
                // Appeler la fonction pour récupérer les détails de chaque infographie
                getInfographicDetails(data.ids);
            } else {
                console.error(`Error ${response.status}: Unable to fetch data.`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getInfographicDetails = async (infographicIds) => {
        try {
            const details = await Promise.all(
                infographicIds.map(async (id) => {
                    const detailResponse = await fetch(`http://localhost:5050/infographics/getInfographicDetails/${id}`);
                    if (detailResponse.ok) {
                        return detailResponse.json();
                    } else {
                        console.error(`Error ${detailResponse.status}: Unable to fetch data.`);
                        return { tags: [], url: "", title: "Nom inconnu" };
                    }
                })
            );

            setPhotosData(details);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const filterRecords = () => {
        let filteredData = photosData;

        // Filtrer par tag
        if (selectedTags.length > 0) {
            filteredData = filteredData.filter((record) =>
                selectedTags.every((tag) => record.tags.includes(tag))
            );
        }

        // Filtrer par nom
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredData = filteredData.filter(
                (record) =>
                    record.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                    record.tags.some((tag) =>
                        tag.toLowerCase().includes(lowerCaseSearchTerm)
                    )
            );
        }

        return filteredData;
    };

    const handleTagChange = (selectedOptions) => {
        const selectedTags = selectedOptions.map((option) => option.value);
        setSelectedTags(selectedTags);
    };

    // Trier les tags par ordre alphabétique
    const sortedTagOptions = [...new Set(photosData.flatMap((record) => record.tags))]
        .sort(compareAccentuated)
        .map((tag) => ({
            label: tag,
            value: tag,
        }));

    // Calcul du nombre total d'infographies affichées
    const totalInfographics = filterRecords(photosData).length;

    return (
        <div>
            <h3>Infographies</h3>
            <p>Cliquez sur une image pour l'ouvrir en plus grand.</p>
            <strong>Total :</strong> {totalInfographics} infographies
            <br />
            <strong>Filtres :</strong>
            <br />
            {/* Afficher l'icône de chargement si les données sont en cours de chargement */}
            {loading && <span className="loader"></span>}

            <div className="search-container">
                <Select
                    className="search-select Select"
                    options={sortedTagOptions}
                    isMulti
                    onChange={handleTagChange}
                    value={selectedTags.map((tag) => ({
                        label: tag,
                        value: tag,
                    }))}
                    placeholder="Trier par tag"
                    styles={{ control: (provided) => ({ ...provided, width: "300px" }) }}
                />
                <input
                    className="search-input form-control"
                    type="text"
                    placeholder="Rechercher par nom et/ou par tag"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <br />
            <div className="table-container">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Tag</th>
                            <th>Nom</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterRecords().map((record, index) => (
                            <Record record={record} key={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
