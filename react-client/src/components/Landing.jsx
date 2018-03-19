import React, { Component } from 'react';

import axios from 'axios';
import { Icon } from 'antd';

import List from './List';
import Test from './Test';


class Landing extends Component {
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
        setTimeout(() => {
          this.setState({
            pic: response.data,
          });
        }, 700);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div className="body">
        <div className="content">
          <div className="content-divs">
            {this.state.pic.length ?
              <div>
                <Test />
                <List items={this.state.items} />
                <img src="http://i.imgur.com/3jf51.jpg" alt="issa dog" />
                <img src={this.state.pic} alt="Loading..." />
              </div> :
              <Icon type="loading" className="loader" spin />}
          </div>
          <div className="content-divs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum odio urna,
            id faucibus arcu egestas id. In viverra laoreet purus vitae porttitor. Etiam nisl dui,
            commodo non aliquet in, tincidunt eget massa. Sed dictum dui sit amet sem ultrices
            egestas. Cras quis est cursus, ullamcorper enim eget, facilisis quam. Aliquam semper
            nunc ac consequat ultrices. Ut congue magna enim. Maecenas elit dui, lacinia vitae orci
            in, dapibus finibus orci. Integer aliquam nisi nec urna interdum, et pharetra dolor
            gravida. Proin eu leo pharetra, euismod lorem quis, auctor erat.
          </div>
          <div className="content-divs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum odio urna,
            id faucibus arcu egestas id. In viverra laoreet purus vitae porttitor. Etiam nisl dui,
            commodo non aliquet in, tincidunt eget massa. Sed dictum dui sit amet sem ultrices
            egestas. Cras quis est cursus, ullamcorper enim eget, facilisis quam. Aliquam semper
            nunc ac consequat ultrices. Ut congue magna enim. Maecenas elit dui, lacinia vitae orci
            in, dapibus finibus orci. Integer aliquam nisi nec urna interdum, et pharetra dolor
            gravida. Proin eu leo pharetra, euismod lorem quis, auctor erat.
          </div>
          <div className="content-divs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum odio urna,
            id faucibus arcu egestas id. In viverra laoreet purus vitae porttitor. Etiam nisl dui,
            commodo non aliquet in, tincidunt eget massa. Sed dictum dui sit amet sem ultrices
            egestas. Cras quis est cursus, ullamcorper enim eget, facilisis quam. Aliquam semper
            nunc ac consequat ultrices. Ut congue magna enim. Maecenas elit dui, lacinia vitae orci
            in, dapibus finibus orci. Integer aliquam nisi nec urna interdum, et pharetra dolor
            gravida. Proin eu leo pharetra, euismod lorem quis, auctor erat.
          </div>
        </div>
        <div className="footer">
          Developed and Designed by The Greatest Group There Ever Was
        </div>
      </div>
    );
  }
}

export default Landing;
