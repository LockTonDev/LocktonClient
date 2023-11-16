<script setup lang="ts">
  import { onMounted, watch, defineEmits, ref } from "vue";

 
  const agr_yn = ref({agr40_yn:'N', agr41_yn:'N'});
  const isReadonly = ref(false);
  const isOpenDialog = ref(true); 

  const props = defineProps({
    agr41_yn: String,
    isReadonly:Boolean
  
  });



  const emit = defineEmits([
    'close'
  ]);

  const close = () => {
    if(agr_yn.value.agr41_yn == 'Y')
    {
      agr_yn.value.agr40_yn = 'Y';
    } 

    emit('close',  agr_yn);
  };
  const isPageOpen = ref(false);


  onMounted(async () => {   
    agr_yn.value.agr40_yn = props.agr40_yn||'N';
    agr_yn.value.agr41_yn = props.agr41_yn||'N';
    isReadonly.value = props.isReadonly
  });

</script>
  
<template>
  <v-dialog persistent v-model="isOpenDialog" width="1000px" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
          <div class="text-h6 font-weight-medium">
            변호사전문인배상책임보험 상품설명 확인서 <span class="text-18">(피보험자 변호사 확인)</span>
          </div>
      </v-card-title>   

      <v-divider class="mb-0"/>
      <v-card-text class="px-10 pt-8 pb-14">
        <ul class="list-style-type-none font-weight-medium">
          <li>보험계약자	:	대한변호사협회 </li>
        </ul>
        <div class="v-board-table mt-4 d-flex justify-space-between">
          <p class="pa-4 pr-0">변호사전문인배상책임보험의 주요사항에 대해 록톤컴퍼니즈코리아로부터 충분히 설명 받고 양지하였음을 확인합니다.<br/> 설명 받았다는 사실을 “확인” 란에 체크 해주시기 바랍니다.</p>
          <p class="pa-4 text-center">
            <v-checkbox v-model="agr_yn.agr41_yn" true-value="Y" false-value="N" hide-details label="확인" :disabled="isReadonly"/>
          </p>
        </div>
        <div class="v-board-table">
          <table class="w-100">
            <col style="width:80px"/>
            <col style="width:auto"/>
            <thead>
              <tr>
                <th>번호</th>
                <th>주요설명내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td>
                  <span class="font-weight-medium">* 약관 적용:</span> 
                  영문약관이 보상의 기준이며, 번역문은 계약자의 이해를 돕기 위한 참고용 입니다. 번역문의 내용이 영문 약관과 배치될 경우 영어의 원 뜻에 따라 해석됩니다.
                </td>
              </tr>
              <tr>
                <td class="text-center">2</td>
                <td>
                  <span class="font-weight-medium">* 보장 기준일:</span> 
                  보험계약 이후 수행한 업무부터 보상되며, 소급담보일(통상 최초가입일) 이후 수행한 업무에 기인한 사고가 보상됩니다.
                </td>
              </tr>
              <tr>
                <td class="text-center">3</td>
                <td>
                  <span class="font-weight-medium">* 계약 전 고지의무:</span> 
                  보험가입 이전의 업무로 발생한 사고, 가입 당시 이미 발생한 사고, 손해배상 원인이 될 수 있음을 알고 있었거나, 합리적으로 예견할 수 있었던 원인에 기인한 사고는 보상되지 않습니다. 또한 이러한 사실이 있는 경우 계약 체결 당시 반드시 보험회사에 고지하여야 하며, 고지의무를 위반한 경우 보상되지 않거나 보험계약이 해지될 수 있으니 반드시 유념하시기 바랍니다.
                </td>
              </tr>
              <tr>
                <td class="text-center">4</td>
                <td>
                  <span class="font-weight-medium">* 계약 후 통지의무:</span> 
                  보험계약 이후 손해배상청구가 예상되거나 인지한 경우, 청구가 있는 경우에는 즉시 서면으로 보험사에 통지가 되어야 합니다. 반드시 피해자의 소송이 있어야 되는 것은 아니므로 사고 사실을 인지하거나 청구 받은 경우 즉시 통지하시면 됩니다. 통지의무를 위반한 경우 면책되거나 불이익을 받을 수 있습니다.
                </td>
              </tr>
              <tr>
                <td class="text-center">5</td>
                <td>
                  <span class="font-weight-medium">* 배상청구기준 증권:</span> 
                  이 보험은 보험가입일 이후 수행한 업무가 유효한 보험기간 내에 배상청구 되는 경우 보상하는 보험입니다. 따라서 보험 만기시 갱신이 계속 이뤄져야 계속적인 보험적용을 받을 수 있고, 만기시 갱신하지 않거나 또는 보험기간 중 해지하는 경우 그 때부터 보험의 효력이 소멸됩니다.  (단, 자동보고연장기간 70일 내에 보험사에 서면 통보되는 경우 보상 가능합니다.)
                </td>
              </tr>
              <tr>
                <td class="text-center">6</td>
                <td>
                  <span class="font-weight-medium">* 피보험자 및 피용인의 고의 등 행위 부담보:</span>
                  고용직원의 부정직(또는 사기행위) 확장조항을 추가하지 않는 한, 보통약관의 담보조항에도 불구하고 ('선의의 피보험자'조항 등) 본 증권은 피보험자 또는 피보험자의 종업원에 의한 고의, 부정직, 악의, 범죄, 불법행위에 기인한 배상책임은 담보되지 않습니다.
                </td>
              </tr>
              <tr>
                <td class="text-center">7</td>
                <td>
                  <span class="font-weight-medium">* 고용직원의 부정직(또는 사기행위)확장 조항(Dishonesty Extension):</span>
                  고용직원의 부정직(또는 사기행위)확장조항을 추가 가입 할 경우, 피보험자의 고용인이 피보험자를 대신하여 전문서비스를 수행하는 동안 행한 부정직(또는 사기 행위)의 직접적인 결과로 보험기간 중에 인지된 금전적인 손실을 담보합니다. <span class="font-weight-bold" style="text-decoration: underline">사고가 인지(Discovery)된 이후 30일 이내에 해당 사실을 서면으로 보험회사에 통지해야 합니다.</span> 지방 변호사회에 등록된 전 사무원의 일괄가입을 전제로 하며, 변호사는 제외됩니다.
                </td>
              </tr>
              <tr>
                <td class="text-center">8</td>
                <td>
                  <span class="font-weight-medium">* “약관” 및 “예상질문에 대한 답변서” 확인:</span> 
                  기타 약관에서 정한 <span class="font-weight-medium">피보험자의 범위, 보상하는 손해, 면책 규정</span> 등은 보장범위를 결정하는 중요한 사항이므로 반드시 정독, 양지하시기 바라며 문의 사항은 질의하시어 꼭 확인하시기 바랍니다<br/>(당사 홈페이지 로그인 후 알림마당 -> 자료실에서 다운로드 가능합니다.)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="font-weight-medium mt-4 word-break-keep-all">보험약관은 당사 및 대한변호사협회 홈페이지에 게재되었으니 반드시 확인 및 양지하시기 바랍니다.</p>
        <div class="d-flex justify-end mt-4">
          <v-btn variant="flat" color="primary" @click="close()">닫기</v-btn>
        </div> 
      </v-card-text>
    </v-card>
  </v-dialog> 
</template>
  
<style scoped>
.v-board-table{border-bottom: none;}
.v-board-table tr th {font-size: 16px !important;padding: 14px 20px;text-align: left;border-bottom:1px solid #e9e9e9;text-align: center;}
.v-board-table tr td {font-size:14px;padding: 14px 20px;text-align: left;border-bottom:1px solid #e9e9e9;}
.v-board-table tr {border:none;}
</style>