import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "pub_fcfccf041f154b23b7096e5238008114";
const COUNTRY = "us";
const CATEGORIES = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];
const DEBOUNCE_DELAY = 600;

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryTimeout, setCategoryTimeout] = useState(null);

  // Build API URL
  const buildUrl = (category = "", nextPage = null) => {
    if (nextPage) return nextPage;
    let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${COUNTRY}`;
    if (category) url += `&category=${category}`;
    return url;
  };

  // Fetch news from API
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
        setFilteredNews(newNews); // Update filtered news initially
        localStorage.setItem("news", JSON.stringify(newNews)); // cache results
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load or fetch from cache
  useEffect(() => {
    const cachedNews = JSON.parse(localStorage.getItem("news"));
    if (cachedNews && cachedNews.length > 0) {
      setNews(cachedNews);
      setFilteredNews(cachedNews);
    } else {
      fetchNews();
    }
  }, []);

  // Debounced category selection
  const selectCategory = (category) => {
    setSelectedCategory(category);

    if (categoryTimeout) clearTimeout(categoryTimeout);

    const timeout = setTimeout(() => {
      fetchNews(null, category);
    }, DEBOUNCE_DELAY);

    setCategoryTimeout(timeout);
  };

  // Handle search input from NavBar
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
    <div>
      <div className=" ">
        <div className="fixed bottom-4 left-0 right-0 z-50 bg-white/70 border border-white backdrop-blur-sm p-4 rounded-2xl shadow-2xl mx-5
                md:left-1/2 md:transform md:-translate-x-1/2 md:w-max">
          {/* Category Buttons */}
          <div className="overflow-x-auto scrollbar-hide relative mask-fade md:mask-none ">
            <div className="inline-flex gap-2 min-w-max md:min-w-0 md:justify-center md:w-full md:flex-wrap ">
              <button
                className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full font-medium flex-shrink-0 ml-3 ${
                  selectedCategory === ""
                    ? "bg-blue-500 text-white shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition`}
                onClick={() => selectCategory("")}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full font-medium flex-shrink-0 ${
                    selectedCategory === cat
                      ? "bg-blue-500 text-white shadow"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition`}
                  onClick={() => selectCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="mt-4  md:w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

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
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = ""; // remove broken image
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
                        {item.description}
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
    </div>
  );
}

export default App;
