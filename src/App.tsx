import queryString from 'query-string';
import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import ResultsPage from './components/ResultsPage';
import StartPage from './components/StartPage';
import { useFilterContext } from './context';
import useDidUpdateEffect from './utils/useDidUpdateEffect';

function App() {
  const {
    state: { keyword, cartData },
    dispatch,
  } = useFilterContext();

  useEffect(() => {
    const { keyword: parsedKeyWord = '' } = queryString.parse(
      window.location.search
    );

    const cartFromLS = window.localStorage.getItem('cart');

    dispatch({
      type: 'SET_CART_DATA',
      payload: cartFromLS ? JSON.parse(cartFromLS) : [],
    });

    dispatch({ type: 'SET_KEYWORD', payload: parsedKeyWord!.toString() });
  }, []);

  useDidUpdateEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cartData));
  }, [cartData]);

  useDidUpdateEffect(() => {
    if (keyword) {
      const currentLocation = window.location.pathname;

      window.history.replaceState(
        null,
        '',
        `/results?${queryString.stringify({ keyword })}`
      );

      if (currentLocation === '/search') {
        window.location.reload();
      }
    } else if (keyword === '') {
      window.location.href = '/search';
    }
  }, [keyword]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/search" component={StartPage} />
          <Route exact path="/results" component={ResultsPage} />
          <Route path="/">
            <Redirect to="/search" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
