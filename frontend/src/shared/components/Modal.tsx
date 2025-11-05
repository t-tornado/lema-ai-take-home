import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const getModalRoot = () => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) return modalRoot;

  const el = document.createElement('div');
  el.id = 'modal-root';
  document.body.appendChild(el);
  return el;
};

export default function Modal({
  open,
  onClose,
  children,
  style,
  className,
  ...otherRootProps
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const container = getModalRoot();

  const stop = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return createPortal(
    <div
      onClick={onClose}
      aria-hidden="false"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={stop}
        style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '0.75rem',
          minWidth: 320,
          maxWidth: '90vw',
          boxShadow: '0 10px 30px rgba(0,0,0,.2)',
          ...(style ?? {}),
        }}
        className={className}
        {...otherRootProps}
      >
        {children}
      </div>
    </div>,
    container,
  );
}
