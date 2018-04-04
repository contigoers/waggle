import React from 'react';
import { Form, Select } from 'antd';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../../actions/searchActions';
import breedList from '../../../../database/breeds';

class BreedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.changesFocusState = this.changesFocusState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changesFocusState() {
    this.setState({
      focused: !this.state.focused,
    });
  }

  handleChange(value) {
    this.props.updateSearchQuery(value, 'breed');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const breeds = breedList.map(breed =>
      <Option key={breed}>{breed}</Option>);
    const selectClassNames =
      this.state.focused
        ? 'select-bar focused'
        : 'select-bar';
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('breed', {
          })(<Select
            allowClear
            mode="multiple"
            placeholder="Any Breed"
            className={selectClassNames}
            onFocus={this.changesFocusState}
            onBlur={this.changesFocusState}
            onChange={this.handleChange}
          >
            {breeds}
          </Select>)/* eslint-disable-line */}
        </Form.Item>
      </Form>
    );
  }
}
const Breed = Form.create()(BreedForm);

const mapDispatchToProps = {
  updateSearchQuery,
};

export default connect(null, mapDispatchToProps)(Breed);
