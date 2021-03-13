import savedIcon from '../../images/saved.svg';
import './Header.scss';

const Header = ({ isIconVisibvle }: { isIconVisibvle?: boolean }) => (
  <header className="header">
    <p className="header__logo">Lumberjacks</p>
    {isIconVisibvle && (
      <img className="header__icon" src={savedIcon} alt="Иконка корзины" />
    )}
  </header>
);

Header.defaultProps = { isIconVisibvle: false };

export default Header;
