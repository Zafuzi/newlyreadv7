import React from 'react';
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazyload';

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

export default Home;
