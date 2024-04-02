import React, { useRef } from 'react';

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfigModal: React.FC<Props> = ({ children, isOpen, setIsOpen }) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <dialog id="config-modal" ref={modalRef} className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Configure Your Data Fields</h3>
                    <div className="my-4">
                        {children}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                    <button type="submit">Close</button>
                </form>
            </dialog>
        </>
    );
};

export default ConfigModal;
