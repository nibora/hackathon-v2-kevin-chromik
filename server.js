const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('./models/User');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const data = [
  { id: 1, name: 'Test1', age: 20, interest: 'programming', gender: 'male' },
  { id: 2, name: 'Test2', age: 30, interest: 'languages', gender: 'female' },
  { id: 3, name: 'Test3', age: 40, interest: 'driving', gender: 'male' },
  { id: 4, name: 'Test4', age: 25, interest: 'music', gender: 'female' },
  { id: 5, name: 'Test5', age: 35, interest: 'photography', gender: 'male' },
  { id: 6, name: 'Test6', age: 28, interest: 'traveling', gender: 'female' },
  { id: 7, name: 'Test7', age: 45, interest: 'cooking', gender: 'male' },
  { id: 8, name: 'Test8', age: 22, interest: 'gaming', gender: 'female' },
  { id: 9, name: 'Test9', age: 33, interest: 'sports', gender: 'male' },
  { id: 10, name: 'Test10', age: 29, interest: 'reading', gender: 'female' },
  { id: 11, name: 'Test11', age: 50, interest: 'gardening', gender: 'male' },
  { id: 12, name: 'Test12', age: 26, interest: 'painting', gender: 'female' },
  { id: 13, name: 'Test13', age: 32, interest: 'hiking', gender: 'male' },
  { id: 14, name: 'Test14', age: 38, interest: 'writing', gender: 'female' },
  { id: 15, name: 'Test15', age: 41, interest: 'yoga', gender: 'male' },
];

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'E-Mail oder Passwort ist falsch!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'E-Mail oder Passwort ist falsch!' });
    }

    req.session.user = user;
    res.render('index');
  } catch (error) {
    res.render('login', { error: 'Ein Fehler ist aufgetreten!' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Fehler beim Logout.');
    }

    res.redirect('/login');
  });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.render('login', { name });
  } catch (error) {
    res.render('register', { error: 'Ein Fehler ist aufgetreten!' });
  }
});

app.get('/', (req, res) => {
  user = req.session.user;
  if (!user) {
    res.render('login');
  } else {
    res.render('index');
  }
});

app.get('/finder', (req, res) => {
  res.render('finder', { data: data });
});

app.get('/rooms', (req, res) => {
  res.render('rooms');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/profile/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  const person = data.find((p) => p.id === personId);

  if (person) {
    res.render('profile', { person });
  } else {
    res.status(404).send('Profil nicht gefunden');
  }
});

app.listen(3000, () => {
  console.log('Application runs on http://localhost:3000');
});
