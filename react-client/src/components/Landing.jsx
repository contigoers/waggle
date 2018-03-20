import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import Test from './Test';

import { updateRandomPic } from '../actions/actionCreators';

class Landing extends Component {
  componentDidMount() {
    this.props.updateRandomPic();
  }

  render() {
    return (
      <div className="body">
        <div className="content">
          <div className="content-divs">
            <Test />
            <img src="http://i.imgur.com/3jf51.jpg" alt="issa dog" />
            {this.props.pic ?
              <div>
                <img src={this.props.pic} alt="Loading..." />
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
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    pic: state.randomDogPic,
  }
);

export default connect(mapStateToProps, { updateRandomPic })(Landing);
