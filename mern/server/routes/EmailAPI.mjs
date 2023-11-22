import dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();


router.get("/getEmailAPICredentials", async (req, res) => {
    const serviceId = process.env.EMAIL_SERVICE_ID;
    const templateID = process.env.EMAIL_TEMPLATE_ID;
    const userId = process.env.EMAIL_USER_ID;
    try {
        res.json({ serviceId, templateID, userId });
    }
    catch (error) {
        console.error("Error fetching email data:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;