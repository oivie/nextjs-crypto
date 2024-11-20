export const exportToCSV = (data: any[], fileName: string) => {
    const headers = ["ID", "Name", "Current Price", "Market Cap", "24h Change", "Favorite"];
    const rows = data.map((item) => [
      item.id,
      item.name,
      item.current_price,
      item.market_cap,
      item.price_change_percentage_24h,
      item.favorite ? "Yes" : "No",
    ]);
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  