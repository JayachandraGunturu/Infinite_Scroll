import React from 'react';

export default function Image({ image }) {
  
  return <img id='one' className='single-photo' src={image.urls.thumb} alt='' />;
}
