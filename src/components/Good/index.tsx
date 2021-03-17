import React from 'react';
import { useFilterContext } from '../../context';
import { IGood } from '../ResultsPage';
import './Good.scss';

const Good = ({
  name,
  logo,
  rating,
  popularity,
  averagePrice,
  markets,
}: IGood) => {
  const {
    state: { popupContent },
    dispatch,
  } = useFilterContext();

  const onGoodClick = () => {
    dispatch({
      type: 'SET_POPUP_CONTENT',
      payload: { title: 'Наличие товара в магазинах', data: markets },
    });
    dispatch({ type: 'SET_POPUP_STATE', payload: true });
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
        Популярность товара: <strong>{popularity} %</strong>
      </p>
      <p className="good__rate">
        Оценка: <strong>{rating}</strong> из <strong>5</strong>
      </p>
    </div>
  );
};

export default Good;
