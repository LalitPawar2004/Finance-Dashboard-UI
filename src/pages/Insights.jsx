import { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Insights = () => {
  const { transactions } = useAppContext();

  // Calculate insights data
  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const income = transactions.filter((t) => t.type === "income");

    // Current date info
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Filter transactions by month
    const currentMonthExpenses = expenses.filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const lastMonthExpenses = expenses.filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
      );
    });

    // Calculate monthly totals
    const currentMonthTotal = currentMonthExpenses.reduce(
      (sum, t) => sum + t.amount,
      0,
    );
    const lastMonthTotal = lastMonthExpenses.reduce(
      (sum, t) => sum + t.amount,
      0,
    );

    // Calculate monthly change
    const monthlyChange =
      lastMonthTotal === 0
        ? 100
        : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

    // Highest spending category
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const highestCategory = Object.entries(categoryTotals).reduce(
      (max, [category, amount]) =>
        amount > max.amount ? { category, amount } : max,
      { category: "None", amount: 0 },
    );

    // Biggest single expense
    const biggestExpense =
      expenses.length > 0
        ? expenses.reduce(
            (max, t) => (t.amount > max.amount ? t : max),
            expenses[0],
          )
        : null;

    // Average expense per transaction
    const avgExpense =
      expenses.length > 0
        ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length
        : 0;

    // Top 3 categories by spending
    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, amount]) => ({ name, amount }));

    // Calculate total spending
    const totalSpending = expenses.reduce((sum, t) => sum + t.amount, 0);

    // Calculate percentage of total for each top category
    const topCategoriesWithPercentage = topCategories.map((cat) => ({
      ...cat,
      percentage: ((cat.amount / totalSpending) * 100).toFixed(1),
    }));

    // Calculate savings rate (if income exists)
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const savingsRate =
      totalIncome > 0
        ? (((totalIncome - totalSpending) / totalIncome) * 100).toFixed(1)
        : 0;

    // Generate recommendations
    const recommendations = [];

    if (savingsRate < 20 && savingsRate > 0) {
      recommendations.push({
        type: "warning",
        message: `Your savings rate is ${savingsRate}%. Consider reducing expenses to save at least 20% of your income.`,
        icon: AlertCircle,
      });
    }

    if (monthlyChange > 10 && monthlyChange <= 50) {
      recommendations.push({
        type: "warning",
        message: `Your spending increased by ${monthlyChange.toFixed(1)}% compared to last month. Review your expenses.`,
        icon: TrendingUp,
      });
    } else if (monthlyChange < -10) {
      recommendations.push({
        type: "success",
        message: `Great job! Your spending decreased by ${Math.abs(monthlyChange).toFixed(1)}% compared to last month.`,
        icon: TrendingDown,
      });
    }

    if (highestCategory.amount > totalSpending * 0.4) {
      recommendations.push({
        type: "info",
        message: `${highestCategory.category} accounts for ${((highestCategory.amount / totalSpending) * 100).toFixed(1)}% of your spending. Consider diversifying your expenses.`,
        icon: ShoppingBag,
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: "success",
        message:
          "Great financial habits! Keep up the good work managing your expenses.",
        icon: DollarSign,
      });
    }

    return {
      highestCategory,
      biggestExpense,
      avgExpense,
      topCategoriesWithPercentage,
      monthlyChange,
      currentMonthTotal,
      lastMonthTotal,
      savingsRate,
      totalSpending,
      recommendations,
    };
  }, [transactions]);

  // At the beginning of the Insights component after useMemo:
  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Financial Insights
          </h2>
          <p className="text-gray-600 mt-1">Analyze your spending patterns</p>
        </div>
        <EmptyState
          message="No expense data available"
          subMessage="Add some expense transactions to see insights and recommendations"
        />
      </div>
    );
  }

  const getTrendIcon = (change) => {
    if (change > 0) return <TrendingUp className="text-red-500" size={20} />;
    if (change < 0)
      return <TrendingDown className="text-green-500" size={20} />;
    return null;
  };

  const getTrendColor = (change) => {
    if (change > 0) return "text-red-600";
    if (change < 0) return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Financial Insights</h2>
        <p className="text-gray-600 mt-1">
          Analyze your spending patterns and get personalized recommendations
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">
              Highest Spending Category
            </h3>
            <ShoppingBag size={20} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {insights.highestCategory.category}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ${insights.highestCategory.amount.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">
              Monthly Comparison
            </h3>
            <Calendar size={20} className="text-blue-500" />
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold text-gray-900">
              ${insights.currentMonthTotal.toLocaleString()}
            </p>
            {getTrendIcon(insights.monthlyChange)}
            <p
              className={`text-sm font-medium ${getTrendColor(insights.monthlyChange)}`}
            >
              {insights.monthlyChange > 0 ? "+" : ""}
              {insights.monthlyChange.toFixed(1)}%
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            vs ${insights.lastMonthTotal.toLocaleString()} last month
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">
              Average Transaction
            </h3>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${insights.avgExpense.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Per expense transaction</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Savings Rate</h3>
            <TrendingUp size={20} className="text-indigo-500" />
          </div>
          <p
            className={`text-2xl font-bold ${insights.savingsRate >= 20 ? "text-green-600" : "text-orange-600"}`}
          >
            {insights.savingsRate}%
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {insights.savingsRate >= 20
              ? "Healthy rate"
              : "Room for improvement"}
          </p>
        </div>
      </div>

      {/* Top Categories and Biggest Expense */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spending Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Spending Categories
          </h3>
          <div className="space-y-4">
            {insights.topCategoriesWithPercentage.map((category, index) => (
              <div key={category.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">
                    {category.name}
                  </span>
                  <span className="text-gray-600">
                    ${category.amount.toLocaleString()} ({category.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            {insights.topCategoriesWithPercentage.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No expense data available
              </p>
            )}
          </div>
        </div>

        {/* Biggest Expense */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Largest Transaction
          </h3>
          {insights.biggestExpense ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600 font-medium mb-2">
                  Largest Expense
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ${insights.biggestExpense.amount.toLocaleString()}
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  {insights.biggestExpense.description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {insights.biggestExpense.category} | Date:{" "}
                  {insights.biggestExpense.date}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium mb-2">
                  Quick Tip
                </p>
                <p className="text-gray-700 text-sm">
                  Large one-time expenses are normal. Consider budgeting for
                  occasional large purchases to avoid surprises.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No expense transactions recorded
            </p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Smart Recommendations
        </h3>
        <div className="space-y-3">
          {insights.recommendations.map((rec, index) => {
            const Icon = rec.icon;
            const bgColor =
              rec.type === "warning"
                ? "bg-yellow-50 border-yellow-200"
                : rec.type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-blue-50 border-blue-200";
            const textColor =
              rec.type === "warning"
                ? "text-yellow-800"
                : rec.type === "success"
                  ? "text-green-800"
                  : "text-blue-800";
            const iconColor =
              rec.type === "warning"
                ? "text-yellow-600"
                : rec.type === "success"
                  ? "text-green-600"
                  : "text-blue-600";

            return (
              <div
                key={index}
                className={`${bgColor} border rounded-lg p-4 flex items-start space-x-3`}
              >
                <Icon className={`${iconColor} mt-0.5`} size={20} />
                <p className={`${textColor} text-sm flex-1`}>{rec.message}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Spending Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Monthly Spending Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-blue-100 text-sm">Total Spending (This Month)</p>
            <p className="text-2xl font-bold">
              ${insights.currentMonthTotal.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Total Spending (Last Month)</p>
            <p className="text-2xl font-bold">
              ${insights.lastMonthTotal.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Monthly Trend</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold">
                {insights.monthlyChange > 0 ? "+" : ""}
                {insights.monthlyChange.toFixed(1)}%
              </p>
              {insights.monthlyChange > 0 ? (
                <TrendingUp size={24} />
              ) : insights.monthlyChange < 0 ? (
                <TrendingDown size={24} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
