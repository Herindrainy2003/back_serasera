const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const pool = require('./config/dbmongo'); // Importez le pool de connexion depuis le fichier db.js

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

// Créer la table 'tasks' si elle n'existe pas déjà
const taskSchema = `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    nomPisera TEXT,
    nomSera TEXT,
    descriptionSera TEXT,
    prix TEXT,
    contact TEXT,
    photo TEXT
  );
`;

pool.query(taskSchema, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table "tasks" created successfully');
  }
});

// Route pour récupérer toutes les tâches
app.get('/tasks', async (req, res) => {
  try {
    const query = 'SELECT * FROM tasks;';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//headrer
// Route pour ajouter une nouvelle tâche avec téléchargement d'image
app.post('/tasks', upload.single('photo'), async (req, res) => {
  const { nomPisera, nomSera, descriptionSera, prix, contact } = req.body;
  const photo = req.file.filename; // Le nom du fichier sera stocké dans la base de données
  const query =
    'INSERT INTO tasks (nomPisera, nomSera, descriptionSera, prix, contact, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
  const values = [nomPisera, nomSera, descriptionSera, prix, contact, photo];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting task:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur Node.js est en cours d'exécution sur le port ${port}`);
});








<AppBar component="nav">
<Toolbar>
  <IconButton
    color="inherit"
    aria-label="open drawer"
    edge="start"
    onClick={handleDrawerToggle}
    sx={{ mr: 2, display: { sm: 'none' } }}
  >
    <MenuIcon />
  </IconButton>
  <Typography
    variant="h6"
    component="div"
    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
  >
    MUI
  </Typography>
  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
    {navItems.map((item) => (
      <Button key={item} sx={{ color: '#fff' }}>
        {item}
      </Button>
    ))}
  </Box>
</Toolbar>
</AppBar>















