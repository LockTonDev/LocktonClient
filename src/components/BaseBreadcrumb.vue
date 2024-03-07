<script setup lang="ts">
import {useMobileStore} from "@/stores";
const checkMobile = useMobileStore();

const props = defineProps({
  title: String,
  subtitle: String,
  breadcrumbs: Array as any,
  icon: String,
  image: String,
});


</script>

<template>

  <v-row class="v-breadcrumb-wrap ma-0">
    <v-img :src="image" cover v-if="image" gradient="90deg,  rgb(0, 0, 0, 0.9) 0%, rgb(0, 0, 0, 0.3) 45%, rgb(0, 0, 0, 0.3) 55%, rgb(0, 0, 0, 0.9) 100%"></v-img>
    <v-toolbar flat class="pa-0" :height="checkMobile.isMobile?'100':'200'">
      <div class="w-100">
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 position-absolute right-0">
          <template v-slot:divider v-if="breadcrumbs">
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <div class="text-center mt-4">
          <h1 class="text-title-1">{{ title }}</h1>
          <h2 class="mt-2 text-subtitle-1">{{ subtitle }}</h2>
        </div>
      </div>
      <slot></slot>
    </v-toolbar>
  </v-row>
</template>

<style lang="scss" scoped>
  .v-breadcrumb-wrap {
    position: relative;
    overflow: hidden;
    max-width: 100%;
    .v-img {
      position: absolute;
      width:100%;
      height: auto;
    }
    .v-toolbar {
      @media screen and (min-width:960px) {
        width: 1200px;
      }
      @media screen and (max-width:959px) {
        width: 100%;
      }
      margin:0 auto;
      background-color: inherit;
      color: #fff;
      background: transparent;
    }
  }


</style>
