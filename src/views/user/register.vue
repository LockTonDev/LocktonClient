<template>
   <v-app>
    
    <v-main>
      
      <!-- 상단영역 ( 로고 )-->
      <Header />

  
      <!-- 컨텐츠 영역 -->
      <v-container class="page-wrapper">  
        <!--회원가입 -->
        <BaseBreadcrumb
          :title="page.title"
          :subtitle="page.subtitle"
          :image="page.image"
        ></BaseBreadcrumb>
        <!-- <v-row>
          <v-col cols="12" sm="12">
            <BaseCard heading="* 초안 및 설계중인 작업화면으로 수시 변경">
            </BaseCard>
          </v-col>
        </v-row> -->
        <Form as="v-form" keep-values @submit="onSubmit" :initial-values="userDTO">
          <v-row justify="center">
            <v-col cols="12" sm="8" class="mb-16">
              <v-toolbar color="transparent">
                <v-toolbar-title>
                  <h1 class="text-h6 font-weight-bold">{{ currentTitle }}</h1>
                </v-toolbar-title>
                <div class="v-stepbar">
                  <v-avatar class="ml-4" :class="[step >= 1 ? 'active' : 'non-active']"
                    >1</v-avatar
                  >
                  <v-avatar class="ml-4" :class="[step >= 2 ? 'active' : 'non-active']"
                    >2</v-avatar
                  >
                  <v-avatar class="ml-4" :class="[step >= 3 ? 'active' : 'non-active']"
                    >3</v-avatar
                  >
                </div>
              </v-toolbar>
            

              <v-window v-model="step">
                <v-window-item :value="1">
                  <div class="v-box pa-10 pb-16">
                    <div class="pb-2">
                  
                      <VCheckBoxWithValidation
                        v-model="userDTO.agr_all_yn"
                        name="agr_all_yn"
                        label="전체동의"
                        @input="setAll()"
                      />
                    </div>
                    <ul class="v-board-table">
                      <li class="d-flex align-center">
                        <VCheckBoxWithValidation
                          v-model="userDTO.agr1_yn"
                          name="agr1_yn"
                          label="(필수) 서비스 이용 약관 동의"
                          @click="termsOfService = true"
                        />
                        <v-btn
                          color="dark"
                          variant="outlined"
                          @click="termsOfService = true"
                          >보기</v-btn
                        >
                        <TermsOfService
                          :agr_yn="userDTO.agr1_yn"
                          v-if="termsOfService"
                          @close="onTermsOfServiceClose"
                        ></TermsOfService>
        
                      </li>
                      <li class="d-flex align-center border-top-lightgray-1">
                        <VCheckBoxWithValidation
                          v-model="userDTO.agr2_yn"
                          name="agr2_yn"
                          label="(필수) 개인(신용)정보 처리 상세 동의"
                          @click="termsOfCreditInfo = true"
                        />
                        <v-btn
                          color="dark"
                          variant="outlined"
                          @click="termsOfCreditInfo = true"
                          >보기</v-btn
                        >
                        <TermsOfCreditInfo
                            :agr_yn="userDTO.agr2_yn"
                            v-if="termsOfCreditInfo"
                            @close="onTermsOfCreditInfoClose"
                        ></TermsOfCreditInfo>
                      </li>
                      <li class="d-flex align-center border-top-lightgray-1">
                        <VCheckBoxWithValidation
                          v-model="userDTO.agr3_yn"
                          name="agr3_yn"
                          label="(선택) 마케팅 개인정보 수집이용 동의"
                          @click="termsOfMarketing = true"
                        />
                        <v-btn
                          color="dark"
                          variant="outlined"
                          @click="termsOfMarketing = true"
                          >보기</v-btn
                        >
                        <TermsOfMarketing
                            :agr_yn="userDTO.agr3_yn"
                            v-if="termsOfMarketing"
                            @close="onTermsOfMarketingClose"
                        ></TermsOfMarketing>
                      </li>
                    </ul>
                  </div>
                </v-window-item>

                <v-window-item :value="2">
                    <!-- 개인 시작 -->
                    <v-row class="v-box pa-10" v-if="userDTO.user_cd === 'IND'">
                      <v-col cols="12">
                        <v-row class="v-board-table">
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>휴대전화</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col extend">
                              <VTextFieldWithValidation v-model="userDTO.user_hpno" name="user_hpno" label="본인인증 확인" single-line density="comfortable" :disabled="true" />
                              <v-btn variant="outlined" color="primary" class="ml-2" @click="isVerifyUserAuth()" :disabled="userDTO.user_hpno != ''" >본인인증</v-btn >
                              <div class="ml-2">
                                <p :class="verifyHp.success ? 'text-info' : 'text-error'">
                                  {{ verifyHp.message }}
                                </p>
                              </div>
                            </div>
                          </v-col>
                          <v-divider class="border-0" />
                          <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>이름</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="본인인증 확인" single-line density="comfortable" :disabled="true"/>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>생년월일</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.user_birth" name="user_birth" label="본인인증 확인" single-line density="comfortable" :disabled="true" />
                            </div>
                          </v-col>
                          <!-- 세무사 등록번호 시작 -->
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>등록번호</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">

                              <VTextFieldWithValidation v-model="userDTO.user_regno" name="user_regno" label="예) 1234567" single-line density="comfortable" :maskOption="{ mask: '#######' }" :disabled="verifyUserCostoms.success" />
                              <v-btn variant="outlined" color="primary" class="ml-2" @click="isVerifyUserRegNo()" :disabled="verifyUserCostoms.success" >인증</v-btn >
                              <div class="ml-2">
                                <p :class=" verifyUserCostoms.success ? 'text-info' : 'text-error'">
                                  {{ verifyUserCostoms.message }}
                                </p>
                              </div>
                            </div>
                          </v-col>
                          <!-- 세무사 등록번호 종료 -->
                          <v-divider class="border-0" />
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>이메일</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col extend">
                              <VTextFieldWithValidation v-model="userDTO.user_email" name="user_email" label="ex) user@locktonpi.com" single-line density="comfortable" maxlength="40"/>
                              <v-btn variant="outlined" color="primary" class="ml-2" @click="isVerifyUserEMail()" :disabled="userDTO.is_user_email">중복확인</v-btn >
                              <div class="ml-2">
                                <p :class="verifyEMail.success ? 'text-info' : 'text-error'">
                                  {{ verifyEMail.message }}
                                </p>
                              </div>
                            </div>
                          </v-col>
                          <!-- <v-col cols="12" sm="12" class="v-col">
                          <div class="head-col">
                            <p>이메일 인증</p>
                          </div>
                          <div class="data-col">
                            <VTextFieldWithValidation v-model="userDTO.corp_cust_email" name="corp_cust_email" label="ex) user@locktonpi.com" single-line density="comfortable"/>
                            <v-btn variant="outlined" color="primary" class="ml-2" @click="isVerifyUserEMail()">인증번호 확인</v-btn>
                          </div>
                        </v-col> -->

                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>아이디</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.user_id" name="user_id" label="아이디" single-line density="comfortable" maxlength="20"/>
                              <v-btn variant="outlined" color="primary" class="ml-2" @click="isVerifyUserId()" :disabled="userDTO.is_user_id">중복확인</v-btn >
                              <div class="mt-1 flex-grow-1">
                                <p :class=" verifyUser.success ? 'text-info' : 'text-error'">
                                 {{ verifyUser.message }}
                                </p>
                                <p class="text-caption font-weight-light color-gray flex-grow-1"><i class="mdi mdi-alert-circle-outline mr-2"></i>아이디는 6 ~ 20자 이하, 영어 및 숫자 조합으로 입력하세요.</p>
                              </div>
                            </div>
                          </v-col>

                          <v-divider class="border-0" />
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>비밀번호</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.user_pwd" name="user_pwd" label="비밀번호" type="password" single-line density="comfortable" maxlength="16" />
                              <div class="mt-1 flex-grow-1">
                                <p class="text-error">
                                  <p class="text-caption font-weight-light color-gray flex-grow-1"><i class="mdi mdi-alert-circle-outline mr-2"></i>비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 입력하세요.</p>
                                </p>
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>비밀번호 확인</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.user_pwd_chk" name="user_pwd_chk" label="비밀번호 확인" type="password" single-line density="comfortable" maxlength="16" @change="checkPassword"/>
                              <p :class=" verifyPasswordChk.success ? 'text-info' : 'text-error'">
                                &nbsp;&nbsp;{{ verifyPasswordChk.message }}
                              </p>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>사무소명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.corp_nm" name="corp_nm" label="사무소명" single-line density="comfortable" maxlength="25" />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>사업자번호</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation
                                v-model="userDTO.corp_cnno"
                                name="corp_cnno"
                                label="사업자번호"
                                :maskOption="{ mask: '###-##-#####' }"
                                single-line
                                density="comfortable"
                              />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>사무소 전화</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col col-tel">
                              <VTextFieldWithValidation v-model="userDTO.corp_telno1" name="corp_telno1" single-line density="comfortable" :maskOption="{ mask: '###' }" />
                              <span class="mx-1">-</span>
                              <VTextFieldWithValidation v-model="userDTO.corp_telno2" name="corp_telno2" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                              <span class="mx-1">-</span>
                              <VTextFieldWithValidation v-model="userDTO.corp_telno3" name="corp_telno3" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                              <!-- <VTextFieldWithValidation v-model="userDTO.corp_telno" name="corp_telno" label="사무소 전화" /> -->
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>사무소 팩스</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col col-fax">
                              <VTextFieldWithValidation v-model="userDTO.corp_faxno1" name="corp_faxno1" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                              <span class="mx-1">-</span>
                              <VTextFieldWithValidation v-model="userDTO.corp_faxno2" name="corp_faxno2" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                              <span class="mx-1">-</span>
                              <VTextFieldWithValidation v-model="userDTO.corp_faxno3" name="corp_faxno3" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                              <!-- <VTextFieldWithValidation v-model="userDTO.corp_faxno" name="corp_faxno" label="사무소 팩스" single-line density="comfortable" /> -->
                            </div>
                          </v-col>
                          <v-divider class="border-0" />
                          <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>담당자 성명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.corp_cust_nm" name="corp_cust_nm" label="담당자 성명" single-line density="comfortable" maxlength="20" />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd != 'ACC' && userDTO.business_cd != 'CAA' &&  userDTO.business_cd != 'PAT'">
                            <div class="head-col">
                              <p>소속 지방회</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VSelectWithValidation v-model="userDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" class="w-200"  single-line density="comfortable"></VSelectWithValidation>
                            </div>
                          </v-col>

                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>사무소 주소</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="userDTO.corp_post" name="corp_post" label="우편번호" single-line density="comfortable" :readonly="true" />
                              <v-btn variant="outlined" color="primary" @click="isDaumPostDialog = true" class="ml-2" >사무소 주소검색</v-btn >
                              <v-divider class="border-0" />
                              <VTextFieldWithValidation v-model="userDTO.corp_addr" name="corp_addr" label="주소" single-line density="comfortable" class="w-full" :readonly="true"/>
                              <VTextFieldWithValidation v-model="userDTO.corp_addr_dtl" name="corp_addr_dtl" label="상세주소" single-line density="comfortable" class="w-full" maxlength="25" />
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>

                    <!-- <v-col cols="12" class="py-6">
                    <VCheckBoxWithValidation  v-model="userDTO.recv_email_yn" name="recv_email_yn" label="메일 수신"/>
                    <p class="text-subtitle-2 font-weight-light"><i class="mdi mdi-alert-circle-outline ml-2"></i> 가입 안내, 증명서 발송 등 계약업무 진행을 알려드립니다.</p>
                    </v-col> -->
                    <v-col cols="12">
                      <div class="pa-6 bg-background">
                        <p class="font-weight-medium">
                          <i class="mdi mdi-alert-circle-outline mr-1"></i>유의사항
                        </p>
                        <ul class="pl-3 mt-2 text-body-2 list-style-type-bull">
                          <li>회원 가입 시 작성하는 정보(사무소 주소, 사무소 전화 등)는 향후 보험 가입 시 계약자 정보에 적용됩니다.</li>
                          <li>이미 보험 가입 중인 계약자는 회원 가입시 작성하는 사무소 주소, 사무소 전화 등으로 계약정보가<br/>변경되오니 신중히 기입하여 주시기 바랍니다.</li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 개인 종료 -->
                  
                  <!-- 법인 시작-->
                  <v-row class="v-box pa-10"  v-if="userDTO.user_cd === 'COR' || userDTO.user_cd === 'JNT'">
                    <v-col cols="12">
                      <v-row class="v-board-table">
                        <v-col cols="12" sm="12" class="v-col">
                          <div class="head-col">
                            <p>아이디</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col"> {{ userDTO.user_id }}</div>
                        </v-col>
                        <v-col cols="12" sm="12" class="v-col">
                          <div class="head-col">
                            <p>비밀번호</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VTextFieldWithValidation v-model="userDTO.user_pwd" name="user_pwd" label="비밀번호" type="password" single-line density="comfortable" maxlength="16" />
                            <div class="mt-1 flex-grow-1">
                              <p class="text-error">
                                <p class="text-caption font-weight-light color-red flex-grow-1"><i class="mdi mdi-alert-circle-outline mr-2"></i>임시비밀번호를 반드시 변경하여 주시기 바랍니다.</p>
                                <p class="text-caption font-weight-light color-gray flex-grow-1"><i class="mdi mdi-alert-circle-outline mr-2"></i>비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 입력하세요.</p>
                              </p>
                            </div>
                          </div>  
                        </v-col>
                        <v-col cols="12" sm="12" class="v-col">
                          <div class="head-col">
                            <p>비밀번호 확인</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VTextFieldWithValidation v-model="userDTO.user_pwd_chk" name="user_pwd_chk" label="비밀번호 확인" type="password" single-line density="comfortable" maxlength="16" @change="checkPassword"/>
                            <p :class=" verifyPasswordChk.success ? 'text-info' : 'text-error'">
                              &nbsp;&nbsp;{{ verifyPasswordChk.message }}
                            </p>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd ==='ADV'">
                          <div class="head-col">
                            <p>사무소 명</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">  {{ userDTO.user_nm }}
                            <!-- <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="" single-line density="comfortable" maxlength="25"/> -->
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd!=='ADV'">
                          <div class="head-col">
                            <p v-if="userDTO.user_cd==='COR'">법인명</p>
                            <p v-else-if="userDTO.user_cd=='JNT'">합동사무소 명</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">  {{ userDTO.user_nm }}
                            <!-- <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="" single-line density="comfortable" maxlength="25"/> -->
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd ==='ADV' || userDTO.business_cd ==='CAA' || userDTO.business_cd ==='PAT' ">
                          <div class="head-col">
                            <p>대표자 성명</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VTextFieldWithValidation
                                v-model="userDTO.corp_ceo_nm"
                                name="corp_ceo_nm"
                                label="대표자 성명"
                                single-line
                                density="comfortable"
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" class="v-col" v-if="userDTO.business_cd === 'ADV'">
                          <div class="head-col">
                            <p>사무소 형태</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VSelectWithValidation v-model="userDTO.corp_type" name="corp_type" label="사무소 형태" :items="corpTypeItems" class="w-200" single-line density="comfortable"
                            ></VSelectWithValidation>
                          </div>
                        </v-col>
                        
                        <!-- 관세사 추가 사항 시작 -->
                        <v-col cols="12" sm="12" class="v-col" v-if="userDTO.business_cd === 'CAA'">
                          <div class="head-col">
                            <p>사업 유형</p>
                            <sup class="text-error">*</sup>
                          </div>
                              <v-radio-group v-model="userDTO.corp_type" :mandatory="false" inline class="align-center d-flex" :disabled="true">
                                <v-radio label="법인" value="001" class="mr-4 d-inline-block"></v-radio>
                                <v-radio label="합동사무소" value="002" class="mr-4 d-inline-block"></v-radio>
                                <v-radio label="통관 취급 법인" value="003"></v-radio>
                              </v-radio-group>
                        </v-col>
                        <!-- 관세사 추가 사항 종료 -->
                        <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p>사업자번호</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VTextFieldWithValidation
                                v-model="userDTO.corp_cnno"
                                name="corp_cnno"
                                label="사업자번호"
                                :maskOption="{ mask: '###-##-#####' }"
                                single-line
                                density="comfortable"
                                :disabled="true"
                            />
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p>법인번호</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                              <p v-if="isDisabledCorpBnno()">해당 없음</p>
                              <VTextFieldWithValidation
                                v-model="userDTO.corp_bnno"
                                name="corp_bnno"
                                label="법인번호"
                                :maskOption="{ mask: '######-#######' }"
                                single-line
                                density="comfortable"
                                :disabled="isDisabledCorpBnno()"
                                v-else
                              />
                          </div>
                        </v-col>

                        <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p>사무소 전화</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col col-tel">
                            <VTextFieldWithValidation v-model="userDTO.corp_telno1" name="corp_telno1" single-line density="comfortable" :maskOption="{ mask: '###' }" />
                            <span class="mx-1">-</span>
                            <VTextFieldWithValidation v-model="userDTO.corp_telno2" name="corp_telno2" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                            <span class="mx-1">-</span>
                            <VTextFieldWithValidation v-model="userDTO.corp_telno3" name="corp_telno3" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p>사무소 팩스</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col col-fax">
                            <VTextFieldWithValidation v-model="userDTO.corp_faxno1" name="corp_faxno1" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                            <span class="mx-1">-</span>
                            <VTextFieldWithValidation v-model="userDTO.corp_faxno2" name="corp_faxno2" single-line density="comfortable" :maskOption="{ mask: '####' }"/>
                            <span class="mx-1">-</span>
                            <VTextFieldWithValidation v-model="userDTO.corp_faxno3" name="corp_faxno3" single-line density="comfortable" :maskOption="{ mask: '####' }" />
                          </div>
                        </v-col>
                        <v-divider class="border-0"/>
                        <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p>담당자 성명</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VTextFieldWithValidation v-model="userDTO.corp_cust_nm" name="corp_cust_nm" label="담당자 성명" single-line density="comfortable"  maxlength="20"/>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd != 'ACC' && userDTO.business_cd != 'CAA' &&  userDTO.business_cd != 'PAT'">
                            <div class="head-col">
                              <p>소속 지방회</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VSelectWithValidation v-model="userDTO.corp_region_cd" name="corp_region_cd" label="소속 지방회 선택" :items="regionCdItems" class="w-200" single-line density="comfortable"></VSelectWithValidation>
                            </div>
                          </v-col>
                        <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p>휴대전화</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col col">
                            <VTextFieldWithValidation v-model="userDTO.user_hpno" name="user_hpno" single-line density="comfortable" :maskOption="{ mask: '###-####-####' }" />
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" class="v-col">
                          <div class="head-col">
                            <p>이메일</p>
                            <sup class="text-error">*</sup>
                          </div>
                          
                          <div class="data-col extend">
                            <VTextFieldWithValidation v-model="userDTO.user_email" name="user_email" label="ex) user@locktonpi.com" single-line density="comfortable" maxlength="40"/>
                            <v-btn variant="outlined" color="primary" class="ml-2" @click="isVerifyUserEMail()" :disabled="userDTO.is_user_email">중복확인</v-btn >
                            <div class="ml-2">
                              <p :class="verifyEMail.success ? 'text-info' : 'text-error'">
                                {{ verifyEMail.message }}
                              </p>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" class="v-col">
                          <div class="head-col">
                            <p>사무소 주소</p>
                            <sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            <VTextFieldWithValidation v-model="userDTO.corp_post" name="corp_post" label="우편번호" single-line density="comfortable"  :readonly="true"/>
                            <v-btn variant="outlined"  color="primary" @click="isDaumPostDialog=true" class="ml-2">사무소 주소검색</v-btn>
                            <v-divider class="border-0"/>
                            <VTextFieldWithValidation v-model="userDTO.corp_addr" name="corp_addr" label="주소" single-line density="comfortable" class="w-full" :readonly="true"/>                            
                            <VTextFieldWithValidation v-model="userDTO.corp_addr_dtl" name="corp_addr_dtl" label="상세주소" single-line density="comfortable" class="w-full" maxlength="25"/>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- <v-col cols="12" class="py-6">
                      <v-checkbox v-model="selected" label="메일 수신" value="step2-check-4" hide-details="auto" class="v-checkbox"></v-checkbox>
                      <p class="text-subtitle-2 font-weight-light"><i class="mdi mdi-alert-circle-outline ml-2"></i> 가입 안내, 증명서 발송 등 계약업무 진행을 알려드립니다.</p>
                    </v-col>  -->
                    <v-col cols="12">
                      <div class="pa-6 bg-background">
                        <p class="font-weight-medium">
                          <i class="mdi mdi-alert-circle-outline mr-1"></i>유의사항
                        </p>
                        <ul class="pl-3 mt-2 text-body-2 list-style-type-bull">
                          <li>회원 가입 시 작성하는 정보(사무소 주소, 사무소 전화 등)는 향후 보험 가입 시 계약자 정보에 적용됩니다.</li>
                          <li>이미 보험 가입 중인 계약자는 회원 가입시 작성하는 사무소 주소, 사무소 전화 등으로 계약정보가 변경되오니 신중히 기입하여 주시기 바랍니다.</li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>  
                  <!-- 법인 종료-->
                
              </v-window-item>

              <v-window-item :value="3">
                <v-row>
                  <v-col cols="12" class="d-flex justify-center pa-0">
                    <v-card class="w-sm-600 v-box-table mt-4 mb-12 text-center">
                      <v-card-text class="px-14 py-16">
                        <v-avatar color="success" size="x-large">
                          <vue-feather type="check" class="feather-xlg"></vue-feather>
                        </v-avatar>
                        <p class="text-h5 font-weight-medium mt-10">
                          <span class="text-primary">회원가입</span>이 완료되었습니다.
                        </p>
                        <div class="ma-auto v-col-12 v-col-sm-10 mt-8">
                          <v-row class="v-board-table">
                            <v-col cols="12" sm="12" class="v-col">
                              <div class="head-col justify-center">
                                <p class="py-2">이름</p>
                              </div>
                              <div class="data-col ml-16">
                                <p class="py-2">{{ userDTO.user_nm }}</p>
                              </div>
                            </v-col>
                            <v-col cols="12" sm="12" class="v-col">
                              <div class="head-col justify-center">
                                <p class="py-2">아이디</p>
                              </div>
                              <div class="data-col ml-16">
                                <p class="py-2">{{ userDTO.user_id }}</p>
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                        <p class="text-body-2 text-gray mt-2">
                          * 가입 정보를 변경하시려면 로그인 후 마이페이지에서
                          수정해주세요.
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center pa-0">
                    <v-btn
                      variant="outlined"
                      color="dark"
                      class="mr-4"
                      size="x-large"
                      to="/"
                      >메인으로 가기</v-btn
                    >
                    <v-btn
                      variant="tonal"
                      color="secondary"
                      class="bg-grey-darken-4"
                      size="x-large"
                      to="/user/login"
                      >로그인</v-btn
                    >
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>

            <div class="d-flex justify-center mt-10">
              <v-btn
                size="x-large"
                variant="outlined"
                color="dark"
                v-if="step > 1 && step < 3"
                @click="step--"
                >돌아가기</v-btn
              >
              <v-btn
                size="x-large"
                variant="flat"
                color="dark"
                v-if="step < 2"
                depressed
                @click="onNext()"
                >다음</v-btn
              >
              <v-btn
                size="x-large"
                variant="flat"
                color="primary"
                @click="onSubmit()"
                v-if="step == 2"
                depressed
                class="ml-4"
                >확인</v-btn
              >
            </div>
          </v-col>
          </v-row>
        </Form>

        <!--LAYER : 주소검색 -->
        <v-dialog persistent v-model="isDaumPostDialog" width="600">
          <v-card>
            <v-card-text>
              <div class="d-flex justify-space-between">
                <h3 class="text-h6 font-weight-bold">사무소 주소검색</h3>
                <v-avatar
                  color="dark"
                  @click="isDaumPostDialog = false"
                  class="pointer-cursor"
                >
                  <v-icon small title="닫기">mdi-close</v-icon>
                </v-avatar>
              </div>

              <VueDaumPostcode @complete="onComplete_DaumPost"></VueDaumPostcode>
            </v-card-text>
          </v-card>
        </v-dialog>
        <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
      
      </v-container>

      <!-- 하단영역 -->
      <Footer />

    </v-main>
  </v-app>
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
import { ref, computed, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

import { Form, Field, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import { UserYup } from '@/schema';
import { UserDTO } from '@/model';
import Header from "@/layouts/default/Header.vue";
import Footer from "@/layouts/default/Footer.vue";
import BaseCard from '@/components/BaseCard.vue';
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';
import TermsOfService from '@/components/TermsOfService.vue';
import TermsOfPersonalInfo from '@/components/TermsOfPersonalInfo.vue';
import TermsOfMarketing from '@/components/TermsOfMarketing.vue';
import TermsOfCreditInfo from '@/components/TermsOfCreditInfo.vue';

import { MessageBoxDTO, CommonCode } from '@/model';
import MessageBox from '@/components/MessageBox.vue';


import apiUser from '../../api/api/user.api';
import G_ITEMS from '../json/itemsData.json';

const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

const route = useRoute();
const { handleSubmit, setFieldTouched, setFieldValue } = useForm();

const userDTO = ref(new UserDTO());
const messageBoxDTO = ref(new MessageBoxDTO());

const businessCd = route.params.business_cd;


const regionCdItems = ref([]);
const corpTypeItems = ref([]);
const radios = ref('radio1');
const isDaumPostDialog = ref(false);

const verifyUserCostoms = ref({ success: false, message: '' });
const verifyUser = ref({ success: false, message: '' });
const verifyPasswordChk = ref({ success: false, message: '' });
const verifyEMail = ref({ success: false, message: '', code: '' });
const verifyHp = ref({ success: false, message: '', code: '' });

const msgVerifyUserCostoms = ref('');

const termsOfService = ref(false);
const termsOfPersonalInfo = ref(false);
const termsOfMarketing = ref(false);
const termsOfCreditInfo = ref(false);

const page = ref({
  title: '회원가입',
  subtitle: '개인회원',
  image: '../../assets/images/background/bg-register1.jpg'
});
const selected = ref(['']);

const step = ref(1);

const currentTitle = computed(() => {
  switch (step.value) {
    case 1:
      return '약관 동의';
    case 2:
      return '회원 정보 입력';
    default:
      return '가입 완료';
  }
});
watch(
  () => [userDTO.value.agr1_yn, userDTO.value.agr2_yn, userDTO.value.agr3_yn],
  ([agr1, agr2, agr3]) => {
    if (agr1 === 'N' || agr2 === 'N' || agr3 === 'N') {
      userDTO.value.agr_all_yn = 'N';
    }

    if (agr1 === 'Y' && agr2 === 'Y' && agr3 === 'Y') {
      userDTO.value.agr_all_yn = 'Y';
    }
  }
);

watch(
  () => userDTO.value.user_id,
  (newValue, oldValue) => {
    verifyUser.value.message = '';
    userDTO.value.is_user_id = false;
  }
);

watch(
  () => userDTO.value.user_email,
  (newValue, oldValue) => {
    verifyEMail.value.message = '';
    userDTO.value.is_user_email = false;
  }
);

watch(
    () => userDTO.value.corp_type,
    (newValue, oldValue) => {
      if(newValue !== '003'){
        userDTO.value.corp_bnno = ''
      }
    }
);



function onComplete_DaumPost(result: VueDaumPostcodeCompleteResult) {
  userDTO.value.corp_post = result.zonecode;
  userDTO.value.corp_addr = result.address;
  userDTO.value.corp_addr_dtl = '';
  isDaumPostDialog.value = false;
}

/**
 * 사용자 관세사 등록번호 유효성 검사
 */
async function isVerifyUserRegNo() {
  
  if(userDTO.value.user_nm == '') {
    messageBoxDTO.value.setWarning('인증 실패', `본인인증 후 등록번호 인증하세요.`);
    return false;
  }
  if(userDTO.value.user_regno === '') {
    messageBoxDTO.value.setWarning('인증 실패', `등록번호를 입력하세요.`);
    return false;
  }

  const params = {
    business_cd: userDTO.value.business_cd,
    reg_no: userDTO.value.user_regno,
    nm: userDTO.value.user_nm,
    birth: userDTO.value.user_birth
  };
  const retData = await apiUser.isVerifyUserRegNo(params);

  verifyUserCostoms.value.success = retData.success;
  userDTO.value.is_user_regno = retData.success;
  if (retData.success) {
    verifyUserCostoms.value.message = retData.message;
  } else {
    let message;

    switch (userDTO.value.business_cd) {
      case 'TAX': message = '세무사등록증 상의 등록번호(3~7자리 숫자)를 확인하여 주시기 바라며, 등록번호가 정상임에도 인증 실패되는 경우 록톤코리아로 연락주시기 바랍니다.(T. 02-2011-0300)<br/><br/>* 신규 가입을 원하는 개인 세무사는 세무사등록증을 먼저 록톤으로 보내 세무사회원 확인 후 가입 진행되니 세무사등록증을 팩스 송부 후 안내 받으시기 바랍니다.(F. 0503-8379-2008)'; break;
      case 'ACC': message = '회계사등록증 상의 등록번호(3~7자리 숫자)를 확인하여 주시기 바라며, 등록번호가 정상임에도 인증 실패되는 경우 록톤코리아로 연락주시기 바랍니다.(T. 02-2011-0300)<br/><br/>* 신규 가입을 원하는 개인 회계사는 회계사등록증을 먼저 록톤으로 보내 회계사회원 확인 후 가입 진행되니 회계사등록증을 팩스 송부 후 안내 받으시기 바랍니다.(F. 0503-8379-2008)'; break;
      case 'ADV': message = '변호사등록증 상의 등록번호(3~7자리 숫자)를 확인하여 주시기 바라며, 등록번호가 정상임에도 인증 실패되는 경우 록톤코리아로 연락주시기 바랍니다.(T. 02-2011-0300)<br/><br/>* 신규 가입을 원하는 개인 변호사는 변호사등록증을 먼저 록톤으로 보내 변호사회원 확인 후 가입 진행되니 변호사등록증을 팩스 송부 후 안내 받으시기 바랍니다.(F. 0503-8379-2008)'; break;
      case 'CAA': message = '관세사등록증 상의 등록번호(3~7자리 숫자)를 확인하여 주시기 바라며, 등록번호가 정상임에도 인증 실패되는 경우 록톤코리아로 연락주시기 바랍니다.(T. 02-2011-0300)<br/><br/>* 신규 가입을 원하는 개인 관세사는 관세사등록증을 먼저 록톤으로 보내 관세사회원 확인 후 가입 진행되니 관세사등록증을 팩스 송부 후 안내 받으시기 바랍니다.(F. 0503-8379-2008)'; break;
      case 'PAT': message = '변리사등록증 상의 등록번호(3~7자리 숫자)를 확인하여 주시기 바라며, 등록번호가 정상임에도 인증 실패되는 경우 록톤코리아로 연락주시기 바랍니다.(T. 02-2011-0300)<br/><br/>* 신규 가입을 원하는 개인 변리사는 변리사등록증을 먼저 록톤으로 보내 변리사회원 확인 후 가입 진행되니 변리사등록증을 팩스 송부 후 안내 받으시기 바랍니다.(F. 0503-8379-2008)'; break;
      default: message = '인증에 실패하였습니다.';
    }
    messageBoxDTO.value.setInfo( '인증 실패', message);
  }

}

/**
 * 사용자 아이디 유효성 검사
 */
async function isVerifyUserId() {

  const validationSchema = UserYup.VALID_USER_ID_IND;
  const isValidate = await validationSchema.validate(userDTO.value, { abortEarly: false })
    .then(() => {
      return true;
    })
    .catch(error => {
      // 유효성 검사 실패
      // console.log(error.inner);
      messageBoxDTO.value.setWarning( '입력확인', error.inner[0].message);
      return false;
    });

  if (isValidate) {
    const params = { business_cd: userDTO.value.business_cd, user_cd: userDTO.value.user_cd, user_id: userDTO.value.user_id };
    const retData = await apiUser.isVerifyUserId(params);

    verifyUser.value.success = retData.success;
    verifyUser.value.message = retData.message;
    userDTO.value.is_user_id = retData.success;
  }
}

/**
 * 사용자 이메일 유효성 검사
 */
async function isVerifyUserEMail() {

  const validationSchema = UserYup.VALID_EMAIL;
  const isValidate = await validationSchema.validate(userDTO.value, { abortEarly: false })
    .then(() => {
      return true;
    })
    .catch(error => {
      // 유효성 검사 실패
      // console.log(error.inner);
      messageBoxDTO.value.setWarning( '입력확인', error.inner[0].message);
      return false;
    });

  if (isValidate) {
    const params = { business_cd: userDTO.value.business_cd, user_cd: userDTO.value.user_cd, user_email: userDTO.value.user_email };

    const retData = await apiUser.isVerifyUserEMail(params);
    verifyEMail.value.success = retData.success;
    verifyEMail.value.message = retData.message;
    userDTO.value.is_user_email = retData.success;

  }
}


async function checkValidation() {
  // console.log(`INSERT_${userDTO.value.business_cd}_${userDTO.value.user_cd}_STEP${step.value}`);
  const validationSchema = UserYup[`INSERT_${userDTO.value.business_cd}_${userDTO.value.user_cd}_STEP${step.value}`];
  const isValidate = await validationSchema.validate(userDTO.value, { abortEarly: false })
    .then(() => {
      return true;
    })
    .catch(error => {
      // 유효성 검사 실패
      console.log(error.inner);
      messageBoxDTO.value.setWarning( '입력확인', error.inner[0].message);
      return false;
    });

  return isValidate;
}

async function onNext() {
  if (!await checkValidation()) return false;
  step.value = step.value + 1;
}

function isDisabledCorpBnno() {
  if (userDTO.value.business_cd==='ADV' && userDTO.value.corp_type !== '003')
    return true;

  if (userDTO.value.business_cd==='CAA' && userDTO.value.corp_type === '002')
    return true;

  if (userDTO.value.business_cd==='PAT' && userDTO.value.user_cd === 'JNT')
    return true;
  return false;
}



/**
 * 회원가입
 * @param values 로그인 정보
 */
async function onSubmit(params: any) {

  if (!await checkValidation()) return false;
  let result = null;

  if (userDTO.value.user_cd === 'COR' || userDTO.value.user_cd === 'JNT') {
    // 사용자 등록
    userDTO.value.ignore_chk_pw = true;
    result = await apiUser.setUserInfo(userDTO.value);
  } else {
    // 사용자 등록
    result = await apiUser.setUserRegistor(userDTO.value);
  }
  // 회원가입 페이지로 이동
  if (result.success) {
    step.value++;
  } else {
    messageBoxDTO.value.setWarning( '회원가입', `회원가입에 실패하였습니다. 관리자에게 문의하세요.<br/>${result.message}`);
  }
}

async function isVerifyUserAuth() {
  const IMP = window.IMP;
  IMP.init('imp65356148');

  IMP.certification(
    {
      merchant_uid: '휴대폰본인인증'
    },
    rsp => {
      if (rsp.success) {
        isVerifyUserHpWithUser(rsp.imp_uid);
      } else {
      }
    }
  );
}

async function isVerifyUserHpWithUser(imp_uid: string) {
  const result = await apiUser.isVerifyUserHpWithUser(imp_uid);

  if (result.success) {
    if (userDTO.value.user_cd === 'IND') {
      userDTO.value.user_nm = result.data.name;
      userDTO.value.user_birth = result.data.birthday.replace(/-/g, '').substring(2);
      userDTO.value.user_hpno = result.data.phone.replace(/^01([0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '010-$2-$3');

    } else if (_AUTH_USER.value.userCd === 'COR') {
      userDTO.value.user_hpno = result.data.phone.replace(/^01([0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '010-$2-$3');
    }
    verifyHp.value.success = result.success;
    verifyHp.value.message = result.message;
  } else {
    // console.log(result);
    if (result.message === "DUPLICATION_FAILED") {
      messageBoxDTO.value.setWarning('회원가입', '가입할 수 없는 정보입니다.<br/>정보를 재확인하시거나, 가입 여부를 체크하여 주시기 바랍니다.');
    } else {
      verifyHp.value.success = result.success;
      verifyHp.value.message = result.message;
    }
  }
}

function checkPassword(){
  if(userDTO.value.user_pwd !== userDTO.value.user_pwd_chk){
    verifyPasswordChk.value.success = false;
    verifyPasswordChk.value.message = '비밀번호가 일치하지 않습니다.';
  }else {
    verifyPasswordChk.value.success = true;
    verifyPasswordChk.value.message = '비밀번호가 일치합니다.';
  }
}

function setAll() {
    userDTO.value.agr1_yn = userDTO.value.agr_all_yn;
    userDTO.value.agr2_yn = userDTO.value.agr_all_yn;
    userDTO.value.agr3_yn = userDTO.value.agr_all_yn;
}

function onTermsOfServiceClose(agrs: any) {
  termsOfService.value = false;
  //userDTO.value.agr1_yn = agrs.value;
}
function onTermsOfCreditInfoClose(agrs: any) {
  termsOfCreditInfo.value = false;
  userDTO.value.agr2_yn = agrs.value;
}
function onTermsOfMarketingClose(agrs: any) {
  termsOfMarketing.value = false;
  userDTO.value.agr3_yn = agrs.value;
}
async function InitCode(){
  regionCdItems.value = await CommonCode.getCodeList(businessCd+'001');
  corpTypeItems.value = await CommonCode.getCodeList('COM050');
}
// 초기 로딩
onMounted(async () => {
  InitCode();
  // 상태 정상
  userDTO.value.status_cd = '30';

  if (_AUTH_USER.value) {
    // 최초가입시 하드코딩 추후 변경예정
    const userResult = await apiUser.getUserInfo();
    Object.assign(userDTO.value, userResult[0]);

    userDTO.value.status_cd = '30';

    // 최초가입시 사업자번호를 아이디값으로 설정한다.
    userDTO.value.corp_cnno = userDTO.value.user_id;

    page.value.title = '회원가입';
    if(_AUTH_USER.value.userCd==="COR") {
      page.value.subtitle = '법인회원';
    }else if(_AUTH_USER.value.userCd==="JNT") {
      if(userDTO.value.business_cd==="CAA"){
        page.value.subtitle = '합동사무소 회원';
      }else {
        page.value.subtitle = '복수회원';
      }
    }
  } else {
    // 최초가입시 하드코딩 추후 변경예정
    userDTO.value.business_cd = businessCd;
    userDTO.value.user_cd = 'IND';
  }
});
</script>
