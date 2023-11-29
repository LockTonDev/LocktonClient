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
            show-arrows
          >
            <v-tab value="1" class="flex-grow-1">가입정보</v-tab>
            <v-tab value="2" class="flex-grow-1">보험계약 [기본담보]</v-tab>
            <v-tab value="3" class="flex-grow-1">보험계약 [특약]</v-tab>
            <v-tab value="4" class="flex-grow-1">약관동의</v-tab>
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
                  <!-- <v-checkbox v-model="selected" label="가입자 정보와 동일" value="" hide-details="auto" class="ml-auto flex-grow-0" density="compact" @click="setUserInfoByUser" v-if="!isReadOnlyAll"></v-checkbox>                     -->
                </div>
                <p class="text-body-2 color-gray-shadow">
                  <sup class="text-error">*</sup>는 필수 입력입니다.
                </p>
              </v-col>
              <v-col cols="12 mt-10">
                <v-row
                  class="v-board-table"
                  v-if="insuranceDTO.user_cd == 'IND'"
                >
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>이름</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.user_nm }}
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.user_nm" name="user_nm" label="ex) 홍길동" single-line density="comfortable" readonly /> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>생년월일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.user_birth }}
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.user_birth" name="user_birth" label="ex) 19800729" single-line density="comfortable" readonly/> -->
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    class="v-col"
                    v-if="insuranceDTO.user_cd == 'IND'"
                  >
                    <div class="head-col">
                      <p>등록번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.user_regno }}
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.user_regno"  name="user_regno" label="ex) 9999" single-line density="comfortable" readonly/> -->
                    </div>
                  </v-col>
                  <v-divider class="border-0" />

                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>사무소명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_nm"
                        name="corp_nm"
                        label="사무소명"
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
                        label="사업자번호"
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
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno"
                        name="corp_telno"
                        label="사무소 전화"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소 팩스</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_faxno"
                        name="corp_taxno"
                        label="사무소 팩스"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
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
                        label="담당자 성명"
                        single-line
                        density="comfortable"
                        maxlength="20"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>휴대전화</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.user_hpno"
                        name="user_hpno"
                        label="휴대전화"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>이메일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.user_email"
                        name="user_email"
                        label="이메일"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                      <!-- <v-select :items="selectbox1" variant="outlined" hide-details="auto" label="도메인 선택" single-line density="comfortable" class="ml-2"></v-select> -->
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
                        label="우편번호"
                        single-line
                        density="comfortable"
                        readonly
                      />
                      <v-btn
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
                        label="주소"
                        single-line
                        density="comfortable"
                        class="w-full"
                        maxlength="40"
                        readonly
                      />
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_addr_dtl"
                        name="corp_addr_dtl"
                        label="상세주소"
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

              <!-- 법인/합동 시작-->
              <v-col cols="12 mt-10" v-if="insuranceDTO.user_cd != 'IND'">
                <v-row class="v-board-table">
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>사업 유형<sup class="text-error">*</sup></p>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.corp_type }}
                      <!-- <v-radio-group v-model="insuranceDTO.corp_type" inline class="align-center d-flex" :disabled="true">
                          <v-radio label="법인" value="법인" class="mr-4"></v-radio>
                          <v-radio label="합동사무소" value="합동사무소" class="mr-4"></v-radio>
                          <v-radio label="통관 취급 법인" value="통관 취급 법인"></v-radio>
                      </v-radio-group> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.corp_nm }}
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_nm"  name="corp_nm" label="사무소명" single-line density="comfortable" readonly /> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>대표자 성명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.corp_ceo_nm }}
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.user_nm"  name="user_nm" label="대표자 성명" single-line density="comfortable" readonly /> -->
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>법인번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <p v-if="insuranceDTO.corp_type != 'JNT'">
                        {{ insuranceDTO.corp_bnno }}
                      </p>
                      <p v-if="insuranceDTO.corp_type == 'JNT'">해당없음</p>
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_bnno"  name="corp_bnno" label="ex) 123-383-58FH1HF" single-line density="comfortable" readonly/> -->
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사업자번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.corp_cnno }}
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cnno"  name="corp_cnno" label="사업자번호" single-line density="comfortable" readonly/> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소 전화</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno"
                        name="corp_telno"
                        label="사무소 전화"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소 팩스</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_faxno"
                        name="corp_taxno"
                        label="사무소 팩스"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
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
                        label="담당자 성명"
                        single-line
                        density="comfortable"
                        maxlength="20"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>휴대전화</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.user_hpno"
                        name="user_hpno"
                        label="휴대전화"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>이메일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.user_email"
                        name="user_email"
                        label="이메일"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                      <!-- <v-select :items="selectbox1" variant="outlined" hide-details="auto" label="도메인 선택" single-line density="comfortable" class="ml-2"></v-select> -->
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
                        label="우편번호"
                        single-line
                        density="comfortable"
                        readonly
                      />
                      <v-btn
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
                        label="주소"
                        single-line
                        density="comfortable"
                        class="w-full"
                        maxlength="40"
                        readonly
                      />
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_addr_dtl"
                        name="corp_addr_dtl"
                        label="상세주소"
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
              <!-- 법인/합동 끝-->
              <v-col cols="12">
                <div class="mt-6 pa-8 bg-background">
                  <p class="text-body-1 font-weight-medium">
                    <i class="mdi mdi-alert-circle-outline mr-2"></i>유의사항
                  </p>
                  <ul class="pl-3 text-body-2 mt-2 list-style-type-bull">
                    <li>회원 가입 시 작성하는 정보(주소, 전화번호 등)는 향후 보험 가입 시 계약자 정보에 적용됩니다.</li>
                    <li>이미 보험 가입 중인 계약자는 회원 가입시 작성하는 주소, 전화번호 등으로 계약정보가 변경되니 신중히 기입하여 주시기 바랍니다.</li>
                  </ul>
                </div>                
              </v-col>
            </v-row>

            <v-row class="mt-10">
              <v-col class="d-flex justify-center pa-0">
                <v-btn
                  size="x-large"
                  variant="flat"
                  color="dark"
                  @click="onNextPage()"
                  >다음</v-btn
                >
              </v-col>
            </v-row>
          </v-window-item>
          <!-- 가입정보 Tab 종료 -->

          <!-- 보험가입 [기본담보]  시작 -->
          <v-window-item value="2" :disabled="isReadOnlyAll">
            <v-row class="v-box-table py-10">
              <v-col cols="12" sm="12" class="px-14 v-col">
                <div class="d-flex flex-wrap">
                  <div class="d-flex align-center">
                    <h3 class="text-h6 font-weight-bold">보험 계약</h3>
                    <h3 class="text-body-1 font-weight-bold text-primary ml-3">
                      기본담보
                    </h3>
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
                <p class="text-body-2 color-gray-shadow" v-if="renewal == 'Y'">직전년도 가입조건이 자동 표시되며, 변경 가능합니다.</p> <!--갱신자의 경우 문구 노출-->
              </v-col>
              <!-- <v-divider class="my-10"  v-if="(insuranceDTO.user_cd == 'IND')"/> -->
              <v-col
                cols="12"
                sm="12"
                class="py-6 px-14 mt-10 bg-background"
                v-if="insuranceDTO.user_cd != 'IND'"
              >
                <v-row>
                  <v-col cols="12" sm="12" class="d-flex flex-wrap v-col">
                    <p class="text-body-1 w-16 font-weight-medium py-4">
                      업무 선택
                    </p>
                    <div class="w-83">
                      <v-btn-toggle
                        v-model="insuranceDTO.cons_join_yn"
                        divided
                        variant="outlined"
                        class="w-100"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          color="primary"
                          class="bg-white flex-grow-1"
                          value="N"
                          >통관</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="bg-white flex-grow-1"
                          value="Y"
                          >통관 + 컨설팅</v-btn
                        >
                      </v-btn-toggle>
                    </div>
                    <ul
                      class="w-100 px-4 text-gray list-style-size-small list-style-type-disc"
                    >
                      <li class="text-body-2 mt-4">
                        “통관” 선택 시 관세사 자격에 따른 모든 업무가
                        보장됩니다. “컨설팅” 선택 시 컨설팅 업무만 보장됩니다.
                      </li>
                      <li class="text-body-2 mt-2">
                        <span class="text-error"
                          >관세사법 제2조 5호~8호까지 업무(컨설팅 업무)만을
                          담당하는 관세사</span
                        >에 대해 보상한도를 다르게 설정하여 가입할 수 있습니다.
                      </li>
                      <li class="text-body-2 mt-4">
                        보험기간 중 조건변경이 되지 않으니 신중하게 선택하여
                        가입해주시기 바랍니다.
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" class="py-0 px-14 mt-10">
                <div
                  class="d-flex align-center mb-4"
                  v-if="insuranceDTO.user_cd != 'IND'"
                >
                  <svg
                    width="8"
                    height="12"
                    fill="none"
                    stroke-width="3"
                    class="mr-2"
                  >
                    <line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line>
                    <line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line>
                  </svg>
                  <p class="text-body-1 font-weight-bold">기본담보</p>
                </div>
                <v-row class="v-board-table">
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>보험기간</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col justify-space-between date">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_st_dt"
                        name="insr_st_dt"
                        label="보험시작일자"
                        type="date"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      />
                      <p class="mx-2">00:01 부터</p>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_cncls_dt"
                        name="insr_cncls_dt"
                        label="보험종료일자"
                        type="date"
                        single-line
                        density="comfortable"
                        readonly
                      />
                      <p class="ml-2">00:01 까지</p>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>소급담보일</p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_retr_dt"
                        name="insr_retr_dt"
                        label=""
                        type="date"
                        single-line
                        density="comfortable"
                        disabled
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p v-if="insuranceDTO.user_cd == 'IND'">
                        무사고 할인 /<br />사고 할증 (%)
                      </p>
                      <p v-if="insuranceDTO.user_cd != 'IND'">
                        무사고 할인 (%)
                      </p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_sale_rt"
                        name="insr_sale_rt"
                        label=""
                        single-line
                        density="comfortable"
                        disabled
                      />
                    </div>
                  </v-col>

                  <!-- <v-col cols="12" sm="6" class="v-col" v-if="(insuranceDTO.user_cd == 'IND')">
                    <div class="head-col">
                      <p>소급담보일</p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation  v-model="insuranceDTO.insr_retr_dt" name="insr_retr_dt" label="" type="date" single-line density="comfortable" disabled/>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col" v-if="(insuranceDTO.user_cd == 'IND')">
                    <div class="head-col">
                      <p>무사고 할인 /<br>사고 할증 (%)</p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation  v-model="insuranceDTO.insr_sale_rt" name="insr_sale_rt" label="" single-line density="comfortable" disabled />
                    </div>
                  </v-col> 

                  <v-col cols="12" sm="6" class="v-col" v-if="(insuranceDTO.user_cd != 'IND')">
                    <div class="head-col">
                      <p>소급담보일</p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation  v-model="insuranceDTO.insr_retr_dt" name="insr_retr_dt" label="" type="date" single-line density="comfortable" disabled/>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col" v-if="(insuranceDTO.user_cd != 'IND')">
                    <div class="head-col">
                      <p>무사고 할인 (%)</p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation  v-model="insuranceDTO.insr_sale_rt" name="insr_sale_rt" label="" single-line density="comfortable" disabled/>
                    </div>
                  </v-col> -->

                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>공동보험</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
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
                          value="1|공동부담 없음"
                          >공동부담 없음</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="2|공동부담비율 15%"
                          >공동부담비율 15%</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="3|공동부담비율 30%"
                          >공동부담비율 30%</v-btn
                        >
                      </v-btn-toggle>
                      <p
                        class="text-caption font-weight-light mt-2 flex-grow-1"
                      >
                        <i class="mdi mdi-alert-circle-outline mr-2"></i
                        >공동부담비율
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>보상한도</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
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
                          value="1|1천만원"
                          >1천만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="2|2천만원"
                          :disabled="isShowInsrClmLtAmt"
                          >2천만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="3|3천만원"
                          :disabled="isShowInsrClmLtAmt"
                          >3천만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="4|5천만원"
                          :disabled="isShowInsrClmLtAmt"
                          >5천만원</v-btn
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
                    <div class="data-col">
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
                          value="1|1백만원"
                          :disabled="isShowInsrPsnlBrdnAmt"
                          >1백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="2|2백만원"
                          >2백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="3|3백만원"
                          >3백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="4|5백만원"
                          >5백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="5|1천만원"
                          >1천만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="6|1천5백만원"
                          >1천5백만원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당
                      </p>
                    </div>
                  </v-col>
                </v-row>
                <p
                  v-if="insuranceDTO.user_cd == 'IND'"
                  class="text-body-2 text-error mt-4 text-center bg-lighterror py-4"
                >
                  <i class="mdi mdi-alert-circle-outline mr-2"></i> 보험기간중
                  조건변경이 되지 않으니 신중하게 선택하여 가입해주시기
                  바랍니다.
                </p>
              </v-col>

              <!--통관 관세사 명단 시작 -->
              <v-col
                cols="12"
                sm="12"
                class="py-0 px-14 mb-10"
                v-if="insuranceDTO.user_cd != 'IND'"
              >
                <div class="d-flex align-center mb-4 mt-6">
                  <svg
                    width="8"
                    height="12"
                    fill="none"
                    stroke-width="3"
                    class="mr-2"
                  >
                    <line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line>
                    <line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line>
                  </svg>
                  <p class="text-body-1 font-weight-bold">관세사 명단</p>
                  <p class="text-body-2 color-gray-shadow ml-4">
                    총
                    <span class="color-primary">{{ insuranceDTO.cbr_cnt }}</span
                    >명
                  </p>
                  <vue-feather
                    @click="addCBR(insuranceDTO, '통관')"
                    type="plus-square"
                    class="text-primary cursor-pointer mr-2 ml-auto"
                    v-if="!isReadOnlyAll"
                  ></vue-feather>
                </div>
                <v-table class="v-board-table size-small">
                  <colgroup>
                    <col style="width: 62px" />
                    <col style="width: auto" />
                    <col style="width: auto" />
                    <col style="width: auto" />
                    <col style="width: 88px" />
                    <col style="width: 74px" />
                    <col style="width: 84px" />
                    <col style="width: 48px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="text-center">구분</th>
                      <th class="text-center">성명</th>
                      <th class="text-center">생년월일</th>
                      <th class="text-center">등록번호</th>
                      <th class="text-center">소급담보일</th>
                      <th class="text-center">할인/할증</th>
                      <th class="text-center">1인당 보험료</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in insuranceDTO.cbr_data">
                      <td class="text-center">{{ row.cbr_type }}</td>
                      <td class="text-center">
                        <v-text-field
                          v-model="row.cbr_nm"
                          name="cbr_nm"
                          variant="outlined"
                          hide-details="auto"
                          density="compact"
                          class="text-body-2"
                          single-line
                          label="홍길동"
                          :readonly="isReadOnlyAll"
                        />
                      </td>
                      <td class="text-center">
                        <v-text-field
                          v-model="row.cbr_brdt"
                          name="cbr_brdt"
                          variant="outlined"
                          hide-details="auto"
                          density="compact"
                          class="text-body-2"
                          single-line
                          label="820101"
                          :readonly="isReadOnlyAll"
                        />
                      </td>
                      <td class="text-center">
                        <v-text-field
                          v-model="row.cbr_regno"
                          name="cbr_regno"
                          variant="outlined"
                          hide-details="auto"
                          density="compact"
                          class="text-body-2"
                          single-line
                          label="1234"
                          :readonly="isReadOnlyAll"
                        />
                      </td>
                      <td class="text-center">{{ row.insr_retr_dt }}</td>
                      <!-- <td class="text-center"><v-text-field v-model="row.insr_sale_rt" name="insr_sale_rt" variant="outlined" hide-details="auto" density="compact" class="text-body-2" single-line :readonly="isReadOnlyAll"/></td> -->
                      <td class="text-center">{{ row.insr_sale_rt }}%</td>

                      <td class="text-center">
                        {{ Number(row.insr_amt).toLocaleString() }}원
                      </td>
                      <td class="text-center">
                        <vue-feather
                          type="minus-square"
                          class="text-gray cursor-pointer"
                          @click="delCBR(insuranceDTO, index)"
                          v-if="!isReadOnlyAll"
                        ></vue-feather>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
              <!--//통관 관세사 명단 종료 -->

              <!-- 보험가입 [컨설팅]  시작 -->
              <v-col
                cols="12"
                sm="12"
                class="pa-0 border-top-lightgray-1"
                v-if="insuranceDTO.cons_join_yn == 'Y'"
              >
                <v-row>
                  <v-col cols="12" sm="12" class="mt-10 py-0 px-14">
                    <div class="d-flex align-center">
                      <h3 class="text-h6 font-weight-bold">보험 계약</h3>
                      <h3
                        class="text-body-1 font-weight-bold text-primary ml-3"
                      >
                        컨설팅 추가
                      </h3>
                    </div>
                    <p class="text-body-2 color-gray-shadow mt-2">
                      <sup class="text-error">*</sup>는 필수 입력입니다.
                    </p>
                  </v-col>
                  <v-col cols="12" sm="12" class="py-0 px-14 mt-10">
                    <div class="d-flex align-center mb-4">
                      <svg
                        width="8"
                        height="12"
                        fill="none"
                        stroke-width="3"
                        class="mr-2"
                      >
                        <line
                          x1="7"
                          y1="5"
                          x2="0"
                          y2="12"
                          stroke="#222222"
                        ></line>
                        <line
                          x1="0"
                          y1="0"
                          x2="8"
                          y2="7"
                          stroke="#00AEEF"
                        ></line>
                      </svg>
                      <p class="text-body-1 font-weight-bold">기본담보</p>
                    </div>
                    <v-row class="v-board-table">
                      <!-- <v-col cols="12" sm="12" class="v-col">
                        <div class="head-col">
                          <p>보험기간</p>
                        </div>
                        <div class="data-col justify-space-between date">
                            <VTextFieldWithValidation v-model="insuranceDTO.cons_data.insr_st_dt" name="insr_st_dt" label="보험시작일자" type="date" single-line density="comfortable"/> 
                            <p>00:01 부터 </p>
                            <VTextFieldWithValidation v-model="insuranceDTO.cons_data.insr_cncls_dt" name="insr_cncls_dt" label="보험종료일자" type="date" single-line density="comfortable" readonly/> 
                            <p>00:01 까지</p>
                        </div>
                      </v-col> -->
                      <v-col cols="12" sm="6" class="v-col">
                        <div class="head-col">
                          <p>소급담보일</p>
                        </div>
                        <div class="data-col">
                          <VTextFieldWithValidation
                            v-model="insuranceDTO.cons_data.insr_retr_dt"
                            name="insr_retr_dt"
                            label=""
                            type="date"
                            single-line
                            density="comfortable"
                            disabled
                          />
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" class="v-col">
                        <div class="head-col">
                          <p v-if="insuranceDTO.user_cd == 'IND'">
                            무사고 할인 /<br />사고 할증 (%)
                          </p>
                          <p v-if="insuranceDTO.user_cd != 'IND'">
                            무사고 할인 (%)
                          </p>
                        </div>
                        <div class="data-col">
                          <VTextFieldWithValidation
                            v-model="insuranceDTO.cons_data.insr_sale_rt"
                            name="insr_sale_rt"
                            label=""
                            single-line
                            density="comfortable"
                            disabled
                          />
                        </div>
                      </v-col>
                      <v-col cols="12" sm="12" class="v-col">
                        <div class="head-col">
                          <p>공동보험</p>
                        </div>
                        <div class="data-col">
                          <v-btn-toggle
                            v-model="insuranceDTO.cons_data.insr_pblc_brdn_rt"
                            divided
                            variant="outlined"
                            class="align-stretch w-100"
                            :disabled="isReadOnlyAll"
                          >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="1|공동부담 없음"
                              >공동부담 없음</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="2|공동부담비율 15%"
                              >공동부담비율 15%</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="3|공동부담비율 30%"
                              >공동부담비율 30%</v-btn
                            >
                          </v-btn-toggle>
                          <p
                            class="text-caption font-weight-light mt-2 flex-grow-1"
                          >
                            <i class="mdi mdi-alert-circle-outline mr-2"></i
                            >공동부담비율
                          </p>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="12" class="v-col">
                        <div class="head-col">
                          <p>보상한도</p>
                        </div>
                        <div class="data-col">
                          <v-btn-toggle
                            v-model="insuranceDTO.cons_data.insr_clm_lt_amt"
                            divided
                            variant="outlined"
                            class="align-stretch w-100"
                            :disabled="isReadOnlyAll"
                          >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="1|1천만원"
                              >1천만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="2|2천만원"
                              :disabled="isShowConsDataInsrClmLtAmt"
                              >2천만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="3|3천만원"
                              :disabled="isShowConsDataInsrClmLtAmt"
                              >3천만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="4|5천만원"
                              :disabled="isShowConsDataInsrClmLtAmt"
                              >5천만원</v-btn
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
                        </div>
                        <div class="data-col">
                          <v-btn-toggle
                            v-model="insuranceDTO.cons_data.insr_psnl_brdn_amt"
                            divided
                            variant="outlined"
                            class="align-stretch w-100"
                            :disabled="isReadOnlyAll"
                          >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="1|1백만원"
                              :disabled="isShowConsDataInsrPsnlBrdnAmt"
                              >1백만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="2|2백만원"
                              >2백만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="3|3백만원"
                              >3백만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="4|5백만원"
                              >5백만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="5|1천만원"
                              >1천만원</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="flex-grow-1"
                              value="6|1천5백만원"
                              >1천5백만원</v-btn
                            >
                          </v-btn-toggle>
                          <p class="text-caption font-weight-light mt-2">
                            <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                            청구당
                          </p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>

                  <!--컨설팅 사무원 명단-->
                  <v-col cols="12" sm="12" class="py-0 px-14">
                    <div class="d-flex align-center mb-4 mt-6">
                      <svg
                        width="8"
                        height="12"
                        fill="none"
                        stroke-width="3"
                        class="mr-2"
                      >
                        <line
                          x1="7"
                          y1="5"
                          x2="0"
                          y2="12"
                          stroke="#222222"
                        ></line>
                        <line
                          x1="0"
                          y1="0"
                          x2="8"
                          y2="7"
                          stroke="#00AEEF"
                        ></line>
                      </svg>
                      <p class="text-body-1 font-weight-medium">관세사 명단</p>
                      <p class="text-body-2 color-gray-shadow ml-4">
                        총
                        <span class="color-primary">{{
                          insuranceDTO.cons_data.cbr_cnt
                        }}</span
                        >명
                      </p>
                      <vue-feather
                        @click="addCBR(insuranceDTO.cons_data, '컨설팅')"
                        type="plus-square"
                        class="text-primary cursor-pointer mr-2 ml-auto"
                        v-if="!isReadOnlyAll"
                      ></vue-feather>
                    </div>
                    <v-table class="v-board-table size-small">
                      <colgroup>
                        <col style="width: 62px" />
                        <col style="width: auto" />
                        <col style="width: auto" />
                        <col style="width: auto" />
                        <col style="width: 88px" />
                        <col style="width: 74px" />
                        <col style="width: 84px" />
                        <col style="width: 48px" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th class="text-center">구분</th>
                          <th class="text-center">성명</th>
                          <th class="text-center">생년월일</th>
                          <th class="text-center">등록번호</th>
                          <th class="text-center">소급담보일</th>
                          <th class="text-center">할인/할증</th>
                          <th class="text-center">1인당 보험료</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, index) in insuranceDTO.cons_data
                            .cbr_data"
                        >
                          <td class="text-center">{{ row.cbr_type }}</td>
                          <td class="text-center">
                            <v-text-field
                              v-model="row.cbr_nm"
                              name="cbr_nm"
                              variant="outlined"
                              hide-details="auto"
                              density="compact"
                              class="text-body-2"
                              single-line
                              label="홍길동"
                              :readonly="isReadOnlyAll"
                            />
                          </td>
                          <td class="text-center">
                            <v-text-field
                              v-model="row.cbr_brdt"
                              name="cbr_brdt"
                              variant="outlined"
                              hide-details="auto"
                              density="compact"
                              class="text-body-2"
                              single-line
                              label="820101"
                              :readonly="isReadOnlyAll"
                            />
                          </td>
                          <td class="text-center">
                            <v-text-field
                              v-model="row.cbr_regno"
                              name="cbr_regno"
                              variant="outlined"
                              hide-details="auto"
                              density="compact"
                              class="text-body-2"
                              single-line
                              label="1234"
                              :readonly="isReadOnlyAll"
                            />
                          </td>
                          <td class="text-center">{{ row.insr_retr_dt }}</td>
                          <!-- <td class="text-center"><v-text-field v-model="row.insr_sale_rt" name="insr_sale_rt" variant="outlined" hide-details="auto" density="compact" class="text-body-2" single-line :readonly="isReadOnlyAll"/></td> -->
                          <td class="text-center">{{ row.insr_sale_rt }}%</td>
                          <td class="text-center">
                            {{ Number(row?.insr_amt)?.toLocaleString() }}원
                          </td>
                          <td class="text-center">
                            <vue-feather
                              type="minus-square"
                              class="text-gray cursor-pointer"
                              @click="delCBR(insuranceDTO.cons_data, index)"
                              v-if="!isReadOnlyAll"
                            ></vue-feather>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-col>
                  <!--//컨설팅 사무원 명단-->
                </v-row>
              </v-col>
              <!-- 보험가입 [컨설팅]  종료 -->
            </v-row>
            <v-row class="mt-10">
              <v-col class="pa-0 d-flex justify-center">
                <v-btn
                  size="x-large"
                  variant="outlined"
                  color="dark"
                  v-if="tab > 1 && tab < 4"
                  @click="tab = (parseInt(tab) - 1).toString()"
                  class="mr-4"
                  >이전</v-btn
                >
                <v-btn
                  size="x-large"
                  variant="flat"
                  color="dark"
                  @click="onNextPage()"
                  >다음</v-btn
                >
              </v-col>
            </v-row>
          </v-window-item>
          <!-- 보험가입 [기본담보]  종료 -->

          <!-- 보험가입 [특약]  시작 -->
          <v-window-item value="3" :disabled="isReadOnlyAll">
            <v-row class="v-box-table px-14 py-10">
              <v-col cols="12" class="v-col">
                <div class="d-flex align-center">
                  <h3 class="text-h6 font-weight-bold">보험 계약</h3>
                  <h3 class="text-body-1 font-weight-bold text-primary ml-3">
                    특약
                  </h3>
                </div>
                <p class="text-body-2 color-gray-shadow mt-2">
                  <sup class="text-error">*</sup>는 필수 입력입니다.
                </p>
              </v-col>
              <v-col cols="12" class="mt-10">
                <v-row class="v-board-table">
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>특약명</p>
                    </div>
                    <div class="data-col">
                      <v-text-field
                        variant="outlined"
                        disabled
                        hide-details="auto"
                        single-line
                        class="w-100 readonly"
                        density="comfortable"
                        >사무원의 횡령 등 부정직행위 담보 특별약관(Dishonesty
                        Extension)</v-text-field
                      >
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>특약 선택</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <v-btn-toggle
                        v-model="insuranceDTO.spct_join_yn"
                        divided
                        variant="outlined"
                        class="w-100"
                        density="comfortable"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn color="primary" class="flex-grow-1" value="N"
                          >가입 안함</v-btn
                        >
                        <v-btn color="primary" class="flex-grow-1" value="Y"
                          >특약 가입</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>기본
                        담보 보상한도 2천만원 이상 선택한 경우만 특약 가입 가능
                      </p>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    class="v-col"
                    v-if="insuranceDTO.spct_join_yn == 'Y'"
                  >
                    <div class="head-col">
                      <p>보상 한도</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <v-btn-toggle
                        v-model="insuranceDTO.spct_data.insr_clm_lt_amt"
                        divided
                        variant="outlined"
                        class="w-100"
                        density="comfortable"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          color="primary"
                          class="flex-grow-1 bg-white"
                          value="1|1천만원"
                          >1천만원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당 / 연간총보상한도
                      </p>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    class="v-col"
                    v-if="insuranceDTO.spct_join_yn == 'Y'"
                  >
                    <div class="head-col">
                      <p>자기부담금</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <v-btn-toggle
                        v-model="insuranceDTO.spct_data.insr_psnl_brdn_amt"
                        divided
                        variant="outlined"
                        class="w-100"
                        density="comfortable"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          color="primary"
                          class="flex-grow-1 bg-white"
                          value="1|50만원"
                          >50만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1 bg-white"
                          value="2|1백만원"
                          >1백만원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당
                      </p>
                    </div>
                  </v-col>
                </v-row>
                <v-row v-if="insuranceDTO.spct_join_yn == 'Y'">
                  <v-col cols="12" sm="12" class="v-col mt-6 mb-4">
                    <div class="d-flex align-center">
                      <svg
                        width="8"
                        height="12"
                        fill="none"
                        stroke-width="3"
                        class="mr-2"
                      >
                        <line
                          x1="7"
                          y1="5"
                          x2="0"
                          y2="12"
                          stroke="#222222"
                        ></line>
                        <line
                          x1="0"
                          y1="0"
                          x2="8"
                          y2="7"
                          stroke="#00AEEF"
                        ></line>
                      </svg>
                      <p class="text-body-1 font-weight-medium">사무원 명단</p>
                      <p class="text-body-2 color-gray-shadow ml-4">
                        총
                        <span class="color-primary">{{
                          insuranceDTO.spct_data.cbr_cnt
                        }}</span
                        >명
                      </p>
                      <p class="text-body-2 color-gray-shadow ml-4">
                        <span class="text-error">{{
                          insuranceDTO.spct_data.cbr_cnt == 10
                            ? '10명을 초과하는 경우에는 별도로 연락주시기 바랍니다.'
                            : ''
                        }}</span>
                      </p>
                      <vue-feather
                        @click="addSpctCBR(insuranceDTO.spct_data, '특약')"
                        type="plus-square"
                        class="text-primary cursor-pointer mr-2 ml-auto"
                        v-if="!isReadOnlyAll"
                      ></vue-feather>
                    </div>
                    <v-table class="v-board-table size-small mt-4">
                      <thead>
                        <tr>
                          <th class="text-center">구분</th>
                          <th class="text-center">성명</th>
                          <th class="text-center">생년월일</th>
                          <th class="text-center">소급담보일</th>
                          <th class="text-center">1인당 보험료</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, index) in insuranceDTO.spct_data
                            .cbr_data"
                        >
                          <td class="text-center">{{ index + 1 }}</td>
                          <td class="text-center">
                            <v-text-field
                              v-model="row.cbr_nm"
                              variant="outlined"
                              hide-details="auto"
                              density="compact"
                              class="text-body-2"
                              single-line
                              label="홍길동"
                              :readonly="isReadOnlyAll"
                            />
                          </td>
                          <td class="text-center">
                            <v-text-field
                              v-model="row.cbr_brdt"
                              variant="outlined"
                              hide-details="auto"
                              density="compact"
                              class="text-body-2"
                              single-line
                              label="820101"
                              :readonly="isReadOnlyAll"
                            />
                          </td>
                          <td class="text-center">{{ row.insr_retr_dt }}</td>
                          <td class="text-center">
                            {{ Number(row.insr_amt).toLocaleString() }}원
                          </td>
                          <td class="text-center">
                            <vue-feather
                              type="minus-square"
                              class="text-gray cursor-pointer"
                              @click="delSpctCBR(insuranceDTO.spct_data, index)"
                              v-if="!isReadOnlyAll"
                            ></vue-feather>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-col>
                </v-row>
                <div></div>
              </v-col>
            </v-row>
            <v-row class="mt-10">
              <v-col class="pa-0 d-flex justify-center">
                <v-btn
                  size="x-large"
                  variant="outlined"
                  color="dark"
                  v-if="tab > 1 && tab < 4"
                  @click="tab = (parseInt(tab) - 1).toString()"
                  class="mr-4"
                  >이전</v-btn
                >
                <v-btn
                  size="x-large"
                  variant="flat"
                  color="dark"
                  @click="onNextPage()"
                  >다음</v-btn
                >
              </v-col>
            </v-row>
          </v-window-item>
          <!-- 보험가입 [특약]  종료 -->

          <!-- 약관동의 시작 -->
          <v-window-item value="4" :disabled="isReadOnlyAll">
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
                          color="gray"
                          variant="outlined"
                          class="ml-4"
                          @click="isInsuranceFormDialog = true"
                          >보기</v-btn
                        >
                        <InsuranceForm2
                          v-if="isInsuranceFormDialog"
                          :insurance_dto="insuranceDTO"
                          @close="onInsuranceFormClose"
                        />
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
                        <v-btn color="gray" variant="outlined" class="ml-4"
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
                            <TermsOfCCA></TermsOfCCA>
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
                          @click="isTermsOfCCAinsurancDialog = true"
                          :disabled="isReadOnlyAll"
                        />
                      </td>
                      <td>
                        <v-btn
                          color="gray"
                          variant="outlined"
                          class="ml-4"
                          @click="isTermsOfCCAinsurancDialog = true"
                          >보기</v-btn
                        >
                        <TermsOfCCAinsurance
                          :agr41_yn="insuranceDTO.agr41_yn"
                          :isReadonly="isReadOnlyAll"
                          v-if="isTermsOfCCAinsurancDialog"
                          @close="onTermsOfCCAinsuranceClose"
                        ></TermsOfCCAinsurance>
                      </td>
                    </tr>

                    <!-- <tr>                      
                      <td class="d-flex justify-space-between align-center pt-2 pb-2">
                        <span>상품가입 시 중요사항 확인</span>
                        <v-checkbox label="[필수] 확인함" value="step2-check-3" hide-details="auto" v-model="insuranceDTO.AGR_DATA.AGR3_YN" true-value="Y" false-value="N" class="v-checkbox flex-grow-0 ml-auto"></v-checkbox>
                        <v-btn color="gray" variant="outlined" class="ml-4">보기
                          <v-dialog persistent v-model="dialog3" scrollable activator="parent" max-width="1000">
                            <v-btn variant="outlined" color="dark" @click="dialog3 = false" class="position-absolute right-0 mt-7 mr-4 z-index-1">닫기</v-btn>
                            <TermsOfContract></TermsOfContract>
                          </v-dialog>
                        </v-btn>
                      </td>
                    </tr> -->
                    <!-- <tr>                      
                      <td class="d-flex justify-space-between align-center pt-2 pb-2">
                        <span>SMS, FAX, E-Mail 수신 동의</span>
                        <v-checkbox label="[선택] 동의함" value="step2-check-3" hide-details="auto" v-model="insuranceDTO.AGR_DATA.AGR4_YN" true-value="Y" false-value="N" class="v-checkbox flex-grow-0 ml-auto"></v-checkbox>
                        <v-btn color="gray" variant="outlined" class="ml-4">보기
                          <v-dialog persistent v-model="dialog4" scrollable activator="parent" max-width="1000">
                            <v-btn variant="outlined" color="dark" @click="dialog4 = false" class="position-absolute right-0 mt-7 mr-4 z-index-1">닫기</v-btn>
                            <TermsOfContract></TermsOfContract>
                          </v-dialog>
                        </v-btn>
                      </td>
                    </tr> -->
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
                    이 보험상품은 한국관세사회를 단체계약자, 가입 회원을
                    피보험자로 하는 단체계약 프로그램입니다.
                  </li>
                  <li>
                    보험회사 : 메리츠화재(주) 보험중개사 :
                    록톤컴퍼니즈코리아손해보험중개(주)
                  </li>
                  <li>
                    보험료 입금 계좌번호 :
                    <b class="font-weight-medium text-error"
                      >신한은행 140-005-862117</b
                    ><span class="text-caption mx-3">|</span>예금주 :
                    <b class="font-weight-medium text-error"
                      >록톤컴퍼니즈코리아</b
                    >
                  </li>
                </ul>
              </v-col>
              <v-col cols="12" class="px-14 py-10 border-top-lightgray-1">
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
                    <span class="d-inline-block w-sm-110 v-box px-4 py-1">{{
                      insuranceDTO.insr_reg_dt
                    }}</span>
                  </p>
                  <p class="text-body-2 mt-2">
                    피보험자 :
                    <span class="d-inline-block w-sm-110 v-box px-4 py-1">{{
                      insuranceDTO.user_nm
                    }}</span>
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
                <v-btn
                  size="x-large"
                  variant="outlined"
                  color="dark"
                  v-if="tab > 1"
                  @click="tab = (parseInt(tab) - 1).toString()"
                  class="mr-4"
                  >이전</v-btn
                >
                <v-btn
                  size="x-large"
                  variant="flat"
                  color="primary"
                  type="submit"
                  depressed
                  v-if="!isReadOnlyAll"
                  >최종 제출</v-btn
                >
                <v-btn
                  size="x-large"
                  variant="flat"
                  color="primary"
                  type="submit"
                  depressed
                  v-if="isReadOnlyAll"
                  to="/contract/CAA/V_TCAA0030A10"
                  >목록</v-btn
                >
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
            <v-col cols="12" class="mb-2">
              <p class="font-weight-medium">- 기본담보</p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">보험기간</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.insr_st_dt }} ~ {{ insuranceDTO.insr_cncls_dt }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">공동보험</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(1) }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">
                보상한도(1청구당/연간총)
              </p>
              <!-- <p class="text-body-2 text-right" v-if="(insuranceDTO.user_cd == 'IND')">{{insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1)}} / {{ calByString(insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1) + '* 1', '천만원')  }}</p>
            <p class="text-body-2 text-right" v-if="(insuranceDTO.user_cd != 'IND')">{{insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1)}} / {{ calByString(insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1) + '*' + insuranceDTO?.cbr_cnt, '천만원')  }}</p> -->
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
            <v-col cols="12" v-if="insuranceDTO.user_cd == 'IND'">
              <p class="text-body-2 color-gray-shadow">할인 및 할증율</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.insr_sale_rt }}% 적용
              </p>
            </v-col>
            <!-- 개인만 보여주는 영역 끝 -->

            <!-- 합동/법인만 보여주는 영역 시작 -->
            <v-col cols="12" v-if="insuranceDTO.user_cd != 'IND'">
              <p class="text-body-2 color-gray-shadow">관세사 인원수</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.cbr_data.length }} 명
              </p>
            </v-col>
            <v-col cols="12" v-if="insuranceDTO.user_cd != 'IND'">
              <p class="text-body-2 color-gray-shadow">합계보험료</p>
              <p class="text-body-2 text-right">
                {{ Number(insuranceDTO.insr_amt).toLocaleString() }}원
              </p>
            </v-col>
            <!-- 합동/법인만 보여주는 영역 끝 -->
            <!-- <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">보험료</p>
            <p class="text-body-2 text-right">{{getComma(insuranceDTO.insr_amt)}}원</p>  
          </v-col> -->
          </v-row>
          <!-- 보험계약 컨설팅 요약정보 시작 -->
          <v-row
            class="mx-10 py-6 border-top-lightgray-1"
            v-if="insuranceDTO.cons_join_yn == 'Y'"
          >
            <v-col cols="12" class="mb-2">
              <p class="font-weight-medium">- 컨설팅 추가</p>
            </v-col>
            <!-- <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">보험기간</p>
            <p class="text-body-2 text-right">{{insuranceDTO.cons_data.insr_st_dt}} ~ {{insuranceDTO.cons_data.insr_cncls_dt}}</p>
          </v-col> -->
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">공동보험</p>
              <p class="text-body-2 text-right">
                {{
                  insuranceDTO?.cons_data?.insr_pblc_brdn_rt?.getValueBySplit(1)
                }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">
                보상한도(1청구당/연간총)
              </p>
              <!-- <p class="text-body-2 text-right">{{insuranceDTO?.cons_data?.insr_clm_lt_amt?.getValueBySplit(1) }} / {{ calByString(insuranceDTO?.cons_data?.insr_clm_lt_amt?.getValueBySplit(1) + '*' + insuranceDTO?.cons_data?.cbr_cnt, '천만원') }} </p> -->
              <p class="text-body-2 text-right">
                {{
                  insuranceDTO?.cons_data?.insr_clm_lt_amt?.getValueBySplit(1)
                }}
                / {{ insuranceDTO?.cons_data?.insr_year_clm_lt_amt }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">자기부담금(1청구당)</p>
              <p class="text-body-2 text-right">
                {{
                  insuranceDTO?.cons_data?.insr_psnl_brdn_amt?.getValueBySplit(
                    1
                  )
                }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">기준보험료</p>
              <p class="text-body-2 text-right">
                {{
                  Number(insuranceDTO.cons_data.insr_base_amt).toLocaleString()
                }}
                원
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">관세사 인원수</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.cons_data.cbr_data.length }} 명
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">합계보험료</p>
              <p class="text-body-2 text-right">
                {{
                  Number(insuranceDTO?.cons_data?.insr_amt)?.toLocaleString()
                }}원
              </p>
            </v-col>
          </v-row>
          <!-- 보험계약 컨설팅 요약정보 끝 -->

          <!-- 보험계약 기본담보 + 컨설팅 산출 보험료 시작 -->
          <v-row class="mx-10 py-6 border-top-lightgray-1">
            <v-col cols="12">
              <p class="text-body-1 font-weight-medium">
                <vue-feather type="plus" class="vertical-align-middle" /> 산출
                보험료
              </p>
              <!-- <p class="text-body-1 font-weight-medium text-right">{{(insuranceDTO.insr_amt + insuranceDTO.cons_data.insr_amt)?.toLocaleString()}}원</p> -->
              <p class="text-body-1 font-weight-medium text-right">
                {{ Number(insuranceDTO.insr_premium_amt)?.toLocaleString() }}원
              </p>
            </v-col>
          </v-row>
          <!-- 보험계약 기본담보 + 컨설팅 산출 보험료 끝 -->

          <!-- 특약 요약정보 시작 -->
          <v-row
            class="mx-10 py-6 border-top-lightgray-1"
            v-if="insuranceDTO.spct_join_yn == 'Y'"
          >
            <v-col cols="12" class="mb-2">
              <p class="font-weight-medium">- 특약</p>
            </v-col>
            <v-col cols="12" class="flex-wrap">
              <p class="text-body-2 color-gray-shadow">특약명</p>
              <p class="text-body-2 text-right">
                사무원의 횡령 등 부정직행위 담보 특별약관(Dishonesty Extension)
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">
                보상한도(1청구당/연간총)
              </p>
              <p class="text-body-2 text-right">
                {{
                  insuranceDTO?.spct_data?.insr_clm_lt_amt?.getValueBySplit(1)
                }}
                / {{ insuranceDTO?.spct_data?.insr_year_clm_lt_amt }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">자기부담금(1청구당)</p>
              <p class="text-body-2 text-right">
                {{
                  insuranceDTO?.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(
                    1
                  )
                }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">기준보험료</p>
              <p class="text-body-2 text-right">
                {{
                  Number(
                    insuranceDTO?.spct_data?.insr_base_amt
                  ).toLocaleString()
                }}
                원
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">사무원 인원수</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO?.spct_data?.cbr_data.length }} 명
              </p>
            </v-col>
          </v-row>
          <v-row
            class="mx-10 py-6 border-top-lightgray-1"
            v-if="insuranceDTO.spct_join_yn == 'Y'"
          >
            <v-col cols="12">
              <p class="text-body-1 font-weight-medium">
                <vue-feather type="plus" class="vertical-align-middle" /> 산출
                보험료
              </p>
              <p class="text-body-1 font-weight-medium text-right">
                {{
                  Number(insuranceDTO?.spct_data?.insr_amt).toLocaleString()
                }}원
              </p>
            </v-col>
          </v-row>
          <!-- 특약 요약정보 끝 -->

          <v-row class="px-10 py-6 border-top-lightgray-1">
            <!-- <v-col cols="12">
            <p class="text-body-1 font-weight-medium"><vue-feather type="plus" class="vertical-align-middle"/> 산출 보험료</p>
            <p class="text-body-1 font-weight-medium text-right">{{(insuranceDTO.insr_amt + insuranceDTO.cons_data.insr_amt)?.toLocaleString()}}원</p>
          </v-col>
          <v-col cols="12">
            <p v-if="insuranceDTO.spct_join_yn == 'Y'" class="text-body-1 font-weight-medium"><vue-feather type="plus" class="vertical-align-middle"/> 특약 보험료</p>
            <p v-if="insuranceDTO.spct_join_yn == 'Y'" class="text-body-1 font-weight-medium text-right">{{insuranceDTO?.spct_data.insr_amt?.toLocaleString()}}원</p>
          </v-col> 
          <v-divider class="my-4" />
          -->
            <v-col cols="12">
              <p class="text-h6 font-weight-medium color-primary">
                최종 보험료
              </p>
              <p class="text-h6 font-weight-medium color-primary text-right">
                {{ Number(insuranceDTO?.insr_tot_amt)?.toLocaleString() }}원
              </p>
            </v-col>
          </v-row>
          <!-- <v-btn color="primary" block class="py-7 my-4"  type="submit" > 가입테스트</v-btn> -->
        </div>
      </v-col>
      <!-- 보험 요약 종료 -->
    </v-row>

    <!--  <v-row class="mb-16">
    <v-col class="d-flex justify-center">
      <v-btn size="x-large" variant="outlined" color="dark" v-if="tab > 1 && tab < 4 " @click="tab = (parseInt(tab) - 1).toString()" >이전</v-btn>
      <v-btn size="x-large" variant="flat" color="dark" v-if="tab < 4" depressed @click="tab = (parseInt(tab) + 1).toString()">다음</v-btn>
      <v-btn size="x-large" variant="flat" color="primary" v-if="tab == 4" @click="tab++" depressed >최종 제출</v-btn>

      <v-btn size="x-large" variant="outlined" color="dark" v-if="tab > 1 && tab < 4 " @click="tab = (parseInt(tab) - 1).toString()" >이전</v-btn>
      <v-btn size="x-large" variant="flat" color="dark" v-if="tab < 4" depressed @click="nextForm">다음</v-btn>
      <v-btn size="x-large" variant="flat" color="primary" v-if="tab == 4" @click="tab++" depressed >최종 제출</v-btn>

    </v-col>
  </v-row> -->
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
          <p class="text-16 text-gray" v-if="insuranceDTO.user_cd == 'IND'">
            <i class="mdi mdi-alert-circle-outline mr-1"></i
            ><span class="color-primary">관세사 성명과 등록번호를</span> 함께
            기재하여 송금해주시기 바랍니다.
          </p>
          <p class="text-16 text-gray" v-if="insuranceDTO.user_cd != 'IND'">
            <i class="mdi mdi-alert-circle-outline mr-1"></i>합동사무소 및
            법인명으로 일괄 송금하여 주시기 바랍니다.
          </p>
        </v-card-text>
      </v-card>
      <v-btn
        size="x-large"
        variant="flat"
        color="primary"
        to="/contract/CAA/V_TCAA0030A10"
        depressed
        class="px-10"
        >신청서 확인</v-btn
      >
    </v-col>
  </v-row>
  <!-- 완료영역 종료 -->

  <!--LAYER : 특약 - 사무원명단-->
  <v-dialog persistent v-model="dialog5" width="1000">
    <v-card>
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <p class="text-h6 font-weight-medium">사무원 명단</p>
        </div>
        <v-table class="v-board-table size-small mt-4">
          <thead>
            <tr>
              <th></th>
              <th class="text-body-1 font-weight-bold text-center">구분</th>
              <th class="text-body-1 font-weight-bold text-center">성명</th>
              <th class="text-body-1 font-weight-bold text-center">생년월일</th>
              <th class="text-body-1 font-weight-bold text-center">등록번호</th>
              <th class="text-body-1 font-weight-bold text-center">
                소급담보일
              </th>
              <th class="text-body-1 font-weight-bold text-center">
                할인/할증
              </th>
              <th class="text-body-1 font-weight-bold text-center">
                1인당 보험료
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center pa-0">
                <vue-feather
                  type="plus-square"
                  class="text-primary cursor-pointer"
                ></vue-feather>
              </td>
              <td class="text-body-1 text-center py-2">컨설팅</td>
              <td class="text-body-1 text-center py-2">
                <v-text-field
                  clearable
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  label="홍길동"
                />
              </td>
              <td class="text-body-1 text-center py-2">
                <v-text-field
                  clearable
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  label="19990101"
                />
              </td>
              <td class="text-body-1 text-center py-2">
                <v-text-field
                  clearable
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  label="123456789012"
                />
              </td>
              <td class="text-body-1 text-center py-2">
                <v-text-field
                  clearable
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  label="1999.12.12"
                />
              </td>
              <td class="text-body-1 text-center py-2">
                <v-text-field
                  clearable
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  label="0"
                />
              </td>
              <td class="text-body-1 text-center py-2">
                <v-text-field
                  clearable
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  label=""
                />
              </td>
              <td class="text-body-1 text-center pa-0">
                <vue-feather
                  type="minus-square"
                  class="text-gray cursor-pointer"
                ></vue-feather>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions class="d-flex align-center justify-center">
        <v-btn variant="outlined" color="black" @click="dialog5 = false"
          >닫기</v-btn
        >
        <v-btn variant="flat" color="primary">저장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
      <v-card-text>
        <InsuranceTable />
      </v-card-text>
    </v-card>
  </v-dialog>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
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

import { isLeapYear, getDateDiff, calByString } from '../../../util/util';
import { MessageBoxDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';

import apiUser from '@/api/api/user.api';
import apiA_TCAA0030A from '@/api/api/A_TCAA0030A';

import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import InsuranceTable from '@/components/InsuranceTable.vue';
import TermsOfCCAinsurance from '@/components/TermsOfCCAinsurance.vue';
import TermsOfContract from '@/components/TermsOfContract.vue';
import TermsOfCCA from '@/components/TermsOfCCA.vue';
import InsuranceForm2 from '@/components/InsuranceForm2.vue';

const route = useRoute();

const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

let INSR_RATE_TABLE = ref([]);
const onLoading = ref(false);
const isSubmit = ref(false);
const isReadOnlyAll = ref(false);

// 초기정보 설정
const userDTO = ref(new UserDTO());
const insuranceDTO = ref(new InsuranceDTO());
const messageBoxDTO = ref(new MessageBoxDTO());

const today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

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

  let sKey =
    sKey1.getValueBySplit(0) +
    '|' +
    sKey2.getValueBySplit(0) +
    '|' +
    sKey3.getValueBySplit(0);

  try {
    // 연간보험료 계산
    if (sSDt == null || sEDt == null) {
      nDCnt = 365;

      // 보험료 계산(기간별)
    } else {
      nDCnt = getDateDiff(sSDt, sEDt);
    }

    // 365일을 넘지 않도록 한다.
    if (nDCnt > 365) nDCnt = 365;

    // 기본보험료 조회
    //nInitAmt =  (eval("INSR_RATE_TABLE.value['" + sKey1 + "']['"+ sKey2 + "']['" + sKey3 +"']"));
    nInitAmt = INSR_RATE_TABLE.value.관세사_기본담보.보험료.filter(
      data => data.key === sKey
    )[0].amt;

    // 보험 계산식
    nTotAmt =
      Math.floor((nInitAmt * (1 + nRate / 100) * nDCnt) / 365 / 10) * 10;
  } catch (err) {
    console.log(err);
    nTotAmt = 0;
  }

  // 계산불가 일 경우 0으로 설정
  if (isNaN(nTotAmt)) nTotAmt = 0;

  return nTotAmt;
};

/**
 * 특약 보험료 계산
 *
 * @param sSDt  시작일자
 * @param sEDt  종료일자
 * @param sKey1 보상한도
 * @param sKey2 자기부담금
 * @param nPCnt 인원수
 */
const getInsrSpctAmt = (
  sSDt: string,
  sEDt: string,
  sKey1: string,
  sKey2: string,
  nPCnt: number
) => {
  if (!sKey1 || !sKey2) return 0;

  let nTotAmt = 0;
  let nInitAmt = 0;
  let nDCnt = 0;

  let sKey = sKey1.getValueBySplit(0) + '|' + sKey2.getValueBySplit(0);

  try {
    // 연간보험료 계산
    if (sSDt == null || sEDt == null) {
      nDCnt = 365;

      // 보험료 계산(기간별)
    } else {
      nDCnt = getDateDiff(sSDt, sEDt);
    }

    // 365일을 넘지 않도록 한다.
    if (nDCnt > 365) nDCnt = 365;

    // 기본보험료 조회
    //nInitAmt =  (eval("INSR_RATE_TABLE.value['특약']['" + sKey1 + "']['"+ sKey2 + "']"));
    nInitAmt = INSR_RATE_TABLE.value.관세사_특약.보험료.filter(
      data => data.key === sKey
    )[0].amt;

    // 보험 계산식
    nTotAmt = Math.floor((nInitAmt * (nDCnt / 365)) / 10) * 10;
  } catch (err) {
    console.log(err);
    nTotAmt = 0;
  }

  // 계산불가 일 경우 0으로 설정
  if (isNaN(nTotAmt)) nTotAmt = 0;

  return nTotAmt;
};

/**
 * 보험계약[기본담보] 보험료 재계산
 *
 * @param data 보험 명단 데이터
 */
const calInsrAmt = (data: any) => {
  let totAmt = 0;

  // 소급담보일이 수기등록이 아니면 보험 시작일자로 변경
  if (data.insr_retr_yn != 'Y') {
    data.insr_retr_dt = insuranceDTO.value.insr_st_dt;
  }

  if (data.cbr_data != undefined) {
    for (var idx in data.cbr_data) {
      // 연간 보험료 (365일 기준)
      data.cbr_data[idx].insr_base_amt = getInsrAmt(
        null,
        null,
        data.insr_pblc_brdn_rt,
        data.insr_clm_lt_amt,
        data.insr_psnl_brdn_amt,
        0,
        1
      );
      // 합계보험료 - 기간, 할인할증 적용 보험료
      data.cbr_data[idx].insr_amt = getInsrAmt(
        data.cbr_data[idx].insr_retr_dt,
        insuranceDTO.value.insr_cncls_dt,
        data.insr_pblc_brdn_rt,
        data.insr_clm_lt_amt,
        data.insr_psnl_brdn_amt,
        data.cbr_data[idx].insr_sale_rt,
        1
      );
      // 기본담보 보험료(할인할증적용)
      totAmt += data.cbr_data[idx].insr_amt;

      // 소급담보일이 수기등록이 아니면 보험 시작일자로 변경
      if (data.cbr_data[idx].insr_retr_yn != 'Y') {
        data.cbr_data[idx].insr_retr_dt = insuranceDTO.value.insr_st_dt;
      }
    }

    data.insr_amt = totAmt;
  }
};

/**
 * 보험계약[특별] 보험료 재계산
 *
 * @param data 보험 명단 데이터
 */
const calInsrSpctAmt = (data: any) => {
  let totAmt = 0;

  if (data.cbr_data != undefined) {
    for (var idx in data.cbr_data) {
      // 소급담보일이 수기등록이 아니면 보험 시작일자로 변경
      if (data.cbr_data[idx].insr_retr_yn != 'Y') {
        data.cbr_data[idx].insr_retr_dt = insuranceDTO.value.insr_st_dt;
      }

      data.cbr_data[idx].insr_amt = getInsrSpctAmt(
        data.cbr_data[idx].insr_retr_dt,
        insuranceDTO.value.insr_cncls_dt,
        data.insr_clm_lt_amt,
        data.insr_psnl_brdn_amt,
        1
      );

      totAmt += data.cbr_data[idx].insr_amt;
    }

    data.insr_amt = totAmt;
  }
  // console.log("calInsrSpctAmt >> 호출");
};

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
const selected = ref(false);
const selectbox1 = ref(['법인', '합동사무소', '통관취급법인']);

const dialog1 = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const dialog4 = ref(false);
const dialog5 = ref(false);

const isInsuranceFormDialog = ref(false);
const isTermsOfContractDialog = ref(false);
const isTermsOfCCAinsurancDialog = ref(false);

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

function onTermsOfCCAinsuranceClose(agrs: any) {
  isTermsOfCCAinsurancDialog.value = false;
  insuranceDTO.value.agr40_yn = agrs.value.agr40_yn;
  insuranceDTO.value.agr41_yn = agrs.value.agr41_yn;
}

function onInsuranceFormClose() {
  isInsuranceFormDialog.value = false;
}

function addCBR(list: any, cbr_type: string) {
  try {
    const cbrDataDTO = new CBRDataDTO();
    cbrDataDTO.cbr_type = cbr_type;
    cbrDataDTO.insr_retr_dt = list.insr_retr_dt;
    list.cbr_data.push(cbrDataDTO);
    list.cbr_cnt = list.cbr_data.length;

    // 추가했을때 보험료 재계산 ( 속도가 느릴경우 개별로 추후 전환)
    calInsrAmt(list);
  } catch (e) {
    console.log(e);
  }
}

function delCBR(list: any, rowIdx: number) {
  list.cbr_data.splice(rowIdx, 1);
  list.cbr_cnt = list.cbr_data.length;

  // 삭제했을때 보험료 재계산 ( 속도가 느릴경우 개별로 추후 전환)
  calInsrAmt(list);
}

function addSpctCBR(list: any, cbr_type: string) {
  // 10명 제한
  if (list?.cbr_data?.length > 9) return false;

  const cbrDataDTO = new CBRDataDTO();
  cbrDataDTO.cbr_type = cbr_type;
  cbrDataDTO.insr_retr_dt = insuranceDTO.value.insr_retr_dt;

  list.cbr_data.push(cbrDataDTO);
  list.cbr_cnt = list.cbr_data.length;

  // 추가했을때 보험료 재계산 ( 속도가 느릴경우 개별로 추후 전환)
  calInsrSpctAmt(list);
}

function delSpctCBR(list: any, rowIdx: number) {
  list.cbr_data.splice(rowIdx, 1);
  list.cbr_cnt = list.cbr_data.length;

  // 삭제했을때 보험료 재계산 ( 속도가 느릴경우 개별로 추후 전환)
  calInsrSpctAmt(list);
}

function onComplete_DaumPost(result: VueDaumPostcodeCompleteResult) {
  insuranceDTO.value.corp_post = result.zonecode;
  insuranceDTO.value.corp_addr = result.address;

  isDaumPostDialog.value = false;
}

function onNextPage(values: any) {
  tab.value = (parseInt(tab.value) + 1).toString();
}

function showMessageBoxByInsrDt() {
  messageBoxDTO.value.setInfo('보험기간 소급가입','소급가입을 원하시는 경우 록톤코리아(02-2011-0300)로 연락주시기 바랍니다.');
}



function chkValiation() {
  let isValiation = true;

  if (insuranceDTO.value.agr10_yn != 'Y') {
    messageBoxDTO.value.setInfo( '약관동의', '신청내용을 확인해주세요.');
    isValiation = false;
  } else if (insuranceDTO.value.agr20_yn != 'Y') {
    messageBoxDTO.value.setInfo( '약관동의', '보험 약관을 확인해주세요.');
    isValiation = false;
  } else if (insuranceDTO.value.agr30_yn != 'Y') {
    messageBoxDTO.value.setInfo(
      '약관동의',
      '계약체결 이행 등을 위한 개인(신용)정보처리에 동의해주세요.'
    );
    isValiation = false;
  } else if (insuranceDTO.value.agr40_yn != 'Y') {
    messageBoxDTO.value.setInfo( '약관동의', '상품설명확인서 확인');
    isValiation = false;
  } else if (insuranceDTO.value.agr50_yn != 'Y') {
    messageBoxDTO.value.setInfo(
      '약관동의',
      '가입 신청 및 피보험자 서명 갈음 사항을 확인해주세요.'
    );
    isValiation = false;
  } else {
  }
  return isValiation;
}

function nextStep() {}

const { handleSubmit, errors, setErrors } = useForm();

async function onSubmit2(values, actions) {
  try {
    await InsuranceYup.IND.validate(values, { abortEarly: false });
    // handle successful form submission
  } catch (e) {
    setErrors({ user_email: 'example@gmail.com' });
    // console.log(e);
    // if (e.inner) {
    //   const firstError = e.inner[0];
    //   console.log(firstError);
    //   // this.errors[firstError.path] = firstError.message
    //   // this.focusInput(firstError.path)
    // }
  }
  console.log('통과');
}

//   const submitForm = async () => {
//   const isValid = await handleSubmit()
//   if (!isValid) {
//     const firstErrorKey = Object.keys(errors.value)[0]
//     const errorElement = usernameInputRef.value.$el.querySelector(`[name=${firstErrorKey}]`)
//     errorElement.scrollIntoView({ behavior: 'smooth' })
//   } else {
//     // handle successful form submission
//   }
// }

/**
 * 가입
 * @param values 가입 정보
 */
async function onSubmit(params: any) {
  //if(!chkValiation()) return false;

  let result;
  // console.log(insuranceDTO.value);
  // 사용자 등록
  if (actionType.value == 'insert') {
    insuranceDTO.value.insr_year = insuranceDTO.value.insr_st_dt.substring(
      0,
      4
    );

    result = await apiA_TCAA0030A.setDBIns(insuranceDTO.value);
  } else if (actionType.value == 'update') {
    result = await apiA_TCAA0030A.setDBUpd(insuranceDTO.value);
  } else {
    //alert('조회 상태에서는 저장할 수 없습니다.', actionType.value );
    return false;
  }

  if (result.success) {
    isSubmit.value = true;
  } else {
    console.log(result);
    alert('보험가입 실패');
  }
}

function onTest(sVal: string) {
  insuranceDTO.value.user_cd = sVal;

  if (sVal == 'IND') {
    insuranceDTO.value.cons_data.insr_amt = 0;
    insuranceDTO.value.cons_join_yn = 'N';
  } else if (sVal == 'JNT') {
    insuranceDTO.value.cons_data.insr_amt = 0;
    insuranceDTO.value.cons_join_yn = 'N';
  } else if (sVal == 'COR') {
    insuranceDTO.value.cons_data.insr_amt = 0;
    insuranceDTO.value.cons_join_yn = 'N';
  } else {
  }
}

/**
 * 가입
 * @param values
 */
async function getUserInfoByUser() {
  const userResult = await apiUser.getUserInfo();

  // 사용자DTO
  Object.assign(userDTO.value, userResult[0]);

  // 가입정보DTO
  Object.assign(insuranceDTO.value, userDTO.value);
}

/**
 * 보험계약[기본담보] - 통관 보험료 계산
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

    // 특약 시작,종료일자 설정
    // insuranceDTO.value.spct_data.insr_st_dt = insuranceDTO.value.insr_st_dt;
    // insuranceDTO.value.spct_data.insr_cncls_dt = insuranceDTO.value.insr_cncls_dt;

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

    // 특약 재계산
    if (insuranceDTO.value.spct_join_yn == 'Y') {
      calInsrSpctAmt(insuranceDTO.value.spct_data);
    }

    if (insuranceDTO.value.user_cd == 'IND') {
      calInsrAmt(insuranceDTO.value);

      insuranceDTO.value.insr_amt = getInsrAmt(
        insuranceDTO.value.insr_st_dt,
        insuranceDTO.value.insr_cncls_dt,
        insuranceDTO.value.insr_pblc_brdn_rt,
        insuranceDTO.value.insr_clm_lt_amt,
        insuranceDTO.value.insr_psnl_brdn_amt,
        insuranceDTO.value.insr_sale_rt,
        1
      );
    } else {
      calInsrAmt(insuranceDTO.value);
    }
  }
);

/**
 * 보험계약[기본담보] - 컨설팅 보험료 계산
 */
watch(
  () => [
    insuranceDTO.value.cons_data.insr_pblc_brdn_rt,
    insuranceDTO.value.cons_data.insr_clm_lt_amt,
    insuranceDTO.value.cons_data.insr_psnl_brdn_amt,
    insuranceDTO.value.cons_data.insr_sale_rt
  ],
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    // 기준보험료 계산
    insuranceDTO.value.cons_data.insr_base_amt = getInsrAmt(
      null,
      null,
      insuranceDTO.value.cons_data.insr_pblc_brdn_rt,
      insuranceDTO.value.cons_data.insr_clm_lt_amt,
      insuranceDTO.value.cons_data.insr_psnl_brdn_amt,
      0,
      1
    );

    calInsrAmt(insuranceDTO.value.cons_data);
  }
);

/**
 * 보험계약[기본담보] 보험기간 - 시작일자 변경시 종료일자는 자동으로 년도+1-01-01 변경 및 과거 날짜 선택불가
 */
watch(
  () => [insuranceDTO.value.insr_st_dt],
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    insuranceDTO.value.insr_cncls_dt =
      Number(insuranceDTO.value.insr_st_dt.substring(0, 4)) + 1 + '-01-01';
    if (today > newValue) {
      insuranceDTO.value.insr_st_dt = today;
      showMessageBoxByInsrDt();
    }
    // }
  }
);

/**
 * 보험계약[컨설팅] 보험기간 - 시작일자 변경시 종료일자는 자동으로 년도+1-01-01 로 변경 및 과거 날짜 선택불가
 */
//  watch(() =>  [insuranceDTO.value.cons_data.insr_st_dt], (newValue, oldValue) => {

//     insuranceDTO.value.cons_data.insr_cncls_dt = Number(insuranceDTO.value.cons_data.insr_st_dt.substring(0, 4))+1 + "-01-01";
//     if(today > newValue) {

//       insuranceDTO.value.cons_data.insr_st_dt = today;
//       showMessageBoxByInsrDt();
//     }
// });

/**
 * 보험계약[특약] 보험기간 - 시작일자 변경시 종료일자는 자동으로 년도+1-01-01 변경 및 과거 날짜 선택불가
 */
// watch(() =>  [insuranceDTO.value.spct_data.insr_st_dt], (newValue, oldValue) => {
//     insuranceDTO.value.spct_data.insr_cncls_dt = Number(insuranceDTO.value.spct_data.insr_st_dt.substring(0, 4))+1 + "-01-01";
//     if(today > newValue) {
//       insuranceDTO.value.spct_data.insr_st_dt = today;
//       //showMessageBoxByInsrDt();

//     }
// });

/**
 * 보험계약[특별약정] 보험료 계산
 */
watch(
  () => [
    insuranceDTO.value.spct_data.insr_clm_lt_amt,
    insuranceDTO.value.spct_data.insr_psnl_brdn_amt
  ],
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    insuranceDTO.value.spct_data.insr_base_amt = getInsrSpctAmt(
      null,
      null,
      insuranceDTO.value.spct_data.insr_clm_lt_amt,
      insuranceDTO.value.spct_data.insr_psnl_brdn_amt,
      1
    );

    insuranceDTO.value.spct_data.insr_amt = getInsrSpctAmt(
      insuranceDTO.value.insr_st_dt,
      insuranceDTO.value.insr_cncls_dt,
      insuranceDTO.value.spct_data.insr_clm_lt_amt,
      insuranceDTO.value.spct_data.insr_psnl_brdn_amt,
      1
    );

    calInsrSpctAmt(insuranceDTO.value.spct_data);
  }
);

/**
 *
 */
watch(
  () => insuranceDTO.value.cons_join_yn,
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    if (newValue == 'N') {
      insuranceDTO.value.cons_data.insr_amt = 0;
      insuranceDTO.value.cons_data.cbr_data.length = 0;
    } else {
      addCBR(insuranceDTO.value.cons_data, '컨설팅');
      calInsrAmt(insuranceDTO.value.cons_data);
    }
  }
);

watch(
  () => insuranceDTO.value.spct_join_yn,
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    if (newValue == 'N') {
      insuranceDTO.value.spct_data.insr_amt = 0;
      insuranceDTO.value.spct_data.cbr_data.length = 0;
    } else {
      if (insuranceDTO.value.spct_data.cbr_data.length == 0) {
        addSpctCBR(insuranceDTO.value.spct_data, '특약');
      }
      calInsrSpctAmt(insuranceDTO.value.spct_data);
    }
  }
);

const isShowInsrClmLtAmt = ref(false); // 보상한도
const isShowInsrPsnlBrdnAmt = ref(false); // 자부담금

/**
 * 보험계약[기본담보] 보상한도 변경시 로직 적용
 * -  보상한도 1천만원일 아니면 - 자기부담금 1백만원 활성화
 */
watch(
  () => [insuranceDTO.value.insr_clm_lt_amt],
  (newValue, oldValue) => {
    const nVal = newValue?.toString()?.getValueBySplit(1);

    if (nVal == '2천만원' || nVal == '3천만원' || nVal == '5천만원') {
      isShowInsrPsnlBrdnAmt.value = true;
    } else {
      isShowInsrPsnlBrdnAmt.value = false;

      // 1천만원 선택시 특약 가입제한
      insuranceDTO.value.spct_join_yn = 'N';
    }

    // 기본담보(통관) - 보상한도(연보험)
    insuranceDTO.value.insr_year_clm_lt_amt = calByString(
      insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1) +
        '*' +
        insuranceDTO.value?.cbr_cnt,
      '천만원'
    );
  }
);

/**
 * 보험계약[기본담보] 자기부담금 변경시 로직 적용
 * -  자기부담금 1백만원 선택시  - 보상한도는 2,3,5천 비활성화
 */
watch(
  () => [insuranceDTO.value.insr_psnl_brdn_amt],
  (newValue, oldValue) => {
    if (newValue?.toString()?.getValueBySplit(1) == '1백만원') {
      isShowInsrClmLtAmt.value = true;
    } else {
      isShowInsrClmLtAmt.value = false;
    }
  }
);

const isShowConsDataInsrClmLtAmt = ref(false); // 컨설팅 - 보상한도
const isShowConsDataInsrPsnlBrdnAmt = ref(false); // 컨설팅 - 자부담금

/**
 * 보험계약[기본담보]-컨설팅 보상한도 변경시 로직 적용
 * -  보상한도 1천만원일 아니면 - 자기부담금 1백만원 활성화
 */
watch(
  () => [insuranceDTO.value.cons_data.insr_clm_lt_amt],
  (newValue, oldValue) => {
    const nVal = newValue?.toString()?.getValueBySplit(1);

    if (nVal == '2천만원' || nVal == '3천만원' || nVal == '5천만원') {
      isShowConsDataInsrPsnlBrdnAmt.value = true;
    } else {
      isShowConsDataInsrPsnlBrdnAmt.value = false;
    }

    // 기본담보(컨설팅) - 보상한도(연보험)
    insuranceDTO.value.cons_data.insr_year_clm_lt_amt = calByString(
      insuranceDTO.value.cons_data.insr_clm_lt_amt?.getValueBySplit(1) +
        '*' +
        insuranceDTO.value?.cons_data.cbr_cnt,
      '천만원'
    );
  }
);

/**
 * 보험계약[기본담보]-컨설팅 자기부담금 변경시 로직 적용
 * -  자기부담금 1백만원 선택시  - 보상한도는 2,3,5천 비활성화
 */
watch(
  () => [insuranceDTO.value.cons_data.insr_psnl_brdn_amt],
  (newValue, oldValue) => {
    if (newValue?.toString()?.getValueBySplit(1) == '1백만원') {
      isShowConsDataInsrClmLtAmt.value = true;
    } else {
      isShowConsDataInsrClmLtAmt.value = false;
    }
  }
);

/**
 * 보험계약[기본담보]-컨설팅 자기부담금 변경시 로직 적용
 * -  자기부담금 1백만원 선택시  - 보상한도는 2,3,5천 비활성화
 */
watch(
  () => [insuranceDTO.value.spct_join_yn],
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    const nVal = insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1);

    if (nVal == '1천만원' && newValue == 'Y') {
      insuranceDTO.value.spct_join_yn = 'N';
      messageBoxDTO.value.setInfo(
        true,
        '보험계약 - 특약',
        '보상한도 2천만원 이상 가입시 선택 가능합니다.'
      );
    } else {
    }
  }
);

/**
 * 합계보험료변경시 - 기본담보(통관), 기본담보(컨설팅), 특약 보험료 변경시 재계산
 */
watch(
  () => [
    insuranceDTO.value.insr_amt,
    insuranceDTO.value.cons_data.insr_amt,
    insuranceDTO.value.spct_data.insr_amt
  ],
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    // 기본담보(통관) - 보상한도(연보험)
    insuranceDTO.value.insr_year_clm_lt_amt = calByString(
      insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1) +
        '*' +
        insuranceDTO.value?.cbr_cnt,
      '천만원'
    );

    // 기본담보(컨설팅) - 보상한도(연보험)
    insuranceDTO.value.cons_data.insr_year_clm_lt_amt = calByString(
      insuranceDTO.value.cons_data.insr_clm_lt_amt?.getValueBySplit(1) +
        '*' +
        insuranceDTO.value?.cons_data.cbr_cnt,
      '천만원'
    );

    // 특약 - 보상한도(연보험)
    insuranceDTO.value.spct_data.insr_year_clm_lt_amt = calByString(
      insuranceDTO.value.spct_data.insr_clm_lt_amt?.getValueBySplit(1) +
        '*' +
        insuranceDTO.value?.spct_data.cbr_cnt,
      '천만원'
    );

    // 산출보험료 (통관 합계보험료 + 컨설팅 합계보험료)
    insuranceDTO.value.insr_premium_amt =
      insuranceDTO.value.insr_amt + insuranceDTO.value.cons_data.insr_amt;

    // 최종보험료
    insuranceDTO.value.insr_tot_amt =
      insuranceDTO.value?.insr_amt +
      insuranceDTO.value?.cons_data?.insr_amt +
      insuranceDTO.value?.spct_data?.insr_amt;
  }
);

/**
 * 보험계약[기본담보] - 관세사 할인할증 값 변경시 재계산
 */
watch(
  insuranceDTO.value.cbr_data,
  (newVal, oldVal) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    newVal.forEach((row, index) => {
      //  console.log(newVal[index].insr_sale_rt+ ":" + oldVal[index].insr_sale_rt );
      if ((newVal[index].insr_sale_rt! = oldVal[index].insr_sale_rt)) {
        calInsrAmt(insuranceDTO.value);
      }
    });
  },
  { deep: true }
);

/**
 * 보험계약[기본담보] - 컨설팅 할인할증 값 변경시 재계산
 */
watch(
  insuranceDTO.value.cons_data.cbr_data,
  (newVal, oldVal) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    newVal.forEach((row, index) => {
      // console.log(newVal[index].insr_sale_rt+ ":" + oldVal[index].insr_sale_rt );
      if ((newVal[index].insr_sale_rt! = oldVal[index].insr_sale_rt)) {
        calInsrAmt(insuranceDTO.value.cons_data);
      }
    });
  },
  { deep: true }
);

const actionType = ref('');
const insuranceUUID = ref('');
const insuranceNO = ref('');

/**
 * 초기로딩시 가입 / 수정 / 조회 를 선택해서 보여준다.
 */
onMounted(async () => {
  isReadOnlyAll.value = false;

  actionType.value  = route.params.actionType||'insert';
  insuranceUUID.value = route.params.insuranceUUID;
  console.log( route.query);
  console.log( route.query);
  return false;
  // 보험료 조회
  const params = { insurnace_type: _AUTH_USER.value.businessCd };
  const resultData = await apiA_TCAA0030A.getDBSelInsuranceRate(params);
  INSR_RATE_TABLE.value = resultData.data[0].contents;
  insuranceNO.value = resultData.data[0].insurance_no;

  /**
   * 신규가입
   */
  if (insuranceUUID.value == '') {
    // 신규가입을 할수 있는지 없는지 상태파악 필요

    // 올해의 마지막 날짜를 나타내는 Date 객체 생성
    const lastDay = Number(today.substring(0, 4)) + 1 + '-01-01';
    insuranceDTO.value.insr_reg_dt = today;

    // 사용자 정보 조회
    await getUserInfoByUser();

    insuranceDTO.value.user_cd = userDTO.value.user_cd;
    insuranceDTO.value.user_nm = userDTO.value.user_nm;
    insuranceDTO.value.user_email = userDTO.value.user_email;
    insuranceDTO.value.user_hpno = userDTO.value.user_hpno;

    if (insuranceDTO.value.user_cd == 'IND') {
      insuranceDTO.value.user_birth = userDTO.value.user_birth;
      insuranceDTO.value.user_regno = userDTO.value.user_regno;

      // 개인일 경우에는 명단이 없으나 총 1명으로 계산한다.
      insuranceDTO.value.cbr_cnt = 1;
    } else {
      insuranceDTO.value.corp_nm = userDTO.value.corp_nm;
      insuranceDTO.value.corp_type = userDTO.value.corp_type;
      insuranceDTO.value.corp_cnno = userDTO.value.corp_cnno;
      insuranceDTO.value.corp_bnno = userDTO.value.corp_bnno;

      insuranceDTO.value.cons_join_yn = 'N';
      addCBR(insuranceDTO.value, '통관');
    }

    insuranceDTO.value.spct_join_yn = 'N';

    // 기본담보 시작,종료일
    insuranceDTO.value.insr_st_dt = today;
    insuranceDTO.value.insr_cncls_dt = lastDay;
    insuranceDTO.value.insurance_no = insuranceNO.value;

    // 컨설팅 시작,종료일
    // insuranceDTO.value.cons_data.insr_st_dt = today;
    // insuranceDTO.value.cons_data.insr_cncls_dt = lastDay;

    // 특약 시작,종료일
    // insuranceDTO.value.spct_data.insr_st_dt = today;
    // insuranceDTO.value.spct_data.insr_cncls_dt = lastDay;
    // insuranceDTO.value = testData.data[0].contents.관세사_기본담보;
    // INSR_SPEC_DATA.value = testData.data[0].contents.관세사_특약;
  } else {
    const params = { insurance_uuid: insuranceUUID.value };
    const resultData = await apiA_TCAA0030A.getDBSel(params);

    // if (resultData.data.length == 0) {
    //   router.push('/404');
    // } else {
    //   Object.assign(insuranceDTO.value, resultData.data[0]);
    // }
  }

  onLoading.value = true;
});
</script>
