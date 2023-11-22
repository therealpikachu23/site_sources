import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const apiKey = process.env.FLICKR_API_KEY;
const userId = process.env.FLICKR_USER_ID;

router.get("/getAllInfographicsId", async (req, res) => {
    try {
        const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();

            const ids = data.photos.photo.map((photo) => photo.id);

            res.json({ ids });
        } else {
            console.error(`Error ${response.status}: Unable to fetch data.`);
            res.status(response.status).send("Unable to fetch data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/getInfographicDetails/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${id}&format=json&nojsoncallback=1`;

        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();

            const tags = data.photo.tags.tag.map((tag) => tag.raw);

            const url = `https://farm${data.photo.farm}.staticflickr.com/${data.photo.server}/${data.photo.id}_${data.photo.secret}.jpg`;
            const title = data.photo.title._content.replace(/_/g, " ");

            res.json({ tags, url, title });
        } else {
            console.error(`Error ${response.status}: Unable to fetch data.`);
            res.status(response.status).send("Unable to fetch data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;


//exemple appel api tags
//https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=d04090749ed72aa3904e081035832b5c&photo_id=53334256956&format=json&nojsoncallback=1`

//exemple appel api appel id et nom 
//https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=d04090749ed72aa3904e081035832b5c&user_id=199528518@N02&format=json&nojsoncallback=1
