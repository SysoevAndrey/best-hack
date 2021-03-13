import React, { useState } from 'react';
import './StartPage.scss';
import Header from '../Header';

const StartPage = ({
  onSetKeyword,
}: {
  onSetKeyword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [inputValue, setInputValue] = useState('');

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSetKeyword(inputValue);
    setInputValue('');
  };

  return (
    <div className="start-page">
      <Header />
      <main className="main">
        <h1 className="main__title">Поиск товаров</h1>
        <p className="main__subtitle">
          Выбирайте товар мечты из лучших предложений.
        </p>
        <form className="main__form" onSubmit={(e) => onFormSubmit(e)}>
          <input
            type="text"
            className="main__input"
            placeholder="Введите название товара"
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
          />
          <button className="main__button">Найти</button>
        </form>
      </main>
    </div>
  );
};

export default StartPage;
