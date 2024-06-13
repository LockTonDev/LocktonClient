<template>
	<AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" ></AdminBaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <ul class="v-search-box">								
        <li>
          <span>사이트 구분<sup class="text-error ml-1">*</sup></span>
          <v-select v-model="searchParams.data['business_cd']" :items="businessCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
        </li>
        <li class="date">
          <span>보험년도<sup class="text-error ml-1">*</sup></span>
          <v-select v-model="searchParams.data['insr_year']" :items="insrYearCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
        </li>	
        <li>
          <span>약관명<sup class="text-error ml-1">*</sup></span>
          <v-text-field v-model="searchParams.data['user_nm']" type="text" variant="outlined" hide-details="auto" density="compact" single-line class="text-body-2" label="" @keyup.enter="fnSearch()"/>
        </li>							
        <li class="ml-auto">
          <v-btn variant="flat" @click="fnSearch()">조회</v-btn>
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
                <col style="width:80px"/>
                <col style="width:auto"/>
                <col style="width:80px"/>
                <col style="width:100px"/>
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>관리번호</th>
                  <th>버전</th>
                  <th>약관명</th>
                  <th>사용유무</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{번호}</td>
                  <td>{관리번호}</td>
                  <td>{버전}</td>
                  <td>{약관명}</td>
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
      title: "약관",
    });
	const breadcrumbs = ref([
		{
			text: "기타 관리",
			disabled: false,
			href: "/",
		},
		{
			text: "약관",
			disabled: true,
			href: "/",
		},
	]);
</script>