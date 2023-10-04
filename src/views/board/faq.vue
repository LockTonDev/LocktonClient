<script setup lang="ts">
  import { ref } from "vue";
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
  import BoardListFAQ from "@/components/BoardListFAQ.vue";


  
  const page = ref({ title: "FAQ", subtitle : "", image: "../../assets/images/background/bg-cscenter1.jpg",});
  const breadcrumbs = ref([
    {
      text: "알림마당",
      disabled: false,
      to: "#",
    },
    {
      text: "FAQ",
      disabled: false,
      to: "#",
    }
  ]);

</script>


<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" :image="page.image"></BaseBreadcrumb>

  <BoardListFAQ board_id="faq"></BoardListFAQ>

<!--   
  <v-row class="my-10">
    <v-col cols="12" md="4">
      <v-select v-model="selectValue" :items="selectype" variant="outlined" hide-details></v-select>
    </v-col>
    <v-col cols="12" md="8">
      <v-text-field :loading="false" variant="outlined" label="검색어를 입력하세요" append-inner-icon="mdi-magnify " hide-details single-line @click:append-inner=""></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-expansion-panels class="v-board-table size-large">
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            시스템 점검에 따른 일시적 서비스 중단 안내
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            서비스 향상을 위한 시스템 점검으로 인하여 아래와 같이 일시적으로 서비스 이용이 중단될 예정입니다.
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            시스템 점검에 따른 일시적 서비스 중단 안내
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            서비스 향상을 위한 시스템 점검으로 인하여 아래와 같이 일시적으로 서비스 이용이 중단될 예정입니다.
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            시스템 점검에 따른 일시적 서비스 중단 안내
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            서비스 향상을 위한 시스템 점검으로 인하여 아래와 같이 일시적으로 서비스 이용이 중단될 예정입니다.
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            시스템 점검에 따른 일시적 서비스 중단 안내
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            서비스 향상을 위한 시스템 점검으로 인하여 아래와 같이 일시적으로 서비스 이용이 중단될 예정입니다.
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            시스템 점검에 따른 일시적 서비스 중단 안내
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            서비스 향상을 위한 시스템 점검으로 인하여 아래와 같이 일시적으로 서비스 이용이 중단될 예정입니다.
          </v-expansion-panel-text>
        </v-expansion-panel>
        
        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            시스템 점검에 따른 일시적 서비스 중단 안내
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            서비스 향상을 위한 시스템 점검으로 인하여 아래와 같이 일시적으로 서비스 이용이 중단될 예정입니다.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel elevation="0">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            시스템 점검에 따른 일시적 서비스 중단 안내
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            서비스 향상을 위한 시스템 점검으로 인하여 아래와 같이 일시적으로 서비스 이용이 중단될 예정입니다.
          </v-expansion-panel-text>
        </v-expansion-panel>
      
      </v-expansion-panels>
      <v-pagination  v-model="Pagination"  :length="4"  rounded="circle"></v-pagination>
    </v-col>
  </v-row> -->

</template>
