<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TaskStatusSelect',
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateStatus(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.$emit('update:modelValue', target.value);
    }
  }
});
</script>

<template>
  <select class="select" :value="modelValue" @change="updateStatus">
    <option value="done">Done</option>
    <option value="cancel">Cancel</option>
    <option value="new">New</option>
  </select>
</template>

<style scoped lang="scss">
.select {
  padding: 8px;
}

.select:hover,
.select:focus,
.select:active {
  border-color: #40a9ff;
}
</style>