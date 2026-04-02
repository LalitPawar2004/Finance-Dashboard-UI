import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const SummaryCards = ({ totalBalance, totalIncome, totalExpenses }) => {
  const cards = [
    {
      title: 'Total Balance',
      value: `$${totalBalance.toLocaleString()}`,
      icon: Wallet,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      icon: ArrowUpCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      icon: ArrowDownCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
              <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-full`}>
              <card.icon className={`${card.textColor}`} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;