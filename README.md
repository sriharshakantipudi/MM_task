# MM_task


First, create a new directory for your project and initialize a new npm project using the following command:mkdir my-project
cd my-project
npm init
Follow the prompts to initialize your project.

Next, install the required dependencies:
npm install express body-parser cors morgan dotenv nodemon @types/express @types/cors @types/morgan --save
Create a src directory and create a new file called app.ts inside it.
mkdir src
cd src
touch app.ts
Open app.ts and paste the following code:
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
This sets up a basic Express server with some middleware and a single route that returns "Hello World!".

To add the API endpoints, modify app.ts as follows:
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

// API Routes
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
// Start the server
app.listen(port, () => {
console.log(Server running on port ${port});
});


This sets up the API endpoints for getting, creating, updating, and deleting users. The implementation reads and writes to a JSON file called `users.json`.

To add server-side rendering, modify `app.ts` as follows:

```typescript
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

// API Routes
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
      const users
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
const userCount = users.length;
const message = There are ${userCount} users in the database.;
res.send(<h1>${message}</h1>);
}
});
});
// Start the server
app.listen(port, () => {
console.log(Server running on port ${port});
});
This adds a simple server-side rendering endpoint that reads the `users.json` file and displays a message indicating how many users are in the database.

To test the API endpoints, you can use a tool like Postman or curl to make requests to `http://localhost:3000/api/user/<userid>` (GET), `http://localhost:3000/api/user` (POST), `http://localhost:3000/api/user/<userid>` (PUT), and `http://localhost:3000/api/user/<userid>` (DELETE).

To test the server-side rendering, you can open a web browser and navigate to `http://localhost:3000/`.



Here's the final version of the code with comments:

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
      const users = JSON.parse(data


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


