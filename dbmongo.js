const mongoose = require('mongoose');

// Schéma de la tâche
const taskSchema = new mongoose.Schema({
  nomPisera: String,
  nomSera: String,
  descriptionSera: String,
  prix: String,
  contact: String,
  photo: String,
});

// Modèle de la tâche basé sur le schéma
const Task = mongoose.model('Task', taskSchema);

const dbURI = 'mongodb+srv://herindrainyall2003:mongomongo@sera.50wxxcf.mongodb.net/?retryWrites=true&w=majority';

// Connexion à la base de données MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB réussie');

    // Vérifier si la collection "tasks" existe, sinon la créer
    mongoose.connection.db.listCollections().toArray(async (err, collections) => {
      if (err) {
        console.error('Erreur lors de la récupération des collections:', err);
      } else {
        const collectionNames = collections.map((collection) => collection.name);
        if (!collectionNames.includes('tasks')) {
          try {
            await mongoose.connection.db.createCollection('tasks');
            console.log('Collection "tasks" créée avec succès');
          } catch (error) {
            console.error('Erreur lors de la création de la collection "tasks":', error);
          }
        } else {
          console.log('La collection "tasks" existe déjà');
        }
      }
    });
  })
  .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

module.exports = Task;
