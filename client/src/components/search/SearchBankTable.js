import React from "react";
import PropTypes from "prop-types";

const SearchBankTable = ({ bankResult }) => {
  return (
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
        {bankResult.map((bank, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <div className='table-img-link'>
                <img src={bank.image && bank.image} alt='' />
                <a
                  href={`https://en.wikipedia.org/wiki/${
                    bank.title ? bank.title : "List_of_central_banks"
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
  );
};

SearchBankTable.propTypes = {
  bankResult: PropTypes.array.isRequired,
};

export default SearchBankTable;
