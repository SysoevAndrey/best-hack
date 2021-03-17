import React, { useEffect, useState } from 'react';
import { useFilterContext } from '../../context';
import savedIcon from '../../images/saved.svg';
import useDidMountEffect from '../../utils/useDidUpdateEffect';
import './Header.scss';

const Header = ({
  isIconVisibvle,
  isInputVisible,
}: {
  isIconVisibvle?: boolean;
  isInputVisible?: boolean;
}) => {
  const {
    state: { keyword, cartData, popupContent },
    dispatch,
  } = useFilterContext();

  const [inputValue, setInputValue] = useState('');

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({ type: 'SET_KEYWORD', payload: inputValue });
  };

  useDidMountEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  useEffect(() => {
    if (popupContent.type === 'cart') {
      dispatch({
        type: 'SET_POPUP_CONTENT',
        payload: { ...popupContent, data: cartData },
      });
    }
  }, [cartData]);

  const onIconClick = () => {
    dispatch({
      type: 'SET_POPUP_CONTENT',
      payload: { title: 'Сохраненные товары', type: 'cart', data: cartData },
    });
    dispatch({ type: 'SET_POPUP_STATE', payload: true });
  };

  return (
    <header className="header">
      <div className="header__container">
        <p className="header__logo">Lumberjacks</p>
        {isInputVisible && (
          <form className="header__form" onSubmit={(e) => onFormSubmit(e)}>
            <input
              className="input header__input"
              value={inputValue}
              placeholder="Товар"
              onChange={({ target: { value } }) => setInputValue(value)}
            />
          </form>
        )}
      </div>
      {isIconVisibvle && (
        <img
          className="header__icon"
          onClick={() => onIconClick()}
          src={savedIcon}
          alt="Иконка корзины"
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  isIconVisibvle: false,
  isInputVisible: false,
  keyword: '',
};

export default Header;
