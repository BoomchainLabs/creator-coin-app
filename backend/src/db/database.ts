import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.DATABASE_URL?.replace('sqlite:', '') || path.join(__dirname, '../../creator-coins.db');

export async function initializeDatabase() {
  const db = new sqlite3.Database(DB_PATH);
  
  return new Promise<sqlite3.Database>((resolve, reject) => {
    db.serialize(() => {
      // Creators table
      db.run(`
        CREATE TABLE IF NOT EXISTS creators (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          bio TEXT,
          avatar_url TEXT,
          wallet_address TEXT NOT NULL UNIQUE,
          followers INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Creator Coins table
      db.run(`
        CREATE TABLE IF NOT EXISTS coins (
          id TEXT PRIMARY KEY,
          creator_id TEXT NOT NULL,
          name TEXT NOT NULL,
          symbol TEXT NOT NULL UNIQUE,
          description TEXT,
          price REAL DEFAULT 0,
          market_cap REAL DEFAULT 0,
          volume_24h REAL DEFAULT 0,
          change_24h REAL DEFAULT 0,
          total_supply REAL NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (creator_id) REFERENCES creators(id)
        )
      `);

      // Transactions table
      db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id TEXT PRIMARY KEY,
          wallet_address TEXT NOT NULL,
          coin_id TEXT NOT NULL,
          type TEXT NOT NULL,
          amount REAL NOT NULL,
          price REAL NOT NULL,
          total_value REAL NOT NULL,
          transaction_hash TEXT,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (coin_id) REFERENCES coins(id)
        )
      `);

      // User Holdings table
      db.run(`
        CREATE TABLE IF NOT EXISTS holdings (
          id TEXT PRIMARY KEY,
          wallet_address TEXT NOT NULL,
          coin_id TEXT NOT NULL,
          amount REAL NOT NULL,
          average_purchase_price REAL NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(wallet_address, coin_id),
          FOREIGN KEY (coin_id) REFERENCES coins(id)
        )
      `, (err) => {
        if (err) reject(err);
        else resolve(db);
      });
    });
  });
}

export function getDatabase() {
  return new sqlite3.Database(DB_PATH);
}

export async function seedDatabase(db: sqlite3.Database) {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      // Check if data already exists
      db.get('SELECT COUNT(*) as count FROM creators', (err, row: any) => {
        if (row?.count > 0) {
          resolve();
          return;
        }

        const creators = [
          { id: 'creator1', name: 'John Creator', bio: 'Digital artist and content creator', wallet_address: '0x1234567890abcdef1234567890abcdef12345678', followers: 125000 },
          { id: 'creator2', name: 'Jane Artist', bio: 'Visual artist and designer', wallet_address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', followers: 98000 },
          { id: 'creator3', name: 'Mike Musician', bio: 'Independent music producer', wallet_address: '0xfedcbafedcbafedcbafedcbafedcbafedcbafeda', followers: 75000 },
        ];

        creators.forEach((creator) => {
          db.run(
            'INSERT INTO creators (id, name, bio, wallet_address, followers) VALUES (?, ?, ?, ?, ?)',
            [creator.id, creator.name, creator.bio, creator.wallet_address, creator.followers]
          );
        });

        const coins = [
          { id: 'coin1', creator_id: 'creator1', name: 'Artist Token', symbol: 'ART', description: 'Token for artist support', price: 0.42, market_cap: 420000, volume_24h: 125000, change_24h: 12.5, total_supply: 1000000 },
          { id: 'coin2', creator_id: 'creator2', name: 'Creator Pro', symbol: 'CPR', description: 'Premium creator token', price: 1.25, market_cap: 1250000, volume_24h: 350000, change_24h: -5.2, total_supply: 1000000 },
          { id: 'coin3', creator_id: 'creator3', name: 'Music Token', symbol: 'MTK', description: 'Music creator coin', price: 0.75, market_cap: 750000, volume_24h: 200000, change_24h: 8.3, total_supply: 1000000 },
        ];

        coins.forEach((coin) => {
          db.run(
            'INSERT INTO coins (id, creator_id, name, symbol, description, price, market_cap, volume_24h, change_24h, total_supply) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [coin.id, coin.creator_id, coin.name, coin.symbol, coin.description, coin.price, coin.market_cap, coin.volume_24h, coin.change_24h, coin.total_supply]
          );
        });

        resolve();
      });
    });
  });
}
