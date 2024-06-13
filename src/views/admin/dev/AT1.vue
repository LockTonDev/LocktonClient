<template>
	<div class="pa-4">
		<div class="d-flex align-center mb-3">
			<svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>
			<h1>Daily Status</h1>
			<span class="color-gray text-subtitile-2 ml-auto">전일 기준</span>
		</div>
		<v-row>
			<v-col cols="4">
				<v-card elevation="2">
					<v-card-text class="pa-0">
						<div class="bg-purple-lighten-2 pa-5 d-flex align-center">
							<v-icon size="20">mdi-chart-donut</v-icon> 
							<h2 class="ml-2">관세사</h2>
						</div>
						<div class="px-4 py-7 text-center">
							<v-row>					
								<v-col cols="4" v-for="(item, i) in statsData" :key="i">
									<p class="text-h5" :color="item.color"> {{ item.percent }}</p>
									<p class="color-gray font-weight-light">{{ item.title }}</p>
								</v-col>
							</v-row>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card elevation="2">
					<v-card-text class="pa-0">
						<div class="color-white bg-violet-lighten-1 pa-5 d-flex align-center">
							<v-icon size="20">mdi-chart-donut</v-icon> 
							<h2 class="ml-2">세무사</h2>
						</div>
						<div class="px-4 py-7 text-center">
							<v-row>
								<v-col cols="4" v-for="(item, i) in statsData" :key="i">
									<p class="text-h5" :color="item.color"> {{ item.percent }}</p>
									<p class="color-gray font-weight-light">{{ item.title }}</p>
								</v-col>
							</v-row>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card elevation="2">
					<v-card-text class="pa-0">
						<div class="bg-blue-darken-1 pa-5 d-flex align-center">
							<v-icon size="20">mdi-chart-donut</v-icon> 
							<h2 class="ml-2">회계사</h2>
						</div>
						<div class="px-4 py-7 text-center">
							<v-row>
								<v-col cols="4" v-for="(item, i) in statsData" :key="i">
									<p class="text-h5" :color="item.color"> {{ item.percent }}</p>
									<p class="color-gray font-weight-light">{{ item.title }}</p>
								</v-col>
							</v-row>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card elevation="2">
					<v-card-text class="pa-0">
						<div class="bg-primary pa-5 d-flex align-center">
							<v-icon size="20">mdi-chart-donut</v-icon> 
							<h2 class="ml-2">변호사</h2>
						</div>
						<div class="px-4 py-7 text-center">
							<v-row>
								<v-col cols="4" v-for="(item, i) in statsData" :key="i">
									<p class="text-h5" :color="item.color"> {{ item.percent }}</p>
									<p class="color-gray font-weight-light">{{ item.title }}</p>
								</v-col>
							</v-row>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card elevation="2">
					<v-card-text class="pa-0">
						<div class="bg-cyan-darken-1 pa-5 d-flex align-center">
							<v-icon size="20">mdi-chart-donut</v-icon> 
							<h2 class="ml-2">변리사</h2>
						</div>
						<div class="px-4 py-7 text-center">
							<v-row>
								<v-col cols="4" v-for="(item, i) in statsData" :key="i">
									<p class="text-h5" :color="item.color"> {{ item.percent }}</p>
									<p class="color-gray font-weight-light">{{ item.title }}</p>
								</v-col>
							</v-row>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card elevation="2">
					<v-card-text class="pa-0">
						<div class="bg-green-lighten-1 pa-5 d-flex align-center">
							<v-icon size="20">mdi-chart-donut</v-icon> 
							<h2 class="ml-2">법무사</h2>
						</div>
						<div class="px-4 py-7 text-center">
							<v-row>
								<v-col cols="4" v-for="(item, i) in statsData" :key="i">
									<p class="text-h5" :color="item.color"> {{ item.percent }}</p>
									<p class="color-gray font-weight-light">{{ item.title }}</p>
								</v-col>
							</v-row>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
  
  
  <script setup lang="ts">
  import { ref } from "vue";
	const statsData = ref([
		{
			color: "primary",
			title: "신청",
			percent: 325,
		},
		{
			color: "blue",
			title: "변경요청",
			percent: 76,
		},
		{
			color: "green",
			title: "처리",
			percent: 288,
		},
		{
			color: "amber",
			title: "미처리",
			percent: 23,
		},
		{
			color: "red",
			title: "미입금",
			percent: 11,
		},
	
	]);
  </script>
  