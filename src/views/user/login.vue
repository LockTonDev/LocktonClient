<template>
  <v-app>
    
    <v-main>
      
      <!-- 상단영역 ( 로고 )-->
      <Header />

      <!-- 컨텐츠 영역 -->
      <v-container class="page-wrapper">  
        
        <!--로그인-->           
        <v-img src="../../assets/images/background/bg-login1.jpg" cover class="h-100vh" gradient="24deg, rgba(255,255,255, 0) 30%, rgba(255,255,255, 0.7) 60%, rgba(255,255,255, 1) 90%">
          <v-row justify="center" align="center" class="h-100" >
            <v-col lg="11" sm="11">
              <v-card elevation="10">
                <v-row>
                  <v-col lg="6" class="bg-black d-none d-md-flex align-center justify-center">
                    <div class="d-none d-sm-block">
                      <div class="d-flex align-center pa-14 pr-10 w-100">
                        <div class="w-100">
                          <h2 class="text-h4 text-white font-weight-medium">
                            전문인 보험 서비스 
                          </h2>
                          <div class="mt-8 text-white font-weight-light word-break-keep-all">
                            <p>록톤코리아는 전문인배상책임보험을 선도하는 전문가 조직입니다.</p>
                            <p>20여년 이상 각 분야별 협회&middot;단체 보험 프로그램을 개발&middot;운영하며 최고의 공신력을 자부합니다.</p>
                            <p>핵심역량을 보유한 파트너로서 고객 발전을 위해 최선의 보험서비스를 제공하겠습니다.</p>
                          </div>
                          <v-spacer />
                          <v-btn color="primary" class="mt-16 mr-4" to="/introduce">회사소개</v-btn>
                          <!-- <v-btn color="white" class="mt-16" to="/product/p1">보험상품 추천</v-btn> -->
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col lg="6" class="pa-0">
                    <Form as="v-form" @submit="onSubmit">
                                      
                      <div class="pa-14">
                        <h2 class="font-weight-bold mb-8">로그인</h2>

                            
                        <Field name="businessInfo" type="text" v-slot="{ handleChange, errors }">
        
                          <v-select  
                            v-model="businessInfo"
                            @update:modelValue="handleChange"
                            label="전문인 자격을 선택하세요."
                            :items="G_ITEMS"
                            :error-messages="errors"
                            clearable
                            variant="outlined"
                            hide-details="auto"
                            return-object
                            class="mt-4" />  
                        </Field> 
                          
                          <!-- <VSelectWithValidation name="userType" label="전문인 자격타입" :items=selectype /> -->
                          <!-- 한국관세사 회원만 로그인 가능합니다. -->
                      
                        <v-card v-if="isLoginDisable">
                          <v-divider class="my-8"/>
                          
                          <p class="text-14 text-error d-flex"><i class="mdi mdi-alert-circle-outline mr-1"></i><span>전문인 자격을 먼저 선택해주세요.<br />선택 후 로그인 또는 회원가입이 가능합니다.</span></p>
                        </v-card>
                        <v-card :disabled="isLoginDisable" v-if="!isLoginDisable">
                          <v-divider class="mt-8"/>
                          <v-card-text class="pb-2">
                            <v-tabs v-model="userCd" fixed-tabs color="primary">
                              <v-tab value="IND">개인 회원</v-tab>
                              <v-tab value="two" v-if="businessInfo.value === 'CAA'">법인/합동사무소 회원</v-tab>
                              <v-tab value="JNT" v-if="businessInfo.value === 'ADV'">복수가입 회원</v-tab>
                              <v-tab value="COR" v-if="businessInfo.value === 'TAX'">법인 회원</v-tab>
                            </v-tabs>
                            <v-divider class="mt-0"/>
                            <v-window v-model="userCd">
                              <v-window-item value="IND">
                                <div class="mb-4 login-subtext">                    
                                    
                                </div>
                                <VTextFieldWithValidation name="IND_user_id" label="아이디" maxlength="20" />
                                <VTextFieldWithValidation name="IND_user_pwd" label="비밀번호" type="password" maxlength="16" class="mt-4" />
                              
                              </v-window-item>
                              <v-window-item value="COR"> 
                                <div class="my-4 login-subtext">                    
                                    <p v-if="businessInfo.value === 'CAA'">법인/합동사무소 회원은 하나의 아이디만 부여되며 본점, 지점별로 중복가입 되지 않습니다.</p>
                                    <p v-if="businessInfo.value === 'TAX'">법인 회원은 하나의 아이디만 부여되며 본점, 지점별로 중복가입 되지 않습니다.</p>
                                </div>
                                 <VTextFieldWithValidation
                                    name="COR_user_id"
                                    label="사업자번호"
                                    density="comfortable"
                                    single-line
                                    :maskOption="{ mask: '###-##-#####' }"
                                  />
                                  <VTextFieldWithValidation name="COR_user_pwd" label="비밀번호" type="password" maxlength="16" class="mt-4"/>
                              </v-window-item>
                              <v-window-item value="JNT">
                                <div class="my-4 login-subtext">
                                  <p v-if="businessInfo.value === 'ADV'">복수가입(보상한도 공유가입)회원은 사무소 또는 법인명으로 하나의 아이디만 부여되며 본점, 지점별로 중복가입 되지 않습니다.
                                    <i class="mdi mdi-help-circle-outline mr-2" :onclick="toQuestion"></i>
                                  </p>

                                </div>
                                <VTextFieldWithValidation
                                    name="COR_user_id"
                                    label="사업자번호"
                                    density="comfortable"
                                    single-line
                                    :maskOption="{ mask: '###-##-#####' }"
                                />
                                <VTextFieldWithValidation name="COR_user_pwd" label="비밀번호" type="password" maxlength="16" class="mt-4"/>
                              </v-window-item>
                            </v-window>
                          </v-card-text>
                          <!-- 에레메시지 영역 -->
                          <div class="ml-8 text-error text-14 login-subtext">                    
                            <span> {{ loginErrorMessage }} </span>  
                          </div>
                          <v-btn color="primary" block class="py-7 mt-6"  type="submit" >로그인</v-btn>
                            
                          <!-- 법인 가입안내 Alert 시작 -->
                          <!-- <div class="mt-4">
                            <v-alert
                              v-model="isAlert"
                              theme="dark"
                              class="pb-6"
                            >
                              <div class="d-flex justify-space-between align-center">
                                <p class="text-h6">회원가입안내</p>
                                <v-btn text @click="isAlert = false"> 닫기 </v-btn>                  
                              </div>
                              <v-divider class="my-4"></v-divider>
                              법인/합동사무소 회원은 사업자등록증을 록톤에 보내(팩스 송부)
                              <v-spacer />
                              아이디, 비밀번호를 발급 받고 로그인 한 후 회원가입 하시기 바랍니다.
                              <v-spacer />
                              ( Fax 0503-8379-2008 )
                            </v-alert>
                          </div> -->
                          <!-- 법인 가입안내 Alert 종료 -->
                      
                          <div class="d-flex align-center mb-4 mb-sm-0">
                            <v-btn @click="toSignup" variant="plain">회원가입</v-btn>
                            <span>|</span>
                            <v-btn @click="toFind" variant="plain">ID/비밀번호 찾기</v-btn>
                            
                          </div>                            
                        </v-card>
                      </div>
        
        
        
                    </Form>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-img>

        <!-- 법인 회원가입 메세지 팝업 시작 -->
        <div class="text-center">
          <v-dialog persistent v-model="isDialogQuestion" width="550" hide-overlay>
            <v-card>
              <v-card-title class="text-h6 font-weight-medium">복수가입 안내</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="text-body-1">
                복수가입 시, 보험의 피보험자는 보상한도를 공유하여 가입하는 각 변호사가 되며, 사무소 또는 법인이 피보험자가 되지 않습니다.
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="isDialogQuestion = false"> 닫기 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <!-- 법인 회원가입 메세지 팝업 시작 -->
        <div class="text-center">
          <v-dialog persistent v-model="isDialogSignup" width="550" hide-overlay>
            <v-card>
              <v-card-title class="text-h6 font-weight-medium">회원가입안내</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="text-body-1">                       
              <span v-if="businessInfo.value === 'CAA'">법인/합동사무소</span>
              <span v-if="businessInfo.value === 'TAX'">법인</span>
                회원은 사업자등록증을 록톤에 보내(팩스 송부)
                <v-spacer />
                아이디, 비밀번호를 발급 받고 로그인 한 후 회원가입 하시기 바랍니다.
                <v-spacer />
                ( Fax 0503-8379-2008 )
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="isDialogSignup = false"> 닫기 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <!-- 메세지 팝업 종료 -->
        <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
        
      </v-container>

      <!-- 하단영역 -->
      <Footer />

    </v-main>
  </v-app>
</template>

<style scoped>
  .login-subtext {
    color : #999;
  }
</style>


<script setup lang="ts">
  import { ref, computed, watch, onMounted} from "vue";
  import Header from "@/layouts/default/Header.vue";
  import Footer from "@/layouts/default/Footer.vue";
  import { useAuthStore } from '@/stores';
  import { UserYup }  from '@/schema';
  import { useForm, useField, useFieldValue , Field, Form } from 'vee-validate';
  import { useRouter } from 'vue-router' 
  import VTextFieldWithValidation from '../../components/VTextFieldWithValidation.vue';
  import VSelectWithValidation from '../../components/VSelectWithValidation.vue';

  import MessageBox from "@/components/MessageBox.vue";
  import { MessageBoxDTO } from '@/model';

  import G_ITEMS from '../json/itemsData.json';




  // 초기정보 설정
  const messageBoxDTO = ref(new MessageBoxDTO());

  const checkbox = ref(false);
  const userCd = ref("");

  const router = useRouter();

  const businessInfo = ref();
  const isLoginDisable = ref(true);
  
  const isDialogSignup = ref(false);
  const isDialogQuestion = ref(false);
  const isDialogBusinessInfo = ref(false);
  const isDialogModifyCOR = ref(false);

  const loginErrorMessage = ref("");

  watch(() => businessInfo.value, (newValue, oldValue) => {
    // console.log("newValue ", newValue);
    if(businessInfo.value == undefined) {
      isLoginDisable.value =  true;
      
    }else {
      isLoginDisable.value =  false;
     
    }  
    if(newValue != null) {
      messageBoxDTO.value.setInfo( '록톤코리아', businessInfo.value.rmk);
    }
  })





/*
  const userType = ref("");
  const userId = ref("");
  const password = ref("");

// watch(감시하고자하는 데이터의 변수명, 콜백함수) // 데이터의 값이 바뀔 때마다 콜백함수가 실행된다.
watch(userType, () => { // 18번) 다음과 같이 사용하거나, (단, methods 함수명을 사용할때는 반드시 뒤에 ()를 제거하고, 함수명만 넣어야 작동한다)
  console.log("watch userType: ", userType);
})
// watch(감시하고자하는 데이터의 변수명, 콜백함수) // 데이터의 값이 바뀔 때마다 콜백함수가 실행된다.
watch(userId, () => { // 18번) 다음과 같이 사용하거나, (단, methods 함수명을 사용할때는 반드시 뒤에 ()를 제거하고, 함수명만 넣어야 작동한다)
  console.log("watch userId : ", userId);
})

// watch(감시하고자하는 데이터의 변수명, 콜백함수) // 데이터의 값이 바뀔 때마다 콜백함수가 실행된다.
watch(password, () => { // 18번) 다음과 같이 사용하거나, (단, methods 함수명을 사용할때는 반드시 뒤에 ()를 제거하고, 함수명만 넣어야 작동한다)
  console.log("watch password : ", password);
})
*/



  /**
   * 회원가입
   */
  const toSignup = () => {
    if(userCd.value=='IND') {
      router.push('/user/register/'+ businessInfo.value.value);
    }else {
      isDialogSignup.value = true;
    }
}
const toQuestion = () => {
  isDialogQuestion.value = true;
}
  /**
   * ID/비밀번호 찾기
   */
  const toFind = () => {
    router.push('/user/find/'+ businessInfo.value.value);
  }




  /**
   * 로그인
   * @param values 로그인 정보
   */
	async function onSubmit(values:any) {
    loginErrorMessage.value = '';
    let user_id = ''
    let user_pwd = ''
    if (userCd.value === 'JNT' || userCd.value == 'COR'){
      user_id = 'COR_user_id'
      user_pwd = 'COR_user_pwd'
    }else {
      user_id = 'IND_user_id'
      user_pwd = 'IND_user_pwd'
    }
    const params = {
      business_cd: values.businessInfo.value,
      user_cd: userCd.value,
      [`user_id`]: values[user_id],
      [`user_pwd`]: values[user_pwd]
    };
    const authStore = useAuthStore();
    const result = await authStore.login(params);
    // console.log(result);
    if (result.success) {
      loginErrorMessage.value = "";
      // 법인 신규가입인경우 수정페이지 표출
      if (result.data.statusCd === '20' && (result.data.userCd === 'COR' || result.data.userCd === 'JNT')   ) {
        router.push(`/user/register/${result.data.businessCd}`);
      // 3개월 비밀번호 변경
      }else if (result.data.statusCd == '31') {
        // isDialogModifyCOR.value = true;
      } else {
        // 메인페이지로 이동
        router.push(`/contract/${result.data.businessCd}/V_T${result.data.businessCd}0030A10`);
      }
    }else {
      loginErrorMessage.value = result.message;
    }
    

	}


onMounted(async () => {

});
 
</script>
