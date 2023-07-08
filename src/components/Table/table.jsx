import React from "react";

const Table = ({ header, data }) => {
  return (
    <div className="half">
      <div style={{textAlign: "center", marginBottom: "8px"}}><b>{header}</b></div>
      <div className="grid">
        <div>Trading Party</div>
        <div>Counter Party</div>
        <div>Amount</div>
        {data.map((transaction) => {
          return (
            <>
              <div>{transaction.tradingParty}</div>
              <div>{transaction.counterParty}</div>
              <div>{Math.abs(transaction.amount)}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
