// components/ConfirmationPortal.tsx
import {FC} from 'react';
import ReactDOM from 'react-dom';
import Button from '@/ui/Button.tsx';

interface ConfirmationPortalProps {
  message: string;
  onClose: () => void;
}

const ConfirmationPortal: FC<ConfirmationPortalProps> = ({ message, onClose }) => {
  const modalRoot = document.getElementById('modal');

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center rounded bg-background-default bg-opacity-50">
      <div className="bg-screen-default p-6 rounded shadow-md">
        <h2 className="heading-2 mb-4">Confirmation</h2>
        <p className="mb-4">{message}</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>,
    modalRoot
  );
};

export default ConfirmationPortal;
