<template>
  <v-dialog persistent v-model="isOpenDialog" :width="isPdf ? '1000px' : '800px'" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-medium line-height-1-0">
          보험가입증명서
          <br v-if="checkMobile.isMobile"/>
          <span :class="checkMobile.isMobile?'text-10 text-red ml-1':'text-20 text-red ml-2'" v-if="insuranceDTO.user_cd === 'IND' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 생년월일(6자리) 입니다.</span>
          <span :class="checkMobile.isMobile?'text-10 text-red ml-1':'text-20 text-red ml-2'" v-if="insuranceDTO.user_cd !== 'IND' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 사업자번호 뒤 5자리 입니다.</span>
        </div>
        <div class="d-flex justify-space-between align-end">
          <v-btn :size="checkMobile.isMobile?'x-small':'default'" v-if="isPdf" variant="flat" color="dark" @click="onExportPDF('down')">저장</v-btn>&nbsp;
          <v-btn :size="checkMobile.isMobile?'x-small':'default'" variant="outlined" color="dark" @click="close()">닫기</v-btn>
        </div>
      </v-card-title>

      <v-divider class="mb-0" />
      <v-card-text v-if="!(checkMobile.isMobile&&isPdf)"  class="pa-0">
        <!-- PDF 출력 영역 시작-->
        <div :class="isPdf ? 'd-none' : ''">
          <div id="printDiv" class="certificatePrintFrame-wrap">
            <!--가입조건안내-->
            <div>
              <div class="print-wrap page1">
                <header class="position-relative">
                  <img src="../../../assets/images/img-logo-heungkuk1.png" class="w-100 pl-0" alt="" />
                  <h1 class="position-absolute text-center top-2 w-100 mt-3 text-h4 ">보험가입증서</h1>
                </header>
                <main>
                  <p class="text-15 ml-2">아래 피보험자는 흥국화재에서 제공하는 전문직업인배상책임보험에 가입되었음을 확인합니다.</p>
                  <table class="table mt-4" >
                    <colgroup>
                      <col style="width: 20%" />
                      <col style="width: auto" />
                      <col style="width: 20%" />
                      <col style="width: auto" />
                    </colgroup>
                    <tbody>
                    <tr >
                      <th class="bg-white border-gray-1">보험종목</th>
                      <td colspan="3" class="bg-white border-gray-1">전문인 배상책임보험 (Professional Indemnity Insurance)</td>
                    </tr>
                    <tr>
                      <th class="bg-white border-gray-1">증권번호</th>
                      <td colspan="3" class="bg-white border-gray-1">{{ insuranceDTO.insurance_no }}</td>
                    </tr>
                    <tr>
                      <th class="bg-white border-gray-1">계약자</th>
                      <td class="bg-white border-gray-1">대한변리사회</td>
                      <th class="bg-white border-gray-1">사업자등록번호</th>
                      <td class="bg-white border-gray-1">220-82-00819</td>
                    </tr>
                    <tr>
                      <th class="bg-white border-gray-1">담보위험</th>
                      <td colspan="3" class="bg-white border-gray-1">피보험자가 변리사와 관련된 전문적인 업무를 수행함에 있어서 부주의,과실 또는 부작위로 인해 제3자에게 부담하는 법률상 배상책임</td>
                    </tr>
                    </tbody>
                  </table>
                  <h2 class="title-wrap pl-0">
                    <p class="h6 color-white pl-2" style="background: #E4007B;">피보험자 보험 가입사항</p>
                  </h2>

                  <table class="table">
                    <colgroup>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th colspan="2" class="bg-white border-gray-1">보험기간</th>
                      <td colspan="5" class="bg-white border-gray-1">{{ insuranceDTO.insr_st_dt }} ~ {{ insuranceDTO.insr_cncls_dt }}</td>
                      <th colspan="2" class="bg-white border-gray-1">소급담보일</th>
                      <td v-if="insuranceDTO.user_cd === 'JNT'" colspan="2" class="bg-white border-gray-1">피보험자명단 별첨</td>
                      <td v-if="insuranceDTO.user_cd !== 'JNT'" colspan="2" class="bg-white border-gray-1">{{ insuranceDTO.insr_retr_dt }} </td>
                    </tr>
                    <tr>
                      <th colspan="2" class="bg-white border-gray-1">피보험자</th>
                      <td class="bg-white border-gray-1" colspan="3" v-if="insuranceDTO.user_cd === 'JNT' && insuranceDTO.cbr_data.length > 0">{{ insuranceDTO.cbr_data[0].cbr_nm }} 변리사 외 {{ insuranceDTO.cbr_cnt - 1 }} 명 </td>
                      <td class="bg-white border-gray-1" colspan="3" v-if="insuranceDTO.user_cd !== 'JNT'"> {{ insuranceDTO.user_nm }}</td>
                      <th colspan="2" class="bg-white border-gray-1">사업자번호</th>
                      <td colspan="4" class="bg-white border-gray-1"> {{ insuranceDTO.corp_cnno }}</td>
                    </tr>
                    <tr>
                      <th colspan="2" class="bg-white border-gray-1">주소</th>
                      <td colspan="9" class="bg-white border-gray-1"> {{ insuranceDTO.corp_addr }}<span v-if="insuranceDTO.corp_addr_dtl !== null">,&nbsp;{{ insuranceDTO.corp_addr_dtl }}</span> </td>
                    </tr>
                    <tr>
                      <th colspan="5" class="bg-white border-gray-1"> 1청구당/연간총 보상한도액</th>
                      <th colspan="2" class="bg-white border-gray-1"> 자기부담금(1청구당)</th>
                      <th colspan="4" class="bg-white border-gray-1"> 납입보험료 </th>
                    </tr>
                    <tr>
                      <td colspan="5" class="bg-white border-gray-1"> {{ insuranceDTO.insr_clm_lt_amt }} / {{insuranceDTO.insr_year_clm_lt_amt}}</td>
                      <td colspan="2" class="bg-white border-gray-1">{{insuranceDTO.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                      <td colspan="4" class="bg-white border-gray-1"> {{ Number(insuranceDTO.insr_amt).toLocaleString() }} 원</td>
                    </tr>
                    </tbody>
                  </table>
                  <h2 class="title-wrap pl-0">
                    <p class="h6 color-white pl-2" style="background: #E4007B;">주요 보험 조건</p>
                  </h2>
                  <table class="table2 border-0 mt-0">
                    <tr>
                      <td class="text-left pl-8 border-0">
                        <ol class="list-style-type-demical">
                          <li> Professional Indemnity Insurance Policy (Claims-made Basis) <br/>(전문직업인 배상책임보험 보통약관 : 배상청구기준 증권)</li>
                          <li> Punitive Damage Exclusion Clause (징벌적손해 부담보 특별약관)</li>
                          <li> Nuclear Energy Liability Exclusion (원자력배상 부담보)</li>
                          <li> All Costs & Expenses are included within the Limit of Liability (모든 비용은 보상한도액내 포함)</li>
                          <li> Contractual Liability Excluded  (계약상의 가중책임 부담보)</li>
                          <li> Consequential Loss Excluded  (결과적손해 부담보)</li>
                          <li> War & Terrorism Exclusion Clause (전쟁 및 테러 부담보 특별약관)</li>
                          <li> Millennium Exclusion Clause      (서기2천년 부담보 추가약관)</li>
                          <li> Extended Reporting Period : 60 days  (보고연장기간 : 60일)</li>
                          <li> Claims Co-operation Clause  (사고처리협조 조항)</li>
                          <li> Sanction Limitation and Exclusion Clause (제재 위반 & 부담보 특별약관)</li>
                          <li> Premium / Claim Payment Clause (환율적용 특별약관)</li>
                          <li> Policy Territory & Jurisdiction : Korea only (담보지역 및 재판관할권 : 대한민국)</li>
                          <li> Asbestos Excluded  (석면 부담보)</li>
                          <li>
                            Exclusion (면책사항) <br/>
                            - Fidelity guarantee & Dishonesty of employees, defamation or any form of blasphemy <br/>
                            (직원 부정행위 및 명예훼손 면책) <br/>
                            - Loss of document (문서 분실 손해) <br/>
                            - Pending claims, losses or losses resulting from occurrences already known to the Insured or the company<br/>
                            (계류중인 사고, 손해 또는 피보험자나 회사에 이미 알려진 사고로부터의 손해)
                          </li>
                          <li>
                            기술정보유출 배상책임 담보 특별약관
                          </li>
                        </ol>
                      </td>
                    </tr>
                  </table>
                  <div class="bottom d-flex justify-end">
                    <img src="../../../assets/images/img-logo-heungkuk2.png" alt=""/>
                  </div>
                </main>
                <footer>
                  <p class="text-caption mt-2">※본 증명서는 보험가입내역에 대한 요약이며, 보험 증권 상 일부 조건은 본 증명서에 명기되어 있지 않습니다.</p>
                  <p class="text-caption mb-2">※ 보험의 담보 내용에 따라 보상 내용은 달라질 수 있는 바, 구체적인 보상 내용은 보험종목에 적용되는 약관의 관련규정에 따라 정해집니다.</p>
                </footer>
              </div>
              <template v-for="(chunk, chunkIndex) in chunkedData" :key="chunkIndex">
                <div class="print-wrap page2">
                  <header class="position-relative">
                    <img src="../../../assets/images/img-logo-heungkuk1.png" class="w-100 pl-0" alt="" />
                    <h1 class="position-absolute text-center top-2 w-100 mt-3 text-h4 ">보험가입증서</h1>
                  </header>
                  <main>
                    <h2 class="title-wrap pl-0">
                      <p class="h6 color-white pl-2" style="background: #E4007B;">피보험자 명단</p>
                    </h2>
                    <table class="table mt-3" style="font-size: 15px">
                      <thead>
                      <tr>
                        <th class="bg-white border-gray-1">성명</th>
                        <th class="bg-white border-gray-1">등록번호</th>
                        <th class="bg-white border-gray-1">소급담보일</th>
                        <th class="bg-white border-gray-1">성명</th>
                        <th class="bg-white border-gray-1">등록번호</th>
                        <th class="bg-white border-gray-1">소급담보일</th>
                      </tr>
                      </thead>

                      <tbody v-if="chunk.length">
                      <template v-for="(row, index) in chunk">
                        <tr v-if="index % 2 === 0" >
                          <td class="bg-white border-gray-1">{{ row.cbr_nm }}</td>
                          <td class="bg-white border-gray-1">{{ row.cbr_regno }}</td>
                          <td class="bg-white border-gray-1">{{ row.insr_retr_dt }}</td>
                          <td class="bg-white border-gray-1" v-if="chunk[index + 1]">{{ chunk[index + 1].cbr_nm }}</td>
                          <td class="bg-white border-gray-1" v-else></td>
                          <td class="bg-white border-gray-1" v-if="chunk[index + 1]">{{ chunk[index + 1].cbr_regno }}</td>
                          <td class="bg-white border-gray-1" v-else></td>
                          <td class="bg-white border-gray-1" v-if="chunk[index + 1]">{{ chunk[index + 1].insr_retr_dt }}</td>
                          <td class="bg-white border-gray-1" v-else></td>
                        </tr>
                      </template>
                      </tbody>
                      <tbody class="bg-white border-gray-1" v-else>
                      <tr>
                        <td colspan="6">명단 없음</td>
                      </tr>
                      </tbody>
                    </table>
                  </main>
                  <footer>
                    <p class="text-caption mt-2">※본 증명서는 보험가입내역에 대한 요약이며, 보험 증권 상 일부 조건은 본 증명서에 명기되어 있지 않습니다.</p>
                    <p class="text-caption mb-2">※ 보험의 담보 내용에 따라 보상 내용은 달라질 수 있는 바, 구체적인 보상 내용은 보험종목에 적용되는 약관의 관련규정에 따라 정해집니다.</p>
                  </footer>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- PDF 출력 영역 종료-->

        <div v-if="isPdf">
          <iframe :src="pdfUrl" width="100%" height="800px"></iframe>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { InsuranceDTO } from '@/model';

import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import apiPAT0030a  from '@/api/api/A_TPAT0030A';
import html2pdf from 'html2pdf.js';
import dayjs from 'dayjs';

import '../../../assets/css/printpdf.css';

import {useMobileStore} from "@/stores";
const checkMobile = useMobileStore();

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

const chunkSize = 40;

const chunkedData = computed(() => {
  const data = insuranceDTO.value.cbr_data;
  const filteredData = data.filter(item => item.status_cd === '80');
  const chunks = [];
  for (let i = 0; i < filteredData.length; i += chunkSize) {
    chunks.push(filteredData.slice(i, i + chunkSize));
  }
  return chunks;
});

const onExportPDF = (viewType: string) => {
  let pdfPassword = '';

  if (insuranceDTO.value.user_cd === 'IND') {
    pdfPassword = insuranceDTO.value.user_birth;
  } else if (insuranceDTO.value.user_cd !== 'IND') {
    pdfPassword = insuranceDTO.value.corp_cnno.slice(-5);
  }

  let opt = {
    margin: [0, 9, 0, 9],
    filename: '가입증명서_변리사배상책임보험.pdf',
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
    const resultData = await apiPAT0030a.getDBSel(params, isAdmin);
    //insuranceDTO.value = resultData.data[0];
    Object.assign(insuranceDTO.value, resultData.data[0]);
    // console.log(insuranceDTO.value);
  } else {
  }
  if (isPdf.value) {
    onExportPDF('view');
  }
});
</script>
