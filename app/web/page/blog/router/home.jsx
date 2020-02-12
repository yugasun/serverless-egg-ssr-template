import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'
import request from 'framework/request';
import './home.css'

import { ARTICLE_LIST } from '../store/constant';
import { update } from '../store/actions';

class Home extends Component {
  async componentWillMount() {
    const { updateState } = this.props; 
    const data = await request.get('/api/blog/list');
    updateState(ARTICLE_LIST, data)
  }

  render() {
    const { list = [] } = this.props;
    return <div className="easy-article-list">
      <ul>
        {list.map(function (item) {
          return <li key={item.id} className="easy-article-item">
            <h2 className="easy-article-title"><Link to={'/detail/' + item.id}>{item.title}</Link></h2>
            <div className="easy-article-summary">{item.summary}</div>
            <div className="easy-article-meta">
              <span>11Word Count:{item.wordCount}  </span>
              <span>Create Time: {item.createTime}</span>
            </div>
          </li>;
        })}
      </ul>
    </div>;
  }
}


const mapStateToProps = state => {
  return {
    list: state.list
  };
};


const mapDispatchToProps = dispatch => {
  return {
    updateState: (type, data) => dispatch(update(type, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EASY_ENV_IS_DEV ? hot(Home) : Home);
