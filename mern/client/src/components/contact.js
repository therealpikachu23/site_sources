import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [emailAPICredentials, setEmailAPICredentials] = useState(null);

    useEffect(() => {
        // Appeler la fonction pour récupérer les ID des infographies
        getEmailAPICredentials();
    }, []);

    const getEmailAPICredentials = async () => {
        try {
            const response = await fetch("http://localhost:5050/email/getEmailAPICredentials");
            if (response.ok) {
                const data = await response.json();
                setEmailAPICredentials(data);
            } else {
                console.error(`Error ${response.status}: Unable to fetch data.`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (!emailAPICredentials) {
            console.error("Email API credentials not available.");
            return;
        }

        // Votre service ID, template ID et user ID d'emailJS
        const serviceID = emailAPICredentials.serviceId;
        const templateID = emailAPICredentials.templateID;
        const userID = emailAPICredentials.userId;

        // Envoi de l'e-mail avec les données saisies par l'utilisateur
        emailjs.send(serviceID, templateID, { from_name: name, message }, userID)
            .then((response) => {
                console.log("E-mail envoyé avec succès:", response);
                // Réinitialise les champs après l'envoi réussi
                setName("");
                setMessage("");
            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi de l'e-mail:", error);
            });
    };

    return (
        <div>
            <h2>Contact</h2>
            <p>Des sources à ajouter, des conseils à me donner ? </p>
            <form onSubmit={sendEmail}>
                <div className="form-group mb-3">
                    <label>
                        Nom
                        <br />
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                            style={{ width: "400px" }}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Message
                        <br />
                        <textarea
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ width: "800px", height : "300px"}}
                        />
                    </label>
                </div>
                <br />
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Envoyer" />
                </div>
            </form >
        </div >
    );
};

export default Contact;
