import sqlite3 from 'sqlite3'

const sql3 = sqlite3.verbose();

const db = new sql3.Database('./data.db', sqlite3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    console.log(err.message)
    return;
  }
  console.log('created db or db already exists')
}

let sql = `CREATE TABLE IF NOT EXISTS friends(
  friend_id INTEGER PRIMARY KEY,
  friend_name TEXT NOT NULL,
  friend_reason TEXT NOT NULL
)`;

db.run(sql, [], (err) => {
  if (err) {
    console.log('error creating friends table');
    return;
  }  
  console.log('created table');
});

export { db };
