/**
 * A map of Short URL IDs to full original URLs
 * http://localhost/s/123, http://example.com/...
 *
 * { 123 -> 'http://example.com/...' }
 */
const urlmap: Record<number, string> = {};

// SQL code
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import qrcode from 'qrcode';

/**
 * Initally undefined, but we will use this mutable reference to cache the connection for future use
 * Our database contains a single table: 'url'
 * A url has two fields: id (Int) and original (String)
 */
let _db;

export async function getDB() {
  if (_db == null) {
    const conn = await open({
      filename: './urls.db',
      driver: sqlite3.Database,
    });
    _db = conn;
    await _db.run(
      'CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, original TEXT);'
    );
  }
  return _db;
}

// Actions

/**
 * Produces the shortened form of a given URL
 * Effect: updates the db to record the url and its shortened id.
 */
export async function shortenUrl(url: string): Promise<string> {
  const db = await getDB();

  const result = await db.run('INSERT INTO url (original) VALUES (?)', url);
  console.log(result);
  const id = result.lastID;
  const short = `http://localhost:3333/s/${id}`;

  return short;
}

/**
 * Produces the qr form of a given URL
 * Effect: updates the db to record the url and its qr.
 */
export async function generateQR(url: string): Promise<string> {
  const db = await getDB();

  const result = await db.run('INSERT INTO url (original) VALUES (?)', url);
  console.log(result);
  const id = result.lastID;
  const qr = qrcode.toDataURL(url); // Generate the QR code

  return qr;
}

export async function lookupUrl(shortenedId: number) {
  const db = await getDB();

  const result = await db.get(
    'SELECT original FROM url WHERE id = (?)',
    shortenedId
  );
  console.log(result);
  return result.original;
}