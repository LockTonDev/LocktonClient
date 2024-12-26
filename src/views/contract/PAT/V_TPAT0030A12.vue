<template>
  <BaseBreadcrumb
    :title="page.title"
    :subtitle="page.subtitle"
    :breadcrumbs="breadcrumbs"
    :image="page.image"
  ></BaseBreadcrumb>

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
          <v-tab value="2" class="flex-grow-1">보험계약</v-tab>
          <v-tab value="3" class="flex-grow-1">약관동의</v-tab>
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
                  <div class="data-col">
                    {{ insuranceDTO.corp_cust_hpno }}
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
                  <div class="data-col col-tel">
                    {{ insuranceDTO.corp_telno }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사무소 팩스</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col col-fax">
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
                    ( {{ insuranceDTO.corp_post }} ) {{ insuranceDTO.corp_addr }}&nbsp;{{ insuranceDTO.corp_addr_dtl }}
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- 개인 끝-->

            <!-- 법인/합동 시작-->
            <v-col cols="12" :class="checkMobile.isMobile?'pt-2':'pt-6'" v-if="insuranceDTO.user_cd !== 'IND'">
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
                    {{ insuranceDTO.corp_ceo_nm }}
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
                    <p>법인번호</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    <p v-if="insuranceDTO.user_cd !== 'JNT'">
                      {{ insuranceDTO.corp_bnno }}
                    </p>
                    <p v-if="insuranceDTO.user_cd === 'JNT'">해당없음</p>
                    <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_bnno"  name="corp_bnno" label="ex) 123-383-58FH1HF" single-line density="comfortable" readonly/> -->
                  </div>
                </v-col>

                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사무소 전화</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col col-tel">
                    {{ insuranceDTO.corp_telno }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사무소 팩스</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col col-fax">
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
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_cust_hpno }}
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

                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>사무소 주소<sup class="text-error">*</sup></p>
                  </div>
                  <div class="data-col">
                    ( {{ insuranceDTO.corp_post }} ) {{ insuranceDTO.corp_addr }}&nbsp;{{ insuranceDTO.corp_addr_dtl }}
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
                  variant="flat"
                  color="dark"
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
                <v-col
                    cols="12"
                    class="v-col"
                    v-if="insuranceDTO.user_cd !== 'IND'"
                >
                  <div class="head-col">
                    <p>피보험자</p>
                  </div>
                  <div class="data-col" v-if="insuranceDTO.cbr_data.length>0 && insuranceDTO.user_cd === 'JNT'">
                    {{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{insuranceDTO.cbr_cnt-1}}명
                  </div>
                  <div class="data-col" v-if="insuranceDTO.user_cd === 'COR'">
                    {{ insuranceDTO.user_nm }}
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
                  <div class="data-col" v-if="insuranceDTO.user_cd === 'JNT'">개인별 적용</div>
                  <div class="data-col" v-else > {{ insuranceDTO.insr_retr_dt }} </div>
                </v-col>
                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>
                      무사고 할인 /<br />사고 할증
                    </p>
                  </div>
                  <div class="data-col text-center" v-if="insuranceDTO.user_cd === 'JNT'">개인별 적용</div>
                  <div class="data-col text-center" v-else>{{ insuranceDTO.insr_sale_rt }} %</div>
                </v-col>

                <v-col cols="12" sm="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'">
                  <div class="head-col">
                    <p >소속 변리사 수</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col w-100">

                    <p
                        class="text-caption font-weight-light  color-gray flex-grow-1"
                    >
                    <div class="data-col">
                      <p>{{ insuranceDTO.cbr_cnt }}명</p>
                    </div>
                    </p>
                  </div>
                </v-col>

                <v-col cols="12" sm="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'">
                  <div class="head-col">
                    <p >전년도 매출액</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col w-100">
                    <p
                        class="text-caption font-weight-light  color-gray flex-grow-1"
                    >
                    <div class="data-col">
                      {{insuranceDTO.insr_take_amt.toLocaleString()}}원
                    </div>
                    <i class="mdi mdi-alert-circle-outline mr-2"></i
                    >전년도 손익계산서상의 매출액 기재 (예시: 2024.1.1 가입시 2022년 손익계산서) <br/>
                    <i class="mdi mdi-alert-circle-outline mr-2"></i
                    >전년 매출이 없는 경우 1년 예상 매출액 기재
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'" style="height: 170px">
                  <div class="head-col">
                    <p>매출액구간</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col w-100 align-stretch" >
                    <v-btn-toggle
                        v-model="insuranceDTO.insr_take_sec"
                        divided
                        variant="outlined"
                        density="comfortable"
                        class="d-flex flex-wrap overflow-visible "
                        disabled="true"
                    >
                      <v-btn
                          color="primary"
                          class="flex-grow-1"
                          style="flex-basis: 30%; border: 1px solid #EEEEEE"
                          v-for="(item, index) in INSR_RATE_TABLE.기본담보.매출액구간" :key="index" :value="item.code+'|'+item.value">
                        {{ item.value }}
                      </v-btn>
                    </v-btn-toggle>
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col" style="height: 150px">
                  <div class="head-col">
                    <p>보상한도</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col w-100 d-block">
                    <v-btn-toggle
                        v-model="clm_lt_amt"
                        name="insr_clm_lt_amt"
                        divided
                        :disabled="isReadOnlyAll"
                        class="d-flex flex-wrap overflow-visible"
                        variant="outlined"

                    >
                      <v-btn
                          color="primary"
                          class="flex-grow-0"
                          style="flex-basis: 33.3%; border: 1px solid #EEEEEE"
                          v-for="(item, index) in INSR_RATE_TABLE.기본담보.보상한도" :key="index" :value="item.value">
                        {{ item.value }}
                      </v-btn>
                    </v-btn-toggle>
                    <p :class="insuranceDTO.user_cd==='COR' ? 'text-caption font-weight-light color-gray mt-15' : 'text-caption font-weight-light color-gray mt-2' " >
                      <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                      청구당 / 연간총보상한도
                    </p>
                    <v-divider class="border-0" />
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
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
                        class="d-flex flex-wrap overflow-visible w-100"
                        :disabled="isReadOnlyAll"
                        v-if="insuranceDTO.user_cd!=='COR'"
                    >
                      <v-btn
                          color="primary"
                          class="flex-grow-0"
                          style="flex-basis: 33.3%;border: 1px solid #EEEEEE"
                          v-for="(item, index) in INSR_RATE_TABLE.기본담보.자기부담금" :key="index" :value="item.code+'|'+item.value"
                          :disabled="isReadOnlyAll">
                        {{ item.value }}
                      </v-btn>
                    </v-btn-toggle>
                    <v-btn-toggle
                        v-model="insuranceDTO.insr_psnl_brdn_amt"
                        name="insr_psnl_brdn_amt"
                        divided
                        variant="outlined"
                        class="d-flex flex-wrap overflow-visible w-100"
                        :disabled="isReadOnlyAll"
                        v-if="insuranceDTO.user_cd==='COR'"
                    >
                      <v-btn
                          color="primary"
                          class="flex-grow-0"
                          style="flex-basis: 33.3%; border: 1px solid #EEEEEE"
                          v-for="(item, index) in INSR_RATE_TABLE.기본담보.자기부담금" :key="index" :value="item.code+'|'+item.value"
                          :disabled="isReadOnlyAll">
                        {{ item.value }}
                      </v-btn>
                    </v-btn-toggle>
                    <p :class="insuranceDTO.user_cd==='COR' ? 'text-caption font-weight-light color-gray mt-15' : 'text-caption font-weight-light color-gray mt-2' " >
                      <i class="mdi mdi-alert-circle-outline mr-2"></i>1
                      청구당
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>기일관리<sup class="text-error">*</sup> <br/> 프로그램</p>

                  </div>
                  <div class="data-col">
                    <v-btn-toggle
                        v-model="insuranceDTO.insr_program_yn"
                        divided
                        variant="outlined"
                        class="w-100"
                        density="comfortable"
                        :disabled="isReadOnlyAll"
                    >
                      <v-btn color="primary" style="flex-basis: 33.3%; border: 1px solid #EEEEEE"  class="flex-grow-0" value="N"
                      >사용안함</v-btn
                      >
                      <v-btn color="primary" style="flex-basis: 33.3%; border: 1px solid #EEEEEE"  class="flex-grow-0" value="Y"
                      >사용함</v-btn
                      >
                    </v-btn-toggle>
                    <p class="color-gray"><i class="mdi mdi-alert-circle-outline mr-2"></i>기일관리프로그램 사용 시 보험료 10% 할인적용<br>
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>단, 자체제작프로그램의 경우 할인 제외
                    </p>
<!--                    <p><i class="mdi mdi-alert-circle-outline mr-2"></i>단, 자체제작프로그램의 경우 할인 제외</p>-->
                  </div>

                </v-col>
                <template v-if="insuranceDTO.insr_program_yn == 'Y'">
                  <v-col
                      cols="12"
                      sm="6"
                      class="v-col"
                  >
                    <div class="head-col">
                      <p>프로그램 명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <v-text-field
                          name="insr_program"
                          v-model="insuranceDTO.insr_program"
                          variant="outlined"
                          hide-details="auto"/>
                    </div>

                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      서비스 제공회사
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <v-text-field
                          name="insr_service"
                          v-model="insuranceDTO.insr_service"
                          variant="outlined"
                          hide-details="auto"/>
                    </div>
                  </v-col>
                </template>
                <v-col cols="12" sm="12" class="v-col" v-if="insuranceDTO.user_cd=='COR'">
                  <div class="head-col">
                    <p>손익계산서</p>

                  </div>
                  <div class="data-col w-100">
                    <div v-if="insuranceDTO.insr_income_filename" class="selected-file-name">{{ insuranceDTO.insr_income_filename }}</div>
                  </div>

                </v-col>
              </v-row>
            </v-col>
            <!-- 변리사 명단 시작 -->
            <v-col cols="12" sm="12" :class="checkMobile.isMobile?'py-0 px-4 mb-4':'py-0 px-14 mb-10'" v-if="insuranceDTO.user_cd === 'JNT'">
              <div class="d-flex align-center mb-4 mt-6">
                <svg width="8" height="12" fill="none" stroke-width="3" class="mr-2">
                  <line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line>
                  <line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line>
                </svg>
                <p class="text-body-1 font-weight-bold">변리사 명단</p>
                <p class="text-body-2 color-gray-shadow ml-4">
                  총
                  <span class="color-primary">{{ insuranceDTO.cbr_data.length }}</span>명
                </p>
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
                        :disabled="isReadOnlyAll"
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
                        :disabled="isReadOnlyAll"
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
                        :disabled="isReadOnlyAll"
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
                  이 보험상품은 대한변리사회를 단체계약자, 가입 회원을
                  피보험자로 하는 단체계약 프로그램입니다.
                </li>
                <li>
                  보험회사 : 흥국화재해상보험㈜ <template v-if="checkMobile.isMobile"><br/></template><template v-else><span class="text-caption mx-3">|</span></template>보험중개사 : 록톤컴퍼니즈코리아손해보험중개(주)
                </li>
                <li>
                  보험료 입금 계좌번호 :
                  <b class="font-weight-medium text-error text-18"
                  >신한은행 140-005-862100</b
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
                  <span class="d-inline-block w-sm-min-110 px-4 py-1" v-if="insuranceDTO.user_cd!=='JNT'">
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
                  to="/contract/PAT/V_TPAT0030A10"
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
          <v-col cols="12" v-if="insuranceDTO.user_cd=='COR'">
            <p class="text-body-2 color-gray-shadow">매출액구간</p>
            <p class="text-body-2 text-right">
              {{ insuranceDTO.insr_take_sec.getValueBySplit(1) }}
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
          <v-col cols="12" >
            <p class="text-body-2 color-gray-shadow">할인 및 할증율</p>
            <p class="text-body-2 text-right">
              {{ insuranceDTO.insr_sale_rt }}% 적용
            </p>
          </v-col>

          <v-col cols="12">
            <p class="text-body-2 color-gray-shadow">기일관리프로그램할인</p>
            <p class="text-body-2 text-right" v-if="insuranceDTO.insr_program_yn=='Y'">
              10% 적용
            </p>
            <p class="text-body-2 text-right" v-else>
              0% 적용
            </p>
          </v-col>
          <!-- 개인만 보여주는 영역 끝 -->

          <!-- 법인만 보여주는 영역 시작 -->
          <v-col cols="12" v-if="insuranceDTO.user_cd === 'JNT'">
            <p class="text-body-2 color-gray-shadow">변리사 인원수</p>
            <p class="text-body-2 text-right">
              {{ insuranceDTO.cbr_cnt }} 명
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
        <V_TPAT0030P10 />
      </v-card-text>
    </v-card>
  </v-dialog>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

  <!-- 가입신청서 시작 -->
  <V_TPAT0030P20 :insurance_dto="insuranceDTO" :isPdf=isPdf :isNotAuth=true v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
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
import { UserDTO, InsuranceDTO, CBRDataDTO, CommonCode } from '@/model';
import { InsuranceYup } from '@/schema';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import router from '@/router';
import dayjs from 'dayjs'

import { MessageBoxDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';

import apiUser from '@/api/api/user.api';
import apiPAT0030a from '@/api/api/A_TPAT0030A';

import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import V_TPAT0030P10 from './V_TPAT0030P10.vue';
import V_TPAT0030P20 from "@/views/contract/PAT/V_TPAT0030P20.vue";

import TermsOfPolicy from './V_TPAT0030P01.vue';       // PDF 다운로드로 대체 예정
import TermsOfInsurance from './V_TPAT0030P02.vue';   // 상품설명확인서 확인
import TermsOfContract from './V_TPAT0030P03.vue';    // 계약 체결·이행 등을 위한 개인(신용)정보 처리동의

import {useMobileStore} from "@/stores";
const checkMobile = useMobileStore();

const statusCdItems = ref([""]);

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

const clm_lt_amt = ref('');

// 오늘일자
let today = dayjs().format('YYYY-MM-DD');

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
  const onInsuranceFormOpen = (isPdfOption:boolean) => {
    isPdf.value = isPdfOption;
    isInsuranceFormDialog.value = true;

  }

function onInsuranceFormClose() {
  isInsuranceFormDialog.value = false;
}


function onNextPage(values: any) {
  tab.value = (parseInt(tab.value) + 1).toString();
}

async function onPrevPage(values: any) {
  let tabiValue = parseInt(tab.value);
  tabiValue -= 1
  tab.value = tabiValue.toString();
}


const actionType = ref('');
const insuranceUUID = ref('');
const insuranceNO = ref('');
/**
 * 초기로딩시 가입 / 수정 / 조회 를 선택해서 보여준다.
 */
 onMounted(async () => {
  isReadOnlyAll.value = true;
  statusCdItems.value = await CommonCode.getCodeList('COM030');
  
  insuranceUUID.value = route.params.insuranceUUID;

   const params = { user_cd: _AUTH_USER.value.userCd , business_cd: _AUTH_USER.value.businessCd };
   const resultData = await apiPAT0030a.getDBSelInsuranceRate(params);
   INSR_RATE_TABLE.value = resultData.data[0].contents;

  if (insuranceUUID.value == '') {
    router.push('/404');
  } else {
    const params = { insurance_uuid: insuranceUUID.value };
    const resultData = await apiPAT0030a.getDBSel(params);
    Object.assign(insuranceDTO.value, resultData.data[0]);
    insuranceDTO.value.base_insr_st_dt = resultData.data[0].insr_st_dt
    insuranceDTO.value.base_insr_cncls_dt = resultData.data[0].insr_cncls_dt

    clm_lt_amt.value = insuranceDTO.value.insr_clm_lt_amt + '/' + insuranceDTO.value.insr_year_clm_lt_amt

    onLoading.value = true;
  }
});
</script>
