<template>
  <div class="d-flex align-center">
    <p class="text-h6 color-primary subtitle mr-2">{{ businessCdItems?.find(items => items.value === searchParams.data['business_cd'])?.title }}</p>
    <div class="w-100">
      <AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></AdminBaseBreadcrumb>
    </div>
  </div>
  <v-row>
    <v-col cols="12">
      <ul class="v-search-box">
        <!-- <li>
            <span>사이트 구분<sup class="text-error ml-1">*</sup></span>
            <v-select v-model="searchParams.data['business_cd']" :items="businessCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
          </li> -->
        <li class="date">
          <span>보험년도<sup class="text-error ml-1">*</sup></span>
          <v-select v-model="searchParams.data['insr_year']" :items="insrYearCdItems" variant="outlined" hide-details density="compact" item-text="title" item-value="value"></v-select>
        </li>
        <li>
          <span>가입 유형</span>
          <v-select v-model="searchParams.data['user_cd']" :items="userCdItems" variant="outlined" hide-details density="compact"></v-select>
        </li>
        <li>
          <span>상태<sup class="text-error ml-1">*</sup></span>
          <v-select v-model="searchParams.data['status_cd']" :items="statusCdItems" variant="outlined" hide-details density="compact" item-text="title" item-value="value"></v-select>
        </li>
        <li>
          <span>피보험자<sup class="text-error ml-1">*</sup></span>
          <v-text-field v-model="searchParams.data['user_nm']" type="text" variant="outlined" hide-details="auto" density="compact" single-line class="text-body-2" label="피보험자" @keyup.enter="fnSearch()" />
        </li>
        <li class="ml-auto">
          <v-btn variant="flat" @click="fnSearch()">조회</v-btn>
        </li>
      </ul>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title class="d-flex flex-wrap pa-0 align-center">
          <h2 class="font-weight-bold">
            <svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 결과
          </h2>
          <p class="text-body-2 ml-3 pt-1">
            전체 <span class="color-primary font-weight-bold">{{ Number(InsuranceList.length).toLocaleString() }}</span> 건
          </p>
          <div class="ml-auto">
            <v-btn variant="outlined" size="small" class="mr-1" type="file" @click="fnExcelDownload()">엑셀다운</v-btn>
          </div>

          <v-divider class="border-0 flex-grow-1 mt-2" />
        </v-card-title>
        <v-card-text class="pa-0">
          <div class="v-result-box">
            <v-table density="compact" fixed-header height="220px">
              <caption class="d-none">
                계약 조회 결과
              </caption>
              <colgroup>
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: 120px" />
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
                <!-- <col style="width:auto"/> -->
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>구분</th>
                  <th>보험년도</th>
                  <th>피보험자</th>
                  <th>등록번호</th>
                  <th>사업자번호</th>
                  <th>회원ID</th>
                  <th>보험기간</th>
                  <!-- <th>소속<br/>지방회</th> -->
                  <th>총보험료</th>
                  <th>미납금액</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody v-if="InsuranceList.length" class="">
                <tr v-for="(row, index) in InsuranceList" :key="index" @click="selectedRow = row" @click.prevent="onPageView(row)" :class="{ selected: selectedRow === row, 'cursor-pointer': true }">
                  <td>{{ index + 1 }}</td>
                  <td>{{ row.user_cd_nm }}</td>
                  <td>{{ row.insr_year }}</td>
                  <td>{{ row.user_nm }}</td>
                  <td>{{ row.user_regno }}</td>
                  <td>{{ row.corp_cnno }}</td>
                  <td>{{ row.user_id }}</td>
                  <td>{{ row.insr_st_dt }} ~ {{ row.insr_cncls_dt }}</td>
                  <!-- <td>{{ row.corp_region_nm}}</td> -->
                  <td>{{ Number(row?.insr_tot_amt).toLocaleString() }}</td>
                  <td style="color: {{ row?.insr_tot_unpaid_amt < 0 ? 'text-error' : 'text-black' }}">
                    {{ Number(row?.insr_tot_unpaid_amt) === 0 ? '-' : Number(row?.insr_tot_unpaid_amt).toLocaleString() }}
                  </td>
                  <td>{{ row.status_nm }}</td>
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
      </v-card>
    </v-col>
  </v-row>

  <!--입금 처리-->
  <v-row>
    <v-col cols="12" class="pb-0" ref="refPage7">
      <v-card>
        <v-card-title class="d-flex flex-wrap px-0 pt align-center">
          <h2 class="font-weight-bold">
            <svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>입금내역
          </h2>
          <p class="text-body-2 ml-3 pt-1">
            전체 <span class="color-primary font-weight-bold">{{ Number(insuranceDTO?.trx_data.length).toLocaleString() }}</span> 건
          </p>
          <div class="ml-auto">
            <v-btn variant="outlined" size="small" class="mr-1" type="file" @click="fnExcelUpload('IND')">개인엑셀 입금</v-btn>
            <v-btn variant="outlined" size="small" class="mr-1" type="file" @click="fnExcelUpload('COR')">법인엑셀 입금</v-btn>
            <v-btn variant="outlined" size="small" class="mr-1" @click="fnAutoTRX()">간편 입금</v-btn>
            <v-btn variant="outlined" size="small" @click="fnAdd()">신규 입금</v-btn>
            <input type="file" ref="fileInputIND" @change="handleFileUploadIND" style="display: none" />
            <input type="file" ref="fileInputCOR" @change="handleFileUploadCOR" style="display: none" />
          </div>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-table class="v-board-table size-x-small">
            <colgroup>
              <col style="width: 40px" />
              <col style="width: 130px" />
              <col style="width: 150px" />
              <col style="width: 200px" />
              <col style="width: 180px" />
              <col style="width: auto" />
              <col style="width: 40px" />
            </colgroup>
            <thead>
              <tr>
                <th class="text-center">순번</th>
                <th class="text-center">구분</th>
                <th class="text-center">일자</th>
                <th class="text-center">금액</th>
                <th class="text-center">성명</th>
                <th class="text-center">비고</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in insuranceDTO.trx_data" :key="index" @click="selectedRowTRX = row" :class="{ selected: selectedRowTRX === row, 'cursor-pointer': true }">
                <td class="text-center">{{ index + 1 }}</td>
                <td>
                  <VSelectWithValidation v-model="row.trx_cd" name="trx_cd" label="" :items="trxCdItems" density="compact" variant="outlined" single-line></VSelectWithValidation>
                </td>
                <td>
                  <VTextFieldWithValidation v-model="row.trx_dt" name="trx_dt" label="" type="date" density="compact" color="primary" variant="outlined" single-line />
                </td>
                <td>
                  <VTextFieldWithValidation v-model="row.trx_amt" name="trx_amt" label="" color="primary" density="compact" variant="outlined" suffix="원" type="number" single-line />
                </td>
                <td>
                  <VTextFieldWithValidation v-model="row.acct_nm" name="acct_nm" label="" variant="outlined" density="compact" single-line />
                </td>
                <td><VTextFieldWithValidation v-model="row.rmk" name="rmk" label="" density="compact" color="primary" variant="outlined" single-line /></td>
                <td>
                  <v-btn variant="elevated" color="white" @click="fnDel(index)" size="small" class="min-width-auto pa-0">
                    <vue-feather type="minus-square" class="text-gray cursor-pointer vertical-align-middle"></vue-feather>
                  </v-btn>
                </td>
              </tr>
              <tr v-if="insuranceDTO.trx_data.length === 0">
                <td colspan="6" class="text-center">내용 없음</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <!-- 미납 영역 -->
        <v-card-text class="pa-0 mt-1 d-flex w-full" v-if="insuranceDTO.insr_tot_paid_amt == 0 || insuranceDTO.insr_tot_unpaid_amt > 0">
          <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
            <p class="text-12">최종보험료</p>
            <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</p>
          </v-card>
          <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
            <p class="text-12">납입 보험료</p>
            <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_paid_amt).toLocaleString() }}원</p>
          </v-card>
          <v-card class="py-2 px-6 bg-lighterror w-full mr-1">
            <p class="text-12">미납 보험료</p>
            <p class="text-h6 text-right text-error">{{ Number(insuranceDTO.insr_tot_unpaid_amt).toLocaleString() }}원</p>
          </v-card>
          <v-card class="py-2 px-6 bg-lighterror w-full mr-1">
            <p class="text-12">납입 상태</p>
            <p class="text-h6 text-right text-error">미납</p>
          </v-card>
          <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
            <p class="text-12">보험 상태</p>
            <p class="d-flex">
              <VSelectWithValidation v-model="insuranceDTO.status_cd" name="status_cd" label="" :items="statusCdItemsData" density="compact" variant="outlined" single-line :disabled="true" bg-color="white" class="size-x-small"></VSelectWithValidation>
              <v-btn variant="outlined" class="ml-1" size="small" @click="fnSave()">저장</v-btn>
            </p>
          </v-card>
        </v-card-text>

        <v-card-text class="pa-0 mt-1 d-flex w-full" v-if="insuranceDTO.insr_tot_paid_amt != 0 && insuranceDTO.insr_tot_unpaid_amt <= 0">
          <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
            <p class="text-12">최종보험료</p>
            <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</p>
          </v-card>
          <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
            <p class="text-12">납입 보험료</p>
            <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_paid_amt).toLocaleString() }}원</p>
          </v-card>
          <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
            <p class="text-12">미납 보험료</p>
            <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_unpaid_amt).toLocaleString() }}원</p>
          </v-card>
          <v-card class="py-2 px-6 bg-light-blue-lighten-4 w-full mr-1">
            <p class="text-12">납입 상태</p>
            <p class="text-h6 text-right">{{ insuranceDTO.insr_tot_unpaid_amt < 0 ? '과입금' : '완납' }}</p>
          </v-card>
          <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
            <p class="text-12">보험 상태</p>
            <p class="d-flex">
              <VSelectWithValidation v-model="insuranceDTO.status_cd" name="status_cd" label="" :items="statusCdItemsData" density="compact" variant="outlined" single-line :disabled="true" bg-color="white" class="size-x-small"></VSelectWithValidation>
              <v-btn variant="outlined" class="ml-1" size="small" @click="fnSave()">저장</v-btn>
            </p>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
    <!--     <v-col cols="5" class="pb-0" ref="refPage7">
      <v-card>
        <v-card-title class="d-flex flex-wrap px-0 align-center">
          <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>입금 처리</h2>
          <div class="ml-auto">
            <v-btn variant="outlined" size="small" class="mr-1" @click="fnAutoTRX();">간편 입금</v-btn>
            <v-btn variant="outlined" size="small" @click="fnAdd();">신규 입금</v-btn>
          </div>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-row class="v-board-table size-x-small">
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>구분</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VSelectWithValidation name="" label=""  single-line density="compact" disabled=""></VSelectWithValidation>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>일자</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation name="" label="" type="date" single-line density="compact" disabled=""></VTextFieldWithValidation>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>금액</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation name="" label="" suffix="원" single-line density="compact" disabled=""></VTextFieldWithValidation>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>성명</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation name="" label="" single-line density="compact" disabled=""></VTextFieldWithValidation>
              </div>
            </v-col>
          </v-row>          
        </v-card-text>     
        <v-card-actions class="d-flex justify-center pt-4 pb-6">
          <v-btn variant="flat" size="small" color="primary" class="mx-1">저장</v-btn>
          <v-btn variant="flat" size="small" color="gray" class="mx-1">삭제</v-btn>
        </v-card-actions>           
      </v-card>      
    </v-col> -->
  </v-row>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { MessageBoxDTO, ParamsDTO, CommonCode, InsuranceDTO, TRXDataDTO } from '@/model';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

import AdminBaseBreadcrumb from '@/components/AdminBaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';

import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';

import MessageBox from '@/components/MessageBox.vue';
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';
import dayjs from 'dayjs';
import { UPLOAD_EXCEL_INSURANCE_TAX_TRE_IND, UPLOAD_EXCEL_INSURANCE_TAX_TRE_COR, DOWNLOAD_EXCEL } from '../../../util/excelupdn';

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

const messageBoxDTO = ref(new MessageBoxDTO());
const insuranceDTO = ref(new InsuranceDTO());
const trxDataDTO = ref(new TRXDataDTO());

const businessCdItems = ref(['']);
const userCdItems = ref(['']);
const statusCdItems = ref(['']);
const statusCdItemsData = ref(['']);
const insrYearCdItems = ref([]);
const trxCdItems = ref([]);

const searchParams = ref(new ParamsDTO());
const isNoData = ref(false);
const selectedRow = ref();
const selectedRowTRX = ref();

let InsuranceList = ref([]);

const onPageView = (row: any) => {
  Object.assign(insuranceDTO.value, row);
};

const route = useRoute();

const page = ref({
  title: '입금처리'
});
const breadcrumbs = ref([
  {
    text: '계약관리',
    disabled: false,
    href: '/'
  },
  {
    text: '입금처리',
    disabled: true,
    href: '/'
  }
]);

async function fnSave() {
  let isRun = false;
  fnCal();
  await messageBoxDTO.value.setConfirm('확인', '저장 하시겠습니까?', null, (result, params) => {
    isRun = result;
  });
  if (isRun) {
    const resultData = await apiADMIN.setTAX_TRX([insuranceDTO.value]);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다. (자동 재조회)');

      fnSearch();
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  }
}

function fnDel(rowIdx: number) {
  insuranceDTO.value.trx_data.splice(rowIdx, 1);
  fnCal();
}

function fnCal() {
  insuranceDTO.value.insr_tot_paid_amt = insuranceDTO.value.trx_data.reduce((total, item) => total + Number(item.trx_amt), 0);
  insuranceDTO.value.insr_tot_unpaid_amt = Number(insuranceDTO.value.insr_tot_amt) - Number(insuranceDTO.value.insr_tot_paid_amt);

  if (insuranceDTO.value.insr_tot_unpaid_amt > 0) {
    insuranceDTO.value.status_cd = '10'; // 신청중
  } else {
    insuranceDTO.value.status_cd = '80'; // 정상
  }
}

function fnAdd() {
  try {
    const trxDataDTO = new TRXDataDTO();
    trxDataDTO.trx_cd = 'WT'; // 계좌이체
    trxDataDTO.trx_dt = dayjs().format('YYYY-MM-DD');
    trxDataDTO.acct_nm = '';
    trxDataDTO.rmk = '';
    insuranceDTO.value.trx_data.push(trxDataDTO);
  } catch (e) {
    console.log(e);
  }
}

async function fnSearch() {
  InsuranceList.value = [];
  const resultData = await apiADMIN.getTAX_TRX(searchParams.value.data);
  InsuranceList.value = resultData.data;
  if (InsuranceList.value.length == 0) {
    isNoData.value = true;
  } else {
    onPageView(InsuranceList.value[0]);
  }
}

const fileInputIND = ref(null);
const fileInputCOR = ref(null);

async function handleFileUploadIND(event) {
  try {
    const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_IND(event);
    const resultData = await apiADMIN.setTAX_TRX(excelList);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', `저장 되었습니다. 업데이트 건수 : ${resultData.data.toLocaleString()}`);
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `오류가 발생하였습니다.<br/>${e}`);
  } finally {
    event.target.value = '';
  }
}

async function handleFileUploadCOR(event) {
  try {
    const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_COR(event);
    console.log(excelList);
    const resultData = await apiADMIN.setTAX_TRX(excelList);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', `저장 되었습니다. 업데이트 건수 : ${resultData.data.toLocaleString()}`);
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `오류가 발생하였습니다.<br/>${e}`);
  } finally {
    event.target.value = '';
  }
}

async function fnExcelUpload(user_cd: string) {
  if (user_cd === 'IND') fileInputIND.value.click();
  if (user_cd === 'COR') fileInputCOR.value.click();
}

async function fnExcelDownload() {
  let businessCdNm = businessCdItems.value.find(items => items.value == searchParams.value.data.business_cd).title;
  let insrYearCdNm = insrYearCdItems.value.find(items => items.value == searchParams.value.data.insr_year).title;
  let userCdNm = userCdItems.value.find(items => items.value == searchParams.value.data.user_cd).title;
  let fileNm = `${insrYearCdNm}_${businessCdNm}_${userCdNm}`;
  let isRun = false;

  await messageBoxDTO.value.setConfirm('다운로드', `${fileNm} 자료를 다운 받으시겠습니까?`, null, (result, params) => {
    isRun = result;
  });

  try {
    if (isRun) {
      const resultData = await apiADMIN.getTAXExcel(searchParams.value.data);
      searchParams.value.data['excel_filenm'] = fileNm;

      if (resultData.data.length == 0) {
        messageBoxDTO.value.setInfo('Excel', '데이타가 없습니다. 검색조건을 확인하세요.');
      } else {
        console.log("resultData.data",resultData.data)
        DOWNLOAD_EXCEL(searchParams.value, resultData.data);
      }
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `엑셀다운로드에 실패하였습니다<br/>${e}`);
  }
}

async function fnAutoTRX() {
  let isRun = false;

  if (insuranceDTO.value.trx_data.length > 0) {
    messageBoxDTO.value.setInfo('확인', '입금내역이 존재합니다.');
    return false;
  }

  await messageBoxDTO.value.setConfirm('확인', '간편 입금 처리하시겠습니까?', null, (result, params) => {
    isRun = result;
  });

  if (isRun) {
    const trxDataDTO = new TRXDataDTO();
    trxDataDTO.trx_cd = 'WT'; // 계좌이체
    trxDataDTO.acct_nm = insuranceDTO.value.user_nm + (insuranceDTO.value.user_cd === 'IND' ? insuranceDTO.value.user_regno : '');
    trxDataDTO.trx_dt = dayjs().format('YYYY-MM-DD');
    trxDataDTO.trx_amt = insuranceDTO.value.insr_tot_amt;
    trxDataDTO.rmk = '';
    insuranceDTO.value.trx_data.push(trxDataDTO);
    insuranceDTO.value.status_cd = '80'; // 정상
    fnCal();

    fnSave();
  }
}

watch(
  () => route.params.business_cd,
  newBusinessCd => {
    initPage();
  }
);

/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
  InsuranceList.value = [];
  insuranceDTO.value = new InsuranceDTO();
  const businessCd = route.params.business_cd;

  businessCdItems.value = await CommonCode.getCodeList('COM001');
  userCdItems.value = await CommonCode.getCodeList('TAX002');
  statusCdItems.value = await CommonCode.getCodeList('COM030');
  statusCdItemsData.value = await CommonCode.getCodeList('COM030');
  statusCdItems.value.unshift({ title: '전체', value: '%' });
  userCdItems.value.unshift({ title: '전체', value: '%' });
  trxCdItems.value = await CommonCode.getCodeList('COM031');

  insrYearCdItems.value = [];
  insrYearCdItems.value.unshift({ title: '전체', value: '%' });
  for (let year = new Date().getFullYear(); year >= 2022; year--) {
    insrYearCdItems.value.push({ title: year.toString(), value: year.toString(), rmk: null });
  }

  searchParams.value.data['business_cd'] = businessCd;
  searchParams.value.data['insr_year'] = '%';
  searchParams.value.data['user_cd'] = '%';
  searchParams.value.data['status_cd'] = '%';
  searchParams.value.data['user_nm'] = '';
}

/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {
  // 로딩시 초기 데이터 셋팅
  initPage();
});
</script>
