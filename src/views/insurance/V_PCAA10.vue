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

  <v-window v-model="mainTab" class="pb-16">
    <v-window-item value="1">
      <v-row class="mt-10" justify="center">
        <v-col cols="12" sm="10">
          <h4 class="text-h5 font-weight-bold text-center">관세사배상책임보험이란?</h4>
          <p class="text-18 text-center mt-10">
            관세사 및 그 임직원이 전문인의 자격으로 업무를 수행함에 있어 과실로 의뢰인 또는 제 3자에게<br />직접적인 손해를 입힌 경우 법률상 손해배상금 및 사고처리에 드는 제반비용을 보상해주는 상품입니다.<br />공제, 이행보증보험과 달리 보험금 지급 후 구상권을 행사하지 않습니다.
          </p>
          <v-row class="my-10 px-sm-16" justify="center">
            <v-col align="center" class="pa-0">
              <div class="bg-background border-radius-round d-inline-block pa-10">
                <img src="../../assets/images/icon/icon-insurance-1-5-small.png" alt=""/>
              </div>
              <p class="text-20 font-weight-medium mt-6">계약자</p>
              <p class="mt-4">한국관세사회</p>
            </v-col>
            <v-col align="center" class="pa-0">
              <div class="bg-background border-radius-round d-inline-block pa-10">
                <img src="../../assets/images/icon/icon-insurance-1-6-small.png" alt=""/>
              </div>
              <p class="text-20 font-weight-medium mt-6">보험기간</p>
              <p class="mt-4">1월 1일 00:01 ~ 다음해 1월 1일 00:01</p>
              <p class="color-gray-shadow mt-2 text-14">※ 단, 1월 1일 이후 신규 가입 시 가입일부터 개시</p>
            </v-col>
            <v-col align="center" class="pa-0">
              <div class="bg-background border-radius-round d-inline-block pa-10">
                <img src="../../assets/images/icon/icon-insurance-1-7-small.png" alt=""/>
              </div>
              <p class="text-20 font-weight-medium mt-6">보험가입대상</p>
              <p class="mt-4">한국관세사회 개인회원 및<br/>합동사무소 / 법인</p>
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
                  <p class="text-20 font-weight-medium">손해배상 책임의 보장</p>
                  <p class="mt-4 word-break-keep-all">관세사법 및 동법 시행령에서 관세사 1인당 1천만원 이상에 해당하는 보험 가입 등 필요한 조치를 해야한다고 규정하고 있습니다.</p>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" align="center" align-self="stretch" class="pa-0 d-flex">
              <v-card class="w-sm-360 v-box">
                <img src="../../assets/images/img-insurance-1-1.jpg" alt="" class="d-block w-full"/>
                <div class="px-6 py-9 text-left">
                  <p class="text-20 font-weight-medium">전문자격사로서의 역할과 책임 확대</p>
                  <p class="mt-4 word-break-keep-all">FTA, APTA 등 무역협정체결의 증대로 관세사 업무의 리스크가 갈수록 증가하여 전문 자격사 로서의 역할과 책임이 늘어나고 있습니다.</p>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" align="center" align-self="stretch" class="pa-0 d-flex">
              <v-card class="w-sm-360 v-box">
                <img src="../../assets/images/img-insurance-1-2.jpg" alt="" class="d-block w-full"/>
                <div class="px-6 py-9 text-left">
                  <p class="text-20 font-weight-medium">경제적 부담 완화</p>
                  <p class="mt-4 word-break-keep-all">관세사가 직무를 수행하는 과정에서 부주의, 착오 등 과실로 인해 발생하는 경제적 부담을 완화할 수 있습니다.</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <div class="bg-background text-center px-4 py-8 mt-8 mb-12">
            <p class="text-18 font-weight-medium">관련법령</p>
            <p class="text-body-1 color-gray-shadow mt-5 word-break-keep-all">
              <span class="mx-2">관세사법16조(손해배상책임의보장)</span>
              <span class="mx-2">|</span>
              <span class="mx-2">관세사법제17조의5(손해배상준비금 등)</span>
              <span class="mx-2">|</span>
              <span class="mx-2">관세사법제19조(통관취급법인 등)</span>
              <span class="mx-2">|</span>
              <v-spacer />
              <span class="mx-2">관세사법시행령제22조(손해배상책임의보장)</span>
              <span class="mx-2">|</span>
              <span class="mx-2">관세사법시행령제24조의3(관세법인의손해배상준비금적립등)</span>
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="9" class="px-0 mt-12">
          <h4 class="text-h5 font-weight-bold text-center">록톤의 역할</h4>
          <ul class="list-style-type-none v-box py-2 px-16 mt-10 border-color-gray">
            <li class="d-flex justify-space-between align-center py-8">
              <img src="../../assets/images/icon/icon-insurance-1-1.png" alt="" class="ml-4">
              <p class="text-h6 w-30 ml-10">계약자<span class="text-18">(한국관세사회)</span> 대변</p>
              <div class="text-body-1 line-1-6 w-50">
                <p>사고중재/ 요율작업에서 계약자에 유리하도록 적극 협상</p>
              </div>
            </li>
            <v-divider />
            <li class="d-flex justify-space-between align-center py-8">
              <img src="../../assets/images/icon/icon-insurance-1-2.png" alt="" class="ml-4">
              <p class="text-h6 w-30 ml-10">2002부터 단체보험 운영</p>
              <div class="text-body-1 line-1-6 w-50">
                <p>2002년부터 한국관세사회를 계약자로 하여 단체보험 도입</p>
                <p class="mt-1">- 개별 가입 대비 저렴한 보험료 제공</p>
              </div>
            </li>
            <v-divider />
            <li class="d-flex justify-space-between align-center py-8">
              <img src="../../assets/images/icon/icon-insurance-1-3.png" alt="" class="ml-4">
              <p class="text-h6 w-30 ml-10">협회 단체 계약 특화</p>
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
          <v-tabs v-model="tab2" color="primary" direction="vertical">
            <v-tab value="option-1"><h4 class="text-body-1">보상하는 손해</h4></v-tab>
            <v-tab value="option-2"><h4 class="text-body-1">배상청구기준증권</h4></v-tab>
            <v-tab value="option-3"><h4 class="text-body-1">보상한도액/자기부담금</h4></v-tab>
            <v-tab value="option-4"><h4 class="text-body-1">사고공동부담비율</h4></v-tab>
            <v-tab value="option-5"><h4 class="text-body-1">특별약관</h4></v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" md="10">
          <v-window v-model="tab2">
            <v-window-item value="option-1">
              <ul class="list-style-type-bull word-break-keep-all ml-3">
                <li>관세사의 관세대리업무 중 과실신고 등으로 인해 피해자가 추가로 어떠한 세액을 납부하는 경우 관세사로서는 원칙적으로 부과되는 “본세”는 배상책임을 부담하지 않으며 추가로 지출하게 되는 “가산세”등에 대해서만 배상책임을 부담합니다.</li>
              </ul>
              <p class="color-gray-shadow mt-2">※ 관세 감면, 환급 신고 등의 부실신고로 인해 피해자가 추가로 부담하는 관세 차액은 “본세”에 해당하더라도 배상의 책임이 있을 수 있음.</p>
              <table class="normal-table mt-6">
                <colgroup>
                  <col style="width:20%"/>
                  <col style="width:20%"/>
                  <col style="width:auto"/>
                </colgroup>
                <tbody>
                    <tr>
                      <th rowspan="8" class="text-center">주요 보상하는 손해</th>
                      <td class="text-center">법률적 손해배상금</td>
                      <td class="border-right-0">판결액, 최종합의 및 화해액</td>
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
                      <th rowspan="10" class="text-center">보상하지 않는 손해</th>
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
              <div class="mt-4">
                <span class="color-gray-shadow">※ 자세한 사항은 약관을 참조해주세요</span>
                <v-btn color="primary" variant="outlined" class="ml-2">약관 보기
                  <v-dialog persistent v-model="dialogCCA" activator="parent" scrollable max-width="1000">
                    <v-btn variant="outlined" color="dark" @click="dialogCCA = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                    <TermsOfCCA></TermsOfCCA>
                  </v-dialog>
                </v-btn>
              </div>
              <v-btn color="primary" variant="tonal" block class="mt-10 py-7 border-primary-1">
                <span class="mr-1">예상질문에 대한 답변서</span>
                <vue-feather type="download" class="feather-sm vertical-align-middle"></vue-feather>
                <v-dialog persistent v-model="dialogCAAfaq" activator="parent" scrollable max-width="1000">
                  <v-btn variant="outlined" color="dark" @click="dialogCAAfaq = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                  <v-card>
                    <v-card-title class="d-flex justify-space-between align-center px-6 py-4 position-relative">
                      <p class="text-h6 font-weight-bold">보험 약관</p>
                      <v-spacer />
                    </v-card-title>
                    <v-divider class="mb-0"/>
                    <v-card-text class="pa-0">
                      <iframe src="/assets/doc/관세사2023_예상질문에_대한_답변서.pdf" width="100%" height="800px"></iframe>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-btn>
                    
            </v-window-item>
            <v-window-item value="option-2">
              <h4 class="text-body-1 font-weight-bold">배상청구기준증권</h4>
              <ul class="list-style-type-bull word-break-keep-all mt-6 ml-3">                
                <li>현재 유효한 보험증권의 보험기간 중에 제3자(의뢰인 포함)로 부터 손해배상청구가 있어야 보상이 가능한 증권입니다.</li>
                <li class="mt-1">소급 담보일(통상 최초가입일) 이후의 업무에 기인한 사고로 보험종료일 사이에 발생된 배상청구에 대하여 보상이 이루어지며, 매년 갱신이 되면 소급담보일(통상 최초가입일) 이후 업무가 계속적으로 담보됩니다.</li>
                <li class="mt-1">보상기준은 업무일이 속한 보험증권의 가입조건을 따르는 것이 아닌, 배상청구 당시의 유효한 보험가입조건에 따라 보상이 됩니다.</li>
              </ul>
              <img src="../../assets/images/img-insurance-2-2.png" alt="" class="mt-4"/>
              <div class="mt-4">
                <p class="color-gray-shadow">※ 갱신이 되지 않을 경우에는 보험가입기간 중의 업무로 발생한 사고라도 보험만기일로부터 자동보고연장담보기간 60일이 경과하면 보험혜택을 받으실 수 없습니다.</p>
                <v-btn type="button" color="primary" variant="outlined" class="mt-2 d-block">
                  <span class="mr-1">보고기간연장담보(Extended Reporting Period) 알아보기</span>
                  <v-dialog persistent v-model="dialogERP" activator="parent" scrollable max-width="1000">
                    <v-btn variant="outlined" color="dark" @click="dialogERP = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                    <v-card>
                      <v-card-title class="d-flex justify-space-between align-center px-6 py-4 position-relative">
                        <p class="text-h6 font-weight-bold">관세사배상책임보험 보고기간연장담보(ERP) 안내</p>
                        <v-spacer />
                      </v-card-title>
                      <v-divider class="mb-0"/>
                      <v-card-text class="px-10 py-6">
                        <p>피보험자인 관세사의 폐업 등 부득이한 경우로 보험을 갱신하지 못하는 경우 추가보험료를 납부하고 과거 보험기간에 수행한 관세사의 업무에 대한 담보를 연장할 수 있습니다.</p>
                        <table class="normal-table mt-6">
                          <colgroup>
                            <col style="width:22%"/>
                            <col/>
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>담보업무</th>
                              <td class="border-right-0">과거 보험기간에 수행한 관세사의 업무</td>
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
                              <td class="border-right-0">보험기간 만료 후 30일 이내에 서면 요청하여야 하며,<br/>보험조건은 전년도와 동일하게 가입(증액 불가)</td>
                            </tr>
                          </tbody>
                        </table>                        
                        <p class="mt-4">가입 및 기타 문의는 록톤(T. 02-2011-0300)으로 연락주시기 바랍니다.</p>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </div>
            </v-window-item>
            <v-window-item value="option-3">
              <h4 class="text-body-1 font-weight-bold">보상한도액</h4>
              <ul class="list-style-type-bull word-break-keep-all mt-6 ml-3">
                <li>사고 발생시 보험회사에서 지급되는 보험금의 상한선을 뜻합니다.</li>
                <li class="mt-1">약관상 보상되는 손해 및 그와 관련된 소송 비용, 변호사 비용 등 방어 비용은 보상한도액을 넘지 않는 범위내에서 보상됩니다.<br />(All Costs & Expenses are included within the Limit of Liability 조항)</li>
              </ul>
              <table class="normal-table mt-6">
                <colgroup>
                  <col style="width:22%"/>
                  <col/>
                </colgroup>
                <tbody>
                  <tr>
                    <th>1청구당 보상한도액</th>
                    <td class="border-right-0">1 사고에 대한 보상한도액</td>
                  </tr>
                  <tr>
                    <th>연간 총 보상한도액</th>
                    <td class="border-right-0">보험기간 1년 동안 보상받을 수 있는 총 한도액</td>
                  </tr>                  
                </tbody>
              </table>
              <h4 class="text-body-1 font-weight-bold">자기부담금(공제금액)</h4>
              <ul class="list-style-type-bull word-break-keep-all mt-6 ml-3">
                <li>피보험자 본인이 부담하는 금액으로 자기부담금 미만의 손해에 대해서는 보상되지 않습니다. <br /></li>
                <li class="mt-1">자기부담금을 초과하는 손해에 대해서는 산출손해배상액에서 자기부담금을 차감 후 1청구당 보상한도액 범위 내에서 보상합니다. <br/>(사고공동부담비율 선택한 경우 추가 공제 후 지급)</li>
              </ul>
              <table class="normal-table mt-2">
                <colgroup>
                  <col style="width:22%"/>
                  <col/>
                </colgroup>
                <tbody>
                  <tr>
                    <th>자기부담금</th>
                    <td class="border-right-0"> : 1 사고당 적용</td>
                  </tr>
                  <tr>
                    <td class="border-right-0" colspan="2">
                      동일회사, 동일 물품 통관 시 발생한 동일한 업무상 과실에 기인한 사고들은 기간에 관계없이 하나의 사고로 처리
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-window-item>
            <v-window-item value="option-4">
              <h4 class="text-body-1 font-weight-bold word-break-keep-all">사고공동부담비율</h4>
              <ul class="list-style-type-bull word-break-keep-all mt-6 ml-3">
                <li>1회의 배상청구(하나의 사고)에 대하여 손해사정 후 결정된 손해배상금에서 자기부담금을 차감한 금액(=예상지급보험금)의 일정비율(%)에 해당하는 금액을 피보험자가 부담하는 제도입니다. </li>
              </ul>
              <table class="normal-table mt-6 text-center">
                <colgroup>
                  <col style="width: 25%"/>
                  <col style="width: 25%"/>
                  <col style="width: 25%"/>
                  <col style="width: 25%"/>
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>CASE A</th>
                    <th>CASE B</th>
                    <th class="border-right-0">CASE C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border-left-0">사고공동부담비율</td>
                    <td>미적용</td>
                    <td>15% 적용</td>
                    <td class="border-right-0">30% 적용</td>
                  </tr>
                  <tr>
                    <td class="border-left-0">보험사 지급 비율</td>
                    <td>보험사 100% 지급</td>
                    <td>보험사 85% 지급</td>
                    <td class="border-right-0">보험사 70% 지급</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colspan="4" class="bg-background border-right-0 py-8">
                      <p class="color-primary text-20">손해배상액이 1천만원으로 확정된 경우 예상 보험금은?</p>
                      <p class="color-gray-shadow">(보상한도 1천만원/자기부담금 2백만원 조건 가입시)</p>
                      <p class="mt-4">손해배상액 1천만원 - 자기부담금 2백만원 = <span class="text-20">8,000,000원</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-left-0">수령보험금</td>
                    <td>
                      <p>8,000,000원</p>
                      <p class="color-gray-shadow">(전액수령)</p>
                    </td>
                    <td>
                      <p>6,800,000원</p>
                      <p class="color-gray-shadow">(1,200,000원 차감)</p>
                    </td>
                    <td>
                      <p>5,600,000원</p>
                      <p class="color-gray-shadow">(2,400,000원 차감)</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="color-gray-shadow mt-4 text-right">※ 피보험자가 선택한 조건에 따라 예상지급보험금이 위와 같이 보상됩니다.</p>
            </v-window-item>
            <v-window-item value="option-5">
              <h4 class="text-body-1 font-weight-bold">사무원부정직행위담보특별약관<span class="font-weight-normal">(추가보험료발생)</span></h4>
              <p class="mt-6  word-break-keep-all">
                관세사가 고용한 직원의 부정직(또는 사기행위)의 직접적인 결과로 보험기간 중에 발견된 금전적인 손실을 보상 받을 수 있는 특별 약관(Dishonesty Extension) 입니다.<br/>
                고의적이고 명백한 의도에 의한 직접 결과이거나 혹은 고용한 사무원이 관세사를 대신하여 전문서비스 업무를 수행하는 동안 사무원 자신의 경제적인 이득을 취할 목적으로 단독/타인과 공모하여 행한 부정 행위 또는 사기행위에 기인한 것을 전제로 합니다.
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
                      1천만원 (*기본담보 보상한도 2천만원 이상부터 가입 가능) <br/>
                      <span class="color-gray">(사무원 1인당 적용되는 보상 한도액 이 아닌 1청구당/연간 총 한도액입니다.)</span>
                    </td>
                  </tr>
                  <tr>
                    <th class="border-left-0">담보 내용 </th>
                    <td class="border-right-0">
                      가입 시 기재된 사무원에 대하여 보장 <br/>
                    </td>
                  </tr>
                  <tr>
                    <th class="border-left-0">사고 통지</th>
                    <td class="border-right-0">
                      사고 인지 후 30일 이내에 반드시 보험사로 서면 통지하여야 하며,<br/>
                      기간 내 통지가 이루어지지 않을 경우 면책처리됨<br/>
                      <a class="v-btn v-btn--flat text-primary rounded-md v-btn--variant-outlined mt-2 px-4 py-1 text-14" href="/assets/doc/CAA/관세사_사고경위서.pdf" download>
                        <span class="mr-1">사고 경위서 다운로드</span>
                        <vue-feather type="download" class="feather-sm vertical-align-middle"></vue-feather>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <dl class="mt-6 pa-10 bg-background">
                <dt class="font-weight-medium"><i class="mdi mdi-alert-circle-outline mr-2"></i>유의사항</dt>
                <dd class="text-body-1 mt-4 text-grey-darken-3">
                  <ul class="list-style-type-bull pl-3">
                    <li>최초 가입 이후 사고 인지 시점에도 유효하게 가입되어 있어야 하며 기본 담보의 자동보고 연장기간(60일)은 적용되지 않습니다.</li>
                    <li>보험회사가 지급한 보험금한도 내에서 사고를 야기한 사무원 및 제3자에 대하여 구상권을 행사 할 수 있습니다.</li>
                  </ul>
                </dd>
              </dl>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-window-item>

    <v-window-item value="3">
      <v-row class="mt-10" justify="center">
        <v-col cols="11" sm="11" class="pa-0">
          <h4 class="text-h5 font-weight-bold text-center">가입 절차</h4>
          <ul class="list-style-type-none v-box py-10 px-16 mt-10 border-color-gray bg-lightbackground">
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-1.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">로그인</dt>
                <dd class="mt-1">
                  회원가입 후 로그인<br/>
                </dd>
                <dd class="">합동/법인은 하나의 아이디를 발급 받은 후 회원가입</dd>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-2.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">가입/계약 정보 입력</dt>
                <dd class="mt-1">가입 정보/ 계약 정보 입력 후 보험료 확인</dd>
                <dd class="mt-1">    
                  약관/ 개인정보처리동의 확인
                  <v-btn color="primary" variant="outlined" density="comfortable" class="ml-2">
                    <span class="mr-1">약관 상세 </span>
                  </v-btn>
                </dd>
                <dd class="color-gray-shadow">※ 보험 기간 중에는 가입 조건 변경이 불가능 하오니 재확인 부탁드립니다.</dd>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-3.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">가입내용 최종 검토</dt>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-4.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">신청서 제출</dt>
                <dd class="mt-1">가입신청서 제출</dd>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-5.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">보험료 납부/계좌 이체</dt>
                <dd class="mt-1">
                  보험 개시일 전까지 납부
                </dd>
                <dd class="mt-1">신규 가입 시 만기일 (매년 1월 1일)까지 일할 계산</dd>
                <dd class="mt-1 color-gray-shadow">※ 입금자 피보험자 성명으로 반드시 기재<br/>(합동/법인은 합동/법인명으로 일괄 납부)</dd>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-6.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">가입 조회/증명서 출력</dt>
                <dd class="mt-1">저장 및 출력</dd>
                <dd class="mt-1 color-gray-shadow">※ 편집 불가한 PDF파일</dd>
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
                <td>한국관세사회 회원만 가입 가능</td>
                <td class="border-right-0">등록번호 협회 홈페이지에서 검색 가능 <a href="http://www.krcaa.or.kr" target="_blank" class="color-black text-decoration-none">(http://www.krcaa.or.kr)<vue-feather type="external-link" class="ml-1 color-primary vertical-align-middle mt-minus-1"></vue-feather></a></td>
              </tr>
              <tr>
                <td>개인으로 각각 가입</td>
                <td class="border-right-0">개인 사무소에 채용된 직원 관세사도 가입 해야함(개인으로 각각 가입)</td>
              </tr>
              <tr>
                <td>합동/법인은 일괄 가입 원칙</td>
                <td class="border-right-0">가입 시 한국관세사회에 등록 되어있는 소속 관세사 전원 가입 필수</td>
              </tr>
              <tr>
                <td>보상한도</td>
                <td>보상 한도 5천만원 이상 가입을 희망하는 경우 개별 신청</td>
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
          <ul class="list-style-type-none v-box py-10 px-16 mt-10 border-color-gray bg-lightbackground word-break-keep-all">
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-4-1.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">사고접수 양식 다운로드</dt>
                <dd class="mt-1">사고 인지 즉시 서면에 의한 사고 접수를 하여야함(피보험자 상황 통지 의무)</dd>
                <dd class="mt-2">
                  <a class="v-btn v-btn--flat text-primary rounded-md v-btn--variant-outlined mr-4 px-4 py-1 text-14" href="/assets/doc/CAA/관세사_사고경위서.pdf" download>
                      <span class="mr-1">사고 경위서 다운로드</span>
                      <vue-feather type="download" class="feather-sm vertical-align-middle"></vue-feather>
                    </a>
                                  
                </dd>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-4-2.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">경위서 작성 후 사고접수</dt>
                <dd class="mt-1">이메일 또는 팩스로 사고접수</dd>
                <dd>FAX : 0503-8379-2008 / 02-2011-0301</dd>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1 d-flex align-center">
              <span>영업일 기준 2~3일 소요</span>
              <div>
                <svg width="76" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="33,40 38,46 43,40" />
                  <line x1="50%" y1="0" x2="50%" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-4-3.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">담당 손해사정사 배정</dt>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-4.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">사고 조사 진행 및 소송 대행</dt>
                <dd class="mt-1">관세사의 과실 또는 부작위로 인한 법률상 배상책임액 및 사고처리 제비용 보상</dd>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-5.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
                <dt class="color-primary">법률상 손해배상액 산정 후 지급보험금 책정</dt>
              </dl>
            </li>
            <li class="px-16 mt-2 mb-1">
              <div class="pl-16 ml-16">
                <svg width="130" height="46" stroke="#787878" stroke-width="1" fill="none">
                  <polyline points="60,40 65,46 70,40" />
                  <line x1="65" y1="0" x2="65" y2="100%"/>
                </svg>
              </div>
            </li>
            <li class="d-flex align-center px-16">
              <img src="../../assets/images/icon/icon-insurance-3-6.png" alt="" class="pl-16 ml-16"/>
              <dl class="ml-16">
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
                <td class="border-right-0">협상권을 가진 보험중개사로서 계약자(한국관세사회)를 대변하여 보험 계약 내용의 해석 및 사실 관계의 판단에 개입</td>
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
</template>


<script setup lang="ts">
  import { ref } from "vue";
  import { onBeforeMount, onBeforeUpdate, onUnmounted, onMounted, onRenderTracked, onRenderTriggered, onActivated, onDeactivated} from "vue";
  import { useRoute } from 'vue-router'
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
  import BaseCard from "@/components/BaseCard.vue";
  import TermsOfCCA from '@/components/TermsOfCCA.vue'
  

  const route = useRoute();

  const mainTab = ref('1');
  const tab2 = ref("option-1");
  const page = ref({
    title: "관세사배상책임보험",
    image: "../../assets/images/background/bg-insurance1.jpg",
  });
  const dialogCCA = ref(false);
  const dialogCAAfaq = ref(false);
  const dialogERP = ref(false);

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

