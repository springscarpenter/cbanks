import React, { useState, useRef } from 'react';

const SearchBar = () => {
  const [isFocused, setFocused] = useState(false);
  const [text, setText] = useState('');
  const searchRef = useRef(null);

  const searchText = (input) => {
    if (validateInput(input)) console.log('search');
  };

  const validateInput = (input) => {
    return input && input.length >= 3 ? true : false;
  };

  const onClick = () => {
    if (text) {
      searchText(text);
    } else {
      searchRef.current.focus();
      setFocused(true);
    }
  };

  const onKeyUp = (e) => {
    if (!text) {
      console.log('reset');
    } else if (e.key === 'Enter') {
      searchText(text);
    }
  };

  return (
    <div className={`search-box${isFocused ? ' focus' : ''}`}>
      <div className='search-icon-box'>
        <button className='icon-btn' onClick={onClick}>
          <i className='material-icons-outlined'>search</i>
        </button>
      </div>
      <input
        type='text'
        className='search-field'
        placeholder='Search'
        ref={searchRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={onKeyUp}
        onClick={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default SearchBar;
