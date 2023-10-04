<template>
  <BaseBreadcrumb :title="page.title" :image="page.image"></BaseBreadcrumb>

  <v-row>
    <v-col cols="12" sm="12" class="pa-0">            
      <v-tabs v-model="tab" fixed-tabs color="primary">
        <v-tab value="one" class="font-weight-bold text-18">회사 소개</v-tab>
        <v-tab value="two" class="font-weight-bold text-18">록톤컴퍼니즈코리아</v-tab>
        <v-tab value="three" class="font-weight-bold text-18">Contact Us</v-tab>
      </v-tabs>
    </v-col>
  </v-row>

  <v-window v-model="tab">
    <v-window-item value="one" class="text-center">
      <v-img src="../assets/images/img-introduce-1.jpg" alt="" >
      <v-row class="my-16">
        <v-col cols="12" sm="7"> </v-col>
        <v-col cols="12" sm="5" class="bg-white px-9 py-10 text-left">
            <h3 class="text-30 text-primary font-weight-medium word-break-keep-all">록톤 그룹과 함께 하시겠습니까?</h3>
            <p class="mt-10 line-height-1-6 word-break-keep-all">
              글로벌 기업으로서 전세계적으로 125개국, 9,500명의 직원이 65,000개 이상의 기업을 위해 일하고 있습니다. <br/>
              그래서 우리의 초점은 고객과 직원입니다. <br/>
              우리는 고객에게 이익이 되고 서비스 제공을 개선하는 장기적인 결정을 내리고자 항상 노력합니다. 고객을 위한 맞춤형 솔루션을 제공하여 현재까지도 계약 유지율 97%를 유지하고 있습니다. 혁신적인 아이디어와 서비스 중심의 사고를 지향합니다.
            </p>
        </v-col>
      </v-row>
      </v-img>
      <div class="bg-black color-white">
        <v-row class="py-16" justify="center">
          <v-col cols="12" class="px-0 py-10">
            <h3 class="font-family-serif text-h4">Lockton is the world's largest independent insurance brokerage</h3>
          </v-col>
          <v-col cols="12" sm="4" class="px-0 py-10 d-flex flex-column align-center">
            <p class="text-h1 font-family-serif">100<sup class="text-h3 ml-4">+</sup></p>
            <hr class="color-hypen mt-6 mb-8"/>
            <p class="text-18">Offices worldwide</p>
          </v-col>
          <v-col cols="12" sm="4" class="px-0 py-10 d-flex flex-column align-center">
            <p class="text-h1 font-family-serif">9,500<sup class="text-h3 ml-4">+</sup></p>
            <hr class="color-hypen mt-6 mb-8"/>
            <p class="text-18">Associates</p>
          </v-col>
          <v-col cols="12" sm="4" class="px-0 py-10 d-flex flex-column align-center">
            <p class="text-h1 font-family-serif">65,000<sup class="text-h3 ml-4">+</sup></p>
            <hr class="color-hypen mt-6 mb-8"/>
            <p class="text-18">Clients</p>
          </v-col>
          <v-col cols="12" sm="4" class="px-0 py-10 d-flex flex-column align-center">
            <p class="text-h1 font-family-serif">97<sup class="text-h3 ml-4">%</sup></p>
            <hr class="color-hypen mt-6 mb-8"/>
            <p class="text-18">Client retention rate</p>
          </v-col>
          <v-col cols="12" sm="4" class="px-0 py-10 d-flex flex-column align-center">
            <p class="text-h1 font-family-serif">27<sup class="text-h3 ml-4">%</sup></p>
            <hr class="color-hypen mt-6 mb-8"/>
            <p class="text-18">Organic growth FY 2022</p>
          </v-col>
        </v-row>
      </div>
      
    </v-window-item>

    <v-window-item value="two"> 
      <div class="bg-background">
        <v-row class="pt-10">
          <v-col cols="4" class="pa-0 pl-10 text-center mt-4">
            <v-card color="background">
              <v-avatar size="100" color="white" class="border-ligntgray-1">
                <i class="mdi mdi-city text-h2 color-primary"></i>
              </v-avatar> 
            </v-card>
          </v-col>
          <v-col cols="4" class="pa-0 text-center mt-4">
            <v-card color="background">
              <v-avatar size="100"  color="white" class="border-ligntgray-1">
                <i class="mdi mdi-clipboard-check text-h2 color-primary "></i>
              </v-avatar>  
            </v-card>
          </v-col>
          <v-col cols="4" class="pa-0 pr-10 text-center mt-4">
            <v-card color="background">
              <v-avatar size="100"  color="white" class="border-ligntgray-1">
                <i class="mdi mdi-earth text-h2 color-primary"></i>
              </v-avatar>
            </v-card>
          </v-col>        
          <v-col cols="12" sm="12" class="pl-0 pr-0 pt-0 pb-4">
            <v-timeline direction="horizontal" class="mb-10" side="end">
              <v-timeline-item>
                <template v-slot:icon>
                  <v-avatar size="80" color="background" class="text-h5 font-weight-bold">1995</v-avatar>
                </template>
                <v-card color="background">
                  <v-card-text>
                    <p class="text-h6 text-center line-height-1-4">IMI 코리아<br />손해보험중개㈜ 설립</p>
                  </v-card-text>
                </v-card>
              </v-timeline-item>

              <v-timeline-item>
                <template v-slot:icon>
                  <v-avatar size="80" color="background" class="text-h5 font-weight-bold">1997</v-avatar>
                </template>
                <v-card color="background">
                  <v-card-text>
                    <p class="text-h6 text-center line-height-1-4">대한민국 최초<br />보험중개허가 취득</p>
                  </v-card-text>
                </v-card>
              </v-timeline-item>

              <v-timeline-item>
                <template v-slot:icon>
                  <v-avatar size="80" color="background" class="text-h5 font-weight-bold">2010</v-avatar>
                </template>
                <v-card color="background">
                  <v-card-text>
                    <p class="text-h6 text-center line-height-1-4">글로벌 회사인<br />록톤컴퍼니즈가 인수</p>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </div>
      <v-row class="pb-16">
        <v-col cols="12" class="my-10 pt-10 text-center">
          <h3 class="text-h5 font-weight-bold">보험업계 유일의 전문인 보험팀 운영</h3>
          <h4 class="mt-4 text-h6 line-height-1-6 font-weight-medium">전문인배상책임보험에 특화된 <span class="color-primary">전담팀</span>을 구성, <span class="color-primary">국내 최대 전문인보험 실적</span>을 보유하고 있습니다.</h4>
        </v-col>
        <v-col cols="12" class="d-sm-flex align-center justify-center mb-16">
          <div class="card-circle border-blue-1">
            <i class="mdi mdi-chart-bar text-h4"></i>
            <p class="text-h5 font-weight-bold mt-2">STEP 1</p>
            <v-divider color="background" class="my-4 w-50"/>
            <p class="text-body-1">고객 위험 분석</p>
            <p class="text-body-1">보험 요율 협상</p>
            <p class="text-body-1">합리적 프로그램 수립</p>
          </div>
          <div class="card-circle border-blue-2 ml-">
            <i class="mdi mdi-comment-multiple-outline text-h4"></i>
            <p  class="text-h5 font-weight-bold mt-2">STEP 2</p>
            <v-divider color="background" class="my-4 w-50"/>
            <p  class="text-body-1">보험사고(Claim) 협상,<br>정보제공, 중재역할 수행</p>
          </div>
          <div class="card-circle border-blue-3 ml-">
            <i class="mdi mdi-monitor text-h4"></i>
            <p class="text-h5 font-weight-bold mt-2">STEP 3</p>
            <v-divider color="background" class="my-4 w-50"/>
            <p class="text-body-1">보험 계약 전 과정에<br>유지관리 서비스 제공</p>
          </div>
        </v-col>
      </v-row>
    </v-window-item>

    <v-window-item value="three">
      <v-row class="pb-16">
        <v-col cols="12" class="my-10 py-0" align="center">
          <h3 class="text-h5 font-weight-bold">록톤 코리아 전문가</h3>
          <h4 class="font-weight-regular mt-2 color-gray">분야별로 특화된 전문가를 만나보세요</h4>
        </v-col>
        <v-col cols="4">
          <v-card class="position-relative overflow-hidden">
            <v-card-title class="pa-0">
              <v-img src="../assets/images/img-introduce-3.jpg" height="160" cover gradient=""></v-img>
            </v-card-title>
            <v-card-text class="pa-0 v-card-text-hover">
              <div class="pa-6 bg-black">
                <h2 class="">Professional Indemnity</h2>
                <h3 class="font-weight-light mt-2">전문인보험</h3>
              </div>
              <div class="pa-6 pt-4 text-body-1">
                <ul class="list-style-type-check">
                  <li>주요 단체 전문배상책임보험</li>
                  <li>의사 및 병원배상책임보험</li>
                  <li>사이버종합보험</li>
                </ul>              
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="position-relative overflow-hidden">
            <v-card-title class="pa-0">
              <v-img src="../assets/images/img-introduce-4.jpg" height="160" cover gradient=""></v-img>
            </v-card-title>
            <v-card-text class="pa-0 v-card-text-hover">
              <div class="pa-6 bg-black">
                
                <h2>Corporate & Solution</h2>
                <h3 class="font-weight-light mt-2">국내외 Infra Project</h3>
              </div>
              <div class="pa-6 pt-4 text-body-1">
                <ul class="list-style-type-check">
                  <li>건설공사보험</li>
                  <li>완성토목공사물보험</li>
                  <li>기관기계종합보험</li>
                </ul>              
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="position-relative overflow-hidden">
            <v-card-title class="pa-0">
              <v-img src="../assets/images/img-introduce-5.jpg" height="160" cover gradient=""></v-img>
            </v-card-title>
            <v-card-text class="pa-0 v-card-text-hover">
              <div class="pa-6 bg-black">
                <h2 class="">Global</h2>
                <h3 class="font-weight-light mt-2">국내외 소재 다국적 기업 보험</h3>
              </div>
              <div class="pa-6 pt-4 text-body-1">
                <ul class="list-style-type-check">
                  <li>재물보험</li>
                  <li>영업배상책임보험</li>
                  <li>상해보험</li>
                </ul>              
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="position-relative overflow-hidden">
            <v-card-title class="pa-0">
              <v-img src="../assets/images/img-introduce-6.jpg" height="160" cover gradient=""></v-img>
            </v-card-title>
            <v-card-text class="pa-0 v-card-text-hover">
              <div class="pa-6 bg-black">
                <h2 class="">Marine & Aviation</h2>
                <h3 class="font-weight-light mt-2">해상&항공</h3>
              </div>
              <div class="pa-6 pt-4 text-body-1">
                <ul class="list-style-type-check">
                  <li>선박건조보험</li>
                  <li>해상적하보험</li>
                  <li>선주배상책임보험</li>
                </ul>              
              </div>
            </v-card-text>
          </v-card>
        </v-col>        
        <v-col cols="4">
          <v-card class="position-relative overflow-hidden">
            <v-card-title class="pa-0">
              <v-img src="../assets/images/img-introduce-7.jpg" height="160" cover gradient=""></v-img>
            </v-card-title>
            <v-card-text class="pa-0 v-card-text-hover">
              <div class="pa-6 bg-black">
                <h2 class="">Reinsurance</h2>
                <h3 class="font-weight-light mt-2">재보험</h3>
              </div>
              <div class="pa-6 pt-4 text-body-1">
                <ul class="list-style-type-check">
                  <li>국내 및 해외 물건 임의 및 특약<br /> (재물/특종/기술/해상)</li>
                </ul>              
              </div>
            </v-card-text>
          </v-card>
        </v-col>        
        <v-col cols="4">
          <v-card class="position-relative overflow-hidden">
            <v-card-title class="pa-0">
              <v-img src="../assets/images/img-introduce-8.jpg" height="160" cover gradient=""></v-img>
            </v-card-title>
            <v-card-text class="pa-0 v-card-text-hover">
              <div class="pa-6 bg-black">
                <h2 class="">Specialist Sectors</h2>
                <h3 class="font-weight-light mt-2">고객의 니즈에 맞는 맞춤보험서비스</h3>
              </div>
              <div class="pa-6 pt-4 text-body-1">
                <ul class="list-style-type-check">
                  <li>W&I(진술보장보험)</li>
                  <li>Credit(매출채권), BOND(본드)</li>
                  <li>Contingency(행사보험)</li>
                </ul>              
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>

<style lang="scss" scoped>
  
  .v-tabs--density-default, .v-tab.v-tab.v-tab{
    height: 64px;
  }
  .v-timeline--horizontal {
    .v-timeline-divider__after, .v-timeline-divider__before {
      height: 1px;
    }
  }
  .card-circle{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    padding-top:3.9%;
    box-sizing: border-box;
  }
  .card-circle.border-blue-1{
    border:14px solid rgba(0,206,239,0.28)
  }
  .card-circle.border-blue-2{
    border:14px solid rgba(0,174,239,0.28)
  }
  .card-circle.border-blue-3{
    border:14px solid rgba(0,137,239,0.28)
  }
  .card-circle.ml-{
    margin-left: -58px !important;
  }
  .border-ligntgray-1 {
    border: 1px  solid #eee;
  }
</style>

<script setup lang="ts">
  import { ref } from "vue";
  import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";

  const tab = ref(null);

  const page = ref({
    title: "회사소개",
    image: "/assets/images/background/bg-introduce1.jpg",
  });
</script>
