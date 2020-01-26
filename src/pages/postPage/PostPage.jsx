import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
export default function PostPage() {
    let { id } = useParams();
    return <div>
        <div>Post page!</div>
        <h3>ID: {id}</h3>
    </div>;
}
