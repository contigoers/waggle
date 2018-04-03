import React from 'react';
import { Divider } from 'antd';
import { CSSTransitionGroup } from 'react-transition-group';
import test1 from '../assets/testimonial1.jpg';
import test2 from '../assets/testimonial2.jpg';
import test3 from '../assets/testimonial3.jpg';

const Landing = () =>
  (
    <CSSTransitionGroup
      transitionName="fade-appear"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div className="body">
        <div className="content">
          <div className="content-divs users">
            <Divider>Hear From Our Users</Divider>
          </div>
          <div className="content-divs">
            <div className="image">
              <img src={test1} alt="test1" />
            </div>
            <div className="test">
              <q>
                After deciding I wanted to help out dogs in needs, I found Cooper through Waggl.
                It has been a blast bringing him into my life! Anyone who is interested in adopting
                a dog should use Waggl.
              </q>
              <div className="author">
                -John A. | San Antonio, TX
              </div>
            </div>
          </div>
          <div className="content-divs">
            <div className="test">
              <q>
                I really wanted to get a dog, but I was worried that a dog wouldn&#39;t be happy
                living in my apartment. Well, someone told me about Waggl and how you can find
                dogs that match your lifestyle. I listened, and now I was able to find Ruby,
                a sweet maltese mix that thrives in small living places.
              </q>
              <div className="author">
                -Grace P. | Austin, TX
              </div>
            </div>
            <div className="image">
              <img src={test2} alt="test2" />
            </div>
          </div>
          <div className="content-divs">
            <div className="image">
              <img src={test3} alt="test3" />
            </div>
            <div className="test">
              <q>
                Our family dog sadly passed away last year, and the boys REALLY wanted another one.
                My husband, Dan and I discovered Waggl, and we were on our way to finding a new
                Golden Retriever. We were able to get in touch with the shelter that was housing
                Duke and within two days, he was running around in our backyard and playing in
                the sprinkler just like Bear used to do. I can not recommend Waggl enough.
              </q>
              <div className="author">
                -Karen C. | Round Rock, TX
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransitionGroup>
  );

export default Landing;
