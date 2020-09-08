import React from 'react';
import { useSelector } from 'react-redux';
import { selectView } from '../features/view/viewSlice';
import SearchGrid from '../components/search/SearchGrid';
import SearchTable from '../components/search/SearchTable';

const Home = () => {
  const gridView = useSelector(selectView);

  return gridView ? <SearchGrid /> : <SearchTable />;
};

export default Home;
