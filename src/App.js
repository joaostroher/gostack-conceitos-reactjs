import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadData() {
      const response = await api.get("repositories");
      setRepositories(response.data);
    }
    loadData();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title,
      url,
      techs: techs.split(",").map((item) => item.trim()),
    });
    setTitle("");
    setUrl("");
    setTechs("");
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(newRepositories);
  }

  function getValueAndPreventDefault(event) {
    event.preventDefault();
    return event.target.value;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={String(repository.id)}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(getValueAndPreventDefault(event))}
        />
      </label>
      <label>
        URL
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(getValueAndPreventDefault(event))}
        />
      </label>
      <label>
        Techs
        <input
          type="text"
          value={techs}
          onChange={(event) => setTechs(getValueAndPreventDefault(event))}
        />
      </label>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
