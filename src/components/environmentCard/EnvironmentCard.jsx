import styles from "./EnvironmentCard.module.css";
import LocationDetails from "../locationDetails/LocationDetails";

export default function EnvironmentCard({ id, location, condition, isActive, lastUpdate, description }) {
  let ehAtivo = definirStatusMonitoramento();

  function definirStatusMonitoramento() {
    return isActive ? <span className={styles.ativo}>• Monitoramento Ativo</span> : <span className={styles.inativo}> • Monitoramento Inativo</span>;
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card__container}>
          <h2>{`${id}. ${location} `}</h2>
          <div className={styles.card__detalhes}>
            {ehAtivo}
            {condition && <span>● Condição {condition} </span>}
            {lastUpdate && <span>• Última Atualização: {lastUpdate}</span>}
          </div>
          <LocationDetails props={id} />
          {description && <p>{description}</p>}
        </div>
      </div>
    </>
  );
}
