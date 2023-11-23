import React, { useState } from 'react';
import './index.css'

const MyWikiSearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const createAndAppendSearchResult = (result) => {
    const { link, title, description } = result;

    return (
      <div key={link} className="result-item">
        <a href={link} target="_blank" rel="noopener noreferrer" className="result-title">
          {title}
        </a>
        <br />
        <a href={link} target="_blank" rel="noopener noreferrer" className="result-url">
          {link}
        </a>
        <br />
        <p className="link-description">{description}</p>
      </div>
    );
  };

  const displayResults = (searchResults) => {
    setLoading(false);
    setSearchResults(searchResults);
  };

  const searchWikipedia = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      setSearchResults([]);

      const url = `https://apis.ccbp.in/wiki-search?search=${searchInput}`;
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        const { search_results } = jsonData;
        displayResults(search_results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="wiki-search-header text-center">
      <img className="wiki-logo" alt='' src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png" />
        <input
          placeholder="Type a keyword and press Enter to search"
          type="search"
          className="search-input w-100"
          id="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={searchWikipedia}
        />
      </div>
      <div className={loading ? '' : 'd-none'} id="spinner">
        
      </div>
      <div className="search-results" id="searchResults">
        {searchResults.map((result) => createAndAppendSearchResult(result))}
      </div>
    </div>
  );
};

export default MyWikiSearchComponent;
