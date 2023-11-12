<template>
  <v-row justify="center" align="center" class="my-16">
    <v-col cols="12" sm="6">
      <div class="border-bottom-lightgray-1">
        <v-tabs v-model="tab1" fixed-tabs color="primary">
          <v-tab value="tab1-one" class="text-18 font-weight-bold">아이디 찾기</v-tab>
          <v-tab value="tab1-two" class="text-18 font-weight-bold">비밀번호 찾기</v-tab>
        </v-tabs>
      </div>
      <v-card class="pa-10 v-box mt-10">

        <v-window v-model="tab1">
          <!-- 개인 아이디 찾기-->
          <v-window-item value="tab1-one">
            <v-card-text v-if="isViewIDStep0">
              <h2 class="text-h5 font-weight-light" v-if="businessCd !== 'ACC'">개인회원 또는 법인회원을<br/>선택해 주세요.</h2>                      
              <h2 class="text-h5 font-weight-light" v-if="businessCd === 'ACC'">개인회원을 선택해 주세요.</h2>                      
              <div class="mt-10">
                <v-divider />
                <v-btn variant="text" @click="userDTO.user_cd = 'IND';setViewIdStep(false, true, false, false)" color="black" size="x-large" class="py-6 h-auto w-100 d-block" >
                  <div class="text-left font-weight-light w-100">
                    <p>개인회원</p>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
                <v-btn variant="text" @click="userDTO.user_cd = 'IND'; fnFindIdCOR()" color="black" size="x-large" class="py-6 h-auto w-100 d-block" v-if="businessCd !== 'ACC'">
                  <div class="text-left font-weight-light w-100">
                    <p>법인회원</p>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
              </div>
              <div class="mt-10">
                <v-btn size="x-large" block @click="fnMoveLogin()">
                  로그인페이지로 이동
                </v-btn>
              </div>
            </v-card-text>

            <!--찾는 방법 선택-->
            <v-card-text v-if="isViewIDStep1">
              <h2 class="text-h5 font-weight-light">아이디를 찾을 방법을<br/>선택해 주세요.</h2>                      
              <div class="mt-10">
                <v-divider />
                <v-btn @click="setViewIdStep(false, false, true, false); " variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
                  <div class="text-left font-weight-light w-100">
                    <p>이름/생년월일/휴대폰번호로 찾기</p>
                    <span class="text-14 text-gray">가입하신 개인정보로 아이디를 찾습니다.</span>                  
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn @click="isVerifyUserAuth();" variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
                  <div class="text-left font-weight-light w-100">
                    <p>휴대폰으로 본인인증</p>
                    <span class="text-14 text-gray">휴대폰에 등록된 본인확인정보로 아이디를 찾습니다.</span>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
              </div>
               <div class="mt-10">
                <v-btn size="x-large" color="black" variant="outlined" block @click="setViewIdStep(true, false, false, false)">
                  뒤로가기
                </v-btn>
              </div>
            </v-card-text>

            <!--이름/생년월일/등록번호/휴대폰번호로 찾기-->
            <v-card-text v-if="isViewIDStep2">
              <h2 class="text-h5 font-weight-light">등록된 개인정보로<br/>아이디를 찾습니다.</h2>
              <div class="mt-10">
                <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="이름" maxlength="8" />
                <VTextFieldWithValidation v-model="userDTO.user_birth" name="user_birth" label="생년월일" placeholder="예) 780102" :maskOption="{ mask: '######' }" class="mt-2"/>
                <!-- <VTextFieldWithValidation v-model="userDTO.user_regno" name="user_regno" label="등록번호" placeholder="예) 1234567" :maskOption="{ mask: '#######' }" class="mt-2"/> -->
                <VTextFieldWithValidation v-model="userDTO.user_hpno" name="user_hpno" label="휴대폰번호" type="number" :maskOption="{ mask: '###-####-####' }" class="mt-2" />
              </div>
              <div class="d-flex justify-center mt-8">
                <v-btn @click="setViewIdStep(false, true, false, false);" size="x-large" class="black" variant="outlined" color="black">뒤로가기</v-btn>    
                <v-btn @click="isVerifyUserIND()" size="x-large" variant="flat" color="primary" type="submit" class="ml-2">아이디 찾기</v-btn>    
              </div>
            </v-card-text>

            <!--아이디 찾기 결과-->
            <v-card-text v-if="isViewIDStep3">
              <h2 class="text-h5 font-weight-light">입력하신 정보와<br/>일치하는 결과입니다.</h2>
              <div class="bg-background border-radius-2 py-8 px-4 text-center my-10">
                <p class="text-h6 text-primary" v-if="isViewIDWithHpAuth">{{ userDTO.user_id }}</p>
                <p class="text-h6 text-primary" v-if="!isViewIDWithHpAuth">{{ userDTO.user_id.replace(/^(\w{2})(\w+)/g, (_, firstTwoChars, restOfString) => firstTwoChars + "*".repeat(restOfString.length)) }}</p>
              </div>
              
              <!--이름/생년월일/등록번호/휴대폰번호로 찾기했을 때만 노출되는 버튼-->
              <div class="mt-10" v-if="!isViewIDWithHpAuth">
                <v-divider />
                <v-btn variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block" @click="isVerifyUserAuth()">
                  <div class="text-left font-weight-light w-100">
                    <p>아이디 전체 확인하기</p>
                    <span class="text-14 text-gray">본인인증을 통해 아이디 전체 확인이 가능합니다.</span>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
              </div>

              <div class="mt-10">
                <v-btn size="x-large" block @click="fnMoveLogin()">
                  로그인페이지로 이동
                </v-btn>
              </div>
            </v-card-text>
          </v-window-item>
  
          <!-- 개인/법인 비밀번호 찾기-->
          <v-window-item value="tab1-two"> 
            <!--회원 구분 선택-->
            <v-card-text v-if="isViewPWStep0">
              <h2 class="text-h5 font-weight-light" v-if="businessCd !== 'ACC'">개인회원 또는 법인회원을<br/>선택해 주세요.</h2>                      
              <h2 class="text-h5 font-weight-light" v-if="businessCd === 'ACC'">개인회원을 선택해 주세요.</h2>   
              <div class="mt-10">
                <v-divider />
                <v-btn @click="userDTO.user_cd = 'IND'; setViewPwStep(false, true, false, false);" variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
                  <div class="text-left font-weight-light w-100">
                    <p>개인회원</p>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
                <v-btn @click="userDTO.user_cd = 'COR'; setViewPwStep(false, false, true, false);" variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block" v-if="businessCd !== 'ACC'">
                  <div class="text-left font-weight-light w-100">
                    <p>법인회원</p>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
              </div>
              <div class="mt-10">
                <v-btn size="x-large" block @click="fnMoveLogin()">
                  로그인페이지로 이동
                </v-btn>
              </div>
            </v-card-text>

            <!-- 개인회원 비밀번호 찾기 정보 입력 -->
            <v-card-text v-if="isViewPWStep1">
              <h2 class="text-h5 font-weight-light">등록된 개인정보로<br/>비밀번호를 찾습니다.</h2>
              <div class="mt-10">
                <VTextFieldWithValidation v-model="userDTO.user_id" name="user_id" label="아이디" />
              </div>
              <div class="d-flex justify-center mt-8">
                <v-btn @click="setViewPwStep(true, false, false, false);" size="x-large" class="black" variant="outlined" color="black">뒤로가기</v-btn>    
                <v-btn @click="isVerifyUserAuthWithPW()" size="x-large" variant="flat" color="primary" type="submit" class="ml-2">휴대폰 인증</v-btn>    
              </div>
            </v-card-text>

            <!--법인회원 이메일 인증-->
            <v-card-text v-if="isViewPWStep2">
              <h2 class="text-h5 font-weight-light">등록된 법인정보로<br/>비밀번호를 찾습니다.</h2>
              <div class="mt-10">
                  <VTextFieldWithValidation v-model="userDTO.user_id" name="user_id" label="아이디" :maskOption="{ mask: '###-##-#####' }" />
                  <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="법인명" class="mt-2" maxlength="30"/>
                  <div class="d-flex align-center">
                    <VTextFieldWithValidation v-model="userDTO.corp_bnno" name="corp_bnno" class="mt-2" label="법인번호" :maskOption="{ mask: '######-#######' }" />
                    <v-btn variant="outlined" @click="sendVerifyEMail()" color="primary" size="large" class="ml-2" :disabled="isSendEMail">인증메일 받기</v-btn >
                  </div>
                <VTextFieldWithValidation  v-model="userDTO.auth_code" name="auth_code" label="인증번호" placeholder="숫자 6자리" :maskOption="{ mask: '######' }" maxlength="6" class="mt-2"/>
              </div>
              <div class="d-flex justify-center mt-8">
                <v-btn @click="setViewPwStep(true, false, false, false);" size="x-large" class="black" variant="outlined" color="black">뒤로가기</v-btn>    
                <v-btn @click="isVerifyEMailAuthCode()" size="x-large" variant="flat" color="primary" type="submit" class="ml-2">이메일 인증</v-btn>    
              </div>
            </v-card-text>

            <!--비밀번호 변경-->
            <v-card-text v-if="isViewPWStep3">
              <h2 class="text-h5 font-weight-light">인증되었습니다.<br/>새로운 비밀번호를 설정해 주세요.</h2>
              <p class="text-body-1 font-weight-light color-gray mt-2 line-height-1-4">비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 입력하세요.</p>
              <div class="mt-10">
                <VTextFieldWithValidation v-model="userDTO.new_user_pwd" name="new_user_pwd" label="새 비밀번호" type="password" maxlength="16" />
                <VTextFieldWithValidation v-model="userDTO.new_user_pwd_chk" name="new_user_pwd_chk" label="비밀번호 확인" type="password" maxlength="16" class="mt-2"/>
                <v-btn @click="onUserUpdatePassword()" size="x-large" variant="flat" color="primary"  block class="mt-8">확인</v-btn> <!--클릭 시 로그인페이지로 이동-->
              </div>
            </v-card-text>

            <!--비밀번호 완료-->
            <v-card-text v-if="isViewPWStep4">
              <h2 class="text-h5 font-weight-light">비밀번호 수정이<br/>완료 되었습니다.</h2>
              <div class="mt-10">
                <v-btn size="x-large" block @click="fnMoveLogin()">
                  다시 로그인 하기
                </v-btn>
              </div>
            </v-card-text>

          </v-window-item>              
        </v-window>

      </v-card>
    </v-col>
  </v-row>
  
  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>

</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from 'vue-router';
import VTextFieldWithValidation from '../../components/VTextFieldWithValidation.vue';
import { MessageBoxDTO, UserDTO } from '@/model';
import { UserYup } from '@/schema';
import MessageBox from '@/components/MessageBox.vue';
import apiUser from '../../api/api/user.api';
import router from "@/router";

const route = useRoute();
const businessCd = route.params.business_cd;

const tab1 = ref(null);
const isSendEMail = ref(false);
const isViewIDStep0 = ref(true);
const isViewIDStep1 = ref(false);
const isViewIDStep2 = ref(false);
const isViewIDStep3 = ref(false);
const isViewIDWithHpAuth = ref(false);

const isViewPWStep0 = ref(true);
const isViewPWStep1 = ref(false);
const isViewPWStep2 = ref(false);
const isViewPWStep3 = ref(false);
const isViewPWStep4 = ref(false);
const isViewPWStep5 = ref(false);
const isViewPWWithHpAuth = ref(false);

const userDTO = ref(new UserDTO());
const messageBoxDTO = ref(new MessageBoxDTO());


async function isVerifyEMailAuthCode() {
  const params = { user_id: userDTO.value.user_id, auth_code: userDTO.value.auth_code, corp_bnno: userDTO.value.corp_bnno};
  const resultData = await apiUser.isVerifyEMailAuthCode(params);
  console.log(resultData);
  if (resultData.success) {
    userDTO.value.user_uuid = resultData.data;
    setViewPwStep(false, false, false, true);
  } else {
    messageBoxDTO.value.setWarning('이메일 인증', '잘못된 인증번호 입니다.');
  }
}

async function sendVerifyEMail() {
    // userDTO.value.user_id = "316-88-02895";
    // userDTO.value.user_nm = "세무법인 명성";
    // userDTO.value.corp_bnno = "134171-0014405";

    if (!userDTO.value.user_id) {
      messageBoxDTO.value.setWarning("입력확인", "아이디는 필수입력값 입니다.");
      return false;
    }
    if (!userDTO.value.user_nm) {
      messageBoxDTO.value.setWarning("입력확인", "법인명은 필수입력값 입니다.");
      return false;
    }
    if (!userDTO.value.corp_bnno) {
      messageBoxDTO.value.setWarning("입력확인", "법인번호는 필수입력값 입니다.");
      return false;
    }

    const params = { user_id: userDTO.value.user_id, user_nm: userDTO.value.user_nm, corp_bnno: userDTO.value.corp_bnno};
    const userData = await apiUser.findCORUserNSendEMail(params);
    console.log(userData);
    if (userData.success) {
      isSendEMail.value = true;
      messageBoxDTO.value.setWarning('아이디/비밀번호 찾기', '인증메일이 발송되었습니다.');
    } else {
      messageBoxDTO.value.setWarning('아이디/비밀번호 찾기', '입력하신 정보를 다시 확인하세요');
    }
}

async function onUserUpdatePassword() {
  const validationSchema = UserYup.MODIFY_PASSWORD;
  console.log(userDTO.value);
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

  if (isValidate) {
    // 사용자 비밀번호 변경
    const result = await apiUser.setUserPasswordNotLogin(userDTO.value);

    // 회원가입 페이지로 이동
    if (result.success) {
      setViewPwStep(false, false, false, false);
      isViewPWStep4.value = true;
    } else {
      messageBoxDTO.value.setWarning( '오류발생', `비밀번호 변경에 실패 하였습니다.<br/>${result.message}`);
    }
  }
}


function fnMoveLogin() {
  router.push('/user/login');
}

function fnFindIdCOR() {
  messageBoxDTO.value.setInfo("아이디 찾기", "최초 등록된 사업자번호를 확인하여 주시기 바랍니다.");
}
function setViewIdStep(isStep0: boolean, isStep1: boolean, isStep2: boolean, isStep3: boolean) {
  isViewIDStep3.value = isStep3;
  isViewIDStep2.value = isStep2;
  isViewIDStep1.value = isStep1;
  isViewIDStep0.value = isStep0;
}
function setViewPwStep(isStep0:boolean, isStep1:boolean, isStep2:boolean, isStep3:boolean) {
  isViewPWStep3.value = isStep3;
  isViewPWStep2.value = isStep2;
  isViewPWStep1.value = isStep1;
  isViewPWStep0.value = isStep0;
}

function isVerifyUserAuthWithPW() {
  if (!userDTO.value.user_id) {
      messageBoxDTO.value.setWarning("입력확인", "아이디는 필수입력값 입니다.");
      return false;
  }
  userDTO.value.mode = 'PW';

  isVerifyUserAuth();
}

/**
 * 휴대폰 번호 인증
 */
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

async function isVerifyUserPWIND() {
 if (!userDTO.value.user_id) {
    messageBoxDTO.value.setWarning("입력확인", "아이디는 필수입력값 입니다.");
    return false;
  }
}

/**
 * 입력된 정보로 아이디 찾기
 */
async function isVerifyUserIND() {
    if (!userDTO.value.user_nm) {
      messageBoxDTO.value.setWarning("입력확인", "이름은 필수입력값 입니다.");
      return false;
    }
    if (!userDTO.value.user_birth) {
      messageBoxDTO.value.setWarning("입력확인", "생년월일은 필수입력값 입니다.");
      return false;
    }
    
    if (!userDTO.value.user_hpno) {
      messageBoxDTO.value.setWarning("입력확인", "휴대폰번호는 필수입력값 입니다.");
      return false;
    }
    const params = { business_cd : businessCd, user_cd:userDTO.value.user_cd, user_nm: userDTO.value.user_nm, user_birth: userDTO.value.user_birth, user_hpno: userDTO.value.user_hpno};
    const userData = await apiUser.isVerifyUser(params);

    if (userData.success) {
      if (userData.data) {
        userDTO.value.user_id = userData.data[0].user_id;
        setViewIdStep(false, false, false, true);
      } else {
        messageBoxDTO.value.setWarning('아이디/비밀번호 찾기', '입력하신 정보로 등록된 회원이 없습니다.');
      }
    } else {
      messageBoxDTO.value.setWarning('아이디/비밀번호 찾기', '알수 없는 오류가 발생하였습니다. 관리자에게 문의하세요.');
    }
}

/**
 * 휴대폰 번호 인증 결과 조회
 * 
 * @param imp_uid 
 */
async function isVerifyUserHp(imp_uid: string) {
  const result = await apiUser.isVerifyUserHp(imp_uid);

  if (result.success) {
    userDTO.value.user_nm = result.data.name;
    userDTO.value.user_birth = result.data.birthday.replace(/-/g, '').substring(2);
    userDTO.value.user_hpno = result.data.phone.replace(/^01([0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '010-$2-$3');
    console.log(userDTO.value);
    if (userDTO.value.user_cd === 'IND') {
      
      if (userDTO.value.mode === 'PW') {
      // 비밀번호 찾기
        const params = { user_id: userDTO.value.user_id, user_nm: userDTO.value.user_nm, user_birth: userDTO.value.user_birth, user_hpno: userDTO.value.user_hpno};
        const userData = await apiUser.isVerifyUserUUID(params);
        console.log(userData);
        if (userData.success) {
          if (userData.data) {
            userDTO.value.user_uuid = userData.data;
            setViewPwStep(false, false, false, true);
          } else {
            messageBoxDTO.value.setWarning('비밀번호 찾기', '입력하신 정보로 등록된 회원이 없습니다.');
          }
        } else {
          messageBoxDTO.value.setWarning('비밀번호 찾기', '입력하신 정보로 등록된 회원이 없습니다.');
        }
       

      } else {
        // 아이디 찾기
        isViewIDWithHpAuth.value = true;
        await isVerifyUserIND();
      }
    } else {
    }
    
  } else {
    messageBoxDTO.value.setWarning('휴대폰 본인인증', '휴대폰 본인인증에 실패 하였습니다.');
  }
}


</script>
