import TransactionItem from './TransactionItem';
import EmptyState from '../common/EmptyState';

const TransactionList = ({ transactions, userRole, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return <EmptyState message="No transactions found" subMessage="Try adjusting your filters or add a new transaction" />;
  }

  return (
    <div className="divide-y divide-gray-100">
      {transactions.map(transaction => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          userRole={userRole}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TransactionList;