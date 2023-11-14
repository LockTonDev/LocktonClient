<template>
  <v-dialog persistent v-model="isOpenDialog" :width="isPdf ? '1000px' : '800px'" hide-overlay scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-medium">
          보험가입증명서
          <span class="text-20 text-red ml-2" v-if="insuranceDTO.user_cd === 'IND' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 생년월일(6자리) 입니다.</span>
          <span class="text-20 text-red ml-2" v-if="insuranceDTO.user_cd === 'COR' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 사업자번호 뒤 5자리 입니다.</span>
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
            <!--개인-->
            <div v-if="insuranceDTO.user_cd === 'IND'">
              <div class="print-wrap page1">
                <header>
                  <img src="../../../assets/images/h-join-logo.png" alt="" />
                  <h1 class="text-26 font-weight-bold line-height-1-3 color-deep-navy text-center mt-2">보 험 가 입 증 명 서</h1>
                  <h2 class="text-16 font-weight-bold line-height-1-3 color-deep-navy text-center">INSURANCE CERTIFICATE</h2>
                </header>
                <main>
                  <p class="text-14 text-right">
                    발행일 : <span>{{ today }}</span>
                  </p>
                  <h3 class="text-16 px-2 py-1 bg-amber color-deep-navy">1. 계약일반사항</h3>
                  <table class="table2 mt-1">
                    <colgroup>
                      <col style="width: 16.6666%" />
                      <col style="auto" />
                      <col style="width: 16.6666%" />
                      <col style="auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>보험종목</th>
                        <td>전문인배상책임보험<br />(Professional Indemnity Insurance)</td>
                        <th>증권번호</th>
                        <td>{{ insuranceDTO.insurance_no }}</td>
                      </tr>
                      <tr>
                        <th>보험기간</th>
                        <td colspan="3">{{ insuranceDTO.base_insr_st_dt }}(00:01) ~ {{ insuranceDTO.base_insr_cncls_dt }}(00:01)</td>
                      </tr>
                      <tr>
                        <th>계약자</th>
                        <td>대한변호사협회</td>
                        <th>사업자번호</th>
                        <td>214-82-01415</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 class="text-16 mt-4 px-2 py-1 bg-amber color-deep-navy">2. 피보험자 보험 가입사항</h3>
                  <table class="table2 mt-1">
                    <colgroup>
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>피보험자</th>
                        <td colspan="2">{{ insuranceDTO.user_nm }}</td>
                        <th>등록번호</th>
                        <td colspan="2">{{ insuranceDTO.user_regno }}</td>
                      </tr>
                      <tr>
                        <th>사무소 주소</th>
                        <td colspan="5">{{ insuranceDTO.corp_addr }}&nbsp;{{ insuranceDTO.corp_addr_dtl }}</td>
                      </tr>
                      <tr>
                        <th colspan="2">사업자번호</th>
                        <th colspan="2">소급담보일</th>
                        <th colspan="2">공동보험</th>
                      </tr>
                      <tr>
                        <td colspan="2">{{ insuranceDTO.corp_cnno }}</td>
                        <td colspan="2">{{ insuranceDTO.insr_retr_dt }}</td>
                        <td colspan="2">{{ insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(0) == '0' ? '적용' : '미적용' }}</td>
                      </tr>
                      <tr>
                        <th colspan="2">보상한도액(1청구당/연간총)</th>
                        <th colspan="2">자기부담금(1청구당)</th>
                        <th colspan="2">납입보험료</th>
                      </tr>
                      <tr>
                        <td colspan="2">{{ insuranceDTO.insr_clm_lt_amt.getValueBySplit(1) }} / {{ insuranceDTO.insr_year_clm_lt_amt }}</td>
                        <td colspan="2">{{ insuranceDTO.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                        <td colspan="2">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 class="text-16 mt-4 px-2 py-1 bg-amber color-deep-navy">3. 주요보험조건</h3>
                  <table class="table2 mt-1">
                    <tr>
                      <td class="text-left">
                        영문전문인배상책임보험 보통약관(배상청구기준) / 징벌적손해부담보 / 계약상 가중책임 부담보 / 간접손해 부담보 / 담보지역 및 재판관할권 : 대한민국 / 자동 보고연장기간 : 60일 / 서기2천년 부담보 추가약관 / 부정직행위 부담보 / 투자에 대한 자문내용 부담보 / 석면위험 부담보 /
                        제재위험 부담보 특별약관 / 보험약관상 보상되는 모든 비용은 보상한도액내 포함 / 기타면책사항(약관 및 안내서 참조)
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" v-if="insuranceDTO.insr_year === '2022'">
                        ※ 예상지급보험금 : (결정된 손해배상금 - 자기부담금)으로 공동보험비율 적용 전 예상보험금<br />
                        - 건당 예상지급보험금이 1,000만원 미만:피보험자의 공동보험비율 13%<br />
                        - 건당 예상지급보험금이 1,000만원~3,000만원 미만:피보험자의 공동보험비율 23%<br />
                        - 건당 예상지급보험금이 3,000만원 이상:피보험자의 공동보험비율 28%<br />
                        ※ 공동보험 미적용을 선택하여 가입한 경우, 공동보험비율은 적용되지 않습니다.
                      </td>
                      <td class="text-left" v-if="insuranceDTO.insr_year === '2023'">
                        ※ 예상지급보험금 : (결정된 손해배상금 - 자기부담금)으로 공동보험비율 적용 전 예상보험금<br />
                        - 건당 예상지급보험금이 1,000만원 미만:피보험자의 공동보험비율 15.5%<br />
                        - 건당 예상지급보험금이 1,000만원~3,000만원 미만:피보험자의 공동보험비율 25.5%<br />
                        - 건당 예상지급보험금이 3,000만원 이상:피보험자의 공동보험비율 30.5%<br />
                        ※ 공동보험 미적용을 선택하여 가입한 경우, 공동보험비율은 적용되지 않습니다.
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left bg-lightprimary">
                        <p>※ 본 증서는 참고용이며 상세한 보험조건은 반드시 약관 및 안내문을 참조 바랍니다.</p>
                        <p class="mt-1">
                          ※ 계약 후 알릴 의무 : 보험 계약 후 피보험자(임직원 포함)에게 손해배상청구가 제기되거나, 손해배상청구가 제기될 수 있는 사고를 인지한 때, 또는 제기될 수 있는 어떤 상황이 예상되는 때에는 보험기간 내에 보험사에 즉시 서면 통지하여야 합니다. 통지가 제대로 되지 않은 경우 보상되지
                          않거나 또는 불이익을 받을 수 있으니 반드시 유념하시기 바랍니다.
                        </p>
                      </td>
                    </tr>
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
            </div>

            <!--법인-->
            <div v-if="insuranceDTO.user_cd === 'COR'">
              <div class="print-wrap page1">
                <header>
                  <img src="../../../assets/images/h-join-logo.png" alt="" />
                  <h1 class="text-26 font-weight-bold line-height-1-3 color-deep-navy text-center mt-2">보 험 가 입 증 명 서</h1>
                  <h2 class="text-16 font-weight-bold line-height-1-3 color-deep-navy text-center">INSURANCE CERTIFICATE</h2>
                </header>
                <main>
                  <p class="text-14 text-right">
                    발행일 : <span>{{ today }}</span>
                  </p>
                  <h3 class="text-16 px-2 py-1 bg-amber color-deep-navy">1. 계약일반사항</h3>
                  <table class="table2 mt-1">
                    <colgroup>
                      <col style="width: 16.6666%" />
                      <col style="auto" />
                      <col style="width: 16.6666%" />
                      <col style="auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>보험종목</th>
                        <td>전문인배상책임보험<br />(Professional Indemnity Insurance)</td>
                        <th>증권번호</th>
                        <td>{{ insuranceDTO.insurance_no }}</td>
                      </tr>
                      <tr>
                        <th>보험기간</th>
                        <td colspan="3">{{ insuranceDTO.base_insr_st_dt }}(00:01) ~ {{ insuranceDTO.base_insr_cncls_dt }}(00:01)</td>
                      </tr>
                      <tr>
                        <th>계약자</th>
                        <td>한국세무사회</td>
                        <th>사업자번호</th>
                        <td>214-82-01415</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 class="text-16 mt-4 px-2 py-1 bg-amber color-deep-navy">2. 피보험자 보험 가입사항</h3>
                  <table class="table2 mt-1">
                    <colgroup>
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="width: 16.6666%" />
                      <col style="auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>피보험자</th>
                        <td colspan="2">{{ insuranceDTO.user_nm }}</td>
                        <th>사업자번호</th>
                        <td colspan="2">{{ insuranceDTO.corp_cnno }}</td>
                      </tr>
                      <tr>
                        <th>공동보험</th>
                        <td colspan="2">{{ insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(0) == '0' ? '적용' : '미적용' }}</td>
                        <th>소급담보일</th>
                        <td colspan="2">{{ insuranceDTO.insr_retr_dt }}</td>
                      </tr>
                      <tr>
                        <th>사무소 주소</th>
                        <td colspan="5">{{ insuranceDTO.corp_addr }}&nbsp;{{ insuranceDTO.corp_addr_dtl }}</td>
                      </tr>
                      <tr>
                        <th colspan="2">보상한도액(1청구당/연간총)</th>
                        <th colspan="2">자기부담금(1청구당)</th>
                        <th colspan="2">납입보험료</th>
                      </tr>
                      <tr>
                        <td colspan="2">{{ insuranceDTO.insr_clm_lt_amt.getValueBySplit(1) }} / {{ insuranceDTO.insr_year_clm_lt_amt }}</td>
                        <td colspan="2">{{ insuranceDTO.insr_psnl_brdn_amt.getValueBySplit(1) }}</td>
                        <td colspan="2">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 class="text-16 mt-4 px-2 py-1 bg-amber color-deep-navy">3. 주요보험조건</h3>
                  <table class="table2 mt-1">
                    <tr>
                      <td class="text-left">
                        영문전문인배상책임보험 보통약관(배상청구기준) / 징벌적손해부담보 / 계약상 가중책임 부담보 / 간접손해 부담보 / 담보지역 및 재판관할권 : 대한민국 / 자동 보고연장기간 : 60일 / 서기2천년 부담보 추가약관 / 부정직행위 부담보 / 투자에 대한 자문내용 부담보 / 석면위험 부담보 /
                        제재위험 부담보 특별약관 / 보험약관상 보상되는 모든 비용은 보상한도액내 포함 / 기타면책사항(약관 및 안내서 참조)
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left" v-if="insuranceDTO.insr_year === '2022'">
                        ※ 예상지급보험금 : (결정된 손해배상금 - 자기부담금)으로 공동보험비율 적용 전 예상보험금<br />
                        - 건당 예상지급보험금이 1,000만원 미만:피보험자의 공동보험비율 13%<br />
                        - 건당 예상지급보험금이 1,000만원~3,000만원 미만:피보험자의 공동보험비율 23%<br />
                        - 건당 예상지급보험금이 3,000만원 이상:피보험자의 공동보험비율 28%<br />
                        ※ 공동보험 미적용을 선택하여 가입한 경우, 공동보험비율은 적용되지 않습니다.
                      </td>
                      <td class="text-left" v-if="insuranceDTO.insr_year === '2023'">
                        ※ 예상지급보험금 : (결정된 손해배상금 - 자기부담금)으로 공동보험비율 적용 전 예상보험금<br />
                        - 건당 예상지급보험금이 1,000만원 미만:피보험자의 공동보험비율 15.5%<br />
                        - 건당 예상지급보험금이 1,000만원~3,000만원 미만:피보험자의 공동보험비율 25.5%<br />
                        - 건당 예상지급보험금이 3,000만원 이상:피보험자의 공동보험비율 30.5%<br />
                        ※ 공동보험 미적용을 선택하여 가입한 경우, 공동보험비율은 적용되지 않습니다.
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left bg-lightprimary">
                        <p>※ 본 증서는 참고용이며 상세한 보험조건은 반드시 약관 및 안내문을 참조 바랍니다.</p>
                        <p class="mt-1">
                          ※ 계약 후 알릴 의무 : 보험 계약 후 피보험자(임직원 포함)에게 손해배상청구가 제기되거나, 손해배상청구가 제기될 수 있는 사고를 인지한 때, 또는 제기될 수 있는 어떤 상황이 예상되는 때에는 보험기간 내에 보험사에 즉시 서면 통지하여야 합니다. 통지가 제대로 되지 않은 경우 보상되지
                          않거나 또는 불이익을 받을 수 있으니 반드시 유념하시기 바랍니다.
                        </p>
                      </td>
                    </tr>
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
                    <h3 class="text-16 px-2 py-1 bg-amber color-deep-navy mt-6">1. 피보험자(세무사) 명단</h3>
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
