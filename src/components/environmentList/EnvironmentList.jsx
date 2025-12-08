import EnvironmentCard from "../environmentCard/EnvironmentCard";
import styles from "./EnvironmentList.module.css";

export default function EnvironmentList({ monitoringData }) {
  return (
    <section className={styles.cards} id='environmentCard'>
      <div className={styles.cards__container}>
        {monitoringData.map((dado) => {
          return <EnvironmentCard key={dado.id} id={dado.id} location={dado.location} condition={dado.condition} isActive={dado.isActive} lastUpdate={dado.lastUpdate} />;
        })}
      </div>
    </section>
  );
}
