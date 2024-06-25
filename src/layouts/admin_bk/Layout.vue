<script setup lang="ts">
  import { RouterView } from "vue-router";
  import Header from "./Header.vue";
  import Sidebar from "./Sidebar.vue";
  import Footer from "./Footer.vue";
  </script>
  
  <template>
    <v-app>
  
      <v-main class="admin-wrapper">
        
        <!-- 상단영역 ( 로고 )-->
<!--        <Header />-->

        <!-- 메뉴영역  -->
        <Sidebar />
  
        <!-- 컨텐츠 영역 -->
        <v-container class="admin-container-wrapper">

          <div class="maxWidth">
            <RouterView />
          </div>
  
        </v-container>

        <!-- 하단영역 -->
        <Footer />
        
    
      </v-main>
    </v-app>
  </template>
  