<template>
  <div class="d-flex align-center">
    <p class="text-h6 color-primary subtitle mr-2">{{ businessCdItems?.find(items => items.value === searchParams.data['business_cd'])?.title }}</p>
    <div class="w-100">
      <AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></AdminBaseBreadcrumb>
    </div>
  </div>

  <div v-if="['ADV', 'TAX','ACC'].includes(searchParams.data['business_cd'])">
    <v-row>
      <v-col cols="12">
        <ul class="v-search-box">
          <!-- <li>
            <span>사이트 구분<sup class="text-error ml-1">*</sup></span>
            <v-select v-model="searchParams.data['business_cd']" :items="businessCdItems" variant="outlined" hide-details density="compact" item-text="title" item-value="value" readonly></v-select>
          </li> -->
          <li class="date">
            <span>보험년도<sup class="text-error ml-1">*</sup></span>
            <v-select v-model="searchParams.data['insr_year']" :items="insrYearCdItems" variant="outlined" hide-details density="compact" item-text="title" item-value="value"></v-select>
          </li>
          <li>
            <span>가입 유형</span>
            <v-select v-model="searchParams.data['user_cd']" :items="userCdItems" variant="outlined" hide-details density="compact"></v-select>
          </li>
          <li>
            <span>상태<sup class="text-error ml-1">*</sup></span>
            <v-select v-model="searchParams.data['status_cd']" :items="statusCdItems" variant="outlined" hide-details density="compact" item-text="title" item-value="value"></v-select>
          </li>
          <li>
            <span>피보험자<sup class="text-error ml-1">*</sup></span>
            <v-text-field v-model="searchParams.data['user_nm']" type="text" variant="outlined" hide-details="auto" density="compact" single-line class="text-body-2" placeholder="피보험자" @keyup.enter="fnSearch(true)" />
          </li>
          <li class="ml-auto">
            <v-btn variant="flat" @click="fnSearch(true)">조회</v-btn>
          </li>
        </ul>
        <v-card>
          <v-card-title class="d-flex align-center flex-wrap px-0">
            <h2 class="font-weight-bold">
              <svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 결과
            </h2>
            <p class="text-body-2 ml-3 pt-1">
              전체 <span class="color-primary font-weight-bold">{{ Number(InsuranceList.length).toLocaleString() }}</span> 건
            </p>
            <v-btn icon color="white" size="small" @click="resultShowHide">
              <vue-feather id="eyeIcon" :type="iconState" size="20"></vue-feather>
            </v-btn>
            <div class="ml-auto">
              <v-btn variant="outlined" size="small" @click="fnAdd('IND')" class="mx-1">개인 신규</v-btn>
              <v-btn variant="outlined" size="small" @click="fnAdd('COR')" class="mx-1">법인 신규</v-btn>
              <v-btn variant="outlined" size="small" @click="fnAdd('JNT')" class="mx-1">합동 신규</v-btn>
            </div>
          </v-card-title>
          <v-card-text class="pa-0 v-result-box">
            <v-table density="compact" fixed-header height="220px" v-if="resultAreaState">
              <caption class="d-none">
                계약 조회 결과
              </caption>
              <colgroup>
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: 120px" />
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
                <!-- <col style="width: auto" /> -->
                <col style="width: auto" />
                <col style="width: auto" />
                <col style="width: auto" />
              </colgroup>
              <thead>
              <tr>
                <th>번호</th>
                <th>구분</th>
                <th>보험년도</th>
                <th>피보험자</th>
                <th>등록번호</th>
                <th>사업자번호</th>
                <th>회원ID</th>
                <th>보험기간</th>
                <!-- <th>소속<br />지방회</th> -->
                <th>총보험료</th>
                <th>미납금액</th>
                <th>상태</th>
              </tr>
              </thead>
              <tbody v-if="InsuranceList.length" class="">
              <tr v-for="(row, index) in InsuranceList" :key="index" @click="selectedRow = row" @click.prevent="fnSearchDtl(row.insurance_uuid)" :class="{ selected: selectedRow === row, 'cursor-pointer': true }">
                <td>{{ index + 1 }}</td>
                <td>{{ row.user_cd_nm }}</td>
                <td>{{ row.insr_year }}</td>
                <td>{{ row.user_nm }}</td>
                <td>{{ row.user_regno }}</td>
                <td>{{ row.corp_cnno }}</td>
                <td>{{ row.user_id }}</td>
                <td>{{ row.insr_st_dt }} ~ {{ row.insr_cncls_dt }}</td>
                <!-- <td>{{ row.corp_region_nm }}</td> -->
                <td>{{ Number(row?.insr_tot_amt).toLocaleString() }}</td>
                <td style="color: {{ row?.insr_tot_unpaid_amt < 0 ? 'text-error' : 'text-black' }}">
                  {{ Number(row?.insr_tot_unpaid_amt) === 0 ? '-' : Number(row?.insr_tot_unpaid_amt).toLocaleString() }}
                </td>
                <td :style='(row.status_cd =="30")?"color:#d6caca;":""'>{{ row.status_nm }}</td>
              </tr>
              </tbody>
              <tbody v-else>
              <tr>
                <td colspan="12" class="text-center align-middle">조회할 내용이 없습니다.</td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <!-- 계약 상세 조회 시작 -->
        <div class="d-flex align-center mb-3">
          <h2 class="font-weight-bold">
            <svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세
          </h2>
        </div>
        <v-row v-if="insuranceDTO.insurance_uuid">
          <!--좌측 영역-->
          <v-col cols="11">
            <v-expansion-panels multiple v-model="panel" class="v-panel-admin mb-6">
              <v-row>
                <!--가입정보-->
                <v-col cols="12" class="pb-0" ref="refPage1">
                  <v-card>
                    <v-expansion-panel elevation="0" value="panel-1">
                      <v-card-title>
                        <h3 class="font-weight-bold">가입 정보</h3>
                        <v-spacer />
                        <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                      </v-card-title>
                      <v-expansion-panel-text>
                        <v-card-text>
                          <!--개인 시작-->
                          <v-row class="v-board-table size-x-small" v-if="insuranceDTO.user_cd == 'IND'">
                            <v-col cols="12" sm="4" class="v-col">
                              <div class="head-col">
                                <p>이름</p>
                                <sup class="text-error">*</sup>
                              </div>
                              <div class="data-col">
                                <!-- {{ insuranceDTO.user_nm }} -->
                                <VTextFieldWithValidation v-model="insuranceDTO.user_nm" name="user_nm" placeholder="이름" single-line maxlength="25" />
                              </div>
                            </v-col>
                            <v-col cols="12" sm="4" class="v-col">
                              <div class="head-col">
                                <p>생년월일</p>
                                <sup class="text-error">*</sup>
                              </div>
                              <div class="data-col">
                                <!-- {{ insuranceDTO.user_birth }} -->
                                <VTextFieldWithValidation v-model="insuranceDTO.user_birth" name="user_birth" placeholder="생년월일" single-line :maskOption="{ mask: '######' }" type="date" />
                              </div>
                            </v-col>
                            <v-col cols="12" sm="4" class="v-col">
                              <div class="head-col">
                                <p>등록번호</p>
                                <sup class="text-error">*</sup>
                              </div>
                              <div class="data-col">
                                <!-- {{ insuranceDTO.user_regno }} -->
                                <VTextFieldWithValidation v-model="insuranceDTO.user_regno" name="user_regno" placeholder="등록번호" single-line :maskOption="{ mask: '#######' }" type="date" />
                              </div>
                            </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>휴대전화</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_hpno" name="corp_cust_hpno" single-line :maskOption="{ mask: '###-####-####' }" />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사무소명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_nm" name="corp_nm" placeholder="사무소명" single-line maxlength="20" />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사업자번호</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cnno" name="corp_cnno" placeholder="사업자번호" :maskOption="{ mask: '###-##-#####' }" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사무소 전화</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_telno" name="corp_telno" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사무소 팩스</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_faxno" name="corp_faxno" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>담당자 성명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_nm" name="corp_cust_nm" placeholder="담당자 성명" single-line maxlength="20" />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col" v-if="insuranceDTO.business_cd === 'TAX'">
                            <div class="head-col">
                              <p>소속 지방회</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" single-line density="compact"></VSelectWithValidation>
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>이메일</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_email" name="corp_cust_email" placeholder="이메일" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>사무소 주소<sup class="text-error">*</sup></p>
                            </div>
                            <div class="data-col w-full">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_post" name="corp_post" placeholder="우편번호" single-line class="w-229" />
                              <v-btn variant="outlined" color="primary" @click="isDaumPostDialog = true" class="ml-1">사무소 주소검색</v-btn>
                              <div class="d-flex flex-grow-1 w-full">
                                <VTextFieldWithValidation v-model="insuranceDTO.corp_addr" name="corp_addr" placeholder="주소" single-line class="w-60" maxlength="40" />
                                <VTextFieldWithValidation v-model="insuranceDTO.corp_addr_dtl" name="corp_addr_dtl" placeholder="상세주소" single-line class="w-40" maxlength="25" />
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                        <!-- 개인 끝-->

                        <!-- 법인/합동 시작-->
                        <v-row class="v-board-table size-x-small" v-if="insuranceDTO.user_cd === 'COR' || insuranceDTO.user_cd === 'JNT'">
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>법인명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <!-- {{ insuranceDTO.user_nm }} -->
                              <VTextFieldWithValidation v-model="insuranceDTO.user_nm" name="user_nm" placeholder="법인명" single-line max-length="20" />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>대표자 성명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <!-- {{ insuranceDTO.corp_ceo_nm }} -->
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_ceo_nm" name="corp_ceo_nm" placeholder="대표자 성명" single-line max-length="20" />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>법인번호</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col" v-if="insuranceDTO.corp_type != 'JNT'">
                              <!-- {{ insuranceDTO.corp_bnno }} -->
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_bnno" name="corp_bnno" placeholder="법인번호" single-line :maskOption="{ mask: '######-#######' }" />
                            </div>
                            <div class="data-col" v-if="insuranceDTO.corp_type == 'JNT'">해당없음</div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사업자번호</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <!-- {{ insuranceDTO.corp_cnno }} -->
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cnno" name="corp_cnno" placeholder="사업자번호" single-line :maskOption="{ mask: '###-##-#####' }" />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사무소 전화</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_telno" name="corp_telno" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사무소 팩스</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_faxno" name="corp_faxno" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>담당자 성명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_nm" name="corp_cust_nm" placeholder="담당자 성명" single-line maxlength="20" />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>휴대전화</p>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_hpno" name="corp_cust_hpno" :maskOption="{ mask: '###-####-####' }" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>이메일</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_email" name="corp_cust_email" placeholder="이메일" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>소속 지방회</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" density="compact" single-line></VSelectWithValidation>
                            </div>
                          </v-col>

                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>사무소 주소<sup class="text-error">*</sup></p>
                            </div>
                            <div class="data-col w-full">
                              <VTextFieldWithValidation v-model="insuranceDTO.corp_post" name="corp_post" placeholder="우편번호" single-line class="w-229" />
                              <v-btn variant="outlined" color="primary" @click="isDaumPostDialog = true" class="ml-1">사무소 주소검색</v-btn>
                              <div class="d-flex flex-grow-1 w-full">
                                <VTextFieldWithValidation v-model="insuranceDTO.corp_addr" name="corp_addr" placeholder="주소" single-line class="w-60" maxlength="40" />
                                <VTextFieldWithValidation v-model="insuranceDTO.corp_addr_dtl" name="corp_addr_dtl" placeholder="상세주소" single-line class="w-40" maxlength="25" />
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                        <!-- 법인/합동 끝-->
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>

              <!--보험계약-->
              <v-col cols="12" class="pb-0" ref="refPage2">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-2">
                    <v-card-title>
                      <h3 class="font-weight-bold">보험 계약</h3>
                      <v-spacer />
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text>
                        <v-row>
                          <!-- 보험 기본정보1 -->
                          <v-col cols="4">
                            <v-row class="v-board-table size-x-small">
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보험년도</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_year" name="insr_year" placeholder="가입년도" suffix="년" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>신청일자</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col" :style='(insuranceDTO.insr_reg_dt >= stockStartDt)?"color:blue;":"color:black"'>
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_reg_dt" name="insr_reg_dt" placeholder="신청일자" type="date" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보험시작일</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col" :style='(insuranceDTO.insr_st_dt >= stockStartDt)?"color:blue;":"color:black"'>
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_st_dt" name="insr_st_dt" placeholder="보험시작일자" type="date" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보험종료일</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col" :style='(insuranceDTO.insr_cncls_dt >= stockStartDt)?"color:blue;":"color:black"'>
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_cncls_dt" name="insr_cncls_dt" placeholder="보험종료일자" type="date" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p v-if="insuranceDTO.user_cd === 'IND'">소급담보일</p>
                                  <p v-if="insuranceDTO.user_cd === 'COR'">법인 소급담보일</p>
                                  <p v-if="insuranceDTO.user_cd === 'JNT'">소급담보일</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col" :style='(insuranceDTO.insr_retr_dt >= stockStartDt)?"color:blue;":"color:black"'>
                                  <!-- {{ insuranceDTO.insr_retr_dt }} -->
                                  <!-- 2023-12-12 세무사,회계사,변호사 경우 변호사 합동인 경우만 해당없음으로 표시되어야 함-->
                                  <VTextFieldWithValidation v-if="insuranceDTO.business_cd !== 'ADV' || (insuranceDTO.business_cd == 'ADV' && insuranceDTO.user_cd !== 'JNT')" v-model="insuranceDTO.insr_retr_dt" name="insr_retr_dt" placeholder="소급담보일" type="date" single-line />
                                  <span v-else class="pl-2"> 해당없음</span>
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>소급 적용</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VCheckBoxWithValidation v-model="insuranceDTO.insr_retr_yn" name="insr_retr_yn" label="소급여부" class="v-checkbox" density="compact" />
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>

                          <!-- 보험 ADV 기본정보2 -->
                          <v-col cols="4" v-if="route.params.business_cd == 'ADV'">
                            <v-row class="v-board-table size-x-small">
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>매출액구간</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.insr_take_sec" name="insr_take_sec" label="공동보험" :items="insrTakesSectionItems" single-line density="compact"></VSelectWithValidation>
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보상한도</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.insr_clm_lt_amt" name="insr_clm_lt_amt" label="보상한도" :items="insrClmLtAmtItems" single-line density="compact"></VSelectWithValidation>
                                  <v-divider class="border-0" />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>자기부담금</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.insr_psnl_brdn_amt" name="insr_psnl_brdn_amt" label="자기부담금" :items="insrPsnlBrdnAmtItems" density="compact" single-line></VSelectWithValidation>
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보상한도(연간총)</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_year_clm_lt_amt" name="insr_year_clm_lt_amt" label="" single-line />
                                </div>
                              </v-col>
                              <v-divider class="border-0" />
                              <!-- <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'" >
										<div class="head-col">
										<p>인원수</p>
										<sup class="text-error">*</sup>
										</div>
										<div class="data-col">
										<VTextFieldWithValidation v-model="insuranceDTO.cbr_cnt" name="cbr_cnt" label="" type="number" suffix="명" single-line/>
										</div>
									</v-col> -->
                              <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR' || insuranceDTO.user_cd === 'JNT'" >
                                <div class="head-col">
                                  <p>인원수 할인</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_pcnt_sale_rt" name="insr_pcnt_sale_rt" label="" type="number" suffix="%" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>할인할증기준</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_year" name="insr_sale_year" label="" type="number" suffix="년" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p v-if="insuranceDTO.user_cd == 'IND'">무사고 할인 /<br />사고 할증</p>
                                  <p v-if="insuranceDTO.user_cd != 'IND'">무사고 할인</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col text-center">
                                  <!-- {{ insuranceDTO.insr_sale_rt }} % -->
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_rt" name="insr_sale_rt" label="" type="number" suffix="%" single-line />
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>
                          <!-- 보험 TAX, ACC 기본정보2 -->
                          <v-col cols="4" v-else>
                            <v-row class="v-board-table size-x-small">
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>공동보험</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.insr_pblc_brdn_rt" name="insr_pblc_brdn_rt" label="공동보험" :items="insrPblcBrdnRtItems" single-line density="compact"></VSelectWithValidation>
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보상한도</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.insr_clm_lt_amt" name="insr_clm_lt_amt" label="보상한도" :items="insrClmLtAmtItems" single-line density="compact"></VSelectWithValidation>
                                  <v-divider class="border-0" />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>자기부담금</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.insr_psnl_brdn_amt" name="insr_psnl_brdn_amt" label="자기부담금" :items="insrPsnlBrdnAmtItems" density="compact" single-line></VSelectWithValidation>
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보상한도(연간총)</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_year_clm_lt_amt" name="insr_year_clm_lt_amt" label="" single-line />
                                </div>
                              </v-col>
                              <v-divider class="border-0" />
                              <!-- <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'" >
										<div class="head-col">
										<p>인원수</p>
										<sup class="text-error">*</sup>
										</div>
										<div class="data-col">
										<VTextFieldWithValidation v-model="insuranceDTO.cbr_cnt" name="cbr_cnt" label="" type="number" suffix="명" single-line/>
										</div>
									</v-col> -->
                              <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'">
                                <div class="head-col">
                                  <p>인원수 할인</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_pcnt_sale_rt" name="insr_pcnt_sale_rt" label="" type="number" suffix="%" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>할인할증기준</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_year" name="insr_sale_year" label="" type="number" suffix="년" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p v-if="insuranceDTO.user_cd == 'IND'">무사고 할인 /<br />사고 할증</p>
                                  <p v-if="insuranceDTO.user_cd != 'IND'">무사고 할인</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col text-center">
                                  <!-- {{ insuranceDTO.insr_sale_rt }} % -->
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_rt" name="insr_sale_rt" label="" type="number" suffix="%" single-line />
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>
                          <!-- 보험 요금정보 -->
                          <v-col cols="4">
                            <v-row class="v-board-table size-x-small">
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>기준보험료</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_base_amt" name="insr_sale_rt" label="" type="number" suffix="원"  single-line />
                                </div>
                              </v-col>

                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>합계보험료</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_amt" name="insr_amt" label="" type="number" suffix="원"  single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>최종보험료</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_tot_amt" name="insr_tot_amt" label="" type="number" suffix="원"  single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>총입금액</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_tot_paid_amt" name="insr_tot_paid_amt" label="" type="number" suffix="원" readonly single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>차액</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.insr_tot_unpaid_amt" @change="changeTotUnpaidAmt(this)" name="insr_tot_unpaid_amt" label="" type="number" suffix="원" readonly single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>상태</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.status_cd" name="status_cd" label="상태" :items="statusCdItems" single-line density="compact"></VSelectWithValidation>
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>

              <!-- 특별약관 -->
              <v-col cols="12" class="pb-0" ref="refPage3"  v-if="route.params.business_cd == 'ADV'">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-3">
                    <v-card-title>
                      <h3 class="font-weight-bold">특별 약관</h3>
                      <div class="data-col">
                        <VCheckBoxWithValidation v-model="insuranceDTO.spct_join_yn" name="spct_join_yn" label="특약가입 여부" class="v-checkbox" density="compact" />
                      </div>
                      <v-spacer />
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text>
                        <v-row>
                          <!-- 보험 기본정보1 -->
                          <v-col cols="6">
                            <v-row class="v-board-table size-x-small">
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>특약명</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <input type="text" value="고용직원 부정직행위 담보 특별약관 (Dishonesty Extension)" disabled style="font-size: 13px; width :400px"/>
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>보상한도(1청구당/연간총)</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.spct_data.insr_clm_lt_amt" name="spct_data_insr_clm_lt_amt" label="보상한도" :items="insrSpctClmLtAmtItems" single-line density="compact"></VSelectWithValidation>
                                  <v-divider class="border-0" />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>사무원 인원수</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.spct_data.cbr_cnt" name="spct_data_cbr_cnt" label="사무원 인원수" type="number" suffix="명" single-line />
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>

                          <!-- 보험 ADV 기본정보2 -->
                          <v-col cols="6" v-if="route.params.business_cd == 'ADV'">
                            <v-row class="v-board-table size-x-small">
                              <v-col cols="12" class="v-col">
<!--                                <div class="head-col">
                                  <p>특약가입여부</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <v-btn-toggle
                                      v-model="insuranceDTO.spct_join_yn"
                                      divided
                                      variant="outlined"
                                      class="w-100"
                                      style="height: 33px !important;"
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
                                </div>--><!--                                <div class="head-col">
                                  <p>특약가입여부</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <v-btn-toggle
                                      v-model="insuranceDTO.spct_join_yn"
                                      divided
                                      variant="outlined"
                                      class="w-100"
                                      style="height: 33px !important;"
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
                                </div>-->
                                <div class="head-col">
                                  <p>소급담보일</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.spct_data.insr_retr_dt" name="spct_data_insr_retr_dt" label="소급담보일" type="date" single-line />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>자기부담금</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VSelectWithValidation v-model="insuranceDTO.spct_data.insr_psnl_brdn_amt" name="spct_data_insr_psnl_brdn_amt" label="자기부담금" :items="insrSpctPsnlBrdnAmtItems" single-line density="compact"></VSelectWithValidation>
                                  <v-divider class="border-0" />
                                </div>
                              </v-col>
                              <v-col cols="12" class="v-col">
                                <div class="head-col">
                                  <p>특약보험료</p>
                                  <sup class="text-error">*</sup>
                                </div>
                                <div class="data-col">
                                  <VTextFieldWithValidation v-model="insuranceDTO.spct_data.insr_amt" name="spct_data_insr_amt" label="자기부담금" type="number" suffix="원" single-line />
                                </div>
                              </v-col>

                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>
              <!--세무사 명단-->
              <v-col cols="12" class="pb-0" ref="refPage4" v-if="insuranceDTO.user_cd === 'COR' || insuranceDTO.user_cd === 'JNT'">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-4">
                    <v-card-title>
                      <h3 class="font-weight-bold" v-if="route.params.business_cd == 'TAX'">세무사 명단</h3>
                      <h3 class="font-weight-bold" v-if="route.params.business_cd == 'ADV'">변호사 명단</h3>
                      <p class="text-body-2 color-gray-shadow ml-4">
                        총
                        <span class="color-primary" v-if="route.params.business_cd == 'TAX'">{{ validUserCount }}</span>
                        <span class="color-primary" v-if="route.params.business_cd == 'ADV'">{{ validUserCount }}</span>명
                      </p>
                      <v-spacer />
                      <v-btn variant="elevated" color="white" size="small" class="min-width-auto pa-0 mr-2" @click="fnAddCBR()">
                        <vue-feather type="plus-square" class="text-primary cursor-pointer vertical-align-middle"></vue-feather>
                      </v-btn>
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text>
                        <v-table class="v-board-table size-x-small type-horizontal">
                          <colgroup>
                            <col style="width: 40px" />
                            <col style="width: 100px" />
                            <col style="width: 70px" />
                            <col style="width: 80px" />
                            <col style="width: 80px" />
                            <col style="width: 50px" />
                            <col style="width: 120px" />
                            <col style="width: auto" />
                            <col style="width: 80px" />
                            <col style="width: 80px" />
                            <col style="width: 100px" />
                            <col style="width: 40px" />
                          </colgroup>
                          <thead>
                          <tr>
                            <th>No</th>
                            <th>상태</th>
                            <th>성명</th>
                            <th>생년월일</th>
                            <th>등록번호</th>
                            <th>소급<br />적용</th>
                            <th>소급담보일</th>
                            <th>보험기간</th>
                            <th>할인할증기준</th>
                            <th>할인할증</th>
                            <th>1인당 보험료</th>
                            <th></th>
                          </tr>
                          </thead>
                          <tbody class="text-center">
                          <tr v-for="(row, index) in insuranceDTO.cbr_data" >
                            <td>{{ index + 1 }}</td>
                            <td :style='(row.status_cd =="80")?"color:black;":"color:red"'>
                              <VSelectWithValidation v-model="row.status_cd"  @update:modelValue="fnChangeStatus" name="status_cd" label="" color="primary" density="compact" :items="statusCdItems" variant="outlined" single-line></VSelectWithValidation>
                            </td>
                            <td :style='(row.status_cd =="80")?"color:black;":"color:red"'>
                              <VTextFieldWithValidation v-model="row.cbr_nm" name="cbr_nm" label="" density="compact" color="primary" variant="outlined" single-line />
                            </td>
                            <td>
                              <VTextFieldWithValidation v-model="row.cbr_brdt" name="cbr_brdt" label="" density="compact" color="primary" variant="outlined" :maskOption="{ mask: '######' }" single-line />
                            </td>
                            <td>
                              <VTextFieldWithValidation v-model="row.cbr_regno" name="cbr_regno" label="" color="primary" density="compact" variant="outlined" :maskOption="{ mask: '#######' }" single-line />
                            </td>
                            <td>
                              <VCheckBoxWithValidation v-model="row.insr_retr_yn" name="insr_retr_yn" label="" class="d-inline-block" density="compact" />
                            </td>
                            <td :style='(row.insr_retr_dt >= stockStartDt)?"color:blue;":"color:black"'>
                              <VTextFieldWithValidation v-model="row.insr_retr_dt" name="insr_retr_dt" label="" type="date" color="primary" density="compact" variant="outlined" single-line />
                            </td>
                            <td :style='(row.insr_st_dt >= stockStartDt)?"color:blue;":"color:black"'>
                              <div class="d-flex align-center">
                                <VTextFieldWithValidation v-model="row.insr_st_dt" name="insr_st_dt" label="" type="date" color="primary" density="compact" variant="outlined" single-line /><span class="mx-1">~</span
                              ><VTextFieldWithValidation v-model="row.insr_cncls_dt" name="insr_cncls_dt" label="" color="primary" density="compact" type="date" variant="outlined" single-line />
                              </div>
                            </td>
                            <td>
                              <VTextFieldWithValidation v-model="row.insr_sale_year" name="insr_sale_year" label="" density="compact" color="primary" variant="outlined" type="number" suffix="년" single-line />
                            </td>
                            <td>
                              <VTextFieldWithValidation v-model="row.insr_sale_rt" name="insr_sale_rt" label="" density="compact" color="primary" variant="outlined" type="number" suffix="%" single-line />
                            </td>
                            <td>
                              <VTextFieldWithValidation v-model="row.insr_amt" name="insr_amt" label="" density="compact" color="primary" variant="outlined" type="number" suffix="원" single-line />
                            </td>
                            <td>
                              <v-btn variant="elevated" color="white" size="small" class="min-width-auto pa-0" @click="fnDelCBR(index)">
                                <vue-feather type="minus-square" class="text-gray cursor-pointer vertical-align-middle"></vue-feather>
                              </v-btn>
                            </td>
                          </tr>
                          </tbody>
                        </v-table>
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>

              <!-- 담보한정 시작 -->
              <v-col cols="12" class="pb-0" ref="refPage5">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-5">
                    <v-card-title class="d-flex justify-space-between pa-0">
                      <h3 class="font-weight-bold">담보한정</h3>
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text class="pa-0">
                        <v-row class="v-board-table size-x-small">
                          <v-col cols="12" class="v-col">
                            <div class="head-col align-baseline">
                              <p>상세내용</p>
                            </div>
                            <div class="data-col align-baseline">
                              <VTextFieldWithValidation v-model="insuranceDTO.limited_collateral" name="limited_collateral" single-line />
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>
              <!-- 담보한정 종료 -->

              <!-- 변경정보 시작 -->
              <v-col cols="12" class="pb-0" ref="refPage6">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-6">
                    <v-card-title class="d-flex justify-space-between pa-0">
                      <h3 class="font-weight-bold">변경정보</h3>
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text class="pa-0">
                        <v-row class="v-board-table size-x-small">
                          <v-col cols="3" class="v-col">
                            <div class="head-col align-baseline">
                              <p>변경일자</p>
                            </div>
                            <div class="data-col align-baseline">
                              <VTextFieldWithValidation v-model="insuranceDTO.change_dt" name="change_dt" label="변경일자" type="date" single-line />
                            </div>
                          </v-col>
                          <v-col cols="9" class="v-col">
                            <div class="head-col align-baseline">
                              <p>상세내용</p>
                            </div>
                            <div class="data-col align-baseline">
                              <VTextFieldWithValidation v-model="insuranceDTO.change_rmk" name="change_rmk" single-line />
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>
              <!-- 변경정보 종료 -->

              <!-- 변경신청상세 추가예정 -->
              <v-col cols="12" class="pb-0" ref="refPage7">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-7">
                    <v-card-title>
                      <h3 class="font-weight-bold">변경신청상세</h3>
                      <v-spacer />
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text> 변경신청상세 내역 추가 예정 </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>

              <!--입금 처리-->
              <v-col cols="12" class="pb-0" ref="refPage8">
                <v-card>
                  <v-card-title class="d-flex flex-wrap px-0 pt align-center">
                    <h2 class="font-weight-bold">
                      <svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>입금내역
                    </h2>
                    <p class="text-body-2 ml-3 pt-1">
                      전체 <span class="color-primary font-weight-bold">{{ Number(insuranceDTO?.trx_data.length).toLocaleString() }}</span> 건
                    </p>
                    <div class="ml-auto">
                      <v-btn variant="outlined" size="small" class="mr-1" type="file" @click="fnExcelUpload('IND')">개인엑셀 입금</v-btn>
                      <v-btn variant="outlined" size="small" class="mr-1" type="file" @click="fnExcelUpload('COR')">법인엑셀 입금</v-btn>
                      <v-btn variant="outlined" size="small" class="mr-1" type="file" @click="fnExcelUpload('JNT')">합동엑셀 입금</v-btn>
                      <v-btn variant="outlined" size="small" class="mr-1" @click="fnAutoTRX()">간편 입금</v-btn>
                      <v-btn variant="outlined" size="small" @click="fnAddTrx()">신규 입금</v-btn>
                      <input type="file" ref="fileInputIND" @change="handleFileUploadIND" style="display: none" />
                      <input type="file" ref="fileInputCOR" @change="handleFileUploadCOR" style="display: none" />
                    </div>
                  </v-card-title>
                  <v-card-text class="pa-0">
                    <v-table class="v-board-table size-x-small">
                      <colgroup>
                        <col style="width: 40px" />
                        <col style="width: 130px" />
                        <col style="width: 150px" />
                        <col style="width: 200px" />
                        <col style="width: 180px" />
                        <col style="width: auto" />
                        <col style="width: 40px" />
                      </colgroup>
                      <thead>
                      <tr>
                        <th class="text-center">순번</th>
                        <th class="text-center">구분</th>
                        <th class="text-center">일자</th>
                        <th class="text-center">금액</th>
                        <th class="text-center">성명</th>
                        <th class="text-center">비고</th>
                        <th class="text-center"></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(row, index) in insuranceDTO.trx_data" :key="index" @click="selectedRowTRX = row" :class="{ selected: selectedRowTRX === row, 'cursor-pointer': true }">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td>
                          <VSelectWithValidation v-model="row.trx_cd" name="trx_cd" label="" :items="trxCdItems" density="compact" variant="outlined" single-line></VSelectWithValidation>
                        </td>
                        <td>
                          <VTextFieldWithValidation v-model="row.trx_dt" name="trx_dt" label="" type="date" density="compact" color="primary" variant="outlined" single-line />
                        </td>
                        <td>
                          <VTextFieldWithValidation v-model="row.trx_amt" name="trx_amt" label="" color="primary" density="compact" variant="outlined" suffix="원" type="number" single-line />
                        </td>
                        <td>
                          <VTextFieldWithValidation v-model="row.acct_nm" name="acct_nm" label="" variant="outlined" density="compact" single-line />
                        </td>
                        <td><VTextFieldWithValidation v-model="row.rmk" name="rmk" label="" density="compact" color="primary" variant="outlined" single-line /></td>
                        <td>
                          <v-btn variant="elevated" color="white" @click="fnDelTrx(index)" size="small" class="min-width-auto pa-0">
                            <vue-feather type="minus-square" class="text-gray cursor-pointer vertical-align-middle"></vue-feather>
                          </v-btn>
                        </td>
                      </tr>
                      <tr v-if="insuranceDTO.trx_data.length === 0">
                        <td colspan="6" class="text-center">내용 없음</td>
                      </tr>
                      </tbody>
                    </v-table>
                  </v-card-text>
                  <!-- 미납 영역 -->
                  <v-card-text class="pa-0 mt-1 d-flex w-full" v-if="insuranceDTO.insr_tot_paid_amt == 0 || insuranceDTO.insr_tot_unpaid_amt > 0">
                    <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
                      <p class="text-12">최종보험료</p>
                      <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
                      <p class="text-12">납입 보험료</p>
                      <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_paid_amt).toLocaleString() }}원</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-lighterror w-full mr-1">
                      <p class="text-12">미납 보험료</p>
                      <p class="text-h6 text-right text-error">{{ Number(insuranceDTO.insr_tot_unpaid_amt).toLocaleString() }}원</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-lighterror w-full mr-1">
                      <p class="text-12">납입 상태</p>
                      <p class="text-h6 text-right text-error">{{ insuranceDTO.insr_tot_amt == 0 ? '-' : '미납' }}</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
                      <p class="text-12">보험 상태</p>
                      <p class="d-flex">
                        <VSelectWithValidation v-model="insuranceDTO.status_cd" name="status_cd" label="" :items="statusCdItemsData" density="compact" variant="outlined" single-line :disabled="true" bg-color="white" class="size-x-small"></VSelectWithValidation>
                        <v-btn variant="outlined" class="ml-1" size="small" @click="fnDepositSave()">저장</v-btn>
                      </p>
                    </v-card>
                  </v-card-text>

                  <v-card-text class="pa-0 mt-1 d-flex w-full" v-if="insuranceDTO.insr_tot_paid_amt != 0 && insuranceDTO.insr_tot_unpaid_amt <= 0">
                    <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
                      <p class="text-12">최종보험료</p>
                      <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_amt).toLocaleString() }}원</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
                      <p class="text-12">납입 보험료</p>
                      <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_paid_amt).toLocaleString() }}원</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
                      <p class="text-12">미납 보험료</p>
                      <p class="text-h6 text-right">{{ Number(insuranceDTO.insr_tot_unpaid_amt).toLocaleString() }}원</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-light-blue-lighten-4 w-full mr-1">
                      <p class="text-12">납입 상태</p>
                      <p class="text-h6 text-right">{{ insuranceDTO.insr_tot_unpaid_amt < 0 ? '과입금' : '완납' }}</p>
                    </v-card>
                    <v-card class="py-2 px-6 bg-light-blue-lighten-5 w-full mr-1">
                      <p class="text-12">보험 상태</p>
                      <p class="d-flex">
                        <VSelectWithValidation v-model="insuranceDTO.status_cd" name="status_cd" label="" :items="statusCdItemsData" density="compact" variant="outlined" single-line :disabled="true" bg-color="white" class="size-x-small"></VSelectWithValidation>
                        <v-btn variant="outlined" class="ml-1" size="small" @click="fnDepositSave()">저장</v-btn>
                      </p>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- ERP정보 시작 -->
              <v-col cols="12" class="py-0" ref="refPage9">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-9">
                    <v-card-title class="d-flex justify-space-between pa-0">
                      <h3 class="font-weight-bold">ERP정보</h3>
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text class="pa-0">
                        <v-table class="v-board-table size-x-small">
                          <colgroup>
                            <col style="width: auto" />
                            <col style="width: 33.3333%" />
                            <col style="width: 33.3333%" />
                          </colgroup>
                          <thead>
                          <tr>
                            <th class="text-center">ERP기간</th>
                            <th class="text-center">ERP보험료</th>
                            <th class="text-center">ERP납입일</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td>
                              <div class="d-flex justify-space-between align-center">
                                <VTextFieldWithValidation v-model="insuranceDTO.erp_st_dt" name="erp_st_dt" label="ERP기간 시작일자" type="date" single-line variant="outlined" density="compact" />
                                <span class="mx-1">~</span>
                                <VTextFieldWithValidation v-model="insuranceDTO.erp_cncls_dt" name="erp_cncls_dt" label="ERP기간 종료일자" type="date" single-line variant="outlined" density="compact" />
                              </div>
                            </td>
                            <td>
                              <VTextFieldWithValidation v-model="insuranceDTO.erp_amt" name="erp_amt" placeholder="ERP보험료" type="number" suffix="원" single-line variant="outlined" density="compact" />
                            </td>
                            <td>
                              <VTextFieldWithValidation v-model="insuranceDTO.erp_dt" name="erp_dt" label="ERP납입일" type="date" single-line variant="outlined" density="compact" />
                            </td>
                          </tr>
                          </tbody>
                        </v-table>
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>
              <!-- ERP정보 종료 -->

              <!--약관동의-->
              <v-col cols="12" class="pb-0" ref="refPage10">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-9">
                    <v-card-title>
                      <h3 class="font-weight-bold">약관 동의</h3>
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text>
                        <v-row class="v-board-table size-x-small">
                          <v-col cols="12" class="v-col justify-space-between">
                            <div class="head-col pr-6 w-auto">
                              <p>신청내용 확인</p>
                            </div>
                            <div class="data-col w-sm-110">
                              <v-checkbox v-model="insuranceDTO.agr10_yn" name="agr10_yn" label="확인함 (필수)" class="v-checkbox" density="compact" true-value="Y" false-value="N" hide-details="auto" checked />
                            </div>
                            <div class="head-col pr-6 w-auto">
                              <p>보험 약관 확인</p>
                            </div>
                            <div class="data-col w-sm-110">
                              <v-checkbox v-model="insuranceDTO.agr20_yn" name="agr20_yn" label="확인함 (필수)" class="v-checkbox" density="compact" true-value="Y" false-value="N" hide-details="auto" checked />
                            </div>
                            <div class="head-col pr-6 w-auto letter-spacing-030 line-height-1-2 pt-2 pb-2">
                              <p>계약 체결·이행 등을 위한<br />개인(신용)정보 처리 동의</p>
                            </div>
                            <div class="data-col w-sm-110">
                              <v-checkbox v-model="insuranceDTO.agr30_yn" name="agr30_yn" label="확인함 (필수)" class="v-checkbox" density="compact" true-value="Y" false-value="N" hide-details="auto" checked />
                            </div>
                            <div class="head-col pr-6 w-auto">
                              <p>상품설명확인서 확인</p>
                            </div>
                            <div class="data-col w-sm-110">
                              <v-checkbox v-model="insuranceDTO.agr40_yn" name="agr40_yn" label="확인함 (필수)" class="v-checkbox" density="compact" true-value="Y" false-value="N" hide-details="auto" checked />
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>
              <!-- 메모 추가예정 -->
              <v-col cols="12" class="pb-0" ref="refPage11">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-11">
                    <v-card-title>
                      <h3 class="font-weight-bold">메모</h3>
                      <v-spacer />
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <div class="data-col w-full">
                        <v-textarea v-model="insuranceDTO.rmk" variant="outlined" counter class="mt-2 w-full" rows="5" no-resize></v-textarea>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panels>
        </v-col>

        <!--우측 영역-->
        <v-col cols="1">
          <div class="position-sticky sticky-top v-box">
            <v-btn block variant="outlined" class="mb-1" @click="onInsuranceFormOpen()">신청서출력</v-btn>
            <v-btn block variant="outlined" class="mb-1" @click="onCertificatePrintFrameOpen()">증명서출력</v-btn>
            <v-btn block variant="outlined" class="mb-1" @click="onCalculateInsurance(true)">보험료계산</v-btn>
            <v-btn block size="large" @click="fnSave()">저장</v-btn>
          </div>
        </v-col>
      </v-row>

        <v-row v-if="false">
          <!--좌측 영역-->
          <v-col cols="12"> 조회된 내용이 없습니다. [디자인 필요] </v-col>
        </v-row>
        <!-- 계약 상세 조회 종료 -->
      </v-col>
    </v-row>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'CAA'">
    <CAA_AC2/>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'PAT'">
    <PAT_AC2/>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'LAW'">
    <LAW_AC2/>
  </div>
  <p style="height:20px;"></p>
  <!--LAYER : 주소검색 -->
  <v-dialog persistent v-model="isDaumPostDialog" width="600">
    <v-card>
      <v-card-text>
        <div class="d-flex justify-space-between">
          <h3 class="text-h6 font-weight-bold">사무소 주소검색</h3>
          <v-avatar color="dark" class="pointer-cursor">
            <v-btn variant="outlined" color="white" @click="isDaumPostDialog = false">
              <v-icon small title="닫기">mdi-close</v-icon>
            </v-btn>
          </v-avatar>
        </div>

        <VueDaumPostcode @complete="onComplete_DaumPost"></VueDaumPostcode>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- 가입신청서 시작 -->
  <component :is="getDynamicComponentName1()" :insurance_uuid="insuranceDTO.insurance_uuid" :isPdf="true" v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
  <!-- <V_TTAX0030P20 :insurance_uuid="insuranceDTO.insurance_uuid" :isPdf=true v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" /> -->
  <!-- 가입증명서 종료 -->

  <!-- 가입증명서 시작 -->
  <component :is="getDynamicComponentName2()" :insurance_uuid="insuranceDTO.insurance_uuid" :isPdf="true" v-if="isCertificatePrintFramDialog" @close="onCertificatePrintFrameClose" />
  <!-- <V_TTAX0030P30 :insurance_uuid="insuranceDTO.insurance_uuid" :isPdf=true v-if="isCertificatePrintFramDialog" @close="onCertificatePrintFrameClose" /> -->
  <!-- 가입증명서 종료 -->

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

import { MessageBoxDTO, ParamsDTO, CommonCode, InsuranceDTO, InsuranceRateDTO, CBRDataDTO, TRXDataDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';
import CAA_AC2 from './CAA/CAA_AC2.vue'
import PAT_AC2 from './PAT/PAT_AC2.vue'
import LAW_AC2 from './LAW/LAW_AC2.vue'
import V_TTAX0030P20 from '@/views/contract/TAX/V_TTAX0030P20.vue';
import V_TTAX0030P30 from '@/views/contract/TAX/V_TTAX0030P30.vue';
import V_TACC0030P20 from '@/views/contract/ACC/V_TACC0030P20.vue';
import V_TACC0030P30 from '@/views/contract/ACC/V_TACC0030P30.vue';
import V_TADV0030P20 from '@/views/contract/ADV/V_TADV0030P20.vue';
import V_TADV0030P30 from '@/views/contract/ADV/V_TADV0030P30.vue';
import V_TCAA0030P20 from '@/views/contract/CAA/V_TCAA0030P20.vue';
import V_TCAA0030P30 from '@/views/contract/CAA/V_TCAA0030P30.vue';
import V_TPAT0030P20 from '@/views/contract/PAT/V_TPAT0030P20.vue';
import V_TPAT0030P30 from '@/views/contract/PAT/V_TPAT0030P30.vue';
import AdminBaseBreadcrumb from '@/components/AdminBaseBreadcrumb.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';
import apiADMIN from '@/api/api/A_ADMIN';
import {UPLOAD_EXCEL_INSURANCE_TAX_TRE_COR, UPLOAD_EXCEL_INSURANCE_TAX_TRE_IND} from "../../../util/excelupdn";
import dayjs from "dayjs";
import RATE_ITEMS from '../../json/discountRateByMemData.json';
import {getDiscountRate, getInsrAmt, getInsrSpctAmt} from '@/util/calUtils';
import {calByString_ADV, getDateDiff} from "../../../util/util";

const route = useRoute();

const page = ref({
  title: `계약관리`
});

const breadcrumbs = ref([
  {
    text: '계약관리',
    disabled: false,
    href: '/'
  },
  {
    text: '계약조회',
    disabled: true,
    href: '/'
  }
]);

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

const businessCdItems = ref(['']);
const statusCdItems = ref(['']);
const insrYearCdItems = ref([]);
const userCdItems = ref(['']);
const regionCdItems = ref([]);
const trxCdItems = ref([]);

const insrTakesSectionItems = ref([]);
const insrPblcBrdnRtItems = ref([]);
const insrClmLtAmtItems = ref([]);
const insrPsnlBrdnAmtItems = ref([]);

//변호사 특약 selectList
const insrSpctClmLtAmtItems = ref([]);
const insrSpctPsnlBrdnAmtItems = ref([]);

const selectedRow = ref();
const selectedRowDtl = ref();
const selectedRowTRX = ref();

const isNoData = ref(false);
const isDaumPostDialog = ref(false);
const isInsuranceFormDialog = ref(false);
const isCertificatePrintFramDialog = ref(false);

let InsuranceList = ref([]);
let StockStartDtList = ref([]);
const isInsrTableDialog = ref(false);
const insuranceRateDTO = ref(new InsuranceRateDTO());
const searchParams = ref(new ParamsDTO());
const insuranceDTO = ref(new InsuranceDTO());
const messageBoxDTO = ref(new MessageBoxDTO());

const dynamicComponentName1 = ref();
const dynamicComponentName2 = ref();

let validUserCount = ref(0);
const statusCdItemsData = ref(['']);

let stockStartDt = ref('');

const iconState =  ref('arrow-down-circle');
const resultAreaState = ref(true);
function getTrxCdTitle(trxCd) {
  try {
    // trxCd에 해당하는 title을 찾아 반환합니다.
    return trxCdItems.value.find(item => item.value == trxCd).title;
  } catch (error) {
    return ''; // 예외 처리 후 반환할 기본값을 설정합니다.
  }
}

async function fnSearch(isAllSearch:boolean) {
//2024-02-28 수정
  if(!resultAreaState.value) resultShowHide()
  if(isAllSearch) {
    InsuranceList.value = [];
    insuranceDTO.value.insurance_uuid = null;
    let resultData;
    if (route.params.business_cd == 'ADV'){
      resultData = await apiADMIN.getADVS(searchParams.value.data);
    }
    else {
      resultData = await apiADMIN.getTAXS(searchParams.value.data);
    }
    InsuranceList.value = resultData.data;
    if (InsuranceList.value.length == 0) {
      isNoData.value = true;
    } else {
      // fSearchDtl(InsuranceList.value[0].insurance_uuid);
    }
  } else {
    // console.log('insuranceDTO.value.insurance_uuid :'+insuranceDTO.value.insurance_uuid)
    // //let result = InsuranceList.value.filter((value) => value.insurance_uuid == insuranceDTO.value.insurance_uuid)
    //
    // let result = InsuranceList.value.findIndex((value) => value.insurance_uuid == insuranceDTO.value.insurance_uuid)
    // console.log('insr_tot_amt :',insuranceDTO.value.insr_tot_amt)
    // console.log('insr_tot_unpaid_amt :',insuranceDTO.value.insr_tot_unpaid_amt)
    // console.log('status_cd :',insuranceDTO.value.status_cd)
    // console.log('status_nm :',insuranceDTO.value.status_nm)
    // console.log('InsuranceList.value[result].status_nm :',InsuranceList.value[result].status_nm)
    // console.log('result :',result)
    // InsuranceList.value[result].insr_tot_amt = insuranceDTO.value.insr_tot_amt
    // InsuranceList.value[result].insr_tot_unpaid_amt = insuranceDTO.value.insr_tot_unpaid_amt
    // InsuranceList.value[result].status_cd = insuranceDTO.value.status_cd
    // InsuranceList.value[result].status_nm = insuranceDTO.value.status_nm
  }

}

async function fnSetInsuranceRateCombo() {
  const paramsRate = { user_cd: insuranceDTO.value.user_cd, business_cd: insuranceDTO.value.business_cd };
  let resultDataRate;
  if (route.params.business_cd == 'ADV'){
    resultDataRate = await apiADMIN.getADVRate(paramsRate);
  }
  else {
    resultDataRate = await apiADMIN.getTAXRate(paramsRate);
  }
  Object.assign(insuranceRateDTO.value, resultDataRate.data[0]);
  if (route.params.business_cd == 'ADV') {
    insrTakesSectionItems.value = insuranceRateDTO.value.contents['기본담보']['연매출액구간'].map(({code, value}) => ({
      title: value,
      value: `${code}|${value}`
    }));

    insrSpctClmLtAmtItems.value = insuranceRateDTO.value.contents['특약담보']['보상한도'].map(({ code, value }) => ({
      title: value,
      value: `${code}|${value}`
    }));

    insrSpctPsnlBrdnAmtItems.value = insuranceRateDTO.value.contents['특약담보']['자기부담금'].map(({ code, value }) => ({
      title: value,
      value: `${code}|${value}`
    }));
  }
  else {
    insrPblcBrdnRtItems.value = insuranceRateDTO.value.contents['기본담보']['공동부담'].map(({code, value}) => ({
      title: value,
      value: `${code}|${value}`
    }));
  }

  insrClmLtAmtItems.value = insuranceRateDTO.value.contents['기본담보']['보상한도'].map(({ code, value }) => ({
    title: value,
    value: `${code}|${value}`
  }));

  insrPsnlBrdnAmtItems.value = insuranceRateDTO.value.contents['기본담보']['자기부담금'].map(({ code, value }) => ({
    title: value,
    value: `${code}|${value}`
  }));
}

async function fnSearchDtl(insurance_uuid: string) {
  insuranceDTO.value = new InsuranceDTO();

  if (insurance_uuid) {
    const params = { insurance_uuid: insurance_uuid };
    let resultData;
    if (route.params.business_cd == 'ADV'){
      resultData = await apiADMIN.getADV(params);
    }
    else {
      resultData = await apiADMIN.getTAX(params);
    }

    insuranceDTO.value = new InsuranceDTO();

    Object.assign(insuranceDTO.value, resultData.data[0]);

    insuranceDTO.value.cbr_data.sort(function(a, b) {
      if(a.status_cd=='90' || a.status_cd=='91') {
        return 1
      }else if(b.status_cd=='90' || b.status_cd=='91'){
        return -1
      }else{
        return b.status_cd-a.status_cd
      }
    })
    //상세 데이타 수정일 경우 LIST는 조회 하지 않고 데이타만 변경
    let result = InsuranceList.value.findIndex((value) => value.insurance_uuid == insuranceDTO.value.insurance_uuid)

    // console.log('insr_tot_amt :',insuranceDTO.value.insr_tot_amt)
    // console.log('InsuranceList.value[result].insr_tot_amt  :',InsuranceList.value[result].insr_tot_amt)
    // console.log('insr_tot_unpaid_amt :',insuranceDTO.value.insr_tot_unpaid_amt)
    // console.log('InsuranceList.value[result].insr_tot_unpaid_amt :',InsuranceList.value[result].insr_tot_unpaid_amt)
    // console.log('status_cd :',insuranceDTO.value.status_cd)
    // console.log('status_nm :',insuranceDTO.value.status_nm)
    // console.log('InsuranceList.value[result].status_nm :',InsuranceList.value[result].status_nm)
    // console.log('result :',result)

    InsuranceList.value[result].insr_tot_amt = insuranceDTO.value.insr_tot_amt
    InsuranceList.value[result].insr_tot_unpaid_amt = insuranceDTO.value.insr_tot_unpaid_amt
    InsuranceList.value[result].status_cd = insuranceDTO.value.status_cd
    InsuranceList.value[result].status_nm = insuranceDTO.value.status_nm

    //메모 데이타 있을 경우 panel 확장, 2023-11-08 By Moon
    if(insuranceDTO.value.rmk != null && insuranceDTO.value.rmk != '' && panel.value.length < 9 ) panel.value.push("panel-10")
    else if((insuranceDTO.value.rmk == null || insuranceDTO.value.rmk == '') && panel.value.length > 7 ) panel.value.pop();

    //특약 가입일 경우 오픈 아님 닫기
    if(insuranceDTO.value.spct_join_yn == 'Y' && panel.value.length < 9 ) panel.value.push("panel-3")
    else if((insuranceDTO.value.rmk == null || insuranceDTO.value.rmk == '') && panel.value.length > 7 ) panel.value.pop();

    const filter1 = insuranceDTO.value.cbr_data.filter(data => data.status_cd === '80');
    //const filter1 = []

    validUserCount.value = filter1.length;
    fnSetInsuranceRateCombo();
    dynamicComponentName1.value = `V_T${insuranceDTO.value.business_cd}0030P20`;
    dynamicComponentName2.value = `V_T${insuranceDTO.value.business_cd}0030P30`;

    // 수정
    insuranceDTO.value.mode = 'U';
  } else {
    // 삭제
    insuranceDTO.value.mode = 'C';
  }
}

function getDynamicComponentName1() {
  switch (insuranceDTO.value.business_cd) {
    case 'TAX':
      return V_TTAX0030P20;
    case 'ACC':
      return V_TACC0030P20;
    case 'ADV':
      return V_TADV0030P20;
    case 'CAA':
      return V_TCAA0030P20;
    case 'PAT':
      return V_TPAT0030P20;
  }
}
function getDynamicComponentName2() {
  switch (insuranceDTO.value.business_cd) {
    case 'TAX':
      return V_TTAX0030P30;
    case 'ACC':
      return V_TACC0030P30;
    case 'ADV':
      return V_TADV0030P30;
    case 'CAA':
      return V_TCAA0030P30;
    case 'PAT':
      return V_TPAT0030P30;
  }
}

async function fnAdd(user_cd: string) {
  insuranceDTO.value = new InsuranceDTO();
  insuranceDTO.value.mode = 'C';
  insuranceDTO.value.business_cd = searchParams.value.data['business_cd'];
  insuranceDTO.value.user_cd = user_cd;
  insuranceDTO.value.insurance_uuid = true;

  fnSetInsuranceRateCombo();
}

function fnAddTrx() {
  try {
    const trxDataDTO = new TRXDataDTO();
    trxDataDTO.trx_cd = 'WT'; // 계좌이체
    trxDataDTO.trx_dt = dayjs().format('YYYY-MM-DD');
    trxDataDTO.acct_nm = '';
    trxDataDTO.rmk = '';
    insuranceDTO.value.trx_data.push(trxDataDTO);
  } catch (e) {
    console.log(e);
  }
}

function fnDelTrx(rowIdx: number) {
  insuranceDTO.value.trx_data.splice(rowIdx, 1);
  fnCalTrx();
}

function fnCalTrx() {
  insuranceDTO.value.insr_tot_paid_amt = insuranceDTO.value.trx_data.reduce((total, item) => total + Number(item.trx_amt), 0);
  insuranceDTO.value.insr_tot_unpaid_amt = Number(insuranceDTO.value.insr_tot_amt) - Number(insuranceDTO.value.insr_tot_paid_amt);

  if (insuranceDTO.value.insr_tot_unpaid_amt == 0 && (insuranceDTO.value.status_cd == '10' || insuranceDTO.value.status_cd == '20')) {
    insuranceDTO.value.status_cd = '80'; // 정상

    if (insuranceDTO.value.cbr_data != undefined && insuranceDTO.value.user_cd !== 'IND') {
      for (var idx in insuranceDTO.value.cbr_data) {
        // 기본담보 보험료(할인할증적용)
        //console.log()
        if(insuranceDTO.value.cbr_data[idx].status_cd=='10' || insuranceDTO.value.status_cd == '20')
          insuranceDTO.value.cbr_data[idx].status_cd='80'
      }
    }
  }
}
async function fnAddCBR(user_cd: string) {
  const cbrDataDTO = new CBRDataDTO();
  cbrDataDTO.insr_retr_dt = insuranceRateDTO.value.insr_st_dt;
  cbrDataDTO.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
  cbrDataDTO.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
  cbrDataDTO.status_cd = '80'; // 정상
  insuranceDTO.value.cbr_data.push(cbrDataDTO);
}


function fnDelCBR(rowIdx: number) {
  console.log(rowIdx);
  insuranceDTO.value.cbr_data.splice(rowIdx, 1);
  insuranceDTO.value.cbr_cnt = insuranceDTO.value.cbr_data.length;
}

async function fnSave() {
  let isRun = false;

  await messageBoxDTO.value.setConfirm('확인', '저장 하시겠습니까?', null, (result, params) => {
    if (result) {
      isRun = true;
    }
  });

  if (isRun) {
    let resultData;
    insuranceDTO.value.cbr_cnt = insuranceDTO.value.cbr_data.length
    if (route.params.business_cd == 'ADV'){
      resultData = await apiADMIN.setADV([insuranceDTO.value]);
    }
    else {
      resultData = await apiADMIN.setTAX([insuranceDTO.value]);
    }

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');
      fnSearch(false);
      if (insuranceDTO.value.mode == 'U') {
        fnSearchDtl(insuranceDTO.value.insurance_uuid);
      } else {

      }
      console.log('fnSave :',insuranceDTO.value.insurance_uuid)

    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  }
}

async function fnDepositSave() {
  let isRun = false;
  fnCalTrx();
  await messageBoxDTO.value.setConfirm('확인', '저장 하시겠습니까?', null, (result, params) => {
    isRun = result;
  });
  if (isRun) {
    let resultData;
    if (route.params.business_cd == 'ADV'){
      resultData = await apiADMIN.setADV_TRX([insuranceDTO.value]);
    }
    else {
      resultData = await apiADMIN.setTAX_TRX([insuranceDTO.value]);
    }
    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다. (자동 재조회)');
      fnSearch(false);
      if (insuranceDTO.value.mode == 'U') {
        fnSearchDtl(insuranceDTO.value.insurance_uuid);
      } else {

      }
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  }
}


/**
 * 보험가입신청서 팝업호출
 * @param param
 */
const onInsuranceFormOpen = () => {
  isInsuranceFormDialog.value = true;
};
const onInsuranceFormClose = () => {
  isInsuranceFormDialog.value = false;
};

/**
 * 보험가입증명서 팝업 호출
 * @param param
 */
const onCertificatePrintFrameOpen = () => {
  isCertificatePrintFramDialog.value = true;
};

const onCertificatePrintFrameClose = () => {
  isCertificatePrintFramDialog.value = false;
};

/**
 * 보험료계산
 */
const onCalculateInsurance = async (confirmYn) => {
  let isRun = false;
  if(confirmYn) { // 상태값 변경시 자동계산 확인 창 표시 안함
    await messageBoxDTO.value.setConfirm('확인', '총 보험료를 자동계산하시겠습니까?', null, (result, params) => {
      isRun = result;
    });
  } else {
    isRun = true
  }

  if (isRun) {
    let totAmt = 0;

    //개인일 경우 해당 안됨
    if (insuranceDTO.value.cbr_data != undefined && insuranceDTO.value.user_cd !== 'IND') {
      for (let idx in insuranceDTO.value.cbr_data) {
        // 기본담보 보험료(할인할증적용)
        if(insuranceDTO.value.cbr_data[idx].status_cd !='91') { //2023-12-07 미가입 상태는 제외
         // console.log("insuranceDTO.value.cbr_data[idx].status_cd : ", insuranceDTO.value.cbr_data[idx].status_cd)
          totAmt += Number(insuranceDTO.value.cbr_data[idx].insr_amt, 0);
        }
      }
      // if(insuranceDTO.value.spct_join_yn == 'Y') {
      //   totAmt+=insuranceDTO.value.spct_data.insr_amt
      // }
      insuranceDTO.value.insr_amt = totAmt;
      insuranceDTO.value.insr_tot_amt = totAmt;
    }
   // console.log('insuranceDTO.value.spct_join_yn',insuranceDTO.value.spct_join_yn)
    // 특약 재계산
    //개인도 특약 가능
    if (insuranceDTO.value.spct_join_yn == 'Y') {
     // console.log('insuranceDTO.value.spct_join_yn')
      // let insrAmt = 0;
      // insrAmt += calInsrSpctAmt(insuranceDTO.value.spct_data);
      //insuranceDTO.value.spct_data.insr_amt=calInsrSpctAmt(insuranceDTO.value.spct_data);
      insuranceDTO.value.insr_tot_amt = Number(insuranceDTO.value.insr_amt,0) + Number(insuranceDTO.value.spct_data.insr_amt,0)
    }

    // 입금금액 계산
    insuranceDTO.value.insr_tot_paid_amt = insuranceDTO.value.trx_data.reduce((total, item) => total + Number(item.trx_amt), 0);
    insuranceDTO.value.insr_tot_unpaid_amt = Number(insuranceDTO.value.insr_tot_amt) - Number(insuranceDTO.value.insr_tot_paid_amt);
  }
};

/**
 * 보험계약[특별] 보험료 재계산
 *
 * @param data 보험 명단 데이터
 */
const calInsrSpctAmt = (data: any) => {
  let insrAmt = 0;
  insrAmt = getInsrSpctAmt(
      data.insr_st_dt,
      insuranceDTO.value.insr_cncls_dt,
      data.insr_clm_lt_amt,
      data.insr_psnl_brdn_amt,
      data.cbr_cnt,
      insuranceRateDTO.value.contents,
      insuranceRateDTO.value.days
  );
  return insrAmt
};


watch(
    () => route.params.business_cd,
    newBusinessCd => {
      initPage();
    },
);



function changeTotUnpaidAmt(){
  if(insuranceDTO.value.business_cd == 'TAX' && insuranceDTO.value.user_cd=='COR'){
    if (insuranceDTO.value.insr_tot_unpaid_amt == 0 &&  insuranceDTO.value.status_cd == '10') {
      insuranceDTO.value.status_cd = '80'; // 신청중
      insuranceDTO.value.cbr_data.forEach(item=>{
        item.status_cd = '80';
      })
    }
  }else if(insuranceDTO.value.business_cd == 'TAX' && insuranceDTO.value.user_cd=='IND'){
    if (insuranceDTO.value.insr_tot_unpaid_amt == 0 &&  insuranceDTO.value.status_cd == '10') {
      insuranceDTO.value.status_cd = '80'; // 신청중
    }
  }

}


function fnChangeStatus(memStatus) {
  const validMemberCount = insuranceDTO.value.cbr_data.filter((item) => item.status_cd == '80');
  let businessCd = insuranceDTO.value.business_cd
  if(businessCd== "ADV" || businessCd == "TAX") {

    insuranceDTO.value.insr_pcnt_sale_rt = getDiscountRate(businessCd, validMemberCount.length)
    validUserCount.value = validMemberCount.length
  }
  /*
  let businessCd = insuranceDTO.value.business_cd
  if(insuranceDTO.value.business_cd == "ADV") {
    insuranceDTO.value.insr_pcnt_sale_rt = getDiscountRate(businessCd, validMemberCount.length)
    //for (let i = 0; i < RATE_ITEMS[insuranceDTO.value.business_cd].length;i++) {
    //  console.log("RATE :", RATE_ITEMS[insuranceDTO.value.business_cd][i].rate)
    //}


    let totAmt = 0;

    // // 소급담보일이 수기등록이 아니면 보험 시작일자로 변경
    // if (insuranceDTO.insr_retr_yn !== 'Y') {
    //   insuranceDTO.insr_retr_dt = insuranceDTO.value.insr_st_dt;
    // }

    // // 기준_보험시작일자 보다 이전이면 기준_보험시작일자로 보험기간 변경
    // if (insuranceDTO.value.insr_st_dt < insuranceRateDTO.value.insr_st_dt) {
    //   insuranceDTO.value.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
    // }
    let data = insuranceDTO.value
    if (data.cbr_data != undefined) {

      for (var idx in data.cbr_data) {
        // data.cbr_data[idx].insr_st_dt = insuranceDTO.value.insr_st_dt;

        // 연간 보험료 (365일 기준)

        data.cbr_data[idx].insr_base_amt = getInsrAmt(
            null,
            null,
            data.insr_take_sec,
            data.insr_clm_lt_amt,
            data.insr_psnl_brdn_amt,
            0,
            1,
            insuranceDTO.value.insr_pcnt_sale_rt,
            data,
            insuranceRateDTO.value.contents,
            insuranceRateDTO.value.days
        );

        // 개별 보험료 - 기간, 할인할증 적용 보험료
        data.cbr_data[idx].insr_amt = getInsrAmt(
            data.cbr_data[idx].insr_st_dt,
            data.cbr_data[idx].insr_cncls_dt,
            data.insr_take_sec,
            data.insr_clm_lt_amt,
            data.insr_psnl_brdn_amt,
            data.cbr_data[idx].insr_sale_rt,
            validMemberCount,
            insuranceDTO.value.insr_pcnt_sale_rt,
            data,
            insuranceRateDTO.value.contents,
            insuranceRateDTO.value.days
        );
        // 기본담보 보험료(할인할증적용)
        totAmt += data.cbr_data[idx].insr_amt;

        // 소급담보일이 수기등록이 아니면 보험 시작일자로 변경
        // if (data.cbr_data[idx].insr_retr_yn != 'Y') {
        //   data.cbr_data[idx].insr_retr_dt = insuranceDTO.value.insr_st_dt;
        // }

        // 기본담보 - 보상한도(연보험)
        insuranceDTO.value.insr_year_clm_lt_amt = calByString_ADV(insuranceDTO.value.insr_clm_lt_amt?.getValueBySplit(1), insuranceDTO.value?.cbr_data?.length, 1000000000);

      }

      data.insr_amt = totAmt;
      data.insr_premium_amt = totAmt;
    }
  }
  onCalculateInsurance(false)

   */
}


/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
  InsuranceList.value = [];
  StockStartDtList.value = [];
  insuranceDTO.value = new InsuranceDTO();
  const businessCd = route.params.business_cd;

  businessCdItems.value = await CommonCode.getCodeList('COM001');
  statusCdItems.value = await CommonCode.getCodeList('COM030');
  userCdItems.value = await CommonCode.getCodeList('TAX002');
  // console.log("businessCd==>",businessCd)
  regionCdItems.value = await CommonCode.getCodeList(businessCd+'001');
  trxCdItems.value = await CommonCode.getCodeList('COM031');
  statusCdItems.value.unshift({ title: '전체', value: '%' });
  userCdItems.value.unshift({ title: '전체', value: '%' });

  insrYearCdItems.value = [];
  insrYearCdItems.value.unshift({ title: '전체', value: '%' });

  statusCdItemsData.value = await CommonCode.getCodeList('COM030');
  StockStartDtList.value = await apiADMIN.getStockStartDtALL();

  StockStartDtList.value.data.forEach(item=>{
    if(item.business_cd == businessCd) stockStartDt = item.start_dt
  })


  for (let year = new Date().getFullYear(); year >= 2022; year--) {
    insrYearCdItems.value.push({ title: year.toString(), value: year.toString(), rmk: null });
  }

  searchParams.value.data['business_cd'] = businessCd;
  searchParams.value.data['insr_year'] = '%';
  searchParams.value.data['status_cd'] = '%';
  searchParams.value.data['user_cd'] = '%';
  searchParams.value.data['user_nm'] = '';
}

function onComplete_DaumPost(result: VueDaumPostcodeCompleteResult) {
  insuranceDTO.value.corp_post = result.zonecode;
  insuranceDTO.value.corp_addr = result.address;
  isDaumPostDialog.value = false;
}


const fileInputIND = ref(null);
const fileInputCOR = ref(null);
const fileInputJNT = ref(null);


async function fnExcelUpload(user_cd: string) {
  if (user_cd === 'IND') fileInputIND.value.click();
  if (user_cd === 'COR') fileInputCOR.value.click();
  if (user_cd === 'JNT') fileInputJNT.value.click();
}


async function handleFileUploadIND(event) {
  try {
    const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_IND(event);
    let resultData;
    if (route.params.business_cd == 'ADV'){
      resultData = await apiADMIN.setADV_TRX(excelList);
    }
    else {
      resultData = await apiADMIN.setTAX_TRX(excelList);
    }

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', `저장 되었습니다. 업데이트 건수 : ${resultData.data.toLocaleString()}`);
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `오류가 발생하였습니다.<br/>${e}`);
  } finally {
    event.target.value = '';
  }
}

async function handleFileUploadCOR(event) {
  try {
    const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_COR(event);
    const  resultData = await apiADMIN.setTAX_TRX(excelList);
    /*let resultData;
    if (route.params.business_cd == 'ADV'){
      const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_COR(event);
      resultData = await apiADMIN.setADV_TRX(excelList);
    }
    else {
      const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_COR(event);
      resultData = await apiADMIN.setTAX_TRX(excelList);
    }*/
    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', `저장 되었습니다. 업데이트 건수 : ${resultData.data.toLocaleString()}`);
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `오류가 발생하였습니다.<br/>${e}`);
  } finally {
    event.target.value = '';
  }
}

async function handleFileUploadJNT(event) {
  try {
    let resultData;
    if (route.params.business_cd == 'ADV'){
      const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_JNT(event);
      resultData = await apiADMIN.setADV_TRX(excelList);
    }
    else {
      //const excelList = await UPLOAD_EXCEL_INSURANCE_TAX_TRE_JNT(event);
      resultData = await apiADMIN.setTAX_TRX(excelList);
    }
    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', `저장 되었습니다. 업데이트 건수 : ${resultData.data.toLocaleString()}`);
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `오류가 발생하였습니다.<br/>${e}`);
  } finally {
    event.target.value = '';
  }
}

async function fnAutoTRX() {
  let isRun = false;

  if (insuranceDTO.value.trx_data.length > 0) {
    messageBoxDTO.value.setInfo('확인', '입금내역이 존재합니다.');
    return false;
  }

  await messageBoxDTO.value.setConfirm('확인', '간편 입금 처리하시겠습니까?', null, (result, params) => {
    isRun = result;
  });

  if (isRun) {
    const trxDataDTO = new TRXDataDTO();
    trxDataDTO.trx_cd = 'WT'; // 계좌이체
    trxDataDTO.acct_nm = insuranceDTO.value.user_nm + (insuranceDTO.value.user_cd === 'IND' ? insuranceDTO.value.user_regno : '');
    trxDataDTO.trx_dt = dayjs().format('YYYY-MM-DD');
    trxDataDTO.trx_amt = insuranceDTO.value.insr_tot_amt;
    trxDataDTO.rmk = '';
    insuranceDTO.value.trx_data.push(trxDataDTO);
    insuranceDTO.value.status_cd = '80'; // 정상
    fnCalTrx();

    fnSave();
  }
}

function resultShowHide(){
  if(resultAreaState.value){
    iconState.value = 'arrow-up-circle'
    resultAreaState.value = false
  }else{
    iconState.value = 'arrow-down-circle'
    resultAreaState.value = true
  }

}
/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {
  // 로딩시 초기 데이터 셋팅
  initPage();
});

/**
 * 메세지 박스 닫기
 * @param result
 */

// 조회결과 아코디언
const panel = ref(['panel-1', 'panel-2',  'panel-4', 'panel-5', 'panel-7', 'panel-8', 'panel-9']);
</script>
