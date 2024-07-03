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
            <v-tab value="1" class="flex-grow-1" :disabled="true">가입정보</v-tab>
            <v-tab value="2" class="flex-grow-1" :disabled="true">보험계약 {{ renewalYN == 'Y'?'(갱신)':'' }}</v-tab>
            <v-tab value="3" class="flex-grow-1" :disabled="true">약관동의</v-tab>
          </v-tabs>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-16" justify="center" v-if="onLoading">
      <v-col :cols="checkMobile.isMobile?'12':'8'" :class="checkMobile.isMobile?'pa-2':''">
        <v-window v-model="tab">
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
              <v-col cols="12" :class="checkMobile.isMobile?'pt-2':'pt-6'" v-if="insuranceDTO.user_cd == 'IND'">
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
                    v-if="insuranceDTO.user_cd == 'IND'"
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
                        :readonly="isReadOnlyAll"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno2"
                        name="corp_telno2"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                        :readonly="isReadOnlyAll"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno3"
                        name="corp_telno3"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                        :readonly="isReadOnlyAll"
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

                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>소속 지방회</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" class="w-200"  single-line density="comfortable"></VSelectWithValidation>

                    </div>
                  </v-col>

                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>이메일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col extend">{{ insuranceDTO.corp_cust_email }}
                      <!-- <VTextFieldWithValidation
                        v-model="insuranceDTO.user_email"
                        name="user_email"
                        label="이메일"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      /> -->
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

              <!-- 법인/합동 시작-->
              <v-col cols="12" :class="checkMobile.isMobile?'pt-2':'pt-6'" v-if="insuranceDTO.user_cd != 'IND'">
                <v-row class="v-board-table">
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>법인명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ insuranceDTO.user_nm }}
                      <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_nm"  name="corp_nm" label="사무소명" single-line density="comfortable" readonly /> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>대표자 성명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation v-model="insuranceDTO.corp_ceo_nm"  name="corp_ceo_nm" placeholder="대표자 성명" single-line density="comfortable" />
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
                    <div class="data-col col-tel">
                       <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno1"
                        name="corp_telno1"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '###' }"
                        :readonly="isReadOnlyAll"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno2"
                        name="corp_telno2"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                        :readonly="isReadOnlyAll"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="insuranceDTO.corp_telno3"
                        name="corp_telno3"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                        :readonly="isReadOnlyAll"
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
                        name="corp_faxno"
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
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>휴대전화</p>
                    </div>
                    <div class="data-col">{{ insuranceDTO.corp_cust_hpno }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>이메일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">{{ insuranceDTO.corp_cust_email }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>소속 지방회</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" class="w-200"  single-line density="comfortable"></VSelectWithValidation>
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
              <!-- 법인/합동 끝-->

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
                        :min="insr_st_dt_min"
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
                    :sm="insuranceDTO.user_cd === 'COR' ? 12 : 6"
                    class="v-col"
                  >
                    <div class="head-col">
                      <p v-if="insuranceDTO.user_cd === 'IND'">소급담보일</p>
                      <p v-if="insuranceDTO.user_cd === 'COR'">법인<br/>소급담보일</p>
                    </div>
                    <div class="data-col"> {{ insuranceDTO.insr_retr_dt }}
                      <!-- <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_retr_dt"
                        name="insr_retr_dt"
                        label=""
                        type="date"
                        single-line
                        density="comfortable"
                        disabled
                      /> -->
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="v-col"
                    v-if="insuranceDTO.user_cd === 'COR'"
                  >
                    <div class="head-col">
                      <p>인원수 할인</p>
                    </div>
                    <div class="data-col">{{ insuranceDTO.insr_pcnt_sale_rt }} %
                      <!-- <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_pcnt_sale_rt"
                        name="insr_pcnt_sale_rt"
                        label=""
                        single-line
                        density="comfortable"
                        disabled
                      /> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p v-if="insuranceDTO.user_cd == 'IND'">
                        무사고 할인 /<br />사고 할증
                      </p>
                      <p v-if="insuranceDTO.user_cd != 'IND'">무사고 할인</p>
                    </div>
                    <div class="data-col text-center" >{{ insuranceDTO.insr_sale_rt }} %
                      <!-- <VTextFieldWithValidation
                        v-model="insuranceDTO.insr_sale_rt"
                        name="insr_sale_rt"
                        label=""
                        single-line
                        density="comfortable"
                        disabled
                      /> -->
                    </div>
                  </v-col>

                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>공동보험</p>
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
                          value="0|공동보험 적용"
                          >공동보험 적용</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="50|공동보험 미적용"
                          >공동보험 미적용</v-btn
                        >
                      </v-btn-toggle>
                      <p
                        class="text-caption font-weight-light  color-gray mt-2 flex-grow-1"
                      >
                        <i class="mdi mdi-alert-circle-outline mr-2"></i
                        >공동보험 미적용 선택 시 기준보험료 50% 할증 (보험료표 참조)
                        <v-tooltip activator="parent" location="top">
                          &check; 지급보험금 예시
                          <v-divider class="my-1"/>
                          <table class="tooltip-table mt-4 text-center" style="width: 620px; ">
                            <colgroup>
                              <col style="width: auto"/>
                              <col style="width: 33.333%"/>
                              <col style="width: 33.333%"/>
                            </colgroup>
                            <tbody>
                            <tr>
                              <th>공동보험비율</th>
                              <th>미적용 (0%)</th>
                              <th class="border-right-0">적용 (15.5% ~ 30.5%)</th>
                            </tr>
                            <tr>
                              <td class="border-left-0">보험사 지급 비율</td>
                              <td>보험사 100% 지급</td>
                              <td class="border-right-0">보험사 84.5% ~ 69.5% 지급</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                              <td colspan="3" class="bg-background border-right-0">
                                <p class="color-primary text-14">손해배상액이 3천5백만원으로 확정된 경우 예상 보험금은?</p>
                                <p class="color-gray-shadow">(보상한도 5천만원/자기부담금 2백만원 조건 가입시)</p>
                                <p class="mt-4">손해배상액 3500만원 - 자기부담금 2백만원 = <span class="text-12">33,000,000원</span></p>
                              </td>
                            </tr>
                            <tr>
                              <td class="border-left-0">수령보험금</td>
                              <td>
                                <p>33,000,000원</p>
                                <p class="color-gray-shadow">(전액수령)</p>
                              </td>
                              <td>
                                <p>22,935,000원</p>
                                <p class="color-gray-shadow">(10,065,000원 차감 -30.5% 적용)</p>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </v-tooltip>
                      </p>
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
                          value="30000000|3천만원"
                          style="flex-basis: 20%;min-width: 20px !important; padding-left: 0px; padding-right: 0px"
                          >3천만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="50000000|5천만원"
                          style="flex-basis: 20%;min-width: 20px !important; padding-left: 0px; padding-right: 0px"
                          >5천만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-1"
                          value="100000000|1억원"
                          style="flex-basis: 20%;min-width: 20px !important; padding-left: 0px; padding-right: 0px"
                          >1억원</v-btn
                        >
                        <v-btn
                            v-if="insuranceDTO.user_cd === 'COR' && insuranceDTO.insr_year > 2023"
                            color="primary"
                            class="flex-grow-1"
                            value="150000000|1억5천만원"
                        >1억5천만원</v-btn
                        >
                        <v-btn
                          v-if="insuranceDTO.user_cd === 'IND'"
                          color="primary"
                          class="flex-grow-1"
                          value="200000000|2억원"
                          style="flex-basis: 20%;min-width: 20px !important; padding-left: 0px; padding-right: 0px"
                          >2억원</v-btn
                        >
                        <v-btn
                            v-if="insuranceDTO.user_cd === 'IND' && insuranceDTO.insr_year > 2023"
                            color="primary"
                            class="flex-grow-1"
                            value="250000000|2억5천만원"
                        >2억5천만원</v-btn>
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light color-gray mt-2" v-if="insuranceDTO.user_cd === 'IND'" >
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1 청구당 / 연간 총 보상한도
                      </p>
                      <p class="text-caption font-weight-light color-gray mt-2" v-else>
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1 청구당 / 연간 총 보상한도는 1청구당 한도에 소속 세무사 수를 곱한 금액임
                      </p>
                      <v-divider class="border-0" />
                      <!-- 법인인 경우 문구 표기 시작 -->
                      <p class="text-caption font-weight-light color-gray" v-if="insuranceDTO.user_cd === 'COR'">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>연간 총 보상한도는 10억원을 초과하지 못함
                      </p>
                      <!-- 법인인 경우 문구 표기 끝 -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col h-100">
                    <div class="head-col">
                      <p>자기부담금</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100 align-stretch">
                      <v-btn-toggle
                        v-model="insuranceDTO.insr_psnl_brdn_amt"
                        name="insr_psnl_brdn_amt"
                        divided
                        variant="outlined"
                        class="align-stretch d-flex flex-wrap overflow-visible w-100"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          v-if="insuranceDTO.user_cd === 'IND'"
                          color="primary"
                          :class="checkMobile.isMobile?'flex-grow-0':'flex-grow-1'"
                          :style="checkMobile.isMobile?'flex-basis: 33.3%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="1000000|1백만원"
                          >1백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          :class="checkMobile.isMobile?'flex-grow-0':'flex-grow-1'"
                          :style="checkMobile.isMobile?'flex-basis: 33.3%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="2000000|2백만원"
                          >2백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          :class="checkMobile.isMobile?'flex-grow-0':'flex-grow-1'"
                          :style="checkMobile.isMobile?'flex-basis: 33.3%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="3000000|3백만원"
                          >3백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          :class="checkMobile.isMobile?'flex-grow-0':'flex-grow-1'"
                          :style="checkMobile.isMobile?'flex-basis: 33.3%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="5000000|5백만원"
                          >5백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          :class="checkMobile.isMobile?'flex-grow-0':'flex-grow-1'"
                          :style="checkMobile.isMobile?'flex-basis: 33.3%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="7000000|7백만원"
                          >7백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          :class="checkMobile.isMobile?'flex-grow-0':'flex-grow-1'"
                          :style="checkMobile.isMobile?'flex-basis: 33.3%; border: 1px solid #EEEEEE; text-align: center;':''"
                          value="10000000|1천만원"
                          >1천만원</v-btn
                        >
                      </v-btn-toggle>
                      <p :class="checkMobile.isMobile?'text-caption font-weight-light color-gray mt-15':'text-caption font-weight-light color-gray mt-2'">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <!-- 세무사 명단 시작 -->
              <v-col cols="12" sm="12" :class="checkMobile.isMobile?'py-0 px-4 mb-4':'py-0 px-14 mb-10'" v-if="insuranceDTO.user_cd != 'IND'">
                <div class="d-flex align-center mb-4 mt-6">
                  <svg width="8" height="12" fill="none" stroke-width="3" class="mr-2">
                    <line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line>
                    <line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line>
                  </svg>
                  <p class="text-body-1 font-weight-bold">세무사 명단</p>
                  <p class="text-body-2 color-gray-shadow ml-4">
                    총
                    <span class="color-primary">{{ insuranceDTO.cbr_data.length }}</span>명
                  </p>
                  <div class="ml-auto">
                    <v-btn variant="outlined" @click="resetCBRData()" size="small" class="min-width-auto px-1 mr-1"> 
                      초기화<v-icon icon="mdi-autorenew"></v-icon>
                    </v-btn>
                    <v-btn variant="elevated" color="white" @click="addCBR(insuranceDTO)" size="small" class="min-width-auto pa-0">
                      <vue-feather type="plus-square" class="text-primary">
                      </vue-feather>
                    </v-btn>
                  </div>
                </div>
                <v-table class="v-board-table size-small">
                  <colgroup>
                    <col style="width: 50px" />
                    <col style="width: 80px" />
                    <col style="width: 80px" />
                    <col style="width: 80px" />
                    <col style="width: auto" />
                    <!-- <col style="width: 82px" />
                    <col style="width: 82px" /> -->
                    <col style="width: 40px" />
                    <col style="width: auto" />
                    <col style="width: 30px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-left">&nbsp;성명</th>
                      <th class="text-left">생년월일</th>
                      <th class="text-left">등록번호</th>
                      <!-- <th class="text-center">보험시작일</th>
                      <th class="text-center">보험종료일</th> -->
                      <th class="text-center">소급담보일 / 보험시작일</th>
                      <th class="text-center">할인 할증</th>
                      <th class="text-center">1인당 보험료</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="(row, index) in insuranceDTO.cbr_data">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>
                        <VTextFieldWithValidation
                          v-model="row.cbr_nm"
                          name="cbr_nm"
                          label="홍길동"
                          density="compact"
                          color="primary"
                          variant="underlined"
                          single-line
                          :disabled="row.isCheck"
                        />
                      </td>
                      <td>
                        <VTextFieldWithValidation
                          v-model="row.cbr_brdt"
                          name="cbr_brdt"
                          label="781213"
                          density="compact"
                          color="primary"
                          variant="underlined"
                          :maskOption="{ mask: '######' }"
                          single-line
                          :disabled="row.isCheck"
                        />
                      </td>
                      <td>
                        <VTextFieldWithValidation
                          v-model="row.cbr_regno"
                          name="cbr_regno"
                          label="1234567"
                          color="primary"
                          density="compact"
                          variant="underlined"
                          :maskOption="{ mask: '#######' }"
                          single-line
                          :disabled="row.isCheck"
                        />
                        <!-- <v-text-field v-model="row.cbr_regno" variant="underlined" color="primary" hide-details="auto" density="compact" single-line label="1234567"  :disabled="row.isCheck"/> -->
                      </td>
                      <!-- <td><v-text-field v-model="row.insr_st_dt" :min="insuranceDTO.insr_st_dt"  :max="insuranceDTO.insr_cncls_dt" variant="underlined" color="primary" hide-details="auto" density="compact" single-line type="date"  :disabled="row.isCheck || true" /></td>
                      <td>{{row.insr_cncls_dt}}</td> -->
                      <td>{{row.insr_retr_dt}} / {{row.insr_st_dt}}</td>
                      <td v-if="row.isCheck">{{row.insr_sale_rt}}%</td>
                      <td v-if="row.isCheck">
                        {{ Number(row.insr_amt).toLocaleString() }}원
                      </td>
                      <td colspan="2" v-if="!row.isCheck"><v-btn variant="outlined" @click="chkSaleRtCOR(insuranceDTO, index)">인증</v-btn></td>
                      <td>
                        <v-btn variant="elevated" color="white" @click="delCBR(insuranceDTO, index)" size="small" class="min-width-auto pa-0" v-if="!isReadOnlyAll">
                        <vue-feather type="minus-square" class="text-gray cursor-pointer vertical-align-middle"></vue-feather>
                        </v-btn>
                      </td>
                    </tr>
                     

                      
                    <!-- <tr>
                      <td>1</td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line label="홍길동" disabled/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line label="820101" disabled/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line label="1234567" disabled/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line type="date" disabled/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line type="date" disabled/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line type="date" disabled/></td>
                      <td>2%</td>
                      <td>
                        12,000원
                        <v-btn variant="outlined" class="d-none">인증</v-btn>
                      </td>
                      <td>
                        <vue-feather type="minus-square" class="text-gray cursor-pointer vertical-align-middle" v-if="!isReadOnlyAll">
                          <v-btn variant="none" @click="delCBR(insuranceDTO, index)"></v-btn>
                        </vue-feather>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line label="홍길동"/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line label="820101"/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line label="1234567"/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line type="date"/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line type="date"/></td>
                      <td><v-text-field name="" variant="underlined" color="primary" hide-details="auto" density="compact" single-line type="date"/></td>
                      <td>0%</td>
                      <td>
                      
                        <v-btn variant="outlined" class="">인증</v-btn>
                      </td>
                      <td>
                        <vue-feather type="minus-square" class="text-gray cursor-pointer vertical-align-middle" v-if="!isReadOnlyAll">
                          <v-btn variant="none" @click="delCBR(insuranceDTO, index)"></v-btn>
                        </vue-feather>
                      </td>
                    </tr>
                    <tr v-for="(row, index) in insuranceDTO.cbr_data">
                      <td class="text-center">{{ index + 1 }}</td>
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
                          :disabled="row.isCheck"
                          
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
                          :disabled="row.isCheck"
                          
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
                          label="1234567"
                          :disabled="row.isCheck"
                        />
                      </td>
                      <td>
                        <v-text-field
                          type="date"
                          name=""
                          variant="outlined"
                          hide-details="auto"
                          density="compact"
                          class="text-body-2"
                          single-line
                          label=""
                        />
                      </td>
                      <td class="text-center">{{ row.insr_retr_dt }}</td>
                      <td class="text-center">{{ row.insr_sale_rt }}%</td>
                      <td class="text-center">
                        {{ Number(row.insr_amt).toLocaleString() }}원
                      </td>
                      <td class="text-center">
                        
                       
                      </td>
                    </tr> -->
                  </tbody>
                </v-table>
                <!-- <p class="text-14 color-error font-weight-light mt-2"><i class="mdi mdi-alert-circle-outline mr-1"></i>세무사를 인증해주세요.</p> -->
              </v-col>
              <!--// 세무사 명단 종료 -->
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
                        <v-btn color="gray" variant="outlined" class="ml-4" :size="checkMobile.isMobile?'small':'default'">보기
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
                            <TermsOfPolicy
                                :pdf_file_name=pdfFileName
                                v-if="dialog2"
                                @close="dialog2 = false"
                            ></TermsOfPolicy>
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
                          :insurance_dto="insuranceDTO"
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
                    이 보험상품은 한국세무사회를 단체계약자, 가입 회원을
                    피보험자로 하는 단체계약 프로그램입니다.
                  </li>
                  <li v-if="insuranceDTO.insr_year=='2024'&& insuranceDTO.business_cd">
                    보험회사 : DB손해보험㈜ <template v-if="checkMobile.isMobile"><br/></template><template v-else><span class="text-caption mx-3">|</span></template>보험중개사 : 록톤컴퍼니즈코리아손해보험중개(주)
                  </li>
                  <li v-else>
                    보험회사 : 현대해상화재보험㈜ <template v-if="checkMobile.isMobile"><br/></template><template v-else><span class="text-caption mx-3">|</span></template>보험중개사 : 록톤컴퍼니즈코리아손해보험중개(주)
                  </li>
                  <li>
                    보험료 입금 계좌번호 :
                    <b class="font-weight-medium text-error text-18"
                      >신한은행 140-009-190827</b
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
                  <!-- <v-checkbox label="(필수) 본인은 상기 신청 내용에 대하여 동의합니다." value="step2-check-4" hide-details="auto" class="v-checkbox" v-model="insuranceDTO.AGR_DATA.AGR5_YN" true-value="Y" false-value="N"></v-checkbox> -->
                  <!-- <v-btn variant="outlined" color="primary" class="bg-white">가입 신청서 미리보기</v-btn> -->
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
                  to="/contract/TAX/V_TTAX0030A10"
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
              <p class="text-body-2 color-gray-shadow">공동보험</p>
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
            <v-col cols="12" v-if="insuranceDTO.user_cd == 'IND'">
              <p class="text-body-2 color-gray-shadow">할인 및 할증율</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.insr_sale_rt }}% 적용
              </p>
            </v-col>
            <!-- 개인만 보여주는 영역 끝 -->

            <!-- 법인만 보여주는 영역 시작 -->
            <v-col cols="12" v-if="insuranceDTO.user_cd != 'IND'">
              <p class="text-body-2 color-gray-shadow">세무사 인원수</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.cbr_data.length }} 명
              </p>
            </v-col>
            <v-col cols="12" v-if="insuranceDTO.user_cd != 'IND'">
              <p class="text-body-2 color-gray-shadow">세무사 인원수 할인율</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.insr_pcnt_sale_rt }} %
              </p>
            </v-col>
            <!-- 법인만 보여주는 영역 종료 -->

            <v-col cols="12" v-if="insuranceDTO.user_cd != 'IND'">
              <p class="text-body-2 color-gray-shadow">합계보험료</p>
              <p class="text-body-2 text-right">
                {{ Number(insuranceDTO.insr_amt).toLocaleString() }}원
              </p>
            </v-col>
            <!-- 합동/법인만 보여주는 영역 끝 -->
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
          <p class="text-16 text-gray" v-if="insuranceDTO.user_cd === 'IND'">
            <i class="mdi mdi-alert-circle-outline mr-1"></i
            ><span class="color-primary">세무사 성명과 등록번호</span>를 함께
            기재하여 송금해주시기 바랍니다.
          </p>
          <p class="text-16 text-gray" v-if="insuranceDTO.user_cd === 'COR'">
            <i class="mdi mdi-alert-circle-outline mr-1"></i><span class="color-primary">법인명으로 일괄
            송금</span>하여 주시기 바랍니다.
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
                to="/contract/TAX/V_TTAX0030A10"
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
        <V_TTAX0030P10
          :baseYear =insuranceDTO.insr_year
        />
      </v-card-text>
    </v-card>
  </v-dialog>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

  <!-- 가입신청서 시작 -->
  <V_TTAX0030P20 :insurance_dto="insuranceDTO" :isPdf=isPdf :isNotAuth=true v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
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

import { isLeapYear, getDateDiff, calByString } from '../../../util/util';
import MessageBox from '@/components/MessageBox.vue';

import apiUser from '@/api/api/user.api';
import apiContract from '@/api/api/A_CONTRACT';

import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import V_TTAX0030P10 from './V_TTAX0030P10.vue';
import V_TTAX0030P20 from "@/views/contract/TAX/V_TTAX0030P20.vue";


import TermsOfPolicy from './V_TTAX0030P01.vue';      // PDF 다운로드
import TermsOfInsurance from './V_TTAX0030P02.vue';   // 상품설명확인서 확인
import TermsOfContract from './V_TTAX0030P03.vue';    // 계약 체결·이행 등을 위한 개인(신용)정보 처리동의

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
const pdfFileName=ref('세무사_보험약관.pdf');
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

let insr_st_dt_min = ref('')

const tab = ref("1");

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
  /**
   * 1. 법인은 보험시작일자를 변경 할 수 없다.
   * 2. 개인이면서 신규이면 항상 보험기간을 변경할 수 있게 한다
   * 3. 기준_보험시작일자가 소금담보일보다 작으면 갱신으로 판단하여 수정불가
   */
  if (insuranceDTO.value.user_cd === 'COR') return true;
  if (insuranceDTO.value.user_cd === 'IND' && (renewalYN.value==undefined || renewalYN.value !== 'Y') ) return false;
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

  // console.log("------------");
  // console.log(sSDt);
  // console.log(sEDt);
  // console.log(sKey1);
  // console.log(sKey2);
  // console.log(sKey3);
  // console.log(nRate);
  // console.log(nPCnt);
  if (!sKey1 || !sKey2 || !sKey3 || insuranceDTO.value.insr_pblc_brdn_rt=='') return 0;

  let nTotAmt = 0;
  let nInitAmt = 0;
  let nDCnt = 0;
  
  // 공동보험할증 - 0 or 0.5
  let pblcBrdnRt = Number(insuranceDTO.value.insr_pblc_brdn_rt.getValueBySplit(0));


  let sKey = sKey2.getValueBySplit(0) + '|' + sKey3.getValueBySplit(0);

  // 인원수별 할인구간
  let discountRanges = [
      {range: [11, Infinity], rate: -15},
      {range: [7, 10], rate: -10},
      {range: [3, 6], rate: -5},
      {range: [0, 2], rate: -0},
    ];

  let discountRate = 0;

  for (let i = 0; i < discountRanges.length; i++) {
    let range = discountRanges[i].range;
    if (nPCnt >= range[0] && nPCnt <= range[1]) {
      discountRate = discountRanges[i].rate;
      break;
    }
  }
  // 인원 수 할인 (%)
  insuranceDTO.value.insr_pcnt_sale_rt = discountRate;


  try {
    // 기간 계산
    nDCnt = getDateDiff(sSDt, sEDt, INSR_RATE_MAX_DAYS.value);

    // 기본보험료 조회
    nInitAmt = INSR_RATE_TABLE.value.기본담보.보험료.filter(data => data.key === sKey)[0].amt;
  
    // 보험 계산식 ( 기본금액 * 공동보험 할증 * 인원수 할인 * 기간일수) * 할인할증률  10원단위 절사
    nTotAmt = (nInitAmt * (1 + pblcBrdnRt / 100) * (1 + discountRate / 100) * (nDCnt / INSR_RATE_MAX_DAYS.value)) * (1 + nRate / 100);
   
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

/**
 * 보험계약[기본담보] 보험료 재계산
 *
 * @param data 보험 명단 데이터
 */
const calInsrAmt = (data: any) => {
  let totAmt = 0;

  // // 소급담보일이 수기등록이 아니면 보험 시작일자로 변경
  // if (insuranceDTO.insr_retr_yn !== 'Y') {
  //   insuranceDTO.insr_retr_dt = insuranceDTO.value.insr_st_dt;
  // }

  // // 기준_보험시작일자 보다 이전이면 기준_보험시작일자로 보험기간 변경
  // if (insuranceDTO.value.insr_st_dt < insuranceRateDTO.value.insr_st_dt) {
  //   insuranceDTO.value.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
  // }
  


  if (data.cbr_data != undefined) {
    for (var idx in data.cbr_data) {
     
      // data.cbr_data[idx].insr_st_dt = insuranceDTO.value.insr_st_dt;
      
      // // 수기처리가 아니면 기초셋팅
      // if(data.cbr_data[idx].insr_retr_yn !== 'Y') {
      //   data.cbr_data[idx].insr_retr_dt = data.cbr_data[idx].insr_st_dt;
      //   data.cbr_data[idx].insr_sale_rt = insuranceDTO.value.insr_sale_rt;
      // }
      
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

      // 개별 보험료 - 기간, 할인할증 적용 보험료
      data.cbr_data[idx].insr_amt = getInsrAmt(
        data.cbr_data[idx].insr_st_dt,
        data.cbr_data[idx].insr_cncls_dt,
        data.insr_pblc_brdn_rt,
        data.insr_clm_lt_amt,
        data.insr_psnl_brdn_amt,
        data.cbr_data[idx].insr_sale_rt,
        data.cbr_data.length 
      );

      // 기본담보 보험료(할인할증적용)
      totAmt += data.cbr_data[idx].insr_amt;

      // 소급담보일이 수기등록이 아니면 보험 시작일자로 변경
      // if (data.cbr_data[idx].insr_retr_yn != 'Y') {
      //   data.cbr_data[idx].insr_retr_dt = insuranceDTO.value.insr_st_dt;
      // }

      // 기본담보 - 보상한도(연보험)
      insuranceDTO.value.insr_year_clm_lt_amt = calByString(insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1), insuranceDTO.value?.cbr_data?.length, 1000000000);
    }
 
    data.insr_amt = totAmt;
    data.insr_tot_amt = totAmt;
  }
};


function addCBR(list: any) {
  try {
    const cbrDataDTO = new CBRDataDTO();
    cbrDataDTO.insr_retr_dt = INSR_RETR_DT_TODAY;
    cbrDataDTO.insr_st_dt = INSR_RETR_DT_TODAY;
    cbrDataDTO.insr_cncls_dt = insuranceDTO.value.insr_cncls_dt;
    cbrDataDTO.status_cd = "80"; // 정상
    list.cbr_data.push(cbrDataDTO);
    list.cbr_cnt = list.cbr_data.length;
    // console.log(INSR_RETR_DT_TODAY);

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

/**
 * 법인 대상 로직
 * 
 * 1. 법인 -> 법인
 * 2. 개인 -> 법인
 */
async function chkSaleRtCOR(list: any, rowIdx: number) {

  // const nDupCnt = checkDuplicateData(insuranceDTO.value.cbr_data);
  // if (nDupCnt) {
  //   messageBoxDTO.value.setWarning( '입력확인', '이미 입력하신 회원입니다.');
  //   return false;
  // }

  const params = { insr_year: insuranceDTO.value.insr_year, business_cd: _AUTH_USER.value.businessCd, user_nm: list.cbr_data[rowIdx].cbr_nm, user_birth: list.cbr_data[rowIdx].cbr_brdt, user_regno: list.cbr_data[rowIdx].cbr_regno };
  const result = await apiContract.getSaleRtNDupInfo(params);
  // console.log(result);
  if (result.success) {

    if (result.data.dup_cnt > 0) {
      messageBoxDTO.value.setWarning( '기존가입', '이미 보험계약이 되어 있는 회원입니다.<br/>록톤코리아로 연락해주시기 바랍니다.');
      return false;
    }

    /**
     *  엑셀컬럼기준 할인/할증 개념
        1. '2022년할인할증' 값이 양수 경우는 할증이다. 
        2. '2022년할인할증' 값이 음수 경우는 할인이다.
        3.  단, '할인/할증기준' 값이 1000 이상인 경우 할증으로 인식하고 '2022년할인할증값' 값을 가져온다 (0% 할증)


        1. 법인 -> 개인
        - 변경전 할증이 있으면 할증을 가져오고, 할인이 있다면 0% 로 적용

        2. 개인 -> 법인
        - 변경전 할증이 있다면 할증을 가져오고, 변경전 할인이 있다면 변경후 법인 할인으로 적용

        3. 법인 -> 법인
        - 변경전 할증이 있다면 할증을 가져오고, 변경전 할인이 있다면 변경후 법인 할인으로 적용
     */

    if (result.data.renewal.length > 0) {

      const insr_sale_year = Number(result.data.renewal[0].insr_sale_year);
      const insr_sale_rt = Number(result.data.renewal[0].insr_sale_rt);
      const insr_retr_dt = result.data.renewal[0].insr_retr_dt;

      list.cbr_data[rowIdx].isCheck = true;
      list.cbr_data[rowIdx].insr_retr_yn = 'Y';
      list.cbr_data[rowIdx].insr_retr_dt = insr_retr_dt;
      list.cbr_data[rowIdx].insr_st_dt = insuranceRateDTO.value.insr_st_dt;

      /**
       * 할인할증률 가져오기
       * 
       * 1. 할증 가져오기
       *  - 할인/할증기준 값이  1000 이상인 경우 할증을 가져온다 (0% 할인 포함)
       *  - 할인할증이 0 이상(할증) 이면 할증을 가져온다.
       * 
       * 2. 할인 가져오기
       *  - 법인 할인 가져온다.
       */
      if (insr_sale_year >= 1000 || insr_sale_rt > 0) {
        // 전환 대상자의 할증을 가져온다.
        list.cbr_data[rowIdx].insr_sale_rt = insr_sale_rt;
      } else {
        // 현재 법인 할인율을 가져온다
        list.cbr_data[rowIdx].insr_sale_rt = insuranceDTO.value.insr_sale_rt;
      }

      calInsrAmt(list);
    } else {

      // 신규회원
      if (result.data.mbr_cnt > 0 ) {
        list.cbr_data[rowIdx].isCheck = true;
        list.cbr_data[rowIdx].insr_sale_rt = insuranceDTO.value.insr_sale_rt;
        list.cbr_data[rowIdx].insr_retr_yn = 'Y';
        list.cbr_data[rowIdx].insr_st_dt = INSR_RETR_DT_TODAY;
        list.cbr_data[rowIdx].insr_cncls_dt = insuranceDTO.value.insr_cncls_dt;
        list.cbr_data[rowIdx].insr_retr_dt = INSR_RETR_DT_TODAY;
        // console.log(list.cbr_data[rowIdx]);
      } else {
        messageBoxDTO.value.setInfo(
          '세무사 인증',
          '세무사 생년월일 또는 등록번호가 일치하지 않습니다.<br/>정확한 내용을 확인 바라며, 반복 오류시 록톤코리아로 연락해주시기 바랍니다.'
          );
      }
      calInsrAmt(list);
    }
  }
}

/**
 * 개인 전환 로직
 * 1. 법인 -> 개인
 */
async function chkSaleRtIND() {

  const params = { insr_year: insuranceDTO.value.insr_year, business_cd: _AUTH_USER.value.businessCd, user_nm: insuranceDTO.value.user_nm, user_birth: insuranceDTO.value.user_birth, user_regno: insuranceDTO.value.user_regno };
  const result = await apiContract.getSaleRtNDupInfo(params);

  if (result.success) {
    if (result.data.dup_cnt > 0) {
      messageBoxDTO.value.setWarning('가입회원', '보험계약이 되어 있는 회원입니다.<br/>록톤코리아로 연락해주시기 바랍니다.');
      isDuplication.value = true;
      return false;
    }
    
    if (result.data.mbr_cnt !== 1) {
      messageBoxDTO.value.setWarning('비회원', '전문인 명단에 등록된 회원이 아닙니다.<br/>록톤코리아로 연락해주시기 바랍니다.');
      isDuplication.value = true;
      return false;
    }

    if (result.data.renewal.length > 0) {


      const insr_sale_year = Number(result.data.renewal[0].insr_sale_year);
      const insr_sale_rt = Number(result.data.renewal[0].insr_sale_rt);
      const insr_retr_dt = result.data.renewal[0].insr_retr_dt;

      insuranceDTO.value.insr_retr_yn = 'Y';
      insuranceDTO.value.insr_sale_year = insr_sale_year;
      insuranceDTO.value.insr_retr_dt = insr_retr_dt;
      insuranceDTO.value.insr_sale_rt = insr_sale_rt;


      /**
       *  엑셀컬럼기준 할인/할증 개념
          1. '2022년할인할증' 값이 양수 경우는 할증이다. 
          2. '2022년할인할증' 값이 음수 경우는 할인이다.
          3.  단, '할인/할증기준' 값이 1000 이상인 경우 할증으로 인식하고 '2022년할인할증값' 값을 가져온다 (0% 할증)
  
  
          1. 법인 -> 개인
          - 변경전 할증이 있으면 할증을 가져오고, 할인이 있다면 0% 로 적용
  
          2. 개인 -> 법인
          - 변경전 할증이 있다면 할증을 가져오고, 변경전 할인이 있다면 변경후 법인 할인으로 적용
  
          3. 법인 -> 법인
          - 변경전 할증이 있다면 할증을 가져오고, 변경전 할인이 있다면 변경후 법인 할인으로 적용
      */
      if (result.data.renewal[0].user_cd === 'COR') {
        if (insr_sale_rt > 0) {
          // 전환 대상자의 할증을 가져온다.
          insuranceDTO.value.insr_sale_rt = insr_sale_rt;
        } else {
          // 개인전환 할인은 0% 고정
          insuranceDTO.value.insr_sale_rt = 0;
        }

        messageBoxDTO.value.setWarning(
          '법인 갱신대상 이력이 조회됩니다.',
          '개인으로 신규가입시, 법인 가입 때의 소급담보일을 인정해드리고 있으니 참고 바랍니다.'
        );
      }
    }
  }
  return true;
}

function checkDuplicateData(dataArray, rowIdx) {
  // 체크할 rowIdx를 제외한 배열 생성
  const arrayWithoutRowIdx = [
    ...dataArray.slice(0, rowIdx),
    ...dataArray.slice(rowIdx + 1),
  ];

  const duplicateData = arrayWithoutRowIdx.filter((data, index, array) => {
    return (
      array.findIndex(
        (item) =>
          item.cbr_nm === data.cbr_nm &&
          item.cbr_brdt === data.cbr_brdt &&
          item.cbr_regno === data.cbr_regno
      ) !== index
    );
  });

  return duplicateData.length > 0;
}


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
  const validationSchema = InsuranceYup[`TAX_${insuranceDTO.value.user_cd}_TAB${tab.value}`];

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
  

  if (insuranceDTO.value.user_cd === 'COR') {
    insuranceDTO.value.cbr_cnt = insuranceDTO.value.cbr_data.length;
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
  if (insuranceDTO.value.user_cd == 'IND') {
    insuranceDTO.value.user_birth = userDTO.value.user_birth;
    insuranceDTO.value.user_regno = userDTO.value.user_regno;

    // 개인일 경우에는 명단이 없으나 총 1명으로 계산한다.
    insuranceDTO.value.cbr_cnt = 1;
    insuranceDTO.value.corp_type = '';
    insuranceDTO.value.corp_bnno = '';


  // 법인 가입정보 설정
  } else if (insuranceDTO.value.user_cd == 'COR') {
    insuranceDTO.value.user_birth = '';
    insuranceDTO.value.user_regno = '';

    insuranceDTO.value.corp_type = userDTO.value.corp_type;
    insuranceDTO.value.corp_bnno = userDTO.value.corp_bnno;
    insuranceDTO.value.corp_ceo_nm = userDTO.value.corp_ceo_nm;
  }

}

/**
 * 세무사 명단 초기화
 * 
 * @param values
 */
function resetCBRData() {
  messageBoxDTO.value.setConfirm('세무사 명단', '세무사 명단을 초기 조회상태로 초기화 하시겠습니까?', null, (result, params) => {
    if (result) {
      insuranceDTO.value.cbr_data = JSON.parse(JSON.stringify(insuranceDTOBackup.value.cbr_data));
      insuranceDTO.value.cbr_cnt = insuranceDTO.value.cbr_data.length;
      calInsrAmt(insuranceDTO.value);
    }
  });
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

    if (insuranceDTO.value.user_cd == 'IND') {
      calInsrAmt(insuranceDTO.value);

      // 개인일 경우 세무사 명단이 없으므로 1명으로 설정하여 보험료를 가져온다.
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

    // console.log(calByString(insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1), insuranceDTO.value?.cbr_data?.length, 1000000000))
    // 기본담보 - 보상한도(연보험)
    insuranceDTO.value.insr_year_clm_lt_amt = calByString(insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1), insuranceDTO.value?.cbr_data?.length, 1000000000);

    // 최종보험료
    insuranceDTO.value.insr_tot_amt = insuranceDTO.value?.insr_amt;


  }
);

/* 소속 지방회*/
watch(() => [
  insuranceDTO.value.corp_region_cd,
], (newValue, oldValue) => {
  if (regionCdItems.value.length > 0 && newValue[0]!=null) {
    insuranceDTO.value.corp_region_nm = regionCdItems.value.filter(item => item.value == newValue[0])[0].title
  }
})

/* 소속 팩스번호*/
watch(() => [
  insuranceDTO.value.corp_faxno1,
  insuranceDTO.value.corp_faxno2,
  insuranceDTO.value.corp_faxno3,
], (newValue) => {
  insuranceDTO.value.corp_faxno = newValue[0] + '-' + newValue[1] + '-' + newValue[2]
})

/* 소속 전화번호*/
watch(() => [
  insuranceDTO.value.corp_telno1,
  insuranceDTO.value.corp_telno2,
  insuranceDTO.value.corp_telno3,
], (newValue) => {
  insuranceDTO.value.corp_telno = newValue[0] + '-' + newValue[1] + '-' + newValue[2]
})

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
  //if (TODAY > newValue[0]) {
  //갱신일 경우 base_insr_st_dt로 시작날짜 세팅되어야 함 2024-07-01
    if (renewalYN.value != 'Y' && TODAY > newValue[0]) {
    insuranceDTO.value.insr_st_dt = TODAY;
    insuranceDTO.value.insr_retr_dt = TODAY;
      insr_st_dt_min.value = TODAY;
    showMessageBoxByInsrDt();
  }

  // [보험료표] 보험개시일자가 과거이면 보험개시일로 변경한다.
  if (newValue[0] < insuranceRateDTO.value.insr_st_dt) {
    INSR_RETR_DT_TODAY = insuranceRateDTO.value.insr_st_dt
  }
});

/**
 * 보험계약[기본담보] - 세무사 할인할증 값 변경시 재계산
 * 법인일 경우 상세 정보가 변경될때 재계산해준다.
 */
watch(
  insuranceDTO.value.cbr_data,
  (newVal, oldVal) => {
    // 읽기전용일 경우 해당로직 제외
 
    if (isReadOnlyAll.value) return false;

    newVal.forEach((row, index) => {
      if ((newVal[index].insr_sale_rt! = oldVal[index].insr_sale_rt)) {
        calInsrAmt(insuranceDTO.value);
      }
    });
    // 기본담보 - 보상한도(연보험)
    insuranceDTO.value.insr_year_clm_lt_amt = calByString(insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1), insuranceDTO.value?.cbr_data?.length, 1000000000);

    // // 10억을 초과 제한
    // if(insuranceDTO.value.insr_year_clm_lt_amt > 1000000000) {
    //   insuranceDTO.value.insr_year_clm_lt_amt = 1000000000;
    // }
  },
  { deep: true }
);



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

    // 갱신자는 인증처리 완료
    insuranceDTO.value.cbr_data.forEach(function (data) {
      
        // 갱신자는 인증통과
        data.isCheck = true;
        data.insr_retr_yn = 'Y';
        
        // 수기처리가 아니면 기초셋팅 
        data.insr_st_dt = insuranceDTO.value.insr_st_dt;
        data.insr_cncls_dt = insuranceDTO.value.insr_cncls_dt;
    });
    if (insuranceDTO.value.user_cd == 'IND') {
      // 전환여부 확인
      chkSaleRtIND();
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
    // insuranceDTO.value.insr_pblc_brdn_rt = '0|공동보험 적용'; // 초기값
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
      chkSaleRtIND();

    } else if (insuranceDTO.value.user_cd == 'COR') {
      addCBR(insuranceDTO.value);
    }

  /**
   * 수정가입
   */
  } else {
    let tempuuid = ["0177cc1ef4824053aebd17910cf6fb2a","01a1f117d15642b793dabc3213f180ce","03ad3bed8cf444fc94bf0bf02cd08782","049f0ec83e934bc8a3a3c6bfe884726c","05d56d7578d941fc8eebf8ab678e183c","06af745b6d724e0996f260fec87e5e17","0868c78eee7f43a389641676e2856467","0879e8afef894339b1bc509ad417b0ad","087d233d78d04eeb8332c18484b593de","08ccfea06f78473eb91feacf53bcaf5e","0921a457f3dd46299f875a7e8b019081","095e6f95b4dd4af89dc87862754c2b4d","0afeff833556443c8a9f5810e409bf68","0b1d30e9ab964b6c9640d00b3ceea547","0bb82118701b40e99dd078fb23757e5b","0bdadf98114f497ab14749aad038e752","0c074f7b4c28470383f5e7afff545569","0d0289b887814826a4389f36fa60b64a","10185441557d4074b4b517d8de6ca641","109309941f054d9d9ca0af9a22aaa900","112e3ae7b23449adb4195859ee8ecec5","118e2c441579437c9e5d10e9ac27b0f8","128c5736d45c486083df2e2a543899c4","128c6f5a5f45474291410b142b56c534","13dc35cf30494e84862e0770185312b5","15870ab8450b4682ba2986bfde8a9a08","16320d8f52424650b0a728f153160803","167f25ccc2224fcc8fd0b8b8c4049ef4","16a36ad504134fe88ac5c3e83051bcaf","17ea74b80278477b905674f4812089b4","17fa0822fe3944f08f3b8ca71576f81c","18a53a25e5a94d539ba48bfdd036c80e"]
    //let tempuuid = ["18c331f667b7452f8e40aeba8457c0c7","19f58e9f21b14361a83f0563dad23013","1b34fcd359094d268af39373a928f267","1c1cb9b12c8e4dc49de14ca28df1691f","1c463eae57d74254bf033eb67431373c","1c8fcd032a00495e9c09aefd64abf06b","1d0878bba7144fb2ba8729ee7ee0ce42","1d48489a22ed476ab0061ce015046558","1d55685145eb4f68b71f510322c814ff","1eb0a5e32fea4e398e8ceea79cd36911","1f7e4dcf969d4935b852089fca05ede2","1fbb04f9b2a044259d575390e9876235","20041d65832a4eff8aab39ecf5764b2d","20e93b9ef12740fd953f275cb34f82bd","210f7430496e411091b3e91e328a6448"]
    //let tempuuid =  ["2ad045b5b4a7424bb9a5211336873405","2aef38965ca941e092857424608fb878","2bb3f0b7cf444b528d8e16b90af2159a","2c5fe2c4cade49ffb7f46c0320ba2de3","2cb9d81079d8459b8be9fe52e3af03e4","2d13afca194b4a5599e6abbb14b2e262","2ed76eeb4e2942b697c78f0cb23179c6","30c56bc0c5354a1891b49d5f987d602f","3262acecc186462f9e56f180474d476f","32aa8762cfbb4bc99a6fe1e31224dbe8","331ba8aadf4747588ac837c40771a503","3420b16c2db34659a7744d3a1498edce","349638b69f3d43d29ce81b9ce3866b99","357a2415fce24138a42c85033f54f6ee","3590779ae04641fda3b286c67a303eb8","36f766f2d42c483c81c5d6532941a053","374c292f9514468cbdfc2259c7968f44"]
    //let tempuuid =  ["377bdafdcec941b0a431fccd548487a1","37862ca22328436596a79e30db5d3c9e","378b985b3bfc4c86ab5fc22f4bf6a067","37c8e46c2ae3420a89789db89520cbf8","38273a10ba64473286d614501959319f","38ff87ed4e6e4cae9dbb328b6d5c428e","390c20acf2bd4ae88f7ce5618be9eced","3941590acf6240039f9544b1d390f424","39691c34cf3e4618a35ad8a02407f50c","39e93fb5fd344365818a88988d648086","39f040095365434aabf3c11c0eb3c423","39fcadf961fd4a24979d42205b13dbfc","3a2e297c654e40c6af7b69f4367bdd57","3a6d01374db34252a04ca228c2743b54","3a95092ca92f428fa591b1067d8aef9e","3be22c4ca441448db3ed9cf9c2309d3a","3c340cca7bc7420d9adca32a6246eb6a","3c8ee04fc58149c7bf436920d4c27c21","3d3259864a59440f8ed54076a41ecb87","3e0c633864f74ebf9e6ca6cb2e633761","3e8eff764ed3449393823abeb782cc86","3f3ca229f4894fc8ba4e4680ce8abcb6","3f5b8bf530a142d29b756ad03680e2ba","404292992e8b461d9f16b437c6852617","40ce44ac9a7749169aae23ea12ebf3d7","41ffc2e9ad86490a9224496ba3b321bf","4241885aea864e88ac9b5a5fd6ba7632","428f7eab264f4f899d14bd1b5966db10","42f3193038314aad8c7c48d3b0b50569","44d09b07dbc641fe86c4d2c2a8644a6b"]
    //let tempuuid =  ["4b7b2eeb45794b178aad80ab4327736e","4bf74944ca504c158311fd7b1b40e919","4cd3ac96ffb14581b33aae076793f19a","4d29a0692ce849f583f944b2d5542f8b","4d5231420fad48fc9b738ee024ea70b3","4d74cd77cece4785a96258fdf4c74a5e","4da4dbb9e6b54158be596833a57c9dfb","4ed79955a9ab4169957ac61c8fc2ac70","5040315febe8428c8ddc2fae0ed064ce","5199d8e4ae674708a4afc044e6561f38","534326f493a245e2adadc5b15aa0ad1b","53442c9e5c2c426484606b34f68f2c0f","53670b2631804f1195090a51704e1faa","53c574a325ba4089986e56621b9235e6","562ad9c9594148bbbba7bc2bb4fea738","5758820ff4ea440a8241c81c18025793","58640bf9708542399731b0f1c567be1e","5921664f86924c2db956c5b8ed327e9c","59b0daa2f1b94047b2b3ed312a4759e2","59e71a6b33a64e04978d0c27d82c36d5","5a26276da11342ad8b4d54420e3cfbb5","5b149734d81c4163bb89178684632f29","5b32d91e109245ff8431e19822b73b4f","5de0a9761fc540f69578038bcc576033","5e3da1f5198f4faea3805e182cd72133","5ffa47782d5f408fbfde3cb290670f70","603d31da1edf4a449c6eabc8a7df1e20","627372ef9dc8413c956613e6a13a7fa4","63b2efffd2c943b9a4e380257963d521","6407ef24768441a09425d573bc607fbb"]
    //let tempuuid = ["748e5549297748e9b897c537db3962a9","78bbb1bd612644ba9eaeb78122c12c89","7aa5da9df4ae4e2d9bc2441f3b7bad46","7af8fe56045b41f39b631d1ab4bb87f0","7bbd5604d6814e28b4516f264c55feda","7d7f1036be604a34add2c09cfd301d56","7d93ade439a644bab69fd4a5b1773840","7e12c7661ee64c61ba84529621e3c26f","7fc2e45721fe41bd8f6f49bdf732b3f0","80ed5416f212438ba55e8e205642f875","80f92b905dde490794f3e5f45f08460f","8126ecd27c6f4308b6b793c3bb168237","8136992afa384438a57be5bd630f7009","816446f6f35b4e20a84e993d4f8010fe","81cd08aab47f4ea2a1803f86af8510a5","81cd963297234279bd1f6883ff610dc6","8240c6c56e1e4adca02d28d3ea168be7","83559f2a91d34a69809b02f247937c79","8542c4ddd5a84a9f9c4e4d4657989e14","85609479353f4d37a1fd3e6c832e152b","8566aaf1efc04d788717b5c256ed4da6","85bc97d46e724731b7276f71510ad665","885e87b0411d421c93aed3223f0c01d8","89bafc9f2aee4e569ddd67992b7f92fe","89d6642be2084ee79fc3b4ace9bf2b43","8c976ef99b58426d9025561bd53407dc","8df1e68ce89142d6b6992ac461ab25a9","8e36e777004b4a27862d905476e1960c","8e4d435149c442a3a2d524a78eb58fda","8e726a32580047e19232068ddf7379dd","8ec2f6481f5e4a5ea137109230c7e567","8ed02e41c55b42e8b0ed4dc5b8c013b9"]
    //let tempuuid = ["9c1cfc83ff9b491f832053ce86be8d32","9d072956c248403a857acaa2498f56bc"]
    //let tempuuid = ["9e7d26f48e7944bfa863b87522c288b2", "9e8a05a0d1ff46cba15128cbce1748ac","9f32ce379b3e4a0ea736e48113615a67","a312d0abdc31442c8b7ece2c5054405b","a372154169974e3292441aa41be7a877","a446fb51abae47ca80de289d75863f4c","a5083d22309d4ad3a82f44b10a90e43a","a5a355a9544740488f84afe26aae661e","a626b7306002490299f8474c52769f6d","a6475be90e9b4b4f8a1b0f8ee0dc8445","a86451db9117496daf0ff79458f0d19d","a9213f859cef4077994387befaf5a151","ab02bcc894e84c238cd931b0514c3606","ab1195d13ca24bb69c8c6f683fe53274","abb58b9689e44472bd63d2b406357dd2","ae302d001605492484b9f1963aa7d08b","ae83420834fc405fb9472407baac1359","aedd64b893814792b3e0f56bac98ddff","aedfd5e8b07c4780b4bcb582fb896e7b","af19358f7f5444b4a3f88d81255bb8ba","af40a07c137c416983c8eabb816fb429","b02a45d6f4dc4ebf836eab0aa097ce4b","b030b47e3fd347b0a5380fd2e7e7d5bd","b1a2177ab0724ea8bd763d26cb1abe89","b28c926620fd4934b4b34a32072531fa","b3362e80c63745d5918bc04da680e392","b4e969d562d242d597b1ab3af843c0c7","b51ea71db1b34eb7b3d93b209605a553","b58d9343e81a4a09baeb8ba21fd41ed5","b65b16e2d0c3415e91a1f16ef752b34e"]
    //let tempuuid = ["c458e10d7bb941f29dda07ae3d288fb4","c75f836822b54fcda1e05ef84005eeaa","c7771469c5e24687831e856cbd2f1871","c9bf7ec82bea440583cc63bae20db161","c9e888c4f4d54906912b1a63e61c6610","c9fdced49a7a4e2ab35c92391eece6b6","ca0fc7732f86455cb191586d8d8774e6","cbae90afd6344120ace237d6c113b9d7","cbc62432f76d4b70883907c098e9089d","cc2f770da5c34413bbc758a20e3ad6fe","ccc34626f99a4d8dbc56fd88ecaf1daf","cdf6a9503954469081037e5c7363a48a","ce6934b5bc68448db4ab134cfcab71e2","ce7395cfbc264d26a19403cc253a0500","ced5019aa21a4c959c73f6b6c4745140","d1a3bbdd37184c5db0b2986fecbfe05c","d1bfa714943947e48794327d32188aca","d4e022c31367491486f19dbee9181ef8","d6d38474623d42b586cabee42ecfa704","d72c70c0ac3c474fb1e908c7f020af61","d826e76ebe4f4c20a144b918c0f7848d","d90956a6b1e241a68d35b442860a294a","dae6d9a2d7ea45eca8325b6100e5d810","dd44f055974b4569801d2cec1f77b1e4","ddd7cdbb82c94d31b5e57d305e85a5ec","e02119bdd8494a4b9088f3de7bdbdd5f","e2313d17926043f1b425882579143315","e262365f17a742e3a9f62f5e8de510ed","e4758adccfb14bb0b430b1e72cd75f71","e61c899d6ccb40a1ae597857d084aa83","e621074bfb184327a25827b6437a678f","e650afc6be244193a570768e6a245019"]
    //let tempuuid = ["f039edf52d854fb0983af58a1a496a00","f250b53d711f4d96856dcc23a5c5e674","f267bebd28dd42ff8f2da060960a4df0","f3a1e7fffcf847fb80ca9ddca360a351","f4e1bacdd9444195a3495fcbdd80147b","f654048f5a074bc496330426a4ed2451","f67cdb2a4c10429d83a3bdb38fac63d5","f795fcfd82144d339abff0a7adc74e99","fbb82928237a45dc97da6a50987857cc","fc0644275a084ffcb8bd3ec37dcb8cb5","fc0e08e55cde4d1aaddfb69ab5385991","fc82813bf55e48b0a5c2da68d081fd31","fd244ef05de24a11b7784a92b71c493c","fd452da1ae3c4017bba74eaf884e0d8d","fd89e73cc4bb4d7fb80fdaad6435b235","fef4191f80024ba489a726a102049e6a","fefccbe13c0f48f59002ec744be6c4e6","73130fce5f3a4bad882f13e30742f5a5","738b17df271049419ac83a2176d8d43a","ef62b1b6bb654121919c27edc95e8aec","ef8cd7160d8a4494a96db791ab969853","efd468c9263f43549c85ec21eb716764"]
    //let tempuuid = ["743bcb210e484966914e71f04f9524a9","744127b249c14906aef2ef133324ca8a","21787a4ca6274c9586bc6b0d12999b3b","21fd20f0111c42c1a2c2d0835b51b13a","26276b571f5e4cf8bf32c887a11dad03","27da125d35cd45e3bd1f858d68df3cc0","453bfb912e1b4386bae611d5d1f31618","49a9470cc19342428b0331a0741e2067","4aec9e4a90034042965878e93a38f3ea","c28675f7d0fb4421a0c24a1c47fc35bd","c3f61bf50bb44e6ba37d15c1f40606c2","c3f822c354714f61884dfb25ed761c54"]
    //let tempuuid = ["8ef2f77214b04e9088f64d94377cf2bd","920fed674c8346978208429ca0d4dc85","924f74e6243f410fbd8fd39f79ce8a8d","929c43e8d11940dabcf0357e15ebf36b","9384507facaa4844a8590f32e01dfa08","93e86c80cd9541ffa67a19e2fc78ad0d","948927ebda584d6f872d9122281bc08c","94b26898064e4e9188f988920cc208ea","94f15d9d1e6b4e439658d55cbf199ae5","95aca99082ce4fa0afd61fd1b1e0c2eb","9674e867c2734a5796c91b8bf1f5bbbc","98bf8d17a7c5412b9bd2323cb74ac488","99819b7690204befacfa19236686f8e9","99b11a88324d4e9092a885ff4895060d","9b44376625484694b78ea67caee9399f","9bd9d5abddae49e18b02940d648a2158","648758454f394730993dd65cbc73d2c0","66f1e6704386416492cf8f2fcd961dee","6749196b7e494dd2bd766ac4e4698c64","681159e58e0744b1b59db641c6739554"]
    //let tempuuid = ["b66cd3860d504c3ca6584ffa5a0c3a34","b7085e3b878f460db658005d7041b289","b7a5ad1dffaa4b14854fb42682d1a691","b97223d8488e447991b5b5184f6e0f9f","ba6cae0c6d9946a0906afd129cb4c7ba","bac548ab24754515a0c626dc93d4391a","bacee3c137db45bea6272c1e6c4c7f0d","bb376feb9e6c4813ab9aa45cda6c4139","bc0a959c3f5649d691b2fdb8d9fcc946","bc343d549df6415c95f0d3948f0403c8","bc6a41fc5aab4bb99ec57458abf3dfe7","bd56a7aaf1b7403bb42fd453e2f7519d","be76aea942f8446685ec2738b24530aa","bf2d187db7694795a03857b4355e4054","bf9d801cf3b743299d722f9ef02a3384","c1074895eeb04ccb805e7043756be9c9","c12944ff866d4099b1942ee6dda6cb2c"]
    //let tempuuid = ["e66c844f9d1d4b2dbab0dcf28e40ecf0","e739b1898bab4db2ab7fab9ad7ebf3cc","e745935bf849458daf5ac761e41ec690","e7628a8321a34001841d9215f3f00eeb","e7ba8d4b4fd4406f9ea078e4a9143c20","e85654b42f664890a92c68e0b9f9b29e","e9016c4a4ad74fd4af639d8356f1bed4","e99d7ff35db3470f9ab9e1c028520a31","eadbbd51bb684ed6aee0e69abf60124d","eb1eb0a88b8a4307bdccd5fa93c45ca8","eccc4afa03d44837b756ec0edbc7b741","ecd08c46e6ca4bd68f47d4d0f095cfa7","ed3dd80eae334e4ebe1fae48f4acf173","ed9b8c700d3a422dbb5388e41eb330e4","ee164a67e49b4c2db6d7f9b17befe87b"]
    //let tempuuid = ["68da61d2cb14442483db893d3264d463","69aa8915ade74b88bc654f968298b6fa","6acb58f17f8544d291f9d56e7d0fd02e","6b29ca6d1ed34beeba5efc039f5aae42","6c6f3a88fe634ed48a73bb09320494c0","6cb1de584a794ca7a6a0c41572629e5a","6cf3d2928ba649648490704ef0191cd1","6d828e6b1a9c488c8bee80b2470f1d3f","6da51caa22484bac9095f144c55786ef","700d06ef4e9041159ee2e86bdbd562e8","7107f01e9b9f4dac8e599407a58da1cf","71f4a26543844e0c952b96351edee722","7282004c0fea43338d98116922e7d5f6"]
    console.log("tempuuid : "+tempuuid.length)
    //const params = { insurance_uuid: insuranceUUID.value };
    for(let i =0;i < tempuuid.length;i++) {
      console.log((i+1)+ " : "+tempuuid[i])

    const params = { insurance_uuid: tempuuid[i]};
    const resultData = await apiContract.getDBSel(params);
  // 초기화용 백업
    if (resultData.data.length == 0) {
      router.push('/404');
    } else {

      Object.assign(insuranceDTO.value, resultData.data[0]);
      if(insuranceDTO.value.insr_retr_yn == 'Y') {
        insr_st_dt_min.value = resultData.data[0].base_insr_st_dt;
      }
      insuranceDTO.value.insr_st_dt = '2024-06-30'
      getUserInfoToSetUserInfoByInsurance();
      console.log(insuranceDTO.value)
      await apiContract.setDBUpd(insuranceDTO.value);

    }
    }
  }
  // 재계산
  calInsrAmt(insuranceDTO.value);
    insuranceDTOBackup.value = JSON.parse(JSON.stringify(insuranceDTO.value));
  // console.log(insuranceDTOBackup.value);
  // 초기화용 백업
 // Object.assign(insuranceDTOBackup.value, insuranceDTO.value);
  onLoading.value = true;

  // console.log('pdfFileName',pdfFileName)
  // console.log("insuranceDTO.value.busnised",insuranceDTO.value.business_cd)
  // console.log("insuranceDTO.value.user_cd",insuranceDTO.value.user_cd)
  // console.log("insuranceDTO.value.insr_year",insuranceDTO.value.insr_year>2023)
  if(insuranceDTO.value.insr_year>2023)
    pdfFileName.value = '세무사_보험약관'+insuranceDTO.value.insr_year+'.pdf'
});
</script>
