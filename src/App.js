import React from 'react';
import './App.css';
import Logo from './logo.png';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Home from './components/Home.js';
import Article from './components/Article.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "",
			articles: [],
			refreshArticles: false
		}
	}

	componentDidMount = () => {
		if(this.state.articles.length === 0 || this.state.refreshArticles) {
			this.getArticles();
		}
	}

	componentDidUpdate = () => {
		if(this.state.articles.length == 0)
			this.getArticles();
	}

	getArticles = () => {
		let url = 'https://wt-bc10bd70eac1ba2e1f09bbd50514e6a3-0.sandbox.auth0-extend.com/newlyread'; 
		if(this.state.category != "") {
			url += `?category=${this.state.category}`
		}
		fetch(url)
		.then(res => res.json())
		.then(json => {
			this.setState({articles: json.articles});
		});
	}

	setCategory = (c) => {
		this.setState({articles: [], category: c || ""});
	}

	render() {
		return (
			<Router>
			  <div className="App">
				<header>
					<img className="App-logo" src={Logo} alt="loading logo"/> <h1>ewlyread</h1>
					<nav>
						<a href="/">All</a>
						<Link to={ {pathname: "/", search: `?category=technology` } }>
							Technology
						</Link>
					</nav>
				</header>
				<Route exact path="/" component={(props) => <Home articles={this.state.articles}/>} />
				<Route path="/article" component={Article} />
			  </div>
			</Router>
		)
	}
}


export default App;
