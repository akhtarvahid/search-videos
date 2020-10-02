import _ from 'lodash';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
// import SearchBar from './search_bar';
// import YTsearch from 'youtube-api-search';
// import VideoList from './video_list';
import VideoListDetail from './video-details/VideoDetail';
import youtube from '../utils/youtube';
import './app.scss';
import SearchBar from './search-bar/SearchBar';

function App (){
const [state, setState] = useState({videos:[], suggestions: []})
const [search, setSearch] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [isSearching, setIsSearching] = useState(false);
const [error, setError] = useState(false);

  useEffect(()=> {
    setIsSearching(true);
   async function fetchMyAPI () {
    let respo;
     await youtube.get('/search', {
      params: {q: 'faded'}
    })
    .then(res=> {
      setIsSearching(false);
      setState({videos: respo.data.items});
    })
    .catch(err=> {
      if(err.response.status === 403) 
       setError(true);
    })
  }
  fetchMyAPI();
  },[])

 const handleClick = async (term) => {
   setIsSearching(true);
   const respo = await youtube.get('/search', {
    params: {
      q: term
    }
   })
   if(respo.data.items.length > 0) {
     setIsSearching(false);
   }
   setState({videos: respo.data.items})
   setSearch('')
 }
 const onInputChange = async (term) => {
  setSearch(term);
  setIsOpen(true);

  // optional 
  // https://cors-anywhere.herokuapp.com/suggestqueries.google.com/complete/search?client=firefox&ds=yt
  // params: {
  //   q: term,
  // }

  if(term.length > 0 ) {
     axios.get('https://cors-anywhere.herokuapp.com/clients1.google.com/complete/search', { 
     params: {
          client: "firefox",
          hl: "en",
          ds: "yt",
          q: term,
        }
      })
    .then((res) => setState({...state, suggestions: res.data}))
    .catch((error) => console.log(error));
  }
}
  const selectSearch = (val) => {
    if(val.length >0){
    setSearch(val);
    handleClick(val);
    setIsOpen(false);
    }
  }
  const submitSearch =(e) => {
    e.preventDefault();
    selectSearch(search)
  }
   
  // const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
  const {videos} = state;
  return (
    <>
    {!isSearching || error ? <div className="search-main">
      <SearchBar 
        onInputChange={onInputChange}
        search={search}
        selectSearch={selectSearch}
        isOpen={isOpen}
        suggestions={state.suggestions}
        submitSearch={submitSearch}
      />
      <div className="searched-listing">
        {videos && videos.map((video,i)=>
           <VideoListDetail key={i} video={video} />
        )}
      </div>
      {error && 
        <div>
         <h6>API limit exceeded</h6>
        </div>}
    </div>:
    <div className="loader">
      <h2 data-text="Loading...">Loading...</h2>
    </div>}
    </>
  );
};

export default App;