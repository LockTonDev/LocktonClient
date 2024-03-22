<script setup>
  import { toRef } from 'vue';
  import { useField } from 'vee-validate';
   
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    itemText: {
    type: String,
    default: 'text' // 기본값으로 'text' 속성 사용
    },
    itemValue: {
      type: String,
      default: 'value' // 기본값으로 'value' 속성 사용
    }


  });
  
  const { value, handleChange , errors } = useField(toRef(props, 'name'), undefined);
  
  
</script>

<template>

  <v-select  
    v-model="value"
    @change="handleChange"
    :label="label"
    :items="items"
    item-text="title"
    item-value="value"
    :error-messages="errors"
    variant="outlined"
    hide-details="auto"
    class="custom-text-field"
 />
</template>

<style>
@media screen and (min-width:960px) {
  .custom-text-field .v-input__control .v-field__input {
  }
}
@media screen and (max-width:959px) {
  .custom-text-field .v-input__control .v-field__input{
    height: 30px; /* 원하는 높이 값으로 변경 */
    min-height: 30px;
  }
}
</style>