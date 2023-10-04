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
      required: true,
    },


  });
  
  const { value, handleChange , errors } = useField(toRef(props, 'name'), undefined);
  
  
</script>
  
<template>

  <v-checkbox 
    v-model="value"
    @update="handleChange"
    :label="label"
    :items="items"
    :error-messages="errors"
    true-value="Y" 
    false-value="N"
    hide-details="auto"
    class="v-checkbox" />
  

</template>
