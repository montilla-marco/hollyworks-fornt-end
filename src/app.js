import { useState } from 'react';
import axios from 'axios';
import './app.css';

const App = () => {
  const [yearOf, setYearOf] = useState(2023);
  const [numberOf, setNumberOf] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [reset, setReset] = useState(false);

  const buildResult = (hollyworks) => setResults(hollyworks.map((number) => <li>{number}</li>));

  const getHollyWorks = () => {
    const baseURL = `http://localhost:9000/api/v1/hollyworks?yearOf=${yearOf}&numberOf=${numberOf}`;
    axios.get(baseURL).then((response) => {
      buildResult(response.data);
      setShowResult(!showResult);
    });
  };

  const cleanResult = () => {
    setShowResult(!showResult);
  };

  const handleSubmit = (event) => {
    setReset(!reset);
    event.preventDefault();
    if (!event.target.value) {
      getHollyWorks();
    } else {
      cleanResult();
    }
  };

  return (
    <section className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="year">
          Año a consultar:
          <input
            id="year"
            type="text"
            value={yearOf}
            onChange={(e) => setYearOf(e.target.value)}
          />
        </label>
        <label htmlFor="number">
          Número de feriados:
          <input
            id="number"
            type="text"
            value={numberOf}
            onChange={(e) => setNumberOf(e.target.value)}
          />
        </label>
        <input type="submit" value={reset ? 'Limpiar' : 'Consultar'} />
        <div className="result-container" style={{ display: showResult ? 'block' : 'none' }}>
          <ul className="result">
            {results}
          </ul>
        </div>
      </form>
    </section>
  );
};

export default App;
