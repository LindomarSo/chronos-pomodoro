import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getnextCycle";
import { getNextCycleType } from "../../utils/getnextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();
  const cycles = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
  }

  return (
    <div className={styles.cycles}>
      <span>Ciclos: </span>
      <div className={styles.cycleDots}>
        {cycles.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              aria-label={cycleDescriptionMap[nextCycleType]}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              key={index}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
