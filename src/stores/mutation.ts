import { ref } from "vue";
import { defineStore } from 'pinia'

export const useStore = defineStore('mutation', {
    state: () => {
        return { isLoading: ref(false)  }
    },
    // 다음과 같이 정의할 수도 있음:
    // state: () => ({ count: 0 })
    getters: {
        getState: (state)=>state.isLoading
    },
    actions: {
        show() {
            this.isLoading = ref(true)
        },
        hide() {
            this.isLoading = ref(false)
        },
    },
})