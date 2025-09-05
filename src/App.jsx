import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "./components/Category";
import { div } from "framer-motion/client";


const API_KEY = "pub_fcfccf041f154b23b7096e5238008114";
const COUNTRY = "us";

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const buildUrl = (category = "", nextPage = null) => {
    if (nextPage) return nextPage;
    let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${COUNTRY}`;
    if (category) url += `&category=${category}`;
    return url;
  };

  const fetchNews = async (nextPage = null, category = selectedCategory) => {
    setLoading(true);
    setError(null);

    try {
      const url = buildUrl(category, nextPage);
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "error") {
        if (data.message && data.message.toLowerCase().includes("rate limit")) {
          setError("API rate limit exceeded. Please try again later.");
        } else {
          setError(data.results?.message || "Error fetching news");
        }
      } else {
        const newNews = nextPage
          ? [...news, ...(data.results || [])]
          : data.results || [];
        setNews(newNews);
        setFilteredNews(newNews);
        localStorage.setItem("news", JSON.stringify(newNews));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedNews = JSON.parse(localStorage.getItem("news"));
    if (cachedNews && cachedNews.length > 0) {
      setNews(cachedNews);
      setFilteredNews(cachedNews);
    } else {
      fetchNews();
    }
  }, []);

  const handleCategoryChange = (category, triggerFetch = false) => {
    setSelectedCategory(category);
    if (triggerFetch) fetchNews(null, category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  return (
    
    <div className="md:mt-15 md:ml-50 md:mr-50 mr-3 ml-3 mt-10 md:mb-50 mb-40">
      <Category
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      {filteredNews.length === 0 && loading && (
        <p className="text-center">Loading...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredNews.map((item, idx) => (
          <li key={idx}>
            <Link
              to={`/article/${encodeURIComponent(idx)}`}
              state={{ article: item }}
              className="p-4 bg-white  rounded-xl flex flex-col hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full md:w-full h-32 object-cover rounded-lg transform hover:scale-102 transition duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                    e.target.style.backgroundColor = "#e2e8f0";
                    e.target.style.height = "128px";
                  }}
                />
              ) : (
                <div className="w-full md:w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {item.title && (
                    <p className="mt-2 text-gray-800 line-clamp-2 font-medium">
                      {item.title}
                    </p>
                  )}

                  {item.category && (
                    <div className="flex flex-wrap gap-1 mt-1 ">
                      {item.category.map((c) => (
                        <span
                          key={c}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                        >
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.description && (
                    <p className="mt-2 text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.pubDate && (
                  <small className="text-gray-400 mt-2">
                    {new Date(item.pubDate).toLocaleString()}
                  </small>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
