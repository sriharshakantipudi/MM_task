import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoints
app.get('/api/user/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data.toString());
      const user = users.find((u: { id: string }) => u.id === id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

app.post('/api/user', (req, res) => {
  const user = req.body;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data.toString());
      users.push(user);
      fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing users file');
        } else {
          res.json(user);
        }
      });
    }
  });
});

app.put('/api/user/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data.toString());
      const index = users.findIndex((u: { id: string }) => u.id === id);
      if (index !== -1) {
        users[index] = user;
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing users file');
          } else {
            res.json(user);
          }
        });
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

app.delete('/api/user/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data.toString());
      const index = users.findIndex((u: { id: string }) => u.id === id);
      if (index !== -1) {
        const user = users.splice(index, 1)[0];
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing users file');
          } else {
            res.json(user);
          }
        });
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

// Server-Side Rendering
app.get('/', (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data.toString());
      const userList = users.map((user: any) => `<li>${user.name}</li>`).join('');
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Users</title>
          </head>
          <body>
            <h1>Users</h1>
            <ul>
              ${userList}
            </ul>
          </body>
        </html>
      `;
      res.send(html);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});