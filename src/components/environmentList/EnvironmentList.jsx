import { useState } from "react";
import EnvironmentCard from "../environmentCard/EnvironmentCard";
import styles from "./EnvironmentList.module.css";

export default function EnvironmentList({ monitoringData, favoritos, toggleFavorito }) {
  const [pagina, setPagina] = useState(1);
  const porPagina = 3;
  const inicio = (pagina - 1) * porPagina;
  const fim = inicio + porPagina;
  const dadosVisiveis = monitoringData.slice(inicio, fim);

  const totalPaginas = Math.ceil(monitoringData.length / porPagina);

  return (
    <section className={styles.cards} id='environmentCard'>
      <div className={styles.cards__container}>
        {dadosVisiveis.map((dado) => (
          <EnvironmentCard key={dado.id} id={dado.id} location={dado.location} condition={dado.condition} isActive={dado.isActive} lastUpdate={dado.lastUpdate} isFavorite={favoritos.includes(dado.id)} onToggleFavorito={toggleFavorito} />
        ))}
      </div>

      <div className={styles.paginacao}>
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
          Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button onClick={() => setPagina(pagina + 1)} disabled={pagina === totalPaginas}>
          Próxima
        </button>
      </div>
    </section>
  );
}
