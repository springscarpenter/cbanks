import React from 'react';
import { useSelector } from 'react-redux';
import { selectExchangeProfile } from '../../features/exchange/exchangeSlice';

const ExchangeProfile = () => {
  const {
    image,
    name,
    description,
    trust_score_rank,
    centralized,
    website,
    country,
    year,
    twitter,
    facebook,
    telegram,
    reddit,
    slack,
    other_url_1,
    other_url_2,
  } = useSelector(selectExchangeProfile);

  return (
    <div className='profile'>
      <div className='profile-img'>
        <img src={image && image.replace('small', 'large')} alt='' />
      </div>
      <div className='profile-name'>
        <h1>{name && name}</h1>
        <h3>Exchange</h3>
      </div>
      {description && (
        <p className='profile-desc'>
          {description.replace(/(<a.*?>)|(<\/a>)|\\r|\\n|\\t/gi, '').length <=
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
        Rank {trust_score_rank ? trust_score_rank : '?'}
      </span>
      <div className='profile-links'>
        {centralized && (
          <div className='profile-link'>
            <strong>{centralized ? 'Centralized' : 'Decentralized'}</strong>
          </div>
        )}
        {website && (
          <div className='profile-link'>
            <i className='fas fa-link'></i>
            <a href={website} target='_blank' rel='noopener noreferrer'>
              Website
            </a>
          </div>
        )}
        {country && <div className='profile-link'>{country}</div>}
        {year && <div className='profile-link'>Est. {year}</div>}
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
            <a href={facebook} target='_blank' rel='noopener noreferrer'>
              Facebook
            </a>
          </div>
        )}
        {telegram && (
          <div className='profile-link'>
            <i className='fab fa-telegram-plane'></i>
            <a href={telegram} target='_blank' rel='noopener noreferrer'>
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
        {slack && (
          <div className='profile-link'>
            <i className='fab fa-slack'></i>
            <a href={slack} target='_blank' rel='noopener noreferrer'>
              Slack
            </a>
          </div>
        )}
        {other_url_1 && (
          <div className='profile-link'>
            <i className='fas fa-link'></i>
            <a href={other_url_1} target='_blank' rel='noopener noreferrer'>
              Link 1
            </a>
          </div>
        )}
        {other_url_2 && (
          <div className='profile-link'>
            <i className='fas fa-link'></i>
            <a href={other_url_2} target='_blank' rel='noopener noreferrer'>
              Link 2
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeProfile;
