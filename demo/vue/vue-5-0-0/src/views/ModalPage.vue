<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-modal
        :is-open="true"
        @onWillPresent="onWillPresentHandler"
        @onWillDismiss="onDidDismissHandler"
      >
        <ion-content> Hello world </ion-content>
      </ion-modal>

      <ion-popover
        :is-open="true"
        @onWillPresent="onWillPresentHandler"
        @onWillDismiss="onDidDismissHandler"
      >
        <ion-content> Hello world </ion-content>
      </ion-popover>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonPopover,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonModal,
    IonPopover,
  },
  setup() {
    const onWillPresentHandler = () => {
      console.log("Overlay will present");
    };

    const onDidDismissHandler = () => {
      console.log("Overlay did dismiss");
    };

    return {
      onWillPresentHandler,
      onDidDismissHandler,
    };
  },
});
</script>

<style scoped></style>
