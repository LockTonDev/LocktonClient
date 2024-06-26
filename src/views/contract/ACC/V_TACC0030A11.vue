<template>
  <BaseBreadcrumb
    :title="page.title"
    :subtitle="page.subtitle"
    :breadcrumbs="breadcrumbs"
    :image="page.image"
  ></BaseBreadcrumb>
  <Form
    as="v-form"
    keep-values
    @submit="onSubmit"
    :initial-values="insuranceDTO"
    v-if="!isSubmit"
  >
    <!-- 개인회원 -->
    <v-row class="mt-10">
      <v-col cols="12" sm="12">
        <div class="v-stepbox">
          <v-tabs
            v-model="tab"
            color="primary"
            next-icon="mdi-arrow-left"
            prev-icon="mdi-arrow-left"
          >
            <v-tab value="1" class="flex-grow-1" :disabled="true">가입정보</v-tab>
            <v-tab value="2" class="flex-grow-1" :disabled="true">보험계약 {{ renewalYN == 'Y'?'(갱신)':'' }}</v-tab>
            <v-tab value="3" class="flex-grow-1" :disabled="true">약관동의</v-tab>
          </v-tabs>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-16" justify="center" v-if="onLoading">
      <v-col :cols="checkMobile.isMobile?'12':'8'" :class="checkMobile.isMobile?'pa-2':''">
        <v-window v-model="tab" disabled="true">
          <!-- 가입정보 Tab 시작 -->
          <v-window-item value="1">
            <v-row :class="checkMobile.isMobile?'v-box-table px-1 py-5':'v-box-table px-14 py-10'">
              <v-col cols="12" sm="12" class="v-col">
                <div class="d-flex flex-wrap">
                  <h3 class="text-h6 font-weight-bold">가입정보 입력</h3>
                </div>
                <p class="text-body-2 color-gray-shadow">
                  <sup class="text-error">*</sup>는 필수 입력입니다.
                </p>
              </v-col>
              <v-col cols="12" :class="checkMobile.isMobile?'pt-2':'pt-6'">
                <v-row
                  class="v-board-table"
                >
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
                  <v-col
                    cols="12"
                    sm="6"
                    class="v-col"
                  >
                    <div class="head-col">
                      <p>등록번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.user_regno }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>휴대전화</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">{{insuranceDTO.corp_cust_hpno}}</div>
                  </v-col>

                  <v-divider class="border-0" />

                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_nm"
                        name="corp_nm"
                        placeholder="사무소명"
                        single-line
                        density="comfortable"
                        maxlength="20"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사업자번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_cnno"
                        name="corp_cnno"
                        placeholder="사업자번호"
                        :maskOption="{ mask: '###-##-#####' }"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소 전화</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col col-tel">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno1"
                        name="corp_telno1"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '###' }"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno2"
                        name="corp_telno2"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno3"
                        name="corp_telno3"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                      />
                      
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소 팩스</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col col-fax">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_faxno1"
                        name="corp_faxno1"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                        :readonly="isReadOnlyAll"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_faxno2"
                        name="corp_faxno2"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                        :readonly="isReadOnlyAll"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_faxno3"
                        name="corp_faxno3"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                        :readonly="isReadOnlyAll"
                      />
                      <!-- <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_faxno"
                        name="corp_taxno"
                        label="사무소 팩스"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      /> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>담당자 성명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_cust_nm"
                        name="corp_cust_nm"
                        placeholder="담당자 성명"
                        single-line
                        density="comfortable"
                        maxlength="20"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>

                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>이메일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col extend">{{ insuranceDTO.corp_cust_email }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>사무소 주소<sup class="text-error">*</sup></p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_post"
                        name="corp_post"
                        placeholder="우편번호"
                        single-line
                        density="comfortable"
                        readonly
                        style="width: 80px;"
                      />
                      <v-btn
                        :size="checkMobile.isMobile?'small':'default'"
                        variant="outlined"
                        color="primary"
                        @click="isDaumPostDialog = true"
                        class="ml-2"
                        v-if="!isReadOnlyAll"
                        >사무소 주소검색</v-btn
                      >
                      <v-divider class="border-0" />
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_addr"
                        name="corp_addr"
                        placeholder="주소"
                        single-line
                        density="comfortable"
                        class="w-full"
                        maxlength="40"
                        readonly
                      />
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_addr_dtl"
                        name="corp_addr_dtl"
                        placeholder="상세주소"
                        single-line
                        density="comfortable"
                        class="w-full"
                        maxlength="25"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <!-- 개인 끝-->

              <v-row>
                <v-col cols="12">
                  <div class="mt-6 pa-8 bg-background">
                    <p class="text-body-1 font-weight-medium">
                      <i class="mdi mdi-alert-circle-outline mr-2"></i>유의사항
                    </p>
                    <ul class="pl-3 text-body-2 mt-2 list-style-type-bull">
                      <li>가입정보에 수정 작성하는 내용(주소, 전화번호 등)은 회원 정보에 동일하게 반영되오니 신중히 기입하여 주시기 바랍니다.</li>
                      <li>가입정보에서 수정되지 않는 정보는 마이페이지-회원정보에서 수정하여 주시기 바랍니다.</li>
                    </ul>
                  </div>
                </v-col>
              </v-row>

            </v-row>
 
            <v-row class="mt-10">
              <v-col class="d-flex justify-center pa-0">
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="outlined"
                  color="dark"
                  @click="onCancel"
                  class="mr-4"
                  >취소</v-btn
                >
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="flat"
                  color="dark"
                  v-if="!isDuplication"
                  @click="onNextPage()"
                  >다음</v-btn
                >
              </v-col>
            </v-row>
          </v-window-item>
          <!-- 가입정보 Tab 종료 -->

          <!-- 보험가입 시작 -->
          <v-window-item value="2" :disabled="isReadOnlyAll">
            <!-- <div>
              <v-btn variant="tonal">테스트를 하기 위한 임시 영역 : </v-btn>
              <v-btn variant="tonal" @click="onTest('IND')">개인</v-btn>
              <v-btn variant="tonal" @click="onTest('COR')">법인</v-btn>
            </div> -->

            <v-row :class="checkMobile.isMobile?'v-box-table py-5':'v-box-table py-10'">
              <v-col cols="12" sm="12" :class="checkMobile.isMobile?'px-2':'px-14 v-col'">
                <div class="d-flex flex-wrap">
                  <div class="d-flex align-center">
                    <h3 class="text-h6 font-weight-bold">보험 계약</h3>
                  </div>
                  <v-spacer />
                  <v-btn
                    variant="outlined"
                    color="primary"
                    class="ml-auto flex-grow-0"
                    @click="isInsrTableDialog = true"
                    >보험료표 보기</v-btn
                  >
                </div>
                <p class="text-body-2 color-gray-shadow">
                  <sup class="text-error">*</sup>는 필수 입력입니다.
                </p>
                <p class="text-body-2 color-gray-shadow" v-if="renewalYN == 'Y'">직전년도 가입조건이 자동 표시되며, 변경 가능합니다.</p> <!--갱신자의 경우 문구 노출-->
              </v-col>
              <v-col cols="12" sm="12" :class="checkMobile.isMobile?'py-0 px-2 mt-5':'py-0 px-14 mt-10'">
                <v-row class="v-board-table">
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>보험기간</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div :class="checkMobile.isMobile?'data-col date':'data-col justify-space-between date'">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_st_dt"
                        name="insr_st_dt"
                        placeholder="보험시작일자"
                        type="date"
                        single-line
                        density="comfortable"
                        :min="insuranceDTO.insr_st_dt"
                        :max="insuranceDTO.insr_cncls_dt"
                        :readonly="isReadonlyByInsrStDt()"
                      />
                      <p class="mx-2">00:01 부터</p>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_cncls_dt"
                        name="insr_cncls_dt"
                        placeholder="보험종료일자"
                        type="date"
                        single-line
                        density="comfortable"
                        readonly
                      />
                      <p class="ml-2">00:01 까지</p>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="v-col"
                  >
                    <div class="head-col">
                      <p>소급담보일</p>
                    </div>
                    <div class="data-col"> {{ insuranceDTO.insr_retr_dt }}</div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col"><p>무사고 할인 /<br />사고 할증</p></div>
                    <div class="data-col text-center" >{{ insuranceDTO.insr_sale_rt }} %
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>공동부담비율</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100">
                      <v-btn-toggle
                        v-model="insuranceDTO.insr_pblc_brdn_rt"
                        name="insr_pblc_brdn_rt"
                        divided
                        variant="outlined"
                        density="comfortable"
                        class="w-100"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="0|공동부담비율 없음"
                          :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: 7px !important':''"
                          >공동부담비율 없음</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="10|공동부담비율 10%"
                          :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: 7px !important':''"
                          >공동부담비율 10%</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="20|공동부담비율 20%"
                          :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: 7px !important':''"
                          >공동부담비율 20%</v-btn
                        >
                      </v-btn-toggle>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>보상한도</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100">
                      <v-btn-toggle
                        v-model="insuranceDTO.insr_clm_lt_amt"
                        name="insr_clm_lt_amt"
                        divided
                        variant="outlined"
                        class="align-stretch w-100"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="50000000|5천만원"
                          >5천만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="100000000|1억원"
                          >1억원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="150000000|1억5천만원"
                          >1억5천만원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당 / 연간총보상한도
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>자기부담금</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100">
                      <v-btn-toggle
                        v-model="insuranceDTO.insr_psnl_brdn_amt"
                        name="insr_psnl_brdn_amt"
                        divided
                        variant="outlined"
                        class="align-stretch w-100"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          :style="checkMobile.isMobile?'flex-basis: 25%; border: 1px solid #EEEEEE; text-align: center;min-width: 20px !important':''"
                          value="3000000|3백만원"
                          >3백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          :style="checkMobile.isMobile?'flex-basis: 25%; border: 1px solid #EEEEEE; text-align: center;min-width: 20px !important':''"
                          value="5000000|5백만원"
                          >5백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          :style="checkMobile.isMobile?'flex-basis: 25%; border: 1px solid #EEEEEE; text-align: center;min-width: 20px !important':''"
                          value="7000000|7백만원"
                          >7백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          :style="checkMobile.isMobile?'flex-basis: 25%; border: 1px solid #EEEEEE; text-align: center;min-width: 20px !important':''"
                          value="10000000|1천만원"
                          >1천만원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당
                      </p>
                    </div>
                  </v-col>
                </v-row>
                <p class="text-body-2 text-error mt-4 text-center bg-lighterror py-4">
                  <i class="mdi mdi-alert-circle-outline mr-2"></i> 보험기간중
                  조건변경이 되지 않으니 신중하게 선택하여 가입해주시기
                  바랍니다.
                </p>
              </v-col>
            </v-row>
            <v-row class="mt-10">
              <v-col class="pa-0 d-flex justify-center">
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="outlined"
                  color="dark"
                  v-if="tab > 1 && tab < 4"
                  @click="tab = (parseInt(tab) - 1).toString()"
                  class="mr-4"
                  >이전</v-btn
                >
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="flat"
                  color="dark"
                  @click="onNextPage()"
                  >다음</v-btn
                >
              </v-col>
            </v-row>
          </v-window-item>
          <!-- 보험가입 종료 -->

          <!-- 약관동의 시작 -->
          <v-window-item value="3" :disabled="isReadOnlyAll">
            <v-row class="v-box-table">
              <v-col cols="12" :class="checkMobile.isMobile?'px-2 py-10':'px-16 py-10'">
                <h3 class="text-h6 font-weight-bold">약관 동의</h3>
                <v-table :class="checkMobile.isMobile?'v-board-table mt-10 remove-padding':'v-board-table mt-10'">
                  <tbody>
                    <tr>
                      <td>
                        <span class="text-16">신청내용 확인</span>
                      </td>
                      <td>
                        <VCheckBoxWithValidation
                          v-model="insuranceDTO.agr10_yn"
                          name="agr10_yn"
                          label="확인함 (필수)"
                          class="v-checkbox"
                          :disabled="isReadOnlyAll"
                        />
                      </td>
                      <td>
                        <v-btn
                          :size="checkMobile.isMobile?'small':'default'"
                          color="gray"
                          variant="outlined"
                          class="ml-4"
                          @click="onInsuranceFormOpen(false);"
                          >보기</v-btn
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="text-16">보험 약관 확인</span>
                      </td>
                      <td>
                        <VCheckBoxWithValidation
                          v-model="insuranceDTO.agr20_yn"
                          name="agr20_yn"
                          label="확인함 (필수)"
                          class="v-checkbox"
                          :disabled="isReadOnlyAll"
                        />
                      </td>
                      <td>
                        <v-btn color="gray" variant="outlined" class="ml-4" :size="checkMobile.isMobile?'small':'default'"
                          >보기
                          <v-dialog
                            persistent
                            v-model="dialog2"
                            activator="parent"
                            scrollable
                            max-width="1000"
                          >
                            <v-btn
                              variant="outlined"
                              color="dark"
                              @click="dialog2 = false"
                              class="position-absolute right-0 mt-3 mr-4 z-index-1"
                              >닫기</v-btn
                            >
                            <!-- 보험 약관 확인-->
                            <TermsOfPolicy></TermsOfPolicy>
                          </v-dialog>
                        </v-btn>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="text-16"
                          >계약 체결·이행 등을 위한 개인(신용)정보 처리
                          동의</span
                        >
                      </td>
                      <td>
                        <VCheckBoxWithValidation
                          v-model="insuranceDTO.agr30_yn"
                          name="agr30_yn"
                          label="동의함 (필수)"
                          class="v-checkbox"
                          @click="isTermsOfContractDialog = true"
                          :disabled="isReadOnlyAll"
                        />
                      </td>
                      <td>
                        <v-btn
                          :size="checkMobile.isMobile?'small':'default'"
                          color="gray"
                          variant="outlined"
                          class="ml-4"
                          @click="isTermsOfContractDialog = true"
                          >보기</v-btn
                        >
                        <TermsOfContract
                          :agr31_yn="insuranceDTO.agr31_yn"
                          :agr32_yn="insuranceDTO.agr32_yn"
                          :agr33_yn="insuranceDTO.agr33_yn"
                          :agr34_yn="insuranceDTO.agr34_yn"
                          :isReadonly="isReadOnlyAll"
                          v-if="isTermsOfContractDialog"
                          @close="onTermsOfContractClose"
                        ></TermsOfContract>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="text-16">상품설명확인서 확인</span>
                      </td>
                      <td>
                        <VCheckBoxWithValidation
                          v-model="insuranceDTO.agr40_yn"
                          name="agr40_yn"
                          label="확인함 (필수)"
                          class="v-checkbox"
                          @click="isTermsOfPolicyDialog = true"
                          :disabled="isReadOnlyAll"
                        />
                      </td>
                      <td>
                        <v-btn
                          :size="checkMobile.isMobile?'small':'default'"
                          color="gray"
                          variant="outlined"
                          class="ml-4"
                          @click="isTermsOfPolicyDialog = true"
                          >보기</v-btn
                        >
                        <TermsOfInsurance
                          :agr41_yn="insuranceDTO.agr41_yn"
                          :isReadonly="isReadOnlyAll"
                          v-if="isTermsOfPolicyDialog"
                          @close="onTermsOfInsuranceClose"
                        ></TermsOfInsurance>
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <ul
                  class="list-style-type-coution text-14 word-break-keep-all text-gray line-height-1-4 mt-4 pl-4"
                >
                  <li>
                    귀하는 계약체결&middot;이행 등을 위한 개인(신용)정보처리
                    동의를 거부하실 수 있으며, 동의를 철회할 수 있습니다.<br />단,
                    본 동의는 보험계약의 체결을 위해 필수적인 사항이므로 동의를
                    거부하시는 경우 관련 업무수행이 불가능합니다.
                  </li>
                </ul>

                <ul
                  class="list-style-size-small list-style-type-disc text-14 mt-8 pl-5"
                >
                  <li>
                    이 보험상품은 한국공인회계사 감사반연합회를 계약자로 하는 단체계약 프로그램입니다.
                  </li>
                  <li>
                    보험회사 : DB손해보험㈜ <template v-if="checkMobile.isMobile"><br/></template><template v-else><span class="text-caption mx-3">|</span></template>  보험중개사 : 록톤컴퍼니즈코리아손해보험중개(주)
                  </li>
                  <li>
                    보험료 입금 계좌번호 :
                    <b class="font-weight-medium text-error text-18"
                      >신한은행 140-005-862099</b
                    ><template v-if="checkMobile.isMobile"><br/></template><template v-else><span class="text-caption mx-3">|</span></template>예금주 :
                    <b class="font-weight-medium text-error text-18"
                      >록톤컴퍼니즈코리아</b
                    >
                  </li>
                </ul>
              </v-col>
              <v-col cols="12" :class="checkMobile.isMobile?'px-4 py-10 border-top-lightgray-1':'px-14 py-10 border-top-lightgray-1'">
                <p class="word-break-keep-all line-height-1-4">
                  상기와 같이 보험계약사항을 확인하고 전문직업배상책임보험
                  가입을 신청합니다.
                </p>
                <p class="word-break-keep-all line-height-1-4 mt-2">
                  피보험자는 동 웹사이트 회원가입, 로그인 후 작성한 가입 신청
                  문서확인/개인정보처리 동의 사항 인증절차를 승인함으로써
                  피보험자 서명에 갈음한 것으로 동의하며 이를 확인합니다.
                </p>
                <div class="d-flex justify-end my-2">
                  <VCheckBoxWithValidation
                    v-model="insuranceDTO.agr50_yn"
                    name="agr50_yn"
                    label="확인함 (필수)"
                    class="v-checkbox flex-grow-0"
                    :disabled="isReadOnlyAll"
                  />
                </div>
                <div class="text-right">
                  <p class="text-body-2">
                    가입신청일 :
                    <span class="d-inline-block w-sm-min-110 v-box px-4 py-1">{{
                      insuranceDTO.insr_reg_dt
                    }}</span>
                  </p>
                  <p class="text-body-2 mt-2">
                    피보험자 :
                    <span class="d-inline-block w-sm-min-110 v-box px-4 py-1">{{
                      insuranceDTO.user_nm
                    }}</span>
                  </p>
                </div>
                <div class="d-flex justify-space-between align-center">
                </div>
              </v-col>
            </v-row>
            <v-row class="mt-10">
              <v-col class="pa-0 d-flex justify-center">
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="outlined"
                  color="dark"
                  v-if="tab > 1"
                  @click="tab = (parseInt(tab) - 1).toString()"
                  class="mr-4"
                  >이전</v-btn
                >
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="flat"
                  color="primary"
                  type="submit"
                  depressed
                  v-if="!isReadOnlyAll"
                  >최종 제출</v-btn
                >
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="flat"
                  color="primary"
                  type="submit"
                  depressed
                  v-if="isReadOnlyAll"
                  to="/contract/ACC/V_TACC0030A10"
                  >목록</v-btn
                >
              </v-col>
            </v-row>
          </v-window-item>
          <!-- 약관동의 종료 -->
        </v-window>
      </v-col>

      <!-- 보험 요약 시작 -->
      <v-col :cols="checkMobile.isMobile?'12':'4'" v-if="tab > 1">
        <div class="position-sticky sticky-top v-box-table">
          <v-row class="mx-10 py-6">
            <v-col cols="12" class="mb-1">
              <p class="font-weight-medium">보험계약정보</p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">보험기간</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.insr_st_dt }} ~ {{ insuranceDTO.insr_cncls_dt }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">공동부담비율</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(1) }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">
                보상한도(1청구당/연간총)
              </p>
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
              <p class="text-body-2 text-right">
                {{ Number(insuranceDTO.insr_base_amt).toLocaleString() }} 원
              </p>
            </v-col>

            <!-- 개인만 보여주는 영역 시작 -->
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">할인 및 할증율</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.insr_sale_rt }}% 적용
              </p>
            </v-col>
            <!-- 개인만 보여주는 영역 끝 -->

          </v-row>

          <v-row class="px-10 py-6 border-top-lightgray-1">
            <v-col cols="12">
              <p class="text-h6 font-weight-medium color-primary">
                최종 보험료
              </p>
              <p class="text-h6 font-weight-medium color-primary text-right">
                {{ Number(insuranceDTO?.insr_tot_amt)?.toLocaleString() }}원
              </p>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <!-- 보험 요약 종료 -->
    </v-row>
  </Form>

  <!-- 완료영역 시작 -->
  <v-row justify="center" v-if="isSubmit">
    <v-col cols="12" sm="6" class="text-center">
      <v-card class="v-box-table mt-16 mb-12">
        <v-card-text class="px-14 py-16">
          <v-avatar color="success" size="x-large">
            <vue-feather type="check" class="feather-xlg"></vue-feather>
          </v-avatar>
          <p class="text-h5 font-weight-medium mt-10">
            <span class="text-primary">신청서 제출</span>이 완료되었습니다.
          </p>
          <v-divider class="my-8" />
          <p class="text-18 mt-8">
            신청서 확인 후, 보험료를 납부하여 주시기 바랍니다.
          </p>
          <p class="text-16 text-gray">
            <i class="mdi mdi-alert-circle-outline mr-1"></i
            ><span class="color-primary">회계사 성명과 등록번호</span>를 함께
            기재하여 송금해주시기 바랍니다.
          </p>

          <v-divider class="my-8" />
          <p class="text-18 mt-8">
            신청서를 출력하시겠습니까?
          </p>
          <v-row class="mt-10">
            <v-col class="pa-0 d-flex justify-center">
             
              <v-btn
                :size="checkMobile.isMobile?'default':'x-large'"
                variant="flat"
                color="primary"
                class="mr-4"
                @click="onInsuranceFormOpen(true);"
                >출력</v-btn
              >
              <v-btn
                :size="checkMobile.isMobile?'default':'x-large'"
                variant="outlined"
                color="dark"
                to="/contract/ACC/V_TACC0030A10"
                depressed
                >가입조회</v-btn
              >
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
          <v-avatar
          color="dark"              
          class="pointer-cursor"
          >
            <v-btn variant="none" color="white" @click="isDaumPostDialog = false">
              <v-icon small title="닫기">mdi-close</v-icon>
            </v-btn>
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
        <v-btn
          variant="outlined"
          color="dark"
          @click="isInsrTableDialog = false"
          >닫기</v-btn
        >
      </v-card-title>
      <v-divider class="ma-0"/>
      <v-card-text class="pa-0">
        <V_TACC0030P10 />
      </v-card-text>
    </v-card>
  </v-dialog>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

  <!-- 가입신청서 시작 -->
  <V_TACC0030P20 :insurance_dto="insuranceDTO" :isPdf=isPdf :isNotAuth=true v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
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
.v-stepbox .v-tabs .v-btn.v-btn--disabled {opacity: 1;}
</style>

<script setup lang="ts">
import { ref, watch, onMounted, computed, onBeforeUpdate  } from 'vue';
import { useRoute } from 'vue-router';
import { Form, Field, useForm } from 'vee-validate';
import { UserDTO, InsuranceDTO, CBRDataDTO, InsuranceRateDTO, CommonCode, MessageBoxDTO  } from '@/model';
import { InsuranceYup } from '@/schema';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import router from '@/router';
import dayjs from 'dayjs'


import { getDateDiff, calByString } from '../../../util/util';

import MessageBox from '@/components/MessageBox.vue';

import apiUser from '@/api/api/user.api';
import apiContract from '@/api/api/A_CONTRACT';

import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import V_TACC0030P10 from './V_TACC0030P10.vue';
import V_TACC0030P20 from "@/views/contract/ACC/V_TACC0030P20.vue";


import TermsOfPolicy from './V_TACC0030P01.vue';      // PDF 다운로드
import TermsOfInsurance from './V_TACC0030P02.vue';   // 상품설명확인서 확인
import TermsOfContract from './V_TACC0030P03.vue';    // 계약 체결·이행 등을 위한 개인(신용)정보 처리동의

import {useMobileStore} from "@/stores";
const checkMobile = useMobileStore();

const route = useRoute();

const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

const onLoading = ref(false);
const isPdf = ref(false);
const isSubmit = ref(false);
const isReadOnlyAll = ref(false);
const isDuplication = ref(false);
const renewalYN = ref('N');
const insuranceUUID = ref('');

const INSR_RATE_TABLE = ref([]);
const INSR_RATE_MAX_DAYS = ref(0);

// 초기정보 설정
const userDTO = ref(new UserDTO());
const insuranceDTO = ref(new InsuranceDTO());
const insuranceRateDTO = ref(new InsuranceRateDTO());
const insuranceDTOBackup = ref(new InsuranceDTO());
const messageBoxDTO = ref(new MessageBoxDTO());

//중복 최종제출을 막기 위한 FLAG
let preventDupClick = false

// 오늘일자
let TODAY = dayjs().format('YYYY-MM-DD');
let INSR_RETR_DT_TODAY = dayjs().format('YYYY-MM-DD');

const tab = ref('1');

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

const regionCdItems = ref([]);


const dialog2 = ref(false);

const isInsuranceFormDialog = ref(false);
const isTermsOfContractDialog = ref(false);
const isTermsOfPolicyDialog = ref(false);

const isDaumPostDialog = ref(false);
const isInsrTableDialog = ref(false);
function isReadonlyByInsrStDt()
{
  // console.log(insuranceDTO.value.base_insr_st_dt + ":" + TODAY + ":" + renewalYN.value + ":" + insuranceDTO.value.insr_retr_yn);///

  /**
   * 1. 법인은 보험시작일자를 변경 할 수 없다.
   * 2. 개인이면서 신규이면 항상 보험기간을 변경할 수 있게 한다
   * 3. 기준_보험시작일자가 소금담보일보다 작으면 갱신으로 판단하여 수정불가
   */
  if (insuranceDTO.value.user_cd === 'IND' && renewalYN.value !== 'Y') return false;
  if (insuranceDTO.value.base_insr_st_dt < insuranceDTO.value.insr_retr_dt) {
    return false;
  }
  
  return true;
}


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
  const onInsuranceFormOpen = (isPdfOption:boolean) => {
    isPdf.value = isPdfOption;
    isInsuranceFormDialog.value = true;

  }

function onInsuranceFormClose() {
  isInsuranceFormDialog.value = false;
}


/**
 * 보험료 계산
 *
 * @param sSDt  시작일자
 * @param sEDt  종료일자
 * @param sKey1 공동보험
 * @param sKey2 보상한도
 * @param sKey3 자기부담금
 * @param nRate 할인/할증률
 * @param nPCnt 인원수
 */
 const getInsrAmt = (
  sSDt: string,
  sEDt: string,
  sKey1: string,
  sKey2: string,
  sKey3: string,
  nRate: number,
  nPCnt: number
) => {

  if (!sKey1 || !sKey2 || !sKey3) return 0;

  let nTotAmt = 0;
  let nInitAmt = 0;
  let nDCnt = 0;
  
  // 공동보험할증 - 0 or 0.5
  let pblcBrdnRt = Number(insuranceDTO.value.insr_pblc_brdn_rt.getValueBySplit(0));

  let sKey = sKey1.getValueBySplit(0) + '|' + sKey2.getValueBySplit(0) + '|' + sKey3.getValueBySplit(0) 

  try {
    // 기간 계산
    nDCnt = getDateDiff(sSDt, sEDt, INSR_RATE_MAX_DAYS.value);
    // 기본보험료 조회
    nInitAmt = INSR_RATE_TABLE.value.기본담보.보험료.filter(data => data.key === sKey)[0].amt;
    
    // 보험 계산식 ( 기본금액 * 기간일수) * 할인할증률  10원단위 절사
    nTotAmt = (nInitAmt *  (nDCnt / INSR_RATE_MAX_DAYS.value)) * (1 + nRate / 100);
    // 10원단위 절사
    nTotAmt = Math.floor(nTotAmt / 10) * 10;


  } catch (err) {
    console.log(err);
    nTotAmt = 0;
  }

  // 계산불가 일 경우 0으로 설정
  if (isNaN(nTotAmt)) nTotAmt = 0;

  return nTotAmt;
};


function onComplete_DaumPost(result: VueDaumPostcodeCompleteResult) {
  insuranceDTO.value.corp_post = result.zonecode;
  insuranceDTO.value.corp_addr = result.address;

  isDaumPostDialog.value = false;
}

function onCancel() {
  router.push(`/contract/${_AUTH_USER.value.businessCd}/V_T${_AUTH_USER.value.businessCd}0030A10`);
}

async function onNextPage(values: any) {
  if (!await checkValidation()) return false;
  if (isDuplication.value) return false;
  tab.value = (parseInt(tab.value) + 1).toString();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMessageBoxByInsrDt() {
  return true;
  messageBoxDTO.value.setInfo(
    '보험기간 소급가입',
    '소급가입을 원하시는 경우 록톤코리아(02-2011-0300)로 연락주시기 바랍니다.'
  );
}


async function checkValidation() {
  const selectedTab = tab.value;
  const validationSchema = InsuranceYup[`${insuranceDTO.value.business_cd}_${insuranceDTO.value.user_cd}_TAB${tab.value}`];
  const isValidate = await validationSchema.validate(insuranceDTO.value, { abortEarly: false })
    .then(() => {
      return true;
    })
    .catch(error => {
      // 유효성 검사 실패
      console.log(error.inner)
      messageBoxDTO.value.setWarning( '입력확인', error.inner[0].message);
      return false;
    });

  return isValidate;
}

/**
 * 가입
 * @param values 가입 정보
 */
async function onSubmit(params: any) {
  if(preventDupClick) {
    alert("최종 제출이 진행 중입니다. 잠시만 기다려주세요.")
    return false
  }
  preventDupClick = true;

  if (!await checkValidation()) {
    preventDupClick = false;
    return false;
  }
  
  let result;
  if(insuranceDTO.value.insurance_uuid == '') {
    //insuranceDTO.value.insr_year = insuranceDTO.value.insr_st_dt.substring(0,4);
    result = await apiContract.setDBIns(insuranceDTO.value);
  }else if(insuranceDTO.value.status_cd === '10') {
    result = await apiContract.setDBUpd(insuranceDTO.value);
  }else {
    alert('조회 상태에서는 저장할 수 없습니다.');
    preventDupClick = false;
    return false;

  }

  if(result.success) {
    isSubmit.value = true;
  }else {
   
    if (result.message === "DUPLICATION_FAILED") {
      messageBoxDTO.value.setWarning(
        '가입 이력이 있습니다.',
        `세무사 명단 중 이미 보험계약이 되어있는 회원이 있습니다.<br/>퇴사자 등이 있는 경우 명단에서 삭제 후 재신청 바랍니다.
         <br/>(추가문의 : 록톤코리아 02-2011-0300)`
      );
    } else {
      alert("보험가입 실패");
    }
  }
  preventDupClick = false;
}

/**
 * 회원정보 업데이트
 * 
 * @param values
 */
async function getUserInfoToSetUserInfoByInsurance() {
  const userResult = await apiUser.getUserInfo();
  
  /**
   * Object.assign 시 동일컬럼이 덮어 씌워지는 오류 있음
   * 
   * 해당컬럼 제외시키던지 백업후 재설정해줘야함
   * 
   * 현재는 백업후 재설정해주고 있음
   * 
   * 상태값 : status_cd
   * 
   */

  // 사용자DTO
  Object.assign(userDTO.value, userResult[0]);

  // 제외 컬럼
  const status_cd = insuranceDTO.value.status_cd;
  
  // 가입정보DTO
  Object.assign(insuranceDTO.value, userDTO.value);

  // 재설정
  insuranceDTO.value.status_cd = status_cd;


  insuranceDTO.value.user_cd = userDTO.value.user_cd;
  insuranceDTO.value.user_nm = userDTO.value.user_nm;
  insuranceDTO.value.corp_region_cd = userDTO.value.corp_region_cd;
  insuranceDTO.value.corp_nm = userDTO.value.corp_nm;
  insuranceDTO.value.corp_cnno = userDTO.value.corp_cnno;
  insuranceDTO.value.corp_cust_email = userDTO.value.user_email;
  insuranceDTO.value.corp_cust_hpno = userDTO.value.user_hpno;

  // 개인 가입정보 설정
  insuranceDTO.value.user_birth = userDTO.value.user_birth;
  insuranceDTO.value.user_regno = userDTO.value.user_regno;

  // 개인일 경우에는 명단이 없으나 총 1명으로 계산한다.
  insuranceDTO.value.cbr_cnt = 1;
  insuranceDTO.value.corp_type = '';
  insuranceDTO.value.corp_bnno = '';

}

/**
 * 보험계약 - 보험료 계산
 */
watch(
  () => [
    insuranceDTO.value.insr_st_dt,
    insuranceDTO.value.insr_cncls_dt,
    insuranceDTO.value.insr_pblc_brdn_rt,
    insuranceDTO.value.insr_clm_lt_amt,
    insuranceDTO.value.insr_psnl_brdn_amt,
    insuranceDTO.value.user_cd,
    insuranceDTO.value.insr_sale_rt
  ],
  (newValue, oldValue) => {

    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    // 기준보험료 계산
    insuranceDTO.value.insr_base_amt = getInsrAmt(
      null,
      null,
      insuranceDTO.value.insr_pblc_brdn_rt,
      insuranceDTO.value.insr_clm_lt_amt,
      insuranceDTO.value.insr_psnl_brdn_amt,
      0,
      1
    );

    insuranceDTO.value.insr_amt = getInsrAmt(
        insuranceDTO.value.insr_st_dt,
        insuranceDTO.value.insr_cncls_dt,
        insuranceDTO.value.insr_pblc_brdn_rt,
        insuranceDTO.value.insr_clm_lt_amt,
        insuranceDTO.value.insr_psnl_brdn_amt,
        insuranceDTO.value.insr_sale_rt,
        1
      );

    // 기본담보 - 보상한도(연보험)
    // 회계사는 개인 1명이라 계산이 필요없음 
    insuranceDTO.value.insr_year_clm_lt_amt = insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1);
    // insuranceDTO.value.insr_year_clm_lt_amt = calByString(insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1), insuranceDTO.value?.cbr_data?.length, 0);

    // 최종보험료
    insuranceDTO.value.insr_tot_amt = insuranceDTO.value?.insr_amt;

  }
);
/**
 * 보험계약[기본담보] 보험기간 - 시작일자 변경시 종료일자는 자동으로 년도+1-01-01 변경 및 과거 날짜 선택불가
 */
watch(() => [insuranceDTO.value.insr_st_dt], (newValue, oldValue) => {
  // 읽기전용일 경우 해당로직 제외
  if (isReadOnlyAll.value) return false;

  // console.log(TODAY);
  // console.log(newValue[0]);
  // console.log(insuranceDTO.value.insr_retr_yn);
  // console.log(renewalYN.value);
  // console.log(insuranceDTO.value.cbr_data );

  // 소급담보일이 수기수정일 경우에는 갱신으로 판단하기에 해당 로직에서 제외된다.
  if (insuranceDTO.value.insr_retr_yn === 'Y') {
    return false;
  } else if (insuranceDTO.value.user_cd === 'IND' && TODAY <= newValue[0]) {
    insuranceDTO.value.insr_retr_dt = newValue[0];
  }

  // 과거일자로는 변경 불가, 원복시킨다.
  if (TODAY > newValue[0]) {
    insuranceDTO.value.insr_st_dt = TODAY;
    insuranceDTO.value.insr_retr_dt = TODAY;
    showMessageBoxByInsrDt();
  }

  // [보험료표] 보험개시일자가 과거이면 보험개시일로 변경한다.
  if (newValue[0] < insuranceRateDTO.value.insr_st_dt) {
    INSR_RETR_DT_TODAY = insuranceRateDTO.value.insr_st_dt
  }
});


/**
 * 초기로딩시 가입 / 수정 / 조회 를 선택해서 보여준다.
 */
onMounted(async () => {
  renewalYN.value = route.query.renewal;
  insuranceUUID.value = route.params.insuranceUUID;

  /**
   * 코드 조회 
   * 
   *  TAX001 - 소속 중앙회
   */
  regionCdItems.value = await CommonCode.getCodeList('TAX001'); 

  isReadOnlyAll.value = false;


  /**
   * 보험료표 조회
   * 
   */
  const params = { user_cd: _AUTH_USER.value.userCd , business_cd: _AUTH_USER.value.businessCd };
  const resultData = await apiContract.getDBSelInsuranceRate(params);
  Object.assign(insuranceRateDTO.value, resultData.data[0]);

  INSR_RATE_TABLE.value = resultData.data[0].contents;
  INSR_RATE_MAX_DAYS.value = resultData.data[0].days;


  /**
   * 공통_기본정보 설정
   * 
   * 
   * 0. 사용자 정보 조회
   * 1. 회원정보
   * 2. 보험_기준정보
   */
   
  insuranceDTO.value.insurance_uuid = '';


  if (INSR_RETR_DT_TODAY < insuranceRateDTO.value.insr_st_dt) {
    INSR_RETR_DT_TODAY = insuranceRateDTO.value.insr_st_dt
  }

  if (TODAY < insuranceRateDTO.value.insr_st_dt) {
    TODAY = insuranceRateDTO.value.insr_st_dt
  }

  /**
   * 갱신가입
   * 
   * 갱신DB 있는 그대로 가져와서 설정한다
   */
  if(renewalYN.value === 'Y' && insuranceUUID.value !== '') {
    const params = { renewal:renewalYN.value, insurance_uuid: insuranceUUID.value };
    const renewalData = await apiContract.getDBSel(params);

    if (renewalData.data.length == 0) {
      messageBoxDTO.value.setWarning('조회오류', '보험갱신 데이타를 조회 할 수 없습니다.');
      onCancel();
    } else {
      Object.assign(insuranceDTO.value, renewalData.data[0]);
    }

    // 사용자 정보 재설정
    await getUserInfoToSetUserInfoByInsurance();

    insuranceDTO.value.status_cd = '10'     // 신청
    insuranceDTO.value.insurance_uuid = ''; // 초기값
    insuranceDTO.value.base_insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.base_insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.insr_reg_dt = dayjs().format('YYYY-MM-DD');

    
    if (insuranceDTO.value.user_cd == 'IND') {
      // 전환여부 확인
      //chkSaleRtIND();
    }  

  }

  /**
   * 신규가입
   */
  else if (insuranceUUID.value === '' || insuranceUUID.value === null ||  insuranceUUID.value === undefined) {

    // 사용자 정보 조회
    await getUserInfoToSetUserInfoByInsurance();

    // 보험료 기준정보 셋팅
    insuranceDTO.value.status_cd = '10' // 신청
    insuranceDTO.value.insr_retr_yn = 'N'; // 소금담보수기보정 X
    insuranceDTO.value.insr_pblc_brdn_rt = '0|공동부담비율 없음'; // 초기값
    insuranceDTO.value.insr_pcnt_sale_rt = 0; // 초기값

    insuranceDTO.value.insr_year = insuranceRateDTO.value.base_year;
    insuranceDTO.value.base_insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.base_insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;

    insuranceDTO.value.insr_reg_dt = dayjs().format('YYYY-MM-DD');
    
    // 갱신후 : 오늘일자로 설정 / 오늘일자 > [보험료표DB]_보험시작일자  
    if(TODAY > insuranceRateDTO.value.insr_st_dt) {
      insuranceDTO.value.insr_st_dt = TODAY;
    } else {
    // 갱신전 : [보험료표DB]_보험시작일자로 적용
      insuranceDTO.value.insr_st_dt = insuranceDTO.value.base_insr_st_dt;
    }

    // 소급담보일도 오늘일자로 재설정
    insuranceDTO.value.insr_retr_dt = insuranceDTO.value.insr_st_dt;

    if (insuranceDTO.value.user_cd == 'IND') {
      // 전환여부 확인
      //chkSaleRtIND();

    }

  /**
   * 수정가입
   */
  } else {
    const params = { insurance_uuid: insuranceUUID.value };
    const resultData = await apiContract.getDBSel(params);

  // 초기화용 백업
    if (resultData.data.length == 0) {
      router.push('/404');
    } else {
      Object.assign(insuranceDTO.value, resultData.data[0]);
      getUserInfoToSetUserInfoByInsurance();

    }
  }

  insuranceDTOBackup.value = JSON.parse(JSON.stringify(insuranceDTO.value));

  onLoading.value = true;

});
</script>
