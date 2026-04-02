export const exportToCSV = (transactions) => {
  // Define CSV headers
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  
  // Convert transactions to CSV rows
  const rows = transactions.map(t => [
    t.date,
    t.description,
    t.category,
    t.type,
    t.amount
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};