/* eslint react/jsx-closing-tag-location: 0 */
import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Row,
  Input,
  Select,
  Checkbox,
  InputNumber,
  Button,
  Modal,
} from 'antd';
import breeds from '../../../database/breeds';
import { toggleEditModal, editDogInfo } from '../actions/editActions';

const { Option } = Select;
const { TextArea } = Input;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const dog = this.props.dogs[this.props.id];

    this.defaultState = {
      // mix, aggression, anxiety, diet, medical
      isMix: !!dog.mix,
      isAggressive: !!dog.aggressive,
      hasAnxiety: !!dog.anxious,
      hasDiet: !!dog.diet,
      hasMedical: !!dog.medical,
    };
    this.state = this.defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange({ target: { id } }) {
    this.setState({
      [id]: !this.state[id],
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const dogInfo = this.props.dogs[this.props.id];
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const dog = {
          ...dogInfo,
          name: values.name,
          breed: values.breed === 'null' ? null : values.breed,
          mix: +Boolean(this.state.isMix),
          male: +(values.isMale === 'true' || values.isMale === 'Good boy'),
          aggressive: +Boolean(this.state.isAggressive),
          anxious: +Boolean(this.state.hasAnxiety),
          lifestage: values.lifestage === 'null' ? null : values.lifestage,
          age: values.age || null,
          size: values.size === 'null' ? null : values.size,
          fixed: values.isFixed === 'null' ? null : +Boolean(values.isFixed),
          diet: +Boolean(this.state.hasDiet),
          medical: +Boolean(this.state.hasMedical),
          energy_level: values.energyLevel === 'null' ? null : values.energyLevel,
          photo: values.photo || null,
          description: values.description || null,
          org_id: dogInfo.org_id,
          org_name: undefined,
        };
        console.log(dogInfo);
        console.log(values);
        console.log(dog);
        this.props.editDogInfo(dog);
        this.props.toggleEditModal();
      }
    });
  }

  render() {
    const rowStyle = { marginBottom: 10 };
    const { getFieldDecorator } = this.props.form;
    const dog = this.props.dogs[this.props.id];
    return (
      <Modal
        id="login"
        title="Please Log In"
        visible={this.props.visible}
        onCancel={this.props.toggleEditModal}
        footer={[
          <Button key="back" onClick={this.props.toggleEditModal}>Cancel</Button>,
          <Button id="login" key="login" type="primary" onClick={this.handleSubmit}>
            Save Changes
          </Button>,
        ]}
      >
        <Form layout="inline" onSubmit={this.handleSubmit}>

          <Row style={rowStyle}>

            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please provide name',
                  },
                ],
                initialValue: dog.name,
              })(<Input onBlur={this.handleBlur} style={{ width: 300 }} />)}

            </Form.Item>

          </Row>

          <Row style={rowStyle}>
            <Form.Item label="Breed">
              {getFieldDecorator('breed', {
                rules: [
                  {
                    required: true,
                    message: 'Please choose a breed',
                  },
                ],
                initialValue: dog.breed,
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
                initialValue: this.state.mixChecked,
              })(<Checkbox checked={this.state.isMix} onChange={this.onCheckChange} />)}

            </Form.Item>
          </Row>

          <Row style={rowStyle}>
            <Form.Item label="Gender">
              {getFieldDecorator('isMale', {
                rules: [
                  {
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
                initialValue: dog.male ? 'Good boy' : 'Good girl',
              })(<Select style={{ width: 200 }} onChange={this.onChange} onBlur={this.onBlur} placeholder="Select">
                <Option value="true"> Good boy </Option>
                <Option value="false"> Good girl </Option>
                <Option value="null"> Unknown </Option>
              </Select>)}

            </Form.Item>

            <Form.Item label="Fixed?">
              {getFieldDecorator('isFixed', {
                rules: [
                  {
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
                initialValue: dog.fixed,
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
                rules: [
                  {
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
                initialValue: dog.lifestage,
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
                initialValue: dog.age,
              })(<InputNumber min={0} max={99} />)}
            </Form.Item>
          </Row>

          <Row style={rowStyle}>
            <Form.Item label="Size">
              {getFieldDecorator('size', {
                rules: [
                  {
                    required: true,
                    message: 'Please choose an option',
                  },
                ],
                initialValue: dog.size,
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
                initialValue: dog.energy_level,
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
                initialValue: this.state.aggressiveChecked,
              })(<Checkbox checked={this.state.isAggressive} onChange={this.onCheckChange} />)}
            </Form.Item>

            <Form.Item label="Anxiety">
              {getFieldDecorator('hasAnxiety', {
                valuePropName: 'medicalChecked',
                initialValue: this.state.medicalChecked,
              })(<Checkbox checked={this.state.hasAnxiety} onChange={this.onCheckChange} />)}
            </Form.Item>
          </Row>
          <div style={{ marginLeft: 10, fontWeight: 700 }} > Special needs: </div>
          <Row style={{ marginLeft: 15, marginBottom: 10 }}>
            <Form.Item label="Dietary">
              {getFieldDecorator('hasDiet', {
                  valuePropName: 'dietChecked',
                initialValue: this.state.dietChecked,
                })(<Checkbox checked={this.state.hasDiet} onChange={this.onCheckChange} />)}
            </Form.Item>

            <Form.Item label="Medical">
              {getFieldDecorator('hasMedical', {
                valuePropName: 'medicalChecked',
                initialValue: this.state.medicalChecked,
              })(<Checkbox checked={this.state.hasMedical} onChange={this.onCheckChange} />)}
            </Form.Item>
          </Row>

          <Row style={rowStyle}>
            <Form.Item label="Photo">
              {getFieldDecorator('photo', {
                initialValue: dog.photo,
                })(<Input placeholder="Photo URL" />)}
            </Form.Item>
          </Row>
          <Row style={rowStyle}>
            <Form.Item style={{ marginTop: 10 }} label="Description">
              {getFieldDecorator('description', {
                initialValue: dog.description,
              })(<TextArea rows={4} />)}
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const EditModal = Form.create()(EditForm);

const mapStateToProps = ({ search, editModal }) => (
  {
    dogs: search.results.dogs,
    visible: editModal.visible,
  }
);

export default connect(mapStateToProps, { toggleEditModal, editDogInfo })(EditModal);
