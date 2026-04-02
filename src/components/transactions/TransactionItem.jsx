import { ArrowUpCircle, ArrowDownCircle, Edit2, Trash2 } from 'lucide-react';

const TransactionItem = ({ transaction, userRole, onEdit, onDelete }) => {
  const isIncome = transaction.type === 'income';
  const isAdmin = userRole === 'admin';
  
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-4 flex-1">
        <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
          {isIncome ? (
            <ArrowUpCircle className="text-green-600" size={20} />
          ) : (
            <ArrowDownCircle className="text-red-600" size={20} />
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.category}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
        
        {isAdmin && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;