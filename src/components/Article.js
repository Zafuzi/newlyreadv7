import React from 'react';
import queryString from 'query-string';
import Parser from 'html-react-parser';


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

export default Article;
