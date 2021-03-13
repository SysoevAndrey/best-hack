import React from 'react';
import Header from '../Header';

const SecondPage = ({ keyword }: { keyword: string }) => {
  return (
    <>
      <Header isIconVisibvle />
      <h1>{keyword}</h1>
    </>
  );
};

export default SecondPage;
