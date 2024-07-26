<template xmlns="http://www.w3.org/1999/html">
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
            next-icon="mdi-arrow-right"
            prev-icon="mdi-arrow-left"
          >
            <v-tab value="1" class="flex-grow-1" :disabled="true">가입정보</v-tab>
            <v-tab value="2" class="flex-grow-1" :disabled="true">보험계약 [기본담보] {{ renewalYN === 'Y'?'(갱신)':'' }}</v-tab>
            <v-tab value="3" class="flex-grow-1" :disabled="true">보험계약 [특약] {{ renewalYN === 'Y'?'(갱신)':'' }}</v-tab>
            <v-tab value="4" class="flex-grow-1" :disabled="true">약관동의</v-tab>
          </v-tabs>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-16" justify="center" v-if="onLoading">
      <v-col :cols="checkMobile.isMobile?'12':'8'" :class="checkMobile.isMobile?'pa-2':''">
        <v-window v-model="tab" disabled="true">
          <!-- 가입정보 Tab 시작 -->
          <v-window-item value="1" >
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
                      <p>소속 지방회</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" class="w-200"  single-line density="comfortable" disabled="true"></VSelectWithValidation>

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
                        label="우편번호"
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
              <v-col cols="12" :class="checkMobile.isMobile?'pt-2':'pt-6'" v-if="insuranceDTO.user_cd == 'JNT'">
                <v-row class="v-board-table">
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소명</p>
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
                      <VTextFieldWithValidation v-model="insuranceDTO.corp_ceo_nm"  name="corp_ceo_nm" label="대표자 성명" single-line density="comfortable" />
                    </div>
                  </v-col>

                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>사무소 형태</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VSelectWithValidation v-model="insuranceDTO.corp_type" name="corp_type" label="사무소 형태" :items="corpTypeItems" class="w-200"  single-line density="comfortable" disabled="true"></VSelectWithValidation>
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
                    </div>
                    <div class="data-col">{{ insuranceDTO.corp_cust_hpno }}
                      <!-- <VTextFieldWithValidation
                        v-model="insuranceDTO.user_hpno"
                        name="user_hpno"
                        label="휴대전화"
                        single-line
                        density="comfortable"
                        :readonly="isReadOnlyAll"
                      /> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>이메일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">{{ insuranceDTO.corp_cust_email }}
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
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>소속 지방회</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" class="w-200"  single-line density="comfortable" disabled="true"></VSelectWithValidation>
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
                        label="보험시작일자"
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
                        label="보험종료일자"
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
                      class="v-col"
                      v-if="insuranceDTO.user_cd === 'JNT'"
                  >
                    <div class="head-col">
                      <p>피보험자</p>
                    </div>
                    <div class="data-col" v-if="insuranceDTO.cbr_data.length>0">
                      {{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{insuranceDTO.cbr_cnt-1}}명
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    class="v-col"
                  >
                    <div class="head-col">
                      <p>소급담보일</p>
                    </div>
                    <div class="data-col" v-if="insuranceDTO.user_cd === 'IND'" > {{ insuranceDTO.insr_retr_dt }} </div>
                    <div class="data-col" v-if="insuranceDTO.user_cd === 'JNT'">개인별 적용</div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="v-col"
                    v-if="insuranceDTO.user_cd === 'JNT'"
                  >
                    <div class="head-col">
                      <p>인원수 할인</p>
                    </div>
                    <div class="data-col">{{ insuranceDTO.insr_pcnt_sale_rt }} %
                    </div>
                  </v-col>
                  <v-col cols="12" :sm="insuranceDTO.user_cd === 'JNT'? 6 : 12" class="v-col">
                    <div class="head-col">
                      <p>
                        무사고 할인 /<br />사고 할증
                      </p>
                    </div>
                    <div class="data-col text-center" v-if="insuranceDTO.user_cd === 'IND'">{{ insuranceDTO.insr_sale_rt }} %</div>
                    <div class="data-col text-center" v-if="insuranceDTO.user_cd === 'JNT'">개인별 적용</div>
                  </v-col>

                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p v-if="insuranceDTO.user_cd === 'IND'">연 매출액</p>
                      <p v-if="insuranceDTO.user_cd === 'JNT'">법무사 1인당<br/>평균 매출액</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100">
                      <p class="text-caption font-weight-light color-gray flex-grow-1">
                      <div class="d-flex align-center">
                        <v-text-field
                                name="insr_take_amt"
                                v-model="insr_take_amt"
                                variant="outlined"
                                hide-details="auto"
                                @keydown.enter.prevent="blurField"
                        />
                        <span style="margin-left: 10px">원</span>
                      </div>
                        <span class="text-error">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i
                        >매출액은 연초에 업무보고한 직전년도 매출액을 반드시 기재요망 (전년도 1.1 ~ 12월말까지 매출)<br/>
                      <p class="ml-4"> * 대한법무사협회 전산신고한 업무보고서 매출 확인 </p>

                        </span>
                      <span v-if="insuranceDTO.user_cd=='JNT'">
                      <i class="mdi mdi-alert-circle-outline mr-2"></i
                      >법무사법인, 합동사무소의 연간총매출액을 법무사 수로 나눠 1인당 평균 매출액 기재<br/></span>
                        <i class="mdi mdi-alert-circle-outline mr-2"></i
                        >전년 매출이 없는 경우 1년 예상 매출액 기재
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col h-100">
                    <div class="head-col">
                      <p>매출액구간</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100 align-stretch">
                      <v-btn-toggle
                          v-model="insr_take_sec"
                          divided
                          variant="outlined"
                          density="comfortable"
                          class="align-stretch d-flex flex-wrap overflow-visible w-100"
                          disabled="true"
                      >
                        <v-btn
                            color="primary"
                            class="flex-grow-1"
                            :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: x-small':'font-size: x-small'"
                            value="1|5천만원이하"
                        >5천만이하</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-1"
                            :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: x-small':'font-size: x-small'"
                            value="2|1억원이하"
                        >1억이하</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-1"
                            :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: x-small':'font-size: x-small'"
                            value="3|2억원이하"
                        >2억이하</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-1"
                            :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: x-small':'font-size: x-small'"
                            value="4|3억원이하"
                        >3억이하</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-1"
                            :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: x-small':'font-size: x-small'"
                            value="5|5억원이하"
                        >5억이하</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-1"
                            :style="checkMobile.isMobile?'flex-basis: 30%; border: 1px solid #EEEEEE; text-align: center;font-size: x-small':'font-size: x-small'"
                            value="6|7억원이하"
                        >7억이하</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-0"
                            :style="checkMobile.isMobile?'flex-basis: 33.3%; border: 1px solid #EEEEEE; text-align: center;font-size: x-small':'font-size: x-small'"
                            value="7|10억원이하"
                        >10억이하</v-btn
                        >
                      </v-btn-toggle>
                      <span v-if="checkMobile.isMobile" class="" style="margin-top: 145px"></span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col h-100" >
                    <div class="head-col">
                      <p>보상한도</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100 align-stretch">
                      <v-btn-toggle
                        v-model="clm_lt_amt"
                        name="insr_clm_lt_amt"
                        divided
                        variant="outlined"
                        class="d-flex flex-wrap overflow-visible w-100"
                        :disabled="isReadOnlyAll"
                      >
                        <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="1|5천만원/1억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                          ><p><span style="font-size: 80%; ">case 1)</span> <br/> 5천만원/1억원</p></v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="2|1억원/1억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                          ><p><span style="font-size: 80%; ">case 2)</span> <br/> 1억원/1억원</p></v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="3|1억원/2억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                          ><p><span style="font-size: 80%; ">case 3)</span> <br/> 1억원/2억원</p></v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-0 custom-toggle-btn"
                            value="4|1억원/3억원"
                            :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                        ><p><span style="font-size: 80%; ">case 4)</span> <br/> 1억원/3억원</p></v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-0 custom-toggle-btn"
                            value="5|1억원/5억원"
                            :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                        ><p><span style="font-size: 80%; ">case 5)</span> <br/> 1억원/5억원</p></v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-0 custom-toggle-btn"
                            value="6|2억원/2억원"
                            :disabled="insuranceDTO.corp_region_cd=='010'&&relief_yn"
                        ><p><span style="font-size: 80%; ">case 6)</span> <br/> 2억원/2억원</p></v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-0 custom-toggle-btn"
                            value="7|2억원/4억원"
                            :disabled="insuranceDTO.corp_region_cd=='010'&&relief_yn"
                        ><p><span style="font-size: 80%; ">case 7)</span> <br/> 2억원/4억원</p></v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-0 custom-toggle-btn"
                            value="8|3억원/3억원"
                            :disabled="insuranceDTO.corp_region_cd=='010'&&relief_yn"
                        ><p><span style="font-size: 80%; ">case 8)</span> <br/> 3억원/3억원</p></v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-0 custom-toggle-btn"
                            value="9|3억원/5억원"
                            :disabled="insuranceDTO.corp_region_cd=='010'&&relief_yn"
                        ><p><span style="font-size: 80%; ">case 9)</span> <br/> 3억원/5억원</p></v-btn
                        >
                      </v-btn-toggle>
                      <span class="text-caption font-weight-light color-gray" style="margin-top: 110px">
                      <p  >
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당 / 연간총보상한도
                      </p>
                        <span v-if="insuranceDTO.corp_region_cd=='010'">
                        <p><i class="mdi mdi-alert-circle-outline mr-2" ></i>보상한도 Case6 이상 선택시 서울중앙지방법무사회 지원금 10만원이 적용됩니다.</p>
                        <p class="pl-5">(8월 2일 이후 신규 가입시 지원금 일할계산 적용)</p>
                          <p class="d-flex align-center mt-minus-5" :style="checkMobile.isMobile?'line-height: 0.7rem !important':''"><i class="mdi mdi-alert-circle-outline mr-2"></i>보상한도 Case1~5 선택시 지원금 미적용: 미적용 선택 <v-checkbox-btn v-model="relief_yn"></v-checkbox-btn></p>
                        </span>
                      </span>

                      <v-divider class="border-0" />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>자기부담금<sup class="text-error">*</sup></p>

                    </div>
                    <div class="data-col w-100">
                      <v-btn-toggle
                          v-model="insuranceDTO.insr_psnl_brdn_amt"
                          name="insr_psnl_brdn_amt"
                          divided
                          variant="outlined"
                          class="align-stretch w-100"
                          :disabled="psnl_yn"
                      >
                        <v-btn
                            color="primary"
                            :class="checkMobile.isMobile?'flex-grow-0 custom-toggle-btn':'flex-grow-0'"
                            value="3000000|3백만원"
                            :style="checkMobile.isMobile?'':'flex-basis: 30%'"
                        >3백만원</v-btn
                        >
                      </v-btn-toggle>
                      <span class="text-caption font-weight-light color-gray">
                        <p><i class="mdi mdi-alert-circle-outline mr-2"></i>자기부담금 3백만원을 기본으로 함.</p>
                        <p class="d-flex align-center mt-minus-5" :style="checkMobile.isMobile?'line-height: 0.7rem !important':''">
                          <i class="mdi mdi-alert-circle-outline mr-2" ></i>5백만원 선택 시 5%, 1천만원 선택 시 10% 할인 : 변경신청
                          <v-checkbox-btn v-model="psnl_yn"></v-checkbox-btn>
                        </p>

                      </span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col" v-if="psnl_yn">
                    <div class="head-col">
                      <p>자기부담금 변경</p>
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
                          class="flex-grow-0"
                          style="flex-basis: 33.3%;"
                          value="5000000|5백만원"
                          >5백만원</v-btn
                        >
                        <v-btn
                          color="primary"
                          class="flex-grow-0"
                          style="flex-basis: 33.3%;"
                          value="10000000|1천만원"
                          >1천만원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light color-gray mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <!-- 변호사 명단 시작 -->
              <v-col cols="12" sm="12" :class="checkMobile.isMobile?'py-0 px-4 mb-4':'py-0 px-14 mb-10'" v-if="insuranceDTO.user_cd != 'IND'">
                <div class="d-flex align-center mb-4 mt-6">
                  <svg width="8" height="12" fill="none" stroke-width="3" class="mr-2">
                    <line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line>
                    <line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line>
                  </svg>
                  <p class="text-body-1 font-weight-bold">법무사 명단</p>
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
                    <th class="text-center">소급담보일 / 보험개시일</th>
                    <th class="text-center">할인 할증</th>
                    <th class="text-center">1인당 보험료<p v-if="insuranceDTO.corp_region_cd==='010'">(지원금차감금액)</p></th>
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
                      {{ Number(row.insr_amt - row.insr_relief).toLocaleString() }}원
                    </td>
                    <td colspan="2" v-if="!row.isCheck"><v-btn variant="outlined" @click="chkSaleRtJNT(insuranceDTO, index)">인증</v-btn></td>
                    <td>
                      <v-btn variant="elevated" color="white" @click="delCBR(insuranceDTO, index)" size="small" class="min-width-auto pa-0" v-if="!isReadOnlyAll">
                        <vue-feather type="minus-square" class="text-gray cursor-pointer vertical-align-middle"></vue-feather>
                      </v-btn>
                    </td>
                  </tr>
                  </tbody>
                </v-table>
                <!-- <p class="text-14 color-error font-weight-light mt-2"><i class="mdi mdi-alert-circle-outline mr-1"></i>세무사를 인증해주세요.</p> -->
              </v-col>

            </v-row>
            <v-row class="mt-10">
              <v-col class="pa-0 d-flex justify-center">
                <v-btn
                  :size="checkMobile.isMobile?'default':'x-large'"
                  variant="outlined"
                  color="dark"
                  v-if="tab > 1 && tab < 4"
                  @click="onPrevPage()"
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

          <!-- 보험가입 [특약]  시작 -->
          <v-window-item value="3" :disabled="isReadOnlyAll">
            <v-row :class="checkMobile.isMobile?'v-box-table px-2 py-10':'v-box-table px-14 py-10'">
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
                      >사무원의 부정직행위 담보 특별약관 <br v-if="checkMobile.isMobile"/> (Dishonesty
                        Extension)</v-text-field
                      >
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>특약 선택</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100">
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
                    </div>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="12"
                      class="v-col"
                      v-if="insuranceDTO.spct_join_yn == 'Y'"
                  >
                    <div class="head-col">
                      <p>소급담보일</p>
                    </div>
                    <div class="data-col" > {{ insuranceDTO.spct_data.insr_retr_dt }} </div>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="12"
                      class="v-col"
                      v-if="insuranceDTO.spct_join_yn == 'Y'"
                  >
                    <div class="head-col">
                      <p>보상한도</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col w-100">
                      <v-btn-toggle
                          v-model="insuranceDTO.spct_data.insr_clm_lt_amt"
                          divided
                          variant="outlined"
                          class="w-100"
                          density="comfortable"
                      >
                        <v-btn
                            color="primary"
                            class="flex-grow-1 custom-toggle-btn"
                            value="25000000|2천5백만원"
                        >2천5백만원</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-1 custom-toggle-btn"
                            value="50000000|5천만원"
                            :disabled="clm_lt_amt?.getValueBySplit(0)<2"
                        >5천만원</v-btn
                        >
                        <v-btn
                            color="primary"
                            class="flex-grow-1 custom-toggle-btn"
                            value="100000000|1억원"
                            :disabled="clm_lt_amt?.getValueBySplit(0)<6"
                        >1억원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당 / 연간총보상한도<br/>
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>
                        보상한도는 기본담보의 50% 적용을 원칙으로 함.
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
                          :disabled="true"
                      >
                        <v-btn
                            color="primary"
                            :class="checkMobile.isMobile?'flex-grow-0 custom-toggle-btn':'flex-grow-1'"
                            value="5000000|5백만원"
                            :style="checkMobile.isMobile?'':'flex-basis: 33.3%'"
                        >5백만원</v-btn
                        >
                      </v-btn-toggle>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                        청구당
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
                      <p>사무원 수</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <v-text-field
                          name="insr_spct_cnt"
                          v-model="spct_cnt"
                          variant="outlined"
                          type="number"
                          @input="validateSpctNum"
                          hide-details="auto"
                          @keydown.enter="blurField"
                      /> <p style="margin-left: 4px">명</p>
                      <p class="text-caption font-weight-light mt-2">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>
                        각 지방 법무사회에 사무원으로 등록된 전 직원의 일괄가입 조건이며, 법무사 유자격자는 제외.<br/>
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>
                        직원수 10명 초과시 개별 문의
                      </p>
                    </div>
                  </v-col>
                </v-row>

                <div></div>
              </v-col>
            </v-row>
            <v-row class="mt-10">
              <v-col class="pa-0 d-flex justify-center">
                <v-btn
                    :size="checkMobile.isMobile?'default':'x-large'"
                    variant="outlined"
                    color="dark"
                    v-if="tab > 1 && tab < 4"
                    @click="onPrevPage()"
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
          <!-- 보험가입 [특약]  종료 -->

          <!-- 약관동의 시작 -->
          <v-window-item value="4" :disabled="isReadOnlyAll">
            <v-row class="v-box-table">
              <v-col cols="12" :class="checkMobile.isMobile?'px-2 py-10':'px-16 py-10'">
                <h3 class="text-h6 font-weight-bold">약관 동의</h3>
                <v-table :class="checkMobile.isMobile?'v-board-table mt-10 remove-padding':'v-board-table mt-10'">
                  <tbody >
                    <tr>
                      <td>
                        <span class="text-16">신청내용 확인</span>
                      </td>
                      <td >
                        <VCheckBoxWithValidation
                          v-model="insuranceDTO.agr10_yn"
                          name="agr10_yn"
                          label="확인함 (필수)"
                          class="v-checkbox"
                          :disabled="isReadOnlyAll"
                        />
                      </td>
                      <td >
                        <v-btn
                          :size="checkMobile.isMobile?'small':'default'"
                          color="gray"
                          variant="outlined"
                          class="ml-4"
                          @click="onInsuranceFormOpen(false)"
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
                    이 보험상품은 대한법무사협회를 단체계약자, 가입 회원을
                    피보험자로 하는 단체계약 프로그램입니다.
                  </li>
                  <li>
                    보험회사 : DB손해보험㈜ <template v-if="checkMobile.isMobile"><br/></template><template v-else><span class="text-caption mx-3">|</span></template>  보험중개사 : 록톤컴퍼니즈코리아손해보험중개(주)
                  </li>
                  <li>
                    보험료 입금 계좌번호 :
                    <b class="font-weight-medium text-error text-18"
                      >신한은행 140-005-862100</b
                    > <template v-if="checkMobile.isMobile"><br/></template><template v-else><span class="text-caption mx-3">|</span></template>예금주 :
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
                    <span class="d-inline-block w-sm-min-110 px-4 py-1" v-if="insuranceDTO.user_cd=='IND'">
                      {{ insuranceDTO.user_nm }}
                    </span>
                    <span class="d-inline-block w-sm-min-110 px-4 py-1" v-else-if="insuranceDTO.cbr_data.length>0 && insuranceDTO.user_cd=='JNT'">
                      {{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{insuranceDTO.cbr_cnt - 1}}명
                    </span>
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
                  @click="onPrevPage()"
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
                  to="/contract/LAW/V_TLAW0030A10"
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
              <p class="text-body-2 color-gray-shadow">매출액구간</p>
              <p class="text-body-2 text-right">
                {{ insr_take_sec.getValueBySplit(1) }}
              </p>
            </v-col>
            <v-col cols="12">
              <p class="text-body-2 color-gray-shadow">
                보상한도(1청구당/연간총)
              </p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO?.insr_clm_lt_amt }} /
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
              <p class="text-body-2 color-gray-shadow">법무사 인원수</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.cbr_cnt }} 명
              </p>
            </v-col>
            <v-col cols="12" v-if="insuranceDTO.user_cd != 'IND'">
              <p class="text-body-2 color-gray-shadow">인원수 할인율</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO.insr_pcnt_sale_rt }} %
              </p>
            </v-col>
            <!-- 법인만 보여주는 영역 종료 -->
            <!--<v-col cols="12" v-if="insuranceDTO.user_cd != 'IND'">
              <p class="text-body-2 color-gray-shadow">합계보험료</p>
              <p class="text-body-2 text-right">
                {{ Number(insuranceDTO.insr_amt - insuranceDTO?.insr_relief).toLocaleString() }}원
              </p>
            </v-col>-->
            <!-- 합동/법인만 보여주는 영역 끝 -->
          </v-row>

          <!-- 보험계약 기본담보 시작 -->
          <v-row class="mx-10 py-6 border-top-lightgray-1">
            <v-col cols="12">
              <p class="text-body-1 font-weight-medium">
                <vue-feather type="plus" class="vertical-align-middle" /> 산출
                보험료
              </p>
              <!-- <p class="text-body-1 font-weight-medium text-right">{{(insuranceDTO.insr_amt + insuranceDTO.cons_data.insr_amt)?.toLocaleString()}}원</p> -->
              <p class="text-body-1 font-weight-medium text-right">
                {{ Number(insuranceDTO?.insr_amt)?.toLocaleString() }}원
              </p>
            </v-col>
            <v-col cols="12" v-if="insuranceDTO.corp_region_cd==='010'">
              <p class="text-body-1 font-weight-medium">
                <vue-feather type="minus" class="vertical-align-middle" />
                지원금 차감액
              </p>
              <!-- <p class="text-body-1 font-weight-medium text-right">{{(insuranceDTO.insr_amt + insuranceDTO.cons_data.insr_amt)?.toLocaleString()}}원</p> -->
              <p class="text-body-1 font-weight-medium text-right">
                {{ Number(insuranceDTO?.insr_relief)?.toLocaleString() }}원
              </p>
            </v-col>
          </v-row>
          <!-- 보험계약 기본담보 끝 -->

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
                사무원 부정직행위 담보 특별약관<br/>(Dishonesty Extension)
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
                <span class="text-body-2 text-right" v-if="insuranceDTO?.spct_data?.insr_clm_lt_amt?.getValueBySplit(1) !== '2천5백만원'">/ {{ insuranceDTO?.spct_data?.insr_year_clm_lt_amt }}</span>
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
              <p class="text-body-2 color-gray-shadow">사무원 수</p>
              <p class="text-body-2 text-right">
                {{ insuranceDTO?.spct_data?.cbr_cnt }} 명
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
            <v-col cols="12">
              <p class="text-h6 font-weight-medium color-primary">
                최종 보험료
              </p>
              <p class="text-h6 font-weight-medium color-primary text-right">
                {{ Number(insuranceDTO?.insr_tot_amt - insuranceDTO?.insr_relief)?.toLocaleString() }}원
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
            ><span class="color-primary">법무사 성명과 등록번호</span>를 함께
            기재하여 송금해주시기 바랍니다.
          </p>
          <p class="text-16 text-gray" v-if="insuranceDTO.user_cd === 'JNT'">
            <i class="mdi mdi-alert-circle-outline mr-1"></i><span class="color-primary">법인 및 사무소명으로 일괄
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
                to="/contract/LAW/V_TLAW0030A10"
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
        <V_TLAW0030P10 />
      </v-card-text>
    </v-card>
  </v-dialog>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

  <!-- 가입신청서 시작 -->
  <V_TLAW0030P20 :insurance_dto="insuranceDTO" :isPdf=isPdf :isNotAuth=true v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
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

import {isLeapYear, getDateDiff, calByString_ADV} from '../../../util/util';
import MessageBox from '@/components/MessageBox.vue';

import apiUser from '@/api/api/user.api';
import apiLAW0030a from '@/api/api/A_TLAW0030A';

import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import V_TLAW0030P10 from './V_TLAW0030P10.vue';
import V_TLAW0030P20 from "@/views/contract/LAW/V_TLAW0030P20.vue";


import TermsOfPolicy from './V_TLAW0030P01.vue';      // PDF 다운로드
import TermsOfInsurance from './V_TLAW0030P02.vue';   // 상품설명확인서 확인
import TermsOfContract from './V_TLAW0030P03.vue';    // 계약 체결·이행 등을 위한 개인(신용)정보 처리동의

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
const renewalUpdateYN = ref('N');
const insuranceUUID = ref('');
const insr_take_amt = ref(0);
const insr_take_sec = ref('');
const spct_cnt = ref(1);
const clm_lt_amt = ref('');

const INSR_RATE_TABLE = ref([]);
const INSR_RATE_MAX_DAYS = ref(0);

// 초기정보 설정
const userDTO = ref(new UserDTO());
const insuranceDTO = ref(new InsuranceDTO());
const insuranceRateDTO = ref(new InsuranceRateDTO());
const insuranceDTOBackup = ref(new InsuranceDTO());
const messageBoxDTO = ref(new MessageBoxDTO());
const isSpctNew = ref(false)
const psnl_yn = ref(false);
const relief_yn = ref(false);

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
const corpTypeItems = ref([]);

const dialog2 = ref(false);

const isInsuranceFormDialog = ref(false);
const isTermsOfContractDialog = ref(false);
const isTermsOfPolicyDialog = ref(false);

const isDaumPostDialog = ref(false);
const isInsrTableDialog = ref(false);

function changePage() {
  console.log("change")
}

function isReadonlyByInsrStDt()
{
  // console.log(insuranceDTO.value.base_insr_st_dt + ":" + TODAY + ":" + renewalYN.value + ":" + insuranceDTO.value.insr_retr_yn);///

  /**
   * 1. 신규이면 항상 보험기간을 변경할 수 있게 한다
   * 2. 기준_보험시작일자가 소금담보일보다 작으면 갱신으로 판단하여 수정불가
   */
  if (insuranceDTO.value.user_cd === 'JNT') return true;
  if (renewalYN.value === 'Y') return true;
  if (new Date(insuranceDTO.value.base_insr_st_dt) > new Date(insuranceDTO.value.insr_retr_dt)) {
    return true;
  }
  
  return false;
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
 * @param sKey1 매출액구간
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
  
  //let sKey = sKey1.getValueBySplit(0) + '|' + sKey2.getValueBySplit(0); //+ '|' + sKey3.getValueBySplit(0);
  let sKey = sKey2.getValueBySplit(0) + '|' + sKey1.getValueBySplit(0);
  // 인원수별 할인구간
  let discountRanges = [
      {range: [13, Infinity], rate: -40},
      {range: [12, 12], rate: -39},
      {range: [11, 11], rate: -37},
      {range: [10, 10], rate: -35},
      {range: [9, 9], rate: -33},
      {range: [8, 8], rate: -30},
      {range: [7, 7], rate: -27},
      {range: [6, 6], rate: -24},
      {range: [5, 5], rate: -21},
      {range: [4, 4], rate: -18},
      {range: [3, 3], rate: -15},
      {range: [2, 2], rate: -10},
      {range: [0, 1], rate: -0},
    ];
  let discountPsnl = 0;
  switch(sKey3.getValueBySplit(0)){
    case '5000000':
      discountPsnl = -5;
      break;
    case '10000000':
      discountPsnl = -10;
      break;
    default:
      discountPsnl = 0;
      break;
  }

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

    if (nDCnt > INSR_RATE_MAX_DAYS.value) nDCnt = INSR_RATE_MAX_DAYS.value;

    // 기본보험료 조회
    nInitAmt = INSR_RATE_TABLE.value.기본담보.보험료.filter(data => data.key === sKey)[0].amt;
  
    // 기본 보험 계산식(합동)  기본금액 * 할인 할증 * 인원수 할인 * 기간일수 / 365
    nTotAmt = (nInitAmt *  (nDCnt / INSR_RATE_MAX_DAYS.value)) * (1 + discountRate / 100) * (1 + nRate / 100) * (1 + discountPsnl / 100);

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
    nDCnt = getDateDiff(sSDt, sEDt, INSR_RATE_MAX_DAYS.value);
    // 365일을 넘지 않도록 한다.
    if (nDCnt > INSR_RATE_MAX_DAYS.value) nDCnt = INSR_RATE_MAX_DAYS.value;
    // 기본보험료 조회
    //nInitAmt =  (eval("INSR_RATE_TABLE.value['특약']['" + sKey1 + "']['"+ sKey2 + "']"));
    nInitAmt = INSR_RATE_TABLE.value.특약담보.보험료.filter(
        data => data.key === sKey
    )[0].amt;

    // 보험 계산식
    nTotAmt = Math.floor((nInitAmt * (nDCnt / INSR_RATE_MAX_DAYS.value)) / 10) * 10 * nPCnt;
  } catch (err) {
    console.log(err);
    nTotAmt = 0;
  }
  // 계산불가 일 경우 0으로 설정
  if (isNaN(nTotAmt)) nTotAmt = 0;

  return nTotAmt;
};

/**
 * 보험료 계산
 *
 * @param sSDt   시작일자
 * @param sEDt   종료일자
 * @param region 소속지방회
 * @param sKey   구분코드
 */
const getInsrRelief = (
    sSDt: string,
    sEDt: string,
    region: string,
    sKey: number
) => {
  if (!region || !sKey) return 0;

  let relief = 0;
  let initRelief = 0;
  let nDCnt = 0;

  try {
    // 기간 계산
    nDCnt = getDateDiff(sSDt, sEDt, INSR_RATE_MAX_DAYS.value);

    if (nDCnt > INSR_RATE_MAX_DAYS.value) nDCnt = INSR_RATE_MAX_DAYS.value;

    // 기본 보험 계산식(합동)  기본금액 * 할인 할증 * 인원수 할인 * 기간일수 / 365
    if(sKey > 5 && region === '010'){
      initRelief = 100000;
    }else {
      initRelief = 0
    }
    relief = (initRelief *  (nDCnt / INSR_RATE_MAX_DAYS.value));

    // 10원단위 절사
    relief = Math.floor(relief / 10) * 10;

  } catch (err) {
    console.log(err);
    relief = 0;
  }

  // 계산불가 일 경우 0으로 설정
  if (isNaN(relief)) relief = 0;

  return relief;
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
      
      // 수기처리가 아니면 기초셋팅
      /*if( data.cbr_data[idx].insr_retr_yn !== 'Y') {
        data.cbr_data[idx].insr_retr_dt = data.cbr_data[idx].insr_st_dt;
        data.cbr_data[idx].insr_sale_rt = insuranceDTO.value.insr_sale_rt;
      }*/
      
      // 연간 보험료 (365일 기준)
      data.cbr_data[idx].insr_base_amt = getInsrAmt(
        null,
        null,
        data.insr_take_sec,
        clm_lt_amt.value,
        data.insr_psnl_brdn_amt,
        0,
        1
      );

      // 개별 보험료 - 기간, 할인할증 적용 보험료
      data.cbr_data[idx].insr_amt = getInsrAmt(
        data.cbr_data[idx].insr_st_dt,
        data.cbr_data[idx].insr_cncls_dt,
        data.insr_take_sec,
        clm_lt_amt.value,
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
    }

    data.insr_amt = totAmt;
    data.insr_premium_amt = totAmt;

  }
};

/**
 * 보험계약[기본담보] 지원금 재계산
 *
 * @param data 보험 명단 데이터
 */
const calInsrRelief = (data: any, region_cd: string, clm_code: number) => {

  let totAmt = 0;

  if (data.cbr_data != undefined) {

    for (var idx in data.cbr_data) {
      data.cbr_data[idx].insr_relief = getInsrRelief(
          insuranceDTO.value.insr_st_dt,
          insuranceDTO.value.insr_cncls_dt,
          region_cd,
          clm_code
      )

      totAmt += data.cbr_data[idx].insr_relief;

    }

    data.insr_relief = totAmt;

  }
};

/**
 * 보험계약[특별] 보험료 재계산
 *
 * @param data 보험 명단 데이터
 */
const calInsrSpctAmt = (data: any) => {


  data.insr_amt = getInsrSpctAmt(
      data.insr_st_dt,
      insuranceDTO.value.insr_cncls_dt,
      data.insr_clm_lt_amt,
      data.insr_psnl_brdn_amt,
      data.cbr_cnt,
  );

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
async function chkSaleRtJNT(list: any, rowIdx: number) {

  // const nDupCnt = checkDuplicateData(insuranceDTO.value.cbr_data);
  // if (nDupCnt) {
  //   messageBoxDTO.value.setWarning( '입력확인', '이미 입력하신 회원입니다.');
  //   return false;
  // }

  if (insuranceDTO.value.cbr_data != null) {
    const existValue = insuranceDTO.value.cbr_data.filter(item => item.cbr_nm === list.cbr_data[rowIdx].cbr_nm || item.cbr_regno === list.cbr_data[rowIdx].cbr_regno)
    if(existValue.length > 1) {
      messageBoxDTO.value.setWarning( '중복입력', '이미 명단에 포함된 회원입니다.');
      return false
    }
  }


  const params = { insr_year: insuranceDTO.value.insr_year, business_cd: _AUTH_USER.value.businessCd, user_nm: list.cbr_data[rowIdx].cbr_nm, user_birth: list.cbr_data[rowIdx].cbr_brdt, user_regno: list.cbr_data[rowIdx].cbr_regno };
  const result = await apiLAW0030a.getSaleRtNDupInfo(params);
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
        - 변경전 할증/할인 이 있으면 할증/할인 을 가져온다. (2024년 수정)

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
       *  - 개인/법인 할인 가져온다.
       *
       */
      list.cbr_data[rowIdx].insr_sale_rt = insr_sale_rt;
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
      } else {
        messageBoxDTO.value.setInfo(
          '법무사 인증',
          '법무사 생년월일 또는 등록번호가 일치하지 않습니다.<br/>정확한 내용을 확인 바라며, 반복 오류시 록톤코리아로 연락해주시기 바랍니다.'
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
  const result = await apiLAW0030a.getSaleRtNDupInfo(params);

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
      if (result.data.renewal[0].user_cd === 'JNT') {

        insuranceDTO.value.insr_sale_rt = insr_sale_rt;
        // if (insr_sale_rt > 0) {
        //   // 전환 대상자의 할증을 가져온다.
        //   insuranceDTO.value.insr_sale_rt = insr_sale_rt;
        // } else {
        //   // 개인전환 할인은 0% 고정
        //   insuranceDTO.value.insr_sale_rt = 0;
        // }

        messageBoxDTO.value.setWarning(
          '복수 갱신대상 이력이 조회됩니다.',
          '개인으로 신규가입시, 복수 가입 때의 소급담보일을 인정해드리고 있으니 참고 바랍니다.'
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
  let tabiValue = parseInt(tab.value);
  tabiValue += 1
  tab.value = tabiValue.toString();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function onPrevPage(values: any) {
  if (isDuplication.value) return false;
  let tabiValue = parseInt(tab.value);
  tabiValue -= 1
  tab.value = tabiValue.toString();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMessageBoxByInsrDt() {
  return true;
  messageBoxDTO.value.setInfo(
    '보험기간 소급가입',
    '소급가입을 원하시는 경우 록톤코리아(02-2011-0300)로 연락주시기 바랍니다.'
  );
}

function validateSpctNum() {
  if (spct_cnt.value > 10) {
    spct_cnt.value = 10
  }
}


async function checkValidation() {
  const selectedTab = tab.value;
  const validationSchema = InsuranceYup[`LAW_${insuranceDTO.value.user_cd}_TAB${tab.value}`];

  const isValidate = await validationSchema.validate(insuranceDTO.value, { abortEarly: false })
    .then(() => {
      return true;
    })
    .catch(error => {
      // 유효성 검사 실패
      console.log(error.errors)
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

  if (!await checkValidation())
  {
    preventDupClick = true;
    return false;
  }

  let result;
  if(insuranceDTO.value.insurance_uuid == '') {
    //insuranceDTO.value.insr_year = insuranceDTO.value.insr_st_dt.substring(0,4);
    result = await apiLAW0030a.setDBIns(insuranceDTO.value);
  }else if(insuranceDTO.value.status_cd === '10') {
    result = await apiLAW0030a.setDBUpd(insuranceDTO.value);
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
        `법무사 명단 중 이미 보험계약이 되어있는 회원이 있습니다.<br/>퇴사자 등이 있는 경우 명단에서 삭제 후 재신청 바랍니다.
         <br/>(추가문의 : 록톤코리아 02-2011-0300)`
      );
    } else {
      alert("보험가입 실패");
    }
    preventDupClick = false;
  }
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
   * 해당컬럼 제외시키던지 백업후 재설정  해줘야함
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
  const region_nm = insuranceDTO.value.corp_region_nm;
  
  // 가입정보DTO
  Object.assign(insuranceDTO.value, userDTO.value);

  // 재설정
  insuranceDTO.value.status_cd = status_cd;
  insuranceDTO.value.corp_region_nm = region_nm;

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

    // 개인일 경우에는 명단이 없으나 총 1명으계산한다.
    insuranceDTO.value.cbr_cnt = 1;
    insuranceDTO.value.corp_type = '';
    insuranceDTO.value.corp_bnno = '';


  // 법인 가입정보 설정
  } else if (insuranceDTO.value.user_cd == 'JNT') {
    insuranceDTO.value.user_birth = '';
    insuranceDTO.value.user_regno = '';

    insuranceDTO.value.corp_type = userDTO.value.corp_type;
    insuranceDTO.value.corp_bnno = userDTO.value.corp_bnno;
    insuranceDTO.value.corp_ceo_nm = userDTO.value.corp_ceo_nm;
  }

}
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

watch(() => [clm_lt_amt.value, insuranceDTO.value.corp_region_cd, insuranceDTO.value.cbr_cnt, insuranceDTO.value.insr_st_dt]
    ,
    (newValue, oldValue) => {
      const local_clm_lt_amt = newValue[0]
      const region_cd = newValue[1]
      let clm_code = 0;
      if(local_clm_lt_amt != undefined && local_clm_lt_amt !== '') {
        clm_code = Number(local_clm_lt_amt.getValueBySplit(0))
        if(clm_code < 2){
          if(Number(insuranceDTO.value.spct_data.insr_clm_lt_amt.getValueBySplit(0)) > 25000000){
            insuranceDTO.value.spct_data.insr_clm_lt_amt = ''
          }
        }else if(clm_code <6){
          if(Number(insuranceDTO.value.spct_data.insr_clm_lt_amt.getValueBySplit(0)) > 50000000){
            insuranceDTO.value.spct_data.insr_clm_lt_amt = ''
          }
        }
        const clm_lt_amt_value = local_clm_lt_amt.getValueBySplit(1)
        insuranceDTO.value.insr_clm_lt_amt = clm_lt_amt_value.split('/')[0]
        let year_clm_lt_amt = clm_lt_amt_value.split('/')[1]
        if(year_clm_lt_amt && insuranceDTO.value.cbr_cnt >= 3 ){
          year_clm_lt_amt = (parseInt(year_clm_lt_amt) * 2) + '억원'
        }
        insuranceDTO.value.org_insr_year_clm_lt_amt = clm_lt_amt_value.split('/')[1]
        insuranceDTO.value.insr_year_clm_lt_amt = year_clm_lt_amt
      }else if (local_clm_lt_amt == undefined && local_clm_lt_amt !== '') {
        insuranceDTO.value.insr_clm_lt_amt = '';
        insuranceDTO.value.org_insr_year_clm_lt_amt = '';
        insuranceDTO.value.insr_year_clm_lt_amt = '';
      }
      if(insuranceDTO.value.user_cd == 'IND') {
        insuranceDTO.value.insr_relief = getInsrRelief(
            insuranceDTO.value.insr_st_dt,
            insuranceDTO.value.insr_cncls_dt,
            region_cd,
            clm_code
        )
      }else {
        calInsrRelief(insuranceDTO.value, region_cd, clm_code);
      }
    })
watch(() => psnl_yn.value, (newValue, oldValue) => {
  if(!newValue){
    insuranceDTO.value.insr_psnl_brdn_amt = '3000000|3백만원'
  }else {
    if(insuranceDTO.value.insr_psnl_brdn_amt == '3000000|3백만원'){
      insuranceDTO.value.insr_psnl_brdn_amt = ''
    }
  }
})

/**
 * 보험계약 - 보험료 계산
 */
watch(
    () =>
      relief_yn.value
    ,
    (newValue, oldValue) => {
      // 읽기전용일 경우 해당로직 제외
      if (isReadOnlyAll.value) return false;
      if(insuranceDTO.value.corp_region_cd == '010'){
        if((!newValue && clm_lt_amt.value.getValueBySplit(0) < 6)||( newValue && clm_lt_amt.value.getValueBySplit(0) > 5)){
          clm_lt_amt.value = ''
          insuranceDTO.value.insr_clm_lt_amt = ''
          insuranceDTO.value.insr_year_clm_lt_amt = ''
        }
      }
    }
);

/**
 * 보험계약 - 보험료 계산
 */
watch(
    () => [
      insr_take_amt.value,
      insuranceDTO.value.cbr_cnt
    ],
    (newValue, oldValue) => {
      // 읽기전용일 경우 해당로직 제외
      if (isReadOnlyAll.value) return false;
      if(insr_take_amt.value==''){
        insuranceDTO.value.insr_take_amt = 0;
        insuranceDTO.value.insr_take_sec = '';
        insr_take_sec.value = '';
        insr_take_amt.value = 0;
      }else {
        changeTakeAmount();
      }
    }
);

/**
 * 보험계약 - 보험료 계산
 */
  watch(
  () => [
    insuranceDTO.value.insr_st_dt,
    insuranceDTO.value.insr_cncls_dt,
    insuranceDTO.value.insr_take_sec,
    insuranceDTO.value.insr_clm_lt_amt,
    insuranceDTO.value.insr_year_clm_lt_amt,
    insuranceDTO.value.insr_psnl_brdn_amt,
    insuranceDTO.value.user_cd,
    insuranceDTO.value.insr_sale_rt,
    insuranceDTO.value.cbr_cnt
  ],
  (newValue, oldValue) => {
    // 읽기전용일 경우 해당로직 제외
    if (isReadOnlyAll.value) return false;

    if (newValue[3] !== oldValue[3]){
      if(insuranceDTO.value.spct_data && insuranceDTO.value.spct_data?.insr_clm_lt_amt != ''){
        if(Number(insuranceDTO.value.spct_data?.insr_clm_lt_amt?.getValueBySplit(0)) > Number(insuranceDTO.value.insr_clm_lt_amt.getValueBySplit(0)) / 2){
          insuranceDTO.value.spct_data.insr_clm_lt_amt = '';
        }
      }
    }

    // 기준보험료 계산
    insuranceDTO.value.insr_base_amt = getInsrAmt(
      null,
      null,
      insuranceDTO.value.insr_take_sec,
      clm_lt_amt.value,
      insuranceDTO.value.insr_psnl_brdn_amt,
      0,
      1
    );
    console.log(insuranceDTO.value.insr_base_amt)

    // 특약 재계산
    if (insuranceDTO.value.spct_join_yn == 'Y') {
      calInsrSpctAmt(insuranceDTO.value.spct_data);
    }

    if (insuranceDTO.value.user_cd == 'IND') {
      calInsrAmt(insuranceDTO.value);

      // 개인일 경우 보험사 명단이 없으므로 1명으로 설정하여 보험료를 가져온다.
      insuranceDTO.value.insr_amt = getInsrAmt(
        insuranceDTO.value.insr_st_dt,
        insuranceDTO.value.insr_cncls_dt,
        insuranceDTO.value.insr_take_sec,
        clm_lt_amt.value,
        insuranceDTO.value.insr_psnl_brdn_amt,
        insuranceDTO.value.insr_sale_rt,
        1
      );

    } else {
      calInsrAmt(insuranceDTO.value);

      /*insuranceDTO.value.insr_amt = getInsrAmt(
          insuranceDTO.value.insr_st_dt,
          insuranceDTO.value.insr_cncls_dt,
          insuranceDTO.value.insr_take_sec,
          insuranceDTO.value.insr_clm_lt_amt,
          insuranceDTO.value.insr_psnl_brdn_amt,
          insuranceDTO.value.insr_sale_rt,
          insuranceDTO.value.cbr_cnt
      );*/
    }

    // 기본담보 - 보상한도(연보험)
    //insuranceDTO.value.insr_year_clm_lt_amt = calByString_ADV(insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1), insuranceDTO.value?.cbr_data?.length, 1000000000);
    insuranceDTO.value.insr_premium_amt = insuranceDTO.value?.insr_amt;
    // 최종보험료
    //insuranceDTO.value.insr_tot_amt = insuranceDTO.value?.insr_amt;

  }
);

/**
 * 보험계약[특별약정] 보험료 계산
 */
watch(
    () => [
      insuranceDTO.value.spct_data.insr_clm_lt_amt,
      insuranceDTO.value.spct_data.insr_psnl_brdn_amt,
      spct_cnt.value,
    ],
    (newValue, oldValue) => {

      // 읽기전용일 경우 해당로직 제외
      if (isReadOnlyAll.value) return false;
      insuranceDTO.value.spct_data.cbr_cnt = spct_cnt.value

      insuranceDTO.value.spct_data.insr_base_amt = getInsrSpctAmt(
          null,
          null,
          insuranceDTO.value.spct_data.insr_clm_lt_amt,
          insuranceDTO.value.spct_data.insr_psnl_brdn_amt,
          1
      );

      insuranceDTO.value.spct_data.insr_amt = getInsrSpctAmt(
          insuranceDTO.value.spct_data.insr_st_dt,
          insuranceDTO.value.spct_data.insr_cncls_dt,
          insuranceDTO.value.spct_data.insr_clm_lt_amt,
          insuranceDTO.value.spct_data.insr_psnl_brdn_amt,
          insuranceDTO.value.spct_data.cbr_cnt
      );
      calInsrSpctAmt(insuranceDTO.value.spct_data);
      insuranceDTO.value.spct_data.insr_year_clm_lt_amt = insuranceDTO.value.spct_data.insr_clm_lt_amt?.getValueBySplit(0) >1000000000 ? '10억원' :  insuranceDTO.value.spct_data.insr_clm_lt_amt?.getValueBySplit(1)
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
  if(!isSpctNew.value && insuranceDTO.value.spct_data.insr_retr_dt != null && insuranceDTO.value.spct_data.insr_retr_dt !== TODAY ){
    insuranceDTO.value.spct_data.insr_st_dt = insuranceDTO.value.spct_data.insr_retr_dt
  }else {
    if(renewalYN.value === 'Y'){
      if(insuranceDTO.value.spct_data.insr_retr_dt)
        insuranceDTO.value.spct_data.insr_retr_dt = insuranceDTO.value.spct_data.insr_retr_dt
      else {
        insuranceDTO.value.spct_data.insr_retr_dt = TODAY
      }
    }else {
      insuranceDTO.value.spct_data.insr_retr_dt = insuranceDTO.value.insr_st_dt
    }
    insuranceDTO.value.spct_data.insr_st_dt = insuranceDTO.value.spct_data.insr_retr_dt
  }

  // 소급담보일이 수기수정일 경우에는 갱신으로 판단하기에 해당 로직에서 제외된다.
  if (insuranceDTO.value.insr_retr_yn === 'Y') {
    return false;
  } else if (insuranceDTO.value.user_cd === 'IND' && TODAY <= newValue[0]) {
    insuranceDTO.value.insr_retr_dt = newValue[0];
  }

  // 과거일자로는 변경 불가, 원복시킨다.
  if (TODAY > newValue[0] && renewalYN === 'N') {
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
 * 보험계약[기본담보] - 변호사 할인할증 값 변경시 재계산
 * 법인일 경우 상세 정보가 변경될때 재계산해준다.
 */
watch(
  insuranceDTO.value.cbr_data,
  (newVal, oldVal) => {
    // 읽기전용일 경우 해당로직 제외

    if (isReadOnlyAll.value) return false;

    newVal.forEach((row, index) => {
      if ((newVal[index].insr_sale_rt != oldVal[index].insr_sale_rt)) {
        calInsrAmt(insuranceDTO.value);
      }
    });
    // // 10억을 초과 제한
    // if(insuranceDTO.value.insr_year_clm_lt_amt > 1000000000) {
    //   insuranceDTO.value.insr_year_clm_lt_amt = 1000000000;
    // }
  },
  { deep: true }
);

watch(
    () => insuranceDTO.value.spct_join_yn,
    (newValue, oldValue) => {
      // 읽기전용일 경우 해당로직 제외
      if (isReadOnlyAll.value) return false;
      //const nVal = insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1);
      if (newValue === 'N') {
        insuranceDTO.value.spct_data.insr_clm_lt_amt = ''
        insuranceDTO.value.spct_data.insr_psnl_brdn_amt = ''
        insuranceDTO.value.spct_data.cbr_cnt = 0
        insuranceDTO.value.spct_data.insr_year_clm_lt_amt =''
        spct_cnt.value = 0
      } else {
        if (oldValue === 'N') {
          insuranceDTO.value.spct_data.insr_psnl_brdn_amt = '5000000|5백만원';
          insuranceDTO.value.spct_data.cbr_cnt = 1
          spct_cnt.value = 1
        }
        calInsrSpctAmt(insuranceDTO.value.spct_data);
      }
    }
);

/**
 * 합계보험료변경시 - 기본담보(통관), 기본담보(컨설팅), 특약 보험료 변경시 재계산
 */
watch(
    () => [
      insuranceDTO.value.insr_amt,
      insuranceDTO.value.spct_data.insr_amt
    ],
    (newValue, oldValue) => {
      // 읽기전용일 경우 해당로직 제외
      if (isReadOnlyAll.value) return false;

      // 특약 - 보상한도(연보험)
      if (insuranceDTO.value.spct_join_yn == 'Y') {
        insuranceDTO.value.spct_data.insr_year_clm_lt_amt = insuranceDTO.value.spct_data.insr_clm_lt_amt?.getValueBySplit(0) >1000000000 ? '10억원' :  insuranceDTO.value.spct_data.insr_clm_lt_amt?.getValueBySplit(1)
      }
      // 최종보험료
      insuranceDTO.value.insr_tot_amt =
          insuranceDTO.value?.insr_amt +
          insuranceDTO.value?.spct_data?.insr_amt;
    }
);

/**
 * 초기로딩시 가입 / 수정 / 조회 를 선택해서 보여준다.
 */
onMounted(async () => {
  renewalYN.value = route.query.renewal;
  insuranceUUID.value = route.params.insuranceUUID;
  renewalUpdateYN.value = route.query.renewalUpdate;
  /**
   * 코드 조회 
   * 
   *  LAW001 - 소속 중앙회
   */
  regionCdItems.value = await CommonCode.getCodeList('LAW001');
  corpTypeItems.value = await CommonCode.getCodeList('COM052');

  isReadOnlyAll.value = false;

  /**
   * 보험료표 조회
   * 
   */
  const params = { user_cd: _AUTH_USER.value.userCd , business_cd: _AUTH_USER.value.businessCd };
  const resultData = await apiLAW0030a.getDBSelInsuranceRate(params);
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
    const renewalData = await apiLAW0030a.getDBSel(params);
    let isIndtoInd = renewalData.data[0].user_cd === _AUTH_USER.value.userCd

    if (renewalData.data.length == 0) {
      messageBoxDTO.value.setWarning('조회오류', '보험갱신 데이타를 조회 할 수 없습니다.');
      onCancel();
    } else {

      if(isIndtoInd) {
        Object.assign(insuranceDTO.value, renewalData.data[0]);
        insuranceDTO.value.insr_take_amt = 0;
        insuranceDTO.value.insr_take_sec = '';
        if(insuranceDTO.value.spct_join_yn === 'N'){
          isSpctNew.value = true
          insuranceDTO.value.spct_data.insr_st_dt = TODAY
        }else {
          spct_cnt.value = insuranceDTO.value.spct_data.cbr_cnt;
        }
        insuranceDTO.value.spct_data.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
      }else {
        insuranceDTO.value.insr_year = renewalData.data[0].insr_year
        insuranceDTO.value.spct_data.insr_cncls_dt = renewalData.data[0].insr_cncls_dt;
      }
    }
    // 사용자 정보 재설정
    await getUserInfoToSetUserInfoByInsurance();

    insuranceDTO.value.status_cd = '10'     // 신청
    insuranceDTO.value.insurance_uuid = ''; // 초기값
    insuranceDTO.value.insurance_no = insuranceRateDTO.value.insurance_no;
    if(insuranceDTO.value.spct_join_yn == null)
      insuranceDTO.value.spct_join_yn = 'N';
    insuranceDTO.value.base_insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.base_insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.insr_reg_dt = dayjs().format('YYYY-MM-DD');
    if (insuranceDTO.value.insr_take_amt != null)
      insr_take_amt.value = insuranceDTO.value.insr_take_amt
    else
      insr_take_amt.value = 0;

    let year_clm_lt_amt = (insuranceDTO.value.insr_year_clm_lt_amt);
    if(Number(insuranceDTO.value.cbr_cnt) >= 3) {
      year_clm_lt_amt = (parseInt(year_clm_lt_amt) / 2) + '억원'
    }
    const clm = insuranceDTO.value.insr_clm_lt_amt + '/' + year_clm_lt_amt;
    if(INSR_RATE_TABLE.value.기본담보.구분.find(item => item.value == clm) != undefined) {
      clm_lt_amt.value = INSR_RATE_TABLE.value.기본담보.구분.find(item => item.value == clm).code + '|' + INSR_RATE_TABLE.value.기본담보.구분.find(item => item.value == clm).value
      if (insuranceDTO.value.corp_region_cd === '010' && Number(clm_lt_amt.value.getValueBySplit(0)) < 6) {
        relief_yn.value = true;
      }
    }

    insr_take_sec.value = insuranceDTO.value.insr_take_sec
    if(insuranceDTO.value.spct_data && insuranceDTO.value.spct_data != null)
      spct_cnt.value = insuranceDTO.value.spct_data.cbr_cnt

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
    insuranceDTO.value.insr_pcnt_sale_rt = 0; // 초기값
    insuranceDTO.value.insr_take_amt = 0;
    insuranceDTO.value.insr_take_sec = '';
    insr_take_sec.value = '';
    insr_take_amt.value = 0;
    isSpctNew.value = true;
    insuranceDTO.value.base_insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.base_insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.spct_join_yn = 'N';
    insuranceDTO.value.insurance_no = insuranceRateDTO.value.insurance_no;
    insuranceDTO.value.insr_year = insuranceRateDTO.value.base_year;
    insuranceDTO.value.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.spct_data.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    insuranceDTO.value.spct_data.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    insuranceDTO.value.insr_reg_dt = dayjs().format('YYYY-MM-DD');
    insuranceDTO.value.insr_psnl_brdn_amt = '3000000|3백만원'
    
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

    } else if (insuranceDTO.value.user_cd == 'JNT') {
      addCBR(insuranceDTO.value);
    }

  /**
   * 수정가입
   */
  } else {
    const params = { insurance_uuid: insuranceUUID.value };
    const resultData = await apiLAW0030a.getDBSel(params);
  // 초기화용 백업
    if (resultData.data.length == 0) {
      router.push('/404');
    } else {
      Object.assign(insuranceDTO.value, resultData.data[0]);
      insuranceDTO.value.base_insr_st_dt = insuranceRateDTO.value.insr_st_dt;
      insuranceDTO.value.base_insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
      isSpctNew.value = true;
      if (insuranceDTO.value.insr_take_amt != null)
        insr_take_amt.value = insuranceDTO.value.insr_take_amt.toString()
      else
        insr_take_amt.value = '0';
      let year_clm_lt_amt = (insuranceDTO.value.insr_year_clm_lt_amt);
      if(Number(insuranceDTO.value.cbr_cnt) >= 3) {
        year_clm_lt_amt = (parseInt(year_clm_lt_amt) / 2) + '억원'
      }
      const clm = insuranceDTO.value.insr_clm_lt_amt + '/' + year_clm_lt_amt;
      if(INSR_RATE_TABLE.value.기본담보.구분.find(item => item.value == clm) != undefined) {
        clm_lt_amt.value = INSR_RATE_TABLE.value.기본담보.구분.find(item => item.value == clm).code + '|' + INSR_RATE_TABLE.value.기본담보.구분.find(item => item.value == clm).value
        if (insuranceDTO.value.corp_region_cd === '010' && Number(clm_lt_amt.value.getValueBySplit(0)) < 6) {
          relief_yn.value = true;
        }
      }
      if(insuranceDTO.value.insr_psnl_brdn_amt.getValueBySplit(0) != '3000000'){
        psnl_yn.value = true
      }else {
        psnl_yn.value = false
      }
      if(insuranceDTO.value.spct_data && insuranceDTO.value.spct_data != null)
        spct_cnt.value = insuranceDTO.value.spct_data.cbr_cnt
      changeTakeAmount();
      getUserInfoToSetUserInfoByInsurance();

    }
  }
  // 재계산
  if(renewalUpdateYN.value || renewalUpdateYN.value === 'Y') {
    renewalYN.value = renewalUpdateYN.value;
  }
  calInsrAmt(insuranceDTO.value);
    insuranceDTOBackup.value = JSON.parse(JSON.stringify(insuranceDTO.value));
  // console.log(insuranceDTOBackup.value);
  // 초기화용 백업
 // Object.assign(insuranceDTOBackup.value, insuranceDTO.value);
  onLoading.value = true;
});

function changeTakeAmount() {
  if(!insr_take_amt.value) return;
  // 사용자 입력에서 숫자와 쉼표(,)를 제거
  let take_amt = insr_take_amt.value.replace(/[^0-9]/g, "");
  if (take_amt.startsWith('0') && take_amt.length > 1){
    take_amt =  take_amt.replace(/^0+/, '');
  }
  const num_insr_take_amt = Number(take_amt)

  if(num_insr_take_amt > 1000000000){
    messageBoxDTO.value.setWarning( '매출액 초과', '매출액 10억원 초과시 록톤코리아로 연락주시기 바랍니다.<br/>\n' +
        '(T.02-2011-0300)');
    insuranceDTO.value.insr_take_amt = 0;
    insuranceDTO.value.insr_take_sec = '';
    insr_take_sec.value = '';
    insr_take_amt.value = 0;
  }else {
    if(num_insr_take_amt == 0) {
      insr_take_sec.value = ''
    }
    else if (num_insr_take_amt <= 50000000){
      insr_take_sec.value = '1|5천만원이하'
    }else if (num_insr_take_amt <= 100000000){
      insr_take_sec.value = '2|1억원이하'
    }else if (num_insr_take_amt <= 200000000){
      insr_take_sec.value = '3|2억원이하'
    }else if (num_insr_take_amt <= 300000000){
      insr_take_sec.value = '4|3억원이하'
    }else if (num_insr_take_amt <= 500000000){
      insr_take_sec.value = '5|5억원이하'
    }else if (num_insr_take_amt <= 700000000){
      insr_take_sec.value = '6|7억원이하'
    }else if (num_insr_take_amt <= 1000000000){
      insr_take_sec.value = '7|10억원이하'
    }
    insuranceDTO.value.insr_take_amt = take_amt
    insuranceDTO.value.insr_take_sec = insr_take_sec.value


    // 천의 자리마다 쉼표(,) 추가
    take_amt = take_amt.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 사용자 입력 필드에 쉼표(,)가 추가된 값 설정
    insr_take_amt.value = take_amt;
  }

}

function preventClickEvent(event) {
  event.preventDefault();
}

/**
 * 변호사 명단 초기화
 *
 * @param values
 */
function resetCBRData() {
  messageBoxDTO.value.setConfirm('법무사 명단', '법무사 명단을 초기 조회상태로 초기화 하시겠습니까?', null, (result, params) => {
    if (result) {
      insuranceDTO.value.cbr_data = JSON.parse(JSON.stringify(insuranceDTOBackup.value.cbr_data));
      insuranceDTO.value.cbr_cnt = insuranceDTO.value.cbr_data.length;
      calInsrAmt(insuranceDTO.value);
    }
  });
}

function blurField() {
  const textFiled = document.querySelector('[name="insr_take_amt"]')
  const textFiled2 = document.querySelector('[name="insr_spct_cnt"]')
  if(textFiled){
    textFiled.blur();
  }
  if(textFiled2){
    textFiled2.blur();
  }

}

</script>
