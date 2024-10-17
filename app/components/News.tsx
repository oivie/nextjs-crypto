"use client";

import { useEffect, useState } from "react";

interface Article {
  title: string;
  author: string | null;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full text-center ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
        disabled={page === '...'}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Cryptocurrency News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {currentArticles.filter((article) => article.author).map((article, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
              <h2 className="text-2xl font-bold text-black">{article.title}</h2>
              <p className="text-black">Author: {article.author || "Unknown"}</p>
              <p className="text-black">Source: {article.source.name}</p>
              <p className="text-black">Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
              <p className="text-black">{article.description}</p>
              <a
                href={article.url}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`w-20 h-10 flex items-center justify-center ${currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-600 text-white'} rounded-full hover:bg-indigo-700`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex items-center">
            {renderPagination()}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`w-20 h-10 flex items-center justify-center ${currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'} rounded-full mx-2`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
