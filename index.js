const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const pool = require('./config/db'); // Importer le pool de connexion depuis le fichier db.js

const cronJob = require('./deleteproduit'); // Importer le fichier deleteproduits.js
const app = express();
const port = 5000;

// Servir les images statiques depuis le répertoire "public/images"
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(cors());
app.use(bodyParser.json());

// Configurer multer pour gérer le téléchargement d'images
const storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const categorySchema = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE
  );
`;

const taskSchema = `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    nompisera TEXT,
    nomsera TEXT,
    descriptionsera TEXT,
    prix TEXT,
    contact TEXT,
    photo TEXT,
    categories INT REFERENCES categories(id)
  );
`;

pool.query(categorySchema, (err, res) => {
  if (err) {
    console.error('Error creating table "categories":', err);
  } else {
    console.log('Table "categories" created successfully');
  }
});

pool.query(taskSchema, (err, res) => {
  if (err) {
    console.error('Error creating table "tasks":', err);
  } else {
    console.log('Table "tasks" created successfully');
  }
});

// Route pour récupérer toutes les catégories
app.get('/categories', async (req, res) => {
  try {
    const query = 'SELECT * FROM categories;';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route pour récupérer toutes les tâches avec le nom de la catégorie associée
// Route pour récupérer les tâches en fonction de l'ID de catégorie
app.get('/tasks', async (req, res) => {
  const { category } = req.query; // Récupérer le paramètre "category" depuis l'URL

  try {
    let query;
    let result;

    if (!category) {
      // Si aucun ID de catégorie n'est fourni, récupérer toutes les tâches
      query = 'SELECT tasks.*, categories.name AS category_name FROM tasks INNER JOIN categories ON tasks.categories = categories.id;';
      result = await pool.query(query);
    } else {
      // Si l'ID de catégorie est fourni, récupérer les tâches filtrées
      query = 'SELECT tasks.*, categories.name AS category_name FROM tasks INNER JOIN categories ON tasks.categories = categories.id WHERE tasks.categories = $1;';
      const values = [category];
      result = await pool.query(query, values);
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Fonction pour insérer une nouvelle catégorie dans la table "categories"
const createNewCategory = async (newCategoryName) => {
  const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING *;';
  const values = [newCategoryName];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting category:', err);
    throw err;
  }
};
const insertTaskQuery = `
  INSERT INTO tasks (nompisera, nomsera, descriptionsera, prix, contact, photo, categories,created_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
  RETURNING *;
`;

// Route pour ajouter une nouvelle tâche avec téléchargement d'image
app.post('/tasks', upload.single('photo'), async (req, res) => {
  const { nomPisera, nomSera, descriptionSera, prix, contact, categories } = req.body;
  const photo = req.file.filename;

  // Si l'ID de la catégorie est "nouvelle", cela signifie que l'utilisateur a ajouté une nouvelle catégorie
  // Dans ce cas, insérer d'abord la nouvelle catégorie dans la table "categories" et récupérer son ID
  if (categories === 'nouvelle') {
    const newCategory = await createNewCategory(req.body.newCategory);
    const categoryId = newCategory.id;
    const values = [nomPisera, nomSera, descriptionSera, prix, contact, photo, categoryId];

    try {
      const result = await pool.query(insertTaskQuery, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error inserting task:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Utiliser l'ID de la catégorie sélectionnée dans le menu déroulant
    const values = [nomPisera, nomSera, descriptionSera, prix, contact, photo, categories];

    try {
      const result = await pool.query(insertTaskQuery, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error inserting task:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur Node.js est en cours d'exécution sur le port ${port}`);
});
