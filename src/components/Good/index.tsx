import React from 'react';
import { IGoodItem, IMarket } from '../ResultsPage';
import './Good.scss';

type IGood = {
  setIsPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setPopupContent: React.Dispatch<React.SetStateAction<IMarket[]>>;
} & IGoodItem;

const Good = ({
  name,
  logo,
  rating,
  popularity,
  averagePrice,
  markets,
  setIsPopupOpened,
  setPopupContent,
}: IGood) => {
  const onGoodClick = () => {
    setIsPopupOpened(true);
    setPopupContent(markets);
  };

  return (
    <div className="good" onClick={() => onGoodClick()}>
      <div className="good__main-info">
        <img className="good__image" src={logo} alt={name} />
        <h3 className="good__name">{name}</h3>
      </div>
      <p className="good__rate">
        Средняя стоимость: <strong>{averagePrice} &#8381;</strong>
      </p>
      <p className="good__rate">
        Оценка: <strong>{rating}</strong> из <strong>10</strong>
      </p>
    </div>
  );
};

export default Good;
