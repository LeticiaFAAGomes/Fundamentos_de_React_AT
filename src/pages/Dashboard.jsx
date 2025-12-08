import Header from "../components/header/Header";
import EnvironmentList from "../components/environmentList/EnvironmentList";
import MonitoringForm from "../components/monitoringForm/MonitoringForm";
import FilterBar from "../components/filterBar/FilterBar";
import Favoritos from "../components/favoritosView/FavoritosView";
import SortControls from "../components/sortControls/SortControls";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [monitoringData, setMonitoringData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filtro, setFiltro] = useState("Todos");
  const [criterioOrdenacao, setCriterioOrdenacao] = useState("location");
  const dadosFiltrados = filtro === "Todos" ? monitoringData : monitoringData.filter((resultado) => resultado.condition === filtro);
  const [favoritos, setFavoritos] = useState([]);

  function toggleForm() {
    setIsFormVisible(!isFormVisible);
  }

  const toggleFavorito = (id) => {
    setFavoritos((prevFavoritos) => {
      if (prevFavoritos.includes(id)) {
        return prevFavoritos.filter((favId) => favId !== id);
      } else {
        return [...prevFavoritos, id];
      }
    });
  };

  const dadosOrdenados = [...dadosFiltrados].sort((a, b) => {
    switch (criterioOrdenacao) {
      case "location":
        return a.location.localeCompare(b.location, "pt-BR");
      case "condition":
        return a.condition.localeCompare(b.condition, "pt-BR");
      case "lastUpdate":
        return new Date(b.lastUpdate) - new Date(a.lastUpdate);
      case "status":
        return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
      case "sensors":
        return (b.sensors?.length || 0) - (a.sensors?.length || 0);
      default:
        return 0;
    }
  });

  const fetchMonitoringData = () => {
    fetch("./api/monitoring.json")
      .then((response) => response.json())
      .then((data) => {
        setMonitoringData(data);
        const favoritosIniciais = data.filter((dado) => dado.isFavorite).map((dado) => dado.id);
        setFavoritos(favoritosIniciais);
      })
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
          <div className='container__colunas'>
            <aside className='container__sidebar'>
              <Favoritos monitoringData={monitoringData} favoritos={favoritos} toggleFavorito={toggleFavorito} />
            </aside>

            <section className='container__main'>
              <div className='container__wrap'>
                <button onClick={toggleForm}>{isFormVisible ? "Fechar Monitoramento" : "+ Novo Monitoramento"}</button>
                <FilterBar mudancaFiltro={setFiltro} />
                <SortControls criterioOrdenacao={criterioOrdenacao} setCriterioOrdenacao={setCriterioOrdenacao} />
              </div>
              {isFormVisible && <MonitoringForm />}
              <EnvironmentList monitoringData={dadosOrdenados} favoritos={favoritos} toggleFavorito={toggleFavorito} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
