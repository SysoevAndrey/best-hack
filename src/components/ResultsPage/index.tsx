import React, { useEffect, useState } from 'react';
import Header from '../Header';
import './ResultsPage.scss';
import Good from '../Good';

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

  useEffect(() => {
    if (keyword) {
      setTimeout(() => {
        console.log('hello');
        setData(mock);
      }, 0);
    }
  }, [keyword]);

  return (
    <div className="results-page">
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
          {data.list.map((good) => (
            <Good
              name={good.name}
              logo={good.logo}
              rating={good.rating}
              popularity={good.popularity}
              averagePrice={good.averagePrice}
              markets={good.markets}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
