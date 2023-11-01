import React, { useState, useEffect } from "react";
import Select from 'react-select';

export default function AddBook() {
    const [form, setForm] = useState({
        tag: [],
        name: "",
        url: "",
        description: ""
    });
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        async function getBookTags() {
            try {
                const response = await fetch("http://localhost:5050/tag/getBookTags");
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

        if (form.name) {
            const bookTitle = form.name;

            // Fetch book data
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}`)
                .then((response) => response.json())
                .then((data) => {
                    const firstBook = data.items[0];
                    if (firstBook && firstBook.volumeInfo && firstBook.volumeInfo.description) {
                        const description = firstBook.volumeInfo.description;
                        setForm((prevForm) => ({
                            ...prevForm,
                            description, // Set the description in the form state
                        }));
                    }
                })
                .catch((error) => {
                    console.error("An error occurred: ", error);
                });

            const formattedQuery = form.name.replace(/ /g, "+");
            const apiUrl = `https://www.amazon.fr/s?k=${formattedQuery}`;

            const url = apiUrl;
            setForm((prevForm) => ({
                ...prevForm,
                url, // Set the url in the form state
            }));
        } else {
            // Si le champ "name" est vide, effacez la description et l'URL
            setForm((prevForm) => ({
                ...prevForm,
                description: "", // Efface la description
                url: "", // Efface également l'URL
            }));
        }

        getBookTags();
    }, [form.name]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const newBook = { ...form };

        await fetch("http://localhost:5050/book/addNewBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        }).catch((error) => {
            window.alert(error);
            return;
        });

        setForm({ tag: [], name: "", url: "", description: "" });
    }

    return (
        <div>
            <h3>Nouveau livre</h3>
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
                    <label htmlFor="tag">Tags</label>
                    <br />
                    <Select
                        options={allTags.map((tag) => ({
                            label: tag.name,
                            value: tag.name,
                        }))
                    }
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
                    <input type="submit" value="Ajouter livre" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
