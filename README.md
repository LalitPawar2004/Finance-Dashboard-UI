# Finance Dashboard

A modern, responsive finance dashboard application built with React and Tailwind CSS. This application helps users track their financial activities, manage transactions, and gain valuable insights into their spending patterns.

## 🚀 Live Demo

https://project-atia4.vercel.app/

## 📋 Features

### Core Features
- **Dashboard Overview**: View financial summary with interactive charts
  - Total Balance, Income, and Expenses summary cards
  - Balance trend line chart
  - Spending breakdown pie chart by category

- **Transaction Management**: Full CRUD operations with filtering
  - Add, edit, and delete transactions (Admin only)
  - Search by description
  - Filter by transaction type (Income/Expense) and category
  - Sort by date or amount
  - Real-time transaction count updates

- **Role-Based Access Control**: Simulated roles with UI adaptation
  - **Admin**: Full access - Add, edit, delete transactions, export data
  - **Viewer**: Read-only access - Can only view transactions
  - Role switcher in header for demonstration

- **Financial Insights**: Smart analytics and recommendations
  - Highest spending category
  - Monthly spending comparison
  - Average transaction value
  - Savings rate calculation
  - Top spending categories with progress bars
  - Largest expense highlight
  - Personalized recommendations based on spending patterns

### Additional Features
- 💾 **Data Persistence**: All data saved to localStorage
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 📤 **Export Functionality**: Export transactions to CSV (Admin only)
- 🔔 **Toast Notifications**: User feedback for all actions
- 🎨 **Clean UI**: Professional dashboard design with smooth animations
- 🎯 **Empty States**: Graceful handling when no data exists

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **Build Tool**: Vite

## 📁 Project Structure
