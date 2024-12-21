<template>
  <div>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center mb-3">
        <h2 class="font-weight-bold">
          <svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세
        </h2>
      </div>
      <v-img src="/assets/doc/policy/portal_password_policy.jpg"></v-img>
    </v-col>
  </v-row>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const page = ref({
    title: "비밀번호 정책",
    subTitle:"관리자 비밀번호 정책"
  });
const breadcrumbs = ref([
  {
    text: "기타 관리",
    disabled: false,
    href: "/",
  },
  {
    text: "관리자비밀번호 정책",
    disabled: true,
    href: "/",
  },
]);
</script>