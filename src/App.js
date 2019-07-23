import React from 'react';
import './App.css';
import Logo from './logo.png';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import queryString from 'query-string';
import Parser from 'html-react-parser';
import LazyLoad from 'react-lazyload';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			refreshArticles: false
		}
	}

	componentDidMount = () => {
		if(this.state.articles.length === 0 || this.state.refreshArticles) {
			this.getArticles();
		}
	}

	getArticles = () => {
		fetch('https://wt-bc10bd70eac1ba2e1f09bbd50514e6a3-0.sandbox.auth0-extend.com/newlyread')
		.then(res => res.json())
		.then(json => {
			console.log("Getting Articles");
			this.setState({articles: json.articles});
		});
	}


	render() {
		return (
			<Router>
			  <div className="App">
				<header>
					<img className="App-logo" src={Logo} alt="loading logo"/> <h1>ewlyread</h1>
				</header>
				<Route exact path="/" component={(props) => <Home articles={this.state.articles}/>} />
				<Route path="/article" component={Article} />
			  </div>
			</Router>
		)
	}
}


class Home extends React.Component {
	render() {
		return (
			<div className="container">
				{this.props.articles.map((article, i) => {
					return (
						<Link className="card" key={i} to={ { pathname: "/article", search: `?id=${article.id}&title=${article.title}` } }>
							<LazyLoad once height={200} offset={200}>
								<img src={article.urlToImage} alt="unloaded no alt available"/>
							</LazyLoad>
							<p>{article.title}</p>
						</Link>
					)
				})}
			</div>
		)
	}
}


var listicles = [];

class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "<center>Loading article, this may take some time...</center>",
			content: "",
			image: ""
		}
	}
	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		fetch('https://wt-bc10bd70eac1ba2e1f09bbd50514e6a3-0.sandbox.auth0-extend.com/newlyread?id=' + values.id)
		.then(res => res.json())
		.then(json => {
			console.log(json.article);
			this.setState({title: json.article.title, content: json.article.content, image: json.main_image});
		}) 
	}
	render() {
		return ( 
			<div>
				<div className="article_container">
					<h2>{Parser(this.state.title)}</h2>
					{Parser(this.state.content)}
				</div>
			</div>
		)
	}
}

export default App;
