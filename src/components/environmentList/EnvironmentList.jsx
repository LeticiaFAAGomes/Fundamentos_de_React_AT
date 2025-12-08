import EnvironmentCard from "../environmentCard/EnvironmentCard";
import styles from "./EnvironmentList.module.css";

export default function EnvironmentList({ monitoramentoAmbiental }) {
  return (
    <section className='cards' id='environmentCard'>
      <div className={styles.cards__container}>
        {monitoramentoAmbiental.map((dado) => {
          return <EnvironmentCard key={dado.id} id={dado.id} location={dado.location} condition={dado.condition} isActive={dado.isActive} lastUpdate={dado.lastUpdate} description={dado.description} />;
        })}
      </div>
    </section>
  );
}
