<script setup lang="ts">
import { RouterView } from "vue-router";

</script>

<template>
  <v-app>

    <v-main class="admin-wrapper">

      <!-- 컨텐츠 영역 -->
      <v-container class="admin-container-wrapper">
        <div class="maxWidth">
          <RouterView />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>