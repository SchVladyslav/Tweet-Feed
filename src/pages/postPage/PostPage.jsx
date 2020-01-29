import React, { Component } from "react";
import Post from "../../components/dashboard/Post";
import Layout from "../../components/Layout/Layout";
import Post from "../../components/news/Post";

export default class PostPage extends Component {
  render() {
    return (
      <Layout>
        <Post />
      </Layout>
    );
  }
}
