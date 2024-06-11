<template>
  <BaseBreadcrumb :title="pageInfo.title" :breadcrumbs="breadcrumbs" :image="pageInfo.image" ></BaseBreadcrumb>

  <v-row>
    <v-col cols="12" sm="12" class="py-16">
      <div class="d-flex justify-space-between align-end">
        <p class="text-body-1">전체 <span class="color-primary font-weight-bold">{{ d_TADV0040AList.length }}</span>건</p>
        <v-btn text @click="onRegDialog()"> 변경신청 </v-btn>
      </div>
      <v-table class=" v-board-table size-large mt-4">
        <caption class="d-none">가입내역</caption>
        <thead name="">
          <tr>
            <th class="text-center text-subtitle-1">증권번호</th>
            <th class="text-center text-subtitle-1">피보험자</th>
            <th class="text-center text-subtitle-1">변경구분</th>
            <th class="text-center text-subtitle-1">신청일자</th>
            <th class="text-center text-subtitle-1">개시일자</th>
            <th class="text-center text-subtitle-1">처리일자</th>
            <th class="text-center text-subtitle-1">처리상태</th>
            <th class="text-center text-subtitle-1">상세보기</th>
          </tr>
        </thead>
        <tbody v-if="d_TADV0040AList.length">
          <tr v-for="(row, index) in d_TADV0040AList">
            <td class="text-center text-subtitle-1">{{ row.insurance_no }}</td>
            <td class="text-center text-subtitle-1">{{ row.insurance_user_nm}}</td>
            <td class="text-center text-subtitle-1">{{ row.apply_nm }}</td>
            <td class="text-center text-subtitle-1">{{ row.apply_dt }}</td>
            <td class="text-center text-subtitle-1">{{ row.apply_posted_dt }}</td>
            <td class="text-center text-subtitle-1">{{ row.proc_dt }}</td>
            <td class="text-center text-subtitle-1">{{ row.proc_nm }}</td>
            <td class="text-center text-subtitle-1">
              <v-icon
                small
                class="mr-2 text-primary cursor-pointer"
                title="보기"
                @click="onViewDtl(row.apply_no)"
                >mdi-file-document</v-icon
              >
            </td>
          </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="8" class="text-center">신청내역이 없습니다.</td>
            </tr>
        </tbody>
      </v-table>
      <v-pagination v-model="page" :length="pages" rounded="circle" />
      <dl class="mt-16 pa-10 bg-background">
        <dt class="text-body-1 font-weight-medium"><i class="mdi mdi-alert-circle-outline mr-2"></i>유의사항</dt>
        <dd class="text-body-2 mt-4">&middot; 조건변경은 보험기간 중 1회만 가능합니다.</dd>
        <dd class="text-body-2 mt-2">&middot; 변경신청이 접수되면 필요서류를 이메일로 송부드리고 담당자에게 연락드립니다.</dd>
      </dl>
    </v-col>
  </v-row>
 

  <!-- 변경신청 팝업 시작 -->
  <v-dialog persistent v-model="isRegDialog" width="1000" hide-overlay>
    <v-card>
      <v-card-title>
        <h3 class="text-h6 font-weight-bold">변경신청</h3>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-6">
        <p class="text-body-2 color-gray-shadow mb-2">
          <sup class="text-error ml-1">*</sup> 는 필수 입력입니다.
        </p>
        <v-row class="v-board-table ma-0">
          <v-col cols="6">
            <div class="head-col">증권번호</div>
            <div class="data-col w-full"> {{  d_TADV0040A.insurance_no  }}
              <!-- <VSelectWithValidation v-model="d_TADV0040A.insurance_year" name="insurance_year" :items="items" item-title="text" item-value="value" class="w-100" density="comfortable" :disabled="true"></VSelectWithValidation>             -->
            </div>
          </v-col>
          <v-col cols="6">
            <div class="head-col">변경구분<sup class="text-error ml-1">*</sup></div>
            <div class="data-col w-full">
              <VSelectWithValidation v-model="d_TADV0040A.apply_cd" name="apply_cd" label="변경구분을 선택하세요." :items="applyItems" class="w-100"  single-line density="comfortable"></VSelectWithValidation>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="head-col">신청일자</div>
            <div class="data-col">{{ d_TADV0040A.apply_dt  }}
              <!-- <VTextFieldWithValidation v-model="d_TADV0040A.apply_dt" name="apply_dt" label="" type="date" single-line :readonly="true" class="w-100" density="comfortable"/>  -->
            </div>
          </v-col>
          <v-col cols="6">
            <div class="head-col">변경개시일<sup class="text-error ml-1">*</sup></div>
            <div class="data-col w-full">
              <VTextFieldWithValidation v-model="d_TADV0040A.apply_posted_dt" name="apply_posted_dt" label="" type="date" :min="d_TADV0040A.apply_dt" single-line density="comfortable" class="w-full"/>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="head-col">변경상세<sup class="text-error ml-1">*</sup></div>
            <div class="data-col w-full">
              <p class="w-full text-gray">* 변경되는 변호사의 성명/생년월일/등록번호/사유(추가 또는 해지)</p>
              <v-textarea v-model="d_TADV0040A.apply_content" variant="outlined" counter class="mt-2 w-full" rows="10" no-resize></v-textarea>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="head-col">담당자명<sup class="text-error ml-1">*</sup></div>
            <div class="data-col w-full">
              <VTextFieldWithValidation v-model="d_TADV0040A.nm" name="nm" label="" single-line class="w-sm-242" maxlength="20" density="comfortable"/>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="head-col">연락처<sup class="text-error ml-1">*</sup></div>
            <div class="data-col col">
              <VTextFieldWithValidation v-model="d_TADV0040A.tel" name="tel" label="" single-line maxlength="20" />
            </div>
          </v-col>
          <v-col cols="4">
            <div class="head-col">이메일<sup class="text-error ml-1">*</sup></div>
            <div class="data-col w-full">
              <VTextFieldWithValidation v-model="d_TADV0040A.email" name="email" label="" single-line class="w-100"  maxlength="50" density="comfortable"/>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex align-center justify-center py-4">
        <v-btn variant="outlined" color="dark" @click="isRegDialog = false" size="large"> 취소 </v-btn>
        <v-btn variant="flat" color="primary" @click="onSubmit()" size="large"> 접수 </v-btn>
      </v-card-actions>
  </v-card>
  </v-dialog>
  <!-- 변경신청 팝업 종료 -->


   <!-- 상세보기 팝업 시작 -->
   <v-dialog persistent v-model="isViewDialog" width="1000" hide-overlay>
     <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <h3 class="text-h6 font-weight-bold">변경신청 상세내역</h3>
        <v-btn variant="outlined" color="dark" @click="isViewDialog = false"> 닫기 </v-btn>
      </v-card-title>
      <v-divider />
       <v-card-text class="pa-6">
        <v-row class="v-board-table ma-0">
          <v-col cols="6">
            <div class="head-col">증권번호</div>
            <div class="data-col">{{ d_TADV0040A.insurance_no }}</div>
          </v-col>
          <v-col cols="6">
            <div class="head-col">변경구분</div>
            <div class="data-col">  {{  d_TADV0040A.apply_nm }}</div>
          </v-col>
          <v-col cols="6">
            <div class="head-col">신청일자</div>
            <div class="data-col"> {{  d_TADV0040A.apply_dt }}</div>
          </v-col>
          <v-col cols="6">
            <div class="head-col">변경개시일</div>
            <div class="data-col"> {{  d_TADV0040A.apply_posted_dt }}</div>
          </v-col>
          <v-col cols="12">
            <div class="head-col">변경상세</div>
            <div class="data-col"> <pre class="pre">{{ d_TADV0040A.apply_content  }}</pre></div>
          </v-col>
          <v-col cols="4">
            <div class="head-col">담당자 성명</div>
            <div class="data-col">{{  d_TADV0040A.nm }}</div>
          </v-col>
          <v-col cols="4">
            <div class="head-col">연락처</div>
            <div class="data-col"> {{  d_TADV0040A.tel }}</div>
          </v-col>
          <v-col cols="4">
            <div class="head-col">이메일</div>
            <div class="data-col"> {{  d_TADV0040A.email }}</div>
          </v-col>
          <v-col cols="8">
            <div class="head-col">처리일자</div>
            <div class="data-col"> {{ d_TADV0040A.proc_dt  }}</div>
          </v-col>
          <v-col cols="4">
            <div class="head-col">처리상태</div>
            <div class="data-col">{{  d_TADV0040A.proc_nm }} </div>
          </v-col>
          <!-- <v-col cols="12">
            <div class="head-col">처리내용</div>
            <div class="data-col"><pre class="pre">{{ d_TADV0040A.proc_content  }}</pre></div>
          </v-col> -->
          
        </v-row>
      </v-card-text>
   </v-card>
   </v-dialog>
  <!-- 상세보기 팝업 종료 -->



  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>


</template>


<script setup lang="ts">
  import { ref, onMounted, computed, watchEffect  } from "vue";
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';
  import { InsuranceYup } from '@/schema';
  import { MessageBoxDTO, D_T0040ADTO, CommonCode } from '@/model';
  import MessageBox from "@/components/MessageBox.vue";
  import BaseCard from "@/components/BaseCard.vue";
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
  import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
  import VSelectWithValidation from '@/components/VSelectWithValidation.vue';

  
  import apiA_TADV0030A from '@/api/api/A_TADV0030A';
  import apiA_TADV0040A from '@/api/api/A_TADV0040A';


  import router from "@/router";
  import dayjs from 'dayjs'

  const authStore = useAuthStore();
  const { _AUTH_USER } = storeToRefs(authStore);

  // 초기정보 설정
  const messageBoxDTO = ref(new MessageBoxDTO());

  const d_TADV0040A = ref(new D_T0040ADTO());
  const d_TADV0040AList = ref<D_T0040ADTO[]>([]);

  const isNoData = ref(false);

  const pageInfo = ref({
    title: "전문인배상책임보험 변경",
    subtitle : "",
    image: "../../assets/images/background/bg-subscription1.jpg",
  });

  const breadcrumbs = ref([
    {
      text: "보험계약",
      disabled: false,
      to: "/contract/ADV/V_TADV0030A10",
    },
    {
      text: "변경",
      disabled: false,
      to: "#",
    }
  ]);



  const page = ref(1);
  const pages = ref(0);
  const limit = 10;
  const total = ref(0);


  const isRegDialog = ref(false);
  const isViewDialog = ref(false);

  const applyItems = ref([]);


 /**
   * 변경신청내역 상세조회
   * @param apply_no 
   */
   async function onRegDialog() {

    const today = dayjs().format('YYYY-MM-DD');
    d_TADV0040A.value.clear();
    d_TADV0040A.value.apply_posted_dt = today;
    d_TADV0040A.value.apply_dt = today;
    d_TADV0040A.value.proc_cd = '10'; //접수
    d_TADV0040A.value.user_cd = _AUTH_USER.value.userCd;
    d_TADV0040A.value.business_cd = _AUTH_USER.value.businessCd;

    let {data} = await apiA_TADV0030A.getDBSelStatus();

    data = data.filter(item => item.status_cd === '80');

    if(data.length > 0) {
      d_TADV0040A.value.insurance_no = data[0].insurance_no;
      d_TADV0040A.value.insurance_uuid = data[0].insurance_uuid;
      d_TADV0040A.value.insurance_user_nm = data[0].user_nm;
      isRegDialog.value = true;
    }else {
      messageBoxDTO.value.setInfo( '변경신청', '가입되어 있는 보험이 없습니다.');
    }


};



async function checkValidation() {
  const validationSchema = InsuranceYup.MODIFY_FORM;
  const isValidate = await validationSchema.validate(d_TADV0040A.value, { abortEarly: false })
    .then(() => {
      return true;
    })
    .catch(error => {
      // 유효성 검사 실패
      console.log(error.inner);
      messageBoxDTO.value.setWarning( '입력확인', error.inner[0].message);
      return false;
    });

  return isValidate;
}

 /**
   * 변경신청내역 상세조회
   * @param apply_no 
   */
async function onSubmit() {
  if (!await checkValidation()) return false;
    
  const retData = await apiA_TADV0040A.setDBIns(d_TADV0040A.value);
  if(retData.success) {
    getItems();
    messageBoxDTO.value.setInfo( '변경신청', '보험 변경신청이 접수 되었습니다.');
  }

  isRegDialog.value = false;


};

  /**
   * 변경신청내역 상세조회
   * @param apply_no 
   */
  async function onViewDtl(apply_no:number) {
    const params = {apply_no:apply_no};
    const retData = await apiA_TADV0040A.getDBSel(params);
    d_TADV0040A.value = new D_T0040ADTO(retData.data);
    isViewDialog.value = true;

  };

  const getItems = async () => {
    const params = { page: page.value, limit };
    const { data } = await apiA_TADV0040A.getDBSelList(params);

    d_TADV0040AList.value = data.items;

    total.value = data.tot_count;
    pages.value = Math.ceil(total.value / limit);
    
  };

  watchEffect(() => {
    getItems();
  }); 


  onMounted(async () => {  
    const items = await CommonCode.getCodeList('COM040');
    applyItems.value = items.filter(item => item.value.startsWith(`${_AUTH_USER.value.businessCd}${_AUTH_USER.value.userCd}`));
  });
</script>
