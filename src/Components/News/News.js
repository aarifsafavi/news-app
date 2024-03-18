import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./News.css";

const News = () => {
  const [myNews, setMyNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleSearch = () => {
    const filtered = myNews.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  useEffect(() => {
    setFilteredArticles(displayedNews);
  }, [displayedNews]);

  // Function to load checked items from local storage
  const loadCheckedItemsFromStorage = () => {
    const storedCheckedItems = localStorage.getItem("checkedItems");
    return storedCheckedItems ? JSON.parse(storedCheckedItems) : {};
  };

  // Function to save checked items to local storage
  const saveCheckedItemsToStorage = (items) => {
    localStorage.setItem("checkedItems", JSON.stringify(items));
  };

  const generateUniqueID = () => {
    return (
      "_" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
    );
  };

  const fetchData = async () => {
    let response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=63ae37e79f0243e9ac1443ee16cef7a2"
    );
    let data = await response.json();
    // Adding a unique ID to each news item
    data.articles = data.articles.map((article) => ({
      ...article,
      id: generateUniqueID(), // Assigning a unique ID to each article
    }));
    setMyNews(data.articles);
    setDisplayedNews(data.articles.slice(0, 4)); // Initially display 3 articles
  };

  useEffect(() => {
    fetchData();
  });

  const loadMoreArticles = () => {
    const newIndex = displayedNews.length;
    const newArticles = myNews.slice(newIndex, newIndex + 3); // Get next set of articles
    setDisplayedNews([...displayedNews, ...newArticles]); // Add new articles to displayed list
  };

  const handleCheckboxChange = (id) => {
    const updatedCheckedItems = { ...checkedItems };
    updatedCheckedItems[id] = !updatedCheckedItems[id];
    setCheckedItems(updatedCheckedItems);
    saveCheckedItemsToStorage(updatedCheckedItems); // Save updated checked items to local storage
  };

  useEffect(() => {
    const storedCheckedItems = loadCheckedItemsFromStorage();
    setCheckedItems(storedCheckedItems);
  }, []);

  const checkedArticles = Object.keys(checkedItems).filter(
    (id) => checkedItems[id]
  );

  const handleDelete = (id) => {
    const updatedCheckedItems = { ...checkedItems };
    delete updatedCheckedItems[id];
    setCheckedItems(updatedCheckedItems);
    saveCheckedItemsToStorage(updatedCheckedItems);
  };

  return (
    <>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="container">
        <div className="checkedArticlesContainer">
          <h2>Checked Articles</h2>
          {checkedArticles.map((id) => {
            const article = myNews.find((ele) => ele.id === id);
            if (article) {
              return (
                <div key={id} className="checkedArticleItem">
                  <p>{article.title}</p>
                  <button
                    className="delete-btnCheckedItem"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>Read More</button>
                  </a>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="mainCard">
          {filteredArticles.map((ele) => {
            return (
              <div
                key={ele.id}
                className="card"
                style={{
                  width: "350px",
                  height: "450px",
                  marginLeft: "4rem",
                  marginBottom: "2rem",
                }}
              >
                <Link
                  to={{
                    pathname: `/news/${ele.id}`,
                    state: { newsItem: ele },
                  }}
                ></Link>
                <img src={ele.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    {ele.author === null ? "Unknown" : ele.author}
                  </h5>
                  <p className="card-text">{ele.title}</p>
                  <a href={ele.url} target="_blank" className="btn btn-primary">
                    Read More
                  </a>
                  <input
                    type="checkbox"
                    className={`favorite-checkbox`}
                    checked={checkedItems[ele.id]}
                    onChange={() => handleCheckboxChange(ele.id)}
                  />
                  <label
                    htmlFor={`favorite-checkbox-${ele.id}`}
                    className={checkedItems[ele.id] ? "red-checkbox" : ""}
                  ></label>
                </div>
              </div>
            );
          })}
          {displayedNews.length < myNews.length && (
            <div className="loadMoreBtnContainer">
              <button className="btn btn-primary" onClick={loadMoreArticles}>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
