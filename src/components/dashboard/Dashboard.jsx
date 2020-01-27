import React, {Component} from "react";
import {authService} from "../../services/auth.service";
import {newsService} from "../../services/news.service";
import {Button, Preloader} from "../common/index";
import "./Dashboard.scss";
import ModalDashboard from "../modals/modalDashboard/ModalDashboard";
import {Route, Link} from "react-router-dom";

export default class Dashboard extends Component {
  state = {
    currentUser: authService.currentUser,
    userFromApi: null,
    newsList: null,
    title: "",
    description: "",
    isModalOpen: false
  };

  componentDidMount() {
    this.getNewsList();
  }

  getNewsList() {
    newsService.getNewsList().then(newsList => this.setState({ newsList }));
  }

  removeNews(id) {
    newsService.removeNews(id).then(newsList => this.setState({ newsList }));
  }

  renderPosts() {
    return this.state.newsList ? (
      <div>
        {this.state.newsList.map(item => {
          return (
            <div className="post" key={item.id}>
              <h3 className="post__title">{item.title}</h3>
              <p className="post__description">{item.description}</p>
              {this.state.currentUser.role === "Admin" ? (
                <div className="post__control-buttons">
                  <Button
                    type="submit"
                    buttonColorScheme="transparent"
                    buttonSize="small"
                    onClick={() => this.removeNews(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              ) : null}
              <Route>
                <Link to={`/post/${item.id}`}>
                  <Button
                    type="submit"
                    buttonColorScheme="transparent"
                    buttonSize="small"
                    className="post__link"
                  >
                    details
                  </Button>
                </Link>
              </Route>
            </div>
          );
        })}
      </div>
    ) : (
      <Preloader />
    );
  }

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
  handleModalInput = e => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  };

  toggleModalVisibility = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

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
