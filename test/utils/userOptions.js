import data from "../data/stockdata.json";

const getStockExchanges = () => {
  const stockExchanges = data?.map((item) => {
    return item.stockExchange;
  });
  return stockExchanges;
};

const getStocksfromStockExchange = (userInput) => {
  const stockExchange = data?.find((item) => item.stockExchange === userInput);
  const stocks = stockExchange?.topStocks.map((item) => item.stockName);
  return stocks;
};

const getMessageWithStockPrice = (userResponseHistory) => {
  const stockExchange = data?.find(
    (item) => item.stockExchange === userResponseHistory.showStockExchanges
  );
  const stock = stockExchange?.topStocks.find(
    (item) => item.stockName === userResponseHistory.showStocks
  );
  return `Stock Price of ${userResponseHistory?.showStocks} is ${stock?.price}. Please select an option`;
};

export {
  getStockExchanges,
  getStocksfromStockExchange,
  getMessageWithStockPrice,
};
