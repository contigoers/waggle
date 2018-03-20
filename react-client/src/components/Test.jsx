import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import { sendMessage } from '../actions/actionCreators';

class Test extends React.Component {
  handleButtonPress() {
    this.props.sendMessage(this.props.message);
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => { this.handleButtonPress(); }}
          size="large"
        >
          {this.props.message}
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.contents;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
