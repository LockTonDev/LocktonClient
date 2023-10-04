<template>
  <v-dialog persistent v-model="isOpenDialog" width="1000px" hide-overlay scrollable>
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
            <div class="text-h6 font-weight-medium">
                <v-icon size="30">mdi-information</v-icon>&nbsp;공지사항 상세보기 / 작업중
            </div>
            
            <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>
        
        </v-card-title>
        <v-card-text class="pa-0">
          ...
        </v-card-text>

      </v-card>
  </v-dialog>
   
</template>



<script setup lang="ts">
import { onMounted, ref, defineProps,  } from 'vue';
import { useRoute } from 'vue-router'


import apiBoard from '@/api/api/board.api';
import { BoardDTO } from '@/model';


const props = defineProps({
  business_cd: {
    type: String,
    required: true
    },
  board_id: {
    type: String,
    required: true
    },
    board_no: {
      type: Number,
      required: true
    }
})

const boardDTO = ref(new BoardDTO());
const isOpenDialog = ref(false);

const getItem = async () => {
  const params = { business_cd: props.business_cd, board_id: props.board_id, board_no: props.board_no};
  const { data } = await  apiBoard.getItem(params);
  boardDTO.value = data;
 
};
const emit = defineEmits(['close']);

const close = () => {
    isOpenDialog.value = false;
    emit('close');
};

onMounted(async () => {  
 
 //getItem();
  console.log(isOpenDialog.value);
  isOpenDialog.value = true;
});

</script>