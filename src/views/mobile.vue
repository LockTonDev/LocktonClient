<template>
  <div class="align-center d-flex flex-column h-100vh justify-center">
    <img src="/assets/Lockton_Logo_Black_simbol.png" alt="" class="w-20 mb-auto mt-6"/>
    <img src="/assets/laptop.png" alt="" class="w-50"/>
    <p style="font-size:2rem;" class="font-weight-light mt-4">COMMING SOON</p>
    <p style="font-size:0.814rem;" class="font-weight-medium mt-4">
      모바일 버전은 준비중에 있습니다.<br/>
      PC로 접속하여 주시기 바랍니다.
    </p>
    <p style="font-size:0.814rem;" class="font-weight-thin mb-8 mt-auto text-primary">https://www.locktonpi.com</p>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import router from "@/router";
  onMounted(async () => {    
     const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent || navigator.vendor || window.opera);

     // 모바일 디바이스에서 접속한 경우 리다이렉션
    if (!isMobile) {
       router.push('/');
    }
  });
</script>
