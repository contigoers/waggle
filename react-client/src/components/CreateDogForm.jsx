/* eslint react/jsx-closing-tag-location: 1 */
import React from 'react';
import axios from 'axios';
import { Form, Row, Input, Select, Checkbox, InputNumber, Button } from 'antd';
import breeds from '../../../database/breeds';

const { Option } = Select;
const { TextArea } = Input;

class DogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll({}, (errors, values) => {
      if (errors) {
        return errors;
      }
      const dog = {
        name: values.name,
        breed: values.breed === 'null' ? null : values.breed,
        isMix: Boolean(values.isMix),
        isMale: values.isMale === 'null' ? null : Boolean(values.isMale),
        isAggressive: Boolean(values.isAggressive),
        isAnxious: Boolean(values.hasAnxiety),
        lifestage: values.lifestage === 'null' ? null : values.lifestage,
        age: values.age || null,
        size: values.size === 'null' ? null : values.size,
        isFixed: values.isFixed === 'null' ? null : Boolean(values.isFixed),
        hasDiet: Boolean(values.hasDiet),
        hasMedical: Boolean(values.hasMedical),
        energyLevel: values.energyLevel === 'null' ? null : values.energyLevel,
        photo: values.photo || null,
        description: values.description || null,
        orgId: null,
      };
      axios.post('/createOrgDog', dog)
        .then((response) => {
          alert('Successful addition of dog!');
          return response;
        })
        .catch((error) => {
          console.log('error adding dog', error);
        });
      return dog;
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: 50 }}>
        <Form layout="horizontal" onSubmit={this.onSubmit}>

          <Row>

            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please provide name',
                  },
                ],
              })(<Input onBlur={this.handleBlur} style={{ width: 300 }} />)}

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
                placeholder="Search breeds..."
              >
                <Option value="null"> Unknown </Option>
                {
                breeds.map(breed => (
                  <Option value={breed} key={breed}> {breed} </Option>
                ))
                }
              </Select>)}

            </Form.Item>

            <Form.Item label="Mixed breed?">
              {getFieldDecorator('isMix', {
                valuePropName: 'mixChecked',
              })(<Checkbox />)}

            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Gender">
              {getFieldDecorator('isMale', {
                  rules: [{
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
              })(<Select style={{ width: 200 }} onChange={this.onChange} placeholder="Select">
                <Option value="true"> Good boy </Option>
                <Option value="false"> Good girl </Option>
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
              })(<Select style={{ width: 150 }} placeholder="Select" >
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
              })(<Select style={{ width: 300 }} placeholder="Select">
                <Option value="puppy"> Puppy </Option>
                <Option value="adolescent"> Adolescent </Option>
                <Option value="adult"> Adult </Option>
                <Option value="senior"> Senior </Option>
                <Option value="null"> Unknown </Option>
              </Select>)}
            </Form.Item>

            <Form.Item label="Age (if known)">
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
              })(<Select style={{ width: 300 }} placeholder="Select">
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
            <Form.Item label="Energy Level">
              {getFieldDecorator('energyLevel', {
                rules: [{
                  required: true,
                  message: 'Please choose an option',
                }],
              })(<Select style={{ width: 300 }} placeholder="Select">
                <Option value="low"> Low </Option>
                <Option value="medium"> Medium </Option>
                <Option value="high"> High </Option>
                <Option value="null"> Unknown </Option>
              </Select>)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Aggression">
              {getFieldDecorator('isAggressive', {
                valuePropName: 'aggressiveChecked',
              })(<Checkbox />)}
            </Form.Item>

            <Form.Item label="Anxiety">
              {getFieldDecorator('hasAnxiety', {
                valuePropName: 'medicalChecked',
              })(<Checkbox />)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Dietary">
              {getFieldDecorator('hasDiet', {
                  valuePropName: 'dietChecked',
                })(<Checkbox />)}
            </Form.Item>

            <Form.Item label="Medical">
              {getFieldDecorator('hasMedical', {
                valuePropName: 'medicalChecked',
              })(<Checkbox />)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item label="Photo">
              {getFieldDecorator('photo', {
                })(<Input style={{ width: 500 }} placeholder="Photo URL" />)}
            </Form.Item>
          </Row>

          <Row>
            <Form.Item style={{ marginTop: 10 }} label="Description">
              {getFieldDecorator('description', {})(<TextArea rows={4} style={{ width: 600 }} />)}
            </Form.Item>
          </Row>
          <Row>
            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}> Submit </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

const CreateDogForm = Form.create()(DogForm);

export default CreateDogForm;

// TODO: validate on blur
// TODO: unfuck falsy validation/checkbox stuff in object
// TODO: post request
// TODO: custom validation styling
// TODO: format fields with columns (ughhh)
// TODO: photo upload
// TODO: pull in breeds list
