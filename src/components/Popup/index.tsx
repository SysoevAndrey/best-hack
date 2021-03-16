import React, { useEffect } from 'react';
import closeIcon from '../../images/close.svg';
import Market from '../Market';
import { IMarket } from '../ResultsPage';
import './Popup.scss';

const Popup = ({
  markets,
  setIsPopupOpened,
}: {
  markets: IMarket[];
  setIsPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
        <div className="popup__list">
          {markets.map((market) => (
            <Market
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
