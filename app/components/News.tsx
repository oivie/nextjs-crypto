"use client";

import { useEffect, useState } from "react";

interface Article {
  title: string;
  author: string | null;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
  urlToImage: string | null;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 1 big article + 9 smaller ones

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=popularity&language=en&apiKey=e442b0106cc140a49bbe1dc0f82096b6"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchNews();
  }, []);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && handlePageChange(page)}
        className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full text-center ${
          currentPage === page ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
        }`}
        disabled={page === "..."}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-indigo-50"> {/* Background consistent with main page */}
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
          Cryptocurrency News
        </h1>

        {/* Featured Article */}
        {currentArticles.length > 0 && (
          <div className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            {/* Featured Article Image */}
            {currentArticles[8].urlToImage ? (
              <img
                src={currentArticles[8].urlToImage}
                alt={currentArticles[8].title}
                className="w-full md:w-1/2 h-64 object-cover"
              />
            ) : (
              <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            {/* Featured Article Content */}
            <div className="p-6 md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentArticles[0].title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                By {currentArticles[0].author || "Unknown"} | {currentArticles[0].source.name} | Published:{" "}
                {new Date(currentArticles[0].publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{currentArticles[0].description}</p>
              <a
                href={currentArticles[0].url}
                className="inline-block text-indigo-600 hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Original Source
              </a>
            </div>
          </div>
        )}

        {/* Smaller Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.slice(1).map((article, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              {/* Article Image */}
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              {/* Article Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                By {article.author || "Unknown"} | {article.source.name}
              </p>
              <p className="text-gray-700 mb-4">{article.description}</p>
              <a
                href={article.url}
                className="text-indigo-600 hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Original Source
              </a>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`w-20 h-10 flex items-center justify-center ${
              currentPage === 1 ? "bg-gray-300" : "bg-indigo-600 text-white"
            } rounded-full hover:bg-indigo-700`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex items-center">{renderPagination()}</div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`w-20 h-10 flex items-center justify-center ${
              currentPage === totalPages ? "bg-gray-300" : "bg-indigo-600 text-white hover:bg-indigo-700"
            } rounded-full mx-2`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
