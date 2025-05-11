<script lang="ts" setup>
import {defineProps, computed} from 'vue';

const props = defineProps<{
  isCompleted: boolean;
  isLoading: boolean;
  onClick: () => void;
}>();

const buttonText = computed<string>(() => {
  if (props.isLoading) {
    return 'Updating...';
  }
  return props.isCompleted ? 'Mark as Pending' : 'Mark as Complete';
});

const dynamicButtonClasses = computed<Record<string, boolean>>(() => {
  return {
    'bg-yellow-600 hover:bg-yellow-700 text-white': props.isCompleted,
    'bg-green-700 hover:bg-green-800 text-white': !props.isCompleted,
    'opacity-50 cursor-not-allowed': props.isLoading,
  };
});
</script>

<template>
  <button
      :class="dynamicButtonClasses"
      :disabled="isLoading"
      class="px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out sm:ml-3 sm:whitespace-nowrap"
      @click="onClick"
  >
    {{ buttonText }}
  </button>
</template>
