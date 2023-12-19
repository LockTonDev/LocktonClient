<template>
  <v-dialog
      persistent
      v-model="isOpenDialog"
      :width="isPdf?'1000px':'800px'"
      hide-overlay
      scrollable
  >
      <v-card>


      <v-card-title class="d-flex align-center justify-space-between">
          <div class="text-h6 font-weight-medium">
              <v-icon size="30">mdi-information</v-icon>&nbsp;보험가입증명서
            <span class="text-20 text-red ml-2" v-if="insuranceDTO.user_cd === 'IND' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 생년월일(6자리) 입니다.</span>
            <span class="text-20 text-red ml-2" v-if="insuranceDTO.user_cd !== 'IND' && !isAdmin"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 사업자번호 뒤 5자리 입니다.</span>
          </div>
          <div class="d-flex justify-space-between align-end">
              <v-btn variant="flat" color="dark" @click="onExportPDF('down')">저장</v-btn>&nbsp;
              <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>
           </div>
      </v-card-title>
      <v-card-text class="pa-0">
          <iframe :src="pdfUrl" width="100%" height="800px"></iframe>
      </v-card-text>

      </v-card>
  </v-dialog>

  <!-- PDF 출력 영역 시작-->
  <div class="d-none">
      <div id="printDiv" class="certificatePrintFrame-wrap">
      
          <div class="print-wrap v2 page1">
            <header>
                <div class="text-right">
                    <img src="../../../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
                </div>
                <h1 class="text-center" style="margin-top:-20px">
                    <p class="h4 headline2">전문직업배상책임보험</p>
                    <p class="h3 headline1">보험가입증명서</p>
                </h1>
            </header>
            <main>
                <h2 class="title-wrap">
                    <p class="h5 circle">1</p>
                    <p class="h6 title">계약자 / 피보험자 관련사항</p>
                </h2>
                <!--개인 -->
                <div v-if="insuranceDTO.user_cd == 'IND'">
                    <table class="table">
                        <colgroup>
                            <col style="width:20%"/>
                            <col style="width:auto"/>
                            <col style="width:20%"/>
                            <col style="width:auto"/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>계약자</th>
                                <td>한국관세사회 및 회원</td>
                                <th>사업자등록번호</th>
                                <td>211-82-02716</td>
                            </tr>
                            <tr>
                                <th>피보험자</th>
                                <td>{{ insuranceDTO.user_nm }}</td>
                                <th>사무소명</th>
                                <td>{{ insuranceDTO.corp_nm }}</td>
                                
                            </tr>
                            <tr>
                                <th>등록번호</th>
                                <td>{{ insuranceDTO.user_regno }}</td>
                                <th>사업자등록번호</th>
                                <td>{{ insuranceDTO.corp_cnno }}</td>
                            </tr>
                            <tr>
                                <th>사무소 주소</th>
                                <td colspan="3">{{ insuranceDTO.corp_addr}} {{ insuranceDTO.corp_addr_dtl}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--//개인 -->
                <!--합동 -->
                <div v-if="insuranceDTO.user_cd == 'JNT'">
                    <table class="table">
                        <colgroup>
                            <col style="width:20%"/>
                            <col style="width:auto"/>
                            <col style="width:20%"/>
                            <col style="width:auto"/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>계약자</th>
                                <td>한국관세사회 및 회원</td>
                                <th>사업자등록번호</th>
                                <td>211-82-02716</td>
                            </tr>
                            <tr>
                                <th>피보험자</th>
                                <td>{{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{ insuranceDTO.cbr_cnt + insuranceDTO.cons_data.cbr_cnt - 1 }} 명</td>
                                <th>사무소명</th>
                                <td>{{ insuranceDTO.user_nm }} </td>
                            </tr>
                            <tr>
                                <th>사무소 주소</th>
                                <td colspan="3">{{ insuranceDTO.corp_addr}} {{ insuranceDTO.corp_addr_dtl}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--//합동 -->
                <!--법인-->
                <div v-if="insuranceDTO.user_cd == 'COR'">
                    <table class="table">
                        <colgroup>
                            <col style="width:20%"/>
                            <col style="width:auto"/>
                            <col style="width:20%"/>
                            <col style="width:auto"/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>계약자</th>
                                <td>한국관세사회 및 회원</td>
                                <th>사업자등록번호</th>
                                <td>211-82-02716</td>
                            </tr>
                            <tr>
                                <th>피보험자</th>
                                <td>{{ insuranceDTO.user_nm }} 명</td>
                                <th>사무소명</th>
                                <td>{{ insuranceDTO.user_nm }} </td>
                            </tr>
                            <tr>
                                <th>사업자등록번호</th>
                                <td>{{ insuranceDTO.corp_cnno }}</td>
                                <th>법인번호</th>
                                <td>{{ insuranceDTO.corp_bnno }}</td>
                            </tr>
                            <tr>
                                <th>사무소 주소</th>
                                <td colspan="3">{{ insuranceDTO.corp_addr}} {{ insuranceDTO.corp_addr_dtl}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--//법인-->
                <h2 class="title-wrap">
                    <p class="h5 circle">2</p>
                    <p class="h6 title">보험가입 관련사항</p>
                </h2>
                <table class="table">
                    <colgroup>
                        <col style="width:10%"/>
                        <col style="width:auto"/>
                        <col style="width:33.333%"/>
                        <col style="width:10%"/>
                        <col style="width:auto"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>보험종목</th>
                            <td colspan="2">전문직업배상책임보험<br/>( Surveyors Professional Indemnity Error &<br> Omission Insurance Policy )</td>
                            <th>증권번호</th>
                            <td>{{ insuranceDTO.insurance_no }}</td>
                        </tr>
                        <tr>
                            <th colspan="2">보험기간</th>
                            <th>공동부담비율(%)</th>
                            <th colspan="2">소급담보일자</th>
                        </tr>
                        <tr>
                            <td colspan="2">{{ insuranceDTO.insr_st_dt}} ~ {{ insuranceDTO.insr_cncls_dt}}</td>
                            <td>{{ insuranceDTO.insr_pblc_brdn_rt.getValueBySplit(1)}}</td>
                            <td colspan="2">{{ insuranceDTO.insr_retr_dt}} </td>
                        </tr>
                        <tr>
                            <th colspan="2">기본담보 보상한도(1청구당/연간총)</th>
                            <th>자기부담금(1청구당)</th>
                            <th colspan="2">납입보험료</th>
                        </tr>
                        <tr>
                            <td colspan="2">{{insuranceDTO.insr_clm_lt_amt.getValueBySplit(1)}} / {{insuranceDTO.insr_year_clm_lt_amt}}</td>
                            <td>{{insuranceDTO.insr_clm_lt_amt.getValueBySplit(1)}}</td>
                            <td colspan="2" rowspan="3">{{Number(insuranceDTO.insr_tot_amt).toLocaleString()}}원</td>
                        </tr>
                        <tr>
                            <th colspan="2">부정행위 보상한도(1천구당/연간총)</th>
                            <th>자기부담금(1청구당)</th>
                        </tr>
                        <tr>
                            <td colspan="2"><p class="min-h-16">{{insuranceDTO.spct_data?.insr_clm_lt_amt?.getValueBySplit(1)||'해당사항 없음'}} / {{insuranceDTO.spct_data?.insr_year_clm_lt_amt ||'해당사항 없음'}}</p></td>
                            <td><p class="min-h-16">{{insuranceDTO.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(1)||'해당사항 없음'}}</p></td>
                        </tr>
                    </tbody>
                </table>
                <h2 class="title-wrap">
                    <p class="h5 circle">3</p>
                    <p class="h6 title">보험조건</p>
                </h2>
                <div class="usp">
                    <p class="mb-2">전문직업배상책임보험 보통약관(배상청구기준) / 징벌적손해부담보 / 계약상 가중책임 부담보 / 간접손해 부담보 / 담보지역 및 재판관할권 : 대한민국 / 자동 보고연장기간 : 60일 / 서기2천년 부담보 / 원자력 관련 위험 부담보 / 전쟁 및 테러위험 부담보 / 피보험자공동보험 특별약관 / 공동인수 특별약관 / 소급담보일자 : 최초보험개시일(단, 갱신 관세사의 경우는 기존날짜 유지) / 보상되는 모든 비용은 보상한도액에 포함</p>
                    <p class="my-2">※ 피보험자의 공동보험 특약 : 각 청구에 대해 상기 명기된 자기부담금을 초과한 손해액에서 피보험자 의 부담 비율에 해당하는 금액을 공제한 후 보상한도액을 넘지 않는 범위내에서 보상하여 드립니다.</p>
                    <p class="mt-2">※ 연간총보상한도액은 보험금 지급시점에 1천만원 미만일 경우 미경과기간에 대해 일할계산 적용하여 의무복원하여야 합니다.</p>
                    <p class="mb-2">※ 동일회사/동일물품 통관 시 동일한 업무상과실에 기인한 사고들은 기간에 관계없이 하나의 사고로 봅니다. </p>
                    <p class="mt-2">※ 본 보험은 한국관세사회 보험심사위원회 운영 조건으로 유효합니다.</p>
                    <p class="">※ 본 증서는 참고용이며 상세한 보험조건은 반드시 약관 및 안내문을 참조 바랍니다.</p>
                    <p class="">※ 계약 후 알릴 의무 : 보험 계약 후 피보험자(임직원 포함)에게 손해배상청구가 제기되거나,손해배상청구가 제기될 수 있는 사고를 인지한 때, 또는 제기될 수 있는 어떤 상황이 예상되는 때에는 보험기간 내에 <ins>보험사에 즉시 서면 통지하여야 합니다.</ins> 통지가 제대로 되지 않은 경우 보상되지 않거나 또는 불이익을 받을 수 있으니 반드시 유념하시기 바랍니다.</p>
                </div>
            </main>
            <footer>
                <p class="text-caption mt-2">※ 본 가입증명서는 위 관세사의 보험가입 사실을 증명합니다.</p>
                <p class="text-caption mb-2">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
                <div class="bottom d-flex justify-space-between">
                    <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
                    <img src="../../../assets/images/img-logo-meritz2.png" alt=""/>
                </div>
            </footer>
          </div>
          <div class="html2pdf__page-break" v-if="insuranceDTO.user_cd == 'JNT' || insuranceDTO.user_cd == 'COR'"></div>
          <div class="print-wrap v2 page2" v-if="insuranceDTO.user_cd == 'JNT' || insuranceDTO.user_cd == 'COR'">
            <header>
                <div class="text-right">
                    <img src="../../../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
                </div>
                <h1 class="text-center" style="margin-top:-20px">
                    <p class="h4 headline2">전문직업배상책임보험</p>
                    <p class="h3 headline1">보험가입인명세</p>
                </h1>
            </header>
            <main>
                <h2 class="title-wrap">
                    <p class="h5 circle">4</p>
                    <p class="h6 title d-block">피보험자(관세사) 명단</p>
                </h2>
                <table class="table">
                    <colgroup>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>주민번호</th>
                            <th>소급담보일자</th>
                            <th>이름</th>
                            <th>주민번호</th>
                            <th>소급담보일자</th>
                        </tr>
                    </thead>
                    <tbody v-if="insuranceDTO.cbr_data.length">
                        <template v-for="(row, index) in insuranceDTO.cbr_data">
                            <tr v-if="index % 2 === 0">
                            <td>{{row.cbr_nm}}</td>
                            <td>{{row.cbr_brdt}}</td>
                            <td>{{row.insr_retr_dt}}</td>
                            <template v-if="insuranceDTO.cbr_data[index+1]">
                                <td>{{insuranceDTO?.cbr_data[index+1]?.cbr_nm}}</td>
                                <td>{{insuranceDTO?.cbr_data[index+1]?.cbr_brdt}}</td>
                                <td>{{insuranceDTO?.cbr_data[index+1]?.insr_retr_dt}}</td>
                            </template>
                            <template v-else>
                                <td></td>
                                <td></td>
                                <td></td>
                            </template>
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
                <p class="text-caption mt-4">※ 메리츠화재해상보험주식회사는 이 보험의 보통약관 및 특별약관과 보험증권에 정한 바에 따라  위와 같이 보험계약을 체결하였음이 확실함으로 그 증거로 이 증명서를 발행합니다</p>
                <p class="text-caption mb-4">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
                <div class="bottom d-flex justify-space-between">
                    <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
                    <img src="../../../assets/images/img-logo-meritz2.png" alt=""/>
                </div>
            </footer>
          </div>
          <div class="html2pdf__page-break" v-if="insuranceDTO.cons_join_yn == 'Y'"></div>
          <div class="print-wrap v2 page2" v-if="insuranceDTO.cons_join_yn == 'Y'">
            <header>
                <div class="text-right">
                    <img src="../../../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
                </div>
                <h1 class="text-center" style="margin-top:-20px">
                    <p class="h4 headline2">전문직업배상책임보험</p>
                    <p class="h3 headline1">보험가입인명세</p>
                </h1>
            </header>
            <main>
                <h2 class="title-wrap">
                    <p class="h5 circle">4</p>
                    <p class="h6 title d-block">피보험자(관세사) 명단 - 컨설팅</p>
                </h2>
                <table class="table">
                    <colgroup>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>주민번호</th>
                            <th>소급담보일자</th>
                            <th>이름</th>
                            <th>주민번호</th>
                            <th>소급담보일자</th>
                        </tr>
                    </thead>
                    <tbody v-if="insuranceDTO.cons_data.cbr_data.length">
                        <template v-for="(row, index) in insuranceDTO.cons_data.cbr_data">
                            <tr v-if="index % 2 === 0">
                            <td>{{row.cbr_nm}}</td>
                            <td>{{row.cbr_brdt}}</td>
                            <td>{{row.insr_retr_dt}}</td>
                            <template v-if="insuranceDTO.cons_data.cbr_data[index+1]">
                                <td>{{insuranceDTO?.cbr_data[index+1]?.cbr_nm}}</td>
                                <td>{{insuranceDTO?.cbr_data[index+1]?.cbr_brdt}}</td>
                                <td>{{insuranceDTO?.cbr_data[index+1]?.insr_retr_dt}}</td>
                            </template>
                            <template v-else>
                                <td></td>
                                <td></td>
                                <td></td>
                            </template>
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
                <p class="text-caption mt-4">※ 메리츠화재해상보험주식회사는 이 보험의 보통약관 및 특별약관과 보험증권에 정한 바에 따라  위와 같이 보험계약을 체결하였음이 확실함으로 그 증거로 이 증명서를 발행합니다</p>
                <p class="text-caption mb-4">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
                <div class="bottom d-flex justify-space-between">
                    <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
                    <img src="../../../assets/images/img-logo-meritz2.png" alt=""/>
                </div>
            </footer>
          </div>
          <div class="html2pdf__page-break"  v-if="insuranceDTO.spct_join_yn == 'Y'"></div>
          <div class="print-wrap v2 page3"  v-if="insuranceDTO.spct_join_yn == 'Y'">
            <header>
                <div class="text-right">
                    <img src="../../../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
                </div>
                <h1 class="text-center" style="margin-top:-20px">
                    <p class="h4 headline2">전문직업배상책임보험</p>
                    <p class="h3 headline1">보험가입인명세</p>
                </h1>
            </header>
            <main>

                <h2 class="title-wrap">
                    <p class="h5 circle">4</p>
                    <p class="h6 title d-block">부정행위 확장담보 피보험자(사무원) 명단</p>
                </h2>
                <table class="table">
                    <colgroup>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>주민번호</th>
                            <th>소급담보일자</th>
                            <th>이름</th>
                            <th>주민번호</th>
                            <th>소급담보일자</th>
                        </tr>
                    </thead>
                    <tbody v-if="insuranceDTO.spct_data.cbr_data.length">
                        <template v-for="(row, index) in insuranceDTO.spct_data.cbr_data">
                            <tr v-if="index % 2 === 0">
                            <td>{{row.cbr_nm}}</td>
                            <td>{{row.cbr_brdt}}</td>
                            <td>{{row.insr_retr_dt}}</td>
                            <template v-if="insuranceDTO.spct_data.cbr_data[index+1]">
                                <td>{{insuranceDTO.spct_data.cbr_data[index+1]?.cbr_nm}}</td>
                                <td>{{insuranceDTO.spct_data.cbr_data[index+1]?.cbr_brdt}}</td>
                                <td>{{insuranceDTO.spct_data.cbr_data[index+1]?.insr_retr_dt}}</td>
                            </template>
                            <template v-else>
                                <td></td>
                                <td></td>
                                <td></td>
                            </template>
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
                <p class="text-caption mt-4">※ 메리츠화재해상보험주식회사는 이 보험의 보통약관 및 특별약관과 보험증권에 정한 바에 따라  위와 같이 보험계약을 체결하였음이 확실함으로 그 증거로 이 증명서를 발행합니다</p>
                <p class="text-caption mb-4">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
                <div class="bottom d-flex justify-space-between">
                    <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
                    <img src="../../../assets/images/img-logo-meritz2.png" alt=""/>
                </div>
            </footer>
          </div>
      
      </div>
  </div>
  <!-- PDF 출력 종료 시작-->


</template>


<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { InsuranceDTO } from '@/model';
import apiA_TCAA0030A from '@/api/api/A_TCAA0030A'
import html2pdf from "html2pdf.js";
import '../../../assets/css/printpdf.css'
const props = defineProps({
  insurance_uuid: {
      type: String,
      required: true
  },
  isCertificatePrintFramDialog: {
      type: Boolean,
      required: true
  }
})
const isOpenDialog = ref(false);
const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);
const isAdmin = _AUTH_ADMIN.value === null ? false: true;
const insuranceDTO = ref(new InsuranceDTO());

onMounted(async () => {    
  const params = {insurance_uuid:props.insurance_uuid};
  const resultData = await apiA_TCAA0030A.getDBSel(params);
  insuranceDTO.value =  resultData.data[0];
 // Object.assign(insuranceDTO.value, resultData.data[0]);
  // console.log(insuranceDTO.value);
  onExportPDF('view');
});


const pdfUrl = ref(null);

const onExportPDF = (viewType:string) => {
  let pdfPassword = '';
  if (insuranceDTO.value.user_cd === 'IND') {
    pdfPassword = insuranceDTO.value.user_birth;
  } else if (insuranceDTO.value.user_cd !== 'IND') {
    pdfPassword = insuranceDTO.value.corp_cnno.slice(-5);
  }
  const opt = {
    margin: [0, 9, 0, 9],
    filename: '전문직업배상책임보험_보험가입증명서.pdf',
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
      allowTaint: false,
    },
    jsPDF: {
        // encryption: {
        //     userPassword: '1111',
        //     ownerPassword: '2222',
        //     userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
        //     encryptionAlgorithm: 'aes',
        //     keyLength: 128,
        // },
    orientation: 'portrait', unit: 'mm', format: 'a4' },
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

const printDiv = document.getElementById("printDiv");

  if(viewType == 'down') {
      html2pdf().set(opt).from(printDiv).save();
  }else {
      html2pdf().set(opt).from(printDiv).toPdf().get('pdf').then((pdfObj) => {
          
          pdfUrl.value = URL.createObjectURL(pdfObj.output('blob'));
          isOpenDialog.value = true;
      });
  }

};

const emit = defineEmits([
'close'
]);

const close = () => {
  isOpenDialog.value = false;
  emit('close');
};

</script>
