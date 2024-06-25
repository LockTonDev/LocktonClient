  <template>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center px-6 py-4 position-relative">
        <p class="text-h6 font-weight-bold">보험 약관</p>
        <v-spacer />
      </v-card-title>
      <v-divider class="mb-0"/>
      <v-card-text class="pa-0">
        <div>
          <iframe :src=pdfFileName width="100%" height="800px"></iframe>
        </div>
      </v-card-text>
    </v-card>
  </template>



  <script setup lang="ts">
  import { onMounted, defineEmits, ref } from "vue";

  const pdfFileName = ref("");

  const props = defineProps({
    pdf_file_name: String
  });

  onMounted(async () => {
    pdfFileName.value ="/assets/doc/TAX/"+ props.pdf_file_name
  });



  </script>

