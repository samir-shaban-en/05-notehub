import css from './Moda.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}
const Modal = ({ children }: ModalProps) => {
  return createPortal(
    <div className={css.backdrop} role='dialog' aria-modal='true'>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
