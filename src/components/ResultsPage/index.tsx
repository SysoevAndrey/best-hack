import React, { useEffect, useState } from 'react';
import Header from '../Header';
import './ResultsPage.scss';
import Good from '../Good';
import Popup from '../Popup';

import mock from '../../data.json';

interface IDataFromServer {
  category: string;
  total: number;
  list: IGoodItem[];
}

export interface IGoodItem {
  name: string;
  rating: number;
  popularity: number;
  averagePrice: number;
  logo: string;
  markets: IMarket[];
}

export interface IMarket {
  name: string;
  description: string;
  logo: string;
  price: number;
  link: string;
}

const ResultsPage = ({
  keyword,
  onSetKeyword,
}: {
  keyword: string;
  onSetKeyword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [data, setData] = useState<IDataFromServer>({
    category: '',
    total: 0,
    list: [],
  });

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [popupContent, setPopupContent] = useState<IMarket[]>([]);

  useEffect(() => {
    if (keyword) {
      setTimeout(() => {
        setData(mock);
      }, 2000);
    }
  }, [keyword]);

  return (
    <div className="results-page">
      {isPopupOpened && (
        <Popup
          setIsPopupOpened={setIsPopupOpened}
          markets={popupContent}
          changeOrder={setPopupContent}
        />
      )}
      <Header
        isIconVisibvle
        isInputVisible
        keyword={keyword}
        onSetKeyword={onSetKeyword}
      />
      <main className="results">
        <h2 className="results__overall">
          Найдено {data.total} товаров в категрии "{data.category}".
        </h2>
        <div className="results__container">
          {data.list.map((good, index: number) => (
            <Good
              key={good.name + index}
              name={good.name}
              logo={good.logo}
              rating={good.rating}
              popularity={good.popularity}
              averagePrice={good.averagePrice}
              markets={good.markets}
              setIsPopupOpened={setIsPopupOpened}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
