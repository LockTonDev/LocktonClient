<script setup lang="ts">
import { onMounted, defineEmits, ref } from "vue";

const loadState = ref(true);


const emit = defineEmits([
  'close'
]);

const close = () => {
  loadState.value = false;
};

onMounted(async () => {
});

</script>

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
  left: 98%;
  transform: translate(-50%,-50%);
  width: 100%;
  text-align: center;
  z-index: 700;
  position: absolute !important;
  overflow: hidden;
  display: block;
}
</style>