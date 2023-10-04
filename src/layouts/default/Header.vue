<script setup lang="ts">
import { ref, watchEffect, onMounted} from "vue";

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';



const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

const height = ref({ max: "110", min:"64" });

</script>

<template>
  <v-app-bar flat :height="height.max" app>
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
    <div class="lnb d-flex align-center">

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
  </v-app-bar>
</template>
<style scoped>
  .font-size-8 {
    font-size :0.4rem;
  }
  .main-wrap .v-app-bar.v-toolbar {
    background-image: linear-gradient(120deg, transparent 0%, transparent calc(50% + 400px), rgba(31, 35, 40) calc(50% + 400px));
    background-color: rgba(6, 7, 8);
}
</style>
