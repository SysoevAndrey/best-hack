import React, { useEffect } from 'react';
import useDidUpdateEffect from '../../utils/useDidUpdateEffect';
import Header from '../Header';

const ResultsPage = ({
  keyword,
  onSetKeyword,
}: {
  keyword: string;
  onSetKeyword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useDidUpdateEffect(() => {
    console.log('eheheh');
  }, [keyword]);

  return (
    <>
      <Header
        isIconVisibvle
        isInputVisible
        keyword={keyword}
        onSetKeyword={onSetKeyword}
      />
      <h1>{keyword}</h1>
    </>
  );
};

export default ResultsPage;
