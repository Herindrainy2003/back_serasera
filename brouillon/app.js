import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, CardHeader, Typography, Container, TextField, Button, Card, CardMedia, CardContent, CardActions, Tooltip } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    nomPisera: '',
    nomSera: '',
    descriptionSera: '',
    prix: '',
    contact: '',
    photo: null,
  });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('nomPisera', formData.nomPisera);
      formDataWithImage.append('nomSera', formData.nomSera);
      formDataWithImage.append('descriptionSera', formData.descriptionSera);
      formDataWithImage.append('prix', formData.prix);
      formDataWithImage.append('contact', formData.contact);
      formDataWithImage.append('photo', formData.photo);

      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        body: formDataWithImage,
      });

      const data = await response.json();
      setTasks([...tasks, data]);
      setFormData({
        nomPisera: '',
        nomSera: '',
        descriptionSera: '',
        prix: '',
        contact: '',
        photo: null,
      });
      setShowTooltip(true); // Afficher le tooltip après avoir ajouté une tâche
    } catch (error) {
      console.error('Error inserting task:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleHiseraButtonClick = () => {
    // Logique de validation d'achat ici, par exemple :
    // Enregistrer les données dans la base de données, vider le formulaire, etc.
    // Après la validation, vous pouvez afficher une notification pour confirmer l'achat
    alert('Achat validé !');
    setShowTooltip(false); // Cacher le tooltip après la validation d'achat
  };

  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SERASERA</Typography>
          <Button color="inherit">Accueil</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Contenu */}
      <Container>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
            label="Nom Pisera"
            fullWidth
            margin="normal"
            name="nomPisera"
            value={formData.nomPisera}
            onChange={handleChange}
          />
          <TextField
            label="Nom Sera"
            fullWidth
            margin="normal"
            name="nomSera"
            value={formData.nomSera}
            onChange={handleChange}
          />
          <TextField
            label="Description Sera"
            fullWidth
            margin="normal"
            name="descriptionSera"
            value={formData.descriptionSera}
            onChange={handleChange}
          />
          <TextField
            label="Prix"
            fullWidth
            margin="normal"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
          />
          <TextField
            label="Contact"
            fullWidth
            margin="normal"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })} />
          <Button variant="contained" color="primary" type="submit">
            Asera
          </Button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}>
          {Array.isArray(tasks) &&
            tasks.map((task) => (
              <Tooltip key={task.id} title={<div style={{ maxWidth: '300px', padding: '10px' }}>
                <form onSubmit={handleHiseraButtonClick}>
                  <TextField
                    label="Nom"
                    fullWidth
                    margin="normal"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Contact"
                    fullWidth
                    margin="normal"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Hisera
                  </Button>
                </form>
              </div>} open={showTooltip && task.id === showTooltip} onClose={() => setShowTooltip(false)} placement="right" arrow>
                <Card key={task.id} style={{ margin: '16px', width: '300px' }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={`http://localhost:5000/images/${task.photo}`}
                    alt={task.nomSera}
                  />
                  <CardHeader title={task.nomSera} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <h10> Contact: </h10> {task.contact}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {task.descriptionSera}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Prix: {task.prix}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => setShowTooltip(task.id)}>
                      Seraina
                    </Button>
                  </CardActions>
                </Card>
              </Tooltip>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
