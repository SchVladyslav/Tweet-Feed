import Button from "../common/button/Button";
import {Link, Route} from "react-router-dom";
import React, {Component} from 'react';

class PostItem extends Component {

    renderControlButtons() {
        const {currentUserRole, deleteHandler, post, editHandler} = this.props;
        return (
            <div>
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
            </div>

        )
    }

    renderDetailsButton(){
        const {isDetails, post} = this.props;
        return isDetails ? ( <Route>
            <Link to={`/post/${post.id}`}><Button type='submit' buttonColorScheme='transparent'
                                                  buttonSize='small'
                                                  className='post__link'>details</Button></Link>
        </Route>): null;
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

export default PostItem;
