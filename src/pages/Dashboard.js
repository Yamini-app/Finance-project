import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import moment from 'moment/moment';
import { Modal } from 'antd';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/add.Income';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { auth, db } from './firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import TransactionsTable from '../components/Transactionstable';
import ChartComponent from '../components/Charts';
import NoTransactions from '../components/Transactionstable/NoTransactions';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = async (value, type) => {
    const newTransaction = {
      type: type,
      date: value.date.format("YYYY-MM-DD"),
      amount: parseFloat(value.amount),
      tag: value.tag,
      name: value.name,
    };

    if (type === "income") {
      setIncome(income + newTransaction.amount);
      setTotalBalance(totalBalance + newTransaction.amount);
    } else {
      setExpense(expense + newTransaction.amount);
      setTotalBalance(totalBalance - newTransaction.amount);
    }

    await addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      transaction.id = docRef.id; // Include the document ID in the transaction object
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
      setTransactions([...transactions, transaction]);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        let transactionData = doc.data();
        transactionData.id = doc.id; // Include the document ID in the transaction data
        transactionsArray.push(transactionData);
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    })

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading..</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions && transactions.length !==0?(
          <ChartComponent sortedTransactions={sortedTransactions}/>
          ) : (
          <NoTransactions/>
        )}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={(value) => onFinish(value, "expense")}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={(value) => onFinish(value, "income")}
          />
          <TransactionsTable transactions={transactions} addTransaction={addTransaction} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
