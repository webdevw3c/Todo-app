import { defineStore } from 'pinia';

interface Task {
  id: number;
  label: string;
  status: string;
  created_at: string;
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    loadTasksFromLocalStorage() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        this.tasks = JSON.parse(tasks);
      }
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    addTask(task: Omit<Task, 'id' | 'created_at'>) {
      this.tasks.push({
        id: this.tasks.length + 1,
        ...task,
        created_at: new Date().toISOString(),
      });
      this.saveTasksToLocalStorage();
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        this.saveTasksToLocalStorage();
      }
    },
    deleteTask(taskToDelete: Task) {
      this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id);
      this.tasks.forEach((task, index) => {
        task.id = index + 1;
      });
      this.saveTasksToLocalStorage();
    },
  },
});