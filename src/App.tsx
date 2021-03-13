import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import ResultsPage from './components/ResultsPage';
import StartPage from './components/StartPage';
import useDidUpdateEffect from './utils/useDidUpdateEffect';

function App() {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const { keyword: parsedKeyWord = '' } = queryString.parse(
      window.location.search
    );

    setKeyword(parsedKeyWord!.toString());
  }, []);

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
          <Route
            exact
            path="/search"
            component={() => <StartPage onSetKeyword={setKeyword} />}
          />
          <Route
            exact
            path="/results"
            component={() => (
              <ResultsPage keyword={keyword} onSetKeyword={setKeyword} />
            )}
          />
          <Route path="/">
            <Redirect to="/search" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
