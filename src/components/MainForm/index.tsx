import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import styles from "./styles.module.css";
import type React from "react";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getnextCycle";
import { getNextCycleType } from "../../utils/getnextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskInputName = useRef<HTMLInputElement>(null);

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskInputName.current?.value) return;

    const taskName = taskInputName.current.value.trim();

    if (!taskName) {
      alert("Por favor, insira uma tarefa válida.");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    } as TaskModel;

    const secondsRemaining = newTask.duration * 60;
    setState((prevState) => {
      return {
        ...prevState,
        secondsRemaining,
        activeTask: newTask,
        currentCycle: nextCycle,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
        config: { ...prevState.config },
      };
    });
  }

  function handleInterruptTask() {
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        currentCycle: 0,
        formattedSecondsRemaining: "00:00",
        tasks: prevState.tasks.map((task) => {
          if (prevState.activeTask && prevState.activeTask.id === task.id) {
            return { ...task, interruptedDate: Date.now() };
          }

          return task;
        }),
      };
    });
  }

  return (
    <form
      action=""
      className={styles.form}
      onSubmit={handleNewTask}
    >
      <div className={styles.formRow}>
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="Tarefa"
          placeholder="O que você vai fazer?"
          ref={taskInputName}
          disabled={!!state.activeTask}
        />
      </div>
      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      {!state.activeTask ? (
        <div className={styles.formRow}>
          <DefaultButton
            color="green"
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
            key="submit"
          />
        </div>
      ) : (
        <div className={styles.formRow}>
          <DefaultButton
            color="red"
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            type="button"
            onClick={handleInterruptTask}
            icon={<StopCircleIcon />}
            key="button"
          />
        </div>
      )}
    </form>
  );
}
