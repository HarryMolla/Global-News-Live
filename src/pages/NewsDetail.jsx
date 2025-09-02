import { useLocation, useNavigate } from "react-router-dom";

function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
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
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

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

      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Read full article
      </a>
    </div>
  );
}

export default NewsDetail;
