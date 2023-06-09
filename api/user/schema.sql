DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS payment;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  price INTEGER NOT NULL,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  status TEXT DEFAULT 'active'
);

CREATE TABLE payment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  paypalid TEXT NOT NULL,
  buyer TEXT NOT NULL,
  amount INTEGER,
  status TEXT NOT NULL
);

