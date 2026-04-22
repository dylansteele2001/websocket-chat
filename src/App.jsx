import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export default function App() {
  const [query, setQuery] = useState("seagull");
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    searchGifs();
  }, []);

  async function searchGifs(searchTerm = query) {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(
        searchTerm
      )}&api_key=${API_KEY}&limit=12`
    );

    const json = await res.json();
    setGifs(json.data || []);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>The Gif Bar</h1>

        <div style={styles.searchBar}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GIFs..."
            style={styles.input}
          />
          <button onClick={() => searchGifs()} style={styles.button}>
            Search
          </button>
        </div>

        <div style={styles.grid}>
          {gifs.map((gif) => (
            <div key={gif.id} style={styles.card}>
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                style={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#0f0f0f",
    minHeight: "100vh",
    color: "#fff",
    padding: 20,
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  input: {
    padding: 10,
    width: 300,
    borderRadius: 8,
    border: "none",
  },
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#ff4d6d",
    color: "white",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 15,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    background: "#1a1a1a",
  },
  image: {
    width: "100%",
    display: "block",
  },
};
