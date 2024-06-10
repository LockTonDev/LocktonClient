<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Company -->
  <!-- ----------------------------------------------------------------------------- -->

  <v-footer class="page-footer pa-0 flex-column">
    <v-row class="footer-link w-100 ma-0 pa-0" justify="center">
      <v-btn color="footerbackground" size="" rounded="0" href="http://global.lockton.com" target="_blank">록톤글로벌</v-btn>
      <v-btn v-if="businessCd ==='CAA'" color="footerbackground" size="" rounded="0" href="http://www.krcaa.or.kr" target="_blank">한국관세사회</v-btn>
      <v-btn v-if="businessCd ==='ACC'" color="footerbackground" size="" rounded="0" href="http://www.cpas.or.kr" target="_blank">한국공인회계사 감사반연합회</v-btn>
      <v-btn v-if="businessCd ==='TAX'" color="footerbackground" size="" rounded="0" href="https://www.kacpta.or.kr" target="_blank">한국세무사회</v-btn>
      <v-btn v-if="businessCd ==='ADV'" color="footerbackground" size="" rounded="0" href="https://www.koreanbar.or.kr/" target="_blank">대한변호사협회</v-btn>
      <v-btn v-if="businessCd ==='PAT'" color="footerbackground" size="" rounded="0" href="https://www.kpaa.or.kr" target="_blank">대한변리사회</v-btn>
      <v-btn v-if="businessCd ==='LAW'" color="footerbackground" size="" rounded="0" href="https://kjaar.kabl.kr" target="_blank">대한법무사협회</v-btn>
    </v-row>
    <v-row class="footer-info w-full ma-0 pt-10 pb-10">
      <v-col :cols="checkMobile.isMobile?'4':'2'" class="pa-0">
        <div :class="checkMobile.isMobile?'':'pr-6'">
          <img src="/assets/Lockton_Logo_White_simbol.png" alt="" class="w-full">
        </div>
      </v-col>
      <v-col :cols="checkMobile.isMobile?'':'6'" class="pa-0">
        <p class="text-body-2 mb-2">록톤컴퍼니즈코리아손해보험중개(주)</p>
        <p class="text-body-2">대표자: 손방의</p>
        <p class="text-body-2">사업자등록번호 : 220-81-20652<span class="mx-2 text-10 vertical-align-top">|</span>통신판매신고번호 : 제2024-서울중구-0272호</p>
        <p class="text-body-2">주소 : (04520) 서울시 중구 세종대로 136, 서울파이낸스센터13층<span class="mx-2 text-10 vertical-align-top">|</span>대표전화:02-2011-0300</p>
      </v-col>
      <v-col :cols="checkMobile.isMobile?'':'4'" :class="checkMobile.isMobile?'pt-5 pa-0':'pa-0'">
        <v-row>
          <v-col cols="5" class="pa-0 d-flex flex-column pr-4">
            <v-btn color="" variant="text" rounded="0" @click="termsOfService = true">이용약관</v-btn>
            <v-btn color="" variant="text" rounded="0" @click="termsOfPersonalInfo = true">개인정보처리방침</v-btn>
            <v-btn color="" variant="text" rounded="0" @click="termsOfEmail = true">이메일무단수집거부</v-btn>
          </v-col>
          <v-col cols="7" class="pa-0 text-center">
            <v-card variant="outlined" class="foot-info-cscenter pa-4">          
              <p class="text-body-2">고객상담</p>
              <p class="text-h6 mt-1 mb-1 color-primary"> 02-2011-0300 </p>
              <p class="text-body-2 mb-2">평일 09~18시 / 공휴일, 주말 휴무</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="footer-end ma-0 w-100" justify="start">
      <v-col cols="12" class="footer-end-inner">
        © Lockton Companies (Korea) Inc. All rights reserved. 
      </v-col>
    </v-row>
  </v-footer>
  <TermsOfService v-if="termsOfService" @close="onTermsOfServiceClose"></TermsOfService>

  <v-dialog persistent v-model="termsOfPersonalInfo" width="1000" scrollable>
    <v-btn variant="outlined" color="dark" @click="termsOfPersonalInfo = false" class="position-absolute right-0 mt-7 mr-4 z-index-1">닫기</v-btn>
    <TermsOfPersonalInfo></TermsOfPersonalInfo>
  </v-dialog>

  <v-dialog persistent v-model="termsOfEmail" width="600" scrollable>
    <v-card>
      <v-card-title class="d-flex justify-space-between px-6 py-4">
        이메일 무단 수집 거부
        <v-btn variant="outlined" color="dark" @click="termsOfEmail = false">닫기</v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="px-10 py-8 pb-14">
        <p class="">이메일 주소 무단 수집을 거부합니다!</p>
        본 웹사이트에 게시된 이메일 주소가 전자우편 수집프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며 이를 위반시 정보통신망법에 의해 형사상 처벌됨을 유의하시기 바랍니다.
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
import {ref, watch} from "vue";
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores';
  import ImagesLogo from '@/components/ImagesLogo.vue';
  import TermsOfService from '@/components/TermsOfService.vue';
  import TermsOfPersonalInfo from '@/components/TermsOfPersonalInfo.vue';
  import {useMobileStore} from "@/stores";
  const termsOfService = ref(false);
  const termsOfPersonalInfo = ref(false);
  const termsOfEmail = ref(false);
  const checkMobile = useMobileStore();

  const authStore = useAuthStore();
  const { _AUTH_USER } = storeToRefs(authStore);

  const businessCd = ref(_AUTH_USER?.value?.businessCd);

  watch(() => _AUTH_USER?.value?.businessCd, (newValue, oldValue) => {
    businessCd.value = _AUTH_USER?.value?.businessCd;
  });

function onTermsOfServiceClose(agrs: any) {
  termsOfService.value = false;
}


</script>
  
