<template>
  <BaseBreadcrumb :title="page.title" :subtitle="page.subtitle" :breadcrumbs="breadcrumbs" :image="page.image"></BaseBreadcrumb>

  <!-- 개인회원 -->
  <v-row class="mt-10">
    <v-col cols="12" sm="12">
      <div class="v-stepbox">
        <v-tabs v-model="tab" color="primary" next-icon="mdi-arrow-left" prev-icon="mdi-arrow-left" show-arrows>
          <v-tab value="1" class="flex-grow-1">가입정보</v-tab>
          <v-tab value="2" class="flex-grow-1">보험계약</v-tab>
          <v-tab value="3" class="flex-grow-1">약관동의</v-tab>
        </v-tabs>
      </div>
    </v-col>
  </v-row>

  <v-row class="mb-16" justify="center" v-if="onLoading">
    <v-col cols="8">
      <v-window v-model="tab">
        <!-- 가입정보 Tab 시작 -->
        <v-window-item value="1">
          <v-row class="v-box-table px-14 py-10">
            <v-col cols="12" sm="12" class="v-col">
              <div class="d-flex flex-wrap">
                <h3 class="text-h6 font-weight-bold">가입정보 입력</h3>
              </div>
              <p class="text-body-2 color-gray-shadow"><sup class="text-error">*</sup>는 필수 입력입니다.</p>
            </v-col>
            <v-col cols="12 mt-10">
              <v-row class="v-board-table">
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>이름</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.user_nm }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>생년월일</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.user_birth }}
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>등록번호</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.user_regno }}
                  </div>
                </v-col>

                <v-divider class="border-0" />

                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사무소명</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_nm }}
                  </div>
                </v-col>

                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사업자번호</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_cnno }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사무소 전화</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_telno }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사무소 팩스</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_faxno }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>담당자 성명</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_cust_nm }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>휴대전화</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_cust_hpno }}
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>이메일</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_cust_email }}
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>사무소 주소<sup class="text-error">*</sup></p>
                  </div>
                  <div class="data-col">( {{ insuranceDTO.corp_post }} ) {{ insuranceDTO.corp_addr }}&nbsp;{{ insuranceDTO.corp_addr_dtl }}</div>
                </v-col>
              </v-row>
            </v-col>
            <!-- 개인 끝-->
          </v-row>

          <v-row class="mt-10">
            <v-col class="d-flex justify-center pa-0">
              <v-btn size="x-large" variant="flat" color="dark" @click="onNextPage()">다음</v-btn>
            </v-col>
          </v-row>
        </v-window-item>
        <!-- 가입정보 Tab 종료 -->

        <!-- 보험가입 시작 -->
        <v-window-item value="2" :disabled="isReadOnlyAll">
          <v-row class="v-box-table py-10">
            <v-col cols="12" sm="12" class="px-14 v-col">
              <div class="d-flex flex-wrap">
                <div class="d-flex align-center">
                  <h3 class="text-h6 font-weight-bold">보험 계약</h3>
                </div>
                <v-spacer />
                <v-btn variant="outlined" color="primary" class="ml-auto flex-grow-0" @click="isInsrTableDialog = true">보험료표 보기</v-btn>
              </div>
              <p class="text-body-2 color-gray-shadow"><sup class="text-error">*</sup>는 필수 입력입니다.</p>
            </v-col>
            <v-col cols="12" sm="12" class="py-0 px-14 mt-10">
              <v-row class="v-board-table">
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>보험기간</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col justify-space-between date">
                    {{ insuranceDTO.insr_st_dt }}
                    <p class="mx-2">00:01 부터</p>
                    {{ insuranceDTO.insr_cncls_dt }}
                    <p class="ml-2">00:01 까지</p>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>소급담보일</p>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.insr_retr_dt }}
                  </div>
                </v-col>

                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>무사고 할인 /<br />사고 할증 (%)</p>
                  </div>
                  <div class="data-col">{{ insuranceDTO.insr_sale_rt }} %</div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>공동부담비율</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col w-100">
                    <v-btn-toggle v-model="insuranceDTO.insr_pblc_brdn_rt" name="insr_pblc_brdn_rt" divided variant="outlined" density="comfortable" class="w-100" :disabled="isReadOnlyAll">
                      <v-btn color="primary" class="flex-grow-1" value="0|공동부담비율 없음">공동부담비율 없음</v-btn>
                      <v-btn color="primary" class="flex-grow-1" value="10|공동부담비율 10%">공동부담비율 10%</v-btn>
                      <v-btn color="primary" class="flex-grow-1" value="20|공동부담비율 20%">공동부담비율 20%</v-btn>
                    </v-btn-toggle>
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>보상한도</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col w-100">
                    <v-btn-toggle v-model="insuranceDTO.insr_clm_lt_amt" name="insr_clm_lt_amt" divided variant="outlined" class="align-stretch w-100" :disabled="isReadOnlyAll">
                      <v-btn color="primary" class="flex-grow-1" value="50000000|5천만원">5천만원</v-btn>
                      <v-btn color="primary" class="flex-grow-1" value="100000000|1억원">1억원</v-btn>
                      <v-btn color="primary" class="flex-grow-1" value="150000000|1억5천만원">1억5천만원</v-btn>
                    </v-btn-toggle>
                    <p class="text-caption font-weight-light mt-2"><i class="mdi mdi-alert-circle-outline mr-2"></i>1 청구당 / 연간총보상한도</p>
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>자기부담금</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col w-100">
                    <v-btn-toggle v-model="insuranceDTO.insr_psnl_brdn_amt" name="insr_psnl_brdn_amt" divided variant="outlined" class="align-stretch w-100" :disabled="isReadOnlyAll">
                      <v-btn color="primary" class="flex-grow-1" value="3000000|3백만원">3백만원</v-btn>
                      <v-btn color="primary" class="flex-grow-1" value="5000000|5백만원">5백만원</v-btn>
                      <v-btn color="primary" class="flex-grow-1" value="7000000|7백만원">7백만원</v-btn>
                      <v-btn color="primary" class="flex-grow-1" value="10000000|1천만원">1천만원</v-btn>
                    </v-btn-toggle>
                    <p class="text-caption font-weight-light mt-2"><i class="mdi mdi-alert-circle-outline mr-2"></i>1 청구당</p>
                  </div>
                </v-col>
              </v-row>
              <p class="text-body-2 text-error mt-4 text-center bg-lighterror py-4"><i class="mdi mdi-alert-circle-outline mr-2"></i> 보험기간중 조건변경이 되지 않으니 신중하게 선택하여 가입해주시기 바랍니다.</p>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-col class="pa-0 d-flex justify-center">
              <v-btn size="x-large" variant="outlined" color="dark" v-if="tab > 1 && tab < 4" @click="tab = (parseInt(tab) - 1).toString()" class="mr-4">이전</v-btn>
              <v-btn size="x-large" variant="flat" color="dark" @click="onNextPage()">다음</v-btn>
            </v-col>
          </v-row>
        </v-window-item>
        <!-- 보험가입 종료 -->

        <!-- 약관동의 시작 -->
        <v-window-item value="3" :disabled="isReadOnlyAll">
          <v-row class="v-box-table">
            <v-col cols="12" class="px-16 py-10">
              <h3 class="text-h6 font-weight-bold">약관 동의</h3>

              <v-table class="v-board-table mt-10">
                <tbody>
                  <tr>
                    <td>
                      <span class="text-16">신청내용 확인</span>
                    </td>
                    <td>
                      <VCheckBoxWithValidation v-model="insuranceDTO.agr10_yn" name="agr10_yn" label="확인함 (필수)" class="v-checkbox" :disabled="isReadOnlyAll" />
                    </td>
                    <td>
                      <v-btn color="gray" variant="outlined" class="ml-4" @click="onInsuranceFormOpen(false)">보기</v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="text-16">보험 약관 확인</span>
                    </td>
                    <td>
                      <VCheckBoxWithValidation v-model="insuranceDTO.agr20_yn" name="agr20_yn" label="확인함 (필수)" class="v-checkbox" :disabled="isReadOnlyAll" />
                    </td>
                    <td>
                      <v-btn color="gray" variant="outlined" class="ml-4"
                        >보기
                        <v-dialog persistent v-model="dialog2" activator="parent" scrollable max-width="1000">
                          <v-btn variant="outlined" color="dark" @click="dialog2 = false" class="position-absolute right-0 mt-3 mr-4 z-index-1">닫기</v-btn>
                          <!-- 보험 약관 확인-->
                          <TermsOfPolicy></TermsOfPolicy>
                        </v-dialog>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="text-16">계약 체결·이행 등을 위한 개인(신용)정보 처리 동의</span>
                    </td>
                    <td>
                      <VCheckBoxWithValidation v-model="insuranceDTO.agr30_yn" name="agr30_yn" label="동의함 (필수)" class="v-checkbox" @click="isTermsOfContractDialog = true" :disabled="isReadOnlyAll" />
                    </td>
                    <td>
                      <v-btn color="gray" variant="outlined" class="ml-4" @click="isTermsOfContractDialog = true">보기</v-btn>
                      <TermsOfContract :agr31_yn="insuranceDTO.agr31_yn" :agr32_yn="insuranceDTO.agr32_yn" :agr33_yn="insuranceDTO.agr33_yn" :agr34_yn="insuranceDTO.agr34_yn" :isReadonly="isReadOnlyAll" v-if="isTermsOfContractDialog" @close="onTermsOfContractClose"></TermsOfContract>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="text-16">상품설명확인서 확인</span>
                    </td>
                    <td>
                      <VCheckBoxWithValidation v-model="insuranceDTO.agr40_yn" name="agr40_yn" label="확인함 (필수)" class="v-checkbox" @click="isTermsOfPolicyDialog = true" :disabled="isReadOnlyAll" />
                    </td>
                    <td>
                      <v-btn color="gray" variant="outlined" class="ml-4" @click="isTermsOfPolicyDialog = true">보기</v-btn>
                      <TermsOfInsurance :agr41_yn="insuranceDTO.agr41_yn" :isReadonly="isReadOnlyAll" v-if="isTermsOfPolicyDialog" @close="onTermsOfInsuranceClose"></TermsOfInsurance>
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <ul class="list-style-type-coution text-14 word-break-keep-all text-gray line-height-1-4 mt-4 pl-4">
                <li>귀하는 계약체결&middot;이행 등을 위한 개인(신용)정보처리 동의를 거부하실 수 있으며, 동의를 철회할 수 있습니다.<br />단, 본 동의는 보험계약의 체결을 위해 필수적인 사항이므로 동의를 거부하시는 경우 관련 업무수행이 불가능합니다.</li>
              </ul>

              <ul class="list-style-size-small list-style-type-disc text-14 mt-8 pl-5">
                <li>이 보험상품은 한국공인회계사 감사반연합회 단체계약자, 가입 회원을 피보험자로 하는 단체계약 프로그램입니다.</li>
                <li>보험회사 : DB손해보험㈜ <span class="text-caption mx-3">|</span>보험중개사 : 록톤컴퍼니즈코리아손해보험중개(주)</li>
                <li>
                  보험료 입금 계좌번호 :
                  <b class="font-weight-medium text-error text-18">신한은행 140-005-862099</b><span class="text-caption mx-3">|</span>예금주 :
                  <b class="font-weight-medium text-error text-18">록톤컴퍼니즈코리아</b>
                </li>
              </ul>
            </v-col>
            <v-col cols="12" class="px-14 py-10 border-top-lightgray-1">
              <p class="word-break-keep-all line-height-1-4">상기와 같이 보험계약사항을 확인하고 전문직업배상책임보험 가입을 신청합니다.</p>
              <p class="word-break-keep-all line-height-1-4 mt-2">피보험자는 동 웹사이트 회원가입, 로그인 후 작성한 가입 신청 문서확인/개인정보처리 동의 사항 인증절차를 승인함으로써 피보험자 서명에 갈음한 것으로 동의하며 이를 확인합니다.</p>
              <div class="d-flex justify-end my-2">
                <VCheckBoxWithValidation v-model="insuranceDTO.agr50_yn" name="agr50_yn" label="확인함 (필수)" class="v-checkbox flex-grow-0" :disabled="isReadOnlyAll" />
              </div>
              <div class="text-right">
                <p class="text-body-2">
                  가입신청일 :
                  <span class="d-inline-block w-sm-110 px-4 py-1">{{ insuranceDTO.insr_reg_dt }}</span>
                </p>
                <p class="text-body-2 mt-2">
                  피보험자 :
                  <span class="d-inline-block w-sm-110 px-4 py-1">{{ insuranceDTO.user_nm }}</span>
                </p>
              </div>
              <div class="d-flex justify-space-between align-center">
                <!-- <v-checkbox label="(필수) 본인은 상기 신청 내용에 대하여 동의합니다." value="step2-check-4" hide-details="auto" class="v-checkbox" v-model="insuranceDTO.AGR_DATA.AGR5_YN" true-value="Y" false-value="N"></v-checkbox> -->
                <!-- <v-btn variant="outlined" color="primary" class="bg-white">가입 신청서 미리보기</v-btn> -->
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-col class="pa-0 d-flex justify-center">
              <v-btn size="x-large" variant="outlined" color="dark" v-if="tab > 1" @click="tab = (parseInt(tab) - 1).toString()" class="mr-4">이전</v-btn>
              <v-btn size="x-large" variant="flat" color="primary" type="submit" depressed v-if="!isReadOnlyAll">최종 제출</v-btn>
              <v-btn size="x-large" variant="flat" color="primary" type="submit" depressed v-if="isReadOnlyAll" to="/contract/ACC/V_TACC0030A10">목록</v-btn>
            </v-col>
          </v-row>
        </v-window-item>
        <!-- 약관동의 종료 -->
      </v-window>
    </v-col>

    <!-- 보험 요약 시작 -->
    <v-col cols="4" v-if="tab > 1">
      <div class="position-sticky sticky-top v-box-table">
        <v-row class="mx-10 py-6">
          <v-col cols="12" class="mb-1">
            <p class="font-weight-medium">보험계약정보</p>
          </v-col>
          <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">보험기간</p>
            <p class="text-body-2 text-right">{{ insuranceDTO.insr_st_dt }} ~ {{ insuranceDTO.insr_cncls_dt }}</p>
          </v-col>
          <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">공동부담비율</p>
            <p class="text-body-2 text-right">
              {{ insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(1) }}
            </p>
          </v-col>
          <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">보상한도(1청구당/연간총)</p>
            <p class="text-body-2 text-right">
              {{ insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1) }} /
              {{ insuranceDTO?.insr_year_clm_lt_amt }}
            </p>
          </v-col>
          <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">자기부담금(1청구당)</p>
            <p class="text-body-2 text-right">
              {{ insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1) }}
            </p>
          </v-col>

          <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">기준보험료</p>
            <p class="text-body-2 text-right">{{ Number(insuranceDTO.insr_base_amt).toLocaleString() }} 원</p>
          </v-col>

          <!-- 개인만 보여주는 영역 시작 -->
          <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">할인 및 할증율</p>
            <p class="text-body-2 text-right">{{ insuranceDTO.insr_sale_rt }} % 적용</p>
          </v-col>
          <!-- 개인만 보여주는 영역 끝 -->
        </v-row>

        <v-row class="px-10 py-6 border-top-lightgray-1">
          <v-col cols="12">
            <p class="text-h6 font-weight-medium color-primary">최종 보험료</p>
            <p class="text-h6 font-weight-medium color-primary text-right">{{ Number(insuranceDTO?.insr_tot_amt)?.toLocaleString() }}원</p>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <!-- 보험 요약 종료 -->
  </v-row>

  <!-- 완료영역 시작 -->
  <v-row justify="center" v-if="isSubmit">
    <v-col cols="12" sm="6" class="text-center">
      <v-card class="v-box-table mt-16 mb-12">
        <v-card-text class="px-14 py-16">
          <v-avatar color="success" size="x-large">
            <vue-feather type="check" class="feather-xlg"></vue-feather>
          </v-avatar>
          <p class="text-h5 font-weight-medium mt-10"><span class="text-primary">신청서 제출</span>이 완료되었습니다.</p>
          <v-divider class="my-8" />
          <p class="text-18 mt-8">신청서 확인 후, 보험료를 납부하여 주시기 바랍니다.</p>
          <p class="text-16 text-gray"><i class="mdi mdi-alert-circle-outline mr-1"></i><span class="color-primary">회계사 성명과 등록번호</span>를 함께 기재하여 송금해주시기 바랍니다.</p>

          <v-divider class="my-8" />
          <p class="text-18 mt-8">신청서를 출력하시겠습니까?</p>
          <v-row class="mt-10">
            <v-col class="pa-0 d-flex justify-center">
              <v-btn size="x-large" variant="flat" color="primary" class="mr-4" @click="onInsuranceFormOpen(true)">출력</v-btn>
              <v-btn size="x-large" variant="outlined" color="dark" to="/contract/ACC/V_TACC0030A10" depressed>가입조회</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!-- 완료영역 종료 -->

  <!--LAYER : 주소검색 -->
  <v-dialog persistent v-model="isDaumPostDialog" width="600">
    <v-card>
      <v-card-text>
        <div class="d-flex justify-space-between">
          <h3 class="text-h6 font-weight-bold">사무소 주소검색</h3>
          <v-avatar color="dark" @click="isDaumPostDialog = false" class="pointer-cursor">
            <v-icon small title="닫기">mdi-close</v-icon>
          </v-avatar>
        </div>

        <VueDaumPostcode @complete="onComplete_DaumPost"></VueDaumPostcode>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!--LAYER : 보험료 -->
  <v-dialog persistent v-model="isInsrTableDialog" width="1000px">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <h3 class="text-h6 font-weight-bold">보험료표</h3>
        <v-btn variant="outlined" color="dark" @click="isInsrTableDialog = false">닫기</v-btn>
      </v-card-title>
      <v-divider class="ma-0" />
      <v-card-text class="pa-0">
        <V_TACC0030P10 :baseYear="insuranceDTO.insr_year" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

  <!-- 가입신청서 시작 -->
  <V_TACC0030P20 :insurance_dto="insuranceDTO" :isPdf="isPdf" v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
  <!-- 가입증명서 종료 -->
</template>

<style scope>
.v-expansion-panel-checkbox {
  position: relative;
}
.v-expansion-panel-checkbox .v-checkbox {
  position: absolute;
  z-index: 1;
}
.v-expansion-panel-text__wrapper {
  height: 10vh;
  overflow-y: scroll;
}
</style>

<script setup lang="ts">
import { ref, watch, onMounted, computed, onBeforeUpdate } from 'vue';
import { useRoute } from 'vue-router';
import { Form, Field, useForm } from 'vee-validate';
import { UserDTO, InsuranceDTO, CBRDataDTO } from '@/model';
import { InsuranceYup } from '@/schema';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import router from '@/router';
import dayjs from 'dayjs';

import { isLeapYear, getDateDiff, calByString } from '../../../util/util';
import { MessageBoxDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';

import apiUser from '@/api/api/user.api';
import apiContract from '@/api/api/A_CONTRACT';

import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import V_TACC0030P10 from './V_TACC0030P10.vue';
import V_TACC0030P20 from '@/views/contract/ACC/V_TACC0030P20.vue';

import TermsOfPolicy from './V_TACC0030P01.vue'; // PDF 다운로드로 대체 예정
import TermsOfInsurance from './V_TACC0030P02.vue'; // 상품설명확인서 확인
import TermsOfContract from './V_TACC0030P03.vue'; // 계약 체결·이행 등을 위한 개인(신용)정보 처리동의

const route = useRoute();

const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

let INSR_RATE_TABLE = ref([]);
const onLoading = ref(false);
const isPdf = ref(false);
const isSubmit = ref(false);
const isReadOnlyAll = ref(false);

// 초기정보 설정
const userDTO = ref(new UserDTO());
const insuranceDTO = ref(new InsuranceDTO());
const messageBoxDTO = ref(new MessageBoxDTO());

// 오늘일자
let today = dayjs().format('YYYY-MM-DD');

const tab = ref(1);

const page = ref({
  title: '전문인배상책임보험 가입',
  subtitle: '',
  image: '/assets/images/background/bg-subscription1.jpg'
});

const breadcrumbs = ref([
  {
    text: '가입/조회/출력',
    disabled: false,
    to: '#'
  },
  {
    text: '가입',
    disabled: false,
    to: '#'
  }
]);

const dialog2 = ref(false);

const isInsuranceFormDialog = ref(false);
const isTermsOfContractDialog = ref(false);
const isTermsOfPolicyDialog = ref(false);

const isDaumPostDialog = ref(false);
const isInsrTableDialog = ref(false);

function onTermsOfContractClose(agrs: any) {
  isTermsOfContractDialog.value = false;
  insuranceDTO.value.agr30_yn = agrs.value.agr30_yn;
  insuranceDTO.value.agr31_yn = agrs.value.agr31_yn;
  insuranceDTO.value.agr32_yn = agrs.value.agr32_yn;
  insuranceDTO.value.agr33_yn = agrs.value.agr33_yn;
  insuranceDTO.value.agr34_yn = agrs.value.agr34_yn;
}

function onTermsOfInsuranceClose(agrs: any) {
  isTermsOfPolicyDialog.value = false;
  insuranceDTO.value.agr40_yn = agrs.value.agr40_yn;
  insuranceDTO.value.agr41_yn = agrs.value.agr41_yn;
}

/**
 * 보험가입신청서 팝업호출
 * @param param
 */
const onInsuranceFormOpen = (isPdfOption: boolean) => {
  isPdf.value = isPdfOption;
  isInsuranceFormDialog.value = true;
};

function onInsuranceFormClose() {
  isInsuranceFormDialog.value = false;
}

function onNextPage(values: any) {
  tab.value = (parseInt(tab.value) + 1).toString();
}

const actionType = ref('');
const insuranceUUID = ref('');
const insuranceNO = ref('');
/**
 * 초기로딩시 가입 / 수정 / 조회 를 선택해서 보여준다.
 */
onMounted(async () => {
  isReadOnlyAll.value = true;
  insuranceUUID.value = route.params.insuranceUUID;

  if (insuranceUUID.value == '') {
    router.push('/404');
  } else {
    const params = { insurance_uuid: insuranceUUID.value };
    const resultData = await apiContract.getDBSel(params);
    Object.assign(insuranceDTO.value, resultData.data[0]);

    onLoading.value = true;
  }
});
</script>
