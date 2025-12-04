import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  BugReport as BugReportIcon,
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const stats = [
    { title: 'Всего технологий', value: '24', icon: <CodeIcon />, color: '#1976d2', progress: 75 },
    { title: 'Изучено', value: '12', icon: <BugReportIcon />, color: '#2e7d32', progress: 50 },
    { title: 'В процессе', value: '8', icon: <TrendingUpIcon />, color: '#ed6c02', progress: 33 },
    { title: 'Активных пользователей', value: '156', icon: <PersonIcon />, color: '#9c27b0', progress: 85 }
  ];

  const recentActivities = [
    { user: 'Алексей', action: 'добавил технологию React', time: '10 мин назад' },
    { user: 'Мария', action: 'завершила изучение TypeScript', time: '1 час назад' },
    { user: 'Иван', action: 'начал изучение Node.js', time: '2 часа назад' },
    { user: 'Ольга', action: 'добавила ресурсы по Vue.js', time: '5 часов назад' },
    { user: 'Дмитрий', action: 'обновил прогресс по Python', time: '1 день назад' }
  ];

  const technologies = [
    { name: 'React', progress: 80, users: 45 },
    { name: 'TypeScript', progress: 65, users: 32 },
    { name: 'Node.js', progress: 45, users: 28 },
    { name: 'Vue.js', progress: 70, users: 38 },
    { name: 'Python', progress: 55, users: 41 }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        📊 Панель управления
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Пример Dashboard с использованием компонентов Material-UI
      </Typography>

      {/* Вкладки */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Обзор" />
          <Tab label="Активность" />
          <Tab label="Технологии" />
          <Tab label="Аналитика" />
        </Tabs>
      </Paper>

      {/* Статистика */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color }}>
                    {stat.icon}
                  </Avatar>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={stat.progress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Прогресс: {stat.progress}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Недавняя активность */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Недавняя активность"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {activity.user.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${activity.user} ${activity.action}`}
                      secondary={activity.time}
                    />
                    <NotificationsIcon color="action" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Прогресс по технологиям */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Популярные технологии"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              {technologies.map((tech, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{tech.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tech.progress}% ({tech.users} пользователей)
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={tech.progress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Дополнительная информация */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">
              🚀 Панель управления полностью адаптивна и использует Material-UI компоненты
            </Typography>
            <Typography variant="body2">
              Включает карточки, таблицы, прогресс-бары, списки и другие компоненты
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;