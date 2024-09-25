<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ActionButtons',
  props: {
    task: {
      type: Object as PropType<any>
    },
  },
});
</script>

<template>
  <div class="wrap">
    <button class="wrap__button btn" @click="$emit('edit')">
      <img src="../assets/images/icons/edit.svg" alt="edit">
    </button>
    <button class="wrap__button btn" @click="$emit('delete', task)">
      <img src="../assets/images/icons/delete.svg" alt="delete">
    </button>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: center;

  &__button:last-child {
    margin-left: 10px;
  }
}
</style>
