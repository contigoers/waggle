/* eslint react/jsx-closing-tag-location: 1 */
import React from 'react';
import Select, { Form, Input, Checkbox, InputNumber, TextArea } from 'antd'; // Upload

const { Option } = Select;

class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChange(e) {
    this.setState({});
    console.log('change', e);
  }

  handleSubmit(e) {
    this.setState({});
    console.log('submit', e);
  }

  compareToFirstPassword(password) {
    this.setState({});
    console.log(password, 'comparing to first password');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<Form onSubmit={this.handleSubmit}>
      <Form.Item label="name">
        {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please provide name',
              },
            ],
          })(<Input />)}
      </Form.Item>

      <Form.Item label="Breed">
        {getFieldDecorator('breed', { // drop down
            rules: [{ required: true }],
        })(<Select
          showSearch
          style={{ width: 300 }}
          placeholder="Select primary breed"
          optionFilterProp="children" // what is children???
          onChange={this.onChange} // ?
          filterOption={(input, option) => option.props.children // this should be something else
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="unknown"> Unknown </Option>
          {
            // map over breed list, return option with value for each breed
          }
        </Select>)}
      </Form.Item>

      <Form.Item label="Mix?">
        {getFieldDecorator('mix', {
            valuePropName: 'mixChecked', // boolean?
          })(<Checkbox> Mix: </Checkbox>)}
      </Form.Item>

      <Form.Item label="Good: ">
        {getFieldDecorator('isMale', {
            rules: [
              {
                required: true,
                message: 'Please choose an option',
              },
            ],
          })(<Select style={{ width: 200 }} onChange={this.onChange}>
            <Option value="true"> boy </Option>
            <Option value="false"> girl </Option>
            <Option value="null"> Unknown </Option>
          </Select>)}
      </Form.Item>

      <Form.Item label="Neutered/spayed?">
        {getFieldDecorator('fixed', {
            rules: [
              {
                required: true,
                message: 'Please choose an option',
              },
            ],
          })(<Select
            showSearch
            style={{ width: 300 }}
            placeholder="Size:"
            optionFilterProp="children"
            onChange={this.onChange}
          >
            <Option value="yes"> Yes </Option>
            <Option value="no"> No </Option>
            <Option value="null"> Unknown </Option>
          </Select>)}
      </Form.Item>

      <Form.Item label="Life stage">
        {getFieldDecorator('lifestage', {
            rules: [{
                required: true,
                message: 'Please choose an option',
            }],
        })(<Select
          showSearch
          style={{ width: 300 }}
          placeholder="Life stage:"
        >
          <Option value="puppy"> Puppy </Option>
          <Option value="adolescent"> Adolescent </Option>
          <Option value="adult"> Adult </Option>
          <Option value="senior"> Senior </Option>
        </Select>)}
      </Form.Item>

      <Form.Item label="Age (if known)">
        {getFieldDecorator('age', {})(<InputNumber
          min={0}
          defaultValue={3}
          onChange={this.onChange}
        />)}
      </Form.Item>

      <Form.Item label="Size">
        {getFieldDecorator('size', {
            required: true,
            message: 'Please choose an option',
        })(<Select defaultValue="medium" style={{ width: 200 }}>
          <Option value="tiny"> Tiny </Option>
          <Option value="small"> Small </Option>
          <Option value="medium"> Medium </Option>
          <Option value="large"> Large </Option>
          <Option value="huge"> Huge </Option>
          <Option value="null"> Unknown </Option>
        </Select>)}
      </Form.Item>

      <Form.Item label="Energy level">
        {getFieldDecorator('energy', {})(<Select
          showSearch
          style={{ width: 300 }}
          placeholder="Size:"
          optionFilterProp="children"
          onChange={this.onChange}
          filterOption={(input, option) => option.props.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="low"> Low </Option>
          <Option value="medium"> Medium </Option>
          <Option value="high"> High </Option>
          <Option value="null"> Unknown </Option>
        </Select>)}
      </Form.Item>

      <Form.Item label="Aggression">
        {getFieldDecorator('aggressive', { // should have a 'temperament' section marker somewhere here
            valuePropName: 'aggressiveChecked',
          })(<Checkbox>Aggressive:</Checkbox>)}
      </Form.Item>

      <Form.Item label="Anxiety">
        {getFieldDecorator('anxious', {
            valuePropName: 'anxiousChecked',
          })(<Checkbox> Anxious: </Checkbox>)}
      </Form.Item>

      <Form.Item label="Medical">
        {getFieldDecorator('medical', { // should have a 'special needs' section marker somewhere here
            valuePropName: 'medicalChecked',
          })(<Checkbox> Special medical needs: </Checkbox>)}
      </Form.Item>

      <Form.Item label="Dietary">
        {getFieldDecorator('diet', {
            valuePropName: 'dietChecked',
          })(<Checkbox> Special dietary needs: </Checkbox>)}
      </Form.Item>

      <Form.Item label="Description">
        {getFieldDecorator('description', {})(<TextArea rows={4} />)}
      </Form.Item>

      <Form.Item label="Photo">
        {getFieldDecorator('photo', {
            // input
            // Ant Upload??
            // form elt in parens below here
          })(<Input />)}
      </Form.Item>
    </Form>
    );
  }
}

// name : string
// breed : filter search file (dropdown)
// mix: checkbox
// gender : drop down m/f
// size : drop down (tiny/small/medium/large/huge)
// aggressive : check box
// anxiety : check box
// life stage: drop down (puppy, adolescent, adult, senior)
// age : drop down (puppy/adolescent/adult/senior)
// fixed : drop down boolean
// special diet : check boxes
// medical: check box
// energy level : drop down (low/med/high)
// photo : url for now
// description : text box

// org id taken from organization logged in at the time

export default TestForm;
