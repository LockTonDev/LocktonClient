<template>
	<ul class="v-search-box v-box">							
		<li>
			<span>전문인 유형</span>
			<v-select v-model="searchParams.data['business_cd']"  :items="businessCdItems" variant="outlined" hide-details density="compact"></v-select>
		</li>
		<li>
			<span>가입 유형</span>
			<v-select v-model="searchParams.data['user_cd']"  :items="userCdItems" variant="outlined" hide-details density="compact"></v-select>
		</li>
		<li>
			<span>회원 상태</span>
			<v-select v-model="searchParams.data['status_cd']" :items="statusCdItems" variant="outlined" hide-details density="compact"></v-select>
		</li>
		<li>
			<span>이름</span>
			<v-text-field v-model="searchParams.data['user_nm']"  type="text" variant="outlined" hide-details="auto" density="compact" single-line label="이름" @keyup.enter="fnSearch()"/>
		</li>		
		<li>
			<span>아이디</span>
			<v-text-field v-model="searchParams.data['user_id']" type="text" variant="outlined" hide-details="auto" density="compact" single-line label="아이디" @keyup.enter="fnSearch()"/>
		</li>					
		<li class="ml-auto mr-0">
			<v-btn variant="flat" size="small" @click="fnSearch()">조회</v-btn>
		</li>	
	</ul>



	<v-card class="v-panel-admin mt-6">
		<v-expansion-panels v-model="panel">
			<v-expansion-panel elevation="0" value="panel-1" class="bg-none">
				<v-card-title class="flex-wrap">
					<h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 결과</h2>
					<p class="text-body-2 ml-3 pt-1">전체 <span class="color-primary font-weight-bold">{{ Number(UserList.length).toLocaleString() }}</span> 건</p>
					<div class="ml-auto">
						<v-btn variant="outlined" size="small" class="ml-2" @click="downloadAsExcel()">엑셀 다운</v-btn>
					</div>
					<v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto ml-4"></v-expansion-panel-title>
					<v-divider class="border-0 flex-grow-1 mt-2"/>
				</v-card-title>
				<v-expansion-panel-text>
					<v-card-text>
						 <div class="v-result-box">
							<v-table density="compact" fixed-header height="220px">
								<caption class="d-none">회원 조회 결과</caption>
								<colgroup>
									<col style="width:auto"/>
									<col style="width:auto"/>
									<col style="width:auto"/>
									<col style="width:auto"/>
									<col style="width:auto"/>
									<col style="width:auto"/>
									<col style="width:auto"/>
								</colgroup>
								<thead>
									<tr>
										<th>순번</th>
										<th>전문인 유형</th>
										<th>회원 구분</th>
										<th>이름</th>
										<th>아이디</th>
										<th>등록번호</th>
										<th>사업자번호</th>
										<th>소속지방회</th>
										<th>회원 상태</th>
									</tr>
								</thead>
								<tbody v-if="UserList.length" class="">
									<tr v-for="(row, index) in UserList" 
									:key="index"
									@click="selectedRow = row" 
									@click.prevent="onPageView(row.user_uuid)"
									:class="{ 'selected': selectedRow === row, 'cursor-pointer': true  }"
									>
									<td>{{ index + 1 }}</td>
									<td>{{ row.business_cd_nm }}</td>
									<td>{{ row.user_cd_nm }}</td>
									<td>{{row.user_nm }}</td>
									<td>{{ row.user_id }}</td>
									<td>{{ row.user_regno }}</td>
									<td>{{ row.corp_cnno }}</td>
									<td>{{ row.corp_region_cd_nm}}</td>
									<td>{{ row.status_cd_nm }}</td>
									</tr>      
								</tbody>
								<tbody v-else>
									<tr>
										<td colspan="12" class="text-center align-middle">조회할 내용이 없습니다.</td>
									</tr>
								</tbody>
							 </v-table>
						 </div>
					</v-card-text>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineEmits } from "vue";
import { MessageBoxDTO, ParamsDTO, CommonCode } from '@/model';
import { genYearItems } from '../../../util/util.ts';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

import MessageBox from "@/components/MessageBox.vue";
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';

import {
  DOWNLOAD_USER_EXCEL
} from "@/util/excelupdn";

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

const messageBoxDTO = ref(new MessageBoxDTO());
const businessCdItems = ref([""]);
const userCdItems = ref([""]);
const statusCdItems = ref([""]);
const insrYearCdItems = ref([genYearItems()]);

const searchParams = ref(new ParamsDTO());
const isNoData = ref(false);
const selectedRow = ref();

let UserList = ref([]);


const emit = defineEmits(['onPageViewParent']);

const onPageView = (row) => {
  emit('onPageViewParent', row);
};


async function fnSearch() {
  console.log(searchParams.value.data);
  const resultData = await apiADMIN.getUserList(searchParams.value.data);
  console.log(resultData);
  UserList.value = resultData.data;
  if (UserList.value.length == 0) {
    isNoData.value = true;
  }
}

/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
  businessCdItems.value = await CommonCode.getCodeList('COM001');
  statusCdItems.value = await CommonCode.getCodeList('COM010');
  statusCdItems.value.unshift({ title: '전체', value: '%'});
  userCdItems.value = await CommonCode.getCodeList('TAX002');
  userCdItems.value.unshift({ title: '전체', value: '%'});
  
  
  searchParams.value.data['business_cd'] = 'TAX';
  searchParams.value.data['status_cd'] = '%';
  searchParams.value.data['user_cd'] = '%';
  searchParams.value.data['user_nm'] = '';
  searchParams.value.data['user_id'] = '';

  //fnSearch();
}

async function downloadAsExcel() {

  let businessCdNm = businessCdItems.value.find(items => items.value == searchParams.value.data.business_cd).title;
  let userCdNm = userCdItems.value.find(items => items.value == searchParams.value.data.user_cd).title;
  let fileNm = `${businessCdNm}_${userCdNm}_회원리스트`;
  let isRun = false;

  if(userCdNm == '전체'){
    messageBoxDTO.value.setInfo('Excel', '가입 유형을 선택해 주세요.');
    return false;
  }

  await messageBoxDTO.value.setConfirm('다운로드', `${fileNm} 자료를 다운 받으시겠습니까?`, null, (result, params) => {
    isRun = result;
  });

  let resultData;
  try {
    if (isRun) {
        resultData = await apiADMIN.getUserExcel(searchParams.value.data);
        // console.log("User Excel : ", resultData)
        searchParams.value.data['excel_filenm'] = fileNm;


      if (resultData.data.length == 0) {
        messageBoxDTO.value.setInfo('Excel', '데이타가 없습니다. 검색조건을 확인하세요.');
      } else {
        console.log("fileNm",fileNm)
        DOWNLOAD_USER_EXCEL(searchParams.value, resultData.data);
      }
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `엑셀다운로드에 실패하였습니다<br/>${resultData.message}`);
  }
}

/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {    
  
  // 로딩시 초기 데이터 셋팅
  initPage();

});

// 조회결과 아코디언
const panel = ref(['panel-1', 'panel-2', 'panel-3', 'panel-4', 'panel-5']);

</script>