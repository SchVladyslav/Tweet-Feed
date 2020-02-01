import React from 'react';
import './Modal.scss'

function bodyOverflow(isModalOpen) {
    if (isModalOpen) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
}

const Modal = ({modalTitle, isModalOpen, toggleModalVisibility, children}) => {

    bodyOverflow(isModalOpen);
    return (
        <>
            {isModalOpen ? (<div className="common-modal">
                <div className="common-modal__cover"/>
                <div className="common-modal__dialog">
                    <div className="common-modal__content">
                        <button className="common-modal__button-close" type="button" onClick={toggleModalVisibility}>X
                        </button>
                        <h2 className="common-modal__title">{modalTitle}</h2>
                        {children}
                    </div>
                </div>
            </div>) : null}
        </>
    );
};

export default Modal;
