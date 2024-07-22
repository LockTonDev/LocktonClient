<script setup lang="ts">
import { ref, watchEffect, onMounted} from "vue";

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

import {useMobileStore} from "@/stores";
const checkMobile = useMobileStore();

const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

const height = ref({ max: "110", min:"64" });
const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
}

</script>

<template>
  <v-app-bar flat :height="height.max" app>
    <template v-if="checkMobile.isMobile">
      <div class="d-flex">
        <v-app-bar-nav-icon class="d-flex justify-start pl-10" style="width: 33.3%" @click="toggleDrawer">
          <v-icon color="white" size="24">mdi-menu</v-icon>
        </v-app-bar-nav-icon>
        <div class="logo" style="width: 33.3%; height: 48px">
          <router-link to="/main" class="w-max-full d-flex justify-center">
            <img src="/assets/Lockton_Logo_White_simbol.png" alt="" style="width:75% !important;">
          </router-link>
        </div>
        <div  style="width: 33.3%"></div>
      </div>
    </template>
    <template v-else>
      <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
      <div class="logo">
        <router-link to="/main">
          <img src="/assets/Lockton_Logo_White_simbol.png" alt="" class="w-full">
        </router-link>
      </div>

      <v-spacer />


    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->
      <div v-if="!checkMobile.isMobile" class="lnb d-flex align-center">

        <v-menu anchor="bottom end" origin="auto">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" to="/introduce" color="secondary">
              <vue-feather type="clipboard"></vue-feather>
              <p class="font-size-8 mt-1 d-none d-md-block">
                회사소개
              </p>
            </v-btn>
          </template>
        </v-menu>

        <v-menu anchor="bottom end" origin="auto" v-if="!_AUTH_USER">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" to="/user/login" color="secondary">
                <vue-feather type="user"></vue-feather>
                <p class="font-size-8 mt-1 d-none d-md-block">
                  로그인
                </p>
          </v-btn>
          </template>
        </v-menu>

        <v-menu anchor="bottom end" origin="auto" v-if="_AUTH_USER">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props"  @click="authStore.logout()" color="secondary">
                <vue-feather type="log-out"></vue-feather>
                <p class="font-size-8 mt-1 d-none d-md-block">
                  로그아웃
                </p>
          </v-btn>
          </template>
        </v-menu>
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app v-if="checkMobile.isMobile" class="bg-header">
    <v-list class="py-0">
      <router-link to="/introduce" class="text-decoration-none">
        <v-list-item :key="'menu-item-introduce'" class="ml-1 my-2 text-white" style="min-height: 35px !important;">
          <v-list-item-title class="text-18">회사소개</v-list-item-title>
        </v-list-item>
      </router-link>
      <!--20240119 장애조치 -->
<!--      <router-link to="/user/login" class="text-decoration-none">-->
<!--        <v-list-item :key="'menu-item-login'" class="ml-1 my-2 text-white" style="min-height: 35px !important;" v-if="!_AUTH_USER">-->
<!--          <v-list-item-title class="text-18">로그인</v-list-item-title>-->
<!--        </v-list-item>-->
<!--      </router-link>-->
<!--      <v-list-item @click="authStore.logout()" :key="'menu-item-logout'" class="ml-1 my-2 text-white" style="min-height: 35px !important;" v-if="_AUTH_USER">-->
<!--        <v-list-item-title class="text-18">로그아웃</v-list-item-title>-->
<!--      </v-list-item>-->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {useMobileStore} from "@/stores";
let checkMobile = useMobileStore();
console.log(checkMobile.isMobile)
</script>

<style scoped>
  .font-size-8 {
    font-size :0.5rem;
  }
  .main-wrap .v-app-bar.v-toolbar {
    background-image: linear-gradient(120deg, transparent 0%, transparent calc(50% + 400px), rgba(31, 35, 40) calc(50% + 400px));
    background-color: rgba(6, 7, 8);
}
</style>
