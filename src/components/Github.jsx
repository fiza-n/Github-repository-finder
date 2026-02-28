import API from "../api/api";
import { useEffect, useState } from "react";

const Github = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  const [randomRepo, setRandomRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepositories = async () => {
    if (!selectedOption.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await API.get(
        `/search/repositories?q=${encodeURIComponent(
          selectedOption
        )}&per_page=20`
      );

      const repos = response.data.items;
      setData(repos);

      if (repos.length > 0) {
        const randomIndex = Math.floor(Math.random() * repos.length);
        setRandomRepo(repos[randomIndex]);
      } else {
        setRandomRepo(null);
      }
    } catch (err) {
      setError("Error fetching repositories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [selectedOption]);

  const handleRefresh = () => {
    if (data.length === 0) return;

    let randomIndex = Math.floor(Math.random() * data.length);

    if (randomRepo && data[randomIndex].id === randomRepo.id) {
      randomIndex = (randomIndex + 1) % data.length;
    }

    setRandomRepo(data[randomIndex]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">

        <h2 className="text-xl font-semibold mb-4">
          GitHub Repository Finder
        </h2>

        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full border p-2 rounded-md mb-4"
        >
          <option value="" disabled>
            Select a Language
          </option>
          <option value="language:javascript">JavaScript</option>
          <option value="language:python">Python</option>
          <option value="language:cpp">C++</option>
          <option value="language:typescript">TypeScript</option>
          <option value="language:html">HTML</option>
        </select>

        
        {!selectedOption && (
          <div className="bg-gray-200 p-6 rounded-md text-center text-gray-600">
            Please select a language
          </div>
        )}

     
        {loading && (
          <div className="bg-gray-200 p-6 rounded-md text-center">
            Loading, please wait...
          </div>
        )}

       
        {error && (
          <div>
            <div className="bg-red-200 text-red-800 p-4 rounded-md text-center">
              {error}
            </div>
            <button
              onClick={fetchRepositories}
              className="w-full bg-red-500 text-white p-2 rounded-md mt-3"
            >
              Click to retry
            </button>
          </div>
        )}

      
       {randomRepo && !loading && !error && (
  <div className="border p-4 rounded-md shadow-sm">
    <h3 className="font-semibold text-lg">{randomRepo.name}</h3>

    <p className="text-sm text-gray-600 mt-2">
      {randomRepo.description || "No description available."}
    </p>

    <div className="text-sm mt-3 text-gray-700">
      <span>{randomRepo.language}</span> |{" "}
      <span>⭐ {randomRepo.stargazers_count}</span> |{" "}
      <span>🍴 {randomRepo.forks_count}</span>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-4">
      <a
        href={randomRepo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
      >
        View Repository
      </a>

      <button
        onClick={handleRefresh}
        className="flex-1 bg-black text-white py-2 rounded-md transition cursor-pointer"
      >
        Refresh
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Github;