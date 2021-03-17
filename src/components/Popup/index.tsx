import React, { useEffect, useState } from 'react';
import closeIcon from '../../images/close.svg';
import Market from '../Market';
import { IMarket } from '../ResultsPage';
import './Popup.scss';
import bottomIcon from '../../images/bottom.svg';
import topIcon from '../../images/top.svg';
import { useFilterContext } from '../../context';

const Popup = ({ markets, title }: { markets: IMarket[]; title: string }) => {
  const {
    state: { popupContent },
    dispatch,
  } = useFilterContext();

  const [order, setOrder] = useState('ascending');

  useEffect(() => {
    const escHandler = (e: any) => {
      if (e.key === 'Escape') {
        dispatch({ type: 'SET_POPUP_STATE', payload: false });
      }
    };

    document.addEventListener('keydown', escHandler);

    return () => {
      return document.removeEventListener('keydown', escHandler);
    };
  });

  const outsideClickHandler = (e: any) => {
    if (e.target.className === 'popup') {
      dispatch({ type: 'SET_POPUP_STATE', payload: false });
    }
  };

  const changeListOrder = () => {
    if (order === 'ascending') {
      dispatch({
        type: 'SET_POPUP_CONTENT',
        payload: {
          ...popupContent,
          data: markets.sort((first, second) => -first.price + second.price),
        },
      });
      setOrder('descending');
    } else {
      dispatch({
        type: 'SET_POPUP_CONTENT',
        payload: {
          ...popupContent,
          data: markets.sort((first, second) => first.price - second.price),
        },
      });
      setOrder('ascending');
    }
  };

  return (
    <div className="popup" onClick={(e) => outsideClickHandler(e)}>
      <div className="popup__content">
        <img
          src={closeIcon}
          alt="Крестик закрытия формы входа"
          className="popup__close"
          onClick={() => dispatch({ type: 'SET_POPUP_STATE', payload: false })}
        />
        <h3 className="popup__title">{title}</h3>
        {markets.length > 1 && (
          <div className="popup__filters">
            <p className="popup__filter">Цена</p>
            <i onClick={() => changeListOrder()}>
              <img
                className="popup__sort-icon"
                src={order === 'ascending' ? topIcon : bottomIcon}
                alt="Стрелка"
              />
            </i>
          </div>
        )}
        {markets.length > 0 ? (
          <div className="popup__list">
            {markets.map((market, index: number) => (
              <Market
                key={market.name + index}
                name={market.name}
                description={market.description}
                logo={market.logo}
                price={market.price}
                link={market.link}
                productLogoLink={market.productLogoLink}
                saved={market.saved}
              />
            ))}
          </div>
        ) : (
          <h3>Тут пусто...</h3>
        )}
      </div>
    </div>
  );
};

export default Popup;
