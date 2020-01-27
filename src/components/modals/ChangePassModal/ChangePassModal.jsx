import React, {Component} from "react";
import {Button, Input} from '../../common/index';
import './ChangePassModal.scss';

class ChangePassModal extends Component {

    render() {
        let {showModal} = this.props;

        return (
            <>
                { showModal ?
                    <div className="modal__background">
                        <form className="modal">
                            <Input
                                type="password"
                                placeholder="Enter old password"
                            />
                            <Input
                                type="password"
                                placeholder="Enter new password"
                            />
                            <Button
                                type="submit"
                                buttonColorScheme="light"
                            >
                                Change password
                            </Button>
                        </form>
                    </div>
                    : null}
            </>
        );
    }
}

export default ChangePassModal;
