<template>
  <v-dialog persistent v-model="isOpenDialog" :width="isPdf ? '1000px' : '800px'" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between certificate-font">
        <div class="text-h6 font-weight-medium">
          보험가입증명서
          <span class="text-20 text-red ml-2" v-if="insuranceDTO.user_cd === 'IND' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 생년월일(6자리) 입니다.</span>
          <span class="text-20 text-red ml-2" v-if="insuranceDTO.user_cd === 'JNT' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 사업자번호 뒤 5자리 입니다.</span>
        </div>
        <div class="d-flex justify-space-between align-end">
          <v-btn v-if="isPdf" variant="flat" color="dark" @click="onExportPDF('down')">저장</v-btn>&nbsp;
          <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>
        </div>
      </v-card-title>

      <v-divider class="mb-0" />
      <v-card-text class="pa-0">
        <!-- PDF 출력 영역 시작-->
        <div :class="isPdf ? 'd-none' : ''">
          <div id="printDiv" class="newCertificatePrintFrame-wrap">
            <!--가입조건안내-->
            <div class="certificate-font">
              <div class="print-wrap page1">
                <header class="position-relative">
                  <img src="../../../assets/images/new-db-join-logo.png" alt="" />
                  <h1 class="position-absolute bottom-0 left-header pb-8 color-white">보험가입증명서</h1>
                </header>
                <main>
                  <dl class="d-flex flex-wrap w-70 ma-auto my-16 text-18">
                    <dt class="my-1 w-20" >피 보 험 자 :</dt>
                    <dd class="my-1 w-80" v-if="insuranceDTO.user_cd === 'JNT' && insuranceDTO.cbr_data.length > 0">{{ insuranceDTO.cbr_data[0].cbr_nm }} 법무사 외 {{ insuranceDTO.cbr_cnt - 1 }} 명</dd>
                    <dd class="my-1 w-80" v-if="insuranceDTO.user_cd === 'IND'">{{ insuranceDTO.user_nm }} </dd>
                    <dt class="my-1 w-20">증 권 번 호 :</dt>
                    <dd class="my-1 w-80">{{ insuranceDTO.insurance_no }}</dd>
                    <dt class="my-1 w-20">보 험 기 간 :</dt>
                    <dd class="my-1 w-80">{{ insuranceDTO.insr_st_dt }}(00:01) ~ {{ insuranceDTO.insr_cncls_dt }}(00:01)</dd>
                    <dt class="my-1 w-20">보상한도액 :</dt>
                    <dd class="my-1 w-80">{{ insuranceDTO.insr_clm_lt_amt }} / {{ insuranceDTO.insr_year_clm_lt_amt }} (1청구당/연간총보상한도)</dd>
                  </dl>
                  <h2 class="text-center mt-10 pt-4 text-34">법무사 배상책임보험<br />가입업체임을 증명함.</h2>
                  <p class="w-80 mt-10 pt-4 ma-auto word-break-keep-all text-18">귀 사(하)는 「법무사배상책임보험」에 가입하였으므로 상기 보험종목의 보상하는 손해로 인하여 타인에 대한 법률상배상책임이 발생한 경우 보험약관에 의거 당사가 이를 보상하여 드립니다.</p>
                  <p class="w-70 ma-auto mt-8 word-break-keep-all text-16 color-gray">※ 보험기간이 종료되었거나 보험료 미납으로 인해 계약이 해지된 경우에는 보험자의 보상책임이 발생하지 않습니다.</p>
                </main>
                <footer class="d-flex flex-column align-end mb-16 pb-8">
                  <p class="mr-10" >
                    발행일 :
                    <span>{{ today }}</span>
                  </p>
                  <img src="../../../assets/images/new-db-join-bottom1.png" alt="" />
                </footer>
              </div>
              <div class="html2pdf__page-break"></div>
              <div class="print-wrap page2">
                <header class="position-relative">
                  <img src="../../../assets/images/new-db-join-logo2.png" alt="" />
                </header>
                <main>
                  <h2 class="title-wrap d-flex align-center ml-0 pl-0">
                    <img src="../../../assets/images/new-db-circle.png" alt="" style="width: 10px;height: 20px"/>
                    <p class="h6 title">계약자 / 피보험자 관련사항</p>
                  </h2>
                  <table class="table">
                    <colgroup>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000; border-top: 1px solid #00B050;">계약자</th>
                      <td colspan="10" style="border-right: 1px solid #000; border-top: 1px solid #00B050;">대한법무사협회</td>
                      <th colspan="5" style="border-right: 1px solid #000; border-top: 1px solid #00B050;">사업자등록번호</th>
                      <td colspan="10" style="border-top: 1px solid #00B050;">214-82-01695</td>
                    </tr>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000;">피보험자</th>
                      <td colspan="25" v-if="insuranceDTO.user_cd === 'JNT' && insuranceDTO.cbr_data.length > 0">{{ insuranceDTO.cbr_data[0].cbr_nm }} 법무사 외 {{ insuranceDTO.cbr_cnt - 1 }} 명 </td>
                      <td colspan="10" v-if="insuranceDTO.user_cd === 'IND'" style="border-right: 1px solid #000;">{{ insuranceDTO.user_nm }} </td>
                      <th colspan="5" v-if="insuranceDTO.user_cd === 'IND'" style="border-right: 1px solid #000;">등록번호</th>
                      <td colspan="10" v-if="insuranceDTO.user_cd === 'IND'">{{ insuranceDTO.user_regno }}</td>
                    </tr>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000;">사무소 주소</th>
                      <td colspan="25">{{ insuranceDTO.corp_addr }}<span v-if="insuranceDTO.corp_addr_dtl !== null">,&nbsp;{{ insuranceDTO.corp_addr_dtl }}</span></td>
                    </tr>
                    </tbody>
                  </table>
                  <h2 class="title-wrap d-flex align-center ml-0 pl-0">
                    <img src="../../../assets/images/new-db-circle.png" alt="" style="width: 10px;height: 20px"/>
                    <p class="h6 title">보험가입 관련사항</p>
                  </h2>
                  <table class="table" v-if="insuranceDTO.spct_join_yn === 'Y'">
                    <colgroup>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000; border-top: 1px solid #00B050;">보험종목</th>
                      <td colspan="25" class="line-height-1-4" style="border-top: 1px solid #00B050;">법무사배상책임보험(Miscellaneous Professional Liability Insurance Policy)</td>
                    </tr>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000;">증권번호</th>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insurance_no }}</td>
                      <th colspan="5" style="border-right: 1px solid #000;">보험기간</th>
                      <td colspan="10">{{ insuranceDTO.insr_st_dt }} ~ {{ insuranceDTO.insr_cncls_dt }}</td>
                    </tr>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000;">직전년도 매출액</th>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insr_take_sec.getValueBySplit(1) }}</td>
                      <th colspan="5" style="border-right: 1px solid #000;">소급담보일</th>
                      <td v-if="insuranceDTO.user_cd === 'IND'" colspan="10">{{ insuranceDTO.insr_retr_dt }} </td>
                      <td v-if="insuranceDTO.user_cd === 'JNT'" colspan="10"> 개별 기재 </td>
                    </tr>
                    <tr>
                      <th colspan="10" style="border-right: 1px solid #000;">보상한도 (1청구당 / 연간총)</th>
                      <th colspan="10" style="border-right: 1px solid #000;">자기부담금(1청구당)</th>
                      <th colspan="10" >납입보험료</th>
                    </tr>
                    <tr>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insr_clm_lt_amt }} / {{ insuranceDTO.insr_year_clm_lt_amt }}</td>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                      <td colspan="10">{{ Number(insuranceDTO.insr_amt).toLocaleString() }}원</td>
                    </tr>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000;">특별약관</th>
                      <td colspan="10" class="line-height-1-4" style="border-right: 1px solid #000; font-size: 10px">사무원의 부정직(또는 사기행위) 확장 조항 </td>
                      <th colspan="5" style="border-right: 1px solid #000;">소급담보일</th>
                      <td colspan="10" >{{ insuranceDTO.spct_data.insr_retr_dt }} </td>
                    </tr>
                    <tr>
                      <th colspan="10" style="border-right: 1px solid #000;">보상한도 (1청구당 / 연간총)</th>
                      <th colspan="10" style="border-right: 1px solid #000;">자기부담금(1청구당)</th>
                      <th colspan="10">납입보험료</th>
                    </tr>
                    <tr>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.spct_data.insr_clm_lt_amt.getValueBySplit(1) }} / {{ insuranceDTO.spct_data.insr_year_clm_lt_amt }}</td>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.spct_data.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                      <td colspan="10">{{ Number(insuranceDTO.spct_data.insr_amt).toLocaleString() }}원</td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="table w-50 ml-auto" v-if="insuranceDTO.spct_join_yn === 'Y'">
                    <tr>
                      <th colspan="5" style="border: 2px solid #00B050; border-right: 1px solid #000; ">총 납입보험료</th>
                      <td colspan="10" style="border: 2px solid #00B050; border-left: 1px solid transparent; ">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }} 원</td>
                    </tr>
                  </table>
                  <table class="table" v-if="insuranceDTO.spct_join_yn !== 'Y'">
                    <colgroup>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000; border-top: 1px solid #00B050;">보험종목</th>
                      <td colspan="25" class="line-height-1-4" style="border-top: 1px solid #00B050;">법무사배상책임보험(Miscellaneous Professional Liability Insurance Policy)</td>
                    </tr>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000;">증권번호</th>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insurance_no }}</td>
                      <th colspan="5" style="border-right: 1px solid #000;">보험기간</th>
                      <td colspan="10">{{ insuranceDTO.insr_st_dt }} ~ {{ insuranceDTO.insr_cncls_dt }}</td>

                    </tr>
                    <tr>
                      <th colspan="5" style="border-right: 1px solid #000;">직전년도 매출액</th>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insr_take_sec.getValueBySplit(1) }}</td>
                      <th colspan="5" style="border-right: 1px solid #000;">소급담보일</th>
                      <td v-if="insuranceDTO.user_cd === 'JNT'" colspan="10">피보험자명단 별첨</td>
                      <td v-if="insuranceDTO.user_cd === 'IND'" colspan="10">{{ insuranceDTO.insr_retr_dt }} </td>
                    </tr>
                    <tr>
                      <th colspan="10" style="border-right: 1px solid #000;">보상한도 (1청구당 / 연간총)</th>
                      <th colspan="10" style="border-right: 1px solid #000;">자기부담금(1청구당)</th>
                      <th colspan="10">납입보험료</th>
                    </tr>
                    <tr>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insr_clm_lt_amt }} / {{ insuranceDTO.insr_year_clm_lt_amt }}</td>
                      <td colspan="10" style="border-right: 1px solid #000;">{{ insuranceDTO.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                      <td colspan="10" >{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</td>
                    </tr>
                    </tbody>
                  </table>
                  <h2 class="title-wrap d-flex align-center ml-0 pl-0">
                    <img src="../../../assets/images/new-db-circle.png" alt="" style="width: 10px;height: 20px"/>
                    <p class="h6 title" >보험조건</p>
                  </h2>
                  <table class="table" style="border-top: 1px solid #00B050; ">
                    <tr>
                      <td class="text-left pl-8 py-2">
                        <ol class="list-style-type-demical">
                          <li> Miscellaneous Professional Liability Insurance Policy (Claims-made Basis)<br/>(전문직업인 배상책임보험 보통약관 - 배상청구기준) </li>
                          <li> Punitive Damage Exclusion Clause (징벌적 손해 부담보 특별약관) </li>
                          <li> Contractual Liability Exclusion Excluded (계약상가중책임 부담보 조항) </li>
                          <li> Consequential Loss Exclusion Excluded (결과적 손해 부담보 조항) </li>
                          <li> Policy Territory & Jurisdiction : Korea Only (담보지역 및 재판관할권 : 대한민국) </li>
                          <li> Extended Reporting Period : 70 days (보고연장기간 : 70일) </li>
                          <li> All Costs & Expenses are included within the L.O.L. (모든 비용은 보상한도액 내 포함) </li>
                          <li> War and Civil War Exclusion Clause (전쟁 및 내란 부담보 조항) </li>
                          <li> Nuclear Energy Liability Exclusion Clause (원자력관련 배상책임 부담보 조항) </li>
                          <li> Sanction Limitation and Exclusion Clause (제재위반 부담보 조항) </li>
                          <li> Millennium Exclusion Clause (날짜인식 오류 부담보 조항) </li>
                          <li> Claims Co-operation Clause (사고처리 협조조항) </li>
                          <li> Dishonesty Extension (Professional Indemnity) : Optional<br/>(사무원의 횡령 등 부정행위담보 특별약관 : 선택 담보) </li>
                          <li> Annual Turnover : Individual annual income (직전년도 매출액 기준)<br/>단, 보험계약시 연간예상매출액이 확정되었을 경우 동 예상매출액을 기준으로 함. </li>
                          <li> Asbestos Excluded (석면위험 부담보)</li>
                          <li> Communicable Disease Exclusion (LMA 5399)</li>
                        </ol>
                      </td>
                    </tr>
                  </table>
                  <div class="mt-10 text-12 line-height-1-4 text-left d-flex justify-end">
                    <p>※ 상품 및 보상관련 문의 <br/>
                      록톤컴퍼니즈코리아손해보험중개㈜ 02) 2011-0300</p>
                  </div>
                </main>
              </div>
              <div class="html2pdf__page-break"></div>

              <template v-for="(chunk, chunkIndex) in chunkedData" :key="chunkIndex">
                <div class="print-wrap page3">
                  <header class="position-relative">
                    <img src="../../../assets/images/new-db-join-logo2.png" alt="" />
                    <h1 class="position-absolute text-center bottom-0 w-100 pb-3 color-white"></h1>
                  </header>
                  <main>
                    <h2 class="title-wrap d-flex align-center ml-0 pl-0">
                      <img src="../../../assets/images/new-db-circle.png" alt="" style="width: 10px;height: 20px"/>
                      <span class="h6 title">피보험자명단</span>
                    </h2>
                    <table class="table mt-3" style="font-size: 15px">
                      <thead>
                        <tr>
                          <th style="border-top: 1px solid #00B050; border-right: 1px solid #000;">성명</th>
                          <th style="border-top: 1px solid #00B050; border-right: 1px solid #000;">등록번호</th>
                          <th style="border-top: 1px solid #00B050; padding-right: 10px;">소급담보일</th>
                          <td style="border-bottom: 1px solid #ffffff; width: 5px"></td>
                          <th style="border-top: 1px solid #00B050; border-right: 1px solid #000;">성명</th>
                          <th style="border-top: 1px solid #00B050; border-right: 1px solid #000;">등록번호</th>
                          <th style="border-top: 1px solid #00B050;">소급담보일</th>
                        </tr>
                      </thead>

                      <tbody v-if="chunk.length">
                        <template v-for="(row, index) in chunk">
                          <tr v-if="index % 2 === 0" >
                            <td style="border-right: 1px solid #000;">{{ row.cbr_nm }}</td>
                            <td style="border-right: 1px solid #000;">{{ row.cbr_regno }}</td>
                            <td>{{ row.insr_retr_dt }}</td>
                            <td style="border-bottom: 1px solid #ffffff; width: 5px"></td>
                            <td style="border-right: 1px solid #000;" v-if="chunk[index + 1]">{{ chunk[index + 1].cbr_nm }}</td>
                            <td style="border-right: 1px solid #000;" v-else></td>
                            <td style="border-right: 1px solid #000;" v-if="chunk[index + 1]">{{ chunk[index + 1].cbr_regno }}</td>
                            <td style="border-right: 1px solid #000;" v-else></td>
                            <td v-if="chunk[index + 1]">{{ chunk[index + 1].insr_retr_dt }}</td>
                            <td v-else></td>
                          </tr>
                        </template>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="6">명단 없음</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="mt-10 text-12 line-height-1-4 text-left d-flex justify-end">
                      <p>※ 상품 및 보상관련 문의 <br/>
                      록톤컴퍼니즈코리아손해보험중개㈜ 02) 2011-0300</p>
                    </div>
                  </main>
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

import apiLAW0030a from '@/api/api/A_TLAW0030A';
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
  } else if (insuranceDTO.value.user_cd === 'JNT') {
    pdfPassword = insuranceDTO.value.corp_cnno.slice(-5);
  }

  let opt = {
    margin: [0, 9, 0, 9],
    filename: '가입증명서_법무사배상책임보험.pdf',
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
    const resultData = await apiLAW0030a.getDBSel(params, isAdmin);
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

<style>
.certificate-font {
  font-family: "NanumSquare", sans-serif;
}
</style>