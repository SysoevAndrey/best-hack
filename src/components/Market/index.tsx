import React from 'react';
import { IGood, IMarket } from '../ResultsPage';
import './Market.scss';
import goIcon from '../../images/go.svg';
import savedIcon from '../../images/save.svg';
import saveIcon from '../../images/saved-dark.svg';
import { useFilterContext } from '../../context';

const Market = ({
  name,
  description,
  logo,
  price,
  link,
  productLogoLink,
  saved,
}: IMarket) => {
  const {
    state: { cartData, data },
    dispatch,
  } = useFilterContext();

  const onSave = (link: string) => {
    const newData = cartData.some((item) => item.link === link)
      ? cartData.filter((item) => item.link !== link)
      : [
          ...cartData,
          {
            name,
            description,
            logo,
            price,
            link,
            productLogoLink,
            saved: !saved,
          },
        ];

    dispatch({ type: 'SET_CART_DATA', payload: newData });

    const newMainData = {
      ...data,
      list: data.list.map((good: IGood) =>
        good.logo === productLogoLink
          ? {
              ...good,
              markets: good.markets.map((market: IMarket) =>
                market.link === link
                  ? { ...market, saved: !market.saved }
                  : market
              ),
            }
          : good
      ),
    };

    dispatch({
      type: 'SET_DATA',
      payload: newMainData,
    });
  };

  return (
    <div className="market">
      <img className="market__logo" src={logo} alt={`Лого ${name}`} />
      <div className="market__info">
        <h3 className="market__name">{name}</h3>
        <p className="market__description">{description}</p>
      </div>
      <p className="market__price">{price} &#8381;</p>
      <i className="market__save" onClick={() => onSave(link)}>
        <img
          className="market__save-icon"
          src={saved ? savedIcon : saveIcon}
          alt="Закладка"
        />
      </i>
      <a href={link} rel="noreferrer" target="_blank">
        <img className="market__go" src={goIcon} alt="Стрелка вправо" />
      </a>
    </div>
  );
};

export default Market;
