import { useEffect } from "react";
import type { ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 28px;
  border-radius: 8px;
  min-width: 327px;
  position: relative;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 23px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

// ✅ 스크롤 잠금 훅
function useScrollLock(enabled: boolean) {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [enabled]);
}

// ✅ props 타입 정의
interface ModalProps {
  isOpen: boolean;
  closeButton?: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, closeButton = false, onClose, children }: ModalProps) {
  useScrollLock(isOpen);

  const preventOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const portalRoot = document.getElementById("modal-root");
  if (!portalRoot) return null; // null check 추가

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={preventOverlayClick}>
        {closeButton && <CloseButton onClick={onClose}>X</CloseButton>}
        {children}
      </ModalWrapper>
    </Overlay>,
    portalRoot
  );
}

export default Modal;
