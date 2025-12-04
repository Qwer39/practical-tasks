import React, { useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Smartphone as SmartphoneIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

// Импортируем компоненты из PDF (предполагается, что они уже созданы)
import SimpleTechCard from './SimpleTechCard';
import Dashboard from './Dashboard';
import NotificationSystem from './NotificationSystem';
import ThemeToggle from './ThemeToggle';
import ResponsiveTest from './ResponsiveTest';

const MUIExamplesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tabData = [
    {
      label: '📊 Dashboard',
      icon: <DashboardIcon />,
      component: <Dashboard />,
      description: 'Панель управления с вкладками и статистикой'
    },
    {
      label: '🔔 Уведомления',
      icon: <NotificationsIcon />,
      component: <NotificationSystem />,
      description: 'Система уведомлений с использованием Snackbar'
    },
    {
      label: '🎨 Темы',
      icon: <PaletteIcon />,
      component: <ThemeToggle />,
      description: 'Переключение светлой/тёмной темы'
    },
    {
      label: '📱 Адаптивность',
      icon: <SmartphoneIcon />,
      component: <ResponsiveTest />,
      description: 'Тестирование адаптивных компонентов'
    },
    {
      label: '💻 Компоненты',
      icon: <CodeIcon />,
      component: <SimpleTechCard />,
      description: 'Базовые компоненты Material-UI'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Заголовок */}
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" gutterBottom>
            🎨 Material-UI Практика
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Практическое занятие №26: Современные компоненты и дизайн система
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Alert severity="info" icon={<CheckCircleIcon />}>
                <Typography variant="body2">
                  <strong>5 готовых примеров</strong> из практического занятия
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12} md={4}>
              <Alert severity="success" icon={<CheckCircleIcon />}>
                <Typography variant="body2">
                  <strong>Адаптивный дизайн</strong> для всех устройств
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12} md={4}>
              <Alert severity="warning" icon={<CheckCircleIcon />}>
                <Typography variant="body2">
                  <strong>Темная/светлая тема</strong> с сохранением настроек
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </Box>

        {/* Основной контент */}
        <Paper sx={{ mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              aria-label="Material-UI примеры"
            >
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {tab.icon}
                      <span style={{ display: isMobile ? 'none' : 'inline' }}>
                        {tab.label}
                      </span>
                    </Box>
                  }
                  {...(isMobile ? { icon: tab.icon } : {})}
                />
              ))}
            </Tabs>
          </Box>

          {/* Описание активной вкладки */}
          <Box sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Typography variant="h6">
              {tabData[activeTab].label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tabData[activeTab].description}
            </Typography>
          </Box>

          {/* Контент вкладки */}
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            {tabData[activeTab].component}
          </Box>
        </Paper>

        {/* Информация о Material-UI */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📚 О Material-UI
                </Typography>
                <Typography variant="body2" paragraph>
                  Material-UI — это библиотека React-компонентов, реализующая Google's Material Design.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="React" color="primary" size="small" />
                  <Chip label="TypeScript" color="secondary" size="small" />
                  <Chip label="Material Design" color="success" size="small" />
                  <Chip label="Адаптивный" color="warning" size="small" />
                  <Chip label="Темы" color="info" size="small" />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" href="https://mui.com/" target="_blank">
                  Документация
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ✅ Преимущества
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography variant="body2">Готовые компоненты</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography variant="body2">Темная/светлая тема</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography variant="body2">Полная адаптивность</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography variant="body2">Доступность (a11y)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                    <Typography variant="body2">Интернационализация</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MUIExamplesPage;