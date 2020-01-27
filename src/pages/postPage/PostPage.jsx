import React, {Component} from "react";
import Post from "../../components/dashboard/Post";
import {authService} from "../../services/auth.service";
import {newsService} from "../../services/news.service";
import Layout from "../../components/Layout/Layout";
import Preloader from "../../components/common/preloader/Preloader";

export default class PostPage extends Component {
    state = {
        currentUser: authService.currentUser,
        post: null,
    };

    componentDidMount() {

        this.getPost(this.getPostId());
    }

    getPostId() {
        const url = document.location.href;
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
    }

    getPost(id) {
        newsService.getPostById(id)
            .then(postItem => {
                this.setState({post: postItem})
            });
    }

    render() {

        const {post, currentUser} = this.state;
        return <Layout>
            <div className='dashboard-container'>
                {post ? (<Post post={post}
                               currentUserRole={currentUser.role}
                               key={post.id}
                    // deleteHandler={this.removeNews}
                />) : <Preloader/>}
            </div>
        </Layout>;
    }
}
