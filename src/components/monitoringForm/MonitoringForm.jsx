import styles from "./MonitoringForm.module.css";

export default function MonitoringForm() {
  return (
    <div className={styles.form__container}>
      <h2>Formulário de Adição de Local de Monitoramento</h2>
      <form>
        <div className={styles.input__individual}>
          <label htmlFor='location'>Local</label>
          <input type='text' placeholder='Ex.: Chapada Diamantina' name='location' id='location' />
        </div>
        <div className={styles.input__individual}>
          <label htmlFor='condition'>Condição</label>
          <input type='text' placeholder='Ex.: Boa' name='condition' id='condition' />
        </div>
        <label htmlFor='status'>É ativo?</label>
        <div className={styles.input__grupo}>
          <div className={styles.input__grupo}>
            <input type='radio' value={true} name='status' id='true' defaultChecked />
            <label htmlFor='critico'>Ativo</label>
          </div>

          <div className={styles.input__grupo}>
            <input type='radio' value={false} name='status' id='false' />
            <label htmlFor='false'>Inativo</label>
          </div>
        </div>
        <div className={styles.input__individual}>
          <label htmlFor=''>Descriçao</label>
          <textarea placeholder='Ex.: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eius vitae eligendi ut provident illo.' name='description' id='description' cols='30' rows='10'></textarea>
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}
