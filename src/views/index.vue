<script setup lang="ts">
  import { ref } from "vue";
  import Header from "@/layouts/default/Header.vue";
  import Footer from "@/layouts/default/Footer.vue";
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';

  const authStore = useAuthStore();
  const { _AUTH_USER } = storeToRefs(authStore);

  const popFirstUser = ref(false);
</script>

<template>
    <v-app>
      <v-main>

        <!-- 상단영역 ( 로고 )-->
        <Header />

    
        <!-- 컨텐츠 영역 -->
        <v-container class="main-wrapper">
          <v-img src="/assets/images/background/bg-main.jpg"  cover class="content-height-main" gradient="90deg,  rgb(0, 0, 0, 0.8) 0%, rgb(0, 0, 0, 0) 20%, rgb(0, 0, 0, 0) 80%, rgb(0, 0, 0, 0.8) 100%">
            <v-row class="content-width h-100" justify="center" align-content="center" style="text-align:center;">
              <v-col>
                <h1 class="text-h3 color-white font-weight-medium line-height-1-3">전문인 보험 가입 서비스<br/><span class="color-primary font-weight-bold">록톤코리아</span>가 함께 합니다</h1>
                <v-btn v-if="!_AUTH_USER" color="white" size="x-large" class="pl-10 pr-10 mt-16 mr-6 border-radius-0" @click="popFirstUser = true">처음 이용하는 고객</v-btn>
                <v-btn v-if="!_AUTH_USER" color="primary" size="x-large" class="pl-10 pr-10 mt-16 border-radius-0" to="/user/login">로그인</v-btn>
              </v-col>
            </v-row>
          </v-img>
          <v-row class="content-width my-16 pb-8" justify="space-between">
            <v-col cols="12" sm="12" class="pa-0">
              <p class="text-h4 text-center font-weight-bold my-3">록톤코리아의 <span class="font-weight-bold color-primary">주요 서비스</span></p>
              <p class="text-center color-gray mb-12">전문인 보험 서비스를 통해 더 나은 내일을 준비합니다.</p>
            </v-col>
            <v-col cols="12" sm="4" class="pa-0 d-flex justify-center">
              <div class="w-sm-380 d-inline-block text-left bg-black">
                <img class="w-full" src="../assets/images/img-main-2.jpg" alt=""/>
                <div class="pa-6 pb-9">
                  <p class="text-20 font-weight-medium">전문인 보험 서비스</p>
                  <p class="text-body-1 mt-3">각종 전문인 업무와 관련하여 법률상 배상 책임을<br />담보하는 보험 서비스 제공</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="4" class="pa-0 d-flex justify-center text-center">
              <div class="w-sm-380 d-inline-block text-left bg-black">
                <img class="w-full" src="../assets/images/img-main-3.jpg" alt=""/>
                <div class="pa-6 pb-9">
                  <p class="text-20 font-weight-medium">분야별 전문 컨설팅</p>
                  <p class="text-body-1 mt-3">전문인배상책임보험에 특화된 전담팀에서<br />분야별로 전문 컨설팅 서비스 제공</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="4" class="pa-0 d-flex justify-center text-right">
              <div class="w-sm-380 d-inline-block text-left bg-black">
                <img class="w-full" src="../assets/images/img-main-4.jpg" alt=""/>
                <div class="pa-6 pb-9">
                  <p class="text-20 font-weight-medium">글로벌 비즈니스 보험 서비스</p>
                  <p class="text-body-1 mt-3">국내외 소재 다국적 기업의 다양한 보험 서비스<br />제공</p>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-dialog persistent v-model="popFirstUser" width="800" scrollable>
            <v-card>
              <v-card-title class="px-6 py-4">
                처음 이용하는 고객
              </v-card-title>
              <v-divider />
              <v-card-text class=" pa-6">
                <p>아래 절차에 따라 이용해 주세요.</p>
                <ul class="d-flex justify-space-between align-content-stretch list-style-type-none text-center mt-6">
                  <li class="bg-blue-darken-1 pa-4 w-30 border-radius-2">
                    <p class="mb-2">가입 준비</p>
                    <p class="text-body-2 font-weight-light">등록번호, 사업자 번호 등 준비</p>
                  </li>
                  <li class="d-flex align-center">
                    <svg width="8" height="12" fill="none" stroke-width="3"><line x1="7" y1="5" x2="0" y2="12" stroke="#999"></line><line x1="0" y1="0" x2="8" y2="7" stroke="#999"></line></svg>
                  </li>
                  <li class="bg-blue-darken-2 pa-4 w-30 border-radius-2">
                    <p class="mb-2">회원 가입</p>
                    <p class="text-body-2 font-weight-light">[개인] 휴대폰 본인인증 후 가입</p>
                    <p class="text-body-2 font-weight-light">[법인] 록톤으로 연락하여 아이디 부여 받기</p>
                  </li>
                  <li class="d-flex align-center">
                    <svg width="8" height="12" fill="none" stroke-width="3"><line x1="7" y1="5" x2="0" y2="12" stroke="#999"></line><line x1="0" y1="0" x2="8" y2="7" stroke="#999"></line></svg>
                  </li>
                  <li class="bg-blue-darken-3 pa-4 w-30 border-radius-2">
                    <p class="mb-2">보험 가입 및 이용</p>
                    <p class="text-body-2 font-weight-light">로그인 후 서비스 이용</p>
                  </li>
                </ul>          
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn variant="outlined" size="large" color="dark" @click="popFirstUser = false">닫기</v-btn>
                <v-btn variant="flat" size="large" color="primary" @click="popFirstUser = false" to="/user/login">회원가입</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
    
        <!-- 하단영역 -->
        <Footer />
        
    
      </v-main>
    </v-app>
  </template>

<!--
  <script>
  export default {
    mounted() {
      console.log("Test")
    }
  };
  </script>-->
<!--
  <script>
  export default {
    mounted() {
      console.log("Test")
    }
  };
  </script>-->
