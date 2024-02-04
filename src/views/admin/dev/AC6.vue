<template>
  <div class="d-flex align-center">
    <p class="text-h6 color-primary subtitle mr-2">{{ businessCdItems?.find(items => items.value === searchParams.data['business_cd'])?.title }}</p>
    <div class="w-100">
      <AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></AdminBaseBreadcrumb>
    </div>
  </div>
  <div v-if="['ADV', 'TAX','ACC'].includes(searchParams.data['business_cd'])">
    <v-row>
      <v-col cols="12">
        <ul class="v-search-box">
          <!-- <li>
          <span>사이트 구분<sup class="text-error ml-1">*</sup></span>
          <v-select v-model="searchParams.data['business_cd']" :items="businessCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
          </li> -->
          <li>
            <span>처리상태<sup class="text-error ml-1">*</sup></span>
            <v-select v-model="searchParams.data['proc_cd']" :items="procCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
          </li>
          <li>
            <span>피보험자<sup class="text-error ml-1">*</sup></span>
            <v-text-field v-model="searchParams.data['user_nm']" type="text" variant="outlined" hide-details="auto" density="compact" single-line class="text-body-2" placeholder="피보험자" @keyup.enter="fnSearch()"/>
          </li>
          <li class="ml-auto">
            <v-btn variant="flat" @click="fnSearch()">조회</v-btn>
          </li>
        </ul>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center flex-wrap px-0">
            <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 목록</h2>
            <p class="text-body-2 ml-3 pt-1">전체 <span class="color-primary font-weight-bold">{{ Number(dataList?.length).toLocaleString() }}</span> 건</p>
          </v-card-title>
          <v-card-text class="pa-0 v-result-box">
            <v-table density="compact" class="text-center" fixed-header height="220px">
              <caption class="d-none">조회 결과</caption>
              <colgroup>
                <col style="width:80px"/>
                <col style="width:auto"/>
                <col style="width:auto"/>
                <col style="width:auto"/>
                <col style="width:auto"/>
                <col style="width:auto"/>
                <col style="width:140px"/>
                <col style="width:90px"/>
                <col style="width:110px"/>
                <col style="width:70px"/>
              </colgroup>
              <thead>
              <tr>
                <th>번호</th>
                <th>신청일자</th>
                <th>보험년도</th>
                <th>피보험자</th>
                <!--                <th>증권번호</th>-->
                <th>변경구분</th>
                <th>변경개시일자</th>
                <th>연락처</th>
                <th>담당자명</th>
                <th>처리일자</th>
                <th>처리상태</th>
              </tr>
              </thead>
              <tbody v-if="dataList?.length" class="">
              <tr v-for="(row, index) in dataList"
                  :key="index"
                  @click="selectedRow = row"
                  @click.prevent="onPageView(row)"
                  :class="{ 'selected': selectedRow === row, 'cursor-pointer': true  }"
              >
                <td>{{ dataList?.length - index }}</td>
                <td>{{ row.apply_dt }}</td>
                <td>{{ row.insr_year }}</td>
                <td>{{ row.user_nm }}</td>
                <!--                <td>{{ row.insr_insurance_no }}</td>-->
                <td>{{ row.apply_nm }}</td>
                <td>{{ row.apply_posted_dt }}</td>
                <td>{{ row.tel }}</td>
                <td>{{ row.nm }}</td>
                <td>{{ row.proc_dt }}</td>
                <td>{{ row.proc_nm }}</td>
              </tr>
              </tbody>
              <tbody v-else>
              <tr>
                <td colspan="10" class="text-center align-middle">조회할 내용이 없습니다.</td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between px-0">
            <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세</h2>
            <v-spacer />
            <v-btn variant="flat" size="small" @click="fnSave()">저장</v-btn>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-row>
              <v-col cols="6">
                <v-row class="v-board-table size-x-small">
                  <v-col cols="6">
                    <div class="head-col">증권번호</div>
                    <div class="data-col">{{ dT0040ADTO.insurance_no }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="head-col">피보험자</div>
                    <div class="data-col">{{ dT0040ADTO.user_nm }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="head-col">변경구분</div>
                    <div class="data-col"> {{ dT0040ADTO.apply_nm }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="head-col">신청일자</div>
                    <div class="data-col"> {{  dT0040ADTO.apply_dt }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="head-col">변경개시일</div>
                    <div class="data-col"> {{  dT0040ADTO.apply_posted_dt }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="head-col">담당자 성명</div>
                    <div class="data-col">{{  dT0040ADTO.nm }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="head-col">연락처</div>
                    <div class="data-col"> {{  dT0040ADTO.tel }}</div>
                  </v-col>
                  <v-col cols="12">
                    <div class="head-col">이메일</div>
                    <div class="data-col"> {{  dT0040ADTO.email }}</div>
                  </v-col>
                  <v-col cols="12" >
                    <div class="head-col">변경상세</div>
                    <div class="data-col"><v-textarea v-model="dT0040ADTO.apply_content" variant="outlined" counter class="h-200 my-1px" rows="20" no-resize readonly hide-details></v-textarea></div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row class="v-board-table size-x-small">
                  <v-col cols="6">
                    <div class="head-col">처리일자</div>
                    <div class="data-col"><VTextFieldWithValidation v-model="dT0040ADTO.proc_dt" name="proc_dt"  type="date" single-line variant="outlined"  density="compact"/></div>
                  </v-col>
                  <v-col cols="6">
                    <div class="head-col">처리상태</div>
                    <div class="data-col"><VSelectWithValidation v-model="dT0040ADTO.proc_cd" name="proc_cd" label="선택하세요." :items="procCdItemsData"  single-line density="compact"></VSelectWithValidation></div>
                  </v-col>
                  <v-col cols="12">
                    <div class="head-col">처리내용</div>
                    <div class="data-col"><v-textarea v-model="dT0040ADTO.proc_content" variant="outlined" counter class="h-200 my-1px" rows="20" no-resize hide-details></v-textarea></div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-card-actions class="d-flex justify-center pt-4 pb-6">
            <v-btn variant="flat" size="small" color="primary" @click="fnSave('C');" class="mx-1" v-if="userRegDTO.mode == 'C'">저장</v-btn>
            <v-btn variant="flat" size="small" color="dark" @click="fnSave('D');" class="mx-1" v-if="userRegDTO.mode != 'C' && userRegDTO.reg_no != ''">삭제</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'CAA'">
    <CAA_AC6/>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'PAT'">
    <PAT_AC6/>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'LAW'">
    <LAW_AC6/>
  </div>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

</template>


<script setup lang="ts">
import { ref, onMounted, watch, computed, defineComponent, reactive } from "vue";
import { useRoute } from 'vue-router';
import { MessageBoxDTO, ParamsDTO, CommonCode, D_T0040ADTO} from '@/model';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import BaseCard from "@/components/BaseCard.vue";
import CAA_AC6 from './CAA/CAA_AC6.vue';
import PAT_AC6 from './PAT/PAT_AC6.vue';
import LAW_AC6 from './LAW/LAW_AC6.vue';

import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';


import MessageBox from "@/components/MessageBox.vue";
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';

const route = useRoute();


const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

const messageBoxDTO = ref(new MessageBoxDTO());
const businessCdItems = ref([""]);
const procCdItems = ref([""]);
const procCdItemsData = ref([""]);

const searchParams = ref(new ParamsDTO());
const isNoData = ref(false);
const selectedRow = ref();

const dT0040ADTO = ref(new D_T0040ADTO());
let dataList = ref([]);

const page = ref({
  title: "계약변경",
});
const breadcrumbs = ref([
  {
    text: "계약관리",
    disabled: false,
    href: "/",
  },
  {
    text: "계약변경",
    disabled: true,
    href: "/",
  },
]);

const indItems = [
  { title: '조건변경', value: 'I10' },
  { title: '법인전환', value: 'I20' },
  { title: '해지(폐업/휴업)', value: 'I30' },
  { title: '기타', value: 'I90' }
];

const corItems = [
  { title: '조건변경', value: 'C10' },
  { title: '구성원 변동(추가/해지)', value: 'C20' },
  { title: '타법인전환', value: 'C30' },
  { title: '개인전환', value: 'C40' },
  { title: '기타', value: 'C90' }
];



const onPageView = (row) => {
  Object.assign(dT0040ADTO.value, row);
};

async function fnSave(mode:string) {
  let isRun = false;


  // 삭제처리
  await messageBoxDTO.value.setConfirm('저장', '저장 하시겠습니까?', null, (result, params) => {
    isRun = result;
  });

  if (isRun) {
    let resultData;
    if(route.params.business_cd=='ADV') {
      resultData = await apiADMIN.setApplyADVInsurance(dT0040ADTO.value);
    } else {
      resultData = await apiADMIN.setApplyInsurance(dT0040ADTO.value);
    }
    console.log(resultData);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');
      fnSearch();
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  }
};

async function fnSearch() {
  let resultData;
  if(route.params.business_cd=='ADV') {
    resultData = await apiADMIN.getApplyADVInsurance(searchParams.value.data);
  } else {
    resultData = await apiADMIN.getApplyInsurance(searchParams.value.data);
  }
  dataList.value = resultData.data;
  if (dataList.value.length == 0) {
    isNoData.value = true;
    selectedRow.value = new D_T0040ADTO();
  } else {
    selectedRow.value = dataList.value[0];
  }
  onPageView(selectedRow.value);

}

watch(
    () => route.params.business_cd,
    (newBusinessCd) => {
      initPage();
    }
);


/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {

  dataList.value = [];
  dT0040ADTO.value = new D_T0040ADTO();
  const businessCd = route.params.business_cd;


  businessCdItems.value = await CommonCode.getCodeList('COM001');
  procCdItems.value = await CommonCode.getCodeList('CAA003');
  procCdItemsData.value = await CommonCode.getCodeList('CAA003');

  procCdItems.value.unshift({ title: '전체', value: '%'});
  searchParams.value.data['business_cd'] = businessCd;
  searchParams.value.data['proc_cd'] = '%';
  searchParams.value.data['user_nm'] = '';

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
