<template>
  <v-dialog persistent v-model="isOpenDialog" :width="isPdf ? '1000px' : '800px'" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
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
          <div id="printDiv" class="certificatePrintFrame-wrap">
            <!--가입증명서-->
            <div>
              <div class="print-wrap page1">
                <header>
                  <img src="../../../assets/images/db-join-logo.png" class="w-100" alt="" />
                </header>
                <main>
                  <table class="table_db w-100">
                    <colgroup>
                      <col style="width: 30%" />
                      <col style="width: auto" />
                    </colgroup>
                    <tbody>
                    <tr>
                      <th>피 보 험 자 :</th>
                      <td>
                        <p style="font-weight: bold; display: inline; margin-right: 60px">{{ insuranceDTO.user_nm }}</p>             변호사
                      </td>
                    </tr>
                    <tr>
                      <th>증 권 번 호 :</th>
                      <td>{{ insuranceDTO.insurance_no }}</td>
                    </tr>
                    <tr>
                      <th>보 험 기 간 :</th>
                      <td>{{ insuranceDTO.insr_st_dt }}(00:01) ~ {{ insuranceDTO.insr_cncls_dt }}</td>
                    </tr>
                    <tr>
                      <th>보상한도액 :</th>
                      <td>
                        <p style="font-weight: bold; display: inline; margin-right: 30px">{{ insuranceDTO.insr_clm_lt_amt.getValueBySplit(1) }} / {{ insuranceDTO.insr_year_clm_lt_amt }} </p> (1청구당 / 총보상한도)
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <p class="text-34 mt-14 px-2 py-1 text-center">변호사 배상책임보험<br/>가입업체임을 증명함.</p>
                  <p class="text-21 mt-14 px-2 py-1 text-left">
                    &nbsp;&nbsp;&nbsp;귀사 (하)는 「변호사배상책임보험」 에 가입하였으므로 상기 보험종목의<br/>
                    보상하는 손해로 인하여 타인에 대한 법률상 배상책임이 발생한 경우<br/> 보험약관에 의거 당사가 이를 보상하여 드립니다.
                  </p>
                  <p class="text-15 line-height-1-4 mt-2 ml-16 mr-16">
                    ※ 보험기간이 종료되었거나 보험료 미납으로 인해 계약이 해지된 경우에는 보험자의<br/>보상책임이 발생하지 않습니다.
                  </p>

                  <p class="text-15 mt-10 text-right mr-14">발행일 : {{today}}</p>
                  <div class="w-100 d-flex justify-end mt-5">
                    <img src="../../../assets/images/db-join-bottom1.png" class="w-48" alt="" />
                  </div>
                </main>
                <footer>
                </footer>
              </div>
            </div>
            <div class="html2pdf__page-break"></div>
            <!--가입조건안내-->
            <div>
              <div class="print-wrap page1">
                <header>
                  <img src="../../../assets/images/db-join-logo2.png" class="w-100" alt="" />
                </header>
                <main>
                  <div class="position-relative" style="height: 30px">
                    <p class="text-16 px-1 py-1 bg-background d-flex text-left position-absolute w-100 ml-3 pl-10">계약자 / 피보험자 관련사항</p>
                    <img src="../../../assets/images/num1.png" class="position-absolute" style="height: 35px" alt="" />
                  </div>
                  <table class="normal-table2 w-100 mt-4" style="font-size: 15px">
                    <colgroup>
                      <col style="width: 16.6666%"/>
                      <col style="width: auto" />
                      <col style="width: 16.6666%"/>
                      <col style="width: auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>계약자</th>
                        <td>대한변호사협회</td>
                        <th>사업자등록번호</th>
                        <td>{{ insuranceDTO.corp_cnno }}</td>
                      </tr>
                      <tr>
                        <th>피보험자</th>
                        <td>{{  insuranceDTO.user_nm }} 변호사</td>
                        <th>등록번호</th>
                        <td>{{ insuranceDTO.user_regno }}</td>
                      </tr>
                      <tr>
                        <th>주소</th>
                        <td colspan="3">{{ insuranceDTO.corp_addr }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="position-relative" style="margin-top: 20px; height: 30px">
                    <p class="text-16 px-1 py-1 bg-background d-flex text-left position-absolute w-100 ml-3 pl-10">보험가입 관련사항</p>
                    <img src="../../../assets/images/num2.png" class="position-absolute" style="height: 35px" alt="" />
                  </div>
                  <table class="normal-table2 w-100 mt-4" style="font-size: 15px">
                    <colgroup>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th colspan="3">보험종목</th>
                      <td colspan="9">변호사배상책임보험 (Lawyers Professional Liability Insurance)</td>
                    </tr>
                    <tr>
                      <th colspan="1">증권번호</th>
                      <td colspan="2">{{ insuranceDTO.insurance_no }}</td>
                      <th colspan="2">보험기간</th>
                      <td colspan="3">{{ insuranceDTO.insr_st_dt }} ~ {{ insuranceDTO.insr_cncls_dt }}</td>
                      <th colspan="2">소급담보일</th>
                      <td colspan="2">{{ insuranceDTO.insr_retr_dt }}</td>
                    </tr>
                    <tr>
                      <th colspan="4">보상한도(1청구당/연간총)</th>
                      <th colspan="4">자기부담금 (1청구당)</th>
                      <th colspan="4">납입보험료</th>
                    </tr>
                    <tr>
                      <td colspan="4">{{ insuranceDTO.insr_clm_lt_amt.getValueBySplit(1) }} / {{ insuranceDTO.insr_year_clm_lt_amt }}</td>
                      <td colspan="4">{{ insuranceDTO.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                      <td colspan="4">{{ insuranceDTO.insr_tot_amt }} 원</td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="position-relative" style="margin-top: 20px; height: 30px">
                    <p class="text-16 px-1 py-1 bg-background d-flex text-left position-absolute w-100 ml-3 pl-10">보험조건</p>
                    <img src="../../../assets/images/num3.png" class="position-absolute" style="height: 35px" alt="" />
                  </div>
                  <table class="normal-table2 w-100 mt-4" style="font-size: 15px">
                    <colgroup>
                    </colgroup>
                    <tbody>
                    <tr>
                      <td class="text-left ml-3 py-1">
                        1) LawyersProfessional Liability Insurance Policy (Claims-made Basis)<br/>
                        (변호사전문직업배상책임보험 보통약관 - 배상청구기준)<br/>
                        2) Punitive Damage Exclusion Clause (징벌적 손해 부담보 특별약관)<br/>
                        3) Nuclear Energy Liability Exclusion Clause (원자력위험 부담보 특별약관)<br/>
                        4) All Costs & Expenses are included within the Limit of Liability (모든 비용은 보상한도액내 포함)<br/>
                        5) Contractual Liability Excluded (계약상의 가중책임 부담보)<br/>
                        6) Consequential Loss Excluded (결과적 손해 부담보)<br/>
                        7) Unless covered by the Dishonesty Extension, notwithstanding any provision of the Policy Wording including, but not limited to, the Provision of the “Innocent Insured”, any claims or loss arising out of any dishonest, any intentional, dishonest, malicious, criminal or illegal act by the Insured shall not be covered. (고용직원의 부정직 (또는 사기행위) 확장조항을 추가하지 않는 한, 보통약관의 담보조항에도 불구하고 (‘선의의 피보험자’조항 등) 본 증권은 피보험자 또는 피보험자의 종업원에 의한 고의, 부정직, 악의, 범죄, 불법행위에 기인한 배상책임은 담보되지 아니함)<br/>
                        8) War & Terrorism Exclusion Clause (전쟁 및 테러위험 부담보 특별약관)<br/>
                        9) Millennium Exclusion Clause (서기 2천년 부담보 추가약관)<br/>
                        10) Automatic Extended Reporting Period : 70 days (자동보고연장기간 : 70일)<br/>
                        11) Claims Co-operation Clause (손해사고처리협조 특별약관)<br/>
                        12)  Dishonesty Extension (Lawyer's Professional Liability) 고용직원의 부정직(또는 사기행위) 확장 조항 : 선택가입<br/>
                        13)  기타 보험조건은 영문약관 및 요율안내서에 따름<br/>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </main>
                <footer>
                  <p class="text-13 line-height-1-4 mt-2">※ 본 가입증명서는 상기 피보험자가 세무사전문직업인배상책임보험에 가입하였음을 증명하며,<br />기타 자세한 사항에 대해서는 한국세무사회와 현대해상이 약정한 보험계약에 준함을 확인합니다.</p>
                  <div class="mt-5">
                    <img src="../../../assets/images/h-join-bottom.png" alt="" />
                  </div>
                  <p class="text-13 color-gray">※ 사고발생시 모든 보상은 해당 계약의 보험가입조건과 약관내용에 따라 결정됩니다.</p>
                </footer>
              </div>
              <div class="html2pdf__page-break"></div>

              <template v-for="(chunk, chunkIndex) in chunkedData" :key="chunkIndex">
                <div class="print-wrap page2">
                  <header>
                    <img src="../../../assets/images/h-join-logo.png" alt="" />
                    <h1 class="text-26 font-weight-bold line-height-1-3 color-deep-navy text-center mt-2">보 험 가 입 증 명 서</h1>
                    <h2 class="text-16 font-weight-bold line-height-1-3 color-deep-navy text-center">INSURANCE CERTIFICATE</h2>
                  </header>
                  <main>
                    <h3 class="text-16 px-2 py-1 bg-amber color-deep-navy mt-6">1. 피보험자(변호사) 명단</h3>
                    <table class="table2 mt-1">
                      <thead>
                        <tr>
                          <th>성명</th>
                          <th>등록번호</th>
                          <th>소급일자</th>
                          <th>성명</th>
                          <th>등록번호</th>
                          <th>소급일자</th>
                        </tr>
                      </thead>

                      <tbody v-if="chunk.length">
                        <template v-for="(row, index) in chunk">
                          <tr v-if="index % 2 === 0">
                            <td>{{ row.cbr_nm }}</td>
                            <td>{{ row.cbr_regno }}</td>
                            <td>{{ row.insr_retr_dt }}</td>
                            <td v-if="chunk[index + 1]">{{ chunk[index + 1].cbr_nm }}</td>
                            <td v-else></td>
                            <td v-if="chunk[index + 1]">{{ chunk[index + 1].cbr_regno }}</td>
                            <td v-else></td>
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
                  </main>
                  <footer>
                    <p class="text-13 line-height-1-4 mt-2">※ 본 가입증명서는 상기 피보험자가 세무사전문직업인배상책임보험에 가입하였음을 증명하며,<br />기타 자세한 사항에 대해서는 한국세무사회와 현대해상이 약정한 보험계약에 준함을 확인합니다.</p>
                    <div class="mt-5">
                      <img src="../../../assets/images/h-join-bottom.png" alt="" />
                    </div>
                    <p class="text-13 color-gray">※ 사고발생시 모든 보상은 해당 계약의 보험가입조건과 약관내용에 따라 결정됩니다.</p>
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

import apiADV0030a from '@/api/api/A_TADV0030A';
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
  } else if (insuranceDTO.value.user_cd === 'COR') {
    pdfPassword = insuranceDTO.value.corp_cnno.slice(-5);
  }

  let opt = {
    margin: [0, 9, 0, 9],
    filename: '가입증명서_세무사배상책임보험.pdf',
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
    const resultData = await apiADV0030a.getDBSel(params, isAdmin);
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

<style scoped>
table_db {
  border-collapse: collapse;
  width: 100%;
  margin-top: 0px;
}

table_db, th, td {
  border: none;
  text-align: center;
  font-style: normal;
  font-size: 20px;
  font-weight: normal;
  white-space: nowrap;
  font-family: "NanumMyeongjo";
}

.normal-table2 {
  border-collapse: collapse;
  table-layout: fixed;
  border-spacing: 0;
  width: 100%;
}
.normal-table2 th {
  text-align: center;
  background-color: #fafafa;
  font-weight: normal;
  border:1px solid #000000;
  font-size: 14px;
}
.normal-table2 td {
  text-align: center;
  border:1px solid #000000;
  font-size: 14px;
}

</style>