import React, {Component} from 'react';
import {authService} from "../../services/auth.service";
import {newsService} from "../../services/news.service";
import PostItem from "./PostItem";
import Preloader from "../common/preloader/Preloader";
import Modal from "../common/modal/Modal";
import DashboardForm from "../forms/DashboardForm/DashboardForm";

class Post extends Component {
    state = {
        currentUserRole: authService.currentUser.role,
        id: null,
        post: null,
        title: '',
        description: '',
        isModalOpen: false
    };

    componentDidMount() {
        this.setState({
            ...this.state,
            id: this.getPostId(),
        }, this.getPost);

    }

    getPostId() {
        const url = document.location.href;
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
    }

    getPost = () => {
        const id = this.state.id;
        newsService.getPostById(id)
            .then(postItem => {
                this.setState({
                    ...this.state,
                    post: postItem,
                    title: postItem.title,
                    description: postItem.description
                })
            });
    };

    toggleModalVisibility = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };

    handleUserInput = e => {
        const {name} = e.target;
        const {value} = e.target;
        this.setState({[name]: value});
    };


    editPost = e => {
        e.preventDefault();
        const {id, title, description} = this.state;
        this.toggleModalVisibility();
        newsService.editPost(id, title, description).then(editedPost => this.setState(
            {
                ...this.state,
                post: editedPost,
            }));
        this.getPost();
    };

    renderPost() {
        const {post, currentUserRole} = this.state;
        return (
            post ? (<PostItem post={post}
                              currentUserRole={currentUserRole}
                              key={post.id}
                              editHandler={this.toggleModalVisibility}
            />) : <Preloader/>
        );
    }

    render() {
        const {isModalOpen, title, description} = this.state;
        return (<React.Fragment>

            <Modal modalTitle="Edit post"
                   isModalOpen={isModalOpen}
                   toggleModalVisibility={this.toggleModalVisibility}

            >
                <DashboardForm
                    buttonText="Save"
                    handleUserInput={this.handleUserInput}
                    formTitle={title}
                    formDescription={description}
                    handleSubmit={this.editPost}
                />
            </Modal>
            <div className='news-container'>
                {this.renderPost()}
            </div>
        </React.Fragment>);
    }
}

export default Post;
