import './StartPage.scss';

const StartPage = () => (
  <div className="start-page">
    <header className="header">
      <p className="header__logo">Lumberjacks</p>
    </header>
    <main className="main">
      <h1 className="main__title">Поиск товаров</h1>
      <p className="main__subtitle">
        Выбирайте товар мечты из лучших предложений
      </p>
      <form className="main__form">
        <input
          type="text"
          className="main__input"
          placeholder="Введите название товара"
        />
        <button className="main__button">Найти</button>
      </form>
    </main>
  </div>
);

export default StartPage;
