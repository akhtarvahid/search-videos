import React, { useState } from 'react';
//import recents from '../../utils/recent.json';
import './search.scss';

function SearchBar({onInputChange, search, 
  selectSearch, isOpen, suggestions, submitSearch }) {
    //console.log(suggestions)
    const fuzzyMatch = (suggestText, typedText) => {
      const searched = typedText.replace(/ /g, '').toLowerCase();
      const tokens = [];
      let searchPosition = 0;
      for (const txt of suggestText) {
          let textChar = txt.toLocaleLowerCase();
          if (searchPosition < searched.length &&
              textChar.toLocaleLowerCase() === searched[searchPosition]) {
              searchPosition += 1;
          } else {
              textChar = '<b>' + textChar + '</b>';
          }
          tokens.push(textChar);
      }

      return tokens.join('');
  }
    const recents = suggestions && suggestions[1];
    return( 
    <div className="search-bar"> 
      <div className="search-bar_header">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRamYU26O1FisnpsRq0YfQRj4XTstUCo0vfig&usqp=CAU" alt="search-icon" />
       <h1>Search your favourite</h1>
      </div>   
      <form onSubmit={submitSearch}>
      <input
        value={ search }
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Search something"
     />
      <button>Search</button>
     </form>
     {(isOpen && search.length > 2) && 
      <div className="search-overlay">
        {recents && recents.slice(0, 8).map((recent, i)=>
          <div
            key={i}
            onClick={()=> selectSearch(recent)}
            dangerouslySetInnerHTML={{__html: fuzzyMatch(recent, search)}}
           />
         )}
      </div>
     }
    </div>
    )
    };

export default SearchBar;