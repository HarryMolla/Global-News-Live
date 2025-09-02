import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "pub_fcfccf041f154b23b7096e5238008114";
const COUNTRY = "us";
const CATEGORIES = ["business", "entertainment", "health", "science", "sports", "technology"];

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(
    `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${COUNTRY}`
  );
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
        setError(data.results?.message || "Error fetching news");
        setNextPageUrl(null);
      } else {
        setNews((prev) => (nextPage ? [...prev, ...(data.results || [])] : data.results || []));
        setNextPageUrl(data.nextPage || null);
      }
    } catch (err) {
      setError(err.message);
      setNextPageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    fetchNews(null, category);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">News</h1>

      {/* Category Navbar */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded ${selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => selectCategory("")}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => selectCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {news.length === 0 && loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-6">
        {news.map((item, idx) => (
          <li key={idx} className="p-4 border rounded flex flex-col md:flex-row gap-4">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full md:w-48 h-32 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold text-lg hover:underline"
              >
                {item.title}
              </a>
              {item.category && (
                <p className="text-sm text-gray-500 mt-1">
                  Category: {item.category.join(", ")}
                </p>
              )}
              {item.description && <p className="mt-2">{item.description}</p>}
              {item.pubDate && (
                <small className="text-gray-400 mt-1 block">
                  {new Date(item.pubDate).toLocaleString()}
                </small>
              )}
              {/* See More Button */}
              <Link
                to={`/article/${encodeURIComponent(idx)}`}
                state={{ article: item }}
                className="mt-2 inline-block px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                See More
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {nextPageUrl && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => fetchNews(nextPageUrl)}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
