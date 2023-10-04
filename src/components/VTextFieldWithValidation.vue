<script setup>
  import { toRef } from 'vue';
  import { useField } from 'vee-validate';
  import { vMaska } from "maska";
  
  const props = defineProps({
    name: {
      type: String,
      requird: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      required: false,
    },
    min: {
    type: String,
    default: '',
    },
    max: {
      type: String,
      default: '',
    },
    maxlength: {
      type: String,
      default: undefined,
    },
    inputmode:{
      type: String,
      default: '',
    },
    maskOption:{
      type: Object
    }
    
  
 
  });
  
  const { value, handleBlur, errors } = useField(toRef(props, 'name'), undefined);
  
  let min = '';
  let max = '';
 
  
  if (props.type === 'date') {
    min = props.min;
    max = props.max;
  }

  </script>
  
  <template>
    <v-text-field
      v-model="value"
      @blur="handleBlur"
      :label="label"
      :error-messages="errors"
      variant="outlined"
      hide-details="auto"
      v-if="maskOption"
      v-maska:[props.maskOption]
    />

    <v-text-field
      v-else
      v-model="value"
      @blur="handleBlur"
      :label="label"
      :error-messages="errors"
      :type="type"
      :min="min"
      :max="max"
      :maxlength="maxlength"
      variant="outlined"
      hide-details="auto"
    />
  </template>
