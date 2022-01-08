import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu } from './features/menu/menuSlice';
import Home from './pages/Home';
import CentralBanks from './pages/CentralBanks';
import FiatCurrencies from './pages/FiatCurrencies';
import FiatCurrency from './pages/FiatCurrency';
// import Registry from './pages/Registry';
import Cryptocurrencies from './pages/Cryptocurrencies';
import Cryptocurrency from './pages/Cryptocurrency';
import Exchanges from './pages/Exchanges';
import Exchange from './pages/Exchange';
import StockMarket from './pages/StockMarket';
import Header from './components/layout/header/Header';
import Menu from './components/layout/menu/Menu';
import { initData } from './features/search/searchSlice';
// import Disclaimer from './components/utils/Disclaimer';
// import 'swagger-ui-react/swagger-ui.css';
import './App.css';

function App() {
  const menuOpen = useSelector(selectMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initData());
    //eslint-disable-next-line
  }, []);

  return (
    <Router>
      {/* <Disclaimer /> */}
      <Header />
      <Menu />
      <main className='main-content'>
        <div
          className='main-spacing-left'
          style={{ display: menuOpen ? 'block' : 'none' }}
        />
        <div className={`main-content-body${menuOpen ? ' justify-left' : ''}`}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/central-banks' element={<CentralBanks />} />
            <Route exact path='/fiat-currencies' element={<FiatCurrencies />} />
            <Route
              exact
              path='/fiat-currencies/:id'
              element={<FiatCurrency />}
            />
            <Route exact path='/registry' element={<Navigate to='/' />} />
            <Route
              exact
              path='/cryptocurrencies'
              element={<Cryptocurrencies />}
            />
            <Route
              exact
              path='/cryptocurrencies/:id'
              element={<Cryptocurrency />}
            />
            <Route exact path='/exchanges' element={<Exchanges />} />
            <Route exact path='/exchanges/:id' element={<Exchange />} />
            <Route exact path='/stock-market' element={<StockMarket />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
