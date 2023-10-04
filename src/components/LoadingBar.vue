<template>
  <v-dialog v-model="isLoading" persistent max-width="300">
    <v-card>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false);
</script>
