import React from 'react';
import { useFilterContext } from '../../context';
import mock from '../../data.json';
import useDidUpdateEffect from '../../utils/useDidUpdateEffect';
import Good from '../Good';
import Header from '../Header';
import Popup from '../Popup';
import './ResultsPage.scss';

export interface IDataFromServer {
  category: string;
  total: number;
  list: IGood[];
}

export interface IGood {
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
  saved?: boolean;
  productLogoLink?: string;
}

const ResultsPage = () => {
  const {
    state: { keyword, data, isPopupOpened, popupContent, cartData },
    dispatch,
  } = useFilterContext();

  useDidUpdateEffect(() => {
    if (keyword) {
      const fetchData = async () => {
        const response = await fetch(
          'https://localhost:44383/api/store?query=' + keyword
        );

        const mock = await response.json();

        dispatch({
          type: 'SET_DATA',
          payload: {
            ...mock,
            list: mock.list.map((product: any) => ({
              ...product,
              markets: product.markets.map((market: any) => ({
                ...market,
                productLogoLink: product.logo,
                saved: cartData.some(
                  (item) => item.productLogoLink === product.logo
                ),
              })),
            })),
          },
        });
      };

      fetchData();
    }
  }, [keyword]);

  return (
    <div className="results-page">
      {isPopupOpened && (
        <Popup markets={popupContent.data} title={popupContent.title} />
      )}
      <Header isIconVisibvle isInputVisible />
      <main className="results">
        <h2 className="results__overall">
          Найдено {data.total} товаров в категрии "{data.category}".
        </h2>
        <div className="results__container">
          {data.list.map((good: any, index: number) => (
            <Good
              key={good.name + index}
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
