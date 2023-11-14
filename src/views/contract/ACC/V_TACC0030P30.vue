<template>
  <v-dialog persistent v-model="isOpenDialog" width="1000px" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-medium">
          보험가입증명서
          <span class="text-20 text-red ml-2" v-if="insuranceDTO.user_cd === 'IND' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 생년월일(6자리) 입니다.</span>
        </div>
        <div class="d-flex justify-space-between align-end">
          <v-btn v-if="isPdf" variant="flat" color="dark" @click="onExportPDF('down')">저장</v-btn>&nbsp;
          <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>
        </div>
      </v-card-title>

      <v-divider class="mb-0" />
      <v-card-text class="pa-0">
        <iframe :src="pdfUrl" width="100%" height="800px"></iframe>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- PDF 출력 영역 시작-->
  <div :class="isPdf ? 'd-none' : ''">
    <div id="printDiv" class="certificatePrintFrame-wrap">
      <div class="print-wrap page1">
        <header class="position-relative">
          <img src="../../../assets/images/d-join-logo.png" alt="" />
          <h1 class="position-absolute bottom-0 left-130 pb-4 color-white">가입증명서</h1>
        </header>
        <main>
          <dl class="d-flex flex-wrap w-70 ma-auto my-16 text-18">
            <dt class="my-1 w-20">피 보 험 자 :</dt>
            <dd class="my-1 w-80">{{ insuranceDTO.user_nm }} 회계사</dd>
            <dt class="my-1 w-20">증 권 번 호 :</dt>
            <dd class="my-1 w-80">{{ insuranceDTO.insurance_no }}</dd>
            <dt class="my-1 w-20">보 험 기 간 :</dt>
            <dd class="my-1 w-80">{{ insuranceDTO.insr_st_dt }}(00:01) ~ {{ insuranceDTO.insr_cncls_dt }}(00:01)</dd>
            <dt class="my-1 w-20">보상한도액 :</dt>
            <dd class="my-1 w-80">{{ insuranceDTO.insr_clm_lt_amt.getValueBySplit(1) }} / {{ insuranceDTO.insr_year_clm_lt_amt }} (1청구당/보상한도액)</dd>
          </dl>
          <h2 class="text-center my-16 py-8 text-34">회계사 배상책임보험<br />가입업체임을 증명함.</h2>
          <p class="w-80 ma-auto word-break-keep-all text-18">귀 사(하)는 「회계사배상책임보험」에 가입하였으므로 상기 보험종목 의 보상하는 손해로 인하여 타인에 대한 법률상배상책임이 발생한 경우 보험약관에 의거 당사가 이를 보상하여 드립니다.</p>
          <p class="w-70 ma-auto mt-8 word-break-keep-all text-16 color-gray">※ 보험기간이 종료되었거나 보험료 미납으로 인해 계약이 해지된 경우에는 보험자의 보상책임이 발생하지 않습니다.</p>
        </main>
        <footer class="">
          <p class="text-right mb-4 mr-4">
            발행일 :
            <span>{{ today }}</span>
          </p>
          <img src="../../../assets/images/d-join-bottom1.png" alt="" />
        </footer>
      </div>
      <div class="html2pdf__page-break"></div>
      <div class="print-wrap page2">
        <header class="position-relative">
          <img src="../../../assets/images/d-join-logo.png" alt="" />
          <h1 class="position-absolute text-center bottom-0 w-100 pb-3 color-white">회계사배상책임보험 가입조건 안내</h1>
        </header>
        <main>
          <h2 class="title-wrap">
            <p class="h5 circle">1</p>
            <p class="h6 title">계약자 / 피보험자 관련사항</p>
          </h2>
          <table class="table">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: auto" />
              <col style="width: 20%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th>계약자</th>
                <td>한국공인회계사감사반연합회</td>
                <th>사업자등록번호</th>
                <td>108-82-60521</td>
              </tr>
              <tr>
                <th>피보험자</th>
                <td>{{ insuranceDTO.user_nm }} 회계사</td>
                <th>등록번호</th>
                <td>{{ insuranceDTO.user_regno }}</td>
              </tr>
              <tr>
                <th>사무소 주소</th>
                <td colspan="3">{{ insuranceDTO.corp_addr }}&nbsp;{{ insuranceDTO.corp_addr_dtl }}</td>
              </tr>
            </tbody>
          </table>
          <h2 class="title-wrap">
            <p class="h5 circle">2</p>
            <p class="h6 title">보험가입 관련사항</p>
          </h2>
          <table class="table">
            <colgroup>
              <col style="width: 10%" />
              <col style="width: auto" />
              <col style="width: 33.333%" />
              <col style="width: 10%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th>보험종목</th>
                <td colspan="2" class="line-height-1-4">회계사배상책임보험<br />(Accountants' Professional Liability Insurance)</td>
                <th>증권번호</th>
                <td>{{ insuranceDTO.insurance_no }}</td>
              </tr>
              <tr>
                <th colspan="2">보험기간</th>
                <th>공동부담비율</th>
                <th colspan="2">소급담보일</th>
              </tr>
              <tr>
                <td colspan="2">{{ insuranceDTO.insr_st_dt }}(00:01) ~ {{ insuranceDTO.insr_cncls_dt }}(00:01)</td>
                <td>{{ insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(1) }}</td>
                <td colspan="2">{{ insuranceDTO.insr_retr_dt }}</td>
              </tr>
              <tr>
                <th colspan="2">보상한도 (1청구당 / 연간총)</th>
                <th>자기부담금(1청구당)</th>
                <th colspan="2">납입보험료</th>
              </tr>
              <tr>
                <td colspan="2">{{ insuranceDTO.insr_clm_lt_amt.getValueBySplit(1) }} / {{ insuranceDTO.insr_year_clm_lt_amt }}</td>
                <td>{{ insuranceDTO.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                <td colspan="2">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</td>
              </tr>
            </tbody>
          </table>
          <h2 class="title-wrap">
            <p class="h5 circle">3</p>
            <p class="h6 title">보험조건</p>
          </h2>
          <table class="table">
            <tr>
              <td class="text-left pl-8 py-2">
                <ol class="list-style-type-demical">
                  <li>Accountants Liability Insurance Policy (Claims-made Basis)<br />(공인회계사 전문직업 배상책임보험 보통약관 - 배상청구기준)</li>
                  <li>Punitive Damage Exclusion Clause (징벌적손해 부담보 특별약관)</li>
                  <li>Contractual Liability Exclusion Clause (계약상가중책임 부담보 조항)</li>
                  <li>Consequential Loss Exclusion Clause (결과적 손해 부담보 조항)</li>
                  <li>Policy Territory & Jurisdiction : Korea Only (담보지역 및 재판관할권 : 대한민국)</li>
                  <li>Extended Reporting Period : 60 days (보고연장기간 : 60일)</li>
                  <li>All Costs & Expenses are included within the L.O.L. (모든 비용은 보상한도액 내 포함)</li>
                  <li>War and Civil War Exclusion Clause (전쟁 및 내란 부담보 조항)</li>
                  <li>Nuclear Energy Liability Exclusion Clause (원자력관련 배상책임 부담보 조항)</li>
                  <li>Sanction Limitation and Exclusion Clause (제재위반 부담보 조항)</li>
                  <li>Special provisions on the settlement of premium (보험료 정산에 있어 특별 조건 적용)</li>
                  <li>모든 종류의 투자 관련 행위(판매, 추천, 조언, 권유, 견해 등)로 인하여 발생되는 손해 부담보</li>
                  <li>Millennium Exclusion Clause (날짜인식 오류 부담보 조항)</li>
                  <li>Claim Co-operation Clause (재보험자의 손해사정 협조조항)</li>
                  <li>No coverage on a possible claim or claims directly or indirectly connected with Korea Deposit <br />Insurance Corporation (한국예금보험공사와 직/간접적으로 연관된 클레임 부담보)</li>
                  <li>약관의 어떠한 조항에도 불구하고, 피보험자 혹은 피보험자의 직원에 의해 행해진 부정, 고의, 악의, 범죄, <br />불법적인 행위로 인하여 야기된 클레임 부담보</li>
                  <li>Co-Insurance Clause (피보험자 사고공동부담비율)</li>
                  <li>피보험자의 입장에서 의도되었거나, 예측 가능하였던 사고는 담보하지 않음.</li>
                  <li>회계사로서의 업무영역 이외의 활동으로 인한 손해 부담보</li>
                  <li>Communicable Disease Exclusion Clause (LMA5399) (전염병 면책 조항)</li>
                </ol>
              </td>
            </tr>
          </table>
        </main>
        <footer>
          <div class="mt-2 text-12 line-height-1-4 text-center color-gray">※ 상품 및 보상관련 문의 : 록톤컴퍼니즈코리아손해보험중개㈜ 02) 2011-0300</div>
          <div class="mt-2 pa-2 text-center text-12 bg-d-join color-white line-height-1-0"></div>
        </footer>
      </div>
    </div>
  </div>
  <!-- PDF 출력 종료 시작-->
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { InsuranceDTO } from '@/model';

import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import apiContract from '@/api/api/A_CONTRACT';
import html2pdf from 'html2pdf.js';
import dayjs from 'dayjs';

import '../../../assets/css/printpdf.css';

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);
const isAdmin = _AUTH_ADMIN.value === null ? false: true;

const props = defineProps({
  insurance_uuid: {
    type: String,
    required: false
  },

  insurance_dto: {
    type: InsuranceDTO,
    required: false
  },

  isPdf: {
    type: Boolean,
    required: false
  }
});

const today = dayjs().format('YYYY-MM-DD');

const pdfUrl = ref(null);
const isOpenDialog = ref(true);

const emit = defineEmits(['close']);

const close = () => {
  isOpenDialog.value = false;
  emit('close');
};

const isPdf = ref(false);
const insuranceDTO = ref(new InsuranceDTO(props.insurance_dto));

const onExportPDF = (viewType: string) => {
  let pdfPassword = insuranceDTO.value.user_birth;

  let opt = {
    margin: [0, 9, 0, 9],
    filename: '가입증명서_회계사배상책임보험.pdf',
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy']
    },
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      useCORS: true,
      scrollY: 0,
      scale: 2,
      dpi: 300,
      letterRendering: true,
      allowTaint: false
    },
    jsPDF: {
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    }
  };

  if (!isAdmin) {
    opt.jsPDF.encryption = {
      userPassword: pdfPassword,
      ownerPassword: pdfPassword,
      userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
      encryptionAlgorithm: 'aes',
      keyLength: 128
    };
  }

  const printDiv = document.getElementById('printDiv');

  if (viewType == 'down') {
    html2pdf().set(opt).from(printDiv).save();
  } else {
    html2pdf()
      .set(opt)
      .from(printDiv)
      .toPdf()
      .get('pdf')
      .then(pdfObj => {
        pdfUrl.value = URL.createObjectURL(pdfObj.output('blob'));
        isOpenDialog.value = true;
      });
  }
};

onMounted(async () => {
  isPdf.value = props.isPdf;
  if (props.insurance_uuid) {
    const params = { insurance_uuid: props.insurance_uuid };
    const resultData = await apiContract.getDBSel(params, isAdmin);
    Object.assign(insuranceDTO.value, resultData.data[0]);
  } else {
  }

  if (isPdf.value) {
    onExportPDF('view');
  }
});
</script>
