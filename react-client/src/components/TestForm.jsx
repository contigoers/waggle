/* eslint react/jsx-closing-tag-location: 1 */
import React from 'react';
// import Select, { Form, Input, Checkbox, InputNumber, TextArea } from 'antd'; // Upload
import { Form, Row, Input, Select, Checkbox, InputNumber, Button } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // formData: {},
    };
    // this.handleSubmit = this.handleSubmit.bind(this),
    // this.onChange = this.onChange.bind(this)
  }


  onChange(e) {
    this.setState({});
    console.log('change', e);
  }

  onSubmit(e) {
    e.preventDefault();
//    this.setState({});
    console.log('submitting');
  }

  handleSubmit(e) { // call validatefields/getvalues somewhere?
    // this.setState({});
    console.log('submit', e);
  }

  // handleBlur(e) {
  // validate on un click
  // }

  // compareToFirstPassword(password) {
  //   this.setState({});
  //   console.log(password, 'comparing to first password');
  // }

  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: 50 }}>
        <Form layout="inline" onSubmit={this.onSubmit}>

          <Row>

            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please provide name',
                  },
                ],
              })(<Input style={{ width: 300 }} />)}

            </Form.Item>

          </Row>

          <Row>

            <Form.Item label="Breed">
              {getFieldDecorator('breed', {
                  rules: [{
                    required: true,
                    message: 'Please choose a breed',
                  },
                ],
              })(<Select
                showSearch
                style={{ width: 300 }}
                onChange={this.onChange}
              >
                <Option value="null"> Unknown </Option>
                <Option value="pug"> Pug </Option>
                <Option value="beagle"> Beagle </Option>
                <Option value="chihuahua"> Chihuahua </Option>
                <Option value="greatdane"> Great Dane </Option>
                <Option value="dachshund"> Daschshund </Option>
                <Option value="shihtzu"> Shih Tzu </Option>
                <Option value="pitbill"> Pit Bull </Option>
                <Option value="greyhound"> Greyhound </Option>
              </Select>)}

            </Form.Item>

            <Form.Item label="Mix?">
              {getFieldDecorator('mix', {
                valuePropName: 'mixChecked',
              })(<Checkbox />)}

            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Good">
              {getFieldDecorator('isMale', {
                  rules: [{
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

            <Form.Item label="Fixed?">
              {getFieldDecorator('isFixed', {
                  rules: [{
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
              })(<Select style={{ width: 150 }}>
                <Option value="true"> Yes </Option>
                <Option value="false"> No </Option>
                <Option value="null"> Unknown </Option>
              </Select>)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Life stage">
              {getFieldDecorator('lifestage', {
                  rules: [{
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
              })(<Select style={{ width: 300 }}>
                <Option value="puppy"> Puppy </Option>
                <Option value="adolescent"> Adolescent </Option>
                <Option value="adult"> Adult </Option>
                <Option value="senior"> Senior </Option>
                <Option value="null"> Unknown </Option>
              </Select>)}
            </Form.Item>

            <Form.Item label="Age">
              {getFieldDecorator('age', {
                })(<InputNumber min={0} max={99} />)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Size">
              {getFieldDecorator('size', {
                  rules: [{
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
              })(<Select style={{ width: 300 }}>
                <Option value="tiny"> Tiny </Option>
                <Option value="small"> Small </Option>
                <Option value="medium"> Medium </Option>
                <Option value="large"> Large </Option>
                <Option value="huge"> Huge </Option>
                <Option value="null"> Unknown </Option>
              </Select>)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Aggression">
              {getFieldDecorator('aggressive', {
                valuePropName: 'aggressiveChecked',
              })(<Checkbox />)}
            </Form.Item>

            <Form.Item label="Anxiety">
              {getFieldDecorator('anxiety', {
                valuePropName: 'medicalChecked',
              })(<Checkbox />)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Dietary">
              <Checkbox />
            </Form.Item>

            <Form.Item label="Medical">
              <Checkbox />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Photo">
              <Input style={{ width: 500 }} />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Description">
              <TextArea rows={4} style={{ width: 600 }} />
            </Form.Item>
          </Row>
          <Row>
            <Button type="primary" htmlType="submit"> Submit </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

const RealTestForm = Form.create()(TestForm);

export default RealTestForm;
