import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import List from './components/List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    //     this.setState({
    //       items: data,
    //     });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }

  render() {
    return <div>
        <h1>Item List</h1>
        <List items={this.state.items} />
        <img src="http://i.imgur.com/3jf51.jpg" />
      </div>;
  }
}  

ReactDOM.render(<App />, document.getElementById('app'));
