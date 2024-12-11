import { useModal } from '../../hooks/useModal';

export function Modal() {
  const { isOpen, content, title } = useModal();

  if (!isOpen) return null;
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <header>
                <h2 className="text-center font-bold mb-4">{title}</h2>
              </header>
              <main>{content}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
