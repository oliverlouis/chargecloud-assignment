import { onMounted, onUnmounted, type Ref } from 'vue';
import type { Task } from '~/stores/tasks.store';

export function useKeyboardNavigation(
  tasks: Ref<Task[]>,
  toggleTaskCompletion: (id: number) => Promise<void>
) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ' && event.target instanceof HTMLElement) {
      const taskIndexAttr = event.target.getAttribute('data-task-index');
      if (taskIndexAttr !== null) {
        const taskIndex = parseInt(taskIndexAttr);
        if (!isNaN(taskIndex) && taskIndex >= 0 && taskIndex < tasks.value.length) {
          event.preventDefault();
          toggleTaskCompletion(tasks.value[taskIndex].id);
        }
      }
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}
