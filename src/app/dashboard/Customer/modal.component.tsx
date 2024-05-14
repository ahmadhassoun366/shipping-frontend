const Modal = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                {children}
                <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
  