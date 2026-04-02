import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionModal from '../components/transactions/TransactionModal';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// Inside Transactions component, update handlers:
const handleAddTransaction = (newTransaction) => {
  addTransaction(newTransaction);
  toast.success('Transaction added successfully!');
};

const handleUpdateTransaction = (updatedTransaction) => {
  editTransaction(editingTransaction.id, updatedTransaction);
  setEditingTransaction(null);
  toast.success('Transaction updated successfully!');
};

const handleDeleteTransaction = (id) => {
  if (window.confirm('Are you sure you want to delete this transaction?')) {
    deleteTransaction(id);
    toast.success('Transaction deleted successfully!');
  }
};

const Transactions = () => {
  const { transactions, userRole, addTransaction, editTransaction, deleteTransaction } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const isAdmin = userRole === 'admin';

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(transactions.map(t => t.category))];
    return uniqueCategories.sort();
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, searchTerm, typeFilter, categoryFilter, sortBy]);

  const handleAddTransaction = (newTransaction) => {
    addTransaction(newTransaction);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    editTransaction(editingTransaction.id, updatedTransaction);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleModalSubmit = (data) => {
    if (editingTransaction) {
      handleUpdateTransaction(data);
    } else {
      handleAddTransaction(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transactions</h2>
          <p className="text-gray-600 mt-1">
            {isAdmin ? 'Manage your transaction history' : 'View your transaction history'}
          </p>
        </div>
        
        {isAdmin && (
          <button
            onClick={() => {
              setEditingTransaction(null);
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <TransactionFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={categories}
          />
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </div>
          <TransactionList
            transactions={filteredTransactions}
            userRole={userRole}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleModalSubmit}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default Transactions;