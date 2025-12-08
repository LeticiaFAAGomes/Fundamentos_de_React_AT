import Header from "../components/header/Header";
import EnvironmentList from "../components/environmentList/EnvironmentList";
import MonitoringForm from "../components/monitoringForm/MonitoringForm";
import FilterBar from "../components/filterBar/FilterBar";
import Favoritos from "../components/favoritosView/FavoritosView";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [monitoringData, setMonitoringData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filtro, setFiltro] = useState("Todos");
  const dadosFiltrados = filtro === "Todos" ? monitoringData : monitoringData.filter((resultado) => resultado.condition === filtro);
  const [favoritos, setFavoritos] = useState([]);
  const favoritosData = monitoringData.filter((d) => favoritos.includes(d.id));
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

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
              </div>

              {isFormVisible && <MonitoringForm />}

              <EnvironmentList monitoringData={dadosFiltrados} favoritos={favoritos} toggleFavorito={toggleFavorito} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
