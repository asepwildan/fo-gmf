// src/components/ui/QRModal.jsx
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const QRModal = ({ 
  isOpen, 
  onClose, 
  title = "QR Code Report",
  qrContent = null, // Placeholder untuk QR code component
  reportData = null // Data untuk report
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="qr-modal" onClose={onClose}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="qr-modal__overlay--enter"
          enterFrom="qr-modal__overlay--enter-from"
          enterTo="qr-modal__overlay--enter-to"
          leave="qr-modal__overlay--leave"
          leaveFrom="qr-modal__overlay--leave-from"
          leaveTo="qr-modal__overlay--leave-to"
        >
          <div className="qr-modal__overlay" aria-hidden="true" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="qr-modal__container">
          <div className="qr-modal__wrapper">
            <Transition.Child
              as={Fragment}
              enter="qr-modal__content--enter"
              enterFrom="qr-modal__content--enter-from"
              enterTo="qr-modal__content--enter-to"
              leave="qr-modal__content--leave"
              leaveFrom="qr-modal__content--leave-from"
              leaveTo="qr-modal__content--leave-to"
            >
              <Dialog.Panel className="qr-modal__panel">
                {/* Header */}
                <div className="qr-modal__header">
                  <Dialog.Title className="qr-modal__title">
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="qr-modal__close"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="qr-modal__body">
                  {/* QR Code Section */}
                  <div className="qr-modal__qr-section">
                    <div className="qr-modal__qr-container">
                      {qrContent ? (
                        qrContent
                      ) : (
                        <div className="qr-modal__qr-placeholder">
                          <div className="qr-placeholder__icon">📱</div>
                          <p>QR Code will appear here</p>
                        </div>
                      )}
                    </div>
                    <p className="qr-modal__qr-description">
                      Scan this QR code to view your report details
                    </p>
                  </div>

                  {/* Report Info Section */}
                  <div className="qr-modal__info-section">
                    <h3 className="qr-modal__info-title">Report Information</h3>
                    <div className="qr-modal__info-grid">
                      <div className="qr-modal__info-item">
                        <span className="qr-modal__info-label">Report ID:</span>
                        <span className="qr-modal__info-value">
                          {reportData?.id || 'GMF-2025-0001'}
                        </span>
                      </div>
                      <div className="qr-modal__info-item">
                        <span className="qr-modal__info-label">Generated:</span>
                        <span className="qr-modal__info-value">
                          {reportData?.timestamp || new Date().toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="qr-modal__info-item">
                        <span className="qr-modal__info-label">Type:</span>
                        <span className="qr-modal__info-value">
                          {reportData?.type || 'Service Report'}
                        </span>
                      </div>
                      <div className="qr-modal__info-item">
                        <span className="qr-modal__info-label">Status:</span>
                        <span className="qr-modal__info-value qr-modal__status--active">
                          {reportData?.status || 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="qr-modal__footer">
                  <button
                    type="button"
                    className="qr-modal__btn qr-modal__btn--secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="qr-modal__btn qr-modal__btn--primary"
                    onClick={() => {
                      // TODO: Implement download/share functionality
                      console.log('Download/Share QR Code');
                    }}
                  >
                    Download QR
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QRModal;