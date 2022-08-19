<template>
  <ion-page>
    <ion-tabs> <ion-tab-bar slot="bottom"> ... </ion-tab-bar>> </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTabs, IonTabBar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonTabs,
    IonTabBar,
  },
});
</script>

<style scoped></style>
