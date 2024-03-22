
<template>
  <v-row class="my-1">
    
    <v-col cols="12" md="12">
      <v-text-field v-model="search" :loading="false" variant="outlined" label="검색어를 입력하세요" append-inner-icon="mdi-magnify " hide-details single-line outlined clearable @input="debounceSearch"></v-text-field>
    </v-col>
  </v-row>

  <v-row class="my-1" v-if="items.length > 0">
    <v-col cols="12">
      <v-expansion-panels class="v-board-table size-large" v-for="(row, index) in items" :key="index">
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            {{row.title}}
          </v-expansion-panel-title>
           <v-expansion-panel-text class="py-5 px-6 h-auto">
            <div v-html="row.content"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-pagination v-model="page" :length="pages" rounded="circle" />
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col class="text-center">
      조회된 데이터가 없습니다.
    </v-col>
  </v-row>

</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect } from "vue";
  import { BoardDTO } from '@/model';

  import debounce from 'lodash/debounce';
  import apiBoard from '@/api/api/board.api';

  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';``

  const authStore = useAuthStore();
  const { _AUTH_USER } = storeToRefs(authStore);




  // 부모창의 함수를 호출하기 위해서 defineProps 해줌
  const props = defineProps({
    board_id: {
      type: String,
      required: true
    }
  });


  const isBoardViewDialog = ref(false);
  const boardDTO = ref(new BoardDTO());   
  boardDTO.value.board_id =  props.board_id;

  
  const selectype = ref(["전체", "제목", "내용"]);
  const selectValue = ref("전체");

  
  const headers = [
        { text: '번호', value: 'board_no' },
        { text: '제목', value: 'title' },
        { text: '작성일', value: 'created_at' }
      ];

  const search = ref('');
  const page = ref(1);
  const pages = ref(0);
  const limit = 10;
  const total = ref(0);

  const items = ref<any[]>([]);
  const count = ref(0);


  const getItems = async () => {

    const params = { business_cd: _AUTH_USER.value.businessCd, board_id: boardDTO.value.board_id, page: page.value, limit, title: search.value.trim() || null };
    const { data } = await apiBoard.getItems(params);
    
    items.value = data.items;
    total.value = data.tot_count;
    pages.value = Math.ceil(total.value / limit);
    
  };


  const debounceSearch = debounce(() => {
    page.value = 1;
    getItems();
  }, 500);

  watchEffect(() => {
    getItems();
  }); 

  onMounted(() => {
    getItems();
  }); 



</script>
