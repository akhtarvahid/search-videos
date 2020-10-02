import React from 'react';
import './styles.scss';

const VideoDetails = ({video}) => {
    
    if(!video){
        return <div>Loading...</div>;
    }
    //console.log(video)
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div className="searched-video">
         <div className="searched-video-frame">
          <iframe className="embed-responsive-item" src={url} />   
         </div>
         <div className="details">
           <h4>{video.snippet.title}</h4>
          <div>{video.snippet.description}</div>    
         </div>
        </div>
    );
};

export default VideoDetails;