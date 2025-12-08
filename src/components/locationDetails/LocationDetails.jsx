import { useState } from "react";
import MonitoringSensors from "../monitoringSensors/MonitoringSensors";
import styles from "./LocationDetails.module.css";

export default function LocationDetails(props) {
  const [locationDetails, setLocationDetails] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationDetails = async (caminho_details, caminho_sensors) => {
    try {
      setLoading(true);
      setError(null);

      const responseDetails = await fetch(`/${caminho_details}`);
      const dadosDetails = await responseDetails.json();
      setLocationDetails(dadosDetails);

      const responseSensor = await fetch(`${caminho_sensors}`);
      const dadosSensors = await responseSensor.json();
      setSensors(dadosSensors);
    } catch (error) {
      setError(error.message);
      setLocationDetails(null);
      setSensors([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "var(--cor-fonte-erro);" }}>Erro: {error}</p>}
      {locationDetails && (
        <div>
          <p>
            <strong>Local:</strong> {locationDetails.location}
          </p>
          <p>
            <strong>Data Inicial: </strong> {locationDetails.startDate}
          </p>
          <p>
            <strong>Última atualização:</strong> {locationDetails.lastUpdate}
          </p>
          <p>
            <strong>Descrição:</strong> {locationDetails.description}
          </p>

          {sensors.length > 0 && (
            <div>
              <h3>Sensores Ativos</h3>
              <ul>
                {sensors.map((sensor) => (
                  <MonitoringSensors sensor={sensor} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {!locationDetails && <button onClick={() => fetchLocationDetails(`./api/monitoringDetails/monitoringDetails${props.id}.json`, `./api/monitoringSensors/monitoringSensors${props.id}.json`)}>Carregar Detalhes</button>}
    </>
  );
}
