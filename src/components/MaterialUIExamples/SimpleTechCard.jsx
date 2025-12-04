import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Chip,
  Box,
  Rating
} from '@mui/material';
import {
  Code as CodeIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const SimpleTechCard = () => {
  const technologies = [
    {
      id: 1,
      name: 'React',
      description: 'Библиотека JavaScript для создания пользовательских интерфейсов',
      category: 'Frontend',
      difficulty: 4,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      tags: ['JavaScript', 'UI', 'Components']
    },
    {
      id: 2,
      name: 'Node.js',
      description: 'Среда выполнения JavaScript на стороне сервера',
      category: 'Backend',
      difficulty: 3,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
      tags: ['JavaScript', 'Server', 'Runtime']
    },
    {
      id: 3,
      name: 'TypeScript',
      description: 'Типизированное надмножество JavaScript',
      category: 'Language',
      difficulty: 3,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop',
      tags: ['TypeScript', 'Typing', 'JavaScript']
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🎴 Карточки технологий Material-UI
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Пример использования компонентов Card из Material-UI
      </Typography>

      <Grid container spacing={3}>
        {technologies.map((tech) => (
          <Grid item xs={12} sm={6} md={4} key={tech.id}>
            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={tech.image}
                alt={tech.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" component="div">
                    {tech.name}
                  </Typography>
                  <Chip label={tech.category} color="primary" size="small" />
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {tech.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SchoolIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">Сложность:</Typography>
                  <Rating value={tech.difficulty} readOnly size="small" sx={{ ml: 1 }} />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>Теги:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {tech.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              </CardContent>
              
              <CardActions>
                <Button size="small" startIcon={<CodeIcon />}>
                  Изучить
                </Button>
                <Button size="small" startIcon={<ScheduleIcon />}>
                  Отложить
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SimpleTechCard;