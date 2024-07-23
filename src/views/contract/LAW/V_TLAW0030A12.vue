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
          >
            <v-tab value="1" class="flex-grow-1" disabled="true">가입정보</v-tab>
            <v-tab value="2" class="flex-grow-1" disabled="true">보험계약 [기본담보]</v-tab>
            <v-tab value="3" class="flex-grow-1" disabled="true">보험계약 [특약]</v-tab>
            <v-tab value="4" class="flex-grow-1" disabled="true">약관동의</v-tab>
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
                    {{ insuranceDTO.corp_nm }}
                  </div>
                </v-col>

                <v-col cols="12" sm="6" class="v-col">
                  <div class="head-col">
                    <p>사업자번호</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_cnno  }}
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
                    <p>소속 지방회</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ insuranceDTO.corp_region_nm }}
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
                    {{ insuranceDTO.corp_ceo_nm }}
                  </div>
                </v-col>

                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>사무소 형태</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    {{ corpType }}
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
                    {{ insuranceDTO.corp_region_nm }}
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
                    {{ insuranceDTO.insr_st_dt }}
                    <p class="mx-2">00:01 부터</p>
                    {{ insuranceDTO.insr_cncls_dt }}
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
                    <div class="d-flex align-center">
                      {{insuranceDTO.insr_take_amt.toLocaleString()}}원
                    </div>
                    <p class="text-caption font-weight-light color-gray flex-grow-1">
                      <span class="text-error">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>
                        매출액은 연초에 업무보고한 직전년도 매출액을 반드시 기재요망 (전년도 1.1 ~ 12월말까지 매출)<br/>
                        <p class="ml-4"> * 대한법무사협회 전산신고한 업무보고서 매출 확인 </p>
                      </span>
                      <span v-if="insuranceDTO.user_cd=='JNT'">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>법무사법인, 합동사무소의 연간총매출액을 법무사 수로 나눠 1인당 평균 매출액 기재<br/>
                      </span>
                      <i class="mdi mdi-alert-circle-outline mr-2"></i>전년 매출이 없는 경우 1년 예상 매출액 기재
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
                        v-model="insuranceDTO.insr_take_sec"
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
                          value="5천만원/1억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                      ><p><span style="font-size: 80%; ">case 1)</span> <br/> 5천만원/1억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="1억원/1억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                      ><p><span style="font-size: 80%; ">case 2)</span> <br/> 1억원/1억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="1억원/2억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                      ><p><span style="font-size: 80%; ">case 3)</span> <br/> 1억원/2억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="1억원/3억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                      ><p><span style="font-size: 80%; ">case 4)</span> <br/> 1억원/3억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="1억원/5억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&!relief_yn"
                      ><p><span style="font-size: 80%; ">case 5)</span> <br/> 1억원/5억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="2억원/2억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&relief_yn"
                      ><p><span style="font-size: 80%; ">case 6)</span> <br/> 2억원/2억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="2억원/4억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&relief_yn"
                      ><p><span style="font-size: 80%; ">case 7)</span> <br/> 2억원/4억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="3억원/3억원"
                          :disabled="insuranceDTO.corp_region_cd=='010'&&relief_yn"
                      ><p><span style="font-size: 80%; ">case 8)</span> <br/> 3억원/3억원</p></v-btn
                      >
                      <v-btn
                          color="primary"
                          class="flex-grow-0 custom-toggle-btn"
                          value="3억원/5억원"
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
                          <p class="d-flex align-center mt-minus-5" :style="checkMobile.isMobile?'line-height: 0.7rem !important':''"><i class="mdi mdi-alert-circle-outline mr-2"></i>보상한도 Case1~5 선택시 지원금 미적용: 미적용 선택 <v-checkbox-btn v-model="relief_yn" :disabled="isReadOnlyAll"></v-checkbox-btn></p>
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
                          <v-checkbox-btn :disabled="isReadOnlyAll" v-model="psnl_yn"></v-checkbox-btn>
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
                        :disabled="isReadOnlyAll"
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
                        :disabled="isReadOnlyAll"
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
                    <p style="margin-left: 4px">{{ insuranceDTO.spct_data.cbr_cnt }} 명</p>
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
              <v-table class="v-board-table mt-10 remove-padding">
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
import apiLAW0030a from '@/api/api/A_TLAW0030A';

import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import BaseCard from '@/components/BaseCard.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import V_TLAW0030P10 from './V_TLAW0030P10.vue';
import V_TLAW0030P20 from "@/views/contract/LAW/V_TLAW0030P20.vue";

import TermsOfPolicy from './V_TLAW0030P01.vue';       // PDF 다운로드로 대체 예정
import TermsOfInsurance from './V_TLAW0030P02.vue';   // 상품설명확인서 확인
import TermsOfContract from './V_TLAW0030P03.vue';    // 계약 체결·이행 등을 위한 개인(신용)정보 처리동의

import {useMobileStore} from "@/stores";
const checkMobile = useMobileStore();

const statusCdItems = ref([""]);
const corpTypeItems = ref([]);
const corpType = ref('');

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
const psnl_yn = ref(false);
const relief_yn = ref(false);
const insr_take_amt = ref(0);

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
function onPrevPage(values: any) {
  tab.value = (parseInt(tab.value) - 1).toString();
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
  corpTypeItems.value = await CommonCode.getCodeList('COM052');

  insuranceUUID.value = route.params.insuranceUUID;

  if (insuranceUUID.value == '') {
    router.push('/404');
  } else {
    const params = { insurance_uuid: insuranceUUID.value };
    const resultData = await apiLAW0030a.getDBSel(params);
    Object.assign(insuranceDTO.value, resultData.data[0]);
    clm_lt_amt.value = insuranceDTO.value.insr_clm_lt_amt + '/' + insuranceDTO.value.insr_year_clm_lt_amt;
    if(insuranceDTO.value.insr_psnl_brdn_amt.getValueBySplit(0) != '3000000'){
      psnl_yn.value = true;
    }
    if(!insuranceDTO.value.insr_relief || insuranceDTO.value.insr_relief == 0){
      relief_yn.value = true;
    }
    for(const item in corpTypeItems.value){
      if(corpTypeItems.value[item].value === insuranceDTO.value.corp_type){
        corpType.value = corpTypeItems.value[item].title
      }
    }
    if(insuranceDTO.value.insr_take_amt) {
      insr_take_amt.value = insuranceDTO.value.insr_take_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let year_clm_lt_amt = (insuranceDTO.value.insr_year_clm_lt_amt);
    if(Number(insuranceDTO.value.cbr_cnt) >= 3) {
      year_clm_lt_amt = (parseInt(year_clm_lt_amt) / 2) + '억원'
    }
    clm_lt_amt.value = insuranceDTO.value.insr_clm_lt_amt + '/' + year_clm_lt_amt;
    onLoading.value = true;
  }
});
</script>
