import styles from "./MonitoringSensors.module.css";

export default function MonitoringSensors({ sensor }) {
  const { id, name, type } = sensor;
  return (
    <li key={id}>
      <strong>{name}</strong>
      <span>{type}</span>
    </li>
  );
}
