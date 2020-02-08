import React, {Component} from "react";
import {authService} from "../../services/auth.service";
import {newsService} from "../../services/news.service";
import {Button, Preloader, Modal} from "../common";
import './Dashboard.scss'
import PostItem from "./PostItem";
import DashboardForm from "../forms/DashboardForm/DashboardForm";

export default class Dashboard extends Component {
    state = {
        currentUserRole: authService.currentUser.role,
        newsList: null,
        title: "",
        description: "",
        isModalOpen: false,
    };

    componentDidMount() {
        this.getNewsList();
    }

    getNewsList = () => {
        newsService.getNewsList().then(newsList => this.setState({newsList}));
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

    createPost = e => {
        e.preventDefault();
        const {title, description} = this.state;
        newsService.createPost(title, description);
        this.setState({
            ...this.state,
            title: "",
            description: ""
        });
        this.toggleModalVisibility();
        this.getNewsList();
    };

    removePost = id => {
        newsService.removePost(id).then(this.getNewsList);
    };

    renderPosts() {
        const {newsList, currentUserRole} = this.state;
        return newsList ? (
            <>
                {newsList.map(item => {
                    return (
                        <PostItem
                            post={item}
                            currentUserRole={currentUserRole}
                            key={item.id}
                            deleteHandler={this.removePost}
                            isDetails
                        />
                    );
                })}
            </>
        ) : (
            <Preloader/>
        );
    }

    renderAddButton() {
        const {currentUserRole} = this.state;
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
            <div style={{height: "10px"}}/>
        );
    }

    render() {
        const {isModalOpen, title, description} = this.state;
        return (
            <div className="dashboard news-container">
                <Modal
                    modalTitle="Create news"
                    isModalOpen={isModalOpen}
                    toggleModalVisibility={this.toggleModalVisibility}
                    maxWidth='650px'
                >
                    <DashboardForm
                        buttonText="Add"
                        handleUserInput={this.handleUserInput}
                        formTitle={title}
                        formDescription={description}
                        handleSubmit={this.createPost}
                        isUploadImg
                    />
                </Modal>
                {this.renderAddButton()}
                <div className="posts">{this.renderPosts()}</div>
            </div>
        );
    }

}
