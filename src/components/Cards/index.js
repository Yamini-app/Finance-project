import React from 'react';
import "./styles.css";
import { Button, Card, Row } from 'antd';

function Cards({income, expense, totalBalance, showExpenseModal, showIncomeModal}) {
  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹{totalBalance}</p>
          <Button type="primary" className='button-spend'>Reset balance</Button>
        </Card>

        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button type="primary"  className='button-spend' onClick={showIncomeModal}>Add Income</Button>
        </Card>

        <Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>₹{expense}</p>
          <Button type="primary" className='button-spend' onClick={showExpenseModal}>Add Expense</Button>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;

