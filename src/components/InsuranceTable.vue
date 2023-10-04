<template>   
<v-card>
    <v-card-text class="pa-0">
        <v-row class="ma-0 mb-5 ">
            <v-col cols="12" sm="12" class="pa-0">
                <div class="d-flex flex-wrap">
                    <h3 class="text-display-2 font-weight-bold">
                        <svg width="8" height="12" fill="none" stroke-width="3" class="mr-2"><line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line><line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line></svg>
                        기본담보
                    </h3>
                    <v-spacer />
                </div>
            </v-col>
        </v-row>

        <div v-for="공동부담 in INSR_DATA.공동부담">
            <v-row class="ma-0 mb-3 mt-5">
                <v-col class="pa-0"><p class="font-weight-medium">공동보험 : {{공동부담.value}}</p></v-col>
            </v-row>
            <!-- <v-row>
                <v-col>보상한도/자기부담금</v-col>
            </v-row> -->
            <v-row class="bg-background border-bottom-lightgray-1 border-top-gray-1 text-center text-13 ma-0" align="center">
                <v-col class="px-0 py-2 line-dash position-relative"><span class="position-absolute left-2 bottom-0">보험한도</span>&nbsp;<span class="position-absolute right-2 top-0">자기부담금</span></v-col>
                <v-col class="px-0 py-2" v-for="보상한도 in INSR_DATA.보상한도">{{보상한도.value}}</v-col>
            </v-row>
          
            <v-row class="border-bottom-lightgray-1 text-center text-13 ma-0" align-content="center" v-for="자기부담금 in INSR_DATA.자기부담금" >
                <v-col class="px-0 py-1">{{자기부담금.value}}</v-col>
                <v-col class="px-0 py-1" v-for="보상한도 in INSR_DATA.보상한도">
                    {{ getInsrTableByAmt(공동부담.code, 보상한도.code, 자기부담금.code).toLocaleString()}}
                </v-col>
            </v-row>
           
        </div>

        <div class="mt-5">
            <v-row class="ma-0 mb-4">
                <v-col cols="12" sm="12" class="pa-0">
                    <div class="d-flex flex-wrap">
                        <h3 class="text-display-2 font-weight-bold">
                            <svg width="8" height="12" fill="none" stroke-width="3" class="mr-2"><line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line><line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line></svg>
                            특약
                        </h3>
                        <v-spacer />
                    </div>
                </v-col>
            </v-row>       
            <v-row class="bg-background border-bottom-lightgray-1 border-top-gray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">보상한도</v-col>
                <v-col class="px-0 py-2">자기부담금</v-col>
                <v-col class="px-0 py-2">보험료</v-col>
            </v-row>
            <v-row v-for="자기부담금 in INSR_SPEC_DATA.자기부담금" class="border-bottom-lightgray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-1">1천만원</v-col>
                <v-col class="px-0 py-1">{{자기부담금.value}}</v-col>
                <v-col class="px-0 py-1" v-for="보상한도 in INSR_SPEC_DATA.보상한도">
                    {{  getInsrSpecTableByAmt(보상한도.code, 자기부담금.code).toLocaleString()}}
                </v-col>
            </v-row>
        </div>
        <div class="mt-5">
            <v-row class="ma-0 mb-4">
                <v-col cols="12" sm="12" class="pa-0">
                    <div class="d-flex flex-wrap">
                        <h3 class="text-display-2 font-weight-bold">
                            <svg width="8" height="12" fill="none" stroke-width="3" class="mr-2"><line x1="7" y1="5" x2="0" y2="12" stroke="#222222"></line><line x1="0" y1="0" x2="8" y2="7" stroke="#00AEEF"></line></svg>
                            무사고 기간에 따른 할인율
                        </h3>
                        <v-spacer />
                    </div>
                </v-col>
            </v-row>
            <v-row class="bg-background border-bottom-lightgray-1 border-top-gray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">가입 년수</v-col>
                <v-col class="px-0 py-2">할인율</v-col>
            </v-row>
            <v-row class="border-bottom-lightgray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">신규 가입</v-col>
                <v-col class="px-0 py-2">기본보험료와 동일(입금일로부터 일할계산)</v-col>
            </v-row>
            <v-row class="border-bottom-lightgray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">1년 이하</v-col>
                <v-col class="px-0 py-2">미적용</v-col>
            </v-row>
            <v-row class="border-bottom-lightgray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">2년 이상 ~ 5년 이하</v-col>
                <v-col class="px-0 py-2">5% 할인</v-col>
            </v-row>
            <v-row class="border-bottom-lightgray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">6년 이상 ~ 10년 이하</v-col>
                <v-col class="px-0 py-2">7% 할인</v-col>
            </v-row>
            <v-row class="border-bottom-lightgray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">11년 이상 ~ 14년 이하</v-col>
                <v-col class="px-0 py-2">10% 할인</v-col>
            </v-row>
            <v-row class="border-bottom-lightgray-1 text-center text-13 ma-0">
                <v-col class="px-0 py-2">15년 이상</v-col>
                <v-col class="px-0 py-2">15% 할인</v-col>
            </v-row>
        </div>

    </v-card-text>
</v-card>
</template>


<script setup lang="ts">
    import { ref, onMounted, computed } from "vue";
    import apiA_TCAA0030A from '@/api/api/A_TCAA0030A';

    let INSR_DATA = ref([]);
    let INSR_SPEC_DATA = ref([]);

    onMounted(async () => {    
        // 보험료 조회
        const params = {insurnace_type: '관세사'};
        const testData = await apiA_TCAA0030A.getDBSelInsuranceRate(params);
        INSR_DATA.value = testData.data[0].contents.관세사_기본담보;
        INSR_SPEC_DATA.value = testData.data[0].contents.관세사_특약;

        // /console.log(testData.data[0].contents);
       
    });

    /**
     * 보험료 가져오기
     * 
     * @param sKey1 공동부담 ID
     * @param sKey2 보상한도 ID
     * @param sKey3 자기부담금 ID
     */
    function getInsrTableByAmt(...args:string) {

        let amt = 0;
        let sKey = "";
        
        for (let key of args) sKey += "|" + key;
        sKey =  sKey.substring(1);
        
        try {
            amt = (INSR_DATA.value.보험료.filter(data => data.key === sKey))[0].amt;
        }catch(err) {
            amt = null;
        }

        return amt;
      
    }


   /**
     * 보험료 가져오기
     */
     function getInsrSpecTableByAmt(...args:string) {

        let amt = 0;

        let sKey = "";

        for (let key of args) sKey += "|" + key;

        sKey =  sKey.substring(1);
        //console.log(sKey);
        try {
            amt = (INSR_SPEC_DATA.value.보험료.filter(data => data.key === sKey))[0].amt;
        }catch(err) {
            amt = null;
        }

        return amt;

    }


</script>