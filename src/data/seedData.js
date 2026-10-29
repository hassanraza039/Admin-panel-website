export const seedProducts = [
  { id: "p1", name: "Wireless Earbuds Pro", category: "Electronics", price: 2499, stock: 42, sold: 128 },
  { id: "p2", name: "Cotton Kurta - Blue", category: "Fashion", price: 899, stock: 6, sold: 76 },
  { id: "p3", name: "Steel Water Bottle 1L", category: "Home", price: 349, stock: 3, sold: 210 },
  { id: "p4", name: "Bluetooth Speaker Mini", category: "Electronics", price: 1299, stock: 58, sold: 64 },
  { id: "p5", name: "Yoga Mat Premium", category: "Fitness", price: 799, stock: 24, sold: 95 },
  { id: "p6", name: "Leather Wallet", category: "Fashion", price: 649, stock: 0, sold: 143 },
];

export const seedOrders = [
  { id: "ORD-1042", customer: "Ahmed Raza", total: 2499, status: "Delivered", date: "09-05" },
  { id: "ORD-1043", customer: "Ayesha Khan", total: 1648, status: "Shipped", date: "09-06" },
  { id: "ORD-1044", customer: "Bilal Hussain", total: 349, status: "Pending", date: "09-07" },
  { id: "ORD-1045", customer: "Sana Malik", total: 899, status: "Cancelled", date: "09-07" },
  { id: "ORD-1046", customer: "Ahmed Raza", total: 1299, status: "Delivered", date: "09-08" },
  { id: "ORD-1047", customer: "Usman Tariq", total: 799, status: "Pending", date: "09-09" },
];

export const seedCustomers = [
  { id: "c1", name: "Ahmed Raza", email: "ahmed.raza@mail.com", orders: 2, spent: 3798 },
  { id: "c2", name: "Ayesha Khan", email: "ayesha.khan@mail.com", orders: 1, spent: 1648 },
  { id: "c3", name: "Bilal Hussain", email: "bilal.hussain@mail.com", orders: 1, spent: 349 },
  { id: "c4", name: "Sana Malik", email: "sana.malik@mail.com", orders: 1, spent: 899 },
  { id: "c5", name: "Usman Tariq", email: "usman.tariq@mail.com", orders: 1, spent: 799 },
];
