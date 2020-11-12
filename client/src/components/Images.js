import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './Image';
import { MdArrowBack, MdClose } from 'react-icons/md'
import Popup from 'reactjs-popup';
export class Images extends Component {
  state = {
    images: [],
    count: 30,
    start: 1,
    isOpen:false,
    picId:null,
    pic:0,
    picd:null,
    picUrl:null
  };
  

  componentDidMount() {
    const { count, start } = this.state;
    this.setState({isOpen:false})
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
  
  nextPic=()=>{
    var ll=this.state.images
    var i=this.state.pic
    
    var picurl="https://web.whatsapp.com/send?text="
    picurl+=ll[i+1].urls.regular
    console.log(picurl)
   if(i<this.state.images.length)
    this.setState({picId:ll[i+1].urls.regular,pic:i+1,picd:ll[i+1],picd:ll[i+1].id,picUrl:picurl})
   }

   prevPic=()=>{
    var ll=this.state.images
    var i=this.state.pic
    var picurl="https://web.whatsapp.com/send?text="
    picurl+=ll[i-1].urls.regular
   if(i>0)
    this.setState({picId:ll[i-1].urls.regular,pic:i-1,picd:ll[i-1].id,picUrl:picurl})
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
    var picurl="https://web.whatsapp.com/send?text="
    picurl+=ll[i-1].urls.regular
    this.setState({picId:ll[i].urls.regular,pic:i,picd:ll[i].id,picUrl:picurl})
    console.log(ll[i].id)
    this.openModal();
  }

  render() {
    
    return (
      <div className='images'>
        <div style={{zIndex:9999}}><MdClose onClick={()=>this.closeModal()} style={(this.state.isOpen==false)?{opacity:0}:{opacity:1}} className="closing"></MdClose></div>
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
        </InfiniteScroll></div>} modal >
    
        
        <div className="modal">
          <div className="elem">
            <div><button onClick={()=>this.prevPic()}><MdArrowBack className="arrow" /></button></div>
            <div className="hov"><img className="imC" src={this.state.picId} alt=" " />
              <div className="desc"><h2 style={{alignContent:"center"}}><a href={this.state.picUrl} data-action="share/whatsapp/share">Share via Whatsapp</a></h2></div>
            </div>
            <div><button onClick={()=>this.nextPic()} ><MdArrowBack className="arrowB" /></button></div>
          </div>
          <h2>Press "Esc" to exit modal</h2>
        </div>
  </Popup>
      </div>
    );
  }
}

export default Images;
