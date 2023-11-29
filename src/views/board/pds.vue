<script setup lang="ts">
  import { ref } from "vue";
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
  import BoardListFAQ from "@/components/BoardListFAQ.vue";

  const page = ref({ title: "자료실", subtitle : "", image: "../../assets/images/background/bg-cscenter1.jpg",});
  const breadcrumbs = ref([
    {
      text: "알림마당",
      disabled: false,
      to: "#",
    },
    {
      text: "자료실",
      disabled: false,
      to: "#",
    }
  ]);
  const selectype = ref(["전체", "제목", "내용"]);
  const search = ref("");
  const selecvalue = ref("전체");
  const Pagination = ref(1);
  
</script>


<template>
  <BaseBreadcrumb :title="page.title" :image="page.image"  :breadcrumbs="breadcrumbs" ></BaseBreadcrumb>
  <BoardListFAQ board_id="pds"></BoardListFAQ>

</template>