import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import CentralBanks from './pages/CentralBanks';
import FiatCurrencies from './pages/FiatCurrencies';
import FiatCurrency from './pages/FiatCurrency';
import Cryptocurrencies from './pages/Cryptocurrencies';
import Cryptocurrency from './pages/Cryptocurrency';
import Exchanges from './pages/Exchanges';
import Exchange from './pages/Exchange';
import StockMarket from './pages/StockMarket';
import Header from './components/layout/header/Header';
import Menu from './components/layout/menu/Menu';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Menu />
      <main className='main-content'>
        <div className='main-spacing-left' />
        <div className='main-content-body'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/central-banks' component={CentralBanks} />
            <Route exact path='/fiat-currencies' component={FiatCurrencies} />
            <Route exact path='/fiat-currencies/:id' component={FiatCurrency} />
            <Route
              exact
              path='/cryptocurrencies'
              component={Cryptocurrencies}
            />
            <Route
              exact
              path='/cryptocurrencies/:id'
              component={Cryptocurrency}
            />
            <Route exact path='/exchanges' component={Exchanges} />
            <Route exact path='/exchanges/:id' component={Exchange} />
            <Route exact path='/stock-market' component={StockMarket} />
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
