export const uid = (prefix) => prefix + Math.random().toString(36).slice(2, 8);
export const formatMoney = (n) => "Rs " + n.toLocaleString("en-PK");
export const statusClass = {
  Pending: "status-pending",
  Shipped: "status-shipped",
  Delivered: "status-delivered",
  Cancelled: "status-cancelled",
};
