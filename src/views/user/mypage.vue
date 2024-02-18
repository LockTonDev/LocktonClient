<template>
  <v-row justify="center" align="center" class="my-16">
    <v-col cols="12" sm="8" class="pa-0">
      <div class="border-bottom-lightgray-1">
        <v-tabs v-model="tab" fixed-tabs color="primary">
          <v-tab value="1" class="font-weight-bold text-18"
            >회원정보 수정</v-tab
          >
          <v-tab value="2" class="font-weight-bold text-18"
            >비밀번호 변경</v-tab
          >
          <v-tab value="3" class="font-weight-bold text-18">회원 탈퇴</v-tab>
        </v-tabs>
      </div>
      <v-card class="pa-6 pt-4 v-box mt-10">
        <v-window v-model="tab">
          <!--회원정보 수정-->
          <v-window-item value="1">
            <!--회원정보 수정 (1)-->
            <v-card-text class="d-block" v-if="activeStep == 1">
              <Form
                as="v-form"
                @submit="isVerifyPassword"
                :initial-values="USER_DATA"
              >
                <p class="mt-6 text-body-1">
                  회원님의 정보를 안전하게 보호하기 위해<br /><span
                    class="text-primary"
                    >비밀번호를 다시 한 번 입력</span
                  >해 주세요.
                </p>
                <v-row class="v-board-table mt-4">
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>아이디</p>
                    </div>
                    <div class="data-col">
                      <p class="px-4 py-2">{{ USER_DATA.user_id }}</p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>비밀번호</p>
                    </div>
                    <div class="data-col">
                      <p class="text-caption text-error flex-grow-1 w-full d-flex line-height-1-4">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>
                        <span>보안정책의 일환으로 비밀번호 입력 오류시 자동 로그아웃 되오니<br/>정확하게 입력하여 주시기 바랍니다.</span>
                      </p>
                      <Field name="user_id" type="hidden" v-show="false" />
                      <VTextFieldWithValidation
                        name="user_pwd"
                        label="비밀번호"
                        type="password"
                        class="mt-4"
                        maxlength="16"
                      />
                      <!-- <div class="mt-1 flex-grow-1">
                        <p class="text-error">
                          <p class="text-caption font-weight-light color-gray flex-grow-1"><i class="mdi mdi-alert-circle-outline mr-2"></i>비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 입력하세요.</p>
                        </p>
                      </div> -->
              
                      <div class="mt-2">
                        <p :class="verifyUser.success ? 'text-info' : 'text-error'">
                          {{ verifyUser.message }}
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <div class="d-flex justify-center mt-10">
                  <v-btn
                    size="x-large"
                    variant="outlined"
                    color="dark"
                    type="submit"
                    >확인</v-btn
                  >
                </div>
              </Form>
            </v-card-text>

            <!--회원정보 수정 (2)-->
            <v-card-text class="d-block" v-if="activeStep == 2">
              <Form
                as="v-form"
                @submit="onUpdateUserInfoSubmit"
                :initial-values="userDTO"
              >
                <!--법인-->
                <v-row class="mt-4" v-if="isCorp">
                  <v-col cols="12">
                    <v-row class="v-board-table">
                        <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p v-if="userDTO.user_cd === 'COR'">법인명</p>
                            <p v-if="userDTO.user_cd === 'JNT'">사무소 명</p><sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            {{ userDTO.user_nm }}
                            <!-- <VTextFieldWithValidation
                              v-model="userDTO.user_nm"
                              name="user_nm"
                              label="법인명"
                              single-line
                              density="comfortable"
                              maxlength="25"
                            /> -->
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" class="v-col">
                            <div class="head-col">
                              <p>대표자 성명</p><sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation
                                v-model="userDTO.corp_ceo_nm"
                                name="corp_ceo_nm"
                                placeholder="대표자 성명"
                                single-line
                                density="comfortable"
                                maxlength="25"
                              />
                            </div>
                          </v-col>                       
                        <!-- <v-col cols="12" sm="6" class="v-col">
                          <div class="head-col">
                            <p>아이디</p><sup class="text-error">*</sup>
                          </div>
                          <div class="data-col">
                            {{ userDTO.user_id }}
                          </div>
                        </v-col> -->
                      <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd === 'ADV'">
                        <div class="head-col">
                          <p>사무소 형태</p>
                          <sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          <VSelectWithValidation v-model="userDTO.corp_type" name="corp_type" label="사무소 형태" :items="corpTypeItems" class="w-200" single-line density="comfortable" disabled="true"></VSelectWithValidation>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" class="v-col">
                        <div class="head-col">
                          <p>법인번호</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          {{ userDTO.corp_bnno }}
                          <!-- <VTextFieldWithValidation
                            v-model="userDTO.corp_bnno"
                            name="corp_bnno"
                            label="법인번호"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '######-#######' }"
                          /> -->
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" class="v-col">
                        <div class="head-col">
                          <p>사업자번호</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          {{ userDTO.corp_cnno }}
                          <!-- <VTextFieldWithValidation
                          v-model="userDTO.corp_cnno"
                          name="corp_cnno"
                          label="사업자번호"
                          single-line
                          density="comfortable"
                          :maskOption="{ mask: '###-##-#####' }"
                          :disabled="true"
                        /> -->
                        </div>
                      </v-col>                      
                      <v-col cols="12" sm="12" class="v-col" v-if="userDTO.business_cd === 'CAA'">
                        <div class="head-col">
                          <p>사업 유형</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          <v-radio-group
                            v-model="userDTO.corp_type"
                            inline
                            class="align-center d-flex"
                          >
                            <v-radio
                              label="법인"
                              value="법인"
                              class="mr-4"
                            ></v-radio>
                            <v-radio
                              label="합동사무소"
                              value="합동"
                              class="mr-4"
                            ></v-radio>
                            <v-radio
                              label="통관 취급 법인"
                              value="통관"
                            ></v-radio>
                          </v-radio-group>
                        </div>
                      </v-col>


                      <v-col cols="12" sm="6" class="v-col">
                        <div class="head-col">
                          <p>사무소 전화</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col col-tel">
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_telno1"
                            name="corp_telno1"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '###' }"
                          />
                          <span class="mx-1">-</span>
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_telno2"
                            name="corp_telno2"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '####' }"
                          />
                          <span class="mx-1">-</span>
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_telno3"
                            name="corp_telno3"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '####' }"
                          />
                          <!-- <VTextFieldWithValidation
                            v-model="userDTO.corp_telno"
                            name="corp_telno"
                            label="사무소 전화"
                            single-line
                            density="comfortable"
                          /> -->
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" class="v-col">
                        <div class="head-col">
                          <p>사무소 팩스</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col col-fax">
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_faxno1"
                            name="corp_faxno1"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '####' }"
                          />
                          <span class="mx-1">-</span>
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_faxno2"
                            name="corp_faxno2"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '####' }"
                          />
                          <span class="mx-1">-</span>
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_faxno3"
                            name="corp_faxno3"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '####' }"
                          />
                          <!-- <VTextFieldWithValidation
                            v-model="userDTO.corp_faxno"
                            name="corp_faxno"
                            label="사무소 팩스"
                            single-line
                            density="comfortable"
                          /> -->
                        </div>
                      </v-col>
                      <v-divider class="border-0" />
                      <v-col cols="12" sm="6" class="v-col">
                        <div class="head-col">
                          <p>담당자 성명</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_cust_nm"
                            name="corp_cust_nm"
                            label="담당자 성명"
                            single-line
                            density="comfortable"
                            maxlength="20"
                          />
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd === 'TAX' || userDTO.business_cd === 'LAW'">
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
                          <p>이메일</p>
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
                          <p>휴대전화</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          <VTextFieldWithValidation
                            v-model="userDTO.user_hpno"
                            name="user_hpno"
                            label="휴대전화"
                            single-line
                            density="comfortable"
                            :maskOption="{ mask: '###-####-####' }"
                          />
                        </div>
                      </v-col>
                      <v-col cols="12" sm="12" class="v-col">
                        <div class="head-col">
                          <p>사무소 주소</p><sup class="text-error">*</sup>
                        </div>
                        <div class="data-col">
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_post"
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
                            >사무소 주소검색</v-btn
                          >
                          <v-divider class="border-0" />
                          <VTextFieldWithValidation
                            v-model="userDTO.corp_addr"
                            name="corp_addr"
                            label="주소"
                            single-line
                            density="comfortable"
                            class="w-full"
                            readonly
                          />

                          <VTextFieldWithValidation
                            v-model="userDTO.corp_addr_dtl"
                            name="corp_addr_dtl"
                            label="상세주소"
                            single-line
                            density="comfortable"
                            class="w-full"
                            maxlength="25"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <!-- 개인 -->
                <v-row class="v-board-table mt-4" v-if="isUser">
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>이름</p><sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ userDTO.user_nm }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>생년월일</p><sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ userDTO.user_birth }}
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>등록번호</p><sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      {{ userDTO.user_regno }}
                    </div>
                  </v-col>                 
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>휴대전화</p><sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="userDTO.user_hpno"
                        name="user_hpno"
                        label="휴대전화"
                        single-line
                        density="comfortable"
                        :disabled="true"
                      />
                      <v-btn variant="outlined" color="primary" class="ml-2" @click="isVerifyUserAuth()">번호변경</v-btn >
                      <div class="ml-2">
                        <p :class="verifyHp.success ? 'text-info' : 'text-error'">
                          {{ verifyHp.message }}
                        </p>
                      </div>
                    </div>
                  </v-col>
                  <v-divider class="border-0" />
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col">
                      <p>이메일</p><sup class="text-error">*</sup>
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
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_nm"
                        name="corp_nm"
                        label="사무소명"
                        single-line
                        density="comfortable"
                        maxlength="25"
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
                        v-model="userDTO.corp_cnno"
                        name="corp_cnno"
                        placeholder="사업자번호"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '###-##-#####' }"
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
                        v-model="userDTO.corp_telno1"
                        name="corp_telno1"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '###' }"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_telno2"
                        name="corp_telno2"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_telno3"
                        name="corp_telno3"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                      />
                      <!-- <VTextFieldWithValidation
                        v-model="userDTO.corp_telno"
                        name="corp_telno"
                        label="사무소 전화"
                        single-line
                        density="comfortable"
                      /> -->
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>사무소 팩스</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col col-fax">
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_faxno1"
                        name="corp_faxno1"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_faxno2"
                        name="corp_faxno2"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                      />
                      <span class="mx-1">-</span>
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_faxno3"
                        name="corp_faxno3"
                        single-line
                        density="comfortable"
                        :maskOption="{ mask: '####' }"
                      />
                      <!-- <VTextFieldWithValidation
                        v-model="userDTO.corp_faxno"
                        name="corp_faxno"
                        label="사무소 팩스"
                        single-line
                        density="comfortable"
                      /> -->
                    </div>
                  </v-col>
                  <v-divider class="border-0" />
                  <v-col cols="12" sm="6" class="v-col">
                    <div class="head-col">
                      <p>담당자 성명</p>
                      <sup class="text-error">*</sup>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_cust_nm"
                        name="corp_cust_nm"
                        label="담당자 성명"
                        single-line
                        density="comfortable"
                        maxlength="20"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" class="v-col" v-if="userDTO.business_cd == 'TAX' || userDTO.business_cd === 'LAW'">
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
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_post"
                        name="corp_post"
                        label="우편번호"
                        single-line
                        density="comfortable"
                        :readonly="true"
                      />
                      <v-btn
                        variant="outlined"
                        color="primary"
                        @click="isDaumPostDialog = true"
                        class="ml-2"
                        >사무소 주소검색</v-btn
                      >
                      <v-divider class="border-0" />
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_addr"
                        name="corp_addr"
                        label="주소"
                        single-line
                        density="comfortable"
                        class="w-full"
                        :readonly="true"
                      />
                      <VTextFieldWithValidation
                        v-model="userDTO.corp_addr_dtl"
                        name="corp_addr_dtl"
                        label="상세주소"
                        single-line
                        density="comfortable"
                        class="w-full"
                        maxlength="25"
                      />
                    </div>
                  </v-col>

                </v-row>
                <!-- <v-row class="v-board-table mt-8">
                <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>메일 수신</p>
                  </div>
                  <div class="data-col">
                    <div class="d-flex">
                      <VCheckBoxWithValidation  v-model="userDTO.recv_email_yn" name="agr_all_yn" label="메일 수신 여부"/>
                    </div>
                    <p class="text-subtitle-2 text-gray font-weight-light"><i class="mdi mdi-alert-circle-outline ml-2"></i> 메일 수신 동의 시 가입 안내, 증명서 발송 등 계약업무 진행을 알려드립니다.</p>
                  </div>
                </v-col>           
              </v-row> -->
                <div class="d-flex justify-center mt-10">
                  <v-btn
                    size="x-large"
                    variant="flat"
                    color="gray"
                    type="button"
                    @click="
                      (verifyUser.success = false),
                        (verifyUser.message = ''),
                        activeStep = 1
                    "
                    >취소</v-btn
                  >
                  <v-btn
                    size="x-large"
                    variant="flat"
                    color="primary"
                    type="submit"
                    class="ml-4"
                    >확인</v-btn
                  >
                </div>
              </Form>

              <v-row class="mt-4" >
                  <v-col cols="12">
                    <div class="mt-6 pa-8 bg-background">
                      <p class="text-body-1 font-weight-medium">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>유의사항
                      </p>
                      <ul class="pl-3 text-body-2 mt-2 list-style-type-bull">
                        <li>회원정보 수정에서 변경되는 내용(주소, 전화번호 등)은 보험가입정보에 동일하게 반영되오니 신중히 기입하여 주시기 바랍니다.</li>
                      </ul>
                    </div>
                  </v-col>
                </v-row>
                  
            </v-card-text>

            <!--회원정보 수정 (3)-->
            <v-card-text class="d-block" v-if="activeStep == 3">
              <div class="py-16 px-4 mt-4 text-center">
                <v-avatar color="success" size="x-large">
                  <vue-feather type="check"></vue-feather>
                </v-avatar>
                <p class="text-h5 font-weight-medium mt-8">
                  <span class="text-primary">회원정보 수정</span>이
                  완료되었습니다.
                </p>
                <v-btn
                  size="x-large"
                  variant="flat"
                  color="primary"
                  @click="activeStep = 1"
                  class="mt-4"
                  >돌아가기</v-btn
                >
              </div>
            </v-card-text>
          </v-window-item>

          <!--비밀번호 수정-->
          <v-window-item value="2">
            <!--비밀번호 수정 (1)-->
            <v-card-text class="d-block" v-if="activeStep != 4">
              <p class="mt-6 text-body-1">
                회원님의 정보를 안전하게 보호하기 위해<br /><span class="text-primary">현재 비밀번호</span>를 입력해 주세요.
              </p>              
              <div class="mt-4 pa-6 bg-background">
                <ul class="pl-3 list-style-type-bull">
                  <li>비밀번호는 주기적(최소 6개월)으로 변경해 주시기 바랍니다.</li>
                  <li>비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 사용할 수 있습니다.</li>
                </ul>
              </div>
              <Form
                as="v-form"
                @submit="isVerifyPasswordBeforeUpdate"
                :initial-values="USER_DATA"
              >
                <v-row class="v-board-table mt-4">
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col w-25">
                      <p>현재 비밀번호</p>
                    </div>
                    <div class="data-col">
                      <p class="text-caption text-error flex-grow-1 w-full d-flex line-height-1-4 mb-4">
                        <i class="mdi mdi-alert-circle-outline mr-1"></i>
                        <span>보안정책의 일환으로 비밀번호 입력 오류시 자동 로그아웃 되오니<br/> 정확하게 입력하여 주시기 바랍니다.</span>
                      </p>
                      <div class="d-flex w-full align-center">
                        <VTextFieldWithValidation
                          v-model="USER_DATA.user_pwd"
                          name="user_pwd"
                          label="현재 비밀번호"
                          type="password"
                          maxlength="16"
                          :disabled="verifyPassword.success"
                        />
                        <v-btn
                          variant="outlined"
                          color="primary"
                          class="ml-2"
                          type="submit"
                          :disabled="verifyPassword.success"
                          size="large"
                          >확인</v-btn
                        >
                      </div>
                      <p
                        :class="
                          verifyPassword.success ? 'text-info' : 'text-error'
                        "
                      >
                        {{ verifyPassword.message }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </Form>

              <Form
                as="v-form"
                @submit="onUserUpdatePassword"
                :initial-values="USER_DATA"
              >
                <v-row class="v-board-table mt-4" v-if="verifyPassword.success">
                  <v-col
                    cols="12"
                    sm="12"
                    class="v-col"
                    v-if="verifyPassword.success"
                  >
                    <div class="head-col w-25">
                      <p>새로운 비밀번호</p>
                    </div>
                    <div class="data-col w-75">
                      <VTextFieldWithValidation
                        v-model="USER_DATA.new_user_pwd"
                        name="new_user_pwd"
                        label="신규 비밀번호"
                        type="password"
                        maxlength="16"
                      />
                      <p class="text-caption color-gray mt-1"><i class="mdi mdi-alert-circle-outline mr-2"></i>비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 입력하세요.</p>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    class="v-col"
                    v-if="verifyPassword.success"
                  >
                    <div class="head-col w-25">
                      <p>새로운 비밀번호 확인</p>
                    </div>
                    <div class="data-col">
                      <VTextFieldWithValidation
                        v-model="USER_DATA.new_user_pwd_chk"
                        name="new_user_pwd_chk"
                        label="신규 비밀번호 확인"
                        type="password"
                        maxlength="16"
                      />
                    </div>
                  </v-col>
                </v-row>
                <div
                  class="d-flex justify-center mt-10"
                  v-if="verifyPassword.success"
                >
                  <v-btn
                    size="x-large"
                    variant="flat"
                    color="gray"
                    type="button"
                    @click="
                      (verifyPassword.success = false),
                        (verifyPassword.message = '')
                    "
                    >취소</v-btn
                  >
                  <v-btn
                    size="x-large"
                    variant="flat"
                    color="primary"
                    type="submit"
                    class="ml-4"
                    >확인</v-btn
                  >
                </div>
              </Form>
            </v-card-text>
            <!--비밀번호 수정 (2)-->
            <v-card-text class="d-block" v-if="activeStep == 4">
              <div class="py-16 px-4 mt-4 text-center">
                <v-avatar color="success" size="x-large">
                  <vue-feather type="check"></vue-feather>
                </v-avatar>
                <p class="text-h5 font-weight-medium mt-8">
                  <span class="text-primary">비밀번호 수정</span>이
                  완료되었습니다. 다시 로그인 하세요.
                </p>
                <v-btn
                  size="x-large"
                  variant="flat"
                  color="primary"
                  class="mt-4"
                  @click="authStore.logout()"
                  >로그인</v-btn
                >
              </div>
            </v-card-text>
          </v-window-item>

          <!--회원 탈퇴-->
          <v-window-item value="3">
            <!--회원 탈퇴(1)-->
            <Form as="v-form" @submit="onUserResignation" :initial-values="USER_DATA">
              <v-card-text class="d-block">
                <p class="mt-6 text-body-1 font-weight-regular">
                  지금까지 이용해주셔서 감사 드립니다.<br />탈퇴하기 전 아래
                  <span class="text-primary">유의사항</span>을 확인해주세요.
                </p>
                <div class="mt-4 pa-6 bg-background">
                  <ul class="pl-3 list-style-type-bull">
                    <li>탈퇴하신 아이디는 복구가 불가능하며, 추후 동일한 아이디로 재가입이 되지 않습니다.</li>
                    <li>보험계약 관련 정보(개인(신용)정보 포함)는 거래 종료일로부터 최대 5년까지 보유&middot;이용됩니다.<br/>(단, 보험금 지급, 금융사고 조사, 법령상 의무이행을 위한 경우 별도 보관)</li>
                    <li>회원탈퇴 시 등록한 게시물은 삭제되지 않으므로, 삭제를 원하시면 탈퇴 전에 삭제해 주시기 바랍니다.</li>
                    <li>모든 회원 정보가 삭제되며 재가입 시 신규 회원으로 가입됩니다.</li>
                  </ul>
                </div>
                <v-row class="v-board-table mt-6">
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col w-25">
                      <p>아이디 <span class="text-primary"></span></p>
                    </div>
                    <div class="data-col">
                      <p class="px-4 py-2">{{ USER_DATA.user_id }}</p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" class="v-col">
                    <div class="head-col w-25">
                      <p>비밀번호 <span class="text-primary">(필수)</span></p>
                    </div>
                    <div class="data-col w-75">
                      <p class="text-caption text-error mt-1 flex-grow-1 w-full d-flex line-height-1-4">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>
                        <span>보안정책의 일환으로 비밀번호 입력 오류시 자동 로그아웃 되오니<br/>정확하게 입력하여 주시기 바랍니다.</span>
                      </p>              
                      <VTextFieldWithValidation
                          v-model="USER_DATA.user_pwd"
                          name="user_pwd"
                          label="비밀번호"
                          type="password"
                          class="mt-4"
                          maxlength="16"
                        />
                    </div>
                  </v-col>
                </v-row>
                <div class="mt-2 text-center">
                  <VCheckBoxWithValidation
                    v-model="chkResignation"
                    name="chkResignation"
                    label="유의 사항을 모두 확인했으며, 이에 동의합니다."
                  />
                  <v-spacer />
                  <v-btn
                    size="x-large"
                    variant="flat"
                    color="primary"
                    type="submit"
                    class="mt-4"
                    >탈퇴하기</v-btn
                  >
                </div>
              </v-card-text>
            </Form>

            <!--회원 탈퇴(2)-->
            <v-card-text class="d-none">
              <div class="py-16 px-4 mt-4 text-center">
                <v-avatar color="success" size="x-large">
                  <vue-feather type="check"></vue-feather>
                </v-avatar>
                <p class="text-h5 font-weight-medium mt-8">
                  <span class="text-primary">회원 탈퇴</span>가 완료되었습니다.
                </p>
              </div>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>

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
</template>

<script setup lang="ts">
import { onUpdated, ref, watch, onMounted } from 'vue';

import { Field, Form } from 'vee-validate';
import { UserYup } from '@/schema';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { UserDTO, CommonCode } from '@/model';

import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';
import apiUser from '@/api/api/user.api';
import apiA_COMMON from '@/api/api/A_COMMON';

import { MessageBoxDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';


const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

const regionCdItems = ref([]);
const corpTypeItems = ref([]);

const userDTO = ref(new UserDTO());
const messageBoxDTO = ref(new MessageBoxDTO());

const verifyEMail = ref({ success: false, message: '', code: '' });
const verifyHp = ref({ success: false, message: '', code: '' });


const USER_DATA = ref({
  user_id: '',
  user_pwd: '',
  user_uuid: '',
  new_user_pwd: '',
  new_user_pwd_chk: ''
});

USER_DATA.value.user_id = _AUTH_USER.value.userId;

const tab = ref(null);
const selected = ref(['']);
const isDaumPostDialog = ref(false);

const verifyUser = ref({ success: false, message: '' });
const verifyPassword = ref({ success: false, message: '' });

const isUser = ref(false);
const isCorp = ref(false);
const chkResignation = ref('N');
const activeStep = ref(1);


function onComplete_DaumPost(result: VueDaumPostcodeCompleteResult) {
  userDTO.value.corp_post = result.zonecode;
  userDTO.value.corp_addr = result.address;
  userDTO.value.corp_addr_dtl = '';
  isDaumPostDialog.value = false;
}





/**
 * 로그인
 * @param values 로그인 정보
 */
async function isVerifyPassword(params: any) {
  const result = await apiUser.isVerifyPassword(params);
  verifyUser.value.success = result.success;
  verifyUser.value.message = result.message;

  if (result.success) {
    const userResult = await apiUser.getUserInfo();
    // console.log(userResult);
    activeStep.value = 2;

    Object.assign(userDTO.value, userResult[0]);

    // 서버에서 추가 인증하기 위해 재전달
    userDTO.value.user_pwd = params.user_pwd;

    if (userDTO.value.user_cd == 'IND') {
      isUser.value = true;
    } else if (
      userDTO.value.user_cd == 'COR' ||
      userDTO.value.user_cd == 'JNT'
    ) {
      isCorp.value = true;
    }
  } else {
    activeStep.value = 1;
    authStore.logout();
    //loginErrorMessage.value = result.message;
  }
}

/**
 * 비밀번호 확인
 *
 * @param params
 */
async function isVerifyPasswordBeforeUpdate(params: any) {
  
  const result = await apiUser.isVerifyPassword(params);
  verifyPassword.value.success = result.success;
  verifyPassword.value.message = result.message;
  console.log(params);
  if (!result.success) {
    authStore.logout();
  }
}

/**
 * 회원정보 수정
 * 
 * @param params
 */
async function onUpdateUserInfoSubmit(params: any) {

  // selectbox 는 obejct 타입이라서 수정시에는 오류가 발생할수있다. 수정하지 않으면 string
  if (userDTO.value.corp_region_cd && typeof userDTO.value.corp_region_cd === 'object') {
    userDTO.value.corp_region_cd = userDTO.value.corp_region_cd.value;
  }
  // console.log(`MODIFY_${userDTO.value.business_cd}_${userDTO.value.user_cd}`);
  const validationSchema = UserYup[`MODIFY_${userDTO.value.business_cd}_${userDTO.value.user_cd}`];
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

    // console.log(userDTO.value);
    const result = await apiUser.setUserInfo(userDTO.value);
    // console.log(result.success);

    // 회원가입 페이지로 이동
    if (result.success) {
      activeStep.value = 3;
      verifyUser.value.success = false;
      verifyUser.value.message = '';
    } else {
      messageBoxDTO.value.setWarning( '실패', `회원수정에 실패해였습니다.<br/>${result.message}`);
    }
  }
}

async function onUserUpdatePassword() {

  const validationSchema = UserYup.MODIFY_PASSWORD;
  const isValidate = await validationSchema.validate(USER_DATA.value, { abortEarly: false })
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
    // 사용자 비밀번호 변경
 
    console.log(USER_DATA.value);
    const result = await apiUser.setUserPassword(USER_DATA.value);

    // 회원가입 페이지로 이동
    if (result.success) {
      activeStep.value = 4;
      verifyPassword.value.success = false;
      verifyPassword.value.message = '';
    } else {
      messageBoxDTO.value.setWarning( '오류발생', `비밀번호 변경에 실패 하였습니다.<br/>${result.message}`);
    }
  }
}

async function onUserResignation(params: any) {
  if (chkResignation.value != 'Y') {
    messageBoxDTO.value.setInfo( '탈퇴신청', '유의 사항에 동의를 선택하세요.');
    return false;
  }

  if (!params.user_pwd) {
    messageBoxDTO.value.setInfo( '탈퇴신청', '비밀번호를 확인하세요.');
    return false;
  }

  const result = await apiUser.setUserResignation(params);
  
  if (result.success) {
    await messageBoxDTO.value.setInfo( '탈퇴신청', result.message);
    authStore.logout();
  } else {
    //await messageBoxDTO.value.setInfo( '탈퇴신청', result.message);
    messageBoxDTO.value.setWarning( '오류발생', `회원탈퇴에 실패 하였습니다.<br/>${result.message}`);
    //authStore.logout();
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
        isVerifyUserHp(rsp.imp_uid);
      } else {
      }
    }
  );
}

async function isVerifyUserHp(imp_uid: string) {
  const result = await apiUser.isVerifyUserHp(imp_uid);

  verifyHp.value.success = result.success;
  verifyHp.value.message = result.message;

  if (result.success) {
    if (_AUTH_USER.value.userCd === 'IND') {
      userDTO.value.user_nm = result.data.name;
      userDTO.value.user_birth = result.data.birthday.replace(/-/g, '').substring(2);
      userDTO.value.user_hpno = result.data.phone.replace(/^01([0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '010-$2-$3');

    } else if (_AUTH_USER.value.userCd === 'COR') {
      userDTO.value.user_hpno = result.data.phone.replace(/^01([0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '010-$2-$3');
    }
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
    const retData = await apiUser.isVerifyUserEMailAuth(params);
    verifyEMail.value.success = retData.success;
    verifyEMail.value.message = retData.message;
    userDTO.value.is_user_email = retData.success;

  }
}

watch(
  () => userDTO.value.user_email,
  (newValue, oldValue) => {
    verifyEMail.value.message = '';
    verifyEMail.value.success = false;
    userDTO.value.is_user_email = false;
  }
);


onMounted(async () => {
  let regionCode = 'TAX001'
  if(_AUTH_USER.value.businessCd == 'LAW')
    regionCode = 'LAW001';
  regionCdItems.value = await CommonCode.getCodeList(regionCode);
  corpTypeItems.value = await CommonCode.getCodeList('COM050');
  userDTO.value.is_user_email = true;
});

</script>
