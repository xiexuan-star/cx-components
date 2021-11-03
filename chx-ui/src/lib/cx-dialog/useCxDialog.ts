import { CxDialogActions } from './types';
import { ref, unref, onUnmounted } from 'vue';

export function useCxDialog(): [(instance: CxDialogActions) => void, CxDialogActions] {
  const dialogRef = ref<CxDialogActions | null>(null);

  function register(instance: CxDialogActions) {
    onUnmounted(() => {
      dialogRef.value = null;
    });
    dialogRef.value = instance;
  }

  function getDialogInstance(): CxDialogActions {
    const dialog = unref(dialogRef);

    if (!dialog) {
      throw new Error(`can't get dialog's instance before register`);
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
