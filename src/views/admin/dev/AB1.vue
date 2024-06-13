<template>
	<AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" ></AdminBaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <ul class="v-search-box v-box">		
        <li>
          <span>전문인 유형</span>
          <v-select v-model="searchParams.data['business_cd']"  :items="businessCdItems" variant="outlined" hide-details density="compact"></v-select>
        </li>						
        <li>
          <span>게시판 유형</span>
          <v-select v-model="searchParams.data['board_id']"  :items="boardIdItems" variant="outlined" hide-details density="compact"></v-select>
        </li>
        <li>
          <span>제목</span>
          <v-text-field v-model="searchParams.data['title']"  type="text" variant="outlined" hide-details="auto" density="compact" single-line label="제목" @keyup.enter="fnSearch()"/>
        </li>
        <li class="ml-auto mr-6">
          <v-btn variant="flat" @click="fnSearch()">조회</v-btn>
        </li>	
      </ul>
    </v-col>
    <v-col cols="12">
      <div class="d-flex align-center mb-3">
        <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 목록</h2>
        <v-spacer />
        <v-btn variant="outlined" class="" @click="addBoard()">신규입력</v-btn>
      </div>
      <v-card class="v-box">
        <v-card-text>
          <v-table density="comfortable" class="text-center" fixed-header height="500px">
            <caption class="d-none">조회 결과</caption>
            <colgroup>
              <col style="width:100px"/>
              <col style="width:auto"/>
              <col style="width:50px"/>
              <col style="width:50px"/>
              <col style="width:120px"/>
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>공지</th>
                <th>팝업</th>
                <th>게시일</th>
              </tr>
            </thead>
            <tbody v-if="BoardList.length" class="">
              <tr v-for="(row, index) in BoardList">
                <td>{{ row.board_no }}</td>
                <td class="text-left text-subtitle-1">
                    <div class="cursor-pointer" @click.prevent="onPageView(row)">
                      <strong v-if="row.notice_yn === 'Y'">{{ row.title }}</strong>
                      <template v-else><span class="color-primary font-weight">{{ row.title }}</span></template>
                    </div>
                </td>
                <td>{{ row.notice_yn }}</td>
                <td>{{ row.popup_yn }}</td>
                <td>{{ row.reg_dt }}</td>
              </tr>      
            </tbody>
            <tbody v-else>
              <tr>
                  <td colspan="3" class="text-center align-middle">조회할 내용이 없습니다.</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card> 
    </v-col>
  </v-row>
 <v-dialog persistent v-model="layerBoardWrite" width="1000" scrollable>
  <v-card class="position-relative">
    <v-card-title class="d-flex justify-space-between pr-6">
      <h3 class="text-h6 font-weight-bold">조회 상세</h3>
      <v-btn variant="outlined" color="dark" @click="layerBoardWrite = false">닫기</v-btn>

    </v-card-title>
    <v-divider class="ma-0"/>
    <v-card-text class="pa-6">
      <div class="admin-normal-table register">
        <v-table>
          <colgroup>
            <col style="width:220px"/>
            <col style="width:auto"/>
          </colgroup>
          <tbody>
            <tr>
              <th>게시판</th>
              <td v-if="boardDTO.business_cd">
                [{{ businessCdItems?.find(items => items.value === boardDTO.business_cd)?.title }}]-{{ boardIdItems?.find(items => items.value === boardDTO.board_id)?.title }}-{{ boardDTO.board_no}}
              </td>
              <td else></td>
            </tr>
            <tr v-if="boardDTO.board_id == 'notice'">
              <th>옵션</th>
              <td>
                <div class="d-flex">
                  <VCheckBoxWithValidation
                     v-model="boardDTO.notice_yn"
                     name="notice_yn"
                     label="공지"
                   />
                   <VCheckBoxWithValidation
                     v-model="boardDTO.popup_yn"
                     name="popup_yn"
                     label="팝업"
                   />
                </div>
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <v-text-field v-model='boardDTO.title' type="text" variant="outlined" hide-details="auto" density="compact" single-line label=""/>
              </td>
            </tr>
            <tr>
              <th>HTML</th>
              <td>
                <v-textarea v-model="boardDTO.content" class="full-width"></v-textarea>
              </td>
            </tr>
            <tr>
              <th>미리보기</th>
              <td>
                <div v-html="boardDTO.content" style="text-align: left;"></div>
              </td>
            </tr>
           
          </tbody>
        </v-table>
      </div>
    </v-card-text>
    <v-divider class="ma-0"/>
    <v-card-actions class="d-flex justify-center pt-4 pb-6">
      <v-btn variant="flat" color="blue" @click="saveBoard('C');" class="mx-2">저장</v-btn>
      <v-btn variant="flat" color="dark" @click="saveBoard('D');" class="mx-2">삭제</v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
  
  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

</template>


<script setup lang="ts">
import { ref, onMounted, computed, defineComponent, defineEmits,reactive } from "vue";
import { MessageBoxDTO, ParamsDTO, CommonCode, BoardDTO} from '@/model';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import BaseCard from "@/components/BaseCard.vue";
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import MessageBox from "@/components/MessageBox.vue";
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';
const layerBoardWrite = ref(false);
const activeTab = ref(0); // 현재 활성화된 탭의 인덱스
const tabs = ref(['Editor', 'HTML', '미리보기']);


const editorConfig = ref({
	toolbar: [ 'heading', '|','fontBackgroundColor', 'fontColor', 'fontSize', 'bold', 'italic', '|', 'alignment', 'bulletedList', 'numberedList', 'indent', 'outdent', '|', 'insertTable', 'link', '|', 'undo', 'redo' ],
	table: {
		contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties' ],
	},
	image: {
		resize: true,
		toolbar: [ 'imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:inline', 'imageStyle:side']
  },
  language: 'kr'
  , height:'300px'
});


const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

const messageBoxDTO = ref(new MessageBoxDTO());
const businessCdItems = ref([""]);
const boardIdItems = ref([""]);

const searchParams = ref(new ParamsDTO());
const boardDTO = ref(new BoardDTO());
const isNoData = ref(false);


let BoardList = ref([]);

	const page = ref({
      title: "알림마당",
    });
	const breadcrumbs = ref([
		{
			text: "알림마당 관리",
			disabled: false,
			href: "/",
		},
		{
			text: "알림마당",
			disabled: true,
			href: "/",
		},
  ]);
  

const emit = defineEmits(['onPageViewParent']);

const onPageView = (row) => {
  Object.assign(boardDTO.value, row);
  layerBoardWrite.value = true;
 // emit('onPageViewParent', row);
};

function addBoard() {
  console.log(searchParams.value);
  boardDTO.value.business_cd =  searchParams.value.data.business_cd;
  boardDTO.value.board_id = searchParams.value.data.board_id;
  boardDTO.value.board_no = '신규등록';
  boardDTO.value.title = '';
  boardDTO.value.content = '';
  boardDTO.value.mode = 'C';
   layerBoardWrite.value = true;
};


async function saveBoard(mode:string) {
  let resultData;
  let isRun = false;

  if (!boardDTO.value.business_cd) {
    messageBoxDTO.value.setWarning("입력확인", "전문인 유형은 필수입력값 입니다.");
    return false;
  }
  if (!boardDTO.value.board_id) {
    messageBoxDTO.value.setWarning("입력확인", "게시판 유형은 필수입력값 입니다.");
    return false;
  }
  if (!boardDTO.value.title) {
    messageBoxDTO.value.setWarning("입력확인", "제목은 필수입력값 입니다.");
    return false;
  }
  if (!boardDTO.value.content) {
    messageBoxDTO.value.setWarning("입력확인", "내용은 필수입력값 입니다.");
    return false;
  }
  
  // 삭제처리
  if (mode === 'D') {
      boardDTO.value.mode = mode;
    await messageBoxDTO.value.setConfirm('삭제', '삭제 하시겠습니까?', null, (result, params) => {
      isRun = result;
    });
  } else {
    await messageBoxDTO.value.setConfirm('저장', '저장 하시겠습니까?', null, (result, params) => {
      isRun = result;
      });
  }

  if(isRun) {
    if (boardDTO.value.mode == 'C') {
      resultData = await apiADMIN.setInsertBoard(boardDTO.value);
    } else if (boardDTO.value.mode == 'D') {
      resultData = await apiADMIN.setDeleteBoard(boardDTO.value);
    } else {
      resultData = await apiADMIN.setUpdateBoard(boardDTO.value);
    }
    console.log(resultData);
    
    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');
      boardDTO.value = new BoardDTO();
      fnSearch();
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  }
  layerBoardWrite.value = false;
};

async function fnSearch() {
  const resultData = await apiADMIN.getBoardList(searchParams.value.data);
  BoardList.value = resultData.data;
  if (BoardList.value.length == 0) {
    isNoData.value = true;
  }
  boardDTO.value = new BoardDTO();
}

/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
  businessCdItems.value = await CommonCode.getCodeList('COM001');
  boardIdItems.value = await CommonCode.getCodeList('COM003');
  // statusCdItems.value.unshift({ title: '전체', value: '%'});
  // userCdItems.value = await CommonCode.getCodeList('TAX002');
  // userCdItems.value.unshift({ title: '전체', value: '%'});
  
  
  searchParams.value.data['business_cd'] = 'TAX';
  searchParams.value.data['board_id'] = 'notice';
  // searchParams.value.data['insr_year'] = '2023';
  // searchParams.value.data['user_cd'] = '%';
  // searchParams.value.data['user_nm'] = '';
  // searchParams.value.data['user_id'] = '';
  fnSearch();

}

/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {    
  
  // 로딩시 초기 데이터 셋팅
  initPage();

});



</script>

<style scope> 
    .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable, .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{ 
    min-height:400px; 
    } 
    .full-width {
    width: 100%;
  }
</style>