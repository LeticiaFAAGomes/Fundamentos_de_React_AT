export default function FiltroBar({ mudancaFiltro }) {
  return (
    <>
      <div>
        <select name='filtro' onChange={(e) => mudancaFiltro(e.target.value)}>
          <optgroup label='Condição'>
            <option value='Todos'>Todos</option>
            <option value='Bom'>Bom</option>
            <option value='Moderado'>Moderado</option>
            <option value='Crítico'>Crítico</option>
          </optgroup>
        </select>
      </div>
    </>
  );
}
