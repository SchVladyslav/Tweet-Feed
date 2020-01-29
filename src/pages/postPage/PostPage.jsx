import React, {Component} from "react";
import Layout from "../../components/Layout/Layout";
import Post from "../../components/dashboard/Post";

export default class PostPage extends Component {
    render() {
        return (
            <Layout>
                <Post/>
            </Layout>
        )
    }
}
