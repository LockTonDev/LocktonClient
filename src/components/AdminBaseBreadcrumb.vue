<script setup lang="ts">
const props = defineProps({
  title: String,
  breadcrumbs: Array as any,
  icon: String,
});
</script>

<template>

  <div class="d-flex align-center">
    <h1>{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs" class="ml-auto">
      <template v-slot:divider v-if="breadcrumbs">
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

