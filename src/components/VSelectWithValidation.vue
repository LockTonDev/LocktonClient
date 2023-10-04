<script setup>
  import { toRef } from 'vue';
  import { useField } from 'vee-validate';
   
  
  const props = defineProps({
    name: {
      type: String,
      requird: true,
    },
    items: {
      type: Array,
      requird: true,
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
 />
</template>
