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
              <h2 class="text-h5 font-weight-light">개인회원 또는 법인회원을<br/>선택해 주세요.</h2>                      
              <div class="mt-10">
                <v-divider />
                <v-btn variant="text" @click="setViewIdStep(false, true, false, false)" color="black" size="x-large" class="py-6 h-auto w-100 d-block" >
                  <div class="text-left font-weight-light w-100">
                    <p>개인회원</p>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
                <v-btn variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
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
                <v-btn @click="isVerifyUserAuth()" variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
                  <div class="text-left font-weight-light w-100">
                    <p>휴대폰으로 본인인증</p>
                    <span class="text-14 text-gray">휴대폰에 등록된 본인확인정보로 아이디를 찾습니다.</span>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
                <v-btn @click="setViewIdStep(false, false, true, false); " variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
                  <div class="text-left font-weight-light w-100">
                    <p>이름/생년월일/휴대폰번호로 찾기</p>
                    <span class="text-14 text-gray">가입하신 개인정보로 아이디를 찾습니다.</span>                  
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
              </div>
               <div class="mt-10">
                <v-btn size="x-large" color="black" block @click="setViewIdStep(true, false, false, false)">
                  뒤로가기
                </v-btn>
              </div>
            </v-card-text>

            <!--이름/생년월일/등록번호/휴대폰번호로 찾기-->
            <v-card-text v-if="isViewIDStep2">
              <h2 class="text-h5 font-weight-light">등록된 개인정보로<br/>아이디를 찾습니다.</h2>
              <div class="mt-10">
                <VTextFieldWithValidation v-model="userDTO.user_nm" name="user_nm" label="이름" />
                <VTextFieldWithValidation v-model="userDTO.user_birth" name="user_birth" label="생년월일" placeholder="예) 780102" :maskOption="{ mask: '######' }" class="mt-2"/>
                <!-- <VTextFieldWithValidation v-model="userDTO.user_regno" name="user_regno" label="등록번호" placeholder="예) 1234567" :maskOption="{ mask: '#######' }" class="mt-2"/> -->
                <VTextFieldWithValidation v-model="userDTO.user_hpno" name="user_hpno" label="휴대폰번호" type="number" :maskOption="{ mask: '###-####-####' }" class="mt-2" />
              </div>
              <div class="d-flex justify-center mt-8">
                <v-btn @click="setViewIdStep(false, true, false, false);" size="x-large" class="black" variant="outlined" color="black">뒤로가기</v-btn>    
                <v-btn @click="isVerifyUser()" size="x-large" variant="flat" color="primary" type="submit" class="ml-2">아이디 찾기</v-btn>    
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
            <v-card-text v-if="isViewPWStep1">
              <h2 class="text-h5 font-weight-light">개인회원 또는 법인회원을<br/>선택해 주세요.</h2>                      
              <div class="mt-10">
                <v-divider />
                <v-btn variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
                  <div class="text-left font-weight-light w-100">
                    <p>개인회원</p>
                    <span class="text-14 text-gray">휴대폰에 등록된 본인확인정보로 비밀번호를 찾습니다.</span>
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
                <v-btn variant="text" color="black" size="x-large" class="py-6 h-auto w-100 d-block">
                  <div class="text-left font-weight-light w-100">
                    <p>법인회원</p>
                    <span class="text-14 text-gray">웹사이트에 등록된 법인정보로 비밀번호를 찾습니다.</span>                  
                  </div>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-divider />
              </div>
            </v-card-text>

            <!--법인회원 정보 입력-->
            <v-card-text v-if="isViewPWStep1">
              <h2 class="text-h5 font-weight-light">웹사이트에 등록된 법인정보를<br/>입력해 주세요.</h2>
              <div class="mt-10">
                <VTextFieldWithValidation name="" label="아이디" />
                <VTextFieldWithValidation name="user_nm" placeholder="법인명" maxlength="25" class="mt-2"/>
                <VTextFieldWithValidation name="corp_bnno" placeholder="법인번호" :maskOption="{ mask: '######-#######' }" class="mt-2"/>
                <v-btn size="large" variant="tonal" block class="mt-4">확인</v-btn>    
                <p class="text-error mt-2 "><i class="mdi mdi-alert-circle-outline mr-2"></i>일치하는 회원 정보가 없습니다.</p>
              </div>
            </v-card-text>

            <!--법인회원 이메일 인증-->
            <v-card-text >
              <h2 class="text-h5 font-weight-light">회원가입 시 입력한 이메일 정보로<br/>비밀번호를 찾습니다.</h2>
              <div class="mt-10">
                <div class="d-flex align-center">
                  <VTextFieldWithValidation name="user_email" label="이메일" placeholder="ex) user@locktonpi.com" maxlength="40"/>
                  <v-btn variant="outlined" color="primary" size="large" class="ml-2">인증번호 받기</v-btn >
                </div>
                <VTextFieldWithValidation name="" label="인증번호" placeholder="숫자 4자리" :maskOption="{ mask: '####' }" maxlength="4" class="mt-2"/>
                <div class="d-flex justify-center mt-8">
                  <v-btn size="x-large" variant="outlined" color="black">뒤로가기</v-btn>    
                  <v-btn size="x-large" variant="flat" color="primary" type="submit" class="ml-2">비밀번호 찾기</v-btn>    
                </div>
              </div>
            </v-card-text>

            <!--비밀번호 변경-->
            <v-card-text>
              <h2 class="text-h5 font-weight-light">인증되었습니다.<br/>새로운 비밀번호를 설정해 주세요.</h2>
              <p class="text-body-1 font-weight-light color-gray mt-2 line-height-1-4">비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 입력하세요.</p>
              <div class="mt-10">
                <VTextFieldWithValidation name="user_pwd" label="새 비밀번호" type="password" maxlength="16" />
                <VTextFieldWithValidation name="user_pwd_chk" label="비밀번호 확인" type="password" maxlength="16" class="mt-2"/>
                <v-btn size="x-large" variant="flat" color="primary" type="submit" block class="mt-8">확인</v-btn> <!--클릭 시 로그인페이지로 이동-->
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
import VTextFieldWithValidation from '../../components/VTextFieldWithValidation.vue';
import { MessageBoxDTO,UserDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';
import apiUser from '../../api/api/user.api';
import router from "@/router";


const tab1 = ref(null);
const isViewIDStep0 = ref(true);
const isViewIDStep1 = ref(false);
const isViewIDStep2 = ref(false);
const isViewIDStep3 = ref(false);
const isViewIDWithHpAuth = ref(false);

const isViewPWStep1 = ref(true);
const isViewPWStep2 = ref(false);
const isViewPWStep3 = ref(false);
const isViewPWWithHpAuth = ref(false);

const userDTO = ref(new UserDTO());
const messageBoxDTO = ref(new MessageBoxDTO());


function fnMoveLogin() {
  router.push('/user/login');
}
function setViewIdStep(isStep0:boolean, isStep1:boolean, isStep2:boolean, isStep3:boolean) {
  isViewIDStep3.value = isStep3;
  isViewIDStep2.value = isStep2;
  isViewIDStep1.value = isStep1;
  isViewIDStep0.value = isStep0;
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


/**
 * 입력된 정보로 아이디 찾기
 */
async function isVerifyUser() {

    if (!userDTO.value.user_nm) {
      messageBoxDTO.value.setWarning("입력확인", "이름은 필수입력값 입니다.");
      return false;
    }
    if (!userDTO.value.user_birth) {
      messageBoxDTO.value.setWarning("입력확인", "생년월일은 필수입력값 입니다.");
      return false;
    }
    
    // if (!userDTO.value.user_regno) {
    //   messageBoxDTO.value.setWarning("입력확인", "등록번호는 필수입력값 입니다.");
    //   return false;
    // }
   
    if (!userDTO.value.user_hpno) {
      messageBoxDTO.value.setWarning("입력확인", "휴대폰번호는 필수입력값 입니다.");
      return false;
    }

    const params = { user_nm: userDTO.value.user_nm, user_birth: userDTO.value.user_birth, user_hpno: userDTO.value.user_hpno};
    const userData = await apiUser.isVerifyUser(params);
    
    if (userData.success) {
      if (userData.data) {
        userDTO.value.user_id = userData.data[0].user_id;
        setViewIdStep(false, false, true);
      } else {
        messageBoxDTO.value.setWarning('아이디 찾기', '입력하신 정보로 등록된 회원이 없습니다.');
      }
    } else {
      messageBoxDTO.value.setWarning('아이디 찾기', '알수 없는 오류가 발생하였습니다. 관리자에게 문의하세요.');
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
    isViewIDWithHpAuth.value = true;

    userDTO.value.user_nm     = result.data.name;
    userDTO.value.user_birth  = result.data.birthday.replace(/-/g, '').substring(2);
    userDTO.value.user_hpno   = result.data.phone.replace(/^01([0|1|6|7|8|9])(\d{3,4})(\d{4})$/, '010-$2-$3');

    await isVerifyUser();
    
  } else {
    messageBoxDTO.value.setWarning('휴대폰 본인인증', '휴대폰 본인인증에 실패 하였습니다.');
  }
}


</script>
