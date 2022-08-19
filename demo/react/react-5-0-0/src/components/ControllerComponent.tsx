import { modalController } from "@ionic/core";
import { IonButton } from "@ionic/react";

interface ContainerProps {}

const ControllerComponent: React.FC<ContainerProps> = () => {
  const openModal = async () => {
    const modal = await modalController.create({
      component: "my-modal",
      componentProps: { value: 123 },
    });
    await modal.present();
  };
  return (
    <div className="container">
      <strong>Ready to create an app?</strong>
      <p>
        Start with Ionic{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
      <IonButton onClick={openModal}>Open</IonButton>
    </div>
  );
};

export default ControllerComponent;
