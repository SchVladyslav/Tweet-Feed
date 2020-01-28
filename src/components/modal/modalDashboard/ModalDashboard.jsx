import React, {Component} from 'react';
import './ModalDashboard.scss'
import Button from "../../common/button/Button";
import Textarea from "../../common/textarea/Textarea";
import {authService} from "../../../services/auth.service";

class ModalDashboard extends Component {

    constructor(props) {
        super(props);
        this.state={
            isFormFieldsValid: {title: null, description: null}
        }
    }


    componentWillMount() {
        document.addEventListener('click', this.toggleVisibility);
    }
    componentWillUnmount(){
        document.removeEventListener("click", this.toggleVisibility);
    }
    toggleVisibility = (e) =>{
        const modalContent = document.querySelector('.news-modal__content');
        const modalCover = document.querySelector('.news-modal__cover');
        if ((!e.path.includes(modalContent))&&modalCover===e.target) {
            this.props.toggleModalVisibility();
        }
    };

    validateField = e =>{
        console.log('validateField');
        const name = e.target.name;
        console.log(name);
        const value = e.target.value;
        if (value.length < 1){
            this.setState({
                ...this.state,
                isFormFieldsValid:{
                    ...this.state.isFormFieldsValid,
                    [name]: false
                    // e.target
                }
            })
        }
        else {
            this.setState({
                ...this.state,
                isFormFieldsValid:{
                    ...this.state.isFormFieldsValid,
                    [name]: true
                    // e.target
                }
            })
        }
    };

    isFormValid(){
        const {title, description} = this.state.isFormFieldsValid;
        console.log(!Boolean( title && description))
        return Boolean( title && description)
    }

    isFieldInvalid(value){
        if(value === null){
            return false;
        }
        return !Boolean(value);
    }

    render() {
        console.log(this.state.isFormFieldsValid);
        const { title, buttonText, handleSubmit, handleModalInput, isModalOpen, toggleModalVisibility, formTitle, formDescription } = this.props;
        console.log(this.isFormValid());
        return (
            <React.Fragment>
                {isModalOpen ? (<div className="news-modal" >
                    <div className="news-modal__cover"/>
                    <div className="news-modal__content position-center">
                        <button className="news-modal__button-close" type="button" onClick={toggleModalVisibility}>X</button>
                        <h2 className="news-modal__title">{title}</h2>
                        <form className="news-modal__form" onSubmit={handleSubmit}
                              noValidate="">
                            <Textarea className='mb-20 news-modal__textarea' name="title"
                                      placeholder='Title'
                                      value={formTitle}
                                      onBlur={(e) =>  this.validateField(e)}
                                      onChange={(e) => {handleModalInput(e); this.validateField(e)}}
                                      isInvalid ={this.isFieldInvalid(this.state.isFormFieldsValid.title)}
                            />
                            <Textarea className='mb-20 news-modal__textarea'
                                      name="description" rows="5"
                                      placeholder='Description'
                                      value={formDescription}
                                      onBlur={(e) => this.validateField(e) }
                                      onChange={(e) => {handleModalInput(e); this.validateField(e)}}
                                      isInvalid ={this.isFieldInvalid(this.state.isFormFieldsValid.description)}
                            />
                            <Button type='submit' buttonColorScheme='blue' buttonSize='large' disabled={!this.isFormValid()}>{buttonText}</Button>
                        </form>
                    </div>
                </div>) : null}
            </React.Fragment>
        );
    }
}

export default ModalDashboard;
