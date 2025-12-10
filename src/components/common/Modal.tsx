import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

function Modal({children, isOpen, onClose}: Props) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    const moadalRef = useRef<HTMLDivElement | null>(null);

    const handleClose = () => {
        setIsFadingOut(true);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (moadalRef.current && !moadalRef.current.contains(e.target as Node)) {
            handleClose();
        }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleClose();
        }
    }

    const handleAnimationEnd = () => {
        if (isFadingOut) {
            onClose();
        }
    }

    useEffect(() => {
        if(isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);
    if (!isOpen) {
        return null;
    }
  return createPortal(
    <ModalStyle 
        className={isFadingOut ? "fade-out" : "fade-in"} 
        onClick={handleOverlayClick} 
        onAnimationEnd={handleAnimationEnd}
        >
        <div className="modal-body" ref= {moadalRef}>
            <div className="modal-contents">{children}</div>
            <button className="modal-close" onClick={handleClose}> 
                <FaPlus/>
            </button>
        </div>
    </ModalStyle>,
    document.body
  );
}

const ModalStyle = styled.div`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    &.fade-in {
        animation: fade-in 0.3s ease-in-out forwards;
    }
    &.fade-out {
        animation: fade-out 0.3s ease-in-out forwards;
    }

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.6);
    
    .modal-body{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 56px 32px 32px;
        border-radius: ${({theme})=> theme.borderRadius.default};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

        background-color: #fff;
        max-width: 80%;
    }
    .modal-close {
        border: none;
        background: transparent;
        cursor: pointer;
        
        position: absolute;
        top: 0;
        right: 0;
        padding: 12px;

        svg {
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
        }

        }
`;

export default Modal;
