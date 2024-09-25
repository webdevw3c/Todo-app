<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/todoStore';

import TaskModal from './TaskModal.vue';
import TaskStatusSelect from './TaskStatusSelect.vue';
import ActionButtons from './ActionButtons.vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    TaskModal,
    TaskStatusSelect,
    ActionButtons,
  },
  setup() {
    const store = useTaskStore();

    const modalVisible = ref(false);
    const edit = ref(false);
    const form = ref({ id: 0, label: 'New task', status: 'new', created_at: '' });

    onMounted(() => {
      store.loadTasksFromLocalStorage();
    });

    const tasks = computed(() => store.tasks);

    const formatDate = (date: string) => new Date(date).toLocaleString('ru');

    const showModal = (editItem: any) => {
      edit.value = !!editItem;
      form.value = editItem ? { ...editItem } : { label: 'New task', status: 'new' };
      modalVisible.value = true;
    };

    const handleOk = () => {
      if (edit.value) {
        store.updateTask(form.value);
      } else {
        store.addTask(form.value);
      }
      modalVisible.value = false;
    };

    const handleCancel = () => {
      modalVisible.value = false;
    };

    const deleteTask = (item: any) => {
      store.deleteTask(item);
    };

    return {
      modalVisible,
      form,
      tasks,
      showModal,
      handleOk,
      handleCancel,
      deleteTask,
      formatDate,
    };
  },
});
</script>

<template>
  <div class="page">

    <h1>Todo List</h1>

    <button class="modal-btn btn" @click="showModal(null)">Add</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.label }}</td>
          <td>
            <TaskStatusSelect v-model="task.status" />
          </td>
          <td>{{ formatDate(task.created_at) }}</td>
          <td>
            <ActionButtons :task="task" @edit="showModal(task)" @delete="deleteTask" />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="tasks.length === 0" class="placeholder">
      <div class="placeholder__inner">
        <img class="placeholder__img" src="../assets/images/icons/noDate.svg" alt="No Date">
        <p class="placeholder__text">No Data</p>
      </div>
    </div>

    <TaskModal :visible="modalVisible" :form="form" @ok="handleOk" @cancel="handleCancel" />
  </div>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  max-width: 800px;
  width: 100%;
  padding: 60px 15px;
  margin: 0 auto;
}

.modal-btn {
  display: flex;
  align-items: center;
  margin: 0 0 16px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 16px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__img {
    margin-bottom: 8px;
  }

  &__text {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>