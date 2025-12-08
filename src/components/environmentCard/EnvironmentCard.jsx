import styles from "./EnvironmentCard.module.css";
import LocationDetails from "../locationDetails/LocationDetails";

export default function EnvironmentCard({ id, location, name, condition, isActive, lastUpdate, description, isFavorite, onToggleFavorito }) {
  let ehAtivo = definirStatusMonitoramento();

  function definirStatusMonitoramento() {
    return isActive ? <span className={styles.ativo}>• Monitoramento Ativo</span> : <span className={styles.inativo}> • Monitoramento Inativo</span>;
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card__container}>
          <header style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>{`${id}. ${name} - ${location} `}</h2>
            <button style={{ fontSize: "20px", fontWeight: "500", cursor: "pointer", background: "none", border: "none" }} onClick={() => onToggleFavorito(id)}>
              {isFavorite ? "★ Favorito" : "☆ Favoritar"}
            </button>
          </header>
          <div className={styles.card__detalhes}>
            {ehAtivo}
            {condition && <span>● Condição {condition} </span>}
            {lastUpdate && <span>• Última Atualização: {lastUpdate}</span>}
          </div>
          <LocationDetails id={id} />
          {description && <p>{description}</p>}
        </div>
      </div>
    </>
  );
}
