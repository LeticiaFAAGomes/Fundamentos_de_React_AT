import styles from "./EnvironmentCard.module.css";

export default function EnvironmentCard({ dado }) {
  const id = dado.id;
  const location = dado.location;
  const condition = dado.isActive;
  const lastUpdate = dado.lastUpdate;
  const description = dado.description;
  let ehAtivo = definirStatusMonitoramento();

  function definirStatusMonitoramento() {
    return dado.isActive ? <span className={styles.ativo}>• Monitoramento Ativo</span> : <span className={styles.inativo}> • Monitoramento Inativo</span>;
  }

  return (
    <>
      <div className={styles.card} id='environmentCard'>
        <div className={styles.card__container}>
          <h2>{dado.location}</h2>
          <div className={styles.card__detalhes}>
            <span>● {dado.condition}</span>
            {ehAtivo}
            <span>• Última Atualização: {lastUpdate}</span>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
