import React from 'react';
import { Line } from '@ant-design/charts';
import { PieChart } from '@mui/x-charts/PieChart';

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  let newSpendings = [
    { id: 0, value: 0, label: 'food' },
    { id: 1, value: 5, label: 'education' },
    { id: 2, value: 0, label: 'office' },
  ];

  spendingData.forEach((item) => {
    if (item.tag === 'food') {
      newSpendings[0].value += item.amount;
    } else if (item.tag === 'education') {
      newSpendings[1].value += item.amount;
    } else if (item.tag === 'office') {
      newSpendings[2].value += item.amount;
    }
  });

  const config = {
    data: data,
    width: 300,
    autoFit: true,
    xField: 'date',
    yField: 'amount',
  };

  const pieData = newSpendings.map((item) => ({
    id: item.id,
    value: item.value,
    label: item.label,
  }));

  return (
    <div className="charts-wrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='chart-1'>
        <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
        <Line {...config} />
      </div>
      <div className='chart-2'>
        <h2>Your Spendings</h2>
        <PieChart
          margin={{ top: 0, bottom: 0, left: 0, right: 150 }}
          series={[
            {
              type: 'pie',
              data: pieData,
            },
          ]}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
            },
          }}
          width={450}
          height={450}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
