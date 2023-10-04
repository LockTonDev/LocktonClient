
<template>
  <v-row class="my-1">
    <!-- <v-col cols="12" md="4">
      <v-select v-model="selectValue" :items="selectype" variant="outlined" hide-details></v-select>
    </v-col> -->
    <v-col cols="12" md="12">
      <v-text-field v-model="search" :loading="false" variant="outlined" label="검색어를 입력하세요" append-inner-icon="mdi-magnify " hide-details single-line outlined clearable @input="debounceSearch"></v-text-field>
    </v-col>
  </v-row>
  <v-row class="my-1">
    <v-col cols="12">
      <v-table class="v-board-table size-large">
        <caption class="d-none">공지사항</caption>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index" class="text-center">{{ header.text }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, index) in items" :key="index">
            <tr>
              <td class="text-center text-subtitle-1">{{ items.length - index }}</td>
              <td class="text-left">
                <div class="title cursor-pointer" @click="onBoardViewOpen(row.board_no);">
                  <strong v-if="row.notice_yn === 'Y'">{{ row.title }}</strong>
                  <template v-else>{{ row.title }}</template>
                </div>
               </td>
              <td class="text-center text-subtitle-1">{{ row.created_at }}</td>
            </tr>
          </template>
        </tbody>
      </v-table>
      <v-pagination v-model="page" :length="pages" rounded="circle" />
    </v-col>
  </v-row>

  <v-dialog persistent v-model="isBoardViewDialog" width="800px" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
          <p class="text-h6 font-weight-bold">공지사항</p>
          <v-btn variant="outlined" color="dark" @click="isBoardViewDialog = false">닫기</v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-6">
        <v-row class="v-board-table size-small ma-0">
          <v-col cols="12">
            <div class="head-col"><p class="text-16">제목</p></div>
            <div class="data-col"><p class="text-16">{{ item.title }}</p></div>
          </v-col>
          <v-col cols="12">
            <div class="head-col"><p class="text-16">게시일</p></div>
            <div class="data-col"><p class="text-16">{{ item.created_at }}</p></div>
          </v-col>
        </v-row>   
        <div class="v-box min-h-280 pa-4 mt-4" v-html="item.content"></div>          
      </v-card-text>
    </v-card>
  </v-dialog>
   

</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect } from "vue";
  import BoardView from "@/components/BoardView.vue";
  import { BoardDTO } from '@/model';

  import debounce from 'lodash/debounce';
  import apiBoard from '@/api/api/board.api';
  
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';

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
  const boardListDTO = ref(new BoardDTO());
  const boardViewDTO = ref(new BoardDTO()); 
  boardListDTO.value.board_id =  props.board_id;
  boardViewDTO.value.board_id =  props.board_id;

  
  const selectype = ref(["전체", "제목", "내용"]);
  const selectValue = ref("전체");

  
  const headers = [
        { text: '번호', value: 'board_no' },
        { text: '제목', value: 'title' },
        { text: '게시일', value: 'created_at' }
      ];

  const search = ref('');
  const page = ref(1);
  const pages = ref(0);
  const limit = 10;
  const total = ref(0);

  const items = ref<any[]>([]);
  const item  = ref({});
  const count = ref(0);

  const getItems = async () => {
    const params = { business_cd: _AUTH_USER.value.businessCd, board_id: boardListDTO.value.board_id, page: page.value, limit, title: search.value.trim() || null };
    const { data } = await apiBoard.getItems(params);
    
    items.value = data.items;
    total.value = data.tot_count;
    pages.value = Math.ceil(total.value / limit);
    
  };

  const getItem = async () => {
    const params = { business_cd: _AUTH_USER.value.businessCd, board_id: boardViewDTO.value.board_id, board_no: boardViewDTO.value.board_no};
    const { data } = await  apiBoard.getItem(params);
    item.value = data;
    
  };


  const debounceSearch = debounce(() => {
    page.value = 1;
    getItems();
  }, 500);
  
  watchEffect(() => {
    getItems();
  }); 

  onMounted(() => {
    //getItems();
  }); 

async function onBoardViewOpen(board_no: number) {
     boardViewDTO.value.board_no = board_no;
    await getItem();
    isBoardViewDialog.value = true;
  }

</script>
