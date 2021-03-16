import React, { useEffect, useState } from 'react';
import closeIcon from '../../images/close.svg';
import Market from '../Market';
import { IMarket } from '../ResultsPage';
import './Popup.scss';
import bottomIcon from '../../images/bottom.svg';
import topIcon from '../../images/top.svg';

const Popup = ({
  markets,
  setIsPopupOpened,
  changeOrder,
}: {
  markets: IMarket[];
  setIsPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
  changeOrder: React.Dispatch<React.SetStateAction<IMarket[]>>;
}) => {
  const [order, setOrder] = useState('ascending');

  useEffect(() => {
    const escHandler = (e: any) => {
      if (e.key === 'Escape') {
        setIsPopupOpened(false);
      }
    };

    document.addEventListener('keydown', escHandler);

    return () => {
      return document.removeEventListener('keydown', escHandler);
    };
  });

  const outsideClickHandler = (e: any) => {
    if (e.target.className === 'popup') {
      setIsPopupOpened(false);
    }
  };

  const changeListOrder = () => {
    if (order === 'ascending') {
      changeOrder(markets.sort((first, second) => -first.price + second.price));
      setOrder('descending');
    } else {
      changeOrder(markets.sort((first, second) => first.price - second.price));
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
          onClick={() => setIsPopupOpened(false)}
        />
        <h3 className="popup__title">Наличие товара в магазинах.</h3>
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
        <div className="popup__list">
          {markets.map((market, index: number) => (
            <Market
              key={market.name + index}
              name={market.name}
              description={market.description}
              logo={market.link}
              price={market.price}
              link={market.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
