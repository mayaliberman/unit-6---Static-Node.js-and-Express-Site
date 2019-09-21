const express = require('express');
const bodyParser = require('body-parser');
const {
  data: { projects }
} = require('./data/data.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  const projectData = ({
    project_name: projectTitle,
    img_proj: projImgs,
    live_link: liveLink,
    github_link: githubLink,
    technologies: technologies
  } = projects[id - 1]);
  const returnData = Object.assign(projectData, id);
  res.render(`project`, returnData);
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.error('The page is not found status', err.status);
  next(err);
});

app.use((err, req, res, next) => {
  console.error('This page was not created yet! page status is', err.status);
  res.render('error', { error: err });
});

app.listen(3000, () => {
  console.log('The application is running on localhost 3000');
});
