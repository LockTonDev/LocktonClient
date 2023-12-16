
<template>
    
    <div class="print-wrap page1">
            <div class="text-right">
                <img src="../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
            </div>
            <h1 class="text-center" style="margin-top:-20px">
                <p class="h4 headline2">전문직업배상책임보험</p>
                <p class="h3 headline1">보험가입증명서</p>
            </h1>
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
                            <td>{{ insuranceDTO.user_nm }}</td>
                            <th>사업자등록번호</th>
                            <td>{{ insuranceDTO.corp_cnno }}</td>
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
                            <td>{{ insuranceDTO.user_nm }}</td>
                            <th>사업자등록번호</th>
                            <td>{{ insuranceDTO.corp_cnno }}</td>
                        </tr>
                        <tr>
                            <th>피보험자</th>
                            <td>{{ insuranceDTO.corp_nm }}</td>
                            <th>사업자등록번호</th>
                            <td>{{ insuranceDTO.corp_bnno }} </td>
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
                            <td>{{ insuranceDTO.user_nm }}</td>
                            <th>사업자등록번호</th>
                            <td>{{ insuranceDTO.corp_cnno }}</td>
                        </tr>
                        <tr>
                            <th>피보험자</th>
                            <td colspan="3">관세법인 H</td>
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
                        <td>14090-6488</td>
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
                        <td colspan="2">{{insuranceDTO.insr_clm_lt_amt.getValueBySplit(1)}}</td>
                        <td>{{insuranceDTO.insr_clm_lt_amt.getValueBySplit(1)}}</td>
                        <td colspan="2" rowspan="3">{{Number(insuranceDTO.insr_tot_amt).toLocaleString()}}원</td>
                    </tr>
                    <tr>
                        <th colspan="2">부정행위 보상한도(1천구당/연간총)</th>
                        <th>자기부담금(1청구당)</th>
                    </tr>
                    <tr>
                        <td colspan="2"><p class="min-h-16">{{insuranceDTO.spct_data.insr_clm_lt_amt.getValueBySplit(1)||'해당사항 없음'}}</p></td>
                        <td><p class="min-h-16">{{insuranceDTO.spct_data.insr_psnl_brdn_amt.getValueBySplit(1)||'해당사항 없음'}}</p></td>
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
            <p class="text-caption mt-2">※ 본 가입증명서는 위 관세사의 보험가입 사실을 증명합니다.</p>
            <p class="text-caption mb-2">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
            <div class="bottom d-flex justify-space-between">
                <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
                <img src="../assets/images/img-logo-meritz2.png" alt=""/>
            </div>
    </div>
    <div class="html2pdf__page-break"></div>
    <div class="print-wrap page2" v-if="insuranceDTO.user_cd == 'JNT' || insuranceDTO.user_cd == 'COR'">
        <div class="text-right">
            <img src="../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
        </div>
        <h1 class="text-center" style="margin-top:-20px">
            <p class="h4 headline2">전문직업배상책임보험</p>
            <p class="h3 headline1">보험가입인명세</p>
        </h1>
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
        <p class="text-caption mt-4">※ 메리츠화재해상보험주식회사는 이 보험의 보통약관 및 특별약관과 보험증권에 정한 바에 따라  위와 같이 보험계약을 체결하였음이 확실함으로 그 증거로 이 증명서를 발행합니다</p>
        <p class="text-caption mb-4">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
        <div class="bottom d-flex justify-space-between">
            <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
            <img src="../assets/images/img-logo-meritz2.png" alt=""/>
        </div>
    </div>
    <div class="html2pdf__page-break" v-if="insuranceDTO.cons_join_yn == 'Y'"></div>
    <div class="print-wrap page2" v-if="insuranceDTO.cons_join_yn == 'Y'">
        <div class="text-right">
            <img src="../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
        </div>
        <h1 class="text-center" style="margin-top:-20px">
            <p class="h4 headline2">전문직업배상책임보험</p>
            <p class="h3 headline1">보험가입인명세</p>
        </h1>
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
        <p class="text-caption mt-4">※ 메리츠화재해상보험주식회사는 이 보험의 보통약관 및 특별약관과 보험증권에 정한 바에 따라  위와 같이 보험계약을 체결하였음이 확실함으로 그 증거로 이 증명서를 발행합니다</p>
        <p class="text-caption mb-4">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
        <div class="bottom d-flex justify-space-between">
            <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
            <img src="../assets/images/img-logo-meritz2.png" alt=""/>
        </div>
    </div>
    <div class="html2pdf__page-break"  v-if="insuranceDTO.spct_join_yn == 'Y'"></div>
    <div class="print-wrap page3"  v-if="insuranceDTO.spct_join_yn == 'Y'">
        <div class="text-right">
            <img src="../assets/images/img-logo-meritz1.png" alt="" style="height: 20px; margin-bottom: 10px;"/>
        </div>
        <h1 class="text-center" style="margin-top:-20px">
            <p class="h4 headline2">전문직업배상책임보험</p>
            <p class="h3 headline1">보험가입인명세</p>
        </h1>
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
        <p class="text-caption mt-4">※ 메리츠화재해상보험주식회사는 이 보험의 보통약관 및 특별약관과 보험증권에 정한 바에 따라  위와 같이 보험계약을 체결하였음이 확실함으로 그 증거로 이 증명서를 발행합니다</p>
        <p class="text-caption mb-4">※ 정확한 보상내용은 해당계약에 적용되는 증권과 약관의 관련규정에 따라 정해집니다.</p>
        <div class="bottom d-flex justify-space-between">
            <p>▶상품 및 사고접수 문의 :<br/>록톤컴퍼니즈코리아손해보험중개㈜<br/>Tel. 02)2011-0300</p>
            <img src="../assets/images/img-logo-meritz2.png" alt=""/>
        </div>
    </div>

    

</template>


<style scoped>

.print-wrap{
  width: 650px;
  margin: 0 auto; 
  text-align: left;
}
.headline1 {letter-spacing: 0.6rem;color: navy;}
.headline2 {color: red;}
.title-wrap{position: relative;padding-left: 16px;margin: 10px 0 8px;}
.title {background: rgb(252, 214, 179);padding-left: 30px;line-height: 28px;text-align: left;}
.circle{position: absolute;top: 0;left: 0;display: block;width: 32px;height: 32px;line-height: 32px;margin-right:16px;text-align: center;background: rgba(95, 95, 95);border-radius: 50%;color:white;}
.table{table-layout: fixed;width: 100%;border-collapse: collapse;}
.table th {font-size:12px;text-align: center;padding:2px 8px;border: 2px solid #bbb;background: rgb(217, 225, 242);}
.table td {font-size:12px;text-align: center;padding:2px 8px;border: 2px solid #bbb;background: rgb(242, 242, 242);}
.usp{font-size:12px;background: rgba(255,255,204);padding: 16px 24px;border: 2px solid #bbb;}
.bottom p {font-size:12px;background: rgba(204,236,255);padding: 16px 24px;}
.d-block {display: block;}
.d-none {display: none;}
.d-flex{display: flex;}
.justify-space-between {justify-content: space-between;}
.mb-3 {margin-bottom:3px}
.my-3 {margin-top:3px;margin-bottom:3px;}
.mt-4 {margin-top:3px}
.min-h-16 {min-height: 16px;}

</style>

<script setup lang="ts">
import { ref, onMounted, defineProps} from "vue";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { InsuranceDTO } from '@/model';

import apiA_TCAA0030A from '@/api/api/A_TCAA0030A'

const props = defineProps({
    insurance_uuid: {
    type: String,
    required: false;
  }
})
const insuranceDTO = ref(new InsuranceDTO());

onMounted(async () => {    
    props.insurance_uuid = '862e18b4-b2a2-11ed-b2d7-708bcd54c757'
    const params = {insurance_uuid:props.insurance_uuid};
    const resultData = await apiA_TCAA0030A.getDBSel(params);
    Object.assign(insuranceDTO.value, resultData.data[0]);
});


</script>
