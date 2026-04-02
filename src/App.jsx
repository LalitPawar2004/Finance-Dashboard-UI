import { useState, useMemo } from "react";
import Layout from "./components/layout/Layout";
import SummaryCards from "./components/dashboard/SummaryCards";
import BalanceTrend from "./components/dashboard/BalanceTrend";
import SpendingBreakdown from "./components/dashboard/SpendingBreakdown";
import Transactions from "./pages/Transactions";
import { AppProvider, useAppContext } from "./context/AppContext";
import Insights from "./pages/Insights";

function DashboardContent() {
  const { transactions, userRole } = useAppContext();
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Calculate summary metrics
  const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: income - expenses,
    };
  }, [transactions]);

  // Prepare balance trend data
  const balanceTrendData = useMemo(() => {
    let runningBalance = 0;

    return [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((t) => {
        runningBalance += t.type === "income" ? t.amount : -t.amount;
        return {
          date: t.date,
          balance: runningBalance,
        };
      });
  }, [transactions]);

  // Prepare spending breakdown data
  const spendingBreakdownData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categoryMap = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const renderPage = () => {
    switch (currentPage) {
      case "transactions":
        return <Transactions />;
      case "insights":
        return <Insights />;
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's your financial overview
                {userRole === "viewer" && " (Viewer Mode - Read Only)"}
              </p>
            </div>

            <SummaryCards
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BalanceTrend data={balanceTrendData} />
              <SpendingBreakdown data={spendingBreakdownData} />
            </div>
          </div>
        );
    }
  };

  return (
    <Layout activePage={currentPage} onPageChange={setCurrentPage}>
      <div className="animate-fade-in">{renderPage()}</div>
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}

export default App;
