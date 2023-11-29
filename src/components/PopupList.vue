<template>
      <Popup 
      v-for="(item, index) in resultData.items" 
      :boardDTO="item" 
    />
</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect } from "vue";
  import Popup from "@/components/Popup.vue";
  import { BoardDTO } from '@/model';
  import apiBoard from '@/api/api/board.api';
  
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';

  const authStore = useAuthStore();
  const { _AUTH_USER } = storeToRefs(authStore);

  const resultData = ref([]);

  const getItem = async () => {

    const params = { business_cd: _AUTH_USER.value.businessCd, board_id: 'notice'};
    const { data } = await apiBoard.getPopup(params);

    data.items.forEach((item, index) => {
      // localStorage에 키 값을 저장합니다.
    const local = localStorage.getItem(`POPUP-${item.business_cd}${item.board_no}`);

      if (local === null) {
        item.open_popup = true; 
      } else {
        item.open_popup = false; 
      }
    });
    resultData.value = data;
  };
  

  onMounted(() => {
    getItem();
  })


// let dialogWidth = ref('500px') // 기본값은 500px입니다.
// watch(() => props.text.length, (newVal) => {
//   dialogWidth.value = `${Math.min(newVal, 500)}px` // 본문 길이에 맞춰 다이얼로그 너비를 조정합니다. 최대값은 500px입니다.
// })
</script>
