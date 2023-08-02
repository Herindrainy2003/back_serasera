const cron = require('node-cron');
const pool = require('./config/db');

// Planifier la tâche de fond pour s'exécuter toutes les minutes
cron.schedule('*/10 * * * * *', async () => {
  try {
    const tenSecondsAgo = new Date(Date.now() - 10 * 1000); // Calculer l'heure il y a 10 secondes
    const deleteQuery = 'DELETE FROM tasks WHERE created_at <= $1;';
    const values = [tenSecondsAgo];

    await pool.query(deleteQuery, values);
    console.log('Tâche de suppression exécutée avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la tâche de suppression:', err);
  }
});
