import React from "react";
import "./index.scss";
import Collection from "./Collection";

const categories = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";

    fetch(
      `https://65007a5618c34dee0cd4fb0c.mockapi.io/Photo-Collection?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((error) => {
        console.warn(error);
        alert("Ошибка при получении данных");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((item, index) => (
            <li
              className={categoryId === index ? "active" : ""}
              onClick={() => setCategoryId(index)}
              key={item.name}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Загрузка коллекций...</h2>
        ) : (
          collections
            .filter((item) => {
              return item.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((item, index) => (
              <Collection key={index} name={item.name} images={item.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            className={page === index + 1 ? "active" : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
