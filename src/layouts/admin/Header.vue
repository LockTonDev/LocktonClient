<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import jwt_decode from 'jwt-decode';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { MessageBoxDTO, ParamsDTO, CommonCode, InsuranceDTO, InsuranceRateDTO, CBRDataDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';

const warnTimeoutMin = 3
const authStore = useAuthStore();
let _AUTH_ADMIN = ref(JSON.parse(localStorage.getItem('_AUTH_ADMIN')));

const timeLeft = ref('');
const messageBoxDTO = ref(new MessageBoxDTO());
// 초를 분과 초로 변환하는 함수
const convertSecondsToMinutes = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
};

let intervalId = null;

function extendTime() {
    authStore.refreshAdminAccessToken().then(function(response) {
      _AUTH_ADMIN.value = JSON.parse(localStorage.getItem('_AUTH_ADMIN'));
      initPage()
    })
}
function initPage() {
  // setInterval 중복실행 방지
  if (intervalId) {
    clearInterval(intervalId);
  }
  try {

    const decoded = jwt_decode(_AUTH_ADMIN.value.accessToken);
    const expiresAt = decoded.exp;
    intervalId = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingSeconds = expiresAt - currentTime;

      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        authStore.adminLogout();
      } else if(remainingSeconds == warnTimeoutMin * 60) {
        messageBoxDTO.value.setConfirm('시간연장', '세션 종료까지 '+warnTimeoutMin+'분 남았습니다. 연장하시겠습니까?<br> 취소 시 연장 버튼을 통해서도 세션 연장이 가능합니다.', null, (result, params) => {
          if (result) {
            extendTime()
          }
        });
      } else {
        timeLeft.value = convertSecondsToMinutes(remainingSeconds);
      }
    }, 1000);
  } catch(e) {
    console.error(e) 
  }
}

// storage 이벤트를 사용해 localStorage 의 _AUTH_ADMIN 변경을 감지하고 스토어를 업데이트
const updateAuthAdminFromLocalStorage = (event: StorageEvent) => {
  if (event.key === '_AUTH_ADMIN') {
    _AUTH_ADMIN.value = JSON.parse(localStorage.getItem('_AUTH_ADMIN'));

    if (_AUTH_ADMIN.value == null) {
      authStore.adminLogout();
    } else {
      initPage();
    }
  }
};


onMounted(() => {
  window.addEventListener('storage', updateAuthAdminFromLocalStorage);
  initPage();
});
onUnmounted(() => {
  window.removeEventListener('storage', updateAuthAdminFromLocalStorage);
});

</script>

<template>
  <v-app-bar color="footerbackground" flat class="admin-header-wrapper">
    <v-app-bar-nav-icon class="d-none"> </v-app-bar-nav-icon>
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
    <RouterLink to="/lcksl-fr/lypts/sol01/dev/AT1" class="text-decoration-none text-border">
      <div class="d-flex align-center">
        <div class="logo">
          <img src="/assets/Lockton_Logo_White_simbol.png" alt="" class="w-full" />
        </div>
      </div>
    </RouterLink>
    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <p class="mr-6 text-14"> {{ timeLeft }} <button type="button" class="v-btn v-btn--flat v-theme--light bg-primary v-btn--density-default rounded-md v-btn--size-small v-btn--variant-flat"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span class="v-btn__content" data-no-activator="" @click="extendTime()">연장</span><!----><!----></button>&nbsp; | &nbsp; {{ _AUTH_ADMIN.userNm }} 님 반갑습니다.</p>
    <div class="lnb d-flex align-center">
      <v-btn icon color="border" size="small" to="/lcksl-fr/lypts/sol01/dev/AT1">
        <vue-feather type="home" size="20"></vue-feather>
        <p class="font-size-4 mt-1 d-none d-md-block">
          홈
        </p>
      </v-btn>
      <v-btn icon color="border" size="small" @click="authStore.adminLogout()" v-if="_AUTH_ADMIN">
        <vue-feather type="log-out" size="20"></vue-feather>
        <p class="font-size-4 mt-1 d-none d-md-block">
          로그아웃
        </p>
      </v-btn>
    </div>
  </v-app-bar>
  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
</template>
