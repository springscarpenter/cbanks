import React from 'react';
import logo from '../../../logo.png';

const Header = () => {
  return (
    <header className='main-header'>
      <button className='icon-btn'>
        <i className='material-icons-outlined'>menu</i>
      </button>
      <div className='logo-box'>
        <img src={logo} alt='logo' className='logo-img' />
        <span className='logo-name'>Central Banks</span>
      </div>
      <div style={{ flex: 1 }}></div>
      <button className='icon-btn view-mode-btn'>
        <i className='material-icons-outlined'>view_agenda</i>
      </button>
      <button className='icon-btn dark-mode-btn'>
        <i className='material-icons-outlined'>brightness_5</i>
      </button>
    </header>
  );
};

export default Header;
