<template>
  <v-card>
    <iframe :key="fileName" :src="fileName" width="100%" height="800px"></iframe>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import apiContract from '@/api/api/A_CONTRACT';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
const { _AUTH_USER } = storeToRefs(authStore);

let INSR_INFO = ref([]);
let INSR_DATA = ref([]);

const props = defineProps({
  baseYear: {
    type: String,
    required: false
  }
});

const fileName = ref('');

onMounted(async () => {
  // 보험료 조회
  const params = { user_cd: _AUTH_USER.value.userCd, business_cd: _AUTH_USER.value.businessCd, base_year: props.baseYear };
  const resultData = await apiContract.getDBSelInsuranceRate(params);
  INSR_INFO.value = resultData.data[0];

  fileName.value = '/assets/doc/insr_table/회계사_개인_보험료표_' + INSR_INFO.value.base_year + '.pdf';
});
</script>
