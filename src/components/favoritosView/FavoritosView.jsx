import styles from "./FavoritosView.module.css";

export default function Favoritos({ monitoringData, favoritos, toggleFavorito }) {
  const favoritosDados = monitoringData.filter((dado) => favoritos.includes(dado.id));

  return (
    <div className={styles.favoritos}>
      <h2>Favoritos</h2>
      {favoritosDados.length === 0 ? (
        <p>Não há nenhum favorito.</p>
      ) : (
        <ul>
          {favoritosDados.map((dado) => (
            <li key={dado.id} className='favoritos__item' style={{ display: "flex" }}>
              <button style={{ fontSize: "20px", fontWeight: "500", cursor: "pointer", background: "none", border: "none", padding: "0" }} onClick={() => toggleFavorito(dado.id)}>
                ★ Favorito
              </button>
              <h3>{dado.location}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
