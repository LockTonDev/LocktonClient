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

<template>
  <v-dialog
    persistent
    v-model="isOpenDialog"
    width="800px"
    hide-overlay
    scrollable
  >
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center px-6 py-4 position-relative">
        <p class="text-h6 font-weight-bold">개인(신용)정보의 수집·이용 동의</p>
        <v-spacer />
        <v-btn variant="outlined" color="dark" @click="close()">닫기</v-btn>
      </v-card-title>
      <v-divider class="mb-0" />
      <v-card-text class="px-10 pt-8 pb-14">
        <p>
          록톤컴퍼니즈코리아손해보험중개㈜는 다음과 같이 정보주체의
          개인(신용)정보를 수집하고 있습니다.
        </p>
        <div class="v-board-table mt-4">
          <table>
            <col style="width: 23%" />
            <col style="width: auto" />
            <tbody>
              <tr>
                <th>수집·이용 목적</th>
                <td>회원가입 및 관리</td>
              </tr>
              <tr>
                <th>보유 및 이용기간</th>
                <td>회원 탈퇴 시까지 또는 관련 법령에 의한 보존기한까지</td>
              </tr>
              <tr>
                <th>수집·이용 항목</th>
                <td>
                  성명, 생년월일, 등록번호(전문인), 전자우편주소, 본인확인기관에서
                  제공하는 C.I (Connecting Information), IP Address, 본인인증
                  수단, 접속일시, 쿠키, 서비스 이용내역, 접속로그, 최초 회원
                  가입일, 최후 회원 탈퇴일, 휴대폰번호, 사무소명, 사업자번호,
                  법인번호, 사무실전화, 사무소 팩스, 담당자 성명, 사무소주소
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4">
          귀하는 개인(신용)정보의 수집·이용 및 조회, 제공에 관한 동의를 거부하실
          수 있으며, 개인의 신용도 등을 평가하기 위한 목적 이외의 개인(신용)정보
          제공 동의는 철회할 수 있습니다. 다만, 본 동의는 ‘홈페이지 회원가입’에
          필수적이며 동의를 거부하시는 경우에는 관련 업무수행이 불가능 합니다.
        </p>
        <v-radio-group v-model="agr_yn" inline center hide-details class="mt-4 d-flex justify-center">
          <v-radio direction="horizontal" label="동의함" value="Y" class="mr-2"></v-radio>
          <v-radio direction="horizontal" label="동의하지 않음" value="N"></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
    
  </v-dialog>
</template>

<style scoped>
.v-board-table {
  border-bottom: none;
}
.v-board-table tr th {
  font-size: 16px !important;
  padding: 14px 20px;
  text-align: left;
  border-bottom: 1px solid #e9e9e9;
  text-align: center;
}
.v-board-table tr td {
  font-size: 16px;
  padding: 14px 20px;
  text-align: left;
  border-bottom: 1px solid #e9e9e9;
  word-break: keep-all;
}
.v-board-table tr {
  border: none;
}
</style>
