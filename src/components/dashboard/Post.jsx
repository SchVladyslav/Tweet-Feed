import Button from "../common/button/Button";
import {Link, Route} from "react-router-dom";

import React, {Component} from 'react';

class Post extends Component {

    renderControlButtons() {
        const currentUserRole = this.props.currentUserRole;
        return (
            {currentUserRole === 'Admin' ? (<div className="post__control-buttons">
                <Button type='submit' buttonColorScheme='transparent'
                        buttonSize='small' onClick={() => deleteHandler(post.id)}>Delete</Button>
            </div>) : null}
    )
    }

    render() {
        const {post, currentUserRole, deleteHandler, editHandler} = this.props;
        return (
            <div className="post">
                <h3 className="post__title">{post.title}</h3>
                <p className="post__description">{post.description}</p>
                {this.renderControlButtons()}
                <Route>
                    <Link to={`/post/${post.id}`}><Button type='submit' buttonColorScheme='transparent'
                                                          buttonSize='small'
                                                          className='post__link'>details</Button></Link>
                </Route>
            </div>
        );
    }
}

export default Post;

// const Post = ({post, currentUserRole, deleteHandler, editHandler}) => {
//
//
//
//     return (
//
//     );
// };
// //кнопка удаления, изменения, деталей
//
//
//
// export default Post;
