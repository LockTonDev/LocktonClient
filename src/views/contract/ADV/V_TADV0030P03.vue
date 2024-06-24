<template>
  <v-dialog persistent v-model="isOpenDialog" width="1000px" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-medium text-wrap">
          계약의 체결∙이행 등을 위한 개인(신용)정보 처리 동의서 (변호사)
        </div>
        <div class="d-flex justify-space-between align-end">
          <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>
        </div>
      </v-card-title>
      <v-divider class="mb-0" />
      <v-card-text :class="checkMobile.isMobile?'px-2 pt-4 pb-4':'px-10 pt-8 pb-14'">
        <div class="d-flex justify-space-between align-center">
          <h3 :class="checkMobile.isMobile?'text-20 text-display-2 font-weight-bold':'text-display-2 font-weight-bold'">DB손해보험㈜ 귀중</h3>
          <p :class="checkMobile.isMobile?'text-7 color-gray-shadow':'text-14 color-gray-shadow'">각 동의란에 체크 하십시오</p>
        </div>
        <div class="v-board-table mt-4">
          <table>
            <col style="width:25%" />
            <col style="width:auto" />
            <col style="width:25%" />
            <tbody>
              <tr>
                <th>
                  소비자 권익보호에 관한 사항
                </th>
                <td colspan="2">
                  <p class="font-weight-medium">▪ 최소한의 정보 처리 및 동의 거부에 관한 안내</p>
                  <p>정보동의시 당사 및 당사 업무수탁자는 계약의 체결 및 이행 목적달성에 부합하는 최소한의 정보만 수집∙이용 및 제공하며, 귀하는 동의를 거부할 권리가 있습니다. 단, 본 동의를
                    거부하시는 경우에는 보험계약의 체결이 부득이하게 거절되거나 정상적인 서비스 제공이 불가능할 수 있음을 알려 드립니다.</p>
                  <p class="font-weight-medium">▪ 신용등급에 미치는 영향</p>
                  <p>본 동의서에 의한 개인(신용)정보 조회는 귀하의 신용등급에 영향을 주지 않습니다.</p>
                </td>
              </tr>
              <tr>
                <th>
                  1. 개인(신용)정보의 수집∙이용에 관한 사항
                </th>
                <td>
                  당사 및 당사 업무수탁자는「개인정보보호법」및 「신용정보의 이용 및 보호에 관한 법률」에 따라 본 계약과 관련하여 귀하의 개인(신용)정보를 다음과 같이 수집∙이용하고자 합니다. 이에 대하여
                  동의하십니까?
                </td>
                <td class="px-0">
                  <v-checkbox v-model="agr_yn.agr31_yn" true-value="Y" false-value="N" hide-details label="동의함"
                    :disabled="isReadonly" />
                </td>
              </tr>
              <tr>
                <th>
                  2. 개인(신용)정보의 조회에 관한 사항
                </th>
                <td>
                  당사 및 당사 업무수탁자는「신용정보의 이용 및 보호에 관한 법률」에 따라 본 계약과 관련하여 귀하의 개인(신용)정보를 다음과 같이 신용정보집중기관 및 보험요율산출기관 으로부터 조회하고자
                  합니다. 이에 대하여 동의하십니까?
                </td>
                <td class="px-0">
                  <v-checkbox v-model="agr_yn.agr32_yn" true-value="Y" false-value="N" hide-details label="동의함"
                    :disabled="isReadonly" />
                </td>
              </tr>
              <tr>
                <th>
                  3. 개인(신용)정보의 제공에 관한 사항
                </th>
                <td>
                  당사 및 당사 업무수탁자는「개인정보보호법」및「신용정보의 이용 및 보호에 관한 법률」에 따라 본 계약 관련한 귀하의 개인(신용)정보를 다음과 같이 제3자에게 제공하고자 합니다. 이에 대해
                  동의하십니까?
                </td>
                <td class="px-0">
                  <v-checkbox v-model="agr_yn.agr33_yn" true-value="Y" false-value="N" hide-details label="동의함"
                    :disabled="isReadonly" />
                </td>
              </tr>
              <tr>
                <th>
                  4. 고유식별정보의 처리에 관한 사항
                </th>
                <td>
                  당사 및 당사 업무수탁자는「개인정보보호법」제24조에 따라 본 계약과 관련하여 상기의 개인(신용)정보에 대한 개별 동의 사항에 대하여 귀하의 고유식별정보(주민등록번호∙외국인등록번호)를
                  처리(수집∙이용, 제공 등)하고자 합니다. 이에 대하여 동의 하십니까?
                </td>
                <td class="px-0">
                  <v-checkbox v-model="agr_yn.agr34_yn" true-value="Y" false-value="N" hide-details label="동의함"
                    :disabled="isReadonly" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-display-2 font-weight-bold mt-8">개인(신용)정보의 수집∙이용, 조회, 제공에 관한 동의 사항</h3>
        <div class="border-top-black-1 border-bottom-lightgray-1 py-4 terms-wrap-v1 mt-4">
          <ul>
            <li>1.개인(신용)정보의 수집∙이용에 관한 동의 사항
              <ul>
                <li>▪ 개인(신용)정보의 수집∙이용 목적
                  <ul>
                    <li>∙보험계약의 인수심사∙체결∙유지∙관리(부활 및 갱신 포함), 보험금 등 지급∙심사, 순보험요율의 산출∙검증, 민원처리 및 분쟁 대응, 적부 및 보험사고조사(보험사기 조사
                      포함), 보험모집질서 유지,조사연구,서비스제공</li>
                  </ul>
                </li>
                <li>▪ 수집∙이용한 개인(신용)정보의 내용
                  <ul>
                    <li>∙개인식별정보(성명, 생년월일, 주민등록번호, 외국인등록번호, 주소, 성별, 직업, 전화번호, 휴대전화번호, 전자우편주소)</li>
                    <li>∙보험계약정보, 보험금지급 관련 정보(사고정보 및 관련 영상정보∙음성정보, 본인의 위임을 받아 취득한 각종 조사서, 판결문, 증명서, 확인서 등)</li>
                  </ul>
                </li>
                <li>▪ 개인(신용)정보의 보유∙이용 기간
                  <ul>
                    <li>∙수집∙이용 동의일로부터 개인(신용)정보의 수집∙이용 목적을 달성할 때까지(최대 거래종료 후 5년까지)</li>
                    <li>(단, 보험금 지급, 금융사고 조사, 법령상 의무이행을 위한 경우 별도 보관)</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>2.개인(신용)정보의 조회에 관한 동의 사항
              <ul>
                <li>▪ 조회한 개인(신용)정보
                  <ul>
                    <li>∙보험계약정보, 보험금지급 관련 정보(사고정보 포함)</li>
                  </ul>
                </li>
                <li>▪ 개인(신용)정보 조회목적
                  <ul>
                    <li>∙보험계약의 인수심사∙체결∙유지∙관리(부활 및 갱신 포함), 보험금 등 지급∙심사, 보험사고조사(보험사기조사 포함)</li>
                  </ul>
                </li>
                <li>▪ 조회동의 유효기간
                  <ul>
                    <li>∙동의서 제출일로부터 개인(신용)정보의 조회 목적을 달성할 때까지(최대 거래종료 후 5년까지)</li>
                  </ul>
                </li>
                <li>▪ 조회자(개인(신용)정보를 제공받은 자)의 개인(신용)정보 보유∙이용기간
                  <ul>
                    <li>∙정보를 제공받은 날로부터 개인(신용)정보의 조회 목적을 달성할 때까지(최대 거래종료 후 5년까지)</li>
                    <li>(단, 보험금 지급, 금융사고 조사, 법령상 의무이행을 위한 경우 별도 보관) </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>3.개인(신용)정보의 제공에 관한 동의 사항
              <ul>
                <li>▪ 개인(신용)정보를 제공받는 자
                  <ul>
                    <li>∙신용정보집중기관: 한국신용정보원 등 신용정보집중기관</li>
                    <li>∙공공기관 등 : 금융위원회, 금융감독원, 보험요율산출기관 등 공기관, 법원, 검찰, 경찰, 국토해양부, 국세청 등 법령상 업무수행기관(위탁사업자 포함), 손해보험협회</li>
                    <li>∙보험회사 등 : 손해보험회사, 국내∙국외 재보험사, 공제사업자, 체신관서(우체국보험), 금융거래 관련 계좌개설 금융기관, 금융결제원</li>
                    <li>∙업무수탁자 등 : 보험중개사, 계약 체결 및 이행 등에 필요한 업무를 위탁받은 자(보험사고조사업체, 손해사정업체, 변호사 등)</li>
                    <li>∙대한변호사협회</li>
                  </ul>
                </li>
                <li>▪ 개인(신용)정보를 제공받는 자의 이용목적
                  <ul>
                    <li>∙신용정보집중기관 : 보험계약 및 보험금지급 관련 정보의 집중관리 및 활용 등 신용정보집중기관의 업무</li>
                    <li>∙공공기관 등 : 보험업법 등 법령에 따른 업무수행(위탁업무포함)</li>
                    <li>∙보험회사 등 : 중복보험 확인 및 비례보상, 재보험 가입 및 재보험금 청구, 보험계약 공동인수</li>
                    <li>∙업무수탁자 등 : 본 계약의 체결∙이행 관련 위탁업무 수행, 자문업무</li>
                    <li>∙대한변호사협회 : 단체보험 가입∙운영, 보험갱신, 사고조회, 자문업무</li>
                  </ul>
                </li>
                <li>▪ 제공할 개인(신용)정보의 내용
                  <ul>
                    <li>∙「1.개인(신용)정보의 수집∙이용에 관한 사항」의 정보 내용</li>
                  </ul>
                </li>
                <li>▪ 제공받는 자의 개인(신용)정보 보유∙이용기간
                  <ul>
                    <li>∙제공 동의일로부터 개인(신용)정보를 제공받는 자의 이용목적을 달성할 때까지(최대 거래종료 후 5년까지)</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <p>※거래종료일:1)보험계약 만기, 해지, 취소, 철회일 또는 소멸일 및 2)보험금청구권 소멸시효 완성일, 채권채무관계 소멸일 중 가장 나중에 도래한 사유를 기준으로 판단</p>
          <p>※각 제공대상기관 및 이용목적의 구체적인 정보는 당사 홈페이지[http://www.idbins.com]에서 확인할 수 있습니다.</p>
        </div>
        <p class="font-weight-medium mt-4 word-break-keep-all">※ 본인은 「개인정보보호법」및 「신용정보의 이용 및 보호에 관한 법률」에 따라 귀사가 본인의
          개인(신용)정보를 상기 내용과 같이 처리하는 것에 동의 합니다.</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { onMounted, defineEmits, ref } from "vue";
  import BaseCard from "@/components/BaseCard.vue";

  import {useMobileStore} from "@/stores";
  const checkMobile = useMobileStore();

  const agr_yn = ref({agr30_yn:'N'
                      , agr31_yn:'N'
                      , agr32_yn:'N'
                      , agr33_yn:'N'
                      , agr34_yn:'N'});
  const isReadonly = ref(false);

  const isOpenDialog = ref(true); 
  const props = defineProps({
    agr31_yn: String,
    agr32_yn: String,
    agr33_yn: String,
    agr34_yn: String,
    isReadonly:Boolean
  
  });

  const emit = defineEmits([
    'close'
  ]);

  const close = () => {
    isOpenDialog.value = false;
  
    if(agr_yn.value.agr31_yn == 'Y' 
      && agr_yn.value.agr32_yn == 'Y' 
      && agr_yn.value.agr33_yn == 'Y' 
      && agr_yn.value.agr34_yn == 'Y') 
    {
      agr_yn.value.agr30_yn = 'Y';
    } 

    emit('close',  agr_yn);

  };

  onMounted(async () => {   
    agr_yn.value.agr31_yn = props.agr31_yn||'N';
    agr_yn.value.agr32_yn = props.agr32_yn||'N';
    agr_yn.value.agr33_yn = props.agr33_yn||'N';
    agr_yn.value.agr34_yn = props.agr34_yn||'N';
    isReadonly.value = props.isReadonly
  });

</script>

<style scoped>
.v-board-table{border-bottom: none;}
@media screen and (min-width:960px) {
  .v-board-table tr th {font-size: 16px !important;padding: 14px 20px;text-align: left;border-bottom:1px solid #e9e9e9;}
  .v-board-table tr td {font-size:14px;padding: 14px 20px;text-align: left;border-bottom:1px solid #e9e9e9;}
}
@media screen and (max-width:959px) {
  .v-board-table tr th {font-size: 12px !important;padding: 4px 8px;text-align: left;border-bottom:1px solid #e9e9e9;}
  .v-board-table tr td {font-size:10px;padding: 4px 8px;text-align: left;border-bottom:1px solid #e9e9e9;}
}
.v-board-table tr {border:none;}

</style>