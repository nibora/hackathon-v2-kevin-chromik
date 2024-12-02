const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', (req, res) => {
  res.render('index');
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
