export default function SortControls({ criterioOrdenacao, setCriterioOrdenacao }) {
  return (
    <div className='sort__controls'>
      <select id='ordenacao' value={criterioOrdenacao} onChange={(e) => setCriterioOrdenacao(e.target.value)}>
        <option value='location'>Ordenar por: Localização</option>
        <option value='condition'>Ordenar por: Condição</option>
        <option value='lastUpdate'>Ordenar por: Data da última atualização</option>
        <option value='status'>Ordenar por: Status</option>
        <option value='sensors'>Ordenar por: Número de sensores</option>
      </select>
    </div>
  );
}
