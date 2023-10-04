<template>
  <v-dialog
    persistent
    v-model="isOpenDialog"
    width="800px"
    hide-overlay
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-medium">
          <v-icon size="30">mdi-information</v-icon>&nbsp;신청내용 확인
        </div>

        <div class="d-flex justify-space-between align-end">
          <!-- <v-btn variant="flat" color="dark" @click="insuranceDTO.user_cd = 'IND';onExportPDF('view');">개인</v-btn>&nbsp;
                    <v-btn variant="flat" color="dark" @click="insuranceDTO.user_cd = 'COR';onExportPDF('view');">법인</v-btn>&nbsp; -->
          <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>
        </div>
      </v-card-title>
      <v-divider class="mb-0" />
      <v-card-text class="px-10 pt-8 pb-14">
        <!-- PDF 출력 영역 시작-->
        <div>
          <div id="printDiv">
            <!-- 개인 가입정보 시작-->
            <div
              class="insuranceForm-wrap"
              v-if="insuranceDTO.user_cd == 'IND'"
            >
              <div class="print-wrap page1">
                <!--header-->
                <h1 class="text-center">
                  <p class="text-20 font-weight-bold color-primary">
                    전문직업배상책임보험
                  </p>
                  <p class="text-20 font-weight-bold">보험가입신청서</p>
                </h1>
                <p class="mt-4 text-12 line-height-1-4 word-break-keep-all">
                  본 보험은 한국관세사회 및 메리츠화재㈜ 그리고
                  록톤컴퍼니즈코리아손해보험중개㈜ 간에 체결된 보험업무협약에
                  따라<br />피보험자가 관세사로서 수행한 업무상 과실에 따른
                  법률상 손해배상책임을 보상합니다.
                </p>
                <!--//header-->

                <!-- 가입자 정보 시작 -->
                <div class="mt-4">
                  <p class="font-weight-bold text-14 mb-2">가입정보</p>
                  <v-row class="table">
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>성명(등록번호)</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.user_nm }} ({{
                          insuranceDTO.user_regno
                        }})
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>생년월일</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.user_birth }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사무소명</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_nm }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사업자번호</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cnno }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사무소 전화</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_telno }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사무소 팩스</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_faxno }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>담당자 성명</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cust_nm }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>휴대전화</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cust_hpno }}
                      </div>
                    </v-col>
                    <v-col cols="12" class="v-col">
                      <div class="head-col">
                        <p>이메일</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cust_email }}
                      </div>
                    </v-col>
                    <v-col cols="12" class="v-col">
                      <div class="head-col">
                        <p>사무소 주소</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_post }}
                        {{ insuranceDTO.corp_addr }}
                        {{ insuranceDTO.corp_addr_dtl }}
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <!-- 가입자 정보 종료 -->

                <!-- 보험 요약 시작 -->
                <div class="mt-4">
                  <p class="font-weight-bold text-14">보험 계약 상세</p>

                  <!--기본담보 시작-->
                  <div class="mt-1">
                    <p class="text-12 font-weight-bold mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;기본담보
                    </p>
                    <!--[퍼블] 테이블 레이아웃 (1) : removeClass .d-none-->
                    <v-row class="table">
                      <v-col cols="6">
                        <div class="head-col">보험기간</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_st_dt }}(00:01) ~
                          {{ insuranceDTO.insr_cncls_dt }}(00:01)
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">소급담보일</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_retr_dt }}
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1)
                          }}
                          / {{ insuranceDTO?.insr_year_clm_lt_amt
                          }}<span class="text-10 color-gray ml-2"
                            >(1청구당/연간총)</span
                          >
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1)
                          }}
                          <span class="text-10 color-gray ml-2">(1청구당)</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">공동보험</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(1)
                          }}
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">기준보험료</div>
                        <div class="data-col">
                          {{
                            Number(insuranceDTO.insr_base_amt).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">할인 및 할증률</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_sale_rt }}% 적용
                        </div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold">
                          {{
                            Number(insuranceDTO.insr_amt).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                    </v-row>
                    <!--[퍼블] 테이블 레이아웃 (2) : removeClass .d-none-->
                    <v-row class="table d-none">
                      <v-col cols="8">
                        <div class="head-col">보험기간</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_st_dt }}(00:01) ~
                          {{ insuranceDTO.insr_cncls_dt }}(00:01)
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="head-col">소급담보일</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="4">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1)
                          }}
                          / {{ insuranceDTO?.insr_year_clm_lt_amt
                          }}<span class="text-10 color-gray"
                            >(1청구당/연간총)</span
                          >
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1)
                          }}
                          <span class="text-10 color-gray">(1청구당)</span>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="head-col">공동보험</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(1)
                          }}
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="head-col">기준보험료</div>
                        <div class="data-col">
                          {{
                            Number(insuranceDTO.insr_base_amt).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="head-col">할인 및 할증률</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_sale_rt }}% 적용
                        </div>
                      </v-col>
                      <v-col cols="4" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold">
                          {{
                            Number(insuranceDTO.insr_amt).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!--기본담보 종료-->

                  <!--특약 시작-->
                  <div class="mt-2">
                    <p class="text-12 font-weight-bold mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;특별약관
                    </p>
                    <v-row
                      class="table"
                      v-if="insuranceDTO.spct_join_yn == 'Y'"
                    >
                      <v-col cols="12">
                        <div class="head-col">특약명</div>
                        <div class="data-col">
                          사무원의 횡령 등 부정직행위 담보 특별약관(Dishonesty
                          Extension)
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.spct_data?.insr_clm_lt_amt?.getValueBySplit(
                              1
                            )
                          }}
                          / {{ insuranceDTO?.spct_data?.insr_year_clm_lt_amt
                          }}<span class="text-10 color-gray ml-2"
                            >(1청구당/연간총)</span
                          >
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(
                              1
                            )
                          }}
                          <span class="text-10 color-gray ml-2">(1청구당)</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">사무원 인원수</div>
                        <div class="data-col">
                          {{ insuranceDTO?.spct_data?.cbr_data.length }} 명
                        </div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold">
                          {{
                            Number(
                              insuranceDTO.spct_data.insr_amt
                            ).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                    </v-row>
                    <v-row
                      class="table"
                      v-if="insuranceDTO.spct_join_yn == 'N'"
                    >
                      <v-col cols="12">
                        <div class="head-col">특약명</div>
                        <div class="data-col">
                          사무원의 횡령 등 부정직행위 담보 특별약관(Dishonesty
                          Extension)
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">사무원 인원수</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold"></div>
                      </v-col>
                    </v-row>
                    <!--가입자 명단-->
                    <p class="text-12 font-weight-bold mt-2 mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;특별약관
                      가입자 명단
                    </p>
                    <v-row class="table vertical">
                      <v-col cols="6">
                        <div class="head-col w-10">No.</div>
                        <div class="head-col w-30">성명</div>
                        <div class="head-col w-30">생년월일</div>
                        <div class="head-col w-30">소급담보일</div>
                        <!-- <div class="head-col">1인당 보험료</div> -->
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col w-10">No.</div>
                        <div class="head-col w-30">성명</div>
                        <div class="head-col w-30">생년월일</div>
                        <div class="head-col w-30">소급담보일</div>
                        <!-- <div class="head-col">1인당 보험료</div> -->
                      </v-col>
                      <v-col
                        cols="6"
                        v-for="(row, index) in insuranceDTO.spct_data.cbr_data"
                      >
                        <div class="data-col w-10">{{ index + 1 }}</div>
                        <div class="data-col w-30">{{ row.cbr_nm }}</div>
                        <div class="data-col w-30">{{ row.cbr_brdt }}</div>
                        <div class="data-col w-30">{{ row.insr_retr_dt }}</div>
                        <!-- <div class="data-col">{{row.insr_amt.toLocaleString()}}원</div> -->
                      </v-col>
                      <v-col
                        v-if="insuranceDTO.spct_data.cbr_data.length === 0"
                        cols="12"
                        class="justify-center"
                        ><div class="py-2 text-center">내용 없음</div></v-col
                      >
                    </v-row>
                  </div>
                  <!--특약 종료-->
                </div>
                <!-- 보험 요약 종료 -->

                <!--최종 보험료 시작-->
                <div class="mt-4">
                  <p class="font-weight-bold text-14 mb-2">
                    총 납입보험료 정보
                  </p>
                  <div class="table pa-4 text-center">
                    <span class="text-12 mx-4">기본 보험료</span>
                    <span class="text-14 mx-4 font-weight-medium"
                      >{{
                        Number(
                          insuranceDTO?.insr_amt +
                            insuranceDTO?.cons_data?.insr_amt
                        ).toLocaleString()
                      }}원</span
                    >
                    <span>+</span>
                    <span class="text-12 mx-4">특약 보험료</span>
                    <span class="text-14 mx-4 font-weight-medium"
                      >{{
                        Number(
                          insuranceDTO?.spct_data?.insr_amt
                        ).toLocaleString()
                      }}원</span
                    >
                    <span>=</span>
                    <span class="text-12 mx-4">최종 보험료</span>
                    <span class="text-14 mx-4 font-weight-medium color-primary"
                      >{{
                        Number(insuranceDTO?.insr_tot_amt).toLocaleString()
                      }}
                      원</span
                    >
                  </div>
                  <ul
                    class="list-style-size-small list-style-type-disc text-11 pl-4 mt-2"
                  >
                    <li>
                      보험료 입금 계좌번호 :
                      <b class="font-weight-medium color-error"
                        >신한은행 140-005-862117</b
                      ><span class="text-10 mx-3">|</span>예금주 :
                      <b class="font-weight-medium color-error"
                        >록톤컴퍼니즈코리아</b
                      ><br />
                      <span class="color-error"
                        >관세사 성명 및 등록번호를 함께 기재하여 납부하여 주시기
                        바랍니다.</span
                      >
                    </li>
                  </ul>
                </div>
                <!--최종 보험료 종료-->

                <!--footer-->
                <v-divider class="border-0 mt-8" />
                <v-row justify="space-between" align="center">
                  <v-col class="text-12">
                    <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                    ><span class="mx-4 text-10">|</span
                    ><span>대표전화 : 02.2011.0300</span>
                  </v-col>
                  <v-col class="flex-grow-0">
                    <div style="width: 70px">
                      <img src="../assets/logo.svg" class="w-100" />
                    </div>
                  </v-col>
                </v-row>
                <!--//footer-->
              </div>
            </div>

            <!-- 법인/합동 가입정보 시작-->
            <div
              class="insuranceForm-wrap"
              v-if="insuranceDTO.user_cd != 'IND'"
            >
              <div class="print-wrap page1">
                <!--header-->
                <h1 class="text-center">
                  <p class="text-20 font-weight-bold color-primary">
                    전문직업배상책임보험
                  </p>
                  <p class="text-20 font-weight-bold">보험가입신청서</p>
                </h1>
                <p class="mt-4 text-12 line-height-1-4 word-break-keep-all">
                  본 보험은 한국관세사회 및 메리츠화재㈜ 그리고
                  록톤컴퍼니즈코리아손해보험중개㈜ 간에 체결된 보험업무협약에
                  따라<br />피보험자가 관세사로서 수행한 업무상 과실에 따른
                  법률상 손해배상책임을 보상합니다.
                </p>
                <!--//header-->

                <!-- 가입자 정보 시작 -->
                <div class="mt-4">
                  <p class="font-weight-bold text-14 mb-2">가입정보</p>
                  <v-row class="table">
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사업 유형</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_type }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사무소명</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_nm }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>대표자 성명</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_nm }}
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>법인번호</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_bnno }}
                        <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_bnno"  name="corp_bnno" label="ex) 123-383-58FH1HF" single-line density="comfortable" readonly/> -->
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사업자번호</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cnno }}
                        <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cnno"  name="corp_cnno" label="사업자번호" single-line density="comfortable" readonly/> -->
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사무소 전화</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_telno }}
                        <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_telno"  name="corp_telno" label="사무소 팩스" single-line density="comfortable"/> -->
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>사무소 팩스</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_faxno }}
                        <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_faxno" name="corp_taxno" label="사무소 팩스" single-line density="comfortable"/> -->
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>담당자 성명</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cust_nm }}
                        <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_nm" name="corp_cust_nm" label="담당자 성명" single-line density="comfortable"/> -->
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>휴대전화</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cust_hpno }}
                        <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_hpno" name="corp_cust_hpno" label="휴대전화" single-line density="comfortable"/> -->
                      </div>
                    </v-col>
                    <v-col cols="6" class="v-col">
                      <div class="head-col">
                        <p>이메일</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_cust_email }}
                        <!-- <VTextFieldWithValidation v-mod-el="insuranceDTO.corp_cust_email" name="corp_cust_email" label="이메일" single-line density="comfortable"/> -->
                        <!-- <v-select :items="selectbox1" variant="outlined" hide-details="auto" label="도메인 선택" single-line density="comfortable" class="ml-2"></v-select> -->
                      </div>
                    </v-col>
                    <v-col cols="12" class="v-col">
                      <div class="head-col">
                        <p>사무소 주소</p>
                      </div>
                      <div class="data-col">
                        {{ insuranceDTO.corp_addr }}&nbsp;{{
                          insuranceDTO.corp_addr_dtl
                        }}
                        <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_post" name="corp_post" label="우편번호" single-line density="comfortable"/>
                                                    <v-btn variant="outlined"  color="primary" @click="isDaumPostDialog=true" class="ml-2">사무소 주소검색</v-btn>
                                                    <v-divider class="border-0"/>
                                                    <VTextFieldWithValidation v-model="insuranceDTO.corp_addr" name="corp_addr" label="주소" readonly single-line density="comfortable" class="w-full"/>
                                                    <VTextFieldWithValidation v-model="insuranceDTO.corp_addr_dtl" name="corp_addr_dtl" label="상세주소" single-line density="comfortable" class="w-full"/> -->
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <!-- 가입자 정보 종료 -->

                <!-- 보험 요약 시작 -->
                <div class="mt-4">
                  <p class="font-weight-bold text-14">보험 계약 상세</p>

                  <!--기본담보 시작-->
                  <div class="mt-1">
                    <p class="text-12 font-weight-bold mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;기본담보
                    </p>
                    <v-row class="table">
                      <v-col cols="12">
                        <div class="head-col">보험기간</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_st_dt }}(00:01) ~
                          {{ insuranceDTO.insr_cncls_dt }}(00:01)
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">소급담보일</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_retr_dt }}
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">무사고 할인</div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_sale_rt }} %
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1)
                          }}
                          / {{ insuranceDTO?.insr_year_clm_lt_amt }}
                          <span class="text-10 color-gray ml-2"
                            >(1청구당/연간총)</span
                          >
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1)
                          }}
                          <span class="text-10 color-gray ml-2">(1청구당)</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">공동보험</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.insr_pblc_brdn_rt?.getValueBySplit(1)
                          }}
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">기준보험료</div>
                        <div class="data-col">
                          {{
                            Number(insuranceDTO.insr_base_amt).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">관세사 수</div>
                        <div class="data-col">
                          {{ insuranceDTO.cbr_data.length }} 명
                        </div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold">
                          {{
                            Number(insuranceDTO.insr_amt).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!--기본담보 종료-->

                  <!--컨설팅 시작-->
                  <div class="mt-2">
                    <p class="text-12 font-weight-bold mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;컨설팅
                      추가
                    </p>
                    <v-row
                      class="table"
                      v-if="insuranceDTO.cons_join_yn == 'Y'"
                    >
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.cons_data?.insr_clm_lt_amt?.getValueBySplit(
                              1
                            )
                          }}
                          / {{ insuranceDTO?.cons_data?.insr_year_clm_lt_amt }}
                          <span class="text-10 color-gray ml-2"
                            >(1청구당/연간총)</span
                          >
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.cons_data?.insr_psnl_brdn_amt?.getValueBySplit(
                              1
                            )
                          }}
                          <span class="text-10 color-gray ml-2">(1청구당)</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">소급담보일</div>
                        <div class="data-col">
                          {{ insuranceDTO?.cons_data?.insr_retr_dt }}
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">무사고 할인</div>
                        <div class="data-col">
                          {{ insuranceDTO?.cons_data?.insr_sale_rt }} %
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">공동보험</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.cons_data?.insr_pblc_brdn_rt?.getValueBySplit(
                              1
                            )
                          }}
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">기준보험료</div>
                        <div class="data-col">
                          {{
                            insuranceDTO.cons_data.insr_base_amt.toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">관세사 인원수</div>
                        <div class="data-col">
                          {{ insuranceDTO.cons_data.cbr_data.length }} 명
                        </div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold">
                          {{
                            Number(
                              insuranceDTO.cons_data.insr_amt
                            ).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                    </v-row>
                    <v-row
                      class="table"
                      v-if="insuranceDTO.cons_join_yn == 'N'"
                    >
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">소급담보일</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">무사고 할인</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">공동보험</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">기준보험료</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">관세사 인원수</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold"></div>
                      </v-col>
                    </v-row>
                  </div>
                  <!--컨설팅 종료-->

                  <!--특약 시작-->
                  <div class="mt-2" v-if="insuranceDTO?.spct_join_yn == 'Y'">
                    <p class="text-12 font-weight-bold mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;특별약관
                    </p>
                    <v-row class="table">
                      <v-col cols="12">
                        <div class="head-col">특약명</div>
                        <div class="data-col">
                          사무원의 횡령 등 부정직행위 담보 특별약관(Dishonesty
                          Extension)
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.spct_data?.insr_clm_lt_amt?.getValueBySplit(
                              1
                            )
                          }}
                          / {{ insuranceDTO?.spct_data?.insr_year_clm_lt_amt }}
                          <span class="text-10 color-gray ml-2"
                            >(1청구당/연간총)</span
                          >
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col">
                          {{
                            insuranceDTO?.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(
                              1
                            )
                          }}
                          <span class="text-10 color-gray ml-2">(1청구당)</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">사무원 인원수</div>
                        <div class="data-col">
                          {{ insuranceDTO?.spct_data?.cbr_data.length }} 명
                        </div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold">
                          {{
                            Number(
                              insuranceDTO.spct_data.insr_amt
                            ).toLocaleString()
                          }}
                          원
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="mt-2" v-if="insuranceDTO?.spct_join_yn == 'N'">
                    <p class="text-12 font-weight-bold mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;특별약관
                    </p>
                    <v-row class="table">
                      <v-col cols="12">
                        <div class="head-col">특약명</div>
                        <div class="data-col">
                          사무원의 횡령 등 부정직행위 담보 특별약관(Dishonesty
                          Extension)
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">보상한도</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col flex-wrap">자기부담금</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col">사무원 인원수</div>
                        <div class="data-col"></div>
                      </v-col>
                      <v-col cols="6" class="point">
                        <div class="head-col font-weight-bold">산출보험료</div>
                        <div class="data-col font-weight-bold"></div>
                      </v-col>
                    </v-row>
                  </div>
                  <!--특약 종료-->
                </div>
                <!-- 보험 요약 종료 -->

                <!--최종 보험료 시작-->
                <div class="mt-4">
                  <p class="font-weight-bold text-14 mb-2">
                    총 납입보험료 정보
                  </p>
                  <div class="table pa-4 text-center">
                    <span class="text-12 mx-4">기본 보험료</span>
                    <span class="text-14 mx-4 font-weight-medium"
                      >{{
                        Number(
                          insuranceDTO?.insr_amt +
                            insuranceDTO?.cons_data?.insr_amt
                        ).toLocaleString()
                      }}
                      원</span
                    >
                    <span>+</span>
                    <span class="text-12 mx-4">특약 보험료</span>
                    <span class="text-14 mx-4 font-weight-medium"
                      >{{
                        Number(
                          insuranceDTO?.spct_data?.insr_amt
                        ).toLocaleString()
                      }}
                      원</span
                    >
                    <span>=</span>
                    <span class="text-12 mx-4">최종 보험료</span>
                    <span class="text-14 mx-4 font-weight-medium color-primary"
                      >{{
                        Number(insuranceDTO?.insr_tot_amt).toLocaleString()
                      }}
                      원</span
                    >
                  </div>
                  <ul
                    class="list-style-size-small list-style-type-disc text-11 pl-4 mt-2"
                  >
                    <li>
                      보험료 입금 계좌번호 :
                      <b class="font-weight-medium color-error"
                        >신한은행 140-005-862117</b
                      ><span class="text-10 mx-3">|</span>예금주 :
                      <b class="font-weight-medium color-error"
                        >록톤컴퍼니즈코리아</b
                      ><br />
                      <span class="color-error"
                        >관세사 성명 및 등록번호를 함께 기재하여 납부하여 주시기
                        바랍니다.</span
                      >
                    </li>
                  </ul>
                </div>

                <!--footer-->
                <v-divider class="border-0 mt-8" />
                <v-row justify="space-between" align="center">
                  <v-col class="text-12">
                    <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                    ><span class="mx-4 text-10">|</span
                    ><span>대표전화 : 02.2011.0300</span>
                  </v-col>
                  <v-col class="flex-grow-0">
                    <div style="width: 70px">
                      <img src="../assets/logo.svg" class="w-100" />
                    </div>
                  </v-col>
                </v-row>
                <!--//footer-->
              </div>
              <div class="html2pdf__page-break"></div>
              <div class="print-wrap page2">
                <!--가입자 명단-->
                <div class="mt-4">
                  <p class="font-weight-bold text-14">가입자 명단</p>
                  <div class="mt-1">
                    <p class="text-12 font-weight-bold mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;기본담보
                      가입자명단
                    </p>
                    <table class="table">
                      <colgroup>
                        <col style="width: 10%" />
                        <col style="width: 18%" />
                        <col style="width: 18%" />
                        <col style="width: 18%" />
                        <col style="width: 18%" />
                        <!-- <col style="width:auto"/> -->
                        <col style="width: 18%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th class="text-center">구분</th>
                          <th class="text-center">성명</th>
                          <th class="text-center">생년월일</th>
                          <th class="text-center">등록번호</th>
                          <th class="text-center">소급담보일</th>
                          <!-- <th class="text-center">할인/할증</th> -->
                          <th class="text-center">1인당 보험료</th>
                        </tr>
                      </thead>
                      <tbody v-if="insuranceDTO.cbr_data.length">
                        <tr v-for="row in insuranceDTO.cbr_data">
                          <td class="text-center">{{ row.cbr_type }}</td>
                          <td class="text-center">{{ row.cbr_nm }}</td>
                          <td class="text-center">{{ row.cbr_brdt }}</td>
                          <td class="text-center">{{ row.cbr_regno }}</td>
                          <td class="text-center">{{ row.insr_retr_dt }}</td>
                          <!-- <td class="text-center">{{ row.insr_sale_rt}}</td> -->
                          <td class="text-center">
                            {{ row?.insr_amt?.toLocaleString() }}원
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="6" class="text-center">내용 없음</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mt-1">
                    <p class="text-12 font-weight-bold mt-2 mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;컨설팅
                      추가 가입자명단
                    </p>
                    <table class="table">
                      <colgroup>
                        <col style="width: 10%" />
                        <col style="width: 18%" />
                        <col style="width: 18%" />
                        <col style="width: 18%" />
                        <col style="width: 18%" />
                        <!-- <col style="width:auto"/> -->
                        <col style="width: 18%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th class="text-center">구분</th>
                          <th class="text-center">성명</th>
                          <th class="text-center">생년월일</th>
                          <th class="text-center">등록번호</th>
                          <th class="text-center">소급담보일</th>
                          <!-- <th class="text-center">할인/할증</th> -->
                          <th class="text-center">1인당 보험료</th>
                        </tr>
                      </thead>
                      <tbody v-if="insuranceDTO.cons_data.cbr_data.length">
                        <tr v-for="row in insuranceDTO.cons_data.cbr_data">
                          <td class="text-center">{{ row.cbr_type }}</td>
                          <td class="text-center">{{ row.cbr_nm }}</td>
                          <td class="text-center">{{ row.cbr_brdt }}</td>
                          <td class="text-center">{{ row.cbr_regno }}</td>
                          <td class="text-center">{{ row.insr_retr_dt }}</td>
                          <!-- <td class="text-center">{{row.insr_sale_rt}}</td> -->
                          <td class="text-center">
                            {{ row?.insr_amt?.toLocaleString() }}원
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="6" class="text-center">내용 없음</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mt-1">
                    <p class="text-12 font-weight-bold mt-2 mb-1">
                      <span class="color-primary">&#x275A;</span>&nbsp;사무원의
                      횡령 등 부정직행위 담보 특별약관 가입자 명단
                    </p>
                    <v-row class="table vertical">
                      <v-col cols="6">
                        <div class="head-col w-10">No.</div>
                        <div class="head-col w-30">성명</div>
                        <div class="head-col w-30">생년월일</div>
                        <div class="head-col w-30">소급담보일</div>
                        <!-- <div class="head-col">1인당 보험료</div> -->
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col w-10">No.</div>
                        <div class="head-col w-30">성명</div>
                        <div class="head-col w-30">생년월일</div>
                        <div class="head-col w-30">소급담보일</div>
                        <!-- <div class="head-col">1인당 보험료</div> -->
                      </v-col>
                      <v-col
                        cols="6"
                        v-for="(row, index) in insuranceDTO.spct_data.cbr_data"
                      >
                        <div class="data-col w-10">{{ index + 1 }}</div>
                        <div class="data-col w-30">{{ row.cbr_nm }}</div>
                        <div class="data-col w-30">{{ row.cbr_brdt }}</div>
                        <div class="data-col w-30">{{ row.insr_retr_dt }}</div>
                        <!-- <div class="data-col w-30">{{row.insr_amt.toLocaleString()}}원</div> -->
                      </v-col>
                      <v-col
                        v-if="insuranceDTO.spct_data.cbr_data.length === 0"
                        cols="12"
                        class="justify-center"
                        ><div class="py-2 text-center">내용 없음</div></v-col
                      >
                    </v-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PDF 출력 영역 종료-->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

import { InsuranceDTO } from '@/model';

import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import '..../../../assets/css/printpdf.css';
const props = defineProps({
  insurance_uuid: {
    type: String,
    required: false
  },

  insurance_dto: {
    type: InsuranceDTO,
    required: false
  }
});

const isOpenDialog = ref(true);

const emit = defineEmits(['close']);

const close = () => {
  isOpenDialog.value = false;
  emit('close');
};

const insuranceDTO = ref(new InsuranceDTO(props.insurance_dto));

onMounted(async () => {});
</script>
