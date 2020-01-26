import React, { Component } from "react";
import { authService } from "../../services/auth.service";
import { userService } from "../../services/user.service";
import { newsService } from "../../services/news.service";
import Button from "../common/button/Button";
import Preloader from "../common/preloader/Preloader";
import { Logout } from "../common/logout/Logout";
import "./Dashboard.scss";
import ModalDashboard from "../modal/modalDashboard/ModalDashboard";
// import Route from "react-router/modules/Route";
// import PostPage from "../../pages/postPage/PostPage";
// import Link from "react-router-dom/modules/Link";
// import PostPage from "../../pages/postPage/PostPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    const { currentUser } = this.state;
    userService
      .getById(currentUser.id)
      .then(userFromApi => this.setState({ userFromApi }));
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
          <div className="logOut">
            <Logout />
          </div>
        </div>
      </React.Fragment>
    );
    // const { currentUser, userFromApi } = this.state;
    // return (
    //   <div className="dashboard">
    //     <h1>Home</h1>
    //     <p>You're logged in!</p>
    //     <p>
    //       Your role is: <strong>{currentUser.role}</strong>.
    //     </p>
    //     <p>This page can be accessed by all authenticated users.</p>
    //     <div>
    //       Current user from secure api end point:
    //       {userFromApi && (
    //         <ul>
    //           <li>
    //             {userFromApi.firstName} {userFromApi.lastName}
    //           </li>
    //         </ul>
    //       )}
    //     </div>
    //
    //     <div className="logOut">
    //       <h3>
    //         <Logout />
    //       </h3>
    //     </div>
    //   </div>
    // );
  }
}
