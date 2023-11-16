<template>
  <div class="d-flex align-center mb-2">
    <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세</h2>
  </div>
  <v-row>
    <v-col cols="6">
      <v-card>
        <v-card-title class="d-flex flex-wrap px-0 pt align-center">
          <h3 class="font-weight-bold">가입 정보</h3> 
        </v-card-title>
        <v-card-text class="pa-0">
          <v-row class="v-board-table size-x-small">
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>식별번호</p>
              </div>
              <div class="data-col">
                <p class="mx-1">{{userDTO.user_uuid}}</p>
              </div>
            </v-col>
            <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>아이디</p>
              </div>
              <div class="data-col">
                <p class="mx-1">{{userDTO.user_id}}</p>
              </div>
            </v-col>
             <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>회원 상태</p>
              </div>
              <div class="data-col">
                <VSelectWithValidation v-model="userDTO.status_cd" name="status_cd" label="" :items="statusCdItems" class="w-200"  single-line density="comfortable"></VSelectWithValidation>
              </div>
            </v-col>
            <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>전문인 유형</p>
              </div>
              <div class="data-col">
                <p class="mx-1">{{userDTO.business_cd_nm}}</p>
              </div>
            </v-col>
            <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>비밀번호</p>
              </div>
              <div class="data-col">
                <v-btn variant="outlined" color="primary" size="small" @click="fnResetPassword()">비밀번호 초기화</v-btn >
              </div>
            </v-col>
            <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>가입 유형</p>
              </div>
              <div class="data-col">
                <p class="mx-1">{{userDTO.user_cd_nm}}</p>
              </div>
            </v-col>
           
            <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>등록일시</p>
              </div>
              <div class="data-col">
                <p class="mx-1">{{userDTO.created_at}}</p>
              </div>
            </v-col>
            <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>로그인 실패</p>
              </div>
              <div class="data-col"> 
                <p class="mx-1">
                  {{ userDTO.login_fail_cnt  }} 회
                </p>
              </div>
            </v-col>
            <v-col cols="6" class="v-col">
              <div class="head-col">
                <p>로그인 차단</p>
              </div>
              <div class="data-col">
                <VCheckBoxWithValidation class="w-auto" density="compact" v-model="userDTO.login_block_yn" label="" name="login_block_yn" :disabled="true"/>
                <v-btn variant="outlined" color="primary" size="small" class="ml-2" @click="setUserLoginBlockReset()" :disabled="userDTO.login_block_yn === 'Y'?false:true">차단해제</v-btn >
              </div>
            </v-col>
            <v-col cols="6" class="v-col d-none">
              <div class="head-col">
                <p>탈퇴일시</p>
              </div>
              <div class="data-col">
                <p>2023.04.04</p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mt-3">
        <v-card-title class="pa-0">
          <h3 class="font-weight-bold">약관 동의</h3> 
        </v-card-title>
        <v-divider class="mt-0"/>
        <v-card-text class="pa-0">
          <v-row class="v-board-table size-x-small">
            <v-col cols="12" class="v-col">
              <div class="head-col w-60">
                <p>(필수) 서비스 이용 약관 동의</p>
              </div>
              <div class="data-col w-40">
                 <VCheckBoxWithValidation density="compact" v-model="userDTO.agr1_yn" label="" name="agr1_yn"/>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col w-60">
                <p>(필수) 개인(신용)정보 처리 상세 동의</p>
              </div>
              <div class="data-col w-40">
                <VCheckBoxWithValidation density="compact" v-model="userDTO.agr2_yn" label="" name="agr2_yn"/>
              </div>
            </v-col>
            <v-col cols="12" class="v-col">
              <div class="head-col w-60">
                <p>(선택) 마케팅 개인정보 수집이용 동의</p>
              </div>
              <div class="data-col w-40">
                <div class="d-flex">
                  <VCheckBoxWithValidation density="compact" v-model="userDTO.agr3_yn" label="" name="agr3_yn"/>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    
    <v-col cols="6">
      <v-card>
        <v-card-title class="d-flex flex-wrap px-0 pt align-center">
          <h3 class="font-weight-bold">기본 정보 {{ userDTO.user_cd === 'IND' ? '[ 개인 ]' : userDTO.user_cd === 'COR' ? '[ 법인 ]' :  userDTO.user_cd === 'JNT' ? '[ 복수 ]' : '' }}</h3>
          <div class="ml-auto">
            <v-btn variant="outlined" size="small" @click="fnAdd('IND')" class="mr-1">개인 신규</v-btn> 
            <v-btn variant="outlined" size="small" @click="fnAdd('COR')" class="mr-1" v-if="userDTO.business_cd !== 'ACC'">법인 신규</v-btn>
            <v-btn variant="outlined" size="small" @click="fnAdd('JNT')" class="mr-1">복수 신규</v-btn>
            <v-btn variant="flat" size="small" @click="fnSave()">저장</v-btn> 
          </div>
        </v-card-title>
        <v-divider class="mt-0"/>
        <v-card-text class="pa-0">
          <!--개인 시작-->
          <v-row class="v-board-table size-x-small" v-if="userDTO.user_cd === 'IND'">
            <v-col cols="12" class="v-col">
              <div class="head-col">
                <p>아이디</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <div class="d-flex flex-nowrap w-full flex-grow-1">
                  <VTextFieldWithValidation v-model="userDTO.user_id" name="user_id" label="" single-line density="comfortable" class="w-full" maxlength="20"/>
                  <v-btn variant="outlined" color="primary" class="ml-1" size="small" @click="isVerifyUserId()" :disabled="userDTO.is_user_id">중복확인</v-btn >
                </div>
                <div class="mt-1 flex-grow-1">
                  <p :class=" verifyUser.success ? 'text-info' : 'text-error'">
                    {{ verifyUser.message }}
                  </p>
                </div>
              </div>
            </v-col>     
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>이름</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="" single-line density="comfortable" />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>생년월일</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userDTO.user_birth" name="user_birth" label="" single-line density="comfortable"  :maskOption="{ mask: '######' }" />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>등록번호</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userDTO.user_regno" name="user_regno" label="" single-line density="comfortable" :maskOption="{ mask: '#######' }" :disabled="verifyUserCostoms.success" />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
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
                <VTextFieldWithValidation v-model="userDTO.user_email" name="user_email" label="" single-line density="comfortable" maxlength="40"/>
              </div>
            </v-col>


            <v-divider class="border-0" />
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>사무소명</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userDTO.corp_nm" name="corp_nm" label="" single-line density="comfortable" maxlength="25" />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>사업자번호</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation
                  v-model="userDTO.corp_cnno"
                  name="corp_cnno"
                  label=""
                  :maskOption="{ mask: '###-##-#####' }"
                  single-line
                  density="comfortable"
                />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>사무소 전화</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                  <VTextFieldWithValidation v-model="userDTO.corp_telno" name="corp_telno" single-line density="comfortable" />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>사무소 팩스</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                  <VTextFieldWithValidation v-model="userDTO.corp_faxno" name="corp_faxno" single-line density="comfortable" />
              </div>
            </v-col>
            <v-divider class="border-0" />
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>담당자 성명</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VTextFieldWithValidation v-model="userDTO.corp_cust_nm" name="corp_cust_nm" label="" single-line density="comfortable" maxlength="20" />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col" v-if="userDTO.business_cd == 'TAX'">
              <div class="head-col">
                <p>소속 지방회</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VSelectWithValidation v-model="userDTO.corp_region_cd" name="corp_region_cd" label="" :items="regionCdItems" class="w-200"  single-line density="comfortable"></VSelectWithValidation>
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>사무소 주소</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <div class="d-flex flex-nowrap w-full flex-grow-1">
                  <VTextFieldWithValidation v-model="userDTO.corp_post" name="corp_post" label="" single-line density="comfortable" :readonly="true" class="w-full"/>
                  <v-btn variant="outlined" color="primary" @click="isDaumPostDialog = true" class="ml-1" size="small">사무소 주소검색</v-btn >
                </div>
                <VTextFieldWithValidation v-model="userDTO.corp_addr" name="corp_addr" label="" single-line density="comfortable" class="w-full" :readonly="true"/>
                <VTextFieldWithValidation v-model="userDTO.corp_addr_dtl" name="corp_addr_dtl" label="" single-line density="comfortable" class="w-full" maxlength="25" />
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>비고</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col col">
                <VTextFieldWithValidation v-model="userDTO.rmk" name="rmk" single-line density="comfortable" />
              </div>
            </v-col>
          </v-row>
          <!-- 개인 끝-->
    
          <!-- 법인/합동 시작-->
          <v-row class="v-board-table size-x-small" v-if="userDTO.user_cd === 'COR' ||userDTO.user_cd === 'JNT' ">
            <v-col cols="12" sm="12" class="v-col">
              <div class="head-col">
                <p>전문인 유형</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VSelectWithValidation v-model="userDTO.business_cd" name="corp_region_cd" label="" :items="businessCdItems" class="w-200" single-line density="comfortable"></VSelectWithValidation>
              </div>
            </v-col>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>아이디</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                  <div class="d-flex flex-nowrap w-full flex-grow-1">
                    <VTextFieldWithValidation
                        v-model="userDTO.user_id"
                        name="user_id"
                        label=""
                        density="comfortable"
                        single-line
                        :maskOption="{ mask: '###-##-#####' }"
                        class="w-full flex-grow-1"
                      />
                    <v-btn variant="outlined" color="primary" class="ml-1" size="small" @click="isVerifyUserId()" :disabled="userDTO.is_user_id">중복확인</v-btn >
                  </div>
                  <div class="mt-1 flex-grow-1">
                    <p :class=" verifyUser.success ? 'text-info' : 'text-error'">
                      {{ verifyUser.message }}
                    </p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>법인명</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                  <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="" single-line density="comfortable" maxlength="25"/>
                </div>
              </v-col>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>대표자 성명</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                  <VTextFieldWithValidation v-model="userDTO.corp_ceo_nm"  name="corp_ceo_nm" label="" single-line density="comfortable" />
                </div>
              </v-col>
              
              <!-- 관세사 추가 사항 시작 -->
              <v-col cols="12" sm="12" class="v-col" v-if="userDTO.business_cd === 'CCA'">
                <div class="head-col">
                  <p>사업 유형</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                  <v-radio-group v-model="radios" :mandatory="false" inline class="align-center d-flex">
                    <v-radio label="법인" value="radio1" class="mr-4"></v-radio>
                    <v-radio label="합동사무소" value="radio2" class="mr-4"></v-radio>
                    <v-radio label="통관 취급 법인" value="radio3"></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
              <!-- 관세사 추가 사항 종료 -->

            <!-- 변호사 추가 사항 시작 -->
            <v-col cols="12" sm="12" class="v-col" v-if="userDTO.business_cd === 'ADV'">
              <div class="head-col">
                <p>사무소 형태</p>
                <sup class="text-error">*</sup>
              </div>
              <div class="data-col">
                <VSelectWithValidation v-model="userDTO.corp_type" name="corp_type" label="" :items="corpTypeItems" class="w-200" single-line density="comfortable"></VSelectWithValidation>
              </div>
            </v-col>
            <!-- 변호사 추가 사항 종료 -->

              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>법인번호</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                    <VTextFieldWithValidation
                      v-model="userDTO.corp_bnno"
                      name="corp_bnno"
                      label=""
                      :maskOption="{ mask: '######-#######' }"
                      single-line
                      density="comfortable"
                      :disabled="userDTO.business_cd === 'ADV' && userDTO.corp_type !== '003'"
                    />
                </div>
              </v-col>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>사업자번호</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                  <VTextFieldWithValidation
                    v-model="userDTO.corp_cnno"
                    name="corp_cnno"
                    label=""
                    :maskOption="{ mask: '###-##-#####' }"
                    single-line
                    density="comfortable"
                    
                  />
                </div>
              </v-col>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>사무소 전화</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                    <VTextFieldWithValidation v-model="userDTO.corp_telno" name="corp_telno" single-line density="comfortable" />
                </div>
              </v-col>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>사무소 팩스</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                    <VTextFieldWithValidation v-model="userDTO.corp_faxno" name="corp_faxno" single-line density="comfortable" />
                </div>
              </v-col>
              <v-divider class="border-0"/>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>담당자 성명</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col">
                  <VTextFieldWithValidation v-model="userDTO.corp_cust_nm" name="corp_cust_nm" label="" single-line density="comfortable"  maxlength="20"/>
                </div>
              </v-col>
              <v-col cols="12" sm="12" class="v-col">
                  <div class="head-col">
                    <p>소속 지방회</p>
                    <sup class="text-error">*</sup>
                  </div>
                  <div class="data-col">
                    <VSelectWithValidation v-model="userDTO.corp_region_cd" name="corp_region_cd" label="" :items="regionCdItems" class="w-200" single-line density="comfortable"></VSelectWithValidation>
                  </div>
                </v-col>
              <v-col cols="12" sm="12" class="v-col">
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
                
                <div class="data-col flex-nowrap">
                  <VTextFieldWithValidation v-model="userDTO.user_email" name="user_email" label="" single-line density="comfortable" maxlength="40"/>
                  <v-btn variant="outlined" color="primary" size="small" class="ml-2" @click="isVerifyUserEMail()" :disabled="userDTO.is_user_email">중복확인</v-btn >
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
                    <div class="d-flex flex-nowrap w-full flex-grow-1">                    
                      <VTextFieldWithValidation v-model="userDTO.corp_post" name="corp_post" label="" single-line density="comfortable" class="w-full" :readonly="true"/>
                      <v-btn variant="outlined" size="small" color="primary" @click="isDaumPostDialog=true" class="ml-2">사무소 주소검색</v-btn>
                    </div>
                    <VTextFieldWithValidation v-model="userDTO.corp_addr" name="corp_addr" label="" single-line density="comfortable" class="w-full flex-grow-1" :readonly="true"/>                            
                    <VTextFieldWithValidation v-model="userDTO.corp_addr_dtl" name="corp_addr_dtl" label="" single-line density="comfortable" class="w-full" maxlength="25"/>
                </div>
              </v-col>
              <v-col cols="12" sm="12" class="v-col">
                <div class="head-col">
                  <p>비고</p>
                  <sup class="text-error">*</sup>
                </div>
                <div class="data-col col">
                  <VTextFieldWithValidation v-model="userDTO.rmk" name="rmk" single-line density="comfortable" />
                </div>
              </v-col>
            </v-row>
          <!-- 법인/합동 끝-->
        </v-card-text>
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
  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { UserDTO, MessageBoxDTO, CommonCode } from '@/model';
import MessageBox from '@/components/MessageBox.vue';
import VTextFieldWithValidation from '@/components/VTextFieldWithValidation.vue';
import VSelectWithValidation from '@/components/VSelectWithValidation.vue';
import VCheckBoxWithValidation from '@/components/VCheckBoxWithValidation.vue';
import apiADMIN from '@/api/api/A_ADMIN';
import apiCOMMON from '@/api/api/A_COMMON';

// 초기객체 설정
const messageBoxDTO = ref(new MessageBoxDTO());
const isDaumPostDialog= ref(false);
const userDTO = ref(new UserDTO());
const props = defineProps(['pageViewData']);
const verifyUserCostoms = ref({ success: false, message: '' });
const verifyUser = ref({ success: false, message: '' });
const verifyEMail = ref({ success: false, message: '', code: '' });


const radios = ref('radio1');
const regionCdItems = ref([]);
const statusCdItems = ref([]);
const businessCdItems = ref([]);
const corpTypeItems = ref([]);


watch(
  () => props.pageViewData,
  (newValue) => {
    if (newValue) {
      fnSearch(newValue);
    }
  },
  { immediate: true }
);

watch(
    () => userDTO.value.corp_type,
    () => {
      userDTO.value.corp_bnno = ''
    },
    { immediate: true }
);

const genPassword = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

function fnAdd(user_cd:string) {
  userDTO.value = new UserDTO();
  userDTO.value.mode = 'C';
  userDTO.value.business_cd = 'TAX';
  userDTO.value.user_cd = user_cd;
  userDTO.value.status_cd = ((user_cd === 'COR' || user_cd === 'JNT') ? '20' : '30');
  userDTO.value.rmk = genPassword(10);
}

async function fnSearch(user_uuid: string) {
  if (user_uuid == '') {
    userDTO.value = new UserDTO();
  }else if (user_uuid) {
    const params = { user_uuid: user_uuid };
    const resultData = await apiADMIN.getUserInfo(params);
    Object.assign(userDTO.value, resultData.data[0]);
    userDTO.value.mode = 'U';
  }
}

function onComplete_DaumPost(result: VueDaumPostcodeCompleteResult) {
  insuranceDTO.value.corp_post = result.zonecode;
  insuranceDTO.value.corp_addr = result.address;

  isDaumPostDialog.value = false;
}



async function fnResetPassword() {

  let isRun = false;

  await messageBoxDTO.value.setConfirm('확인', '비밀번호를 초기화 하시겠습니까?', null, (result, params) => {
    isRun = result;
  });

  if (isRun) {
    userDTO.value.rmk = genPassword(10);

    const resultData = await apiADMIN.setUserPassword(userDTO.value);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '비밀번호는 비고에서 확인해주세요.');
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  }
}

async function fnSave() {
  let isRun = false;
  let resultData = false;

  await messageBoxDTO.value.setConfirm('저장', '저장 하시겠습니까?', null, (result, params) => {
    isRun = result;
  });
  
  if (isRun) {
    if (userDTO.value.mode === 'C') {
      const userList = [];
      userList.push(userDTO.value);
      resultData = await apiADMIN.setUsersTemp(userList);
    } else {
      resultData = await apiADMIN.setUserInfo(userDTO.value);
    }

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');
    } else {
      messageBoxDTO.value.setWarning('실패', `저장에 실패하였습니다.<br/>${resultData.message}`);
    }
  }
}

async function setUserLoginBlockReset() {
  let isRun = false;
  await messageBoxDTO.value.setConfirm('확인', '차단해제 하시겠습니까?', null, (result, params) => {
    isRun = result;
  });

  if(isRun) {
    const resultData = await apiADMIN.setUserLoginBlockReset(userDTO.value);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '차단해제 되었습니다.');
      fnSearch(userDTO.value.user_uuid);
    } else {
      messageBoxDTO.value.setWarning('실패', `차단해제 실패하였습니다.<br/>${resultData.message}`);
      }
  }
}


/**
 * 사용자 아이디 유효성 검사
 */
async function isVerifyUserId() {

  // const params = { user_id: userDTO.value.user_id };
  // const retData = await apiUser.isVerifyUserId(params);

  // verifyUser.value.success = retData.success;
  // verifyUser.value.message = retData.message;
  // userDTO.value.is_user_id = retData.success;

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
    const retData = await apiUser.isVerifyUserEMail(userDTO.value.user_email);
    verifyEMail.value.success = retData.success;
    verifyEMail.value.message = retData.message;
    userDTO.value.is_user_email = retData.success;

  }
}



/**
 * 페이지 로딩시 셋팅할 정보
 */
async function initPage() {
  regionCdItems.value = await CommonCode.getCodeList('TAX001');
  // businessCdItems.value = await CommonCode.getCodeList('COM001');
  statusCdItems.value = await CommonCode.getCodeList('COM010');
  // statusCdItems.value.unshift({ title: '전체', value: '%' });/
  businessCdItems.value = await CommonCode.getCodeList('COM001');
  corpTypeItems.value = await CommonCode.getCodeList('COM050');

}

/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {
  // 로딩시 초기 데이터 셋팅
  initPage();
});

</script>
