<template>
	<AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" ></AdminBaseBreadcrumb>
	<v-row>
		<v-col cols="12">
			<UserList @onPageViewParent="onPageViewParent"></UserList>
		</v-col>
		<v-col cols="12">
			<UserView :pageViewData="pageViewData"></UserView>
		</v-col>
	</v-row>


</template>

<script setup lang="ts">
import { ref } from "vue";
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import UserList from "@/views/admin/common/UserList.vue";
import UserView from "@/views/admin/common/UserView.vue";
const isDaumPostDialog= ref(false);
const page = ref({
	title: "통합회원조회",
});
const breadcrumbs = ref([
	{
		text: "회원관리",
		disabled: false,
		href: "/",
	},
	{
		text: "통합회원조회",
		disabled: true,
		href: "/",
	},
]);

const pageViewData = ref(null);

const onPageViewParent = (row) => {
	pageViewData.value = row;
};


</script>