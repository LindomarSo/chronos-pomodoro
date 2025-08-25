import type { TaskModel } from "../../models/TaskModel";

export const TaskActionsTypes = {
  START_TASK: "START_TASK",
  INTERRUPT_TASK: "INTERRUPT_TASK",
  RESET_STATE: "RESET_STATE",
} as const;

export type TaskActionWithPayloadModel = {
  type: (typeof TaskActionsTypes)[typeof TaskActionsTypes.START_TASK];
  payload: TaskModel;
};

export type TaskActionWithoutPayloadModel =
  | {
      type: (typeof TaskActionsTypes)[typeof TaskActionsTypes.RESET_STATE];
    }
  | {
      type: (typeof TaskActionsTypes)[typeof TaskActionsTypes.INTERRUPT_TASK];
    };

export type TaskActionModel =
  | TaskActionWithPayloadModel
  | TaskActionWithoutPayloadModel;
