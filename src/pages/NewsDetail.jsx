import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Use URL param to identify the article
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  // Load article on mount
  useEffect(() => {
    let currentArticle = location.state?.article;

    if (!currentArticle && id) {
      // If no state (refresh), try to get from localStorage
      const cachedNews = JSON.parse(localStorage.getItem("news")) || [];
      currentArticle = cachedNews.find((a) => String(a.id) === id);
    }

    if (currentArticle) {
      setArticle(currentArticle);
      localStorage.setItem("currentArticle", JSON.stringify(currentArticle));
    }
  }, [location.state, id]);

  // Load related news
  useEffect(() => {
    if (!article) return;

    const cachedNews = JSON.parse(localStorage.getItem("news")) || [];

    const related = cachedNews.filter(
      (item) =>
        item.title !== article.title &&
        item.category?.some((c) => article.category?.includes(c))
    );

    setRelatedNews(related.slice(0, 5));
  }, [article]);

  if (!article) {
    return (
      <div className="p-4 max-w-4xl mx-auto md:mt-25 mt-10">
        <p>No article found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto md:mt-10 mt-5 md:mb-50 mb-20">
      <p className="mt-2 text-gray-800 font-medium mb-3 text-xl">{article.title}</p>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      {article.category && (
        <p className="text-sm text-gray-500 mb-2">
          Category: {article.category.join(", ")}
        </p>
      )}

      {article.pubDate && (
        <small className="text-gray-400 mb-4 block">
          Published: {new Date(article.pubDate).toLocaleString()}
        </small>
      )}

      {article.description && <p className="mb-4">{article.description}</p>}

      {article.link && (
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-3 rounded w-full flex justify-center items-center gap-1"
        >
          Read full article
        </a>
      )}

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Related News</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedNews.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  localStorage.setItem("currentArticle", JSON.stringify(item));
                  navigate(`/article/${item.id}`, { state: { article: item } });
                }}
                className="p-3 rounded-lg hover:shadow-md transition cursor-pointer bg-white"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                      e.target.style.backgroundColor = "#e2e8f0";
                      e.target.style.height = "128px";
                    }}
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded mb-2">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}

                <p className="text-gray-800 font-medium line-clamp-2">{item.title}</p>

                {item.description && (
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                )}

                {item.pubDate && (
                  <small className="text-gray-400 block mt-1">
                    {new Date(item.pubDate).toLocaleDateString()}
                  </small>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsDetail;
