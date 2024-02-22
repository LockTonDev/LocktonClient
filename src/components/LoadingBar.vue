<template>
  <v-layout row justify-center>
    <v-dialog v-model="loadState" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout class="test">
          <v-progress-circular  indeterminate :size="70" :width="7" color="blue"></v-progress-circular>
<!--          <h1 v-if="message != null">{{message}}</h1>-->
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>
<script>
import { useStore } from '@/stores/mutation'
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
const store = useStore();
const { isLoading } = storeToRefs(store);
export default {
  setup() {
    const loadState = isLoading.value
    return { loadState }
  }
}
</script>

<style>
.dialog.centered-dialog,
.v-dialog.centered-dialog {
  background: #282c2dad;
  box-shadow: none;
  border-radius: 6px;
  width: 100%;
  color: whitesmoke;
}
.test{
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  z-index: 700;
  position: absolute !important;
  overflow: hidden;
  display: block;
}
</style>