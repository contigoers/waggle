import React from 'react';
import { Icon, Divider } from 'antd';

const About = () =>
  (
    <div className="body">
      <div className="about">
        <div className="about-divs">
          <div className="story">
            <Divider>The Story</Divider>
          </div>
          <div className="about-text">
            Waggl was started by four dog-loving software engineers with the goal
            of making it easier for people to find the dog that matches their life style.
            Whether you want the small, quiet pup or the big, hearty hound, Waggl gives
            you the ability to refine your search to find exactly what you need. Waggl has
            taken the initiative to bring attention to the dog shelter community in order
            to make a difference. Every dog that is adopted from a shelter means less dogs
            that live a lonely, short life.
          </div>
          <div className="stats">
            <div>
              <Icon type="check-circle" />
              <p>
                Non-Profit
              </p>
            </div>
            <div>
              <Icon type="check-circle" />
              <p>
                No Puppy Mills
              </p>
            </div>
            <div>
              <Icon type="check-circle" />
              <p>
                Community Driven
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default About;
