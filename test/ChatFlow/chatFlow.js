import {
  getStockExchanges,
  getStocksfromStockExchange,
  getMessageWithStockPrice,
} from "../utils/userOptions";
import labels from "../constants/labels";

const flow = {
  start: {
    message: labels.welcomeMessage,
    nextPath: "selectStockExchange",
  },
  selectStockExchange: {
    message: labels.selectStockExchangeMessage,
    options: getStockExchanges,
    nextPath: "selectStock",
    chatDisabled: true,
  },
  selectStock: {
    message: labels.selectStockMessage,
    options: (params) =>
      getStocksfromStockExchange(params?.selectStockExchange),
    nextPath: "showStockPrice",
  },
  showStockPrice: {
    message: (params) => getMessageWithStockPrice(params),
    options: [labels.mainMenu, labels.goback],
    nextPath: (params) => {
      if (params === labels.mainMenu) return "selectStockExchange";
      else if (params === labels.goback) return "selectStock";
    },
  },
};
export default flow;
