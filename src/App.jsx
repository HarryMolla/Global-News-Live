import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Category from "./components/Category";
import "./index.css";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";

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

// Shuffle helper
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

function App() {
  const [allNews, setAllNews] = useState([]);
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const timerRef = useRef(null);

  const noResults = searchQuery && filteredNews.length === 0;

  const buildUrl = (category = "", nextPage = null) => {
    if (nextPage) return nextPage;
    let url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${COUNTRY}`;
    if (category) url += `&category=${category}`;
    return url;
  };

  const fetchCategoryNews = async (category) => {
    try {
      const url = buildUrl(category);
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "error") return [];
      return data.results || [];
    } catch (err) {
      return [];
    }
  };

  const fetchAllCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      let allFetched = [];
      for (let cat of CATEGORIES) {
        const catNews = await fetchCategoryNews(cat);
        allFetched = [...allFetched, ...catNews];
      }

      // Remove duplicates by title
      const unique = allFetched.filter(
        (v, i, a) => a.findIndex((t) => t.title === v.title) === i
      );

      // Shuffle news for random order
      const shuffledNews = shuffleArray(unique);

      setAllNews(shuffledNews);
      setNews(shuffledNews);
      setFilteredNews(shuffledNews);
      localStorage.setItem("news", JSON.stringify(shuffledNews));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedNews = JSON.parse(localStorage.getItem("news"));
    if (cachedNews?.length) {
      setAllNews(cachedNews);
      setNews(cachedNews);
      setFilteredNews(cachedNews);
    } else {
      fetchAllCategories();
    }
  }, []);

  useEffect(() => {
    if (filteredNews.length === 0) return;

    const slideCount = Math.min(filteredNews.length, 6);
    const slideDuration = 3000;

    timerRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, slideDuration);

    return () => clearTimeout(timerRef.current);
  }, [filteredNews, activeSlide]);

  const handlePrev = () => {
    clearTimeout(timerRef.current);
    const slideCount = Math.min(filteredNews.length, 6);
    setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    clearTimeout(timerRef.current);
    const slideCount = Math.min(filteredNews.length, 6);
    setActiveSlide((prev) => (prev + 1) % slideCount);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (!category) {
      setNews(allNews);
      setFilteredNews(
        allNews.filter((item) =>
          searchQuery
            ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        )
      );
      setCategoryEmpty(false);
    } else {
      const categoryFiltered = allNews.filter((item) =>
        item.category
          ?.map((c) => c.toLowerCase())
          .includes(category.toLowerCase())
      );

      if (categoryFiltered.length === 0) {
        setCategoryEmpty(true);
        setNews([]);
        setFilteredNews([]);
      } else {
        setCategoryEmpty(false);
        setNews(categoryFiltered);
        setFilteredNews(
          categoryFiltered.filter((item) =>
            searchQuery
              ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
              : true
          )
        );
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredNews(news);
    } else {
      setFilteredNews(
        allNews.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="md:mt-15 md:ml-50 md:mr-50 mr-3 ml-3 mt-10 md:mb-50 mb-40 grid justify-center overflow-hidden">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {noResults && (
        <div className="grid mt-4 p-10 w-full text-center text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/20 rounded-xl">
          <p className="mx-auto mb-4 text-6xl text-gray-400 dark:text-gray-200 bg-gray-500/10 rounded-2xl p-3 ">
            <MdOutlineSentimentDissatisfied />
          </p>
          <p className="mb-4">
            No news available for "{searchQuery}" category.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Back Home
          </button>
        </div>
      )}

      {categoryEmpty && (
        <div className="grid mt-4 p-10 w-full text-center text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/20 rounded-xl">
          <p className="mx-auto mb-4 text-6xl text-gray-400 dark:text-gray-200 bg-gray-500/10 rounded-2xl p-3 ">
            <MdOutlineSentimentDissatisfied />
          </p>
          <p className="mb-4">
            No news available for "{selectedCategory}" category.
          </p>
          <button
            onClick={() => handleCategoryChange("")}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Back Home
          </button>
        </div>
      )}

      {!categoryEmpty && filteredNews.length > 0 && (
        <div className="carousel-container mb-10">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {filteredNews.slice(0, 6).map((item, idx) => (
              <div key={`${idx}-${activeSlide}`} className="carousel-slide">
                <Link
                  to={`/article/${encodeURIComponent(idx)}`}
                  state={{ article: item }}
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="carousel-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                        e.target.className = "carousel-no-image";
                        e.target.style.height = "400px";
                      }}
                    />
                  ) : (
                    <div className="carousel-no-image">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="carousel-caption">
                    <h3>{item.title}</h3>
                    <p className="mt-2 text-gray-300 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="carousel-progress-container">
            {filteredNews.slice(0, 6).map((_, idx) => (
              <div
                key={`${idx}-${activeSlide}`}
                className="carousel-progress-bar"
              >
                <div
                  className={`carousel-progress ${
                    idx === activeSlide ? "active" : ""
                  }`}
                  style={{
                    animationDuration: idx === activeSlide ? "3000ms" : "0ms",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Category
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      {!categoryEmpty && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredNews.map((item, idx) => (
            <li key={idx}>
              <Link
                to={`/article/${encodeURIComponent(idx)}`}
                state={{ article: item }}
                className="news-card-link p-4 bg-white dark:bg-gray-300/3 rounded-xl flex flex-col hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
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
                      <p className="mt-2 text-gray-800 dark:text-white  line-clamp-2 font-medium">
                        {item.title}
                      </p>
                    )}
                    {item.category && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.category.map((c) => (
                          <span
                            key={c}
                            className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-100/10 dark:text-blue-400 px-2 py-0.5 rounded-full"
                          >
                            {c.charAt(0).toUpperCase() + c.slice(1)}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.description && (
                      <p className="mt-2 text-gray-500 dark:text-gray-300 line-clamp-2">
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
      )}
    </div>
  );
}

export default App;
