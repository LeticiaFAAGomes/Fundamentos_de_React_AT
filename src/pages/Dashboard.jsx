import Header from "../components/header/Header";
import EnvironmentList from "../components/environmentList/EnvironmentList";
import MonitoringForm from "../components/monitoringForm/MonitoringForm";
import FilterBar from "../components/filterBar/FilterBar";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filtro, setFiltro] = useState("Todos");
  const [monitoringData, setMonitoringData] = useState([]);
  const dadosFiltrados = filtro === "Todos" ? monitoringData : monitoringData.filter((resultado) => resultado.condition === filtro);

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

  return (
    <>
      <Header />
      <main>
        <div className='container'>
          <div className='container__wrap'>
            <button onClick={toggleForm}>{isFormVisible ? "Fechar Monitoramento" : "+ Novo Monitoramento"}</button>
            <FilterBar mudancaFiltro={setFiltro} />
          </div>
          {isFormVisible && <MonitoringForm />}
          <EnvironmentList monitoringData={dadosFiltrados} />
        </div>
      </main>
    </>
  );
}
