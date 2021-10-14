import { onUnmounted, ref, unref } from 'vue';
import { CxDialogActions } from './types';

export function useCxDialog(): [(instance: CxDialogActions) => void, CxDialogActions] {
  const dialogRef = ref<CxDialogActions|null>(null);

  function register(instance: CxDialogActions) {
    onUnmounted(() => {
      dialogRef.value = null;
    });

    dialogRef.value = instance;
  }

  function getDialogInstance(): CxDialogActions {
    const dialog = unref(dialogRef);

    if (!dialog) {
      throw new Error('dialog is undefined!');
    }

    return dialog;
  }

  const methods: CxDialogActions = {
    openDialog: (visible = true) => {
      getDialogInstance().openDialog(visible);
    }
  };

  return [register, methods];
}
