export default function MonitoringSensorForm({ onAddSensor, onFechar }) {
  function handleSubmit(e) {
    e.preventDefault();
    const dadosFormulario = new FormData(e.currentTarget);
    const novoSensor = {
      id: `sensor-${Date.now()}`,
      name: dadosFormulario.get("name"),
      type: dadosFormulario.get("type"),
    };
    onAddSensor(novoSensor);
    e.currentTarget.reset();
    onFechar();
  }

  return (
    <>
      <div className='bg' onClick={onFechar}>
        <div className='bg__container' onClick={(e) => e.stopPropagation()}>
          <header>
            <h2>Adicionar Sensor</h2>
            <span onClick={onFechar}>X</span>
          </header>
          <form onSubmit={handleSubmit}>
            <div className='input__individual'>
              <label htmlFor='name'>Nome</label>
              <input name='name' placeholder='Ex.: Sensor de Temperatura Ambiente' required />
            </div>
            <div className='input__individual'>
              <label htmlFor='type'>Tipo</label>
              <input name='type' placeholder='Ex.: Temperatura' required />
            </div>
            <button type='submit' className='btn'>
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
