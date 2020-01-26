import React from 'react';
import Button from "../common/button/Button";
import {Link, Route} from "react-router-dom";

const Post = ({post, currentUserRole, deleteHandler}) => {
    return (
            <div className="post">
                <h3 className="post__title">{post.title}</h3>
                <p className="post__description">{post.description}</p>
                {currentUserRole === 'Admin' ? (<div className="post__control-buttons">
                    <Button type='submit' buttonColorScheme='transparent'
                            buttonSize='small' onClick={() => deleteHandler(post.id)}>Delete</Button>
                </div>) : null}
                <Route>
                    <Link to={`/post/${post.id}`}><Button type='submit' buttonColorScheme='transparent'
                                                          buttonSize='small' className='post__link'>details</Button></Link>
                </Route>
            </div>
    );
};

export default Post;
