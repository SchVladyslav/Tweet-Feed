import React, { Component } from "react";
import { authService } from "../../services/auth.service";
import { newsService } from "../../services/news.service";
import Button from "../common/button/Button";
import { Preloader } from "../common/index";
import "./Dashboard.scss";
import PostItem from "./PostItem";
import Modal from "../common/modal/Modal";
import DashboardForm from "../forms/DashboardForm/DashboardForm";

export default class Dashboard extends Component {
  state = {
    currentUserRole: authService.currentUser.role,
    newsList: null,
    title: "",
    description: "",
    isModalOpen: false
  };

  componentDidMount() {
    this.getNewsList();
  }

  getNewsList = () => {
    newsService.getNewsList().then(newsList => this.setState({ newsList }));
  };

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

  createPost = e => {
    e.preventDefault();
    const { title, description } = this.state;
    newsService.createNews(title, description);
    this.setState({
      ...this.state,
      title: "",
      description: ""
    });
    this.toggleModalVisibility();
    this.getNewsList();
  };

  removeNews = id => {
    newsService.removeNews(id).then(this.getNewsList);
  };

  renderPosts() {
    return this.state.newsList ? (
      <div>
        {this.state.newsList.map(item => {
          return (
            <Post
              post={item}
              currentUserRole={this.state.currentUser.role}
              key={item.id}
              deleteHandler={this.removeNews}
              isDetails={true}
            />
          );
        })}
      </div>
    ) : (
      <Preloader />
    );
  }

  renderPosts() {
    const { newsList, currentUserRole } = this.state;
    return newsList ? (
      <>
        {newsList.map(item => {
          return (
            <PostItem
              post={item}
              currentUserRole={currentUserRole}
              key={item.id}
              deleteHandler={this.removeNews}
              isDetails={true}
            />
          );
        })}
      </>
    ) : (
      <Preloader />
    );
  }

  renderAddButton() {
    const { currentUserRole } = this.state;
    return currentUserRole === "Admin" ? (
      <div className="dashboard__add-news-button">
        <Button
          type="submit"
          buttonColorScheme="primary"
          buttonSize="medium"
          onClick={this.toggleModalVisibility}
        >
          Add news
        </Button>
      </div>
    ) : (
      <div style={{ height: "10px" }} />
    );
  }

  render() {
    const { isModalOpen, title, description } = this.state;
    return (
      <section className="dashboard news-container">
        <Modal
          modalTitle="Create news"
          isModalOpen={isModalOpen}
          toggleModalVisibility={this.toggleModalVisibility}
        >
          <DashboardForm
            buttonText="Add"
            handleUserInput={this.handleUserInput}
            formTitle={title}
            formDescription={description}
            handleSubmit={this.createPost}
            isUploadImg={true}
          />
        </Modal>
        {this.renderAddButton()}
        <div className="posts">{this.renderPosts()}</div>
      </section>
    );
  }
}
