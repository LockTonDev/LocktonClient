<template>
  <BaseBreadcrumb :title="page.title" :image="page.image"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" sm="12" class="pa-0">            
      <v-tabs v-model="mainTab" fixed-tabs color="primary">
        <v-tab value="1"><h3 class="font-weight-bold text-18">특징</h3></v-tab>
        <v-tab value="2"><h3 class="font-weight-bold text-18">보장사항</h3></v-tab>
        <v-tab value="3"><h3 class="font-weight-bold text-18">가입 절차</h3></v-tab>
        <v-tab value="4"><h3 class="font-weight-bold text-18">사고접수 절차</h3></v-tab>
      </v-tabs>
    </v-col>
  </v-row>

  <v-window v-model="mainTab" class="pb-16" disabled="true">
    <v-window-item value="1">
      <v-row class="mt-10" justify="center">
        <v-col cols="12" sm="10">
          <h4 class="text-h5 font-weight-bold text-center">변리사배상책임보험이란?</h4>
          <p class="text-18 text-center mt-10">
            변리사 및 그 임직원이 전문인의 자격으로 업무를 수행함에 있어 과실로 의뢰인 또는 제 3자에게
            직접적인 손해를 입힌 경우 법률상 손해배상금 및 사고처리에 드는 제반비용을 보상해주는 상품입니다
          </p>
          <v-row :class="checkMobile.isMobile?'px-sm-16 d-flex flex-column':'px-sm-16'" justify="center">
            <v-col align="center" class="pa-0">
              <div class="bg-background border-radius-round d-inline-block pa-10 mt-10">
                <img src="../../assets/images/icon/icon-insurance-1-5-small.png" alt=""/>
              </div>
              <p class="text-20 font-weight-medium mt-6">계약자</p>
              <p class="mt-4">대한변리사회</p>
            </v-col>
            <v-col align="center" class="pa-0">
              <div class="bg-background border-radius-round d-inline-block pa-10 mt-10">
                <img src="../../assets/images/icon/icon-insurance-1-6-small.png" alt=""/>
              </div>
              <p class="text-20 font-weight-medium mt-6">보험기간</p>
              <p class="mt-4">1월 1일 00:01 ~ 다음해 1월 1일 00:01</p>
              <p class="color-gray-shadow mt-2 text-14">※ 1월 1일 이후 신규 가입 시 가입일부터 개시</p>
            </v-col>
            <v-col align="center" class="pa-0">
              <div class="bg-background border-radius-round d-inline-block pa-10 mt-10">
                <img src="../../assets/images/icon/icon-insurance-1-7-small.png" alt=""/>
              </div>
              <p class="text-20 font-weight-medium mt-6">보험가입대상</p>
              <p class="mt-4">대한변리사회 회원</p>
            </v-col>
          </v-row>
        </v-col> 
        <v-col cols="11" sm="11" class="px-0 mt-12">
          <h4 class="text-h5 font-weight-bold text-center">가입 필요성</h4>
          <v-row class="mt-10" justify="space-between">
            <v-col cols="12" md="4" align="center" align-self="stretch" class="pa-0 d-flex">
              <v-card class="w-sm-360 v-box">
                <img src="../../assets/images/img-insurance-1-3.jpg" alt="" class="d-block w-full"/>
                <div class="px-6 py-9 text-left">
                  <p class="text-20 font-weight-medium">손해배상책임 위험 증가</p>
                  <p class="mt-4 word-break-keep-all">급격한 기술 발전과 지식재산권의 폭발적 증가로 변리사의 전문성은 더욱 강조되고 있으며, 직무가 복잡해지고 세분화되어 업무 수행에 대한 손해배상책임 위험이 점차 증가하고 있습니다.</p>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" align="center" align-self="stretch" class="pa-0 d-flex">
              <v-card class="w-sm-360 v-box">
                <img src="../../assets/images/img-insurance-1-1.jpg" alt="" class="d-block w-full"/>
                <div class="px-6 py-9 text-left">
                  <p class="text-20 font-weight-medium">전문자격사로서의 역할과 책임 확대</p>
                  <p class="mt-4 word-break-keep-all">지식산업 최전선에서 지식재산권 수호자로서의 역할이 더욱 강조되고 있으며, 산업 가치 창조 수요자에 대한 양질의 서비스 제공과 업무 책임도 확대되고 있습니다.</p>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" align="center" align-self="stretch" class="pa-0 d-flex">
              <v-card class="w-sm-360 v-box">
                <img src="../../assets/images/img-insurance-1-2.jpg" alt="" class="d-block w-full"/>
                <div class="px-6 py-9 text-left">
                  <p class="text-20 font-weight-medium">경제적 부담 완화</p>
                  <p class="mt-4 word-break-keep-all">전문직업인의 직무상 과실에 대한 민사적 책임을 묻는 경우가 늘고 있으며, 손해배상액의 규모 또한 점점 증가하고 있는 추세입니다. 이에 전문인보험의 가입을 통하여 경제적 부담을 완화할 수 있습니다.</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <!--
          <div class="bg-background px-4 py-8 mt-8 mb-12">
            <div class="text-18 font-weight-medium text-center">관련 법령</div>
            <div class="text-body-1 color-gray-shadow mt-5 word-break-keep-all d-flex flex-wrap justify-center px-16">
              <span class="w-40 pl-16">세무사법 제16조의2(손해배상책임의 보장)</span>
              <span class="w-40">세무사법 시행령 제33조의4(손해배상책임의 보장)</span>
              <span class="w-40 mt-1 pl-16">세무사법 제16조의7(손해배상준비금 등)</span>
              <span class="w-40 mt-1">세무사법 시행령 제14조의8(손해배상준비금의 적립 등)</span>
            </div>
          </div>
          -->
        </v-col>
        <v-col cols="12" sm="9" class="px-0 mt-12">
          <h4 class="text-h5 font-weight-bold text-center">록톤의 역할</h4>
          <ul :class="checkMobile.isMobile?'list-style-type-none v-box py-2 px-2 mt-10 border-color-gray':'list-style-type-none v-box py-2 px-16 mt-10 border-color-gray'">
            <li class="d-flex justify-space-between align-center py-8">
              <img src="../../assets/images/icon/icon-insurance-1-1.png" alt="" class="ml-4">
              <p :class="checkMobile.isMobile?'text-h6 w-30 ml-4 mr-2':'text-h6 w-30 ml-10'">계약자<span class="text-18">(대한변리사회)</span> 대변</p>
              <div class="text-body-1 line-1-6 w-50">
                <p>사고중재 / 요율작업에서 계약자에 유리하도록 적극 협상</p>
              </div>
            </li>
            <v-divider />
            <li class="d-flex justify-space-between align-center py-8">
              <img src="../../assets/images/icon/icon-insurance-1-2.png" alt="" class="ml-4">
              <p :class="checkMobile.isMobile?'text-h6 w-30 ml-4 mr-2':'text-h6 w-30 ml-10'">2003년부터 단체보험 운영</p>
              <div class="text-body-1 line-1-6 w-50">
                <p>2003년부터 단체보험 도입</p>
                <p class="mt-1">- 개별 가입 대비 저렴한 보험료 제공</p>
              </div>
            </li>
            <v-divider />
            <li class="d-flex justify-space-between align-center py-8">
              <img src="../../assets/images/icon/icon-insurance-1-3.png" alt="" class="ml-4">
              <p :class="checkMobile.isMobile?'text-h6 w-30 ml-4 mr-2':'text-h6 w-30 ml-10'">협회 단체 계약 특화</p>
              <div class="text-body-1 line-1-6 w-50">
                <p>보험 업계 유일 전문인배상책임보험팀 운영</p>
                <p class="mt-1">- 전문인배상책임보험에 대해 특화된 시스템</p>
                <p class="mt-1">- 전문적인 보험프로그램과 서비스 제공</p>
              </div>
            </li>
          </ul>
        </v-col> 
      </v-row>
    </v-window-item>

    <v-window-item value="2">
      <v-row class="mt-10 v-tab-vertical-wrap" justify="center">
        <v-col cols="12" md="2">
          <v-tabs v-model="tab2" class="h-100" color="primary" :direction="checkMobile.isMobile?'horizontal':'vertical'">
            <v-tab value="option-1"><h4 class="text-body-1">보상하는 손해</h4></v-tab>
            <v-tab value="option-2"><h4 class="text-body-1">배상청구기준증권</h4></v-tab>
            <v-tab value="option-3"><h4 class="text-body-1">보상한도/자기부담금</h4></v-tab>
            <v-tab value="option-4"><h4 class="text-body-1">특별약관</h4></v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" md="10">
          <v-window v-model="tab2">
            <v-window-item value="option-1">
              <p>피보험자인 변리사가 변리사자격 범위내의 업무를 수행함에 있어 업무상 과실로
                의뢰인 또는 제3자에게 직접적 손해를 입힌 경우 법률상 손해배상금 및 사고처리에
                드는 제반 비용을 보상</p>
              <table class="normal-table mt-5">
                <colgroup>
                  <col style="width:20%"/>
                  <col style="width:20%"/>
                  <col style="width:auto"/>
                </colgroup>
                <tbody>
                    <tr>
                      <th rowspan="8" class="text-center">주요 보상하는 손해</th>
                      <td class="text-center">법률적 손해배상금</td>
                      <td class="border-right-0">판결액, 최종합의 및 화해액<br/>(단, 징벌적 손해, 벌과금, 과태료 등과 서비스 수수료 반환금은 포함되지 않음)</td>
                    </tr>
                    <tr>
                      <td rowspan="6" class="text-center">사고처리 제비용</td>
                      <td class="border-right-0">변호사 비용</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">전문조사인 비용</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">소송 비용</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">중재나 화해에 드는 비용</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">대위권 보전 비용</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">기타 조사, 방어, 합의 등의 과정에서 발생하는 수수료, 비용 등</td>
                    </tr>
                    <tr>
                      <td colspan="2" class="border-right-0">기타 보통 약관 및 특별약관 보험조건에서 정하는 사항</td>
                    </tr>
                </tbody>
              </table>
              <table class="normal-table mt-4">
                <colgroup>
                  <col style="width:20%"/>
                  <col style="width:auto"/>
                </colgroup>
                <tbody>
                    <tr>
                      <th rowspan="13" class="text-center">주요 보상하지 않는 손해</th>
                      <td class="border-right-0">피보험자의 악의적 또는 사기적 부정행위</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">징벌적 손해 (Punitive Damage Exclusion Clause) : 벌금, 과태료 등</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">전문업무의 수행과 관련 없는 신체상해 또는 재물손해</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">중상, 비방 또는 명예훼손 등 인격침해</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">유가증권, 부동산 또는 기타 투자관련 자문 업무 등</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">피보험자의 지불불능 및 파산에 기인한 손해배상책임</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">보험개시일 이전에 행한 업무에 기인한 손해배상책임</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">계약상 가중책임 (Contractual Liability Exclusion Clause)</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">결과적 책임 / 간접손해 (Consequential Loss Exclusion Clause)</td>
                    </tr>
                    <tr>
                      <td class="border-right-0">기타 보통 약관 및 특별약관 보험조건에서 정하는 사항</td>
                    </tr>
                </tbody>
              </table>
              <table class="normal-table mt-4">
                <colgroup>
                  <col style="width:20%"/>
                  <col style="width:auto"/>
                </colgroup>
                <tbody>
                <tr>
                  <th rowspan="3" class="text-center">추가사항</th>
                  <td class="border-right-0">담보지역 확대 : 이 보험의 담보지역은 대한민국에 한정됩니다. 해외 지역 담보가 필요한 회원은 설문서 작성 후 개별 보험료를 안내드립니다.</td>
                </tr>
                </tbody>
              </table>
              <div class="mt-4">
                <span class="color-gray-shadow text-16">※ 자세한 사항은 약관을 참조해주세요</span>
                <v-btn color="primary" variant="outlined" class="ml-2">약관 보기
                  <v-dialog persistent v-model="isDialogTermsOfPolicy1" activator="parent" scrollable max-width="1000">
                    <v-btn variant="outlined" color="dark" @click="isDialogTermsOfPolicy1 = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                    <TermsOfPolicy></TermsOfPolicy>
                  </v-dialog>
                </v-btn>
              </div>


              <v-btn color="primary" variant="tonal" block class="mt-10 py-7 border-primary-1">
                <span class="mr-1">예상질문에 대한 답변서</span>
                <vue-feather type="download" class="feather-sm vertical-align-middle"></vue-feather>
                <v-dialog persistent v-model="isDialogFAQ" activator="parent" scrollable max-width="1000">
                  <v-btn variant="outlined" color="dark" @click="isDialogFAQ = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                  <v-card>
                    <v-card-title class="d-flex justify-space-between align-center px-6 py-4 position-relative">
                      <p class="text-h6 font-weight-bold">예상질문에 대한 답변서</p>
                      <v-spacer />
                    </v-card-title>
                    <v-divider class="mb-0"/>
                    <v-card-text class="pa-0">
                      <iframe src="/assets/doc/PAT/변리사2025_예상질문에 대한 답변서.pdf" width="100%" height="800px"></iframe>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-btn>

            </v-window-item>
            <v-window-item value="option-2">
              <h4 class="text-body-1 font-weight-bold">배상청구기준증권</h4>
              <ul class="list-style-type-bull text-16 word-break-keep-all mt-6 ml-3">
                <li>현재 유효한 보험증권의 보험기간 중에 제3자(의뢰인 포함)로 부터 손해배상청구가 있어야 보상이 가능한 증권입니다.</li>
                <li class="mt-1">소급 담보일(통상 최초가입일) 이후의 업무에 기인한 사고로 보험종료일 사이에 발생된 배상청구에 대하여 보상이 이루어지며, 매년 갱신이 되면 소급담보일(통상 최초가입일) 이후 업무가 계속적으로 담보됩니다.</li>
                <li class="mt-1">보상기준은 업무일이 속한 보험증권의 가입조건을 따르는 것이 아닌, 배상청구 당시의 유효한 보험가입조건에 따라 보상이 됩니다.</li>
              </ul>
              <img src="../../assets/images/img-insurance-2-2.png" alt="" class="mt-4 w-85"/>
              <div class="mt-4">
                <p class="color-gray-shadow text-16">※ 갱신이 되지 않을 경우에는 보험가입기간 중의 업무로 발생한 사고라도 보험만기일로부터 자동보고연장담보기간 60일이 경과하면 보험혜택을 받으실 수 없습니다.</p>
                <v-btn type="button" color="primary" variant="outlined" class="mt-2 d-block">
                  <span class="mr-1">보고기간연장담보(Extended Reporting Period) 알아보기</span>
                  <v-dialog persistent v-model="dialogERP" activator="parent" scrollable max-width="1000">
                    <v-btn variant="outlined" color="dark" @click="dialogERP = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                    <v-card>
                      <v-card-title class="d-flex justify-space-between align-center px-6 py-4 position-relative">
                        <p :class="checkMobile.isMobile?'text-h6 font-weight-bold text-12':'text-h6 font-weight-bold'">변리사배상책임보험 보고기간연장담보(ERP) 안내</p>
                        <v-spacer />
                      </v-card-title>
                      <v-divider class="mb-0"/>
                      <v-card-text class="px-10 py-6 text-16">
                        <p>법인의 해산, 개인사무소의 폐업 등 보험계약을 유지할 수 없는 사유가 발생한 경우 추가보험료를 납부하고 과거 보험기간에 수행한 변리사의 업무에 대한 담보를 연장할 수 있습니다.</p>
                        <table class="normal-table mt-6">
                          <colgroup>
                            <col style="width:22%"/>
                            <col/>
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>담보업무</th>
                              <td class="border-right-0">과거 보험기간에 수행한 변리사의 업무</td>
                            </tr>
                            <tr>
                              <th class="border-left-0">가입기간</th>
                              <td class="border-right-0">최대 3년까지 가입가능</td>
                            </tr>
                            <tr>
                              <th class="border-left-0">보험료</th>
                              <td class="border-right-0">
                                1년 가입 시 : 전년도 연간 보험료의 100%<br/>
                                2년 가입 시 : 전년도 연간 보험료의 175%<br/>
                                3년 가입 시 : 전년도 연간 보험료의 250%<br/>
                              </td>
                            </tr>
                            <tr>
                              <th class="border-left-0">유의사항</th>
                              <td class="border-right-0">보험기간 만료 후 30일 이내에 서면 요청하여야 하며,<br/>보험조건은 전년도와 동일하게 가입(변경 불가)</td>
                            </tr>
                          </tbody>
                        </table>                        
                        <p class="mt-4 text-16">가입 및 기타 문의는 록톤(T. 02-2011-0300)으로 연락주시기 바랍니다.</p>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </div>
            </v-window-item>
            <v-window-item value="option-3">
              <h4 class="text-body-1 font-weight-bold">보상한도액</h4>
              <ul class="list-style-type-bull word-break-keep-all text-16 mt-6 ml-3">
                <li>사고 발생시 보험회사에서 지급되는 보험금의 상한선을 뜻합니다.</li>
                <li class="mt-1">약관상 보상되는 손해 및 그와 관련된 소송 비용, 변호사 비용 등 방어 비용은 보상한도액을 넘지 않는 범위내에서 보상됩니다.<br/> (All Costs & Expenses are included within the Limit of Liability 조항)</li>
              </ul>
              <table class="normal-table mt-6">
                <colgroup>
                  <col style="width:22%"/>
                  <col/>
                </colgroup>
                <tbody>
                  <tr>
                    <th>1청구당 보상한도액 </th>
                    <td class="border-right-0">1 사고에 대한 보상한도</td>
                  </tr>
                  <tr>
                    <th class="border-left-0">연간 총 보상한도액</th>
                    <td class="border-right-0">
                      보험기간 1년 동안 보상받을 수 있는 총 한도
                    </td>
                  </tr>                  
                </tbody>
              </table>
              <h4 class="text-body-1 font-weight-bold mt-10">자기부담금(공제금액)</h4>
              <ul class="list-style-type-bull word-break-keep-all text-16 mt-6 ml-3">
                <li>피보험자 본인이 부담하는 금액으로 매 사고당 적용되며, 자기부담금 미만의 손해에 대해서는 보상되지 않습니다.</li>
                <li>자기부담금을 초과하는 손해에 대해서는 산출손해배상액에서 자기부담금을 차감 후 청구당 보상한도액 범위 내에서 보상됩니다.</li>
                <!--<li class="mt-1"><span class="text-decoration-underline">동일회사</span>의 법인세, 종합소득세 등 신고 시 발생한 <span class="text-decoration-underline">동일한 업무상 과실에 기인한 사고</span>들은 그 과실이 연속된 귀속연도에 계속 반복되어 발생하였더라도 기간에 관계없이 <span class="text-decoration-underline">하나의 사고로 간주</span>하여 자기부담금을 적용합니다.</li>-->
              </ul>
            </v-window-item>
            <v-window-item value="option-4">
              <h4 class="text-body-1 font-weight-bold">기술정보유출배상책임 담보 특별약관</h4>
              <p class="mt-6  word-break-keep-all text-16">
                피보험자의 업무수행 과정이나 그러한 목적으로 소유, 사용, 관리하는 “기술정보＂의
                우연한 “유출＂로 기인한 피보험자의 법률상 손해배상책임을 보상합니다.
              </p>
              <table class="normal-table mt-6">
                <colgroup>
                  <col style="width: 35%"/>
                  <col style="width: auto"/>
                </colgroup>
                <tbody>
                <tr>
                  <th>보상한도액</th>
                  <td class="border-right-0">
                    5백만원 (1청구당/연간총)
                  </td>
                </tr>
                <tr>
                  <th class="border-left-0">자기부담금</th>
                  <td class="border-right-0">
                    1백만원 (1청구당)
                  </td>
                </tr>
                <tr>
                  <th class="border-left-0">기타</th>
                  <td class="border-right-0">
                    특별약관에 대한 보상한도는 가입증명서에 명시되는 청구당
                    보상한도액 및 연간총 보상한도액에 포함됩니다.
                    또한 구체적이고 정확한 보상내용은 보험종목에 적용되는
                    약관의 관련규정에 따라 정해집니다.
                  </td>
                </tr>
                </tbody>
              </table>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-window-item>

    <v-window-item value="3">
      <v-row class="mt-10" justify="center">
        <v-col cols="11" sm="11" class="pa-0">
          <h4 class="text-h5 font-weight-bold text-center">가입 절차</h4>
          <ul :class="checkMobile.isMobile?'list-style-type-none v-box py-10 mt-10 border-color-gray bg-lightbackground px-2 text-16': 'list-style-type-none v-box py-10 mt-10 border-color-gray bg-lightbackground px-16 text-16'">
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-1.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">로그인</dt>
                <dd class="mt-1">
                  회원가입 후 로그인<br/>
                </dd>
                <dd class="">법인/합동가입의 경우 하나의 아이디를 발급 받은 후 회원가입</dd>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1': 'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-2.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">가입/계약 정보 입력</dt>
                <dd class="mt-1">가입 정보/계약 정보 입력 후 보험료 확인</dd>
                <dd class="mt-1">    
                  약관/개인정보처리동의 확인<br/>
                  <v-btn color="primary" variant="outlined" class="ml-2"> <span>약관 상세 </span>
                  <v-dialog persistent v-model="isDialogTermsOfPolicy2" activator="parent" scrollable max-width="1000">
                    <v-btn variant="outlined" color="dark" @click="isDialogTermsOfPolicy2 = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                    <TermsOfPolicy></TermsOfPolicy>
                  </v-dialog>
                </v-btn>

                </dd>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-3.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">가입내용 최종 검토</dt>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-4.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">신청서 제출</dt>
                <dd class="mt-1">가입신청서 제출</dd>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-5.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">보험료 납부/계좌 이체</dt>
                <dd class="mt-1">
                  보험 개시일 전까지 납부
                </dd>
                <dd class="mt-1">신규 가입 시 만기일 (매년 1월 1일)까지 일할 계산</dd>
                <dd class="mt-1 color-gray-shadow" v-if="_AUTH_USER.userCd == 'IND'" >※ 입금자 피보험자 성명+등록번호로 반드시 기재<br/>(법인/합동가입의 경우 사무소 명으로 일괄 납부)</dd>
                <dd class="mt-1 color-gray-shadow" v-if="_AUTH_USER.userCd == 'JNT'" >※ 보험료를 합산하여 사무소 명으로 일괄납부</dd>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-6.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">가입 조회/증명서 출력</dt>
                <dd class="mt-1">저장 및 출력</dd>
              </dl>
            </li>
          </ul>
          <h4 class="text-h5 font-weight-bold text-center mt-12 mb-10">가입 시 알아 두어야 할 사항</h4>
          <table class="normal-table">
            <colgroup>
              <col style="width:25%"/>
              <col style="width:25%"/>
              <col style="width:auto"/>
            </colgroup>
            <tbody>
              <tr>
                <th rowspan="4" class="text-18">내용</th>
                <td colspan="2" class="border-right-0">대한변리사회 회원만 가입 가능</td>
              </tr>
              <tr>
                <td>개인 가입</td>
                <td class="border-right-0">개인사무소에 등록변리사가 근무하는 경우 별도로 가입 해야함</td>
              </tr>
              <tr>
                <td>합동가입 (보상한도 공유가입)</td>
                <td class="border-right-0">- 보험의 피보험자는 보상한도를 공유하여 가입하는 각 변리사가 됨<br/>
                  (사무소 또는 법인이 피보험자가 되지 않으며, 가입한 변리사의 책임만 보장)</td>
              </tr>
              <tr>
                <td>법인 가입</td>
                <td>보험의 피보험자는 법인이 되며, 법인의 책임이 보장됨</td>
              </tr>
            </tbody>
          </table>
          <v-btn variant="outlined" block color="primary" class="bg-lightprimary mt-10 py-7" to="/faq">
            <span class="mr-4">자주묻는 질문 자세히 알아보기</span>
            <svg width="34" height="16" stroke="#00AEEF" stroke-width="1" fill="none">
                  <polyline points="26,8 34,16" />
                  <line x1="0" y1="100%" x2="100%" y2="100%"/>
                </svg>
          </v-btn>
        </v-col>
      </v-row>      
    </v-window-item>

    <v-window-item value="4">
      <v-row class="mt-10" justify="center">
        <v-col cols="11" sm="11">
          <h4 class="text-h5 font-weight-bold text-center">사고접수 절차</h4>
          <ul :class="checkMobile.isMobile?'list-style-type-none v-box py-10 mt-10 border-color-gray bg-lightbackground px-2 text-16 word-break-keep-all': 'list-style-type-none v-box py-10 mt-10 border-color-gray bg-lightbackground px-16 text-16 word-break-keep-all'">
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-4-1.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">사고접수 양식 다운로드</dt>
                <dd class="mt-1">사고 인지 즉시 서면에 의한 사고 접수를 하여야 함(피보험자 상황 통지 의무)</dd>
                <dd class="mt-2">
                  <a class="v-btn v-btn--flat text-primary rounded-md v-btn--variant-outlined mr-4 px-4 py-1 text-14" href="/assets/doc/PAT/변리사_사고통보서.pdf" download>
                    <span class="mr-1">다운로드</span>
                    <vue-feather type="download" class="feather-sm vertical-align-middle"></vue-feather>
                  </a>
                                  
                </dd>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-4-2.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">통보서 작성 후 사고접수</dt>
                <dd class="mt-1">이메일 또는 팩스로 사고접수</dd>
                <dd>FAX : 0503-8379-2008 / 02-2011-0301</dd>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'mt-2 mb-1 d-flex align-center px-0':'px-16 mt-2 mb-1 d-flex align-center'">
              <span>영업일 기준 <br v-if="checkMobile.isMobile"/>2~3일 소요</span>
              <div>
                <svg width="76" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="33,40 38,46 43,40" />
                  <line x1="50%" y1="0" x2="50%" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-4-3.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">담당 손해사정사 배정</dt>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-4.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">사고 조사 진행 및 소송 대행</dt>
                <dd class="mt-1">변리사의 과실 또는 부작위로 인한 법률상 배상책임액 및 사고처리 제비용 보상</dd>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-5.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">법률상 손해배상액 산정 후 지급보험금 책정</dt>
              </dl>
            </li>
            <li :class="checkMobile.isMobile?'px-2 mt-2 mb-1':'px-16 mt-2 mb-1'">
              <div :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li :class="checkMobile.isMobile?'d-flex align-center px-2':'d-flex align-center px-16'">
              <img src="../../assets/images/icon/icon-insurance-3-6.png" alt="" :class="checkMobile.isMobile?'pl-2 ml-2':'pl-16 ml-16'"/>
              <dl :class="checkMobile.isMobile?'ml-4':'ml-16'">
                <dt class="color-primary">보험금 최종 지급</dt>
              </dl>
            </li>
          </ul>
          <h4 class="text-h5 font-weight-bold text-center mt-12 mb-10">사고 처리에서 록톤의 역할</h4>
          <table class="normal-table">
            <colgroup>
              <col style="width:28%"/>
              <col style="width:auto"/>
            </colgroup>
            <tbody>
              <tr>
                <th rowspan="3" class="text-18">내용</th>
                <td class="border-right-0">사고 발생 시 사고 통보로부터 보험금 수령에 이르기 까지 제반 업무를 지원</td>
              </tr>
              <tr>
                <td class="border-right-0">협상권을 가진 보험중개사로서 계약자(대한변리사회)를 대변하여 보험 계약 내용의 해석 및 사실 관계의 판단에 개입</td>
              </tr>
              <tr>
                <td>다수의 전문인 보험 운영 능력 및 전문 조직을 바탕으로 한 업무 진행</td>
              </tr>
            </tbody>
          </table>
          <h4 class="text-h5 font-weight-bold text-center mt-12 mb-10">사고 접수 시 확인 사항</h4>
          <table class="normal-table">
            <colgroup>
              <col style="width:28%"/>
              <col style="width:auto"/>
            </colgroup>
            <tbody>
              <tr>
                <th rowspan="2" class="text-18">내용</th>
                <td class="border-right-0">소급담보일(통상 최초가입일) 이후에 수행한 업무에 대해서 담보(가입일 이전 수행업무에 대해서는 부담보)</td>
              </tr>
              <tr>
                <td>자기부담금 이하의 손해에 대해서는 피보험자 본인이 책임을 부담</td>
              </tr>
            </tbody>
          </table>
          <v-btn variant="outlined" block color="primary" class="bg-lightprimary mt-10 py-7" to="/faq">
            <span class="mr-4">자주묻는 질문 자세히 알아보기</span>
            <svg width="34" height="16" stroke="#00AEEF" stroke-width="1" fill="none">
                  <polyline points="26,8 34,16" />
                  <line x1="0" y1="100%" x2="100%" y2="100%"/>
                </svg>
          </v-btn>
        </v-col>
      </v-row>
      
    </v-window-item>

  </v-window>


  <!--LAYER : 보험료 -->
  <v-dialog persistent v-model="isInsrTableDialog" width="1024" scrollable>
  <v-card class="position-relative">
    <v-card-title class="d-flex justify-space-between pr-6">
      <h3 class="text-h6 font-weight-bold">보험료표</h3>
      <v-btn
        variant="outlined"
        color="dark"
        @click="isInsrTableDialog = false"
        class="mr-4"
        >닫기</v-btn
      >
    </v-card-title>
    <v-card-text class="pa-0">
      <V_TPAT0030P10 />
    </v-card-text>
  </v-card>
  </v-dialog>

</template>


<script setup lang="ts">
  import { ref } from "vue";
  import { onBeforeMount, onBeforeUpdate, onUnmounted, onMounted, onRenderTracked, onRenderTriggered, onActivated, onDeactivated} from "vue";
  import { useRoute } from 'vue-router'
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
  import V_TPAT0030P10 from '../contract/PAT/V_TPAT0030P10.vue';      // 보험료표
  import TermsOfPolicy from '../contract/PAT/V_TPAT0030P01.vue';      // PDF 다운로드 (약관)

  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';

  import {useMobileStore} from "@/stores";
  const checkMobile = useMobileStore();
  
  const authStore = useAuthStore();
  const { _AUTH_USER } = storeToRefs(authStore);

  const route = useRoute();

  const mainTab = ref('1');
  const tab2 = ref("option-1");
  
  const page = ref({
    title: "변리사배상책임보험",
    image: "/assets/images/background/bg-insurance2.jpg",

  });
  const isDialogTermsOfPolicy1 = ref(false);
  const isDialogTermsOfPolicy2 = ref(false);
  const isDialogTermsOfPolicy3 = ref(false);
  const isDialogFAQ = ref(false);
  const dialogERP = ref(false);
  const isInsrTableDialog = ref(false);
  // 이전 route.params 값 저장을 위한 변수
  const prevParams = ref({});

  onMounted(() => {
    mainTab.value = route.params.mainTabIdx;
  });

  onBeforeUpdate(() => {
    if(JSON.stringify(prevParams.value) !== JSON.stringify(route.params)) {
      mainTab.value = route.params.mainTabIdx;
      prevParams.value = route.params;
    }
  });



</script>

