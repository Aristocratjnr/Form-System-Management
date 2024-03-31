


import React from 'react'

type Props = {
    children: React.ReactNode
}

const ConfigModal = ({ children }: Props) => {
    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="config-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Configure Your Data Fields</h3>
                    <div className="my4">
                        {children}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default ConfigModal