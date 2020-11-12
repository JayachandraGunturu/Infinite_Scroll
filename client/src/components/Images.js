import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './Image';
import Popup from 'reactjs-popup';
export class Images extends Component {
  state = {
    images: [],
    count: 30,
    start: 1,
    isOpen:false,
    picId:null,
    pic:0
  };
  

  componentDidMount() {
    const { count, start } = this.state;
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then(res => this.setState({ images: res.data }));
      
  }

   openModal() {
    this.setState({isOpen:true})
  }

  

   closeModal(){
    this.setState({isOpen:false})
  }

  backPic=()=>{
    var ll=this.state.images
    
   var i=this.state.pic
   alert("back")
   if(i>0)
    this.setState({picId:ll[i-1].urls.thumb,pic:i-1})
  }

  nextPic=()=>{
    var ll=this.state.images
    
   var i=this.state.pic
   alert("next")
   console.log(ll[i])
   if(i<this.state.images.length)
    this.setState({picId:ll[i+1].urls.thumb,pic:i+1})
  }

  fetchImages = () => {
    const { count, start } = this.state;
    this.setState({ start: this.state.start + count });
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then(res =>
        this.setState({ images: this.state.images.concat(res.data) })
      );
  };

  myLoad=(i)=>{
    var ll=this.state.images
    
    
    this.setState({picId:ll[i].urls.thumb,pic:i})
    console.log(this.state.pic,"i",i)
    this.openModal();
  }

  render() {
    
    return (
      <div className='images'>
        <Popup trigger={
        <div>
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.images.map((image,key) => (
            <div class='divImg' onClick={()=>this.myLoad(key)}>
            <Image key={image.id} image={image} />
            </div>
          ))}
        </InfiniteScroll></div>} modal>
    
        
        <div style={{backgroundColor:"black",width:"50vw",height:"50vh",zIndex:99}}><button onClick={()=>this.backPic()}>prev</button><img src={this.state.picId} /><button onClick={()=>this.nextPic()}>next</button>
             </div>
  </Popup>
      </div>
    );
  }
}

export default Images;
