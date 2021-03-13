import React, { useEffect, useState } from 'react';
import Header from '../Header';
import './ResultsPage.scss';

import mock from '../../data.json';

interface IDataFromServer {
  total: number;
  list: IGoodItem[];
}

interface IGoodItem {
  name: string;
  rating: number;
  popularity: number;
  averagePrice: number;
  markets: IMarket[];
}

interface IMarket {
  name: string;
  price: number;
}

const ResultsPage = ({
  keyword,
  onSetKeyword,
}: {
  keyword: string;
  onSetKeyword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [data, setData] = useState<IDataFromServer>({ total: 0, list: [] });

  useEffect(() => {
    if (keyword) {
      setTimeout(() => {
        setData(mock);
      }, 2000);
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
          Всего найдено товаров: {data.total}.
        </h2>
        <div className="results__container"></div>
      </main>
    </div>
  );
};

export default ResultsPage;
