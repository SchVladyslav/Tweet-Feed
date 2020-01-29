import React from 'react';
import './Modal.scss'

const Modal = ({modalTitle, isModalOpen, toggleModalVisibility, children}) => {
    return (
        <>
            {isModalOpen ? (<div className="common-modal">
                <div className="common-modal__cover"/>
                <div className="common-modal__content position-center">
                    <button className="common-modal__button-close" type="button" onClick={toggleModalVisibility}>X
                    </button>
                    <h2 className="common-modal__title">{modalTitle}</h2>
                    {children}
                </div>
            </div>) : null}
        </>
    );
};

export default Modal;
