import React, { Component } from 'react';
import Images from './components/Images';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id='root'>
        <div  style={{backgroundColor: "#f8f8f8"}} className='hero is-fullheight is-bold'>
          <div className='hero-body'>
            <div className='container'>
              <div className='header content'>
                <h1  style={{color: "#303030"}}  className='title is-1'>
                  Infinite Scroll with Unsplash
                </h1>
              </div>

              <Images />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
