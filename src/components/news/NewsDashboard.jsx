import React, {Component} from 'react';
import {api} from "../../fakeApi/fakeApi";

// './../../fakeApi/fakeApi'
// import News from "./News";
import News from "./News";

class NewsDashboard extends Component {
    render() {

        return (
            <div>
                {/*{this.props.news.map((item) => {*/}
                {/*    return <li>{item}</li>*/}
                {/*})}*/}

                {this.props.news.map((item) => {
                    return <li key={item.id}>{item.title}</li>
                })}
                1
            </div>
        );
    }
}

export default NewsDashboard;
