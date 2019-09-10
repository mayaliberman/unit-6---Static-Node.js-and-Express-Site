const express = require('express');
const bodyParser = require('body-parser');
const {data} = require('./data/data.json');
const {projects} = data;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


app.get('/', (req,res) => {
       res.render('index', {projects})
});

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/projects/:id', (req,res) => {
    const { id } = req.params;
    const projectTitle = projects[id-1].project_name
    const projectDescription = projects[id-1].description
    const projImgs = projects[id-1].img_proj;
    const liveLink = projects[id-1].live_link;
    const githubLink = projects[id-1].github_link;
    const technologies = projects[id-1].technologies;
    const projectData = {id, projectTitle, projImgs, projectDescription,  liveLink, githubLink, technologies, projects}
    res.render(`project`, projectData)
    
})

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
  });
  
  app.use((err, req, res, next) => {
    res.locals.error = err
    //Refernce to the solution: https://teamtreehouse.com/community/rangeerror-invalid-status-code-undefined-when-linking-to-another-page
    if(err.status >= 100 && err.status < 600) {
      res.status(err.status);
    } else {
      res.render('error'); 
    }
  })

app.listen(8080, () => {
  console.log('The application is running on localhost 8080');
});
