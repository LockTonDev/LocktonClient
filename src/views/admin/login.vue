<template>
  <v-row justify="center" align="center" class="h-100vh content-width" >
     <v-col cols="12" sm="5" align="center" class="pb-16 mb-16">
      <img src="/assets/Lockton_Logo_Black_simbol.png" alt="" /> 
      <v-card class="v-box mt-10 py-4">
        <v-card-title class="text-center text-h6 px-10 py-4">
          로그인
        </v-card-title>
        <v-card-text class="px-10 py-4">
          <v-text-field v-model="user_id" placeholder="아이디" clearable variant="outlined" hide-details="auto"/>
          <v-text-field v-model="user_pwd" placeholder="비밀번호" type="password" clearable variant="outlined" hide-details="auto" class="mt-2"  @keyup.enter="onSubmit()"/>
            <!-- 에레메시지 영역 -->
            <div class="ml-8 text-error text-14 text-left">                    
              <span> {{ loginErrorMessage }} </span>  
            </div>
        </v-card-text>
        <v-card-actions class="px-10 py-4">
          <v-btn variant="flat" color="primary" block size="large" class="py-7" @click="onSubmit()">보안 로그인</v-btn>
        </v-card-actions>         
      </v-card>
     </v-col>
   </v-row>
 
 
 </template>
 
 

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from 'vue-router'
import MessageBox from "@/components/MessageBox.vue";
import { MessageBoxDTO } from '@/model';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import jwt_decode from 'jwt-decode';
 

const authStore = useAuthStore();
const { _AUTH_ADMIN } = storeToRefs(authStore);

// 초기정보 설정
const messageBoxDTO = ref(new MessageBoxDTO());

const user_id = ref("");
const user_pwd = ref("");

const router = useRouter();
const loginErrorMessage = ref("");

/**
 * 로그인
 * @param values 로그인 정보
 */
async function onSubmit(values: any) {
  loginErrorMessage.value = '';

  const params = {
    business_cd: 'ADM',
    user_cd: 'IND',
    user_id: user_id.value,
    user_pwd: user_pwd.value
  };
  
  const authStore = useAuthStore();
  const result = await authStore.adminLogin(params);
  if (result.success) {
    router.push('/lcksl-fr/lypts/sol01/dev/AT1');
  } else {
     loginErrorMessage.value = result.message;
  }
}


onMounted(async () => {
  if (_AUTH_ADMIN && _AUTH_ADMIN.value) {
       const decoded = jwt_decode(_AUTH_ADMIN.value.accessToken);
       const expiresAt = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingSeconds = expiresAt - currentTime;

      if (remainingSeconds <= 0) {

        // 세션 만료
        localStorage.removeItem('_AUTH_ADMIN');
          
      } else {
         router.push('/lcksl-fr/lypts/sol01/dev/AT1');
      }
   
  }
});

</script>
