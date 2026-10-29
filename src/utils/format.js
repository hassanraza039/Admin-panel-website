export const uid = (prefix) => prefix + Math.random().toString(36).slice(2, 8);

export const formatMoney = (n) => "Rs " + n.toLocaleString("en-PK");

export const statusClass = {
  Pending: "status-pending",
  Shipped: "status-shipped",
  Delivered: "status-delivered",
  Cancelled: "status-cancelled",
};

export const buildCustomers = (orders) => {
  const map = {};
  orders.forEach((o) => {
    const key = o.email || o.customer;
    if (!map[key]) {
      map[key] = { id: key, name: o.customer, email: o.email || "", orders: 0, spent: 0 };
    }
    map[key].orders += 1;
    if (o.status !== "Cancelled") map[key].spent += o.total;
  });
  return Object.values(map);
};