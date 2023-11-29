<template>
	<AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" ></AdminBaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <ul class="v-search-box v-box">								
        <li>
          <span>검색 유형</span>
          <v-select :items="searchtems" variant="outlined" hide-details density="compact"></v-select>
        </li>
        <li>
          <span>검색어</span>
          <v-text-field type="text" variant="outlined" hide-details="auto" density="compact" single-line label="예) 시스템 점검"/>
        </li>							
        <li class="date">
          <span>검색 기간</span>
          <v-text-field type="date" variant="outlined" hide-details="auto" density="compact" single-line label="검색 시작일"/>
          <span class="mx-1">~</span>
          <v-text-field type="date" variant="outlined" hide-details="auto" density="compact" single-line label="검색 종료일"/>
        </li>				
        <li class="ml-auto mr-6">
          <v-btn variant="flat">조회</v-btn>
        </li>	
      </ul>
    </v-col>
    <v-col cols="12">
      <div class="d-flex align-center mb-3">
        <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세</h2>
        <v-spacer />
        <v-btn variant="outlined" class="" @click="layerBoardWrite = true">등록</v-btn>
      </div>
      <v-card class="full v-box">
        <v-card-text>
          <div class="admin-normal-table">
            <v-table density="comfortable">
              <caption class="d-none">공지사항 조회 결과</caption>
              <colgroup>
                <col style="width:100px"/>
                <col style="width:auto"/>
                <col style="width:160px"/>
                <col style="width:160px"/>
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>게시일</th>
                  <th>수정/삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{번호}</td>
                  <td class="text-left">{제목}</td>
                  <td>{년-월-일시}</td>
                  <td>
                    <div class="d-flex justify-center">
                      <vue-feather type="edit" class="feather-sm text-info mr-2"></vue-feather>
                      <vue-feather type="trash" class="feather-sm text-error"></vue-feather>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>   
        </v-card-text>
        <v-card-actions>
          <v-pagination length="4" rounded="circle" class="w-100" size="small"></v-pagination>
        </v-card-actions>
      </v-card> 
    </v-col>
  </v-row>

  <!--LAYER : 등록 -->
  <v-dialog persistent v-model="layerBoardWrite" width="1000" scrollable>
  <v-card class="position-relative">
    <v-card-title class="d-flex justify-space-between pr-6">
      <h3 class="text-h6 font-weight-bold">공지사항 등록</h3>
    </v-card-title>
    <v-divider class="ma-0"/>
    <v-card-text class="pa-6">
      <div class="admin-normal-table register">
        <v-table>
          <colgroup>
            <col style="width:120px"/>
            <col style="width:auto"/>
          </colgroup>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <v-text-field type="text" variant="outlined" hide-details="auto" density="compact" single-line label=""/>
              </td>
            </tr>
            <tr>
              <th>등록</th>
              <td>
                <v-textarea variant="outlined" counter class="w-100" rows="10" no-resize></v-textarea>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card-text>
    <v-divider class="ma-0"/>
    <v-card-actions class="d-flex justify-center pt-4 pb-6">
      <v-btn variant="outlined" color="dark" @click="layerBoardWrite = false" class="mx-2">닫기</v-btn>
      <v-btn variant="flat" color="dark" @click="layerBoardWrite = false" class="mx-2">저장</v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "@/components/BaseCard.vue";
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";

const searchtems = ref(["제목", "게시일", "번호"]);
const layerBoardWrite = ref(false);
	const page = ref({
      title: "자주하는 질문",
    });
	const breadcrumbs = ref([
		{
			text: "알림마당 관리",
			disabled: false,
			href: "/",
		},
		{
			text: "자주하는 질문",
			disabled: true,
			href: "/",
		},
	]);
</script>