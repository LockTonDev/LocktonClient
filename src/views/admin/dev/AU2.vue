<template>
  <div class="d-flex align-center">
    <span>
        <v-app-bar-nav-icon  @click.stop="authStore.chgDrawer()"> </v-app-bar-nav-icon>
      </span>
    <div class="w-100">
      <AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" ></AdminBaseBreadcrumb>
    </div>
  </div>
  <v-row>
    <v-col cols="12">
      <ul class="v-search-box v-box">		
        <li>
          <span>전문인 유형</span>
          <v-select v-model="searchParams.data['business_cd']"  :items="businessCdItems" variant="outlined" hide-details density="compact"></v-select>
        </li>						
        <li>
          <span>등록번호</span>
          <v-text-field v-model="searchParams.data['reg_no']"  type="text" variant="outlined" hide-details="auto" density="compact" single-line label="등록번호" @keyup.enter="fnSearch()"/>
        </li>
        <li>
          <span>성명</span>
          <v-text-field v-model="searchParams.data['nm']"  type="text" variant="outlined" hide-details="auto" density="compact" single-line label="성명" @keyup.enter="fnSearch()"/>
        </li>
        <li class="ml-auto mr-6">
          <v-btn variant="flat" @click="fnSearch()" size="small">조회</v-btn>
        </li>	
      </ul>
    </v-col>
    <v-col cols="7">
      <v-card>
        <v-card-title class="d-flex align-center flex-wrap px-0">
          <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 목록</h2>
          <p class="text-body-2 ml-3 pt-1">전체 <span class="color-primary font-weight-bold">{{ Number(UserRegList.length).toLocaleString() }}</span> 건</p>
        </v-card-title>
        <v-card-text class="pa-0 v-result-box">
          <v-table density="compact" class="text-center" fixed-header height="500px">
            <caption class="d-none">조회 결과</caption>
            <colgroup>
              <col style="width:80px"/>
              <col style="width:120px"/>
              <col style="width:auto"/>
              <col style="width:150px"/>
              <col style="width:120px"/>
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>전문인 유형</th>
                <th>성명</th>
                <th>등록번호</th>
                <th>생년월일</th>
              </tr>
            </thead>
            <tbody v-if="UserRegList.length" class="">
              <tr v-for="(row, index) in UserRegList" 
                  :key="index"
                  @click="selectedRow = row" 
                  @click.prevent="onPageView(row)"
                  :class="{ 'selected': selectedRow === row, 'cursor-pointer': true  }"
              >
                <td>{{ UserRegList.length - index }}</td>
                <td>{{ row.business_cd_nm }}</td>
                <td>{{ row.nm }}</td>
                <td>{{ row.reg_no }}</td>
                <td>{{ row.birth }}</td>
              </tr>      
            </tbody>
            <tbody v-else>
              <tr>
                  <td colspan="5" class="text-center align-middle">조회할 내용이 없습니다.</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card> 
    </v-col>
    <v-col cols="5">
      <v-card>
        <v-card-title class="d-flex justify-space-between px-0">
          <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세</h2>
          <v-spacer />
          <v-btn variant="outlined" size="small" @click="fnAdd()">신규입력</v-btn>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-row class="v-board-table size-x-small">
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>전문인 유형</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VSelectWithValidation v-model="userRegDTO.business_cd" name="business_cd" label="" :items="businessCdItems" class="w-200" single-line density="comfortable" :disabled="userRegDTO.mode == 'C'?false:true"></VSelectWithValidation>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>성명</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userRegDTO.nm" name="user_rnmegno" label="" single-line density="comfortable" :disabled="userRegDTO.mode == 'C'?false:true"/>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>등록번호</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userRegDTO.reg_no" name="reg_no" label="" single-line density="comfortable" :maskOption="{ mask: '#######' }" :disabled="userRegDTO.mode == 'C'?false:true"/>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>생년월일</p>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userRegDTO.birth" name="birth" label="" single-line density="comfortable" :maskOption="{ mask: '######' }" :disabled="userRegDTO.mode == 'C'?false:true"/>
              </div>
            </v-col>
            <!-- <v-col cols="12" class="v-col">
                <div class="head-col">
                  <p>담당자 성명</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                  <VSelectWithValidation v-model="userRegDTO.business_cd" name="business_cd" label="" :items="businessCdItems" class="w-200" single-line density="comfortable" :disabled="userRegDTO.mode == 'C'?false:true"></VSelectWithValidation>
                </div>
            </v-col> -->
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pt-4 pb-6">
          <v-btn variant="flat" size="small" color="primary" @click="fnSave('C');" class="mx-1" v-if="userRegDTO.mode == 'C'">저장</v-btn>
          <v-btn variant="flat" size="small" color="dark" @click="fnSave('D');" class="mx-1" v-if="userRegDTO.mode != 'C' && userRegDTO.reg_no != ''">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

</template>


<script setup lang="ts">
import { ref, onMounted, computed, defineComponent, reactive } from "vue";
import { MessageBoxDTO, ParamsDTO, CommonCode, UserRegDTO} from '@/model';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import BaseCard from "@/components/BaseCard.vue";

import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';


import MessageBox from "@/components/MessageBox.vue";
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

const messageBoxDTO = ref(new MessageBoxDTO());
const businessCdItems = ref([""]);

const searchParams = ref(new ParamsDTO());
const isNoData = ref(false);
const selectedRow = ref();

const userRegDTO = ref(new UserRegDTO());
let UserRegList = ref([]);

	const page = ref({
      title: "전문인명단관리",
    });
	const breadcrumbs = ref([
		{
			text: "회원관리",
			disabled: false,
			href: "/",
		},
		{
			text: "전문인명단관리",
			disabled: true,
			href: "/",
		},
  ]);
  


const onPageView = (row) => {
  Object.assign(userRegDTO.value, row);
  userRegDTO.value.mode = 'U';
};

function fnAdd() {
  userRegDTO.value.mode = 'C';
  userRegDTO.value.business_cd =  searchParams.value.data.business_cd;
  userRegDTO.value.nm = '';
  userRegDTO.value.reg_no ='';
};

async function fnSave(mode:string) {
  let isRun = false;

  if (!userRegDTO.value.business_cd) {
    messageBoxDTO.value.setWarning("입력확인", "전문인 유형은 필수입력값 입니다.");
    return false;
  }
  if (!userRegDTO.value.nm) {
    messageBoxDTO.value.setWarning("입력확인", "성명은 필수입력값 입니다.");
    return false;
  }
  if (!userRegDTO.value.reg_no) {
    messageBoxDTO.value.setWarning("입력확인", "등록번호는 필수입력값 입니다.");
    return false;
  }
  
  // 삭제처리
  if (mode === 'D') {
      userRegDTO.value.mode = mode;
    await messageBoxDTO.value.setConfirm('삭제', '삭제 하시겠습니까?', null, (result, params) => {
      isRun = result;
    });
  } else {
    await messageBoxDTO.value.setConfirm('저장', '저장 하시겠습니까?', null, (result, params) => {
      isRun = result;
    });
  }

  if (isRun) {
    
    console.log(userRegDTO.value);
    const resultData = await apiADMIN.setUserRegNo(userRegDTO.value);
    console.log(resultData);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');
      searchParams.value.data['business_cd'] = userRegDTO.value.business_cd;
      //searchParams.value.data['reg_no'] = userRegDTO.value.reg_no;
      searchParams.value.data['nm'] = userRegDTO.value.nm;

      fnSearch();
    } else {

      if(resultData.message == 'DUP') {
        messageBoxDTO.value.setWarning('실패', "동일한 등록번호가 존재 합니다.<br>등록번호 확인 후 다시 시도 해주세요.");
      } else {
        messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
      }

    }
  }
};

async function fnSearch() {
  const resultData = await apiADMIN.getUserRegList(searchParams.value.data);
  UserRegList.value = resultData.data;
  if (UserRegList.value.length == 0) {
    isNoData.value = true;
    selectedRow.value = new UserRegDTO();
  } else {
    selectedRow.value = UserRegList.value[0];
  }
  onPageView(selectedRow.value);
  
}

/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
  businessCdItems.value = await CommonCode.getCodeList('COM001');
  
  searchParams.value.data['business_cd'] = 'TAX';
  searchParams.value.data['reg_no'] = '';
  searchParams.value.data['nm'] = '';

  // fnSearch();

}

/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {    
  
  // 로딩시 초기 데이터 셋팅
  initPage();

});



</script>
