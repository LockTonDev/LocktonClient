<template>
  <v-dialog v-model="messageBoxDTO.showMessage" max-width="500px">
    <v-card>
      <v-card-title class="text-h6 font-weight-medium">
        <v-icon size="22">{{ icon }}</v-icon> {{ messageBoxDTO.title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-body-1 word-break-keep-all" v-html="messageBoxDTO.message"></v-card-text>
      <v-card-actions class="justify-end">
        <v-btn v-if="messageBoxDTO.type === 'confirm'" variant="flat" color="primary" @click="handleConfirm">확인</v-btn>
        <v-btn v-if="messageBoxDTO.type === 'confirm'" variant="outlined" color="primary" @click="handleCancel">취소</v-btn>
        <v-btn v-else variant="outlined" color="dark" @click="handleClose">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, watch, defineEmits, ref, watchEffect } from "vue";
import { MessageBoxDTO } from '@/model';

const props = defineProps({
  messageBoxDTO: {
    type: MessageBoxDTO,
    required: true,
  },
});

const { emit } = defineEmits(['close']);

const showDialog = ref(false);
const icon = ref('mdi-information');

watchEffect(() => {
  switch (props.messageBoxDTO?.type) {
    case "info":
      icon.value = "mdi-information";
      break;
    case "warning":
      icon.value = "mdi-alert-circle-outline";
      break;
    case "confirm":
      icon.value = "mdi-help-circle-outline";
      break;
    default:
      icon.value = "mdi-information";
  }
});

const handleConfirm = () => {
  props.messageBoxDTO.confirm();
};

const handleCancel = () => {
  props.messageBoxDTO.close();
};

const handleClose = () => {
  props.messageBoxDTO.close();
};
</script>
