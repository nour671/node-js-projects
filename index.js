const { name } = require('ejs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

const Article = require('./models/article');
// mongodb+srv://nourashawki7:<db_password>@cluster0.0j66ciu.mongodb.net/?appName=Cluster0
// mongodb+srv://nourashawki7:123123Noura123@cluster0.0j66ciu.mongodb.net/?appName=Cluster0

mongoose.connect('mongodb+srv://nourashawki7:123123Noura123@cluster0.0j66ciu.mongodb.net/?appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/Hi', (req, res) => {
    res.send('Hi there!');
    });
app.get('/Hello', (req, res) => {
    res.send('Hello there!');
    });
app.put('/test', (req, res) => {
    res.send('Test it!');
    });
app.get('/numbers', (req, res) => {
  let numbers = "";
  for (let i = 0; i < 100; i++) {
    numbers += i + " ";
  }
    res.render("numbers.ejs",{
        name: "Noura",
        numbers: numbers
    });
    });

    app.use(express.json());

    app.post('/articles', async (req, res) => {
        // try {
            const newArticle = new Article();

            const arTitle = req.body.articleTitle;
            const arContent = req.body.articleContent;
            // const arNumberOfLikes = req.body.articleNumberOfLikes;

                newArticle.title = arTitle;
                newArticle.content = arContent;
                // newArticle.numberOfLikes = req.body.articleNumberOfLikes;

                
           
            await newArticle.save();

            res.json(newArticle);
            return;

           

            res.status(201).send('Article created successfully',newArticle);
        // } catch (err) {
        //     res.status(400).send(err);
        // }
    });

    app.get('/articles', async (req, res) => {
        try {
            const articles = await Article.find();
            res.json(articles);
            console.log("Articles retrieved successfully");
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/articles/:id', async (req, res) => {
        try {
            const article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }
            res.json(article);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.delete('/articles/:id', async (req, res) => {
        try {
            const article = await Article.findByIdAndDelete(req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }
            res.send('Article deleted successfully');
        } catch (err) {
            res.status(500).send(err);
        }       
    });

    app.put('/articles/:id', async (req, res) => {
        try {
            const article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }   
        } catch (err) {
            res.status(500).send(err);   
        }
    });

    app.get('/showArticles', async (req, res) => {

        // res.render("articles.ejs");
        try {
            const articles = await Article.find();
            res.render("articles.ejs",{
                name: "Noura",
                articles: articles
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});




    