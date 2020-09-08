import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '../../../features/menu/menuSlice';
import { toggleView, selectView } from '../../../features/view/viewSlice';
import { toggleTheme, selectTheme } from '../../../features/theme/themeSlice';
import SearchBar from './SearchBar';
import logo from '../../../logo.png';

const Header = () => {
  const gridView = useSelector(selectView);
  const darkMode = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <header className='main-header'>
      <button className='icon-btn' onClick={() => dispatch(toggleMenu())}>
        <i className='material-icons-outlined'>menu</i>
      </button>
      <Link to='/' className='logo-box'>
        <img src={logo} alt='logo' className='logo-img' />
        <span className='logo-name'>Central Banks</span>
      </Link>
      <SearchBar />
      <div style={{ flex: 1 }}></div>
      <button
        className='icon-btn view-mode-btn'
        onClick={() => dispatch(toggleView())}
        title={gridView ? 'List View' : 'Grid View'}
      >
        {gridView ? (
          <i className='material-icons-outlined'>view_agenda</i>
        ) : (
          <i className='material-icons-outlined'>dashboard</i>
        )}
      </button>
      <button
        className='icon-btn dark-mode-btn'
        onClick={() => dispatch(toggleTheme())}
        title={darkMode ? 'Light Mode' : 'Dark Mode'}
      >
        {darkMode ? (
          <i className='material-icons-outlined'>brightness_5</i>
        ) : (
          <i className='material-icons-outlined'>brightness_4</i>
        )}
      </button>
    </header>
  );
};

export default Header;
