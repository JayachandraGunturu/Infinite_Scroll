import React from 'react';

export default function Image({ image }) {
  return <div className='single-photo' style={{backgroundImage:"url("+image.urls.thumb+")"}}></div>;
}
