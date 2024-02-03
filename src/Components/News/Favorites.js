import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Header";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="mainCard">
        <h2>Favorites</h2>
        {favorites.map((ele) => (
          <div key={ele.id} className="card">
            <img src={ele.urlToImage} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                {ele.author === null ? "Unknown" : ele.author}
              </h5>
              <p className="card-text">{ele.title}</p>
              <a href={ele.url} target="_blank" className="btn btn-primary">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favorites;
