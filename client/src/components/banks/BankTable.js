import React from 'react';
import { useSelector } from 'react-redux';
import { selectBanks, selectLoading } from '../../features/banks/banksSlice';
import Loader from '../utils/Loader';

const BankTable = () => {
  const banks = useSelector(selectBanks);
  const loading = useSelector(selectLoading);

  return (
    <div className='main-content-container'>
      <table className='main-table lg-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Central Bank</th>
            <th>Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className='table-img-link'>
                  <img src={bank.image && bank.image} alt='' />
                  <a
                    href={`https://en.wikipedia.org/wiki/${
                      bank.title ? bank.title : 'List_of_central_banks'
                    }`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {bank.central_bank && bank.central_bank}
                  </a>
                </div>
              </td>
              <td>{bank.central_bank_alt && bank.central_bank_alt}</td>
              <td>{bank.country && bank.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <Loader />}
    </div>
  );
};

export default BankTable;
