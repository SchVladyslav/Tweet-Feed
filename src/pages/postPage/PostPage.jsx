import React, { Component } from "react";
import Post from "../../components/dashboard/Post";
import { authService } from "../../services/auth.service";
import { newsService } from "../../services/news.service";
import Layout from "../../components/Layout/Layout";
import Preloader from "../../components/common/preloader/Preloader";
import ModalDashboard from "../../components/modals/modalDashboard/ModalDashboard";

export default class PostPage extends Component {
  state = {
    currentUser: authService.currentUser,
    post: null,
    title: "",
    description: "",
    isModalOpen: false
  };

  componentDidMount() {
    this.getPost(this.getPostId());
  }

  getPostId() {
    const url = document.location.href;
    const urlParts = url.split("/");
    return parseInt(urlParts[urlParts.length - 1]);
  }

  getPost(id) {
    newsService.getPostById(id).then(postItem => {
      this.setState({
        ...this.state,
        post: postItem,
        title: postItem.title,
        description: postItem.description
      });
    });
  }

  toggleModalVisibility = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleModalInput = e => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  };

  editPost = e => {
    e.preventDefault();
    const { title, description } = this.state;
    const id = this.getPostId();
    this.toggleModalVisibility();
    newsService.editPost(id, title, description).then(editedPost =>
      this.setState({
        ...this.state,
        post: editedPost
      })
    );
    this.getPost(this.getPostId());
  };

  editPost = e => {
    e.preventDefault();
    const { title, description } = this.state;
    const id = this.getPostId();
    this.toggleModalVisibility();
    newsService.editPost(id, title, description).then(editedPost =>
      this.setState({
        ...this.state,
        post: editedPost
      })
    );
    this.getPost(this.getPostId());
  };

  render() {
    const { post, currentUser } = this.state;
    return (
      <Layout>
        <React.Fragment>
          <ModalDashboard
            title="Edit post"
            buttonText="Save"
            handleSubmit={this.editPost}
            isModalOpen={this.state.isModalOpen}
            handleModalInput={this.handleModalInput}
            toggleModalVisibility={this.toggleModalVisibility}
            formTitle={this.state.title}
            formDescription={this.state.description}
          />
          <div className="dashboard-container">
            {post ? (
              <PostItem
                post={post}
                currentUserRole={currentUser.role}
                key={post.id}
                editHandler={this.toggleModalVisibility}
              />
            ) : (
              <Preloader />
            )}
          </div>
        </React.Fragment>
      </Layout>
    );
  }
}
