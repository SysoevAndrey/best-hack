import React from 'react';
import { IMarket } from '../ResultsPage';
import './Market.scss';
import goIcon from '../../images/go.svg';

const Market = ({ name, description, logo, price, link }: IMarket) => (
  <div className="market">
    <div className="market__info">
      <a href={link} rel="noreferrer" target="_blank">
        <img
          className="market__logo"
          src={
            logo ? logo : 'https://semantic-ui.com/images/wireframe/image.png'
          }
          alt={`Лого ${name}`}
        />
      </a>
      <div className="market__data">
        <h3 className="market__name">{name}</h3>
        <p className="market__description">{description}</p>
      </div>
    </div>
    <p className="market__price">{price} &#8381;</p>
    <img className="market__go" src={goIcon} alt="Стрелка вправо" />
  </div>
);

export default Market;
