<template>
  <RouterView></RouterView>
  <LoadingBar></LoadingBar>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, onMounted, onUnmounted } from 'vue';
import { RouterView } from "vue-router";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import router from '@/router';
import LoadingBar from './components/LoadingBar.vue';


const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

const handler = (event: BeforeUnloadEvent) => {
  //event.preventDefault();
  //event.returnValue = '';
  //console.log(event);
};

onMounted(() => {
  window.addEventListener('beforeunload', handler);

});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handler);
});



</script>
