/* eslint react/jsx-closing-tag-location: 1 */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { Form, Row, Input, Select, Checkbox, InputNumber, Button, Upload, Icon, message } from 'antd';
import breeds from '../../../database/breeds';

const { Option } = Select;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPGorPNG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
  if (!isJPGorPNG) {
    message.error('You can only upload JPG or PNG files!');
  }
  const isLt2M = (file.size / 1024 / 1024).toFixed(2) < 0.75;
  if (!isLt2M) {
    message.error('Image must smaller than 750 KB!');
  }
  return isJPGorPNG && isLt2M;
}

class DogForm extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      // mix, aggression, anxiety, diet, medical
      isMix: false,
      isAggressive: false,
      hasAnxiety: false,
      hasDiet: false,
      hasMedical: false,
      loading: false,
      imageUrl: null,
    };
    this.state = this.defaultState;
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange({ target: { id } }) {
    this.setState({
      [id]: !this.state[id],
    });
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
        photo: this.state.imageUrl || null,
        description: values.description || null,
        orgId: this.props.user.org_id,
      };
      axios.post('/createOrgDog', dog)
        .then((response) => {
          this.props.form.resetFields();
          this.setState(this.defaultState);
          alert('Successfully added dog!');
          return response;
        })
        .catch((error) => {
          alert('Error adding dog', error);
        });
      return dog;
    });
  }

  onChangeImage(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const rowStyle = { marginBottom: 10 };
    const { getFieldDecorator } = this.props.form;
    return (
      <CSSTransitionGroup
        transitionName="fade-appear"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >

        <div style={{ margin: 50 }}>
          <Form layout="inline" onSubmit={this.onSubmit}>

            <Row style={rowStyle}>

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

            <Row style={rowStyle}>
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
                })(<Checkbox checked={this.state.isMix} onChange={this.onCheckChange} />)}

              </Form.Item>
            </Row>

            <Row style={rowStyle}>
              <Form.Item label="Gender">
                {getFieldDecorator('isMale', {
                    rules: [{
                      required: true,
                      message: 'Please choose an option',
                    },
                  ],
                })(<Select style={{ width: 200 }} onChange={this.onChange} onBlur={this.onBlur} placeholder="Select">
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
                  <Option value={1}> Yes </Option>
                  <Option value={0}> No </Option>
                  <Option value="null"> Unknown </Option>
                </Select>)}
              </Form.Item>
            </Row>

            <Row style={rowStyle}>
              <Form.Item label="Life stage">
                {getFieldDecorator('lifestage', {
                    rules: [{
                      required: true,
                      message: 'Please choose an option',
                    },
                  ],
                })(<Select style={{ width: 175 }} placeholder="Select">
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

            <Row style={rowStyle}>
              <Form.Item label="Size">
                {getFieldDecorator('size', {
                    rules: [{
                      required: true,
                      message: 'Please choose an option',
                    },
                  ],
                })(<Select style={{ width: 200 }} placeholder="Select">
                  <Option value="tiny"> Tiny </Option>
                  <Option value="small"> Small </Option>
                  <Option value="medium"> Medium </Option>
                  <Option value="large"> Large </Option>
                  <Option value="huge"> Huge </Option>
                  <Option value="null"> Unknown </Option>
                </Select>)}
              </Form.Item>
            </Row>

            <Row style={rowStyle}>
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
            <div style={{ marginLeft: 10, fontWeight: 700 }}> Temperament: </div>
            <Row style={{ marginLeft: 15, marginBottom: 10 }}>
              <Form.Item label="Aggression">
                {getFieldDecorator('isAggressive', {
                  valuePropName: 'aggressiveChecked',
                })(<Checkbox checked={this.state.isAggressive} onChange={this.onCheckChange} />)}
              </Form.Item>

              <Form.Item label="Anxiety">
                {getFieldDecorator('hasAnxiety', {
                  valuePropName: 'medicalChecked',
                })(<Checkbox checked={this.state.hasAnxiety} onChange={this.onCheckChange} />)}
              </Form.Item>
            </Row>
            <div style={{ marginLeft: 10, fontWeight: 700 }} > Special needs: </div>
            <Row style={{ marginLeft: 15, marginBottom: 10 }}>
              <Form.Item label="Dietary">
                {getFieldDecorator('hasDiet', {
                    valuePropName: 'dietChecked',
                  })(<Checkbox checked={this.state.hasDiet} onChange={this.onCheckChange} />)}
              </Form.Item>

              <Form.Item label="Medical">
                {getFieldDecorator('hasMedical', {
                  valuePropName: 'medicalChecked',
                })(<Checkbox checked={this.state.hasMedical} onChange={this.onCheckChange} />)}
              </Form.Item>
            </Row>

            <Row style={rowStyle}>
              <Form.Item style={{ marginTop: 10, fontWeight: 500 }} label="Upload Photo">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="/imageUpload"
                  beforeUpload={beforeUpload}
                  onChange={val => this.onChangeImage(val)}
                >
                  {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : uploadButton}
                </Upload>

              </Form.Item>
            </Row>

            <Row style={rowStyle}>
              <Form.Item style={{ marginTop: 10 }} label="Description">
                {getFieldDecorator('description', {})(<TextArea rows={4} style={{ width: 600 }} />)}
              </Form.Item>
            </Row>
            <Row>
              <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}> Submit </Button>
            </Row>
          </Form>
        </div>
      </CSSTransitionGroup>
    );
  }
}

const CreateDogForm = Form.create()(DogForm);

const mapStateToProps = ({ storeUser }) => (
  {
    user: storeUser.user,
  }
);

export default connect(mapStateToProps, null)(CreateDogForm);

// TODO: unfuck falsy validation/checkbox stuff in object
// TODO: validate on blur
// TODO: get id of current organization and set to orgId in dog obj
