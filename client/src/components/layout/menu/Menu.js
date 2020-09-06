import React from 'react';
import logo from '../../../logo.png';
import flag from './bahamas.png';

const Menu = () => {
  return (
    <aside>
      <nav className='side-menu'>
        <div className='logo-box'>
          <img src={logo} alt='logo' className='logo-img' />
          <span className='logo-name'>Central Banks</span>
        </div>
        <ul className='routes'>
          <li>
            <div className='active'>
              <i className='material-icons-outlined'>storage</i>
              <span>Home</span>
            </div>
          </li>
          <li>
            <div>
              <i className='material-icons-outlined'>account_balance</i>
              <span>Central Banks</span>
            </div>
          </li>
          <li>
            <div>
              <i className='material-icons-outlined'>local_atm</i>
              <span>Fiat Currencies</span>
            </div>
          </li>
          <li>
            <div>
              <i className='material-icons-outlined'>monetization_on</i>
              <span>Cryptocurrencies</span>
            </div>
          </li>
          <li>
            <div>
              <i className='material-icons-outlined'>swap_vert_circle</i>
              <span>Exchanges</span>
            </div>
          </li>
          <li>
            <div>
              <i className='material-icons-outlined'>insert_chart</i>
              <span>Stock Market</span>
            </div>
          </li>
        </ul>
        <div className='subheader'>
          <span>Preferences</span>
        </div>
        <ul>
          <li>
            <button title='work in progress'>
              <div>
                <i className='material-icons-outlined'>euro</i>
                <span>Currency</span>
              </div>
            </button>
          </li>
          <li>
            <button title='work in progress'>
              <div>
                <i className='material-icons-outlined'>translate</i>
                <span>Language</span>
              </div>
            </button>
          </li>
        </ul>
        <div className='subheader'>
          <span>Data Provider</span>
        </div>
        <ul>
          <li>
            <a
              href='https://www.coingecko.com/api/documentations/v3'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>
                <i className='material-icons-outlined'>link</i>
                <span>CoinGecko</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href='https://exchangeratesapi.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>
                <i className='material-icons-outlined'>link</i>
                <span>Exchangeratesapi</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href='https://finnhub.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>
                <i className='material-icons-outlined'>link</i>
                <span>Finnhub</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href='https://www.wikipedia.org/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>
                <i className='material-icons-outlined'>link</i>
                <span>Wikipedia</span>
              </div>
            </a>
          </li>
        </ul>
        <div className='subheader'>
          <span>Community</span>
        </div>
        <ul>
          <li>
            <a
              href='https://github.com/centralbanks'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>
                <i className='material-icons-outlined'>code</i>
                <span>GitHub</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/cbanks_org'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>
                <i className='material-icons-outlined'>chat</i>
                <span>Twitter</span>
              </div>
            </a>
          </li>
          <li>
            <a href='mailto:contact@cbanks.org'>
              <div>
                <i className='material-icons-outlined'>email</i>
                <span>Email</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href='https://etherscan.io/address/0xf774ffdbe0dc0d5ea740148c3de28eb80c276ca1'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>
                <i className='material-icons-outlined'>
                  account_balance_wallet
                </i>
                <span>cbanks.eth</span>
              </div>
            </a>
          </li>
          <li>
            <div>
              <img src={flag} alt='Flag of Bahamas' className='menu-flag' />
              <span>Bahamas</span>
            </div>
          </li>
        </ul>
        <div className='subheader foundation'>
          <span>Managed by Central Banks Foundation, BS</span>
        </div>
      </nav>
    </aside>
  );
};

export default Menu;
