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
          <v-select v-model="searchParams.data['business_cd']" :items="businessCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
          </li> -->
          <li class="date">
          <span>보험년도</span>
          <v-select v-model="searchParams.data['insr_year']" :items="insrYearCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
          </li>
          <li>
          <span>가입 유형</span>
          <v-select v-model="searchParams.data['user_cd']"  :items="userCdItems" variant="outlined" hide-details density="compact"></v-select>
          </li>
          <li>
          <span>상태</span>
            <v-select v-model="searchParams.data['status_cd']" :items="statusCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
          </li>
          <li>
          <span>피보험자</span>
          <v-text-field v-model="searchParams.data['user_nm']" type="text" variant="outlined" hide-details="auto" density="compact" single-line class="text-body-2" placeholder="피보험자" @keyup.enter="fnSearch()"/>
          </li>
          <li>
          <span>갱신여부</span>
          <v-select v-model="searchParams.data['renewal_cd']" :items="searchRenewalCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
          </li>
          <li class="ml-auto">
          <v-btn variant="flat" @click="fnSearch()">조회</v-btn>
          </li>
        </ul>
        <v-card>
          <v-card-title class="d-flex align-center flex-wrap px-0">
            <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 결과</h2>
            <p class="text-body-2 ml-3 pt-1">전체 <span class="color-primary font-weight-bold">{{ Number(InsuranceList.length).toLocaleString() }}</span> 건</p>
            <div class="ml-auto">
              <v-btn variant="outlined" size="small" @click="fnAdd('IND');" class="mx-1">개인 신규</v-btn>
              <v-btn variant="outlined" v-if="route.params.business_cd == 'TAX'" size="small" @click="fnAdd('COR');" class="mx-1">법인 신규</v-btn>
              <v-btn variant="outlined" v-if="route.params.business_cd == 'ADV'" size="small" @click="fnAdd('JNT');" class="mx-1">합동 신규</v-btn>
              <v-btn variant="outlined" size="small" class="ml-3" @click="downloadAsExcel()">엑셀 다운</v-btn>
            </div>
          </v-card-title>
          <v-card-text class="pa-0 v-result-box">
            <v-table density="compact" fixed-header height="220px">
              <caption class="d-none">계약 조회 결과</caption>
              <colgroup>
              <col style="width:auto"/>
              <col style="width:auto"/>
              <col style="width:auto"/>
              <col style="width:120px"/>
              <col style="width:auto"/>
              <col style="width:auto"/>
              <col style="width:auto"/>
              <col style="width:auto"/>
              <col style="width:auto"/>
              <col style="width:auto"/>
              <col style="width:auto"/>
              </colgroup>
              <thead>
              <tr>
                <th>번호</th>
                <th>구분</th>
                <th>보험년도</th>
                <th>피보험자</th>
                <th>등록번호</th>
                <th>사업자번호</th>
                <th>총보험료</th>
                <th>갱신여부</th>
              </tr>
              </thead>
              <tbody v-if="InsuranceList.length" class="">

              <tr v-for="(row, index) in InsuranceList"
                        :key="index"
                        @click="selectedRow = row"
                        @click.prevent="fnSearchDtl(row.insurance_uuid)"
                        :class="{ 'selected': selectedRow === row, 'cursor-pointer': true  }"
                        >
                <td>{{ index + 1 }}</td>
                <td>{{ row.user_cd_nm }}</td>
                <td>{{ row.insr_year }}</td>
                <td>{{ row.user_nm }}</td>
                <td>{{ row.user_regno }}</td>
                <td>{{ row.corp_cnno }}</td>
                <td>{{ Number(row?.insr_tot_amt).toLocaleString() }}</td>
                <td>{{ row.renewal_cd_nm}}</td>
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
      <v-col cols="12" >
        <!-- 계약 상세 조회 시작 -->
        <div class="d-flex align-center mb-3">
          <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세</h2>
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
                  <v-row class="v-board-table size-x-small"  v-if="insuranceDTO.user_cd == 'IND'">
                    <v-col cols="12" sm="4" class="v-col">
                    <div class="head-col">
                      <p>이름</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <!-- {{ insuranceDTO.user_nm }} -->
                      <VTextFieldWithValidation v-model="insuranceDTO.user_nm" name="user_nm" placeholder="이름" single-line maxlength="25"/>
                    </div>
                    </v-col>
                    <v-col cols="12" sm="4" class="v-col">
                    <div class="head-col">
                      <p>생년월일</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <!-- {{ insuranceDTO.user_birth }} -->
                      <VTextFieldWithValidation v-model="insuranceDTO.user_birth" name="user_birth" label="생년월일" single-line :maskOption="{ mask: '######' }" type="date"/>
                    </div>
                    </v-col>
                    <v-col cols="12" sm="4" class="v-col">
                    <div class="head-col">
                      <p>등록번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <!-- {{ insuranceDTO.user_regno }} -->
                      <VTextFieldWithValidation v-model="insuranceDTO.user_regno" name="user_regno" label="등록번호" single-line :maskOption="{ mask: '#######' }" type="date"/>
                    </div>
                    </v-col>

                    <v-col cols="12" sm="4" class="v-col">
                    <div class="head-col">
                      <p>휴대전화</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation v-model="insuranceDTO.corp_cust_hpno" name="corp_cust_hpno" single-line  :maskOption="{ mask: '###-####-####' }"/>
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
                      <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" placeholder="소속 지방회 선택"  :items="regionCdItems" single-line density="compact"></VSelectWithValidation>
                    </div>
                    </v-col>

                    <v-col cols="4" class="v-col" >
                      <div class="head-col">
                        <p>갱신여부</p>
                        <sup class="text-error">*</sup>
                      </div>
                      <div class="data-col">
                        <VSelectWithValidation v-model="insuranceDTO.renewal_cd" name="corp_region_cd" label="갱신여부" :items="renewalCdItems" single-line density="compact"></VSelectWithValidation>
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
                      <VTextFieldWithValidation v-model="insuranceDTO.corp_ceo_nm" name="corp_ceo_nm" placeholder="대표자 성명" single-line max-length="20"/>
                    </div>
                    </v-col>

                    <v-col cols="12" sm="4" class="v-col">
                    <div class="head-col">
                      <p>법인번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col" v-if="insuranceDTO.corp_type != 'JNT'">
                      <!-- {{ insuranceDTO.corp_bnno }} -->
                      <VTextFieldWithValidation v-model="insuranceDTO.corp_bnno" name="corp_bnno" placeholder="법인번호" single-line :maskOption="{ mask: '######-#######' }"/>
                    </div>
                    <div class="data-col" v-if="insuranceDTO.corp_type == 'JNT'">
                      해당없음
                    </div>
                    </v-col>

                    <v-col cols="12" sm="4" class="v-col">
                    <div class="head-col">
                      <p>사업자번호</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <!-- {{ insuranceDTO.corp_cnno }} -->
                      <VTextFieldWithValidation v-model="insuranceDTO.corp_cnno" name="corp_cnno" placeholder="사업자번호" single-line :maskOption="{ mask: '###-##-#####' }"/>
                    </div>
                    </v-col>
                    <v-col cols="12" sm="4" class="v-col">
                    <div class="head-col">
                      <p>사무소 전화</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation v-model="insuranceDTO.corp_telno" name="corp_telno" single-line/>
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
                    <v-col cols="4" class="v-col" >
                      <div class="head-col">
                        <p>갱신여부</p>
                        <sup class="text-error">*</sup>
                      </div>
                      <div class="data-col">
                        <VSelectWithValidation v-model="insuranceDTO.renewal_cd" name="corp_region_cd" label="갱신여부" :items="renewalCdItems" single-line density="compact"></VSelectWithValidation>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>소속 지방회</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VSelectWithValidation v-model="insuranceDTO.corp_region_cd" name="corp_region_cd" placeholder="소속 지방회 선택" :items="regionCdItems" density="compact" single-line></VSelectWithValidation>
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
                      <v-col cols="12" class="v-col" >
                        <div class="head-col">
                          <p v-if="insuranceDTO.user_cd === 'IND'">소급담보일</p>
                          <p v-if="insuranceDTO.user_cd === 'COR'">법인 소급담보일</p>
                          <p v-if="insuranceDTO.user_cd === 'JNT'">복수 소급담보일</p>
                          <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          <!-- {{ insuranceDTO.insr_retr_dt }} -->
                          <VTextFieldWithValidation v-model="insuranceDTO.insr_retr_dt" name="insr_retr_dt" placeholder="소급담보일" type="date" single-line/>
                        </div>
                      </v-col>
                      </v-row>
                    </v-col>

                    <!-- 보험 기본정보2 -->
                    <v-col cols="4" v-if="route.params.business_cd=='ADV'">
                      <v-row class="v-board-table size-x-small">

                        <v-col cols="12" class="v-col">
                          <div class="head-col">
                            <p>매출액구간</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VSelectWithValidation v-model="insuranceDTO.insr_take_sec" name="insr_take_sec" label="매출액구간" :items="insrTakeSectionItems" single-line density="compact"></VSelectWithValidation>
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
                            <VTextFieldWithValidation v-model="insuranceDTO.insr_year_clm_lt_amt" name="insr_year_clm_lt_amt" label="" single-line/>
                          </div>
                        </v-col>
                        <v-divider class="border-0"/>
                        <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'" >
                          <div class="head-col">
                            <p>인원수</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                            <VTextFieldWithValidation v-model="insuranceDTO.cbr_cnt" name="cbr_cnt" label="" type="number" suffix="명" single-line/>
                          </div>
                        </v-col>
                        <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'" >
                          <div class="head-col">
                            <p>인원수 할인</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                            <VTextFieldWithValidation v-model="insuranceDTO.insr_pcnt_sale_rt" name="insr_pcnt_sale_rt" label="" type="number" suffix="%" single-line/>
                          </div>
                        </v-col>
                        <v-col cols="12" class="v-col">
                          <div class="head-col">
                            <p>할인할증기준</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                            <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_year" name="insr_sale_year" label="" type="number" suffix="년" single-line/>
                          </div>
                        </v-col>
                        <v-col cols="12" class="v-col">
                          <div class="head-col">
                            <p v-if="insuranceDTO.user_cd == 'IND'">
                              무사고 할인 /<br />사고 할증
                            </p>
                            <p v-if="insuranceDTO.user_cd != 'IND'">무사고 할인</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col text-center" >
                            <!-- {{ insuranceDTO.insr_sale_rt }} % -->
                            <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_rt" name="insr_sale_rt" label="" type="number" suffix="%" single-line/>
                          </div>
                        </v-col>

                      </v-row>
                    </v-col>
                    <!-- 보험 기본정보2 -->
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
                        <VTextFieldWithValidation v-model="insuranceDTO.insr_year_clm_lt_amt" name="insr_year_clm_lt_amt" label="" single-line/>
                        </div>
                      </v-col>
                      <v-divider class="border-0"/>
                      <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'" >
                        <div class="head-col">
                        <p>인원수</p>
                        <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                        <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                        <VTextFieldWithValidation v-model="insuranceDTO.cbr_cnt" name="cbr_cnt" label="" type="number" suffix="명" single-line/>
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col" v-if="insuranceDTO.user_cd === 'COR'" >
                        <div class="head-col">
                        <p>인원수 할인</p>
                        <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                        <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                        <VTextFieldWithValidation v-model="insuranceDTO.insr_pcnt_sale_rt" name="insr_pcnt_sale_rt" label="" type="number" suffix="%" single-line/>
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div class="head-col">
                        <p>할인할증기준</p>
                        <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                        <!-- {{ insuranceDTO.insr_pcnt_sale_rt }} % -->
                        <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_year" name="insr_sale_year" label="" type="number" suffix="년" single-line/>
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div class="head-col">
                        <p v-if="insuranceDTO.user_cd == 'IND'">
                          무사고 할인 /<br />사고 할증
                        </p>
                        <p v-if="insuranceDTO.user_cd != 'IND'">무사고 할인</p>
                        <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col text-center" >
                        <!-- {{ insuranceDTO.insr_sale_rt }} % -->
                        <VTextFieldWithValidation v-model="insuranceDTO.insr_sale_rt" name="insr_sale_rt" label="" type="number" suffix="%" single-line/>
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
                        <VTextFieldWithValidation v-model="insuranceDTO.insr_base_amt" name="insr_sale_rt" label="" type="number" suffix="원" single-line/>
                        </div>
                      </v-col>

                      <v-col cols="12" class="v-col">
                        <div class="head-col">
                        <p>합계보험료</p>
                        <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                        <VTextFieldWithValidation v-model="insuranceDTO.insr_amt" name="insr_amt" label="" type="number" suffix="원" single-line/>
                        </div>
                      </v-col>
                      <v-col cols="12" class="v-col">
                        <div class="head-col">
                        <p>최종보험료</p>
                        <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                        <VTextFieldWithValidation v-model="insuranceDTO.insr_tot_amt" name="insr_tot_amt" label="" type="number" suffix="원" single-line/>
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
            <v-col cols="12" class="pb-0" ref="refPage3" v-if="insuranceDTO.user_cd === 'COR' || insuranceDTO.user_cd === 'JNT'">
              <v-card>
              <v-expansion-panel elevation="0" value="panel-3">
                <v-card-title>
                 <h3 class="font-weight-bold" v-if="route.params.business_cd == 'TAX'">세무사 명단</h3>
                 <h3 class="font-weight-bold" v-if="route.params.business_cd == 'ADV'">변호사 명단</h3>
                <p class="text-body-2 color-gray-shadow ml-4">
                  총
                  <span class="color-primary">{{ insuranceDTO.cbr_data.length }}</span>명
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
                    <col style="width: 70px" />
                    <col style="width: 70px" />
                    <col style="width: 80px" />
                    <col style="width: 40px" />
                    <col style="width: 120px" />
                    <col style="width: auto" />
                    <col style="width: 70px" />
                    <col style="width: 70px" />
                    <col style="width: 100px" />
                    <col style="width: 100px" />
                    <col style="width: 40px" />
                  </colgroup>
                  <thead>
                    <tr>
                    <th>No</th>
                    <th>성명</th>
                    <th>생년월일</th>
                    <th>등록번호</th>
                    <th>소급<br/>적용</th>
                    <th>소급담보일</th>
                    <th>보험기간</th>
                    <th>할인할증기준</th>
                    <th>할인할증</th>
                    <th>1인당 보험료</th>
                    <th>상태</th>
                    <th></th>
                    </tr>
                  </thead>
                  <tbody class="text-center">
                    <tr v-for="(row, index) in insuranceDTO.cbr_data">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <VTextFieldWithValidation  v-model="row.cbr_nm" name="cbr_nm" label="" density="compact" color="primary" variant="outlined" single-line/>
                    </td>
                    <td>
                      <VTextFieldWithValidation  v-model="row.cbr_brdt" name="cbr_brdt" label="" density="compact" color="primary" variant="outlined" :maskOption="{ mask: '######' }" single-line />
                    </td>
                    <td>
                      <VTextFieldWithValidation  v-model="row.cbr_regno" name="cbr_regno" label="" color="primary" density="compact" variant="outlined" :maskOption="{ mask: '#######' }" single-line />
                    </td>
                    <td>
                      <VCheckBoxWithValidation v-model="row.insr_retr_yn" name="insr_retr_yn" label="" class="d-inline-block" density="compact"/>
                    </td>
                    <td >
                      <VTextFieldWithValidation v-model="row.insr_retr_dt" name="insr_retr_dt" label="" type="date" color="primary" density="compact" variant="outlined" single-line />
                    </td>
                    <td>
                      <div class="d-flex align-center">
                        <VTextFieldWithValidation v-model="row.insr_st_dt" name="insr_st_dt" label="" type="date" color="primary" density="compact" variant="outlined" single-line /><span class="mx-1">~</span><VTextFieldWithValidation v-model="row.insr_cncls_dt" name="insr_cncls_dt" label="" color="primary" density="compact" type="date" variant="outlined" single-line />
                      </div>
                    </td>
                    <td>
                      <VTextFieldWithValidation  v-model="row.insr_sale_year" name="insr_sale_year" label="" density="compact" color="primary" variant="outlined" suffix="년" single-line/>
                    </td>
                    <td>
                      <VTextFieldWithValidation  v-model="row.insr_sale_rt" name="insr_sale_rt" label="" density="compact" color="primary" variant="outlined" suffix="%" single-line/>
                    </td>
                    <td>
                      <VTextFieldWithValidation  v-model="row.insr_amt" name="insr_amt" label="" density="compact" color="primary" variant="outlined" suffix="원" single-line/>
                    </td>
                    <td>
                      <VSelectWithValidation v-model="row.status_cd" name="status_cd" label="" color="primary" density="compact" :items="statusCdItems" variant="outlined" single-line></VSelectWithValidation>
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



            </v-row>
          </v-expansion-panels>
          </v-col>

          <!--우측 영역-->
          <v-col cols="1">
          <div class="position-sticky sticky-top v-box">
            <v-btn block size="large" @click="fnSave()">저장</v-btn>
          </div>
          </v-col>
        </v-row>

          <v-row v-if="false">
          <!--좌측 영역-->
          <v-col cols="12">
          조회된 내용이 없습니다. [디자인 필요]
          </v-col>
        </v-row>
        <!-- 계약 상세 조회 종료 -->
      </v-col>
    </v-row>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'CAA'">
    <CAA_AC4/>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'PAT'">
    <PAT_AC4/>
  </div>
  <div v-else-if="searchParams.data['business_cd'] === 'LAW'">
    <LAW_AC4/>
  </div>
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
	<V_TTAX0030P20 :insurance_uuid="insuranceDTO.insurance_uuid" :isPdf=true v-if="isInsuranceFormDialog" @close="onInsuranceFormClose" />
	<!-- 가입증명서 종료 -->

	<!-- 가입증명서 시작 -->
	<V_TTAX0030P30 :insurance_uuid="insuranceDTO.insurance_uuid" :isPdf=true v-if="isCertificatePrintFramDialog" @close="onCertificatePrintFrameClose" />
	<!-- 가입증명서 종료 -->

	<MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

</template>


<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

import { MessageBoxDTO, ParamsDTO, CommonCode,InsuranceDTO,InsuranceRateDTO,CBRDataDTO} from '@/model';
import MessageBox from "@/components/MessageBox.vue";
import V_TTAX0030P20 from "@/views/contract/TAX/V_TTAX0030P20.vue";
import V_TTAX0030P30 from "@/views/contract/TAX/V_TTAX0030P30.vue";
import CAA_AC4 from './CAA/CAA_AC4.vue';
import PAT_AC4 from './PAT/PAT_AC4.vue';
import LAW_AC4 from './LAW/LAW_AC4.vue';

import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';
import {DOWNLOAD_EXCEL, DOWNLOAD_RENEWAL_EXCEL} from "@/util/excelupdn";

const route = useRoute();

const page = ref({
	title: "계약갱신",
});
const breadcrumbs = ref([
{
	text: "계약관리",
	disabled: false,
	href: "/",
},
{
	text: "계약갱신",
	disabled: true,
	href: "/",
},
]);



const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);


const businessCdItems = ref([""]);
const statusCdItems = ref([""]);
const renewalCdItems = ref([""]);
const searchRenewalCdItems = ref([""]);
const insrYearCdItems = ref([]);
const userCdItems = ref([""]);
const regionCdItems = ref([]);
const trxCdItems = ref([]);

const insrPblcBrdnRtItems = ref([]);
const insrTakeSectionItems = ref([]);
const insrClmLtAmtItems = ref([]);
const insrPsnlBrdnAmtItems = ref([]);

const selectedRow = ref();
const selectedRowDtl = ref();

const isNoData = ref(false);
const isDaumPostDialog = ref(false);
const isInsuranceFormDialog = ref(false);
const isCertificatePrintFramDialog = ref(false);

let InsuranceList = ref([]);
const isInsrTableDialog = ref(false);
const insuranceRateDTO = ref(new InsuranceRateDTO());
const searchParams = ref(new ParamsDTO());
const insuranceDTO = ref(new InsuranceDTO());
const messageBoxDTO = ref(new MessageBoxDTO());


async function fnSearch() {
	InsuranceList.value = [];
  let resultData;
  if(route.params.business_cd=='ADV') {
    resultData = await apiADMIN.getADVRenewals(searchParams.value.data);
  } else {
    resultData = await apiADMIN.getRenewals(searchParams.value.data);
  }
	insuranceDTO.value.insurance_uuid = null;
	InsuranceList.value = resultData.data;
	if (InsuranceList.value.length == 0) {
		isNoData.value = true;
	} else {
		// fnSearchDtl(InsuranceList.value[0].insurance_uuid);
	}
}

async function fnSetInsuranceRateCombo() {
	  const paramsRate = { user_cd: insuranceDTO.value.user_cd , business_cd: insuranceDTO.value.business_cd };
    let resultDataRate;
    if(route.params.business_cd=='ADV') {
      resultDataRate = await apiADMIN.getADVRate(paramsRate);
    } else {
      resultDataRate = await apiADMIN.getTAXRate(paramsRate);
    }
    Object.assign(insuranceRateDTO.value, resultDataRate.data[0]);
    if(route.params.business_cd=='ADV') {
      insrTakeSectionItems.value = insuranceRateDTO.value.contents["기본담보"]["연매출액구간"].map(({code, value}) => ({
        title: value,
        value: `${code}|${value}`
      }));
    }else {
      insrPblcBrdnRtItems.value = insuranceRateDTO.value.contents["기본담보"]["공동부담"].map(({code, value}) => ({
        title: value,
        value: `${code}|${value}`
      }));
    }

    insrClmLtAmtItems.value = insuranceRateDTO.value.contents["기본담보"]["보상한도"].map(({ code, value }) => ({
      title: value,
      value: `${code}|${value}`
	}));

    insrPsnlBrdnAmtItems.value = insuranceRateDTO.value.contents["기본담보"]["자기부담금"].map(({ code, value }) => ({
      title: value,
      value: `${code}|${value}`
	}));

}

async function fnSearchDtl(insurance_uuid: string) {
  insuranceDTO.value = new InsuranceDTO();
  if (insurance_uuid) {
    const params = { insurance_uuid: insurance_uuid };
    let resultData;
    if(route.params.business_cd=='ADV') {
      resultData = await apiADMIN.getADVRenewal(params);
    } else {
      resultData = await apiADMIN.getRenewal(params);
    }
    Object.assign(insuranceDTO.value, resultData.data[0]);

	fnSetInsuranceRateCombo();

    // 수정
    insuranceDTO.value.mode = 'U';
  } else {

    // 삭제
    insuranceDTO.value.mode = 'C';
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

async function fnAddCBR(user_cd: string) {
	const cbrDataDTO = new CBRDataDTO();
    cbrDataDTO.insr_retr_dt = insuranceRateDTO.value.insr_st_dt;
    cbrDataDTO.insr_st_dt = insuranceRateDTO.value.insr_st_dt;
	cbrDataDTO.insr_cncls_dt = insuranceRateDTO.value.insr_cncls_dt;
    cbrDataDTO.status_cd = "80"; // 정상
    insuranceDTO.value.cbr_data.push(cbrDataDTO);
}

function fnDelCBR(rowIdx: number) {
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

	if(isRun) {
    let resultData;
    if(route.params.business_cd=='ADV') {
      resultData = await apiADMIN.setADVRenewal([insuranceDTO.value]);
    } else {
      resultData = await apiADMIN.setTAXRenewal([insuranceDTO.value]);
    }

		if (resultData.success) {
			messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');

			if (insuranceDTO.value.mode == 'U') {
				fnSearchDtl(insuranceDTO.value.insurance_uuid);
			} else {
				fnSearch();
			}
		} else {
			messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
		}
	}



}

watch(
  () => route.params.business_cd,
  (newBusinessCd) => {
    initPage();
  }
);

/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
	InsuranceList.value = [];
  	insuranceDTO.value = new InsuranceDTO();
	const businessCd = route.params.business_cd;

	businessCdItems.value = await CommonCode.getCodeList('COM001');
	userCdItems.value = await CommonCode.getCodeList('TAX002');
	statusCdItems.value = await CommonCode.getCodeList('COM030');
  renewalCdItems.value = await CommonCode.getCodeList('COM032');
  searchRenewalCdItems.value = await CommonCode.getCodeList('COM032');
	userCdItems.value.unshift({ title: '전체', value: '%'});
	statusCdItems.value.unshift({ title: '전체', value: '%'});
  searchRenewalCdItems.value.unshift({ title: '전체', value: '%'});

	regionCdItems.value = await CommonCode.getCodeList(businessCd+'001');
	trxCdItems.value = await CommonCode.getCodeList('COM031');


	insrYearCdItems.value = [];
	insrYearCdItems.value.unshift({ title: '전체', value: '%' });
	for (let year = new Date().getFullYear(); year >= 2022; year--) {
		insrYearCdItems.value.push({ title: year.toString(), value: year.toString(), rmk: null });
	}

	searchParams.value.data['business_cd'] = businessCd;
	searchParams.value.data['insr_year'] = '%';
	searchParams.value.data['user_cd'] = '%';
	searchParams.value.data['status_cd'] = '%';
  searchParams.value.data['renewal_cd'] = '%';
	searchParams.value.data['user_nm'] = '';

}

async function downloadAsExcel() {

  // alert("작업예정");
  // return false;

  let businessCdNm = businessCdItems.value.find(items => items.value == searchParams.value.data.business_cd).title;
  let insrYearCdNm = insrYearCdItems.value.find(items => items.value == searchParams.value.data.insr_year).title;
  let userCdNm = userCdItems.value.find(items => items.value == searchParams.value.data.user_cd).title;
  let fileNm = `${insrYearCdNm}_${businessCdNm}_계약갱신_${userCdNm}`;
  let isRun = false;

  if(userCdNm=='전체'){
    messageBoxDTO.value.setInfo('Excel', '가입 유형을 선택해 주세요.');
    return false;
  }
  await messageBoxDTO.value.setConfirm('다운로드', `${fileNm} 자료를 다운 받으시겠습니까?`, null, (result, params) => {
    isRun = result;
  });

  try {
    if (isRun) {
      let resultData;
      if(route.params.business_cd == 'ADV') {
        resultData = await apiADMIN.getADVExcel(searchParams.value.data);
      } else {
        resultData = await apiADMIN.getRenewalTAXExcel(searchParams.value.data);
      }

      searchParams.value.data['excel_filenm'] = fileNm;


      if (resultData.data.length == 0) {
        messageBoxDTO.value.setInfo('Excel', '데이타가 없습니다. 검색조건을 확인하세요.');
      } else {
        console.log("fileNm",fileNm)
        DOWNLOAD_RENEWAL_EXCEL(searchParams.value, resultData.data);
      }
    }
  } catch (e) {
    messageBoxDTO.value.setWarning('오류', `엑셀다운로드에 실패하였습니다<br/>${e}`);
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
const panel = ref(['panel-1', 'panel-2', 'panel-3', 'panel-4', 'panel-5', 'panel-6', 'panel-7']);

</script>
