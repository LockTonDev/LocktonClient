import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import axios from 'axios';


const showLoading = () => {
    const authStore = useAuthStore();
    authStore.show()
};

const hideLoading = () => {
    const authStore = useAuthStore();
    authStore.hide()
};


const commonService = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': `application/json` },
  timeout: 1000 * 10 * 6
});

commonService.interceptors.request.use(
  config => {
      console.log("test1")
    showLoading(); // Show loading bar
    const { _AUTH_USER } = useAuthStore();
    const isLoggedIn = !!_AUTH_USER?.accessToken;

    if (isLoggedIn) {
      config.data = {
        ...config.data,
        _AUTH_USER: _AUTH_USER 
      };
      config.headers['Authorization'] = 'Bearer ' + _AUTH_USER.accessToken; 
      //config.headers['x-access-token'] = user.accessToken; // for Node.js Express back-end
    }
    // console.log('commonService Request: OnFulfilled Data', config.data);
    return config;
  },
  error => {
    hideLoading(); // Hide loading bar
    console.log('commonService Request: OnRejected');
    return Promise.reject(error);
  }
);

commonService.interceptors.response.use(
  response => {
    //console.log('commonService Response: ', response.data);
      hideLoading();

      console.log("test1 hide")
    return response.data;
  },
  error => {
      hideLoading();

      console.log("test1 hide")
    if (error.response && error.response.status === 401) {
      //  console.log(error);
      const authStore = useAuthStore();
      const { _AUTH_USER } = useAuthStore();
      const isLoggedIn = !!_AUTH_USER?.accessToken;
      
      authStore.logout();

    }
    
    if (error.response && error.response.status === 403) {
      console.log(error);
      if (false) {
        const authStore = useAuthStore();
        authStore.logout();
      }
    }
    
    return Promise.reject(error);
  }
);

const fileService = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': `multipart/form-data` },
    timeout: 1000 * 10 * 6
});

fileService.interceptors.request.use(
    config => {
        showLoading(); // Show loading bar

        console.log("test2")
        const { _AUTH_USER } = useAuthStore();

        const isLoggedIn = !!_AUTH_USER?.accessToken;

        if (isLoggedIn) {
            if (config.data instanceof FormData) {
                config.data.append('_AUTH_USER', JSON.stringify(_AUTH_USER));
            } else {
                // For other types of requests (e.g., JSON)
                config.data = {
                    ...config.data,
                    _AUTH_USER: _AUTH_USER,
                };
            }
            config.headers['Authorization'] = 'Bearer ' + _AUTH_USER.accessToken;
            //config.headers['x-access-token'] = user.accessToken; // for Node.js Express back-end
        }
        // console.log('commonService Request: OnFulfilled Data', config.data);
        return config;
    },
    error => {
        hideLoading(); // Hide loading bar
        console.log('commonService Request: OnRejected');
        return Promise.reject(error);
    }
);

fileService.interceptors.response.use(
    response => {
        //console.log('commonService Response: ', response.data);
        hideLoading();
        return response.data;
    },
    error => {
        if (error.response && error.response.status === 401) {
            //  console.log(error);
            const authStore = useAuthStore();
            const { _AUTH_USER } = useAuthStore();
            const isLoggedIn = !!_AUTH_USER?.accessToken;

            authStore.logout();

        }

        if (error.response && error.response.status === 403) {
            console.log(error);
            if (false) {
                const authStore = useAuthStore();
                authStore.logout();
            }
        }

        return Promise.reject(error);
    }
);


const authService = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': `application/json` },
  timeout: 1000 * 60 * 10

});


authService.interceptors.request.use(
  config => {
   showLoading(); // Show loading bar
      console.log("test3")

    const { _AUTH_ADMIN } = useAuthStore();
    const isLoggedIn = !!_AUTH_ADMIN?.accessToken;

    if (isLoggedIn) {
      config.headers['Authorization'] = 'Bearer ' + _AUTH_ADMIN.accessToken;
    }
    // console.log('authService Request: OnFulfilled Data', config.data);
    return config;
  },
  error => {

    hideLoading(); // Hide loading bar
    console.log('commonService Request: OnRejected');
    return Promise.reject(error);
  }
);


authService.interceptors.response.use(
  response => {
    hideLoading();

      console.log("test3 hide")
    return response.data;
  },
  error => {
    hideLoading();
      console.log("test3 hide")
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      const { _AUTH_ADMIN } = useAuthStore();
      const isLoggedIn = !!_AUTH_ADMIN?.accessToken;
      //  console.log(error);
      authStore.adminLogout();


    }
    if (error.response && error.response.status === 403) {
      
    }
  
    return Promise.reject(error);
  }
);

// 생성한 인스턴스를 익스포트 합니다.
export default {
  commonService,
  authService,
  fileService
};
