import "./assets/css/App.css";
import Header from "./components/header/Header";
import EnvironmentList from "./components/environmentList/EnvironmentList";
import { useState, useEffect } from "react";
import MonitoringForm from "./components/monitoringForm/MonitoringForm";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [monitoringData, setMonitoringData] = useState([]);

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
    <div className='App'>
      <Header />
      <main>
        <div className='container'>
          <button onClick={toggleForm}>{isFormVisible ? "Fechar Formulário" : "Adicionar Local"}</button>
          {isFormVisible && <MonitoringForm />}

          <EnvironmentList monitoringData={monitoringData} />
        </div>
      </main>
    </div>
  );
}

export default App;
