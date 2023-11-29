<template>
  <!--로그인 후 팝업-->
  <v-dialog persistent v-model="boardDTO.open_popup" width="600px" hide-overlay scrollable>
    <v-card>
      <v-card-title class="bg-black ">
        <div class="w-sm-90 ma-auto">
          <img src="/assets/Lockton_Logo_White_simbol.png" alt="" class="w-full"/> 
        </div>
      </v-card-title>
      <v-divider color="primary" class="ma-0 border-t-xl"/>
      <v-card-text class="px-12 pt-6 word-break-keep-all" v-html="boardDTO.content">
      </v-card-text>
      <v-card-actions class="d-flex align-center justify-end">
        <div class="d-flex align-center justify-end">
          <v-checkbox variant="flat" color="dark" @click="closeDialog('Y')" label="다시 보지 않기" class="flex-grow-0" hide-details></v-checkbox>
          <v-btn variant="outlined" color="dark" @click="closeDialog('N')" class="ml-4">닫기</v-btn>
        </div>
      </v-card-actions>
      <v-divider color="primary" class="border-t-lg"/>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, defineProps } from 'vue'
import { BoardDTO } from '@/model';

const props = defineProps({
  boardDTO: {
    type: Object,
    required: true,
  },
});


onMounted(() => {
  
})

function closeDialog(closeType: string) {

  if (closeType === 'Y') {
     localStorage.setItem(`POPUP-${props.boardDTO.business_cd}${props.boardDTO.board_no}`, 'Y');
  }
  props.boardDTO.open_popup = false;
}

// let dialogWidth = ref('500px') // 기본값은 500px입니다.
// watch(() => props.text.length, (newVal) => {
//   dialogWidth.value = `${Math.min(newVal, 500)}px` // 본문 길이에 맞춰 다이얼로그 너비를 조정합니다. 최대값은 500px입니다.
// })
</script>
