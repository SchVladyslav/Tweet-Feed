import React, {Component} from 'react';
import Textarea from "../../common/textarea/Textarea";
import Button from "../../common/button/Button";
import './DashboadForm.scss'

class DashboardForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormFieldsValid: {title: null, description: null}
        }
    }


    componentDidMount() {
        document.addEventListener('click', this.toggleVisibility);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.toggleVisibility);
    }

    toggleVisibility = (e) => {
        const modalContent = document.querySelector('.dashboard__content');
        const modalCover = document.querySelector('.dashboard__cover');
        if ((!e.path.includes(modalContent)) && modalCover === e.target) {
            this.props.toggleModalVisibility();
        }
    };

    validateField = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (value.length < 1) {
            this.setState({
                ...this.state,
                isFormFieldsValid: {
                    ...this.state.isFormFieldsValid,
                    [name]: false
                }
            })
        } else {
            this.setState({
                ...this.state,
                isFormFieldsValid: {
                    ...this.state.isFormFieldsValid,
                    [name]: true
                }
            })
        }
    };

    isFormValid(title, description) {
        return Boolean(title && description)
    }

    isTextareaInvalid(value) {
        if (value === null) {
            return false;
        }
        return !Boolean(value);
    }

    render() {
        const {buttonText, handleSubmit, handleModalInput, formTitle, formDescription} = this.props;
        return (
            <form className="dashboard__form" onSubmit={handleSubmit}
                  noValidate="">
                <Textarea className='mb-20 dashboard__textarea' name="title"
                          placeholder='Title'
                          value={formTitle}
                          onBlur={(e) => this.validateField(e)}
                          onChange={(e) => {
                              handleModalInput(e);
                          }}
                          isInvalid={this.isTextareaInvalid(this.state.isFormFieldsValid.title)}
                />
                <Textarea className='mb-20 dashboard__textarea'
                          name="description" rows="5"
                          placeholder='Description'
                          value={formDescription}
                          onBlur={(e) => this.validateField(e)}
                          onChange={(e) => {
                              handleModalInput(e);
                          }}
                          isInvalid={this.isTextareaInvalid(this.state.isFormFieldsValid.description)}
                />
                <Button type='submit' buttonColorScheme='blue' buttonSize='large'
                        disabled={!this.isFormValid(formTitle, formDescription)}>{buttonText}</Button>
            </form>
        );
    }
}

export default DashboardForm;
