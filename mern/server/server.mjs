import express from "express";
import cors from "cors";
import tagRecords from "./routes/TagRecords.mjs";
import sourceRecords from "./routes/SourcesRecords.mjs"
import bookRecords from "./routes/BooksRecords.mjs"
import videoRecords from "./routes/VideosRecords.mjs"
import infographicsRecords from "./routes/InfographicsRecords.mjs";
import emailAPI from "./routes/EmailAPI.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/tag", tagRecords);
app.use("/source", sourceRecords);
app.use("/book", bookRecords);
app.use("/video", videoRecords);
app.use("/infographics", infographicsRecords);
app.use("/email", emailAPI);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});