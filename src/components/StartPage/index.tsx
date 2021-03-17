import React, { useState } from 'react';
import './StartPage.scss';
import Header from '../Header';
import { useFilterContext } from '../../context';

const StartPage = () => {
  const { dispatch } = useFilterContext();

  const [inputValue, setInputValue] = useState('');

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({ type: 'SET_KEYWORD', payload: inputValue });
    setInputValue('');
  };

  return (
    <div className="start-page">
      <Header />
      <main className="start">
        <h1 className="start__title">Поиск товаров</h1>
        <p className="start__subtitle">
          Выбирайте товар мечты из лучших предложений.
        </p>
        <form className="start__form" onSubmit={(e) => onFormSubmit(e)}>
          <input
            type="text"
            className="input start__input"
            placeholder="Введите название товара"
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
          />
          <button className="start__button">Найти</button>
        </form>
      </main>
    </div>
  );
};

export default StartPage;
