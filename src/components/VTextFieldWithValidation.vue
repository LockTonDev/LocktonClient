<script setup>
  import { toRef } from 'vue';
  import { useField } from 'vee-validate';
  import { vMaska } from "maska";
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
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
    },
    suffix:{
      type: String,
      default: '',
    },
 
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
      class="custom-text-field"
    />
    <!--
    <v-date-picker v-else-if="type == 'date'" v-model="value" no-title @blur="handleBlur">
    </v-date-picker>
--> <v-text-field
      v-else-if="suffix ==''"
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
      class="custom-text-field"
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
      class="suffixed-input custom-text-field"
    />
  </template>

<style>
.suffixed-input {
  --v-input-control-height: 0;
  --v-input-padding-top: 0;
}

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