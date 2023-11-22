import React from "react";

import "./App.css"; // Importez votre fichier CSS ici

// We use Route in order to define the different routes of our application
import { Route, Routes, BrowserRouter } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Home from "./components/home";
import Footer from "./components/footer";
import TagList from "./components/tag/tagList";
import EditTag from "./components/tag/editTag";
import AddTag from "./components/tag/addTag";

import SourceList from "./components/source/sourcesList";
import EditSources from "./components/source/editSources";
import AddSource from "./components/source/addSource";

import BooksList from "./components/book/booksList";
import AddBook from "./components/book/addBook";
import EditBook from "./components/book/editBook";

import VideosList from "./components/video/videosList";
import AddVideo from "./components/video/addVideo";
import EditVideo from "./components/video/editVideos";

import InfographicsList from "./components/infographic/infographicsList";

import Contact from "./components/contact";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tagList" element={<TagList />} />
            <Route path="/addTag" element={<AddTag />} />
            <Route path="/tag/edit/:id" element={<EditTag />} />
            <Route path="/sourcesList" element={<SourceList />} />
            <Route path="/addSource" element={<AddSource />} />
            <Route path="/source/edit/:id" element={<EditSources />} />
            <Route path="/booksList" element={<BooksList />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/book/edit/:id" element={<EditBook />} />
            <Route path="/videosList" element={<VideosList />} />
            <Route path="/addVideo" element={<AddVideo />} />
            <Route path="/video/edit/:id" element={<EditVideo />} />
            <Route path="/infographicsList" element={<InfographicsList />} />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;