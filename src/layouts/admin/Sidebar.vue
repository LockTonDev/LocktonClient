<script setup lang="ts">
  import { ref, watch } from "vue";
  import sidebarItems from "./SidebarItem";
  
  const sidebarMenu = ref(sidebarItems);
  </script>
  
  <template>
    <v-navigation-drawer app color="dark" class="admin-navi-wrap" width="200">
      <!-- ---------------------------------------------- -->
      <!---Navigation -->
      <!-- ---------------------------------------------- -->
      <perfect-scrollbar>
       
        <v-list class="py-0">
          <!-- ---------------------------------------------- -->
          <!---Menu Loop -->
          <!-- ---------------------------------------------- -->
          <template v-for="(item, i) in sidebarMenu">
            <!-- ---------------------------------------------- -->
            <!---Item Sub Header -->
            <!-- ---------------------------------------------- -->
            <v-list-subheader v-if="item.header" class="d-none">{{item.header}}</v-list-subheader>
            <!-- ---------------------------------------------- -->
            <!---If Has Child -->
            <!-- ---------------------------------------------- -->
            <v-list-group v-else-if="item.children">
              <!-- ---------------------------------------------- -->
              <!---Dropdown  -->
              <!-- ---------------------------------------------- -->
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props"  :value="item.title" variant="flat" class="py-4 bg-dark">
                  <!---Icon  -->
                  <span class="d-inline-block mr-4">
                    <vue-feather :type="item.icon" class="feather-sm"></vue-feather>
                  </span>
                  <!---Title  -->
                  <v-list-item-title v-text="item.title" class="mr-auto d-inline-block text-14" ></v-list-item-title>                  
                </v-list-item>
              </template>
              <!-- ---------------------------------------------- -->
              <!---Sub Item-->
              <!-- ---------------------------------------------- -->
              <v-list-item v-for="(subitem, i) in item.children" :key="i" :value="subitem.to" :to="subitem.to" variant="flat" class="py-2 bg-dark">
                <v-list-item-title v-text="subitem.title" class="text-14"></v-list-item-title>
              </v-list-item>
            </v-list-group>
            <!-- ---------------------------------------------- -->
            <!---Single Item-->
            <!-- ---------------------------------------------- -->
            <v-list-item v-else :key="i" :to="item.to" variant="flat" class="-item py-4 bg-dark">
              <span class="d-inline-block mr-4">
                <vue-feather :type="item.icon" class="feather-sm" ></vue-feather>
              </span>
              <v-list-item-title v-text="item.title" class="d-inline-block text-14"></v-list-item-title>
            </v-list-item>
            <!-- ---------------------------------------------- -->
            <!---End Single Item-->
            <!-- ---------------------------------------------- -->
          </template>
        </v-list>
      </perfect-scrollbar>
    </v-navigation-drawer>
  </template>
  