<template>
  <v-dialog
    persistent
    v-model="isOpenDialog"
    :width="isPdf?'1000px':'800px'"
    :style="isMobile()?'margin-left: -10px; margin-right: -10px':''"
    hide-overlay
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-medium line-height-1-0">
          보험가입신청서
          <br v-if="checkMobile.isMobile"/>
          <span :class="checkMobile.isMobile?'text-10 text-red ml-1':'text-20 text-red ml-2'" v-if="isPdf && insuranceDTO.user_cd === 'IND' && !isAdmin && !isNotAuth"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 생년월일(6자리) 입니다.</span>
          <span :class="checkMobile.isMobile?'text-10 text-red ml-1':'text-20 text-red ml-2'" v-if="isPdf && insuranceDTO.user_cd === 'JNT' && !isAdmin && !isNotAuth"><i class="mdi mdi-alert-circle-outline mr-1"></i>비밀번호는 가입하신 사업자번호 뒤 5자리 입니다.</span>
        </div>

        <div class="d-flex justify-end" >
          <v-select
            v-model="insrItemValue"
            label="이전 가입신청서 보기"
            :items="insrItems"
            variant="outlined"
            hide-details="auto"
            single-line
            density="compact"
            class="flex-grow-0 mr-2 w-sm-270"
            @update:model-value="insrItemChange"
            return-object
            v-if="isHistory"
          />
          <v-btn :size="checkMobile.isMobile?'x-small':'default'" v-if="!isNotAuth && isPdf" variant="flat" color="dark" @click="onExportPDF('down')" class="mr-2">PDF 다운로드</v-btn>
          <v-btn :size="checkMobile.isMobile?'x-small':'default'" variant="outlined" color="dark" @click="close()">닫기</v-btn>
        </div>
      </v-card-title>

      <v-divider class="mb-0" />
      <v-card-text :class="isPdf?'pa-0':'py-6'">
        <!-- PDF 출력 영역 시작-->
        <div :class="isPdf?'d-none':''">
          <div id="printDiv">
            <!-- 개인 가입정보 시작-->
            <div class="insuranceForm-wrap" v-if="insuranceDTO.user_cd === 'IND' && insuranceDTO.spct_join_yn === 'Y'">
              <div :class="isPdf?'print-wrap':''">
                <!--header-->
                <header>
                  <h1 class="text-center">
                    <p class="text-20 font-weight-bold color-primary line-height-1-2">
                      전문직업배상책임보험
                    </p>
                    <p class="text-20 font-weight-bold line-height-1-2">
                      보험가입신청서
                    </p>
                  </h1>
                  <p class="mt-4 text-12 line-height-1-4 word-break-keep-all">
                    본 보험은 대한변호사협회 및 DB손해보험㈜ 그리고 록톤컴퍼니즈코리아손해보험중개㈜ 간에 체결된 보험업무협약에 따라 피보험자가 변호사로서 수행한 업무상 과실에 따른 법률상 손해배상책임을 보장합니다.
                  </p>
                </header>
                <!--//header-->

                <main>
                  <!-- 가입자 정보 시작 -->
                  <div class="mt-4">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;계약자/피보험자 정보
                    </p>
                    <v-row class="table">
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>보험계약자</p>
                        </div>
                        <div class="data-col">
                          대한변호사협회
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>보험기간</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_st_dt }}(00:01) ~ {{ insuranceDTO.insr_cncls_dt }}(00:01)
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>피보험자</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.user_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>생년월일</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.user_birth }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>등록번호</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.user_regno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>소속 지방회</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_region_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소명</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사업자번호</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cnno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 전화</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_telno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 팩스</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_faxno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>담당자 성명</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>휴대 전화</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_hpno }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>이메일</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_email }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 주소</p>
                        </div>
                        <div class="data-col">
                          ({{ insuranceDTO.corp_post }}) {{ insuranceDTO.corp_addr }} {{ insuranceDTO.corp_addr_dtl }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 가입자 정보 종료 -->
  
                  <!-- 보험 요약 시작 -->
                  <div class="mt-4">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;보험 가입 상세
                    </p>
                    <!--기본담보 시작-->
                    <div class="mt-1">
                      <p class="text-12 font-weight-bold mb-1">
                        <span class="color-primary">&#x275A;</span>&nbsp;기본담보
                      </p>

                        <v-row class="table">
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">보험기간</div>
                            <div class="data-col">
                              {{ insuranceDTO.insr_st_dt }}(00:01) ~
                              {{ insuranceDTO.insr_cncls_dt }}(00:01)
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">소급담보일</div>
                            <div class="data-col">{{ insuranceDTO.insr_retr_dt }}</div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">보상한도</div>
                            <div class="data-col">
                              {{ insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1) }} /
                              {{ insuranceDTO?.insr_year_clm_lt_amt
                              }}<span class="text-10 color-gray ml-2"
                                >(1청구당/연간총)</span
                              >
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">자기부담금</div>
                            <div class="data-col">
                              {{ insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1) }}
                              <span class="text-10 color-gray ml-2">(1청구당)</span>
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">매출액구간</div>
                            <div class="data-col">
                              {{ insuranceDTO?.insr_take_sec?.getValueBySplit(1) }}
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">기준보험료</div>
                            <div class="data-col">
                              {{ Number(insuranceDTO.insr_base_amt).toLocaleString() }} 원
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">할인 및 할증률</div>
                            <div class="data-col">
                              {{ insuranceDTO.insr_sale_rt }}% 적용
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'" class="point">
                            <div :class="isMobile()?'head-col2':'head-col'">산출보험료</div>
                            <div class="data-col">
                              {{ Number(insuranceDTO.insr_amt).toLocaleString() }} 원
                            </div>
                          </v-col>
                        </v-row>
                    </div>
                    <!--특약 시작-->
                    <div class="mt-2" v-if="insuranceDTO.spct_join_yn == 'Y'">
                      <p class="text-12 font-weight-bold mb-1">
                        <span class="color-primary">&#x275A;</span>&nbsp;특별약관
                      </p>
                      <v-row class="table">
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">특약명</div>
                          <div class="data-col">
                            고용직원 부정직행위 담보 특별약관<br/>(Dishonesty
                            Extension)
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">소급담보일</div>
                          <div class="data-col">
                            {{ insuranceDTO.spct_data.insr_retr_dt }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">보상한도</div>
                          <div class="data-col">
                            {{
                              insuranceDTO?.spct_data?.insr_clm_lt_amt?.getValueBySplit(1)
                            }}
                            / {{ insuranceDTO?.spct_data?.insr_year_clm_lt_amt
                            }}<span class="text-10 color-gray ml-2"
                          >(1청구당/연간총)</span
                          >
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">자기부담금</div>
                          <div class="data-col">
                            {{
                              insuranceDTO?.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(
                                  1
                              )
                            }}
                            <span class="text-10 color-gray ml-2">(1청구당)</span>
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">사무원 인원수</div>
                          <div class="data-col">
                            {{ insuranceDTO?.spct_data?.cbr_cnt }} 명
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="point">
                          <div :class="isMobile()?'head-col2 font-weight-bold':'head-col font-weight-bold'">산출보험료</div>
                          <div class="data-col font-weight-bold">
                            {{
                              Number(insuranceDTO.spct_data.insr_amt).toLocaleString()
                            }}
                            원
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!--특약 종료-->
                  </div>
                  <!-- 보험 요약 종료 -->

                  <!--최종 보험료 시작-->
                  <div class="mt-4" v-if="insuranceDTO.spct_join_yn == 'Y'">
                    <p class="font-weight-bold text-14 mb-2">총 납입보험료 정보</p>
                    <div :class="isMobile()?'table pa-2 text-center':'table pa-4 text-center'">
                      <span :class="isMobile()?'text-12 mx-2':'text-14 mx-2'">기본 보험료</span>
                      <span :class="isMobile()?'text-14 mx-2 font-weight-medium':'text-15 mx-2 font-weight-medium'"
                      >{{
                          Number(
                              insuranceDTO?.insr_amt
                          ).toLocaleString()
                        }}원</span
                      >
                      <span>+</span>
                      <span :class="isMobile()?'text-10 mx-2':'text-12 mx-2'">특약 보험료</span>
                      <span :class="isMobile()?'text-12 mx-2 font-weight-medium':'text-14 mx-2 font-weight-medium'"
                      >{{
                          Number(insuranceDTO?.spct_data?.insr_amt).toLocaleString()
                        }}원</span
                      >
                      <br v-if="isMobile()"/>
                      <span>=</span>
                      <span :class="isMobile()?'text-10 mx-2':'text-12 mx-2'">최종 보험료</span>
                      <span :class="isMobile()?'text-12 mx-2 font-weight-medium color-primary':'text-14 mx-2 font-weight-medium color-primary'"
                      >{{
                          Number(insuranceDTO?.insr_tot_amt).toLocaleString()
                        }}
                원</span
                      >
                    </div>
                    <ul
                        class="list-style-size-small list-style-type-disc text-11 pl-4 mt-2"
                    >
                      <li :class="isMobile()?'text-9':'text-11'">
                        <p>
                          보험료 입금 계좌번호 :
                          <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">신한은행 140-009-057480</b>
                          <span :class="isMobile()?'text-8 mx-3':'text-10 mx-3'" >|</span><br v-if="isMobile()"/>예금주 :
                          <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">록톤컴퍼니즈코리아</b>
                        </p>
                      </li>
                      <li class="color-error line-height-1-2">
                        변호사 성명과 등록번호를 함께 기재하여 송금하여 주시기 바랍니다.
                      </li>
                    </ul>
                  </div>
                  <!--최종 보험료 종료-->

                  <!-- 변경 정보 시작 -->
                  <div class="mt-1" v-if="insuranceDTO.change_dt">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0"><span class="color-primary">&#x275A;</span>&nbsp;변경정보</p>
                    <v-row class="table">
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>변경일자</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.change_dt }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>상세내용</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.change_rmk }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 변경 정보 종료 -->
                </main>

                <!--footer-->
                <footer v-if="isPdf">
                  <v-divider class="border-0 mt-4" />
                  <v-row justify="space-between" align="center">
                    <v-col :class="isMobile()?'text-10':'text-12'">
                      <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                      ><span class="mx-4 text-10">|</span
                    ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                    </v-col>
                    <v-col class="flex-grow-0">
                      <div style="width: 70px">
                        <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                      </div>
                    </v-col>
                  </v-row>
                </footer>
                <!--//footer-->
              </div>
              <div class="html2pdf__page-break"></div>

              <div :class="isPdf ? 'print-wrap' : ''">
                <!-- header 영역 시작-->
                <header v-if="isPdf">
                  <h1 class="text-center">
                    <p class="text-20 font-weight-bold color-primary line-height-1-2">
                      전문직업배상책임보험
                    </p>
                    <p class="text-20 font-weight-bold line-height-1-2">
                      보험가입신청서
                    </p>
                  </h1>
                </header>
                <!-- header 영역 종료-->

                <main>
                  <!-- 약관동의 시작 -->
                  <div class="mt-4" v-if=isPdf>
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;약관 동의
                    </p>
                    <v-row class="table vertical">
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">신청내용 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr10_yn"
                            name="agr10_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">보험약관 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr20_yn"
                            name="agr20_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 letter-spacing-030">계약 체결·이행 등을 위한 개인(신용)정보 처리 동의</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr30_yn"
                            name="agr30_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">상품설명확인서 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr40_yn"
                            name="agr40_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 종료 -->

                  <!--최종확인서명 시작-->
                  <div class="mt-4" v-if=isPdf>
                    <v-row class="table">
                      <v-col cols="12" class="border-bottom-gray-1 px-8 py-4">
                        <div class="w-80">
                          <p class="text-11 line-height-1-4 word-break-keep-all">
                            상기와 같이 보험계약사항을 확인하고 전문직업배상책임보험
                            가입을 신청합니다. <br />피보험자는 동 웹사이트 회원가입,
                            로그인 후 작성한 가입 신청 문서확인/개인정보처리 동의 사항
                            인증절차를 승인함으로써 피보험자 서명에 갈음한 것으로
                            동의하며 이를 확인합니다.
                          </p>
                        </div>
                        <div class="w-20 d-flex justify-end">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr50_yn"
                            name="agr50_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0"
                          />
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col py-2">
                          <p class="text-12">가입신청일</p>
                        </div>
                        <div class="data-col py-2 justify-end pr-8">
                          <p class="text-12">{{ insuranceDTO.insr_reg_dt }}</p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col py-2">
                          <p class="text-12">피보험자</p>
                        </div>
                        <div class="data-col py-2 justify-end pr-8">
                          <p class="text-12">{{ insuranceDTO.user_nm }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!--최종확인서명 종료-->
                </main>

                <!--footer-->
                <footer v-if="isPdf">
                  <v-divider class="border-0 mt-6" />
                  <v-row justify="space-between" align="center">
                    <v-col :class="isMobile()?'text-10':'text-12'">
                      <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                      ><span class="mx-4 text-10">|</span
                      ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                    </v-col>
                    <v-col class="flex-grow-0">
                      <div style="width: 70px">
                        <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                      </div>
                    </v-col>
                  </v-row>
                </footer>
                <!--//footer-->
              </div>
            </div>
            <div class="insuranceForm-wrap" v-if="insuranceDTO.user_cd === 'IND' && insuranceDTO.spct_join_yn === 'N'">
              <div :class="isPdf?'print-wrap':''">
                <!--header-->
                <header>
                  <h1 class="text-center">
                    <p class="text-20 font-weight-bold color-primary line-height-1-2">
                      전문직업배상책임보험
                    </p>
                    <p class="text-20 font-weight-bold line-height-1-2">
                      보험가입신청서
                    </p>
                  </h1>
                  <p class="mt-4 text-12 line-height-1-4 word-break-keep-all">
                    본 보험은 대한변호사협회 및 DB손해보험㈜ 그리고 록톤컴퍼니즈코리아손해보험중개㈜ 간에 체결된 보험업무협약에 따라 피보험자가 변호사로서 수행한 업무상 과실에 따른 법률상 손해배상책임을 보장합니다.
                  </p>
                </header>
                <!--//header-->

                <main>
                  <!-- 가입자 정보 시작 -->
                  <div class="mt-4">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;계약자/피보험자 정보
                    </p>
                    <v-row class="table">
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>보험계약자</p>
                        </div>
                        <div class="data-col">
                          대한변호사협회
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>보험기간</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.base_insr_st_dt }}(00:01) ~ {{ insuranceDTO.base_insr_cncls_dt }}(00:01)
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>피보험자</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.user_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>생년월일</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.user_birth }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>등록번호</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.user_regno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>소속 지방회</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_region_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소명</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사업자번호</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cnno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 전화</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_telno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 팩스</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_faxno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>담당자 성명</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>휴대 전화</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_hpno }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>이메일</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_email }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 주소</p>
                        </div>
                        <div class="data-col">
                          ({{ insuranceDTO.corp_post }}) {{ insuranceDTO.corp_addr }} {{ insuranceDTO.corp_addr_dtl }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 가입자 정보 종료 -->

                  <!-- 보험 요약 시작 -->
                  <div class="mt-4">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;보험 가입 상세
                    </p>
                    <!--기본담보 시작-->
                    <div class="mt-1">
                      <p class="text-12 font-weight-bold mb-1">
                        <span class="color-primary">&#x275A;</span>&nbsp;기본담보
                      </p>

                      <v-row class="table">
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">보험기간</div>
                          <div class="data-col">
                            {{ insuranceDTO.insr_st_dt }}(00:01) ~
                            {{ insuranceDTO.insr_cncls_dt }}(00:01)
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">소급담보일</div>
                          <div class="data-col">{{ insuranceDTO.insr_retr_dt }}</div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">보상한도</div>
                          <div class="data-col">
                            {{ insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1) }} /
                            {{ insuranceDTO?.insr_year_clm_lt_amt
                            }}<span class="text-10 color-gray ml-2"
                          >(1청구당/연간총)</span
                          >
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">자기부담금</div>
                          <div class="data-col">
                            {{ insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1) }}
                            <span class="text-10 color-gray ml-2">(1청구당)</span>
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">매출액구간</div>
                          <div class="data-col">
                            {{ insuranceDTO?.insr_take_sec?.getValueBySplit(1) }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">기준보험료</div>
                          <div class="data-col">
                            {{ Number(insuranceDTO.insr_base_amt).toLocaleString() }} 원
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">할인 및 할증률</div>
                          <div class="data-col">
                            {{ insuranceDTO.insr_sale_rt }}% 적용
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="point">
                          <div :class="isMobile()?'head-col2':'head-col'">산출보험료</div>
                          <div class="data-col">
                            {{ Number(insuranceDTO.insr_amt).toLocaleString() }} 원
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <ul
                        class="list-style-size-small list-style-type-disc text-11 pl-4 mt-2"
                    >
                      <li :class="isMobile()?'text-9':'text-11'">
                        <p>
                          보험료 입금 계좌번호 :
                          <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">신한은행 140-009-057480</b>
                          <span :class="isMobile()?'text-8 mx-3':'text-10 mx-3'">|</span><br v-if="isMobile()"/>예금주 :
                          <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">록톤컴퍼니즈코리아</b>
                        </p>
                      </li>
                      <li class="color-error line-height-1-2">
                        변호사 성명과 등록번호를 함께 기재하여 송금하여 주시기 바랍니다.
                      </li>
                    </ul>
                  </div>
                  <!-- 보험 요약 종료 -->

                  <!--최종 보험료 종료-->

                  <!-- 변경 정보 시작 -->
                  <div class="mt-1" v-if="insuranceDTO.change_dt">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0"><span class="color-primary">&#x275A;</span>&nbsp;변경정보</p>
                    <v-row class="table">
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>변경일자</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.change_dt }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>상세내용</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.change_rmk }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 변경 정보 종료 -->
                  <!-- 약관동의 시작 -->
                  <div class="mt-4" v-if=isPdf>
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;약관 동의
                    </p>
                    <v-row class="table vertical">
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">신청내용 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                              v-model="insuranceDTO.agr10_yn"
                              name="agr10_yn"
                              label="확인함 (필수)"
                              density="compact"
                              class="v-checkbox flex-grow-0 ml-auto"
                              readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">보험약관 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                              v-model="insuranceDTO.agr20_yn"
                              name="agr20_yn"
                              label="확인함 (필수)"
                              density="compact"
                              class="v-checkbox flex-grow-0 ml-auto"
                              readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 letter-spacing-030">계약 체결·이행 등을 위한 개인(신용)정보 처리 동의</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                              v-model="insuranceDTO.agr30_yn"
                              name="agr30_yn"
                              label="확인함 (필수)"
                              density="compact"
                              class="v-checkbox flex-grow-0 ml-auto"
                              readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">상품설명확인서 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                              v-model="insuranceDTO.agr40_yn"
                              name="agr40_yn"
                              label="확인함 (필수)"
                              density="compact"
                              class="v-checkbox flex-grow-0 ml-auto"
                              readolny
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 종료 -->

                  <!--최종확인서명 시작-->
                  <div class="mt-4" v-if=isPdf>
                    <v-row class="table">
                      <v-col cols="12" class="border-bottom-gray-1 px-8 py-4">
                        <div class="w-80">
                          <p class="text-11 line-height-1-4 word-break-keep-all">
                            상기와 같이 보험계약사항을 확인하고 전문직업배상책임보험
                            가입을 신청합니다. <br />피보험자는 동 웹사이트 회원가입,
                            로그인 후 작성한 가입 신청 문서확인/개인정보처리 동의 사항
                            인증절차를 승인함으로써 피보험자 서명에 갈음한 것으로
                            동의하며 이를 확인합니다.
                          </p>
                        </div>
                        <div class="w-20 d-flex justify-end">
                          <VCheckBoxWithValidation
                              v-model="insuranceDTO.agr50_yn"
                              name="agr50_yn"
                              label="확인함 (필수)"
                              density="compact"
                              class="v-checkbox flex-grow-0"
                          />
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col py-2">
                          <p class="text-12">가입신청일</p>
                        </div>
                        <div class="data-col py-2 justify-end pr-8">
                          <p class="text-12">{{ insuranceDTO.insr_reg_dt }}</p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col py-2">
                          <p class="text-12">피보험자</p>
                        </div>
                        <div class="data-col py-2 justify-end pr-8">
                          <p class="text-12">{{ insuranceDTO.user_nm }}</p>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!--최종확인서명 종료-->
                </main>

                <!--footer-->
                <footer v-if="isPdf">
                  <v-divider class="border-0 mt-6" />
                  <v-row justify="space-between" align="center">
                    <v-col :class="isMobile()?'text-10':'text-12'">
                      <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                      ><span class="mx-4 text-10">|</span
                    ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                    </v-col>
                    <v-col class="flex-grow-0">
                      <div style="width: 70px">
                        <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                      </div>
                    </v-col>
                  </v-row>
                </footer>
                <!--//footer-->
              </div>
            </div>

            <!-- 복수 가입정보 시작-->
            <div class="insuranceForm-wrap" v-if="insuranceDTO.user_cd === 'JNT' && insuranceDTO.spct_join_yn === 'Y'">
              <div :class="isPdf?'print-wrap':''">
                <!--header-->
                <header>
                  <h1 class="text-center">
                    <p class="text-20 font-weight-bold color-primary line-height-1-2">
                      전문직업배상책임보험
                    </p>
                    <p class="text-20 font-weight-bold line-height-1-2">
                      보험가입신청서
                    </p>
                  </h1>
                  <p class="mt-4 text-12 line-height-1-4 word-break-keep-all">
                    본 보험은 대한변호사협회 및 DB손해보험㈜ 그리고 록톤컴퍼니즈코리아손해보험중개㈜ 간에 체결된 보험업무협약에 따라 피보험자가 변호사로서 수행한 업무상 과실에 따른 법률상 손해배상책임을 보장합니다.
                  </p>
                </header>
                <!--//header-->

                <main>

                  <!-- 가입자 정보 시작 -->
                  <div class="mt-4">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;계약자/피보험자 정보
                    </p>
                    <v-row class="table">
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>보험계약자</p>
                        </div>
                        <div class="data-col">
                          대한변호사협회
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>보험기간</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.insr_st_dt }}(00:01) ~ {{ insuranceDTO.insr_cncls_dt }}(00:01)
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소명</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.user_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>대표자 성명</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_ceo_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>피보험자</p>
                        </div>
                        <div class="data-col">
                          <p v-if="insuranceDTO.cbr_data.length>0">{{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{insuranceDTO.cbr_cnt - 1}} 명</p>
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 형태</p>
                        </div>
                        <div class="data-col">
                          {{ corpTypeItems.find(item => item.value ==  insuranceDTO.corp_type)?.title }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사업자번호</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cnno }}
                          <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cnno"  name="corp_cnno" label="사업자번호" single-line density="comfortable" readonly/> -->
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>법인번호</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_bnno }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 전화</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_telno }}
                          <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_telno"  name="corp_telno" label="사무소 팩스" single-line density="comfortable"/> -->
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 팩스</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_faxno }}
                          <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_faxno" name="corp_taxno" label="사무소 팩스" single-line density="comfortable"/> -->
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>소속 지방회</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_region_nm }}
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>담당자 성명</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_nm }}
                          <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_nm" name="corp_cust_nm" label="담당자 성명" single-line density="comfortable"/> -->
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>휴대 전화</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_hpno }}
                          <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_hpno" name="corp_cust_hpno" label="휴대 전화" single-line density="comfortable"/> -->
                        </div>
                      </v-col>
                      <v-col :cols="isMobile()?'12':'6'" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>이메일</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_cust_email }}
                          <!-- <VTextFieldWithValidation v-mod-el="insuranceDTO.corp_cust_email" name="corp_cust_email" label="이메일" single-line density="comfortable"/> -->
                          <!-- <v-select :items="selectbox1" variant="outlined" hide-details="auto" label="도메인 선택" single-line density="comfortable" class="ml-2"></v-select> -->
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>사무소 주소</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.corp_addr }}&nbsp;{{
                            insuranceDTO.corp_addr_dtl
                          }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 가입자 정보 종료 -->
  
                  <!-- 보험 요약 시작 -->
                  <div class="mt-4">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;보험 가입 상세
                    </p>
                    <!--기본담보 시작-->
                    <div class="mt-1">
                      <p class="text-12 font-weight-bold mb-1">
                        <span class="color-primary">&#x275A;</span>&nbsp;기본담보
                      </p>
                      <v-row class="table">
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">보험기간</div>
                          <div class="data-col">
                            {{ insuranceDTO.insr_st_dt }}(00:01) ~
                            {{ insuranceDTO.insr_cncls_dt }}(00:01)
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">소급담보일</div>
                          <div class="data-col">개인별 적용</div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">무사고 할인</div>
                          <div class="data-col">개인별 적용</div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">인원수 할인</div>
                          <div class="data-col">{{ insuranceDTO.insr_pcnt_sale_rt }} %</div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">보상한도</div>
                          <div class="data-col">
                            {{ insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1) }} /
                            {{ insuranceDTO?.insr_year_clm_lt_amt }}
                            <span class="text-10 color-gray ml-2">(1청구당/연간총)</span>
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">자기부담금</div>
                          <div class="data-col">
                            {{ insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1) }}
                            <span class="text-10 color-gray ml-2">(1청구당)</span>
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">매출액구간</div>
                          <div class="data-col">
                            {{ insuranceDTO?.insr_take_sec?.getValueBySplit(1) }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">기준보험료</div>
                          <div class="data-col">
                            {{ Number(insuranceDTO.insr_base_amt).toLocaleString() }} 원
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">변호사 인원수</div>
                          <div class="data-col">
                            <!-- {{ insuranceDTO.cbr_data.length }} 명 -->
                            {{ insuranceDTO.cbr_cnt  }} 명
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="point">
                          <div :class="isMobile()?'head-col2':'head-col'">산출 보험료</div>
                          <div class="data-col">
                            {{ Number(insuranceDTO.insr_amt).toLocaleString() }} 원
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!--특약 시작-->
                    <div class="mt-2" v-if="insuranceDTO.spct_join_yn === 'Y'">
                      <p class="text-12 font-weight-bold mb-1">
                        <span class="color-primary">&#x275A;</span>&nbsp;특별약관
                      </p>
                      <v-row class="table">
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">특약명</div>
                          <div class="data-col">
                            고용직원 부정직행위 담보 특별약관<br/>(Dishonesty
                            Extension)
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">소급담보일</div>
                          <div class="data-col">
                            {{ insuranceDTO.spct_data.insr_retr_dt }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">보상한도</div>
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
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">자기부담금</div>
                          <div class="data-col">
                            {{
                              insuranceDTO?.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(
                                  1
                              )
                            }}
                            <span class="text-10 color-gray ml-2">(1청구당)</span>
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'">
                          <div :class="isMobile()?'head-col2':'head-col'">사무원 인원수</div>
                          <div class="data-col">
                            {{ insuranceDTO?.spct_data?.cbr_cnt }} 명
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="point">
                          <div :class="isMobile()?'head-col2 font-weight-bold':'head-col font-weight-bold'">산출보험료</div>
                          <div class="data-col font-weight-bold">
                            {{
                              Number(insuranceDTO.spct_data.insr_amt).toLocaleString()
                            }}
                            원
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!--특약 종료-->
                  </div>
                  <!-- 보험 요약 종료 -->

                  <!--최종 보험료 시작-->
                  <div class="mt-4">
                    <p class="font-weight-bold text-14 mb-2">총 납입보험료 정보</p>
                    <div :class="isMobile()?'table pa-2 text-center':'table pa-4 text-center'">
                      <span :class="isMobile()?'text-11 mx-2':'text-12 mx-4'">기본 보험료</span>
                      <span :class="isMobile()?'text-13 mx-2 font-weight-medium':'text-14 mx-4 font-weight-medium'"
                      >{{
                          Number(
                              insuranceDTO?.insr_amt
                          ).toLocaleString()
                        }}원</span
                      >
                      <span>+</span>
                      <span :class="isMobile()?'text-11 mx-2':'text-12 mx-4'">특약 보험료</span>
                      <span :class="isMobile()?'text-13 mx-2 font-weight-medium':'text-14 mx-4 font-weight-medium'"
                      >{{
                          Number(insuranceDTO?.spct_data?.insr_amt).toLocaleString()
                        }}원</span
                      >
                      <br v-if="isMobile()"/>
                      <span>=</span>
                      <span :class="isMobile()?'text-11 mx-2':'text-12 mx-2'">최종 보험료</span>
                      <span :class="isMobile()?'text-13 mx-2 font-weight-medium color-primary':'text-14 mx-2 font-weight-medium color-primary'"
                      >{{
                          Number(insuranceDTO?.insr_tot_amt).toLocaleString()
                        }}
                        <!--{{
                          (Number(
                              insuranceDTO?.insr_amt
                          ) + Number(insuranceDTO?.spct_data?.insr_amt)).toLocaleString()
                        }}-->
                원</span
                      >
                    </div>
                    <ul
                        class="list-style-size-small list-style-type-disc text-11 pl-4 mt-2"
                    >
                      <li :class="isMobile()?'text-9':'text-11'">
                        보험료 입금 계좌번호 :
                        <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">신한은행 140-009-057480</b>
                        <span :class="isMobile()?'text-8 mx-3':'text-10 mx-3'">|</span><br v-if="isMobile()"/>예금주 :
                        <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">록톤컴퍼니즈코리아</b>
                      </li>
                      <li class="color-error line-height-1-2">
                        법인 및 사무소명으로 일괄 송금하여 주시기 바랍니다.
                      </li>
                    </ul>
                  </div>
                  <!--최종 보험료 종료-->
  
                  <!-- 변경 정보 시작 -->
                  <div class="mt-1" v-if="insuranceDTO.change_dt">
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0"><span class="color-primary">&#x275A;</span>&nbsp;변경정보</p>
                    <v-row class="table">
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>일자</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.change_dt }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div :class="isMobile()?'head-col2':'head-col'">
                          <p>상세</p>
                        </div>
                        <div class="data-col">
                          {{ insuranceDTO.change_rmk }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 변경 정보 종료 -->
                </main>

                <!--footer-->
                <footer v-if="isPdf">
                  <v-divider class="border-0 mt-4" />
                  <v-row justify="space-between" align="center">
                    <v-col :class="isMobile()?'text-10':'text-12'">
                      <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                      ><span class="mx-4 text-10">|</span
                    ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                    </v-col>
                    <v-col class="flex-grow-0">
                      <div style="width: 70px">
                        <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                      </div>
                    </v-col>
                  </v-row>
                </footer>
                <!--//footer-->
              </div>
              <div class="html2pdf__page-break"></div>

              <div :class="isPdf ? 'print-wrap' : ''">
                <!-- header 영역 시작-->
                <header v-if="isPdf">
                  <h1 class="text-center">
                    <p class="text-20 font-weight-bold color-primary line-height-1-2">
                      전문직업배상책임보험
                    </p>
                    <p class="text-20 font-weight-bold line-height-1-2">
                      보험가입신청서
                    </p>
                  </h1>
                </header>
                <!-- header 영역 종료-->

                <main>

                  <!-- 약관동의 시작 -->
                  <div class="mt-4" v-if=isPdf>
                    <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                      <span class="color-primary">&#x275A;</span>&nbsp;약관 동의
                    </p>
                    <v-row class="table vertical">
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">신청내용 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr10_yn"
                            name="agr10_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">보험약관 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr20_yn"
                            name="agr20_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 letter-spacing-030">계약 체결·이행 등을 위한 개인(신용)정보 처리 동의</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr30_yn"
                            name="agr30_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                      <v-col cols="6" class="bg-background">
                        <div class="w-70 pl-4 pr-2">상품설명확인서 확인</div>
                        <div class="w-30 px-1 bg-white">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr40_yn"
                            name="agr40_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0 ml-auto"
                            readolny
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!-- 약관동의 종료 -->


                  <!--최종확인서명 시작-->
                  <div class="mt-4" v-if=isPdf>
                    <v-row class="table">
                      <v-col cols="12" class="border-bottom-gray-1 px-8 py-4">
                        <div class="w-80">
                          <p class="text-11 line-height-1-4 word-break-keep-all">
                            상기와 같이 보험계약사항을 확인하고 전문직업배상책임보험
                            가입을 신청합니다. <br />피보험자는 동 웹사이트 회원가입,
                            로그인 후 작성한 가입 신청 문서확인/개인정보처리 동의 사항
                            인증절차를 승인함으로써 피보험자 서명에 갈음한 것으로
                            동의하며 이를 확인합니다.
                          </p>
                        </div>
                        <div class="w-20 d-flex justify-end">
                          <VCheckBoxWithValidation
                            v-model="insuranceDTO.agr50_yn"
                            name="agr50_yn"
                            label="확인함 (필수)"
                            density="compact"
                            class="v-checkbox flex-grow-0"
                          />
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col py-2">
                          <p class="text-12">가입신청일</p>
                        </div>
                        <div class="data-col py-2 justify-end pr-8">
                          <p class="text-12">{{ insuranceDTO.insr_reg_dt }}</p>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="head-col py-2">
                          <p class="text-12">피보험자</p>
                        </div>
                        <div class="data-col py-2 justify-end pr-8">
                          <p class="text-12" v-if="insuranceDTO.cbr_data.length>0">{{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{insuranceDTO.cbr_cnt - 1}} 명</p>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <!--최종확인서명 종료-->
                </main>

                <!--footer-->
                <footer v-if="isPdf">
                  <v-divider class="border-0 mt-4" />
                  <v-row justify="space-between" align="center">
                    <v-col :class="isMobile()?'text-10':'text-12'">
                      <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                      ><span class="mx-4 text-10">|</span
                      ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                    </v-col>
                    <v-col class="flex-grow-0">
                      <div style="width: 70px">
                        <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                      </div>
                    </v-col>
                  </v-row>
                </footer>
                <!--//footer-->
              </div>
              <div class="html2pdf__page-break"></div>

              <!-- 가입자명단 (PDF용)-->
              <template v-if="isPdf" v-for="chunkIndex in chunkedDivCount">
                <div :class="isPdf ? 'print-wrap' : ''">
                  <!-- header 영역 시작-->
                  <header v-if="isPdf">
                    <h1 class="text-center">
                      <p class="text-20 font-weight-bold color-primary line-height-1-2">
                        전문직업배상책임보험
                      </p>
                      <p class="text-20 font-weight-bold line-height-1-2">
                        보험가입신청서
                      </p>
                    </h1>
                  </header>
                  <!-- header 영역 종료-->

                  <main>
                    <!--가입자 명단 시작-->
                    <div class="mt-4">
                      <p class="font-weight-bold text-14"><span class="color-primary">&#x275A;</span>&nbsp;가입자 명단</p>
                      <div class="mt-1">
                        <table class="table v2 mb-1">
                          <colgroup>
                            <col :style="isMobile()?'width: 20px':'width: 40px'" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col :style="isMobile()?'width: 50px':'width: auto'" />
                          </colgroup>
                          <thead>
                          <tr>
                            <th :class="isMobile()?'text-center text-7':'text-center'">No</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">성명</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">생년월일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">등록번호</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">소급담보일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">할인할증</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">1인당 보험료</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">상태</th>
                          </tr>
                          </thead>

                          <tbody v-for="(row, index) in getCurrentChunkData(chunkIndex)" :key="index">
                          <tr>
                            <td :class="isMobile()?'text-7':''">{{ ((chunkIndex - 1 ) * chunkSize) +  index + 1 }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_nm }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_brdt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_regno }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_retr_dt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_sale_rt }} %</td>
                            <td :class="isMobile()?'text-7':''">
                              {{ Number(row?.insr_amt)?.toLocaleString() }}원
                            </td>
                            <td v-if="insuranceDTO.status_cd !== '10'"> {{  statusCdItems.find(code => code.value ==  row.status_cd)?.title}}</td>
                            <td v-else></td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!--가입자 명단 종료 -->
                  </main>

                  <!-- footer 영역 시작-->
                  <footer v-if="isPdf">
                    <v-divider class="border-0 mt-4" />
                    <v-row justify="space-between" align="center">
                      <v-col :class="isMobile()?'text-10':'text-12'">
                          <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                          ><span class="mx-4 text-10">|</span
                      ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                      </v-col>
                      <v-col class="flex-grow-0">
                        <div style="width: 70px">
                          <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                        </div>
                      </v-col>
                    </v-row>
                  </footer>
                  <!-- footer 영역 종료-->
                </div>
              </template>

              <!-- 가입자명단 (신청보기용)-->
              <template v-if="!isPdf">
                <div :class="isPdf?'print-wrap':''">
                  <main>
                    <div class="mt-4">
                      <p class="font-weight-bold text-14"><span class="color-primary">&#x275A;</span>&nbsp;가입자 명단</p>
                      <div class="table mt-1">
                        <table class="table v2 mb-1">
                          <colgroup>
                            <col :style="isMobile()?'width: 20px':'width: 40px'" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col :style="isMobile()?'width: 50px':'width: auto'" />
                          </colgroup>
                          <thead>
                          <tr>
                            <th :class="isMobile()?'text-center text-7':'text-center'">No</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">성명</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">생년월일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">등록번호</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">소급담보일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">할인할증</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">1인당 보험료</th>
                          </tr>
                          </thead>
                          <tbody v-if="insuranceDTO.cbr_data.length">
                          <tr v-for="(row, index) in insuranceDTO.cbr_data">
                            <td :class="isMobile()?'text-7':''">{{ index + 1 }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_nm }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_brdt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_regno }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_retr_dt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_sale_rt }} %</td>
                            <td :class="isMobile()?'text-7':''">
                              {{ row?.insr_amt?.toLocaleString() }}원
                            </td>
                          </tr>
                          </tbody>
                          <tbody v-else>
                          <tr>
                            <td colspan="7" class="text-center">내용 없음</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </main>

                </div>
              </template>
              <!-- 가입자명단 (가입신청서)-->
            </div>

              <!-- 복수 가입정보 시작-->
              <div class="insuranceForm-wrap" v-if="insuranceDTO.user_cd === 'JNT' && insuranceDTO.spct_join_yn === 'N'">
                <div :class="isPdf?'print-wrap':''">
                  <!--header-->
                  <header>
                    <h1 class="text-center">
                      <p class="text-20 font-weight-bold color-primary line-height-1-2">
                        전문직업배상책임보험
                      </p>
                      <p class="text-20 font-weight-bold line-height-1-2">
                        보험가입신청서
                      </p>
                    </h1>
                    <p class="mt-4 text-12 line-height-1-4 word-break-keep-all">
                      본 보험은 대한변호사협회 및 DB손해보험㈜ 그리고 록톤컴퍼니즈코리아손해보험중개㈜ 간에 체결된 보험업무협약에 따라 피보험자가 변호사로서 수행한 업무상 과실에 따른 법률상 손해배상책임을 보장합니다.
                    </p>
                  </header>
                  <!--//header-->

                  <main>

                    <!-- 가입자 정보 시작 -->
                    <div class="mt-4">
                      <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                        <span class="color-primary">&#x275A;</span>&nbsp;계약자/피보험자 정보
                      </p>
                      <v-row class="table">
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>보험계약자</p>
                          </div>
                          <div class="data-col">
                            대한변호사협회
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>보험기간</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.base_insr_st_dt }}(00:01) ~ {{ insuranceDTO.base_insr_cncls_dt }}(00:01)
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>사무소명</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.user_nm }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>대표자 성명</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_ceo_nm }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>피보험자</p>
                          </div>
                          <div class="data-col">
                            <p v-if="insuranceDTO.cbr_data.length>0">{{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{insuranceDTO.cbr_cnt - 1}} 명</p>
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>사무소 형태</p>
                          </div>
                          <div class="data-col">
                            {{ corpTypeItems.find(item => item.value ==  insuranceDTO.corp_type)?.title }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>사업자번호</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_cnno }}
                            <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cnno"  name="corp_cnno" label="사업자번호" single-line density="comfortable" readonly/> -->
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>법인번호</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_bnno }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>사무소 전화</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_telno }}
                            <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_telno"  name="corp_telno" label="사무소 팩스" single-line density="comfortable"/> -->
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>사무소 팩스</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_faxno }}
                            <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_faxno" name="corp_taxno" label="사무소 팩스" single-line density="comfortable"/> -->
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>소속 지방회</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_region_nm }}
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>담당자 성명</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_cust_nm }}
                            <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_nm" name="corp_cust_nm" label="담당자 성명" single-line density="comfortable"/> -->
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>휴대 전화</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_cust_hpno }}
                            <!-- <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_hpno" name="corp_cust_hpno" label="휴대 전화" single-line density="comfortable"/> -->
                          </div>
                        </v-col>
                        <v-col :cols="isMobile()?'12':'6'" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>이메일</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_cust_email }}
                            <!-- <VTextFieldWithValidation v-mod-el="insuranceDTO.corp_cust_email" name="corp_cust_email" label="이메일" single-line density="comfortable"/> -->
                            <!-- <v-select :items="selectbox1" variant="outlined" hide-details="auto" label="도메인 선택" single-line density="comfortable" class="ml-2"></v-select> -->
                          </div>
                        </v-col>
                        <v-col cols="12" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>사무소 주소</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.corp_addr }}&nbsp;{{
                              insuranceDTO.corp_addr_dtl
                            }}
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!-- 가입자 정보 종료 -->

                    <!-- 보험 요약 시작 -->
                    <div class="mt-2">
                      <p class="font-weight-bold text-14 mb-1 line-height-1-0">
                        <span class="color-primary">&#x275A;</span>&nbsp;보험 가입 상세
                      </p>
                      <!--기본담보 시작-->
                      <div class="mt-1">
                        <p class="text-12 font-weight-bold mb-1">
                          <span class="color-primary">&#x275A;</span>&nbsp;기본담보
                        </p>
                        <v-row class="table">
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">보험기간</div>
                            <div class="data-col">
                              {{ insuranceDTO.insr_st_dt }}(00:01) ~
                              {{ insuranceDTO.insr_cncls_dt }}(00:01)
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">소급담보일</div>
                            <div class="data-col">개인별 적용</div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">무사고 할인</div>
                            <div class="data-col" >개인별 적용</div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">인원수 할인</div>
                            <div class="data-col">{{ insuranceDTO.insr_pcnt_sale_rt }} %</div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">보상한도</div>
                            <div class="data-col">
                              {{ insuranceDTO?.insr_clm_lt_amt?.getValueBySplit(1) }} /
                              {{ insuranceDTO?.insr_year_clm_lt_amt }}
                              <span class="text-10 color-gray ml-2">(1청구당/연간총)</span>
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2 flex-wrap':'head-col flex-wrap'">자기부담금</div>
                            <div class="data-col">
                              {{ insuranceDTO?.insr_psnl_brdn_amt?.getValueBySplit(1) }}
                              <span class="text-10 color-gray ml-2">(1청구당)</span>
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">매출액구간</div>
                            <div class="data-col">
                              {{ insuranceDTO?.insr_take_sec?.getValueBySplit(1) }}
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'">
                            <div :class="isMobile()?'head-col2':'head-col'">기준보험료</div>
                            <div class="data-col">
                              {{ Number(insuranceDTO.insr_base_amt).toLocaleString() }} 원
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <div :class="isMobile()?'head-col2':'head-col'">변호사 인원수</div>
                            <div class="data-col">
                              <!-- {{ insuranceDTO.cbr_data.length }} 명 -->
                              {{ insuranceDTO.cbr_cnt  }} 명
                            </div>
                          </v-col>
                          <v-col :cols="isMobile()?'12':'6'" class="point">
                            <div :class="isMobile()?'head-col2':'head-col'">산출 보험료</div>
                            <div class="data-col">
                              {{ Number(insuranceDTO.insr_amt).toLocaleString() }} 원
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                      <ul
                          class="list-style-size-small list-style-type-disc text-11 pl-4 mt-1"
                      >
                        <li :class="isMobile()?'text-9':'text-11'">
                          보험료 입금 계좌번호 :
                          <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">신한은행 140-009-057480</b>
                          <span :class="isMobile()?'text-8 mx-3':'text-10 mx-3'" >|</span><br v-if="isMobile()"/>예금주 :
                          <b :class="isMobile()?'font-weight-medium color-error text-13 vertical-middle':'font-weight-medium color-error text-15 vertical-middle'">록톤컴퍼니즈코리아</b>
                        </li>
                        <li class="color-error line-height-1-2">
                          법인 및 사무소명으로 일괄 송금하여 주시기 바랍니다.
                        </li>
                      </ul>
                    </div>
                    <!-- 보험 요약 종료 -->


                    <!-- 변경 정보 시작 -->
                    <div class="mt-1" v-if="insuranceDTO.change_dt">
                      <p class="font-weight-bold text-14 mb-2 line-height-1-0"><span class="color-primary">&#x275A;</span>&nbsp;변경정보</p>
                      <v-row class="table">
                        <v-col cols="12" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>일자</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.change_dt }}
                          </div>
                        </v-col>
                        <v-col cols="12" class="v-col">
                          <div :class="isMobile()?'head-col2':'head-col'">
                            <p>상세</p>
                          </div>
                          <div class="data-col">
                            {{ insuranceDTO.change_rmk }}
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!-- 변경 정보 종료 -->

                    <!-- 약관동의 시작 -->
                    <div class="mt-4" v-if=isPdf>
                      <p class="font-weight-bold text-14 mb-2 line-height-1-0">
                        <span class="color-primary">&#x275A;</span>&nbsp;약관 동의
                      </p>
                      <v-row class="table vertical">
                        <v-col cols="6" class="bg-background">
                          <div class="w-70 pl-4 pr-2">신청내용 확인</div>
                          <div class="w-30 px-1 bg-white">
                            <VCheckBoxWithValidation
                                v-model="insuranceDTO.agr10_yn"
                                name="agr10_yn"
                                label="확인함 (필수)"
                                density="compact"
                                class="v-checkbox flex-grow-0 ml-auto"
                                readolny
                            />
                          </div>
                        </v-col>
                        <v-col cols="6" class="bg-background">
                          <div class="w-70 pl-4 pr-2">보험약관 확인</div>
                          <div class="w-30 px-1 bg-white">
                            <VCheckBoxWithValidation
                                v-model="insuranceDTO.agr20_yn"
                                name="agr20_yn"
                                label="확인함 (필수)"
                                density="compact"
                                class="v-checkbox flex-grow-0 ml-auto"
                                readolny
                            />
                          </div>
                        </v-col>
                        <v-col cols="6" class="bg-background">
                          <div class="w-70 pl-4 letter-spacing-030">계약 체결·이행 등을 위한 개인(신용)정보 처리 동의</div>
                          <div class="w-30 px-1 bg-white">
                            <VCheckBoxWithValidation
                                v-model="insuranceDTO.agr30_yn"
                                name="agr30_yn"
                                label="확인함 (필수)"
                                density="compact"
                                class="v-checkbox flex-grow-0 ml-auto"
                                readolny
                            />
                          </div>
                        </v-col>
                        <v-col cols="6" class="bg-background">
                          <div class="w-70 pl-4 pr-2">상품설명확인서 확인</div>
                          <div class="w-30 px-1 bg-white">
                            <VCheckBoxWithValidation
                                v-model="insuranceDTO.agr40_yn"
                                name="agr40_yn"
                                label="확인함 (필수)"
                                density="compact"
                                class="v-checkbox flex-grow-0 ml-auto"
                                readolny
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!-- 약관동의 종료 -->


                    <!--최종확인서명 시작-->
                    <div class="mt-4" v-if=isPdf>
                      <v-row class="table">
                        <v-col cols="12" class="border-bottom-gray-1 px-8 py-4">
                          <div class="w-80">
                            <p class="text-11 line-height-1-4 word-break-keep-all">
                              상기와 같이 보험계약사항을 확인하고 전문직업배상책임보험
                              가입을 신청합니다. <br />피보험자는 동 웹사이트 회원가입,
                              로그인 후 작성한 가입 신청 문서확인/개인정보처리 동의 사항
                              인증절차를 승인함으로써 피보험자 서명에 갈음한 것으로
                              동의하며 이를 확인합니다.
                            </p>
                          </div>
                          <div class="w-20 d-flex justify-end">
                            <VCheckBoxWithValidation
                                v-model="insuranceDTO.agr50_yn"
                                name="agr50_yn"
                                label="확인함 (필수)"
                                density="compact"
                                class="v-checkbox flex-grow-0"
                            />
                          </div>
                        </v-col>
                        <v-col cols="6">
                          <div class="head-col py-2">
                            <p class="text-12">가입신청일</p>
                          </div>
                          <div class="data-col py-2 justify-end pr-8">
                            <p class="text-12">{{ insuranceDTO.insr_reg_dt }}</p>
                          </div>
                        </v-col>
                        <v-col cols="6">
                          <div class="head-col py-2">
                            <p class="text-12">피보험자</p>
                          </div>
                          <div class="data-col py-2 justify-end pr-8">
                            <p class="text-12" v-if="insuranceDTO.cbr_data.length>0">{{ insuranceDTO.cbr_data[0].cbr_nm }} 외 {{insuranceDTO.cbr_cnt - 1}} 명</p>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <!--최종확인서명 종료-->
                  </main>

                  <!--footer-->
                  <footer v-if="isPdf">
                    <v-divider class="border-0 mt-4" />
                    <v-row justify="space-between" align="center">
                      <v-col :class="isMobile()?'text-10':'text-12'">
                      <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                      ><span class="mx-4 text-10">|</span
                      ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                      </v-col>
                      <v-col class="flex-grow-0">
                        <div style="width: 70px">
                          <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                        </div>
                      </v-col>
                    </v-row>
                  </footer>
                  <!--//footer-->
                </div>

              <div class="html2pdf__page-break"></div>

              <!-- 가입자명단 (PDF용)-->
              <template v-if="isPdf" v-for="chunkIndex in chunkedDivCount">
                <div :class="isPdf ? 'print-wrap' : ''">
                  <!-- header 영역 시작-->
                  <header v-if="isPdf">
                    <h1 class="text-center">
                      <p class="text-20 font-weight-bold color-primary line-height-1-2">
                        전문직업배상책임보험
                      </p>
                      <p class="text-20 font-weight-bold line-height-1-2">
                        보험가입신청서
                      </p>
                    </h1>
                  </header>
                  <!-- header 영역 종료-->

                  <main>
                    <!--가입자 명단 시작-->
                    <div class="mt-4">
                      <p class="font-weight-bold text-14"><span class="color-primary">&#x275A;</span>&nbsp;가입자 명단</p>
                      <div class="mt-1">
                        <table class="table v2 mb-1">
                          <colgroup>
                            <col :style="isMobile()?'width: 20px':'width: 40px'" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col :style="isMobile()?'width: 50px':'width: auto'" />
                          </colgroup>
                          <thead>
                          <tr>
                            <th :class="isMobile()?'text-center text-7':'text-center'">No</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">성명</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">생년월일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">등록번호</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">소급담보일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">할인할증</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">1인당 보험료</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">상태</th>
                          </tr>
                          </thead>

                          <tbody v-for="(row, index) in getCurrentChunkData(chunkIndex)" :key="index">
                          <tr>
                            <td :class="isMobile()?'text-7':''">{{ ((chunkIndex - 1 ) * chunkSize) +  index + 1 }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_nm }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_brdt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_regno }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_retr_dt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_sale_rt }} %</td>
                            <td :class="isMobile()?'text-7':''">
                              {{ Number(row?.insr_amt)?.toLocaleString() }}원
                            </td>
                            <td v-if="insuranceDTO.status_cd !== '10'"> {{  statusCdItems.find(code => code.value ==  row.status_cd)?.title}}</td>
                            <td v-else></td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!--가입자 명단 종료 -->
                  </main>

                  <!-- footer 영역 시작-->
                  <footer v-if="isPdf">
                    <v-divider class="border-0 mt-4" />
                    <v-row justify="space-between" align="center">
                      <v-col :class="isMobile()?'text-10':'text-12'">
                          <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
                          ><span class="mx-4 text-10">|</span
                      ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
                      </v-col>
                      <v-col class="flex-grow-0">
                        <div style="width: 70px">
                          <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
                        </div>
                      </v-col>
                    </v-row>
                  </footer>
                  <!-- footer 영역 종료-->
                </div>
              </template>

              <!-- 가입자명단 (신청보기용)-->
              <template v-if="!isPdf">
                <div :class="isPdf?'print-wrap':''">
                  <main>
                    <div class="mt-4">
                      <p class="font-weight-bold text-14"><span class="color-primary">&#x275A;</span>&nbsp;가입자 명단</p>
                      <div class="table mt-1">
                        <table class="table v2 mb-1">
                          <colgroup>
                            <col :style="isMobile()?'width: 20px':'width: 40px'" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col style="width: auto" />
                            <col :style="isMobile()?'width: 50px':'width: auto'" />
                          </colgroup>
                          <thead>
                          <tr>
                            <th :class="isMobile()?'text-center text-7':'text-center'">No</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">성명</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">생년월일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">등록번호</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">소급담보일</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">할인할증</th>
                            <th :class="isMobile()?'text-center text-7':'text-center'">1인당 보험료</th>
                          </tr>
                          </thead>
                          <tbody v-if="insuranceDTO.cbr_data.length">
                          <tr v-for="(row, index) in insuranceDTO.cbr_data">
                            <td :class="isMobile()?'text-7':''">{{ index + 1 }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_nm }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_brdt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.cbr_regno }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_retr_dt }}</td>
                            <td :class="isMobile()?'text-7':''">{{ row.insr_sale_rt }} %</td>
                            <td :class="isMobile()?'text-7':''">
                              {{ row?.insr_amt?.toLocaleString() }}원
                            </td>
                          </tr>
                          </tbody>
                          <tbody v-else>
                          <tr>
                            <td colspan="7" class="text-center">내용 없음</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </main>

                </div>
              </template>
              <!-- 가입자명단 (가입신청서)-->

            </div>
          </div>

            
        </div>
        <!-- footer 영역 시작-->
        <footer v-if="!isPdf">
          <v-divider class="border-0 mt-4" />
          <v-row justify="space-between" align="center">
            <v-col :class="isMobile()?'text-10':'text-12'">
              <span>문의처 : 록톤컴퍼니즈코리아손해보험중개㈜</span
              ><span class="mx-4 text-10">|</span
              ><br v-if="isMobile()"/><span>대표전화 : 02.2011.0300</span>
            </v-col>
            <v-col class="flex-grow-0">
              <div style="width: 70px">
                <img src="/assets/Lockton_Logo_Black_simbol.png" class="w-100" />
              </div>
            </v-col>
          </v-row>
        </footer>
        <!-- footer 영역 종료-->
        <!-- PDF 출력 영역 종료-->

        <div v-if=isPdf>
          <iframe :src="pdfUrl" width="100%" height="800px"></iframe>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch  } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { InsuranceDTO, CommonCode } from '@/model';

import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';

import apiADV0030a from '@/api/api/A_TADV0030A';
import html2pdf from 'html2pdf.js';

import '../../../assets/css/printpdf.css';

import {useMobileStore} from "@/stores";
const checkMobile = useMobileStore();

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);
const isAdmin = _AUTH_ADMIN.value === null ? false: true;


const props = defineProps({
  insurance_uuid: {
    type: String,
    required: false
  },

  insurance_dto: {
    type: InsuranceDTO,
    required: false
  },

  isPdf: {
    type: Boolean,
    required: false
  },
  isNotAuth: {
    type: Boolean,
    required: false,
    default: false
  }
});


const pdfUrl = ref(null);
const isNotAuth = ref(false);
const isOpenDialog = ref(true);

const statusCdItems = ref([""]);
const corpTypeItems = ref([]);
const relief = ref(0);

const emit = defineEmits(['close']);

const close = () => {
  isOpenDialog.value = false;
  emit('close');
};

const isPdf = ref(false);
const isHistory = ref(false);
const insuranceDTO = ref(new InsuranceDTO(props.insurance_dto));

const chunkSize = 34;

const chunkedDivCount = computed(() => {
  
  const nCnt = Math.ceil(insuranceDTO.value.cbr_cnt / chunkSize);
  return nCnt;

});


const insrItems = ref([]);
const insrItemValue = ref();
const resultData = ref();

const isMobile = () => {
  return checkMobile.isMobile && !isPdf.value
}

const getCurrentChunkData = (chunkIndex) => {
  chunkIndex = chunkIndex - 1;
  const start = chunkIndex * chunkSize;
  const end = start + chunkSize;
  return insuranceDTO.value.cbr_data.slice(start, end);
};


const insrItemChange = (item) => {
  Object.assign(insuranceDTO.value, resultData.value.data[item.value]);
  onExportPDF('view');
}

const onExportPDF = (viewType: string) => {
  let pdfPassword = "";

  if (insuranceDTO.value.user_cd === 'IND') {
    pdfPassword = insuranceDTO.value.user_birth;
  } else if (insuranceDTO.value.user_cd === 'JNT') {
    pdfPassword = insuranceDTO.value.corp_cnno.slice(-5);
  }

  
  let opt = {
    margin: [0, 9, 0, 9],
    filename: '가입신청서_변호사배상책임보험.pdf',
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy']
    },
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      useCORS: true,
      scrollY: 0,
      scale: 2,
      dpi: 300,
      letterRendering: true,
      allowTaint: false
    },
    jsPDF: {     
      orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  if (!isNotAuth.value) {
    opt.jsPDF.encryption = {
      userPassword: pdfPassword,
      ownerPassword: pdfPassword,
      userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
      encryptionAlgorithm: 'aes',
      keyLength: 128
    };
  }
  
  if (isAdmin) {
    opt.jsPDF.encryption = {};
  }
  

  const printDiv = document.getElementById('printDiv');

  if (viewType == 'down') {
    html2pdf().set(opt).from(printDiv).save();
  } else {
    html2pdf()
      .set(opt)
      .from(printDiv)
      .toPdf()
      .get('pdf')
      .then(pdfObj => {
        pdfUrl.value = URL.createObjectURL(pdfObj.output('blob'));
        isOpenDialog.value = true;
      });
  }
};

onMounted(async () => {
  statusCdItems.value = await CommonCode.getCodeList('COM030');
  corpTypeItems.value = await CommonCode.getCodeList('COM050');

  isPdf.value = props.isPdf;
  isNotAuth.value = props.isNotAuth;
  if (props.insurance_uuid) {
    const params = { insurance_uuid: props.insurance_uuid };
    resultData.value = await apiADV0030a.getDBSelHistory(params, isAdmin);
    Object.assign(insuranceDTO.value, resultData.value.data[0]);

    resultData.value.data.forEach((item, index) => {
      const title = index === 0 ? `최종보험 : ${item?.insr_reg_dt}` : `변경이력 : ${item?.change_dt}`;
      const value = index;
      insrItems.value.push({ title, value });
    });

    isHistory.value = resultData.value.data.length > 1 ? true : false;
  } else {
   
  }

  if(isPdf.value) {
    onExportPDF('view');
  }

});

</script>