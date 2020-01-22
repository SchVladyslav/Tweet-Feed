import React, {Component} from 'react';
import NewsDashboard from "./NewsDashboard";



class News  extends Component {
    news = [
        {
            id: '1',
            title: 'How to reuse common layouts in Angular using Router',
            description: 'Most of the web apps I worked on so far, had a design where different pages are using common ' +
                'layout. For example layout which consists of header, footer and sidebar, which are fixed for each page, ' +
                'and the content which varies by the page. Logical idea is to try to extract and reuse common parts. Based ' +
                'on the Angular docs, Pluralsight courses and other materials I found, I came up with two possible options. ' +
                'To better explain those options, let’s first define example project.',
        },
        {
            id: '2',
            title: 'How to reuse common layouts in Angular using Router',
            description: 'Most of the web apps I worked on so far, had a design where different pages are using common ' +
                'layout. For example layout which consists of header, footer and sidebar, which are fixed for each page, ' +
                'and the content which varies by the page. Logical idea is to try to extract and reuse common parts. Based ' +
                'on the Angular docs, Pluralsight courses and other materials I found, I came up with two possible options. ' +
                'To better explain those options, let’s first define example project.',
        },
        {
            id: '3',
            title: 'How to reuse common layouts in Angular using Router',
            description: 'Most of the web apps I worked on so far, had a design where different pages are using common ' +
                'layout. For example layout which consists of header, footer and sidebar, which are fixed for each page, ' +
                'and the content which varies by the page. Logical idea is to try to extract and reuse common parts. Based ' +
                'on the Angular docs, Pluralsight courses and other materials I found, I came up with two possible options. ' +
                'To better explain those options, let’s first define example project.',
        },
    ];
    getArticle() {

    }

    getNews() {
        return this.news;
    }
    render() {
       return <NewsDashboard news={this.getNews()}/>
    }
}

export default News;
