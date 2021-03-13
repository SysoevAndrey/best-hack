import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import SecondPage from './components/SecondPage';
import StartPage from './components/StartPage';

function App() {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword) {
      window.location.href = `/results?${queryString.stringify({ keyword })}`;
    }
  }, [keyword]);

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
        <Switch>
          <Route
            exact
            path="/search"
            component={() => <StartPage onSetKeyword={setKeyword} />}
          />
          <Route exact path="/results" component={SecondPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
