import React, { useContext, useReducer } from 'react';
import { IDataFromServer, IMarket } from '../components/ResultsPage';

interface IInitialState {
  keyword: string;
  data: IDataFromServer;
  isPopupOpened: boolean;
  popupContent: { title: string; data: IMarket[]; type: 'default' | 'cart' };
  cartData: IMarket[];
}

const initialState: IInitialState = {
  keyword: '',
  data: { total: 0, category: '', list: [] },
  isPopupOpened: false,
  popupContent: { title: '', data: [], type: 'default' },
  cartData: [],
};

const reducer = (
  state: IInitialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case 'SET_KEYWORD':
      return {
        ...state,
        keyword: payload,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: payload,
      };
    case 'SET_POPUP_STATE':
      return {
        ...state,
        isPopupOpened: payload,
      };
    case 'SET_POPUP_CONTENT':
      return {
        ...state,
        popupContent: payload,
      };
    case 'SET_CART_DATA':
      return {
        ...state,
        cartData: payload,
      };
    default:
      return state;
  }
};

const FilterProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FilterContext.Provider>
  );
};

const FilterContext = React.createContext<{
  state: IInitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useFilterContext = () => useContext(FilterContext);

export { FilterContext, FilterProvider, initialState };
