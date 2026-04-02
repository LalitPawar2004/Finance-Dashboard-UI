import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Load from localStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('userRole');
    return saved || 'admin';
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const addTransaction = (newTransaction) => {
    setTransactions(prev => [
      {
        id: Date.now(),
        ...newTransaction,
        date: newTransaction.date || new Date().toISOString().split('T')[0]
      },
      ...prev
    ]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const value = {
    transactions,
    userRole,
    setUserRole,
    addTransaction,
    editTransaction,
    deleteTransaction
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};