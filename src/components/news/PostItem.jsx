import React, {Component} from 'react';
import {Button} from "../common";
import {Link, Route} from "react-router-dom";
import PropTypes from "prop-types"

class PostItem extends Component {

    renderControlButtons() {
        const {currentUserRole, deleteHandler, post, editHandler} = this.props;
        return (
            <>
                {currentUserRole === 'Admin' && deleteHandler ? (
                    <div className="post__control-buttons">
                        <Button type='submit' buttonColorScheme='transparent'
                                buttonSize='small' onClick={() => deleteHandler(post.id)}>Delete</Button>
                    </div>
                ) : null}
                {currentUserRole === 'Admin' && editHandler ? (
                    <div className="post__control-buttons">
                        <Button type='submit' buttonColorScheme='transparent'
                                buttonSize='small' onClick={() => editHandler(post.id)}>Edit</Button>
                    </div>
                ) : null}
            </>

        )
    }

    renderDetailsButton() {
        const {isDetails, post} = this.props;
        return isDetails ? (<div className='post__details'><Route>
            <Link to={`/post/${post.id}`} className='post__details'><Button type='submit'
                                                                            buttonColorScheme='transparent'
                                                                            buttonSize='small'
                                                                            className='post__link'>details</Button></Link>
        </Route></div>) : null;
    }

    render() {
        const {post} = this.props;
        return (
            <div className="post">
                <h3 className="post__title">{post.title}</h3>
                <p className="post__description">{post.description}</p>
                {this.renderControlButtons()}
                {this.renderDetailsButton()}
            </div>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.string,
    currentUserRole: PropTypes.string,
    key: PropTypes.number,
    deleteHandler: PropTypes.func,
    isDetails: PropTypes.bool,
};

export default PostItem;
