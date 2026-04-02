import { Inbox } from 'lucide-react';

const EmptyState = ({ message = "No data available", subMessage = "Add some transactions to get started" }) => {
  return (
    <div className="text-center py-12">
      <Inbox className="mx-auto text-gray-400 mb-4" size={48} />
      <p className="text-gray-500 text-lg">{message}</p>
      <p className="text-gray-400 text-sm mt-2">{subMessage}</p>
    </div>
  );
};

export default EmptyState;