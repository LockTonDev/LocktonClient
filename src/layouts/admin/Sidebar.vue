<script setup lang="ts">
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import { useAuthStore } from '@/stores';
  import sidebarItems from "./SidebarItem";
  import LoadingBar from '@/components/LoadingBar.vue';
  import jwt_decode from 'jwt-decode';
  import { storeToRefs } from 'pinia';
  import { MessageBoxDTO, ParamsDTO, CommonCode, InsuranceDTO, InsuranceRateDTO, CBRDataDTO } from '@/model';
  import MessageBox from '@/components/MessageBox.vue';

  const sidebarMenu = ref(sidebarItems);
  const warnTimeoutMin = 3
  const authStore = useAuthStore();
  let _AUTH_ADMIN = ref(JSON.parse(localStorage.getItem('_AUTH_ADMIN')));

  const { isLoading } = storeToRefs(authStore);
  const { drawer } = storeToRefs(authStore);
  const loadingBar = ref(isLoading?.value);
  const isDrawer = ref(drawer?.value);


  const timeLeft = ref('');
  const messageBoxDTO = ref(new MessageBoxDTO());
  // 초를 분과 초로 변환하는 함수
  const convertSecondsToMinutes = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };

  let intervalId = null;

  function extendTime() {
    authStore.refreshAdminAccessToken('_AUTH_ADMIN').then(function(response) {
      _AUTH_ADMIN.value = JSON.parse(localStorage.getItem('_AUTH_ADMIN'));
      initPage()
    })
  }
  function initPage() {
    // setInterval 중복실행 방지
    if (intervalId) {
      clearInterval(intervalId);
    }
    try {

      const decoded = jwt_decode(_AUTH_ADMIN.value.accessToken);
      const expiresAt = decoded.exp;

      intervalId = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingSeconds = expiresAt - currentTime;
        if (remainingSeconds <= 0) {
          clearInterval(intervalId);
          authStore.adminLogout();
        } else if(remainingSeconds == warnTimeoutMin * 60) {
          messageBoxDTO.value.setConfirm('시간연장', '세션 종료까지 '+warnTimeoutMin+'분 남았습니다. 연장하시겠습니까?<br> 취소 시 연장 버튼을 통해서도 세션 연장이 가능합니다.', null, (result, params) => {
            if (result) {
              extendTime()
            }
          });
        } else {
          timeLeft.value = convertSecondsToMinutes(remainingSeconds);
        }
      }, 1000);
    } catch(e) {
      console.error(e)
    }
  }

  function logoutAction() {
    messageBoxDTO.value.setConfirm('로그아웃', '로그아웃 하시겠습니까?', null, (result, params) => {
      if (result) {
        if (intervalId) {
          clearInterval(intervalId);
        }
        authStore.adminLogout()
      }
    });

  }

  // storage 이벤트를 사용해 localStorage 의 _AUTH_ADMIN 변경을 감지하고 스토어를 업데이트
  const updateAuthAdminFromLocalStorage = (event: StorageEvent) => {
    if (event.key === '_AUTH_ADMIN') {
      _AUTH_ADMIN.value = JSON.parse(localStorage.getItem('_AUTH_ADMIN'));

      if (_AUTH_ADMIN.value == null) {
        authStore.adminLogout();
      } else {
        initPage();
      }
    }
  };


  onMounted(() => {
    window.addEventListener('storage', updateAuthAdminFromLocalStorage);
    initPage();
  });
  onUnmounted(() => {
    window.removeEventListener('storage', updateAuthAdminFromLocalStorage);
  });

</script>
  
  <template>
    <v-navigation-drawer fixed color="dark" class="admin-navi-wrap" width="205"  v-model="isDrawer">
      <!-- ---------------------------------------------- -->
      <!---Navigation -->
      <!-- ---------------------------------------------- -->
      <perfect-scrollbar>
        <RouterLink to="/lcksl-fr/lypts/sol01/dev/AT1" class="text-decoration-none text-border ma-sm-3">
          <div class="align-center text-center">
            <div class="logo">
              <img src="/assets/Lockton_Logo_White_simbol.png" alt="" class="h-40" />
            </div>
          </div>
        </RouterLink>
        <v-divider></v-divider>
        <v-list-item>{{ _AUTH_ADMIN.userNm }} 님 반갑습니다.</v-list-item>
        <v-list-item><p class="mr-6 text-14 align-center"> <span class="">{{ timeLeft }}</span> <button type="button" class="v-btn v-btn--flat v-theme--light ma-sm-2 bg-primary v-btn--density-default rounded-md v-btn--size-small v-btn--variant-flat"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span class="v-btn__content" data-no-activator="" @click="extendTime()">연장</span></button></p></v-list-item>
        <v-divider></v-divider>
        <v-list class="py-0">
          <!-- ---------------------------------------------- -->
          <!---Menu Loop -->
          <!-- ---------------------------------------------- -->
          <template v-for="(item, i) in sidebarMenu">
            <!-- ---------------------------------------------- -->
            <!---Item Sub Header -->
            <!-- ---------------------------------------------- -->
            <v-list-subheader v-if="item.header" class="d-none">{{item.header}}</v-list-subheader>
            <!-- ---------------------------------------------- -->
            <!---If Has Child -->
            <!-- ---------------------------------------------- -->
            <v-list-group v-else-if="item.children">
              <!-- ---------------------------------------------- -->
              <!---Dropdown  -->
              <!-- ---------------------------------------------- -->
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props"  :value="item.title" variant="flat" class="py-4 bg-dark">
                  <!---Icon  -->
                  <span class="d-inline-block mr-4">
                    <vue-feather :type="item.icon" class="feather-sm"></vue-feather>
                  </span>
                  <!---Title  -->
                  <v-list-item-title v-text="item.title" class="mr-auto d-inline-block text-14" ></v-list-item-title>                  
                </v-list-item>
              </template>
              <!-- ---------------------------------------------- -->
              <!---Sub Item-->
              <!-- ---------------------------------------------- -->
              <v-list-item v-for="(subitem, i) in item.children" :key="i" :value="subitem.to" :to="subitem.to" variant="flat" class="py-2 bg-dark">
                <v-list-item-title v-text="subitem.title" class="text-14"></v-list-item-title>
              </v-list-item>
            </v-list-group>
            <!-- ---------------------------------------------- -->
            <!---Single Item-->
            <!-- ---------------------------------------------- -->
            <v-list-item v-else :key="i" :to="item.to" variant="flat" class="-item py-4 bg-dark">
              <span class="d-inline-block mr-4">
                <vue-feather :type="item.icon" class="feather-sm" ></vue-feather>
              </span>
              <v-list-item-title v-text="item.title" class="d-inline-block text-14"></v-list-item-title>
            </v-list-item>
            <!-- ---------------------------------------------- -->
            <!---End Single Item-->
            <!-- ---------------------------------------------- -->
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-list-item @click="logoutAction" class="-item py-4 bg-dark">
          <span class="d-inline-block mr-4">
                <vue-feather type="log-out" class="feather-sm" ></vue-feather>
              </span>
          <v-list-item-title v-text="'로그아웃'" class="d-inline-block text-14"></v-list-item-title>
        </v-list-item>
      </perfect-scrollbar>
    </v-navigation-drawer>
    <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
    <LoadingBar v-if="loadingBar"></LoadingBar>
  </template>
  