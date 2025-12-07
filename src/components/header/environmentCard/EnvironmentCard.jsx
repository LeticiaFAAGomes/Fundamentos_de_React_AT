import styles from "./EnvironmentCard.module.css";

export default function EnvironmentCard({ location, condition, isActive }) {
  let ehAtivo = definirStatusMonitoramento();

  function definirStatusMonitoramento() {
    return isActive ? <span className={styles.ativo}>• Monitoramento Ativo</span> : <span className={styles.inativo}> • Monitoramento Inativo</span>;
  }

  return (
    <>
      <div className={styles.card} id='environmentCard'>
        <div className={styles.card__container}>
          <h2>{location}</h2>
          <div className={styles.card__detalhes}>
            <span>● {condition}</span>
            {ehAtivo}
          </div>
        </div>
      </div>
    </>
  );
}
