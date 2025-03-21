import express from 'express'
import cors from 'cors'
import { db } from './connect.js'

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

//test route
app.get('/', (req, res) => {
  res.status(200);
  res.send('Hello from API')
})

//api routes
app.get('/api', (req, res) => {
  res.set('content-type', 'application/json');
  const sql = 'SELECT * FROM friends';
  const data = {friends: []};
  try {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err; //let catch handle it
      }
      rows.forEach(row => {
        //build custom object
        data.friends.push({id: row.friend_id, name: row.friend_name, reason: row.friend_reason});
      });
      let content = JSON.stringify(data);
      res.send(content);
    });
  } catch (err) {
    console.log(err.message);
    res.status(467);
    res.send(`{"code": 467, "status": "${err.message}"}`);
  }
});

app.post('/api', (req, res) => {
  res.set('content-type', 'application/json');
  const sql = `INSERT INTO friends(friend_name, friend_reason) VALUES(?, ?)`;
  let newId;
  try {
    db.run(sql, [req.body.name, req.body.reason], function(err) {
      if (err) throw err;
      newId = this.lastID; //provides auto increment id
      res.status(201);
      let data = { status: 201, message: `Friend ${newId} saved.` }
      let content = JSON.stringify(data);
      res.send(content);
    })
  } catch (err) {
    console.log(err.message);
    res.status(468);
    res.send(`{"code": 468, "status": "${err.message}"}`);
  }
});

app.delete('/api', (req, res) => {
  res.set('content-type', 'application/json');
  const sql = `DELETE FROM friends WHERE friend_id=?`
  try {
    db.run(sql, [req.query.id], function(err) {
      if (err) throw err;
      if (this.changes === 1) {
        //one delete done
        res.status(200);
        res.send(`{"message": "Friend ${req.query.id} was deleted."}`);
      } else {
        //nothing deleted
        res.status(200);
        res.send({"message": "No delete operation needed."})
      }
    })
  } catch (err) {
    console.log(err.message);
    res.status(468);
    res.send(`{"code": 468, "status": "${err.message}"}`);
  }
});

app.listen(port, (err) => {
  if (err) console.log('ERROR:', err.message)
  console.log(`app listening on local host port ${port}`)
});
