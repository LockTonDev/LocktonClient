<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted} from "vue";
import {MenuDEF, MenuACC, MenuTAX}  from "./SidebarItems";

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import jwt_decode from 'jwt-decode';

const authStore = useAuthStore();
const _AUTH_USER  = ref(JSON.parse(localStorage.getItem('_AUTH_USER')));

const height = ref({ max: "90", min:"64" });
const admin = false;

// 메뉴 구성
const sidebarMenu = ref(MenuDEF);

// REFRESH 시 기본 설정값 셋팅
switch(_AUTH_USER?.value?.businessCd) {
  case "ACC": sidebarMenu.value = MenuACC; break;
  case "TAX": sidebarMenu.value = MenuTAX; break;
  default: sidebarMenu.value = MenuDEF; break;
}


// 로그인 후 변경시 메뉴 셋팅
watch(() => _AUTH_USER?.value?.businessCd, (newValue, oldValue) => {
  switch(_AUTH_USER?.value?.businessCd) {
    case "ACC": sidebarMenu.value = MenuACC; break;
    case "TAX": sidebarMenu.value = MenuTAX; break;
    default: sidebarMenu.value = MenuDEF; break;
  }
});


function subIsActive(input: any) {
  const paths = Array.isArray(input) ? input : [input];
  return paths.some((path) => {
    return; //$route.path.indexOf(path) === 0; // current path starts with this path string
  });
}


const timeLeft = ref('');

// 초를 분과 초로 변환하는 함수
const convertSecondsToMinutes = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
};

let intervalId = null; 

function initPage() {
  try {
    // setInterval 중복실행 방지
    if (intervalId) {
      clearInterval(intervalId);
    }
    const decoded = jwt_decode(_AUTH_USER.value.accessToken);
    const expiresAt = decoded.exp;
    intervalId = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingSeconds = expiresAt - currentTime;

      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        authStore.logout();
      } else {
        timeLeft.value = convertSecondsToMinutes(remainingSeconds);
      }
    }, 1000);
  } catch (e) {
    console.log(e);
  }
}

// storage 이벤트를 사용해 localStorage 의 _AUTH_USER 변경을 감지하고 스토어를 업데이트
const updateAuthUserFromLocalStorage = (event: StorageEvent) => {
  if (event.key === '_AUTH_USER') {
    _AUTH_USER.value = JSON.parse(localStorage.getItem('_AUTH_USER'));

    if (_AUTH_USER.value == null) {
      authStore.logout();
    } else {
      initPage();
    }
  }
};

onMounted(() => {
  window.addEventListener('storage1', updateAuthUserFromLocalStorage);
  initPage();
});

onUnmounted(() => {
  window.removeEventListener('storage1', updateAuthUserFromLocalStorage);
});



</script>

<template>
  <v-app-bar flat :height="height.max" app >
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
    <div class="logo">
      <router-link to="/introduce">
        <img src="/assets/Lockton_Logo_White_simbol.png" alt="" class="w-full">
      </router-link>
    </div>

    <v-spacer />

    <template v-if="true">
      <div class="horizontalMenu">
        <ul
          class="horizontal-navbar"
        >
          <li v-for="(item, i) in sidebarMenu" :key="i">
            <!-- single item -->
            <ul v-if="!item.children">
              <li class="single-item">
                <router-link :to="item.to">
                  <span>{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
            <!-- start Item with Dropdown -->
            <div v-else>
              <ul class="first-level" :class="item.extraclass">
                <li>
                  <a
                    class="d-flex align-center"
                    :class="{ 'is-link-active': subIsActive(item.to) }"
                  >
                    <div class="d-flex align-center">
                      <router-link :to="item.to">
                        <span>{{ item.title }}</span>
                      </router-link>
                    </div>
                    <!-- Start Dropdown Item -->
                    <ul
                      class="second-level"
                      :class="item.class"
                    >
                      <li v-for="(child, i) in item.children" :key="i">
                        <router-link :to="child.to" class="d-flex align-center">
                          <!-- <i :class="child.icon"></i> -->
                          <span>{{ child.title }}</span>
                        </router-link>
                      </li>
                    </ul>
                    <!-- End Dropdown Item -->
                  </a>
                </li>
              </ul>
            </div>
            <!-- end Item with Dropdown -->
          </li>
        </ul>
      </div>
    </template>
 
    <v-spacer />
    
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
    <div class="lnb d-flex align-center">
      <v-menu anchor="bottom end" origin="auto">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" to="/introduce" color="secondary">
            <vue-feather type="clipboard"></vue-feather>
            <p class="font-size-8 mt-1 d-none d-md-block">
              회사소개<br/>&nbsp;
            </p>
          </v-btn>
        </template>
      </v-menu>
     
      <v-menu anchor="bottom end" origin="auto" v-if="_AUTH_USER">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" to="/user/mypage" color="secondary">
            <vue-feather type="user"></vue-feather>
            <p class="font-size-8 mt-1 d-none d-md-block">
              마이페이지<br/>&nbsp;
            </p>
          </v-btn>
        </template>
      </v-menu>
  
      <v-menu anchor="bottom end" origin="auto" v-if="!_AUTH_USER">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" to="/user/login" color="secondary">
              <vue-feather type="user"></vue-feather>
              <p class="font-size-8 mt-1 d-none d-md-block">
                로그인<br/>&nbsp;
              </p>
         </v-btn>
        </template>
      </v-menu>

      <v-menu anchor="bottom end" origin="auto" v-if="_AUTH_USER">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props"  @click="authStore.logout()" color="secondary">
              <vue-feather type="log-out"></vue-feather>
              <p class="font-size-8 mt-1 d-none d-md-block">
                로그아웃<br/>{{ timeLeft }}&nbsp;
              </p>
            </v-btn>
        </template>
      </v-menu>

    </div>
  </v-app-bar>
</template>
<style scoped>
  .font-size-8 {
    font-size :0.5rem;
  }
</style>
