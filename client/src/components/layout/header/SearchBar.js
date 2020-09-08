import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  search,
  resetSearch,
  setLoading,
} from '../../../features/search/searchSlice';
import PropTypes from 'prop-types';

const SearchBar = ({ history }) => {
  const dispatch = useDispatch();
  const [isFocused, setFocused] = useState(false);
  const [text, setText] = useState('');
  const searchRef = useRef(null);

  const searchText = (input) => {
    if (input.length >= 3) {
      dispatch(setLoading(true));
      history.push('/');
      dispatch(search(input));
      setFocused(false);
    }
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
      dispatch(resetSearch());
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

SearchBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SearchBar);
