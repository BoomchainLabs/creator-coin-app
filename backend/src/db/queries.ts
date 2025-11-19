import sqlite3 from 'sqlite3';
import { Creator, Coin, Transaction, Holding, Portfolio } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

export const queries = {
  // Creator queries
  getCreators: (db: sqlite3.Database): Promise<Creator[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM creators ORDER BY followers DESC', (err, rows) => {
        if (err) reject(err);
        else resolve((rows as any[]) || []);
      });
    });
  },

  getCreatorById: (db: sqlite3.Database, id: string): Promise<Creator | null> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM creators WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve((row as Creator) || null);
      });
    });
  },

  // Coin queries
  getCoins: (db: sqlite3.Database): Promise<Coin[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM coins ORDER BY market_cap DESC', (err, rows) => {
        if (err) reject(err);
        else resolve((rows as any[]) || []);
      });
    });
  },

  getCoinById: (db: sqlite3.Database, id: string): Promise<Coin | null> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM coins WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve((row as Coin) || null);
      });
    });
  },

  // Transaction queries
  addTransaction: (db: sqlite3.Database, transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const createdAt = new Date().toISOString();
      db.run(
        'INSERT INTO transactions (id, wallet_address, coin_id, type, amount, price, total_value, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, transaction.walletAddress, transaction.coinId, transaction.type, transaction.amount, transaction.price, transaction.totalValue, transaction.status, createdAt],
        (err) => {
          if (err) reject(err);
          else resolve({ ...transaction, id, createdAt });
        }
      );
    });
  },

  getTransactionsByWallet: (db: sqlite3.Database, walletAddress: string): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM transactions WHERE wallet_address = ? ORDER BY created_at DESC LIMIT 50', [walletAddress], (err, rows) => {
        if (err) reject(err);
        else resolve((rows as any[]) || []);
      });
    });
  },

  // Holdings queries
  getHoldings: (db: sqlite3.Database, walletAddress: string): Promise<Holding[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM holdings WHERE wallet_address = ?', [walletAddress], (err, rows) => {
        if (err) reject(err);
        else resolve((rows as any[]) || []);
      });
    });
  },

  updateHolding: (db: sqlite3.Database, walletAddress: string, coinId: string, amount: number, price: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM holdings WHERE wallet_address = ? AND coin_id = ?', [walletAddress, coinId], (err, row: any) => {
        if (err) reject(err);
        else if (!row) {
          const id = uuidv4();
          db.run(
            'INSERT INTO holdings (id, wallet_address, coin_id, amount, average_purchase_price) VALUES (?, ?, ?, ?, ?)',
            [id, walletAddress, coinId, amount, price],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        } else {
          const newAmount = row.amount + amount;
          const newAvgPrice = (row.average_purchase_price * row.amount + price * amount) / newAmount;
          db.run(
            'UPDATE holdings SET amount = ?, average_purchase_price = ?, updated_at = CURRENT_TIMESTAMP WHERE wallet_address = ? AND coin_id = ?',
            [newAmount, newAvgPrice, walletAddress, coinId],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        }
      });
    });
  },

  getPortfolio: (db: sqlite3.Database, walletAddress: string): Promise<Portfolio> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM holdings WHERE wallet_address = ?', [walletAddress], async (err, holdings: any[]) => {
        if (err) reject(err);
        else {
          let totalValue = 0;
          let gainLoss = 0;

          for (const holding of holdings) {
            const coin = await new Promise<Coin>((res) => {
              db.get('SELECT * FROM coins WHERE id = ?', [holding.coin_id], (e, row) => {
                res(row as Coin);
              });
            });

            const currentValue = holding.amount * coin.price;
            const purchaseValue = holding.amount * holding.average_purchase_price;
            totalValue += currentValue;
            gainLoss += currentValue - purchaseValue;
          }

          resolve({ walletAddress, holdings, totalValue, gainLoss });
        }
      });
    });
  },
};
