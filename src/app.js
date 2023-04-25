import { useState } from 'react';
import axios from 'axios';
import './app.css';

const App = () => {
  const [yearOf, setYearOf] = useState(2023);
  const [numberOf, setNumberOf] = useState(15);
  const [message, setMessage] = useState('');

  const getHollyWorks = () => {
    const baseURL = `http://localhost:9000/api/v1/hollyworks?yearOf=${yearOf}&numberOf=${numberOf}`;
    axios.get(baseURL).then((response) => {
      setMessage(response.data);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getHollyWorks();
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
        <input type="submit" value="Consultar" />
        <p>
          {message}
        </p>
      </form>
    </section>
  );
};

export default App;
