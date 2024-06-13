<template>
	<AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" ></AdminBaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <ul class="v-search-box v-box">								
        <li>
          <span>검색어</span>
          <v-text-field type="text" variant="outlined" hide-details="auto" density="compact" single-line label="예) 검색항목"/>
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
              <caption class="d-none">조회 결과</caption>
              <colgroup>
                <col style="width:80px"/>
                <col style="width:100px"/>
                <col style="width:100px"/>
                <col style="width:auto"/>
                <col style="width:80px"/>
                <col style="width:100px"/>
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>그룹코드</th>
                  <th>상세코드</th>
                  <th>상세코드명</th>
                  <th>사용유무</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{번호}</td>
                  <td>{그룹코드}</td>
                  <td>{상세코드}</td>
                  <td>{상세코드명}</td>
                  <td>{사용유무}</td>
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
    
      </v-card> 
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "@/components/BaseCard.vue";
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import { MessageBoxDTO, ParamsDTO, CommonCode,InsuranceDTO,InsuranceRateDTO,CBRDataDTO} from '@/model';
import MessageBox from "@/components/MessageBox.vue";

const searchParams = ref(new ParamsDTO());
const searchtems = ref(["제목", "게시일", "번호"]);
const layerBoardWrite = ref(false);
	const page = ref({
      title: "공통코드",
    });
	const breadcrumbs = ref([
		{
			text: "기타 관리",
			disabled: false,
			href: "/",
		},
		{
			text: "공통코드",
			disabled: true,
			href: "/",
		},
	]);
</script>