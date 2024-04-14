import { ReactNode } from "react";
import {
  CloseButton,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
} from "./styles";
import { MdClose } from "react-icons/md";
import { ContainerIcon } from "../StyledShared";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (isOpen === false) {
    return null;
  }

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ContainerIcon>
            <CloseButton onClick={onClose}>
              <MdClose color={"#CD4B4B"} />
            </CloseButton>
          </ContainerIcon>
        </ModalHeader>

        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
