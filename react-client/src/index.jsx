import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pic: '',
    };
  }

  componentDidMount() {
    this.getRandomPic();
  }

  getRandomPic() {
    axios.get('/picture')
      .then((response) => {
        console.log(response);
        this.setState({
          pic: response.data,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items} />
      <img src="http://i.imgur.com/3jf51.jpg" />
      <img src={this.state.pic} />
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
