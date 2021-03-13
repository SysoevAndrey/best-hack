import React, { useState } from 'react';
import savedIcon from '../../images/saved.svg';
import './Header.scss';

const Header = ({
  isIconVisibvle,
  isInputVisible,
  keyword,
  onSetKeyword,
}: {
  isIconVisibvle?: boolean;
  isInputVisible?: boolean;
  keyword?: string;
  onSetKeyword?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [inputValue, setInputValue] = useState(keyword);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSetKeyword!(inputValue!);
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
        <img className="header__icon" src={savedIcon} alt="Иконка корзины" />
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
