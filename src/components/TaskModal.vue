<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TaskStatusSelect from '../components/TaskStatusSelect.vue';

export default defineComponent({
  name: 'TaskModal',
  components: {
    TaskStatusSelect,
  },
  props: {
    visible: {
      type: Boolean
    },
    form: {
      type: Object as PropType<{ label: string; status: string }>
    },
  },
});
</script>

<template>
  <div v-if="visible" class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__title">Todo Item</h2>
        <button class="modal__close" @click="$emit('cancel')" aria-label="Close">
          <img class="modal__close-img" src="../assets/images/icons/close.svg" alt="close">
        </button>
      </div>

      <div class="modal__body">
        <div class="modal__body-itme body-itme">
          <label class="body-itme__label" for="textName">
            Name:
          </label>
          <input id="textName" class="body-itme__input" type="text" v-if="form?.label" v-model="form.label"
            placeholder="Enter todo name" />
        </div>
        <div class="modal__body-itme body-itme">
          <label class="body-itme__label" for="textStatus">
            Status:
          </label>
          <TaskStatusSelect id="textStatus" v-if="form?.status" v-model="form.status" />
        </div>
      </div>

      <div class="modal__footer">
        <button class="modal__footer-btn btn" @click="$emit('ok')">OK</button>
        <button class="modal__footer-btn btn" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    width: 500px;
    background-color: #fff;
    border-radius: 4px;
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #e8e8e8;
  }

  &__close {
    position: absolute;
    top: 55%;
    right: 10px;
    transform: translate(0%, -50%);
    width: 50px;
    height: 50px;
  }

  &__close-img {
    width: 20px;
    height: 20px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    padding: 24px;
  }

  &__body-itme {
    display: flex;
    flex-direction: column;
  }

  &__body-itme:first-child {
    margin-bottom: 24px;
  }

  &__footer {
    padding: 10px 16px;
    text-align: right;
    border-top: 1px solid #e8e8e8;
  }

  &__footer-btn:last-child {
    margin-left: 10px;
  }
}

.body-itme {

  &__label {
    margin-bottom: 10px;
  }

  &__input {
    font-family: inherit;
    font-weight: 400;
    padding: 8px;
    border: 1px solid transparent;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    height: 32px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border-color: #d9d9d9;
    outline: none;
  }

  &__input:hover,
  &__input:focus,
  &__input:active {
    border-color: #40a9ff;
  }
}
</style>