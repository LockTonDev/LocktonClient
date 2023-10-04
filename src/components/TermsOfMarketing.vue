  <template>
    <v-dialog
      persistent
      v-model="isOpenDialog"
      width="800px"
      hide-overlay
      scrollable
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center px-6 py-4 position-relative">
          <p class="text-h6 font-weight-bold">마케팅 개인정보 수집이용 동의</p>
          <v-spacer />
          <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>          
        </v-card-title>
        <v-divider class="mb-0"/>
        <v-card-text class="px-10 pt-8 pb-14 word-break-keep-all">
          <ul class="list-style-type-bull pl-2">
            <li>본 개인정보 수집 및 이용에 동의하시는 경우 회사는 귀하의 성명, 주소, 전화번호, 휴대폰번호, 전자우편주소를 수집하여 회원 탈퇴까지 상품·서비스 소개 및 맞춤 서비스 제공, 시장조사, 고객만족도 조사, 통계적 이용 등 내부 분석 및 공공기관의 정책자료로 활용할 수 있습니다.</li>
            <li class="mt-2">본 동의는 보험가입신청 및 체결에 필수적이지 않으므로 귀하는 동의를 거부하실 수 있으며, 동의를 거부하시더라도 서비스 이용에는 제한이 없습니다.</li>
            <li class="mt-2">귀하는 홈페이지(마이페이지-정보수정) 및 고객센터(02-2011-0300)를 통해 동의를 철회하거나 가입 권유 목적의 연락에 대해 중단을 요청하실 수 있으며 언제든지 마케팅 목적의 이용에 대한 중지를 요청할 수 있습니다</li>
          </ul>
          <div class="mt-4 d-flex justify-center">
              <v-radio-group v-model="agr_yn"  inline center hide-details class="mt-4 d-flex justify-center">
                <v-radio label="동의함" value="Y"></v-radio>
                <v-radio label="동의하지 않음" value="N"></v-radio>
              </v-radio-group>
        </div>
        </v-card-text>
      </v-card>
  </v-dialog>
  </template>
  

<script setup lang="ts">
import { onMounted, defineEmits, ref } from "vue";
import BaseCard from "@/components/BaseCard.vue";

const isOpenDialog = ref(true);
const agr_yn = ref('N');

const props = defineProps({
  agr_yn: String
});


const emit = defineEmits([
  'close'
]);

const close = () => {
  isOpenDialog.value = false;
  emit('close', agr_yn);
};

onMounted(async () => {
  agr_yn.value = props.agr_yn || 'N';
});

</script>