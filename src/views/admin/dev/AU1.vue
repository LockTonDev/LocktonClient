<template>
  <div class="d-flex align-center">
    <span>
        <v-app-bar-nav-icon  @click.stop="authStore.chgDrawer()"> </v-app-bar-nav-icon>
      </span>
    <div class="w-100">
      <AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" ></AdminBaseBreadcrumb>
    </div>
  </div>
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
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
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