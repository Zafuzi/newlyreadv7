import React from 'react';
import './App.css';
import Logo from './logo.png';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Home from './components/Home.js';
import Article from './components/Article.js';

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


export default App;
