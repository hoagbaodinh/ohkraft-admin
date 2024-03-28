import './home.scss';
import React from 'react';
import Widget from '../../components/widget/Widget';
import TransactionPage from '../transaction/Transaction';

const Home = () => {
  return (
    <>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="earning" />
        <Widget type="order" />
      </div>

      <div className="listContainer">
        <TransactionPage title="History" />
      </div>
    </>
  );
};

export default Home;
