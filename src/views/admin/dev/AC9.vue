<template>
	
    <!--입금 처리-->
  <v-row>
    <v-col cols="12" class="pb-0" ref="refPage7">
      <v-card>
        <v-card-title class="d-flex flex-wrap px-0 pt align-center">
          <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>엑셀업로드</h2>
          <p class="text-body-2 ml-3 pt-1">전체 <span class="color-primary font-weight-bold">{{ Number(insuranceDTO?.trx_data.length).toLocaleString() }}</span> 건</p>
          <div class="ml-auto">
            <v-btn variant="outlined" size="small" class="mr-1"  type="file" @click="fnExcelUpload('TAX','IND');">세무사_개인</v-btn>
            <v-btn variant="outlined" size="small" class="mr-1"  type="file" @click="fnExcelUpload('TAX','IND');">세무사_법인</v-btn>
            <v-btn variant="outlined" size="small" class="mr-1"  type="file" @click="fnExcelUpload('ACC','IND');">세무사_개인</v-btn>
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;">
          </div>
        </v-card-title>
      </v-card>      
    </v-col>
  </v-row>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

</template>


<script setup lang="ts">
import { ref, onMounted, computed, defineComponent, reactive } from "vue";
import { MessageBoxDTO, ParamsDTO, CommonCode, D_T0040ADTO} from '@/model';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import BaseCard from "@/components/BaseCard.vue";

import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';


import MessageBox from "@/components/MessageBox.vue";
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';
import { UPLOAD_EXCEL_INSURANCE_ACC } from "@/util/excelupdn";

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

async function handleFileUpload(event) {
  try {

    const excelList = await UPLOAD_EXCEL_INSURANCE_ACC_IND(event);
    

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', `저장 되었습니다. 업데이트 건수 : ${resultData.data.toLocaleString()}` );
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `오류가 발생하였습니다.<br/>${e}`);
  }finally {
    event.target.value = '';
  }
};


async function fnSave(mode:string) {
  let isRun = false;

  
  // 삭제처리
  await messageBoxDTO.value.setConfirm('저장', '저장 하시겠습니까?', null, (result, params) => {
      isRun = result;
  });

  if (isRun) {
    
    const resultData = await apiADMIN.setApplyInsurance(dT0040ADTO.value);
    console.log(resultData);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');
      fnSearch();
    } else {
      if(!resultData.errorCode) {
        messageBoxDTO.value.setWarning('실패', `저장에 실패하였습니다.<br/>${resultData.message}`);
    }
  }
};

async function fnSearch() {
 
}

/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
  businessCdItems.value = await CommonCode.getCodeList('COM001');
  procCdItems.value = await CommonCode.getCodeList('CAA003');
  procCdItemsData.value = await CommonCode.getCodeList('CAA003');
}

/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {    
  
  // 로딩시 초기 데이터 셋팅
  initPage();

});



</script>
