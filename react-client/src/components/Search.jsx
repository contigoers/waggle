import React from 'react';
import { Button, Menu, Dropdown, AutoComplete, Checkbox, Slider, Switch, Icon } from 'antd';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const Apply = () =>
  (
    <Button className="apply-button">
      Apply
    </Button>
  );

const Clear = () =>
  (
    <Button className="clear-button">
      Clear
    </Button>
  );

const ageMarks = {
  1: 'Puppy',
  3: 'Adolescent',
  5: 'Adult',
  10: 'Senior',
};

const sizeMarks = {
  5: 'XXS',
  10: 'XS',
  18: 'S',
  30: 'M',
  40: 'L',
  60: 'XL',
  80: 'XXL',
  120: 'XXL',
};

const breedMenu = (
  <Menu className="breed-menu">
    <Menu.Item key="0" >
      <Checkbox onChange={onChange}>Pug</Checkbox>
    </Menu.Item>
    <Menu.Item key="1" >
      <Checkbox onChange={onChange}>Beagle</Checkbox>
    </Menu.Item>
    <Menu.Item key="2" >
      <Checkbox onChange={onChange}>Chihuahua</Checkbox>
    </Menu.Item>
    <Menu.Item key="3" >
      <Checkbox onChange={onChange}>Great Dane</Checkbox>
    </Menu.Item>
    <Menu.Item key="4" >
      <Checkbox onChange={onChange}>Daschshund</Checkbox>
    </Menu.Item>
    <Menu.Item key="5" >
      <Checkbox onChange={onChange}>Shih Tzu</Checkbox>
    </Menu.Item>
    <Menu.Item key="6" >
      <Checkbox onChange={onChange}>Pit Bull</Checkbox>
    </Menu.Item>
    <Menu.Item key="7" >
      <Checkbox onChange={onChange}>Greyhound</Checkbox>
    </Menu.Item>
    <div className="menu-footer">
      <Clear />
      <Apply />
    </div>
  </Menu>
);

const genderMenu = (
  <Menu>
    <Menu.Item key="0" >
      Male <Switch className="gender-select" onChange={onChange} />
    </Menu.Item>
    <Menu.Item key="1" >
      Female <Switch className="gender-select" onChange={onChange} />
    </Menu.Item>
    <div className="menu-footer">
      <Clear />
      <Apply />
    </div>
  </Menu>
);

const sizeMenu = (
  <Menu>
    <div className="size-menu">
      <Slider
        vertical
        range
        step={1}
        max={120}
        marks={sizeMarks}
        defaultValue={[20, 50]}
      />
    </div>
    <div className="menu-footer">
      <Clear />
      <Apply />
    </div>
  </Menu>
);

const ageMenu = (
  <Menu>
    <div className="age-menu">
      <Slider
        vertical
        range
        step={1}
        max={15}
        marks={ageMarks}
        defaultValue={[3, 5]}
      />
    </div>
    <div className="menu-footer">
      <Clear />
      <Apply />
    </div>
  </Menu>
);

const AutoCompeleteBreed = (
  <Menu>
    <Menu.Item>
      <AutoComplete
        style={{ width: 400 }}
        placeholder="Search By Breed"
      />
    </Menu.Item>
  </Menu>
);

const Search = () =>
  (
    <div className="search-div">
      <div className="search-buttons">
        <Dropdown
          overlay={AutoCompeleteBreed}
          trigger={['click']}
        >
          <Button className="breed-button search-button">
            Breed <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </div>
  );

export default Search;

// <Dropdown
//   overlay={AutoCompeleteBreed}
//   trigger={['click']}
// >
//   <Button className="breed-button search-button">
//     Breed <Icon type="down" />
//   </Button>
// </Dropdown>

//   <Dropdown overlay={genderMenu} trigger={['click']}>
//     <Button className="gender-button search-button">
//       Gender
//           </Button>
//   </Dropdown>

//   <Dropdown overlay={sizeMenu} trigger={['click']}>
//     <Button className="size-button search-button">
//       Size
//           </Button>
//   </Dropdown>

//   <Dropdown overlay={ageMenu} trigger={['click']}>
//     <Button className="age-button search-button">
//       Age
//           </Button>
//   </Dropdown>
