<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted} from "vue";
import {MenuDEF, MenuACC, MenuTAX, MenuADV, MenuCAA, MenuPAT, MenuLAW}  from "./SidebarItems";

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { useStore } from '@/stores/mutation'
import jwt_decode from 'jwt-decode';
import { MessageBoxDTO,  ParamsDTO, CommonCode, InsuranceDTO, InsuranceRateDTO, CBRDataDTO } from '@/model';
import MessageBox from '@/components/MessageBox.vue';

import {useMobileStore} from "@/stores";
import TermsOfMarketing from "../../components/TermsOfMarketing.vue";
const checkMobile = useMobileStore();

const authStore = useAuthStore();
const _AUTH_USER  = ref(JSON.parse(localStorage.getItem('_AUTH_USER')));

const store = useStore();
const { isLoading } = storeToRefs(store);

const height = ref({ max: "90", min:"64" });
const admin = false;

// 메뉴 구성
const sidebarMenu = ref(MenuDEF);
const drawer = ref(false);

const warnTimeoutMin = 29//3
const messageBoxDTO = ref(new MessageBoxDTO());
//const LoadingBarDTO = ref(new LoadingBarDTO());

// REFRESH 시 기본 설정값 셋팅
switch(_AUTH_USER?.value?.businessCd) {
  case "ACC": sidebarMenu.value = MenuACC; break;
  case "TAX": sidebarMenu.value = MenuTAX; break;
  case "ADV": sidebarMenu.value = MenuADV; break;
  case "CAA": sidebarMenu.value = MenuCAA; break;
  case "PAT": sidebarMenu.value = MenuPAT; break;
  case "LAW": sidebarMenu.value = MenuLAW; break;
  default: sidebarMenu.value = MenuDEF; break;
}


// 로그인 후 변경시 메뉴 셋팅
watch(() => _AUTH_USER?.value?.businessCd, (newValue, oldValue) => {
  switch(_AUTH_USER?.value?.businessCd) {
    case "ACC": sidebarMenu.value = MenuACC; break;
    case "TAX": sidebarMenu.value = MenuTAX; break;
    case "ADV": sidebarMenu.value = MenuADV; break;
    case "CAA": sidebarMenu.value = MenuCAA; break;
    case "PAT": sidebarMenu.value = MenuPAT; break;
    case "LAW": sidebarMenu.value = MenuLAW; break;
    default: sidebarMenu.value = MenuDEF; break;
  }
});


function subIsActive(input: any) {
  const paths = Array.isArray(input) ? input : [input];
  return paths.some((path) => {
    return; //$route.path.indexOf(path) === 0; // current path starts with this path string
  });
}

function extendTime() {
  authStore.refreshAdminAccessToken('_AUTH_USER').then(function(response) {
    _AUTH_USER.value = JSON.parse(localStorage.getItem('_AUTH_USER'));
    initPage()
  })
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

    /*
          intervalId = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingSeconds = expiresAt - currentTime;
            if (remainingSeconds <= 0) {
              clearInterval(intervalId);
              authStore.logout();
            } else if(remainingSeconds == warnTimeoutMin * 60) {
              messageBoxDTO.value.setConfirm('시간연장', '세션 종료까지 '+warnTimeoutMin+'분 남았습니다. 연장하시겠습니까?<br> 취소 시 연장 버튼을 통해서도 세션 연장이 가능합니다.', null, (result, params) => {
                if (result) {
                  extendTime()
                }
              });
            } else {
              timeLeft.value = convertSecondsToMinutes(remainingSeconds);
            }
          }, 1000);*/
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

const toggleDrawer = () => {
  drawer.value = !drawer.value;
}

onMounted(() => {
  // window.addEventListener('storage1', updateAuthUserFromLocalStorage);
  // initPage();
});

onUnmounted(() => {
  // window.removeEventListener('storage1', updateAuthUserFromLocalStorage);
});



</script>

<template>

  <v-app-bar flat :height="height.max" app >
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
    <template v-if="checkMobile.isMobile">
      <div class="d-flex">
        <v-app-bar-nav-icon class="d-flex justify-start pl-10" style="width: 33.3%" @click="toggleDrawer">
          <v-icon color="white" size="24">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
        <div class="logo" style="width: 33.3%;">
          <router-link to="/main" class="w-max-full d-flex justify-center">
            <img src="/assets/Lockton_Logo_White_simbol.png" alt="" style="width:75% !important;">
          </router-link>
        </div>
        <div  style="width: 33.3%"></div>
      </div>
    </template>
    <template v-else>
      <div class="logo">
        <router-link to="/main">
          <img src="/assets/Lockton_Logo_White_simbol.png" alt="" class="w-full">
        </router-link>
      </div>
      <div class="flex-grow-1"></div>
      <v-spacer />
      <div class="horizontalMenu">
        <ul
          class="horizontal-navbar"
        >
          <li v-for="(item, i) in sidebarMenu" :key="i">
            <!-- single item -->
            <ul v-if="!item.children">
              <li class="single-item">
                <router-link :to="item.to">
                  <span>{{ item.title }} - {{i}}</span>
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
<!--          <button type="button" class="v-btn v-btn&#45;&#45;flat v-theme&#45;&#45;light bg-primary v-btn&#45;&#45;density-default rounded-md v-btn&#45;&#45;size-small v-btn&#45;&#45;variant-flat"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>&lt;!&ndash;&ndash;&gt;<span class="v-btn__content" data-no-activator="" @click="extendTime()">연장</span>&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</button>-->
        </template>
      </v-menu>

    </div>
    </template>

  </v-app-bar>
  <v-navigation-drawer v-model="drawer" app v-if="checkMobile.isMobile" class="bg-header">
    <v-list class="py-0">
      <!-- 메뉴 항목들을 반복하여 표시 -->
      <template v-for="(item, i) in sidebarMenu" :key="'menu-item-' + i">
        <!-- 메인 메뉴 항목 -->
        <router-link :to="item.to" class="text-decoration-none">
          <v-list-item :key="'menu-item-' + i" class="ml-1 my-2 text-white" style="min-height: 35px !important;">
            <v-list-item-title class="text-18">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </router-link>

        <!-- 메인 메뉴 항목의 자식 항목들 -->
        <template v-for="(child, j) in item.children" :key="'dropdown-item-' + i + '-child-' + j">
          <router-link :to="child.to" class="text-decoration-none">
            <v-list-item :key="'dropdown-item-' + i + '-child-' + j" class="ml-4 my-1 text-white text-decoration-none" style="min-height: 35px !important;">
              <v-list-item-title class="text-14">{{ child.title }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </template>
      </template>
      <router-link to="/user/mypage" class="text-decoration-none">
        <v-list-item :key="'menu-item-mypage'" class="ml-1 my-2 text-white" style="min-height: 35px !important;" v-if="_AUTH_USER">
          <v-list-item-title class="text-18">마이페이지</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/user/login" class="text-decoration-none">
        <v-list-item :key="'menu-item-login'" class="ml-1 my-2 text-white" style="min-height: 35px !important;" v-if="!_AUTH_USER">
          <v-list-item-title class="text-18">로그인</v-list-item-title>
        </v-list-item>
      </router-link>
      <v-list-item @click="authStore.logout()" :key="'menu-item-logout'" class="ml-1 my-2 text-white" style="min-height: 35px !important;" v-if="_AUTH_USER">
        <v-list-item-title class="text-18">로그아웃</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
</template>


<style scoped>
  .font-size-8 {
    font-size :0.5rem;
  }
</style>
