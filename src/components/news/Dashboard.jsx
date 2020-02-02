import React, { Component } from "react";
import { authService } from "../../services/auth.service";
import { newsService } from "../../services/news.service";
import Button from "../common/button/Button";
import { Preloader, Logout } from "../common/index";
import "./Dashboard.scss";
import PostItem from "./PostItem";
import ModalDashboard from "../modals/modalDashboard/ModalDashboard";

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
            <PostItem
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

  render() {
    return (
      <React.Fragment>
        <ModalDashboard
          title="Create news"
          buttonText="Add"
          handleSubmit={this.createPost}
          isModalOpen={this.state.isModalOpen}
          handleModalInput={this.handleModalInput}
          toggleModalVisibility={this.toggleModalVisibility}
          formTitle={this.state.title}
          formDescription={this.state.description}
        />
        <div className="dashboard-container">
          {this.state.currentUser.role === "Admin" ? (
            <div className="add-news-button-wrap">
              <Button
                type="submit"
                buttonColorScheme="primary"
                buttonSize="medium"
                className="add-news-button"
                onClick={this.toggleModalVisibility}
              >
                Add news
              </Button>
            </div>
          ) : (
            <div style={{ height: "10px" }} />
          )}

          <div className="posts">{this.renderPosts()}</div>
        </div>
      </React.Fragment>
    );
  }
}
