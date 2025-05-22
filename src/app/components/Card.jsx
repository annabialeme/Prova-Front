import styles from "../../styles/Card.module.css"
import Pacientes from "../pacientes/page"


export default function Pacientes({ pacientes, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(pacientes)}>
      <img
        src={pacientes.patients.png}
        className={styles.patient}
      />
      <h3 className={styles.name}>{pacientes}</h3>
    </div>
  );
}