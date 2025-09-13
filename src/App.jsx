import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Category from "./components/Category";
import './index.css';

const API_KEY = "pub_fcfccf041f154b23b7096e5238008114";
const COUNTRY = "us";

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);

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
        if (data.message?.toLowerCase().includes("rate limit")) {
          setError("API rate limit exceeded. Please try again later.");
        } else {
          setError(data.results?.message || "Error fetching news");
        }
      } else {
        const newNews = nextPage ? [...news, ...(data.results || [])] : data.results || [];
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
    if (cachedNews?.length) {
      setNews(cachedNews);
      setFilteredNews(cachedNews);
    } else {
      fetchNews();
    }
  }, []);

  // Carousel auto-scroll and progress bar
useEffect(() => {
  if (filteredNews.length === 0) return;

  const slideCount = Math.min(filteredNews.length, 6);
  const slideDuration = 3000; // 3 seconds per slide

  // Schedule next slide
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


  const handleCategoryChange = (category, triggerFetch = false) => {
    setSelectedCategory(category);
    if (triggerFetch) fetchNews(null, category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) setFilteredNews(news);
    else
      setFilteredNews(
        news.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      );
  };

  return (
    <div className="md:mt-15 md:ml-50 md:mr-50 mr-3 ml-3 mt-10 md:mb-50 mb-40">
      {/* Custom Carousel */}
      {filteredNews.length > 0 && (
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
                    <p className="mt-2 text-gray-300 line-clamp-2">{item.description}</p>
                  </div>
                </Link>
                
              </div>
            ))}
          </div>
          {/* Progress Bars */}
          <div className="carousel-progress-container">
            {filteredNews.slice(0, 6).map((_, idx) => (
              <div key={`${idx}-${activeSlide}`} className="carousel-progress-bar">
                <div
  className={`carousel-progress ${idx === activeSlide ? 'active' : ''}`}
  style={{
    animationDuration: idx === activeSlide ? '3000ms' : '0ms', 
  }}
></div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category + Search */}
      <Category
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      {/* Loading and Errors */}
      {filteredNews.length === 0 && loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* News Grid */}
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
                    <p className="mt-2 text-gray-800 dark:text-white  line-clamp-2 font-medium">{item.title}</p>
                  )}
                  {item.category && (
                    <div className="flex flex-wrap gap-1 mt-1">
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
                    <p className="mt-2 text-gray-500 dark:text-gray-300 line-clamp-2">{item.description}</p>
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