import { createContext, useContext, useState, ReactNode } from "react";

import { AsyncTaskQueue } from "@/core/AsyncTaskQueue";

const TaskQueueContext = createContext<AsyncTaskQueue | null>(null);
export function TaskQueueProvider({ children }: { children: ReactNode }) {
  const [taskQueue] = useState(() => new AsyncTaskQueue());
  return (
    <TaskQueueContext.Provider value={taskQueue}>
      {children}
    </TaskQueueContext.Provider>
  );
}

export function useTaskQueue() {
  const taskQueue = useContext(TaskQueueContext);
  if (!taskQueue) {
    throw new Error("TaskQueueContext not found");
  }
  return taskQueue;
}
