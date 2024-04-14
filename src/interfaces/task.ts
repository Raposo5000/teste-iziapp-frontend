export type TypeStatusTask = "to-do" | "completed";

export interface ITask {
  id: number;
  status: TypeStatusTask;
  title: string;
  userId: number;
}