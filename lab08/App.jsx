import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-slick";

const carouselStyles = {
  width: "640px",
  border: "solid 1px #000",
  margin: "auto",
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(5); 
  const [tracks, setTracks] = useState([]);

  // transforms each track JSON object to an iframe JSX
  const processIframe = () => {
    return tracks.map((track) => (
      <iframe
        key={track.id}
        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    ));
  };

  // fetch data from URL 
  async function fetchData() {
      const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
      const url = `${baseURL}?q=${searchTerm}&type=track&limit=${limit}`;
      const request = await fetch(url);
      const data = await request.json();
      console.log(data);
      setTracks(data);
  }

  const initialize = (e) => {
      e.preventDefault(); 
      fetchData();
  };

  return (
    // title
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        padding: '30px',
      }}
    >
      <h1>Spotify Demo</h1>

      {/* Horizontal Line */}
      <hr
        style={{
          width: '120%',
          height: '10px',
          borderTop: '2px dotted black',
          lineHeight: '90%',
          margin: '20px 0',
        }}
      />

      {/* Search form */}
      <form onSubmit={initialize}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a track"
          style={{
            display: 'block',
            marginBottom: '10px',
            width: '250px',
            height: '30px',
            borderRadius: '10px',
            paddingLeft: '10px', 
          }}
        />

        {/* Limit input */}
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="Limit"
          style={{
            display: 'block',
            marginBottom: '10px',
            width: '250px',
            height: '30px',
            borderRadius: '10px',
            paddingLeft: '10px', 
          }}
        />

        {/* Submit button */}
        <button
          type="submit"
          style={{
            display: 'block',
            width: '80px',
            height: '30px',
            backgroundColor: '#007AFF',
            color: 'white',
            fontSize: '15px',
            borderRadius: '10px',
            cursor: 'pointer', 
            border: 'none',     
            marginTop: '10px',  
          }}
        >
          Submit
        </button>
      </form>

      {/* Render iframes of tracks */}
      <div style={{ marginTop: '20px' }}>
        {processIframe()}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Search /> {}
    </div>
  );
}

