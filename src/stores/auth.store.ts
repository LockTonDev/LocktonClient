import router from '@/router';
import { defineStore } from 'pinia';
import apiUser from '@/api/api/user.api';
import jwt_decode from "jwt-decode";
import {ref} from "vue";

export const useMobileStore = defineStore('mobile', {
  state: () => ({
    isMobile: false // 초기값: 모바일이 아님
  }),
  actions: {
    setIsMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    }
  }
});

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    _AUTH_USER: JSON.parse(localStorage.getItem('_AUTH_USER')),
    _AUTH_ADMIN: JSON.parse(localStorage.getItem('_AUTH_ADMIN')),
    returnUrl: null,
    isLoading: false,
    drawer: true
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    show() {
      this.isLoading = true
    },
    hide() {
      this.isLoading = false
    },
    chgDrawer() {
      this.drawer = !this.drawer
      console.log("this.drawer",this.drawer)
    },
    hideDrawer() {
      this.drawer = false
      console.log("hide",this.drawer)
    },
    async login(params: any) {
      //console.log('localStorage', localStorage);
      try {
        const retData = await apiUser.getLogin(params);

        if (retData.success) {
          this._AUTH_USER = retData.data;
          localStorage.setItem('_AUTH_USER', JSON.stringify(this._AUTH_USER));

          //router.push(this.returnUrl || '/');
        } else {
          this._AUTH_USER = null;
          localStorage.removeItem('_AUTH_USER');
          // const alertStore = useAlertStore();
          // alertStore.error(error);
        }
        return retData;
      } catch (error) {
        // console.log(error);
        this._AUTH_USER = null;
        localStorage.removeItem('_AUTH_USER');

        return {
          success: false,
          message: '아이디와 비밀번호를 찾을 수 없습니다.'
        };
      }
    },
    async adminLogin(params: any) {
      //console.log('localStorage', localStorage);
      try {
        const retData = await apiUser.getAdminLogin(params);

        if (retData.success) {
          this._AUTH_ADMIN = retData.data;
          localStorage.setItem('_AUTH_ADMIN', JSON.stringify(this._AUTH_ADMIN));

          //router.push(this.returnUrl || '/');
        } else {
          this._AUTH_ADMIN = null;
          localStorage.removeItem('_AUTH_ADMIN');
          // const alertStore = useAlertStore();
          // alertStore.error(error); 
        }
        return retData;
      } catch (error) {
         console.log(error);
        this._AUTH_ADMIN = null;
        localStorage.removeItem('_AUTH_ADMIN');

        return {
          success: false,
          message: '관리자 아이디와 비밀번호를 찾을 수 없습니다.'
        };
      }
    },
    logout() {
      this._AUTH_USER = null;
      localStorage.removeItem('_AUTH_USER');
      localStorage.removeItem('_COMMON_CODES');
      // localStorage.clear();
      router.push('/user/login');
    },
    logoutUnexpected() {
      this._AUTH_USER = null;
      localStorage.removeItem('_AUTH_USER');
      localStorage.removeItem('_COMMON_CODES');
      // localStorage.clear();
      router.push('/');
    },
    adminLogout() {
      this._AUTH_ADMIN = null;
      //localStorage.clear();
      localStorage.removeItem('_AUTH_ADMIN');
      router.push('/lcksl-fr/lypts/sol01/login');
    },
    async refreshAccessToken() {
      try {
        const userInfo = localStorage.getItem('_AUTH_USER');
        const retData = await apiUser.getRefreshLogin(userInfo);
        
        if (retData.success) {
          
          this._AUTH_USER.accessToken = retData.data.accessToken;

          localStorage.setItem('_AUTH_USER', JSON.stringify(this._AUTH_USER));
        } else {
          this._AUTH_USER = null;
          localStorage.removeItem('_AUTH_USER');
          return false;
        }
        return retData;
      } catch (error) {
        console.log(error);
        this._AUTH_USER = null;
        localStorage.removeItem('_AUTH_USER');

        return false;
      }
      return true;
    },
     async refreshAdminAccessToken(type) {
      try {

        let userInfo = JSON.parse(localStorage.getItem(type));
        const decoded = jwt_decode(userInfo.accessToken);
        userInfo["userUuid"] = decoded.uuid
        let retData = await apiUser.getRefreshLogin(userInfo);
        if (retData.success) {
          userInfo.accessToken = retData.data.accessToken
          userInfo.refreshToken = retData.data.refreshToken
          localStorage.setItem(type, JSON.stringify(userInfo));
        }
      } catch (error) {
        return false;
      }
      return true;
    }
  }
});
