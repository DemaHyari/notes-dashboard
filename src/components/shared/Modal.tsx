import { Dialog } from "primereact/dialog";

interface Props {
  header: string;
  visible: boolean;
  onHide: (visible: boolean) => void;
  position?: "center" | "center" | "left" | "right";
  closable?: boolean;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const Modal = (props: Props) => {
  const {
    visible,
    header,
    onHide,
    position = "center",
    closable = true,
    width = "40vw",
    height = "auto",
    children,
  } = props;

  return (
    <Dialog
      modal
      header={header}
      visible={visible}
      position={position}
      closable={closable}
      onHide={() => onHide(visible)}
      style={{ width: width, height: height }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
