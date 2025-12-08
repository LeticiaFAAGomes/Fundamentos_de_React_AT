import "./assets/css/App.css";
import Header from "./components/header/Header";
import EnvironmentList from "./components/environmentList/EnvironmentList";
import React, { useState } from "react";
import MonitoringForm from "./components/monitoringForm/MonitoringForm";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  function toggleForm() {
    setIsFormVisible(!isFormVisible);
  }
  const monitoringData = [
    {
      id: 1,
      location: "São Paulo",
      condition: "Condição Crítica",
      isActive: false,
      lastUpdate: "02/12/2025",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eius vitae eligendi ut provident illo, quisquam, unde earum cumque magnam tenetur, ipsam distinctio ad quo aspernatur. Iste exercitationem natus earum!",
    },
    {
      id: 2,
      location: "Chapada Diamantina",
      condition: "Condição Boa",
      isActive: true,
      lastUpdate: "08/12/2025",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eius vitae eligendi ut provident illo, quisquam, unde earum cumque magnam tenetur, ipsam distinctio ad quo aspernatur. Iste exercitationem natus earum!",
    },
  ];
  return (
    <div className='App'>
      <Header />
      <main>
        <div className='container'>
          <button onClick={toggleForm}>{isFormVisible ? "Fechar Formulário" : "Adicionar Local"}</button>
          {isFormVisible && <MonitoringForm />}
        </div>
        <EnvironmentList monitoringData={monitoringData} />
      </main>
    </div>
  );
}

export default App;
