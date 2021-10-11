import { useContext, ref, watch } from 'vue';

export const useRadioConfig = () => {
  const radioValue = ref(-1);
  const { emit } = useContext();

  watch(
    () => radioValue.value,
    val => {
      emit('radioChange', val);
    }
  );

  const removeRadio = () => {
    radioValue.value = -1;
  };

  const setRadio = (val: number) => {
    radioValue.value = val;
  };

  const getRadio = () => {
    return radioValue.value;
  };

  return { radioValue, removeRadio, setRadio, getRadio };
};
