import React from 'react';
import { useSelector } from 'react-redux';
import { selectCryptoProfile } from '../../features/cryptocurrency/cryptocurrencySlice';

const CryptoProfile = () => {
  const {
    symbol,
    name,
    description,
    website,
    explorer,
    forum,
    chat,
    announcement,
    twitter,
    facebook,
    telegram,
    reddit,
    github,
    image,
    market_cap_rank,
  } = useSelector(selectCryptoProfile);

  return (
    <div className='profile'>
      <div className='profile-img'>
        <img src={image && image} alt='' />
      </div>
      <div className='profile-name'>
        <h1>{name && name}</h1>
        <h3>{symbol && symbol.toUpperCase()}</h3>
      </div>
      {description && (
        <p className='profile-desc'>
          {description.replace(/(<a.*?>)|(<\/a>)|\\r|\\n|\\t/gi, '').length <
          250
            ? description
                .replace(/(<a.*?>)|(<\/a>)|\\r|\\n|\\t/gi, '')
                .slice(0, 250)
            : description
                .replace(/(<a.*?>)|(<\/a>)|\\r|\\n|\\t/gi, '')
                .slice(0, 250) + '...'}
        </p>
      )}
      <span className='rank-badge'>
        Rank {market_cap_rank ? market_cap_rank : '?'}
      </span>
      <div className='profile-links'>
        {website && (
          <div className='profile-link'>
            <i className='fas fa-link'></i>
            <a href={website} target='_blank' rel='noopener noreferrer'>
              Website
            </a>
          </div>
        )}
        {explorer && (
          <div className='profile-link'>
            <i className='fas fa-search'></i>
            <a href={explorer} target='_blank' rel='noopener noreferrer'>
              Explorer
            </a>
          </div>
        )}
        {github && (
          <div className='profile-link'>
            <i className='fab fa-github'></i>
            <a
              href={github.match(/[a-z:]*\/\/[a-z.]*\/\w*/)}
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
          </div>
        )}
        {forum && (
          <div className='profile-link'>
            <i className='fas fa-comments'></i>
            <a href={forum} target='_blank' rel='noopener noreferrer'>
              Forum
            </a>
          </div>
        )}
        {chat && (
          <div className='profile-link'>
            <i className='fas fa-comment-alt'></i>
            <a href={chat} target='_blank' rel='noopener noreferrer'>
              Chat
            </a>
          </div>
        )}
        {announcement && (
          <div className='profile-link'>
            <i className='fas fa-satellite-dish'></i>
            <a href={announcement} target='_blank' rel='noopener noreferrer'>
              Announcement
            </a>
          </div>
        )}
        {twitter && (
          <div className='profile-link'>
            <i className='fab fa-twitter'></i>
            <a
              href={`https://twitter.com/${twitter}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitter
            </a>
          </div>
        )}
        {facebook && (
          <div className='profile-link'>
            <i className='fab fa-facebook-f'></i>
            <a
              href={`https://www.facebook.com/${facebook}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook
            </a>
          </div>
        )}
        {telegram && (
          <div className='profile-link'>
            <i className='fab fa-telegram-plane'></i>
            <a
              href={`https://t.me/${telegram}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Telegram
            </a>
          </div>
        )}
        {reddit && (
          <div className='profile-link'>
            <i className='fab fa-reddit'></i>
            <a href={reddit} target='_blank' rel='noopener noreferrer'>
              Reddit
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoProfile;
