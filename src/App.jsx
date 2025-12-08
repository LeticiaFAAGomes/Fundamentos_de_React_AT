import "./assets/css/App.css";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import EnvironmentList from "./components/environmentList/EnvironmentList";
import MonitoringForm from "./components/monitoringForm/MonitoringForm";
import FilterBar from "./components/filterBar/FilterBar";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [monitoringData, setMonitoringData] = useState([]);
  const [filtro, setFiltro] = useState("Todos");

  function toggleForm() {
    setIsFormVisible(!isFormVisible);
  }

  const fetchMonitoringData = () => {
    fetch("./api/monitoring.json")
      .then((response) => response.json())
      .then((data) => setMonitoringData(data))
      .catch((error) => console.error("Erro no fech", error));
  };

  useEffect(() => {
    fetchMonitoringData();
  }, []);

  const dadosFiltrados = filtro === "Todos" ? monitoringData : monitoringData.filter((resultado) => resultado.condition === filtro);
  return (
    <div className='App'>
      <Header />
      <main>
        <div className='container'>
          <button onClick={toggleForm}>{isFormVisible ? "Fechar Formulário" : "+ Novo Monitoramento"}</button>
          {isFormVisible && <MonitoringForm />}
          <FilterBar mudancaFiltro={setFiltro} />
          <EnvironmentList monitoringData={dadosFiltrados} />
        </div>
      </main>
    </div>
  );
}

export default App;
