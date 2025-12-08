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
  const [criterioOrdenacao, setCriterioOrdenacao] = useState("location");
  const [busca, setBusca] = useState("");
  const [filtroCondicao, setFiltroCondicao] = useState("Todos");

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const cardsPorPagina = 3;

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

  const dadosFiltradosAvancado = monitoringData.filter((dado) => {
    const buscaLower = busca.toLowerCase();
    const matchBusca = dado.location.toLowerCase().includes(buscaLower) || dado.condition.toLowerCase().includes(buscaLower) || (dado.description || "").toLowerCase().includes(buscaLower);
    const matchCondicao = filtroCondicao === "Todos" ? true : dado.condition === filtroCondicao;
    const matchData = (!dataInicio || dado.lastUpdate >= dataInicio) && (!dataFim || dado.lastUpdate <= dataFim);
    return matchBusca && matchCondicao && matchData;
  });

  const dadosOrdenados = [...dadosFiltradosAvancado].sort((a, b) => {
    switch (criterioOrdenacao) {
      case "location":
        return a.location.localeCompare(b.location, "pt-BR");
      case "condition":
        return a.condition.localeCompare(b.condition, "pt-BR");
      case "lastUpdate":
        return b.lastUpdate.localeCompare(a.lastUpdate);
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
                <div className='input__agrupamento'>
                  <input type='text' placeholder='Buscar...' className='input__pesquisa' value={busca} onChange={(e) => setBusca(e.target.value)} />
                  <FilterBar mudancaFiltro={setFiltroCondicao} />
                  <SortControls criterioOrdenacao={criterioOrdenacao} setCriterioOrdenacao={setCriterioOrdenacao} />
                </div>
                <div className='input__agrupamento'>
                  <input type='date' value={dataInicio || ""} onChange={(e) => setDataInicio(e.target.value)} />
                  <input type='date' value={dataFim || ""} onChange={(e) => setDataFim(e.target.value)} />
                  <button onClick={toggleForm}>{isFormVisible ? "Fechar Monitoramento" : "+ Novo Monitoramento"}</button>
                </div>
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
