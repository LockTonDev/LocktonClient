<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" :image="page.image" ></BaseBreadcrumb>

  <v-row justify="center" v-if="isNoData" >
    <v-col cols="12" sm="6">
      <v-card class="v-box-table mt-16 mb-10">
        <v-card-text class="px-14 py-16 text-center">
          <v-avatar color="success" size="x-large">
            <vue-feather type="file" class="feather-lg"></vue-feather>
          </v-avatar>
          <p class="text-h5 font-weight-medium mt-10"><span class="text-primary">{{_AUTH_USER?.userNm}}</span> 회원님,<br/>가입한 보험 상품이 없습니다.</p>
        </v-card-text>
      </v-card>
      <div class="d-flex justify-center">
        <v-btn size="x-large" variant="flat" color="primary" to="/contract/ADV/V_TADV0030A11" depressed class="px-10">가입신청</v-btn>
      </div>
    </v-col>
  </v-row>

  <v-row v-if="!isNoData">
    <v-col cols="12" sm="12" class="mt-16">
      <div class="d-flex justify-space-between align-end">
        <p class="text-body-1">전체 <span class="color-primary font-weight-bold">{{ InsuranceList.length }}</span> 건</p>
        <div>
          <v-btn variant="flat" @click="onPageMove('insert')"  v-if="newInsrYN=='Y' && renewalInsrUUID == null">신규 가입</v-btn>&nbsp;
          <v-btn variant="flat" @click="onPageMove('renewal')" v-if="newInsrYN=='Y' && renewalInsrUUID != null">계약 갱신</v-btn>
         
        </div>
      </div>
      <v-table class="v-board-table size-large mt-4">
        <caption class="d-none">가입내역</caption>
        <thead name="">
          <tr>
            <th class="font-weight-medium text-center text-body-1">증권번호</th>
            <th class="font-weight-medium text-center text-body-1">피보험자</th>
            <th class="font-weight-medium text-center text-body-1">보험기간</th>
            <th class="font-weight-medium text-center text-body-1">보험료</th>
            <th class="font-weight-medium text-center text-body-1">신청서</th>
            <th class="font-weight-medium text-center text-body-1">
              가입증명서<v-icon class="ml-1" size="small">mdi-alert-circle-outline</v-icon>
              <v-tooltip activator="parent" location="top">
                가입증명서<v-icon class="ml-1" size="small">mdi-alert-circle-outline</v-icon>
                <v-divider class="my-1"/>
                개시일인 6월 30일 이후 영업일 기준 3일 후부터 출력 가능합니다.<br/>
                중도 가입자의 경우에는 보험료 입금 익일 오후부터 출력 가능합니다.
              </v-tooltip>
            </th>
            <th class="font-weight-medium text-center text-body-1">상태</th>
          </tr>
        </thead>
        <tbody v-if="InsuranceList.length">
          <tr v-for="(row, index) in InsuranceList">
             <td class="text-center text-body-1">{{ row.status_cd !== '91' ? row.insurance_no : '' }}</td>
            <td class="text-center text-body-1">
              <p v-if="row.user_cd == 'IND'">{{ row.user_nm }}</p>
              <p v-if="row.user_cd == 'JNT' && row.cbr_data.length > 0">{{ row.cbr_data[0].cbr_nm }} 외 {{row.cbr_cnt - 1}} 명</p>
            </td>
            <td class="text-center text-body-1">
              <div v-if="row.insr_year === '2022'">{{ row.insr_st_dt }} ~ {{ row.insr_cncls_dt }}</div>
              <div v-if="row.insr_year !== '2022'" class="title cursor-pointer" @click.prevent="onPageView(row.status_cd, row.insurance_uuid)"><span class="color-primary font-weight">{{ row.insr_st_dt }} ~ {{ row.insr_cncls_dt }}</span></div>
            </td>
            <td class="text-center text-body-1">{{ Number(row?.insr_tot_amt).toLocaleString()}} 원</td>
            <td class="text-center text-body-1">
              <v-icon v-if="row.insr_year !== '2022'"
                small
                class="text-primary cursor-pointer"
                title="신청서 출력"
                @click="onInsuranceFormOpen(row.insurance_uuid);"
                >mdi-printer</v-icon
              >
            </td>
            <td class="text-center text-body-1">
              <v-icon
                small
                class="text-primary cursor-pointer"
                title="가입증명서 출력"
                @click="onCertificatePrintFrameOpen(row.status_cd, row.insurance_uuid)"
                v-if="row.status_cd == '80' || row.status_cd == '90'"
                >mdi-printer</v-icon
                >
              </td>
            <td class="text-center text-body-1">{{row.status_nm}}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="7" class="text-center">내용 없음</td>
            </tr>
            </tbody>
      </v-table>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <dl class="mt-16 pa-10 bg-background">
        <dt class="text-body-1 font-weight-medium"><i class="mdi mdi-alert-circle-outline mr-2"></i>유의사항</dt>
        <!-- <dd class="text-body-2 mt-2" v-if="_AUTH_USER?.userCd == 'IND'">&middot; 가입일 이전 법인 소속으로 가입되어 있어 기존 소급담보일 유지를 원하시는 경우 록톤코리아로 연락주시기 바랍니다.</dd> -->
        <dd class="text-body-2 mt-2">&middot; 가입 신청 후 보험료 입금전인 경우, 보험기간을 클릭하면 신청내용을 변경할 수 있습니다.</dd>
        <dd class="text-body-2 mt-2">&middot; 보험료가 납부되어야 계약이 체결되며, 보험기간이 개시된 이후 가입조건 변경은 1회만 가능합니다. </dd>
        <dd class="text-body-2 mt-2">&middot; 조건변경, 가입형태 전환, 해지 등 업무는 보험계약 > 변경 페이지에서 신청하여 주시기 바랍니다.</dd>
      </dl>
    </v-col>
  </v-row>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

  <!-- 가입신청서 시작 -->
  <V_TADV0030P20 :insurance_uuid="insuranceUUID" :isPdf=true v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
  <!-- 가입증명서 종료 -->

  <!-- 가입증명서 시작 -->
  <V_TADV0030P30 :insurance_uuid="insuranceUUID" :isPdf=true v-if="isCertificatePrintFramDialog" @close="onCertificatePrintFrameClose" />
  <!-- 가입증명서 종료 -->

  <PopupList></PopupList>

</template>


<script setup lang="ts">
  import { ref, onMounted, computed  } from "vue";
  import { MessageBoxDTO } from '@/model';
  import BaseCard from "@/components/BaseCard.vue";
  import MessageBox from "@/components/MessageBox.vue";
  import PopupList from "@/components/PopupList.vue";
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
  import V_TADV0030P20 from "@/views/contract/ADV/V_TADV0030P20.vue";
  import V_TADV0030P30 from "@/views/contract/ADV/V_TADV0030P30.vue";
  import InsuranceForm from "@/components/InsuranceForm.vue";
  import apiADV0030a from '@/api/api/A_TADV0030A';
  import router from "@/router";
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';

  const authStore = useAuthStore();
  const { _AUTH_USER } = storeToRefs(authStore);
  let InsuranceList = ref([]);
  
  const isNoData = ref(false);
  const isCertificatePrintFramDialog = ref(false);
  const isInsuranceFormDialog = ref(false);
  const insuranceUUID = ref("");
  const newInsrYN = ref("");
  const renewalInsrUUID= ref(""); 

  // 초기정보 설정
  const messageBoxDTO = ref(new MessageBoxDTO());


  const page = ref({
      title: "전문인배상책임보험 보험계약",
      subtitle : "",
      image: "/assets/images/background/bg-subscription1.jpg",
    });

  const breadcrumbs = ref([
    {
      text: "보험계약",
      disabled: false,
      to: "#",
    },
    {
      text: "가입/조회/출력",
      disabled: false,
      to: "#",
    }
  ]);





  const onPageMove = (actionType:string) => {

    if(actionType == 'renewal') {
      router.push({ path: '/contract/ADV/V_TADV0030A11/' + renewalInsrUUID.value , query :{renewal : 'Y'} });
    }else  if(actionType == 'insert') {
      router.push({ path: '/contract/ADV/V_TADV0030A11'});
    }
  };

  const onPageView = (status_cd:string, insurance_uuid:string) => {
    let path = '';

    // 10 - 신청
    if (status_cd == "10") {
      messageBoxDTO.value.setConfirm('확인', '신청이력이 있습니다. 수정하시겠습니까?', insurance_uuid, (result, params) => {
        if (result) {
           router.push('/contract/ADV/V_TADV0030A11/' + params);
        }
      });
    
    }else {
      path = '/contract/ADV/V_TADV0030A12/' + insurance_uuid;
      router.push(path);
    }
    
   

  };

  const onPageDelete = (moveType:string, insurance_uuid:string) => {
    
  };

  

    /**
   * 보험가입신청서 팝업호출
   * @param param 
   */
   const onInsuranceFormOpen = (param:string) => {
    insuranceUUID.value = param;
    isInsuranceFormDialog.value = true;

  }

 


  /**
   * 보험가입증명서 팝업 호출
   * @param param 
   */
  const onCertificatePrintFrameOpen = (status_cd:string, insurance_uuid:string) => {
    insuranceUUID.value = insurance_uuid;
    isCertificatePrintFramDialog.value = true;
  };

  const onCertificatePrintFrameClose = () => {
    insuranceUUID.value = '';
    isCertificatePrintFramDialog.value = false;
    // router.go(0);
   
  }
  
  const onInsuranceFormClose = () => {
    insuranceUUID.value = '';
    isInsuranceFormDialog.value = false;
    // router.go(0);
  }

  
  onMounted(async () => {    
      const params = ref([]);
      const resultData = await apiADV0030a.getDBSelList(params);

      InsuranceList.value = resultData.data.list;
      newInsrYN.value = resultData.data.newInsrYN[0].data;
      renewalInsrUUID.value = resultData.data.renewalInsrUUID[0].data;

      if(InsuranceList.value.length == 0 && newInsrYN.value == 'Y' && renewalInsrUUID.value == null) {
        isNoData.value = true;
      }
  });

  
 
</script>
