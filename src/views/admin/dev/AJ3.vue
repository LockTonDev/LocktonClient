<template>
  <div class="d-flex align-center">
<!--    <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>-->
<!--    <p class="text-h6 color-primary subtitle mr-2">{{ page.title }}</p>-->
    <div class="w-100">
      <AdminBaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></AdminBaseBreadcrumb>
    </div>
  </div>
  <div>
  <v-row>
    <v-col cols="12">
      <ul class="v-search-box v-box">
        <li>
        <span>사이트 구분<sup class="text-error ml-1">*</sup></span>
        <v-select v-model="searchParams.data['business_cd']" :items="businessCdSearchItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
        </li>
        <li class="date">
          <span>증권년도<sup class="text-error ml-1">*</sup></span>
          <v-select v-model="searchParams.data['insr_year']" :items="insrYearCdItems" variant="outlined" hide-details density="compact"  item-text="title"  item-value="value" ></v-select>
        </li>
        <li>
          <span>가입 유형</span>
          <v-select v-model="searchParams.data['user_cd']"  :items="userCdSearchItems" variant="outlined" hide-details density="compact"></v-select>
        </li>
        <li class="ml-auto mr-6">
          <v-btn variant="flat" @click="fnSearch()">조회</v-btn>
        </li>	
      </ul>
      <v-card>
        <v-card-title class="d-flex align-center flex-wrap px-0">
          <h2 class="font-weight-bold"><svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 결과</h2>
          <p class="text-body-2 ml-3 pt-1">전체 <span class="color-primary font-weight-bold">{{ Number(InsuranceList.length).toLocaleString() }}</span> 건</p>
          <v-spacer />
          <div class="ml-auto">
            <v-btn variant="outlined" size="small" class="mx-1" @click="fnAdd();" >등록</v-btn>
            <v-btn variant="outlined" size="small" class="mx-1" @click="fnCopy();" >복사</v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="pa-0 v-result-box">
            <v-table density="compact" fixed-header height="220px">
              <caption class="d-none">조회 결과</caption>
              <colgroup>
                <col style="width:70px;"/>
                <col style="width:40px"/>
                <col style="width:100px"/>
                <col style="width:100px"/>
                <col style="width:100px"/>
                <col style="width:100px"/>
                <col style="width:200px"/>
                <col style="width:150px"/>
                <col style="width:auto"/>
                <col style="width:80px"/>
                <col style="width:40px"/>
              </colgroup>
              <thead>
                <tr>
<!--                  <th><v-checkbox  :model-value="true" hide-details></v-checkbox></th>-->
                  <th>선택</th>
                  <th>번호</th>
                  <th>전문인구분</th>
                  <th>사용자구분</th>
                  <th>증권년도</th>
                  <th>버전</th>
                  <th>보험기간</th>
                  <th>증권번호</th>
                  <th>보험명</th>
                  <th>사용유무</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody v-if="InsuranceList.length" >
                <tr v-for="(row, index) in InsuranceList" :key="index" :class="{ selected: selectedRow === index, 'cursor-pointer': true }">
                  <td><v-checkbox  v-model="row.checked" hide-details></v-checkbox></td>
                  <td >{{ index + 1 }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.business_cd_nm }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.user_cd_nm }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.base_year }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.ver }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.insr_st_dt }} ~ {{ row.insr_cncls_dt }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.insurance_no }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.insurance_nm }}</td>
                  <td @click="fnSearchDtl(index)">{{ row.use_yn }}</td>
                  <td>
                    <div class="d-flex justify-center" @click="fnDel(index)">
                      <vue-feather type="trash" class="feather-sm text-error"></vue-feather>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="12" class="text-center align-middle">조회할 내용이 없습니다.</td>
                </tr>
              </tbody>
            </v-table>
          </div>   
        </v-card-text>
      </v-card> 
    </v-col>
    <v-col cols="12">
      <!-- 계약 상세 조회 시작 -->
      <div class="d-flex align-center mb-3">
        <h2 class="font-weight-bold">
          <svg class="mr-2" width="4" height="14" fill="#00AEEF"><rect width="100%" height="100%"></rect></svg>조회 상세
        </h2>
      </div>
      <v-row v-if="insuranceRateDTO.mode">
        <!--좌측 영역-->
        <v-col cols="11">
          <v-expansion-panels multiple v-model="panel" class="v-panel-admin mb-6">
            <v-row>
              <!--가입정보-->
              <v-col cols="12" class="pb-0" ref="refPage1">
                <v-card>
                  <v-expansion-panel elevation="0" value="panel-1">
                    <v-card-title>
                      <h3 class="font-weight-bold">{{ page.subTitle }} </h3>
                      <v-spacer />
                      <v-expansion-panel-title expand-icon="mdi-arrow-up-drop-circle-outline" collapse-icon="mdi-arrow-down-drop-circle-outline" class="w-auto"></v-expansion-panel-title>
                    </v-card-title>
                    <v-expansion-panel-text>
                      <v-card-text>
                        <!--개인 시작-->
                        <v-row class="v-board-table size-x-small">
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>전문인구분</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col" v-if="insuranceRateDTO.mode=='U'">
                              <VSelectWithValidation v-model="insuranceRateDTO.business_cd" name="business_cd"  placeholder="전문인구분" :items="businessCdItems" single-line density="compact" readonly></VSelectWithValidation>
                            </div>
                            <div class="data-col" v-else>
                              <VSelectWithValidation v-model="insuranceRateDTO.business_cd" name="business_cd"  placeholder="전문인구분" :items="businessCdItems" single-line density="compact"></VSelectWithValidation>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사용자구분</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col" v-if="insuranceRateDTO.mode=='U'">
                              <VSelectWithValidation v-model="insuranceRateDTO.user_cd" name="user_cd"  placeholder="사용자구분" :items="userCdItems" single-line density="compact" readonly></VSelectWithValidation>
                            </div>
                            <div class="data-col" v-else>
                              <VSelectWithValidation v-model="insuranceRateDTO.user_cd" name="user_cd"  placeholder="사용자구분" :items="userCdItems" single-line density="compact"></VSelectWithValidation>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>증권년도</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col" v-if="insuranceRateDTO.mode=='U'">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.base_year" name="base_year" placeholder="증권년도" single-line readonly/>
                            </div>
                            <div class="data-col" v-else>
                              <VTextFieldWithValidation v-model="insuranceRateDTO.base_year" name="base_year" placeholder="증권년도" single-line  />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>버전</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col" v-if="insuranceRateDTO.mode=='U'">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.ver" name="ver" placeholder="버전"  single-line readonly/>
                            </div>
                            <div class="data-col" v-else>
                              <VTextFieldWithValidation v-model="insuranceRateDTO.ver" name="ver" placeholder="버전"  single-line />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>보험시작일</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.insr_st_dt" name="insr_st_dt" placeholder="보험시작일" single-line  />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>보험종료일</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.insr_cncls_dt" name="insr_cncls_dt" placeholder="보험종료일" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>보험일수</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.days" name="days" placeholder="보험일수" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>증권번호</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.insurance_no"  placeholder="증권번호" name="insurance_no" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>보험명</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.insurance_nm" name="insurance_nm" placeholder="보험명" single-line />
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>갱신시작일</p>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.rn_st_dt" name="rn_st_dt" placeholder="갱신시작일"  single-line/>
                            </div>
                          </v-col>

                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>갱신종료일</p>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.rn_en_dt" name="rn_en_dt" placeholder="갱신종료일" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4" class="v-col">
                            <div class="head-col">
                              <p>사용유무(Y/N)</p>
                              <sup class="text-error">*</sup>
                            </div>
                            <div class="data-col">
                              <VTextFieldWithValidation v-model="insuranceRateDTO.use_yn" name="use_yn" placeholder="유저식별번호" single-line />
                            </div>
                          </v-col>
                          <v-col cols="12" sm="12" class="v-col">
                            <div class="head-col">
                              <p>보험료표<sup class="text-error">*</sup></p>
                            </div>
                            <div class="data-col w-full">
                              <v-textarea v-model="insuranceRateDTO.contents" variant="outlined" counter class="mt-2 w-full h-200"  rows="10" no-resize />
                            </div>
                          </v-col>
                        </v-row>
                        <!-- 개인 끝-->
                      </v-card-text>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panels>
        </v-col>
        <!--우측 영역-->
        <v-col cols="1">
          <div class="position-sticky sticky-top v-box">
            <v-btn block size="large" @click="fnSave()">저장</v-btn>
          </div>
          <div class="position-sticky sticky-top v-box">
            <v-btn block size="large" @click="fnChgInsuranceNo()">증권번호 적용</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  </div>

  <MessageBox :messageBoxDTO="messageBoxDTO"></MessageBox>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import AdminBaseBreadcrumb from "@/components/AdminBaseBreadcrumb.vue";
import {MessageBoxDTO, ParamsDTO, CommonCode, InsuranceRateDTO} from '@/model';
import MessageBox from "@/components/MessageBox.vue";
import apiADMIN from "@/api/api/A_ADMIN";
import VSelectWithValidation from "@/components/VSelectWithValidation.vue";
import VTextFieldWithValidation from "@/components/VTextFieldWithValidation.vue";
import {InsuranceYup} from "@/schema";

const selectedRow = ref();
let InsuranceList = ref([]);
const businessCdItems = ref([""]);
const userCdItems = ref([""]);
const businessCdSearchItems = ref([""]);
const userCdSearchItems = ref([""]);
const insrYearCdItems = ref([]);

const searchParams = ref(new ParamsDTO());
const insuranceRateDTO = ref(new InsuranceRateDTO());
const messageBoxDTO = ref(new MessageBoxDTO());

const panel = ref(['panel-1', 'panel-2',  'panel-4', 'panel-5', 'panel-7', 'panel-8', 'panel-9']);

const page = ref({
    title: "증권정보",
    subTitle:"증권정보"
  });
const breadcrumbs = ref([
  {
    text: "기타 관리",
    disabled: false,
    href: "/",
  },
  {
    text: "증권정보",
    disabled: true,
    href: "/",
  },
]);

async function fnAdd() {

  insuranceRateDTO.value = new InsuranceRateDTO();
  insuranceRateDTO.value.mode = 'C';
  insuranceRateDTO.value.index = InsuranceList.value.length;
  page.value.subTitle='증권정보 신규'
}


async function fnCopy() {
  let chkList = ref([]);
  chkList.value = InsuranceList.value.filter(item=> {return item.checked})
  console.log(chkList.value[0])
  if(chkList.value.length==0){
    messageBoxDTO.value.setInfo('확인', '선택된 항목이 없습니다.');
    return;
  }
  if(chkList.value.length > 1 ){
    messageBoxDTO.value.setInfo('확인', '1건만 선택해주세요.');
    return;
  }
  insuranceRateDTO.value = new InsuranceRateDTO();
  Object.assign(insuranceRateDTO.value, chkList.value[0]);
  insuranceRateDTO.value.mode = 'C';
  insuranceRateDTO.value.base_year = '';
  insuranceRateDTO.value.contents = JSON.stringify(insuranceRateDTO.value.contents)
  insuranceRateDTO.value.index = InsuranceList.value.length;
  page.value.subTitle='증권정보 신규'
}


async function fnDel(index: any) {
  let isRun = false;
  insuranceRateDTO.value = new InsuranceRateDTO();
  Object.assign(insuranceRateDTO.value, InsuranceList.value[index]);
  insuranceRateDTO.value.mode='D'
  let msg = insuranceRateDTO.value.base_year +' '+insuranceRateDTO.value.business_cd_nm +' '+
      insuranceRateDTO.value.user_cd_nm

  await messageBoxDTO.value.setConfirm('확인', `[${msg}] 증권정보를 삭제 하시겠습니까?`, null, (result, params) => {
    if (result) {
      isRun = true;
    }
  });

  if (isRun) {
    let resultData = await apiADMIN.setInsuranceInfo([insuranceRateDTO.value]);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '삭제 되었습니다.');
      fnSearch();

    } else {
      messageBoxDTO.value.setWarning('실패', '삭제에 실패하였습니다.');
    }
  }
}

async function fnSearchDtl(index: any) {
  insuranceRateDTO.value = new InsuranceRateDTO();
  if (index!=undefined) {
    selectedRow.value = index
    Object.assign(insuranceRateDTO.value, InsuranceList.value[index]);
    insuranceRateDTO.value.contents = JSON.stringify(insuranceRateDTO.value.contents)
    insuranceRateDTO.value.mode = 'U';
    page.value.subTitle='증권정보 수정'
  }
}


async function checkValidation() {
 // const selectedTab = tab.value;
  const validationSchema = InsuranceYup[`MASTER_AJ3`];

  const isValidate = await validationSchema.validate(insuranceRateDTO.value, { abortEarly: false })
      .then(() => {
        return true;
      })
      .catch(error => {
        // 유효성 검사 실패
        console.log(error.errors)
        console.log(error.inner)
        messageBoxDTO.value.setWarning( '입력확인', error.inner[0].message);
        return false;
      });

      if(insuranceRateDTO.value.mode=='C'){
        let chkDupData = await apiADMIN.chkDupInsuranceInfo(insuranceRateDTO.value);
        if (chkDupData.data.dup) {
          messageBoxDTO.value.setWarning( '중복확인', '이미 존재하는 데이터 입니다.');
          return false;
        }
      }
  return isValidate;
}

async function fnSave() {
  if (!await checkValidation()) return false;
  let isRun = false;

  await messageBoxDTO.value.setConfirm('확인', '저장 하시겠습니까?', null, (result, params) => {
    if (result) {
      isRun = true;
    }
  });

  if (isRun) {
    insuranceRateDTO.value.contents = JSON.parse(insuranceRateDTO.value.contents)
    console.log(insuranceRateDTO.value)
    let resultData = await apiADMIN.setInsuranceInfo([insuranceRateDTO.value]);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', '저장 되었습니다.');
      fnSearch([insuranceRateDTO.value]);
    } else {
      messageBoxDTO.value.setWarning('실패', '저장에 실패하였습니다.');
    }
  }
}

async function fnChgInsuranceNo() {
 // if (!await checkValidation()) return false;
  let isRun = false;

  await messageBoxDTO.value.setConfirm('확인', '해당년도 모든 고객의 정보가 변경됩니다. 적용 하시겠습니까?', null, (result, params) => {
    if (result) {
      isRun = true;
    }
  });

  if (isRun) {
    let resultData = await apiADMIN.setChgInsuranceNoAll(insuranceRateDTO.value);

    if (resultData.success) {
      messageBoxDTO.value.setInfo('확인', `계약 ${resultData.data.chg0030} 건, 갱신${resultData.data.chg0031}  건 적용 되었습니다.`);
      fnSearch()
    } else {
      messageBoxDTO.value.setWarning('실패', '적용에 실패하였습니다.');
    }
  }
}

async function initPage() {
  businessCdItems.value = await CommonCode.getCodeList('COM001');
  userCdItems.value = await CommonCode.getCodeList('TAX002');
  businessCdSearchItems.value =businessCdItems.value
  userCdSearchItems.value=userCdItems.value

  insrYearCdItems.value = [];
  insrYearCdItems.value.unshift({ title: '전체', value: '%' });
  businessCdSearchItems.value.unshift({ title: '전체', value: '%'});
  userCdSearchItems.value.unshift({ title: '전체', value: '%'});

  for (let year = new Date().getFullYear(); year >= 2022; year--) {
    insrYearCdItems.value.push({ title: year.toString(), value: year.toString(), rmk: null });
  }

  searchParams.value.data['business_cd'] = '%';
  searchParams.value.data['insr_year'] = '%';
  searchParams.value.data['user_cd'] = '%';

  fnSearch()
}

async function fnSearch(insuranceRateDTO) {
  const resultData = await apiADMIN.getInsuranceMaster(searchParams.value.data);
  InsuranceList.value = resultData.data;
  InsuranceList.value.map((item,index)=>{
        item.index = index
        item.checked=false
  });
  if(insuranceRateDTO!=undefined){
    //console.log('insuranceRateDTO',insuranceRateDTO[0])
    let filteredList = ref([]);
    filteredList.value = InsuranceList.value.filter(item=> { return item.business_cd == insuranceRateDTO[0].business_cd && item.user_cd == insuranceRateDTO[0].user_cd &&
                                                              item.base_year == insuranceRateDTO[0].base_year && item.ver == insuranceRateDTO[0].ver })

    //console.log('filteredList',filteredList.value[0].index)
    fnSearchDtl(filteredList.value[0].index)
  }

}
/**
 * 페이지 로딩이 완료되면 실행하는 로직
 */
onMounted(async () => {

  // 로딩시 초기 데이터 셋팅
  initPage();

});
</script>