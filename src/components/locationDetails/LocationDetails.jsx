import { useState } from "react";

export default function LocationDetails(id) {
  const [locationDetails, setLocationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationDetails = async (arquivo) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/${arquivo}`);
      const data = await response.json();
      setLocationDetails(data);
    } catch (error) {
      setError(error.message);
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
        </div>
      )}
      {!locationDetails && <button onClick={() => fetchLocationDetails(`./api/monitoringDetails/monitoringDetails${id.id}.json`)}>Carregar Detalhes</button>}
    </>
  );
}
