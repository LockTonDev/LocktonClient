<script setup lang="ts">
  import { ref } from "vue";
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
  import BoardList from "@/components/BoardList.vue";


  
  const page = ref({ 
    title: "공지사항", 
    image: "../../assets/images/background/bg-cscenter1.jpg",
  });

  const breadcrumbs = ref([
    {
      text: "알림마당",
      disabled: false,
      to: "#",
    },
    {
      text: "공지사항",
      disabled: false,
      to: "#"
    }
  ]);



  </script>

<template>
  <BaseBreadcrumb :title="page.title" :image="page.image" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <BoardList board_id="notice"></BoardList>
  
</template>
