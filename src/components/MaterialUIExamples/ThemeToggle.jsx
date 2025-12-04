import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Paper,
  AppBar,
  Toolbar,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Palette as PaletteIcon,
  Save as SaveIcon,
  Restore as RestoreIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Print as PrintIcon
} from '@mui/icons-material';

// Контекст темы
const ThemeContext = createContext();

const ThemeToggle = () => {
  const [mode, setMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#1976d2');
  const [secondaryColor, setSecondaryColor] = useState('#dc004e');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savedThemes, setSavedThemes] = useState([]);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  // Загрузка темы из localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('mui-theme-mode') || 'light';
    const savedPrimary = localStorage.getItem('mui-theme-primary') || '#1976d2';
    const savedSecondary = localStorage.getItem('mui-theme-secondary') || '#dc004e';
    const savedThemesData = JSON.parse(localStorage.getItem('mui-saved-themes') || '[]');

    setMode(savedMode);
    setPrimaryColor(savedPrimary);
    setSecondaryColor(savedSecondary);
    setSavedThemes(savedThemesData);
  }, []);

  // Создание темы
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' 
              ? '0 4px 20px rgba(0,0,0,0.1)'
              : '0 4px 20px rgba(0,0,0,0.3)',
          },
        },
      },
    },
  });

  const handleThemeToggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mui-theme-mode', newMode);
  };

  const handleSaveTheme = () => {
    const newTheme = {
      id: Date.now(),
      name: `Тема ${savedThemes.length + 1}`,
      mode,
      primaryColor,
      secondaryColor,
      date: new Date().toLocaleString(),
    };

    const updatedThemes = [newTheme, ...savedThemes].slice(0, 5);
    setSavedThemes(updatedThemes);
    localStorage.setItem('mui-saved-themes', JSON.stringify(updatedThemes));
  };

  const handleLoadTheme = (theme) => {
    setMode(theme.mode);
    setPrimaryColor(theme.primaryColor);
    setSecondaryColor(theme.secondaryColor);
    localStorage.setItem('mui-theme-mode', theme.mode);
    localStorage.setItem('mui-theme-primary', theme.primaryColor);
    localStorage.setItem('mui-theme-secondary', theme.secondaryColor);
  };

  const handleDeleteTheme = (id) => {
    const updatedThemes = savedThemes.filter(theme => theme.id !== id);
    setSavedThemes(updatedThemes);
    localStorage.setItem('mui-saved-themes', JSON.stringify(updatedThemes));
  };

  const handleResetTheme = () => {
    setMode('light');
    setPrimaryColor('#1976d2');
    setSecondaryColor('#dc004e');
    localStorage.setItem('mui-theme-mode', 'light');
    localStorage.setItem('mui-theme-primary', '#1976d2');
    localStorage.setItem('mui-theme-secondary', '#dc004e');
  };

  const DemoComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Демонстрация компонентов
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Карточка с темой
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Этот компонент демонстрирует применение текущей темы
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" color="primary">
                    Основная кнопка
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Вторичная кнопка
                  </Button>
                  <Button variant="text" color="primary">
                    Текстовая кнопка
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Текстовые поля
              </Typography>
              <TextField
                fullWidth
                label="Имя"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Чипы и аватары
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label="Основной" color="primary" />
                <Chip label="Вторичный" color="secondary" />
                <Chip label="Успех" color="success" />
                <Chip label="Ошибка" color="error" />
                <Chip label="Предупреждение" color="warning" />
                <Chip label="Информация" color="info" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>C</Avatar>
                <Badge badgeContent={4} color="error">
                  <Avatar sx={{ bgcolor: 'warning.main' }}>D</Avatar>
                </Badge>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {!isMobile && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Размер экрана: Desktop
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <MUIThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ mode, primaryColor, secondaryColor }}>
        <CssBaseline />
        
        <Box sx={{ flexGrow: 1 }}>
          {/* AppBar */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Переключение темы Material-UI
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={handleThemeToggle}
                    color="default"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                    <Typography>{mode === 'dark' ? 'Тёмная' : 'Светлая'}</Typography>
                  </Box>
                }
              />

              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{ ml: 2 }}
              >
                <PaletteIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* Основные настройки темы */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🎨 Настройки темы
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Основной цвет
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => {
                            setPrimaryColor(e.target.value);
                            localStorage.setItem('mui-theme-primary', e.target.value);
                          }}
                          style={{ width: 60, height: 60, borderRadius: 8, border: 'none', cursor: 'pointer' }}
                        />
                        <TextField
                          value={primaryColor}
                          onChange={(e) => {
                            setPrimaryColor(e.target.value);
                            localStorage.setItem('mui-theme-primary', e.target.value);
                          }}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Вторичный цвет
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => {
                            setSecondaryColor(e.target.value);
                            localStorage.setItem('mui-theme-secondary', e.target.value);
                          }}
                          style={{ width: 60, height: 60, borderRadius: 8, border: 'none', cursor: 'pointer' }}
                        />
                        <TextField
                          value={secondaryColor}
                          onChange={(e) => {
                            setSecondaryColor(e.target.value);
                            localStorage.setItem('mui-theme-secondary', e.target.value);
                          }}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveTheme}
                      >
                        Сохранить тему
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<RestoreIcon />}
                        onClick={handleResetTheme}
                      >
                        Сбросить
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setDialogOpen(true)}
                      >
                        Предпросмотр
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Сохранённые темы */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      💾 Сохранённые темы ({savedThemes.length}/5)
                    </Typography>
                    
                    {savedThemes.length === 0 ? (
                      <Typography color="text.secondary" textAlign="center" py={3}>
                        Нет сохранённых тем
                      </Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {savedThemes.map((savedTheme) => (
                          <Paper
                            key={savedTheme.id}
                            sx={{
                              p: 2,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              '&:hover': {
                                bgcolor: 'action.hover',
                              },
                            }}
                            onClick={() => handleLoadTheme(savedTheme)}
                          >
                            <Box>
                              <Typography variant="subtitle1">
                                {savedTheme.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {savedTheme.date}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    bgcolor: savedTheme.primaryColor,
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                  }}
                                  title={`Основной: ${savedTheme.primaryColor}`}
                                />
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    bgcolor: savedTheme.secondaryColor,
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                  }}
                                  title={`Вторичный: ${savedTheme.secondaryColor}`}
                                />
                                <Chip
                                  label={savedTheme.mode === 'dark' ? 'Тёмная' : 'Светлая'}
                                  size="small"
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTheme(savedTheme.id);
                              }}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Paper>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Демонстрация компонентов */}
              <Grid item xs={12}>
                <DemoComponent />
              </Grid>
            </Grid>
          </Container>

          {/* Нижняя навигация (для мобильных) */}
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={bottomNavValue}
              onChange={(event, newValue) => {
                setBottomNavValue(newValue);
              }}
            >
              <BottomNavigationAction label="Главная" icon={<HomeIcon />} />
              <BottomNavigationAction label="Темы" icon={<PaletteIcon />} />
              <BottomNavigationAction label="Настройки" icon={<SettingsIcon />} />
              <BottomNavigationAction label="Профиль" icon={<PersonIcon />} />
            </BottomNavigation>
          </Paper>

          {/* Speed Dial */}
          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{ position: 'fixed', bottom: 70, right: 16 }}
            icon={<SpeedDialIcon />}
            open={speedDialOpen}
            onOpen={() => setSpeedDialOpen(true)}
            onClose={() => setSpeedDialOpen(false)}
          >
            <SpeedDialAction
              icon={<AddIcon />}
              tooltipTitle="Добавить"
              onClick={() => setDialogOpen(true)}
            />
            <SpeedDialAction
              icon={<EditIcon />}
              tooltipTitle="Редактировать"
              onClick={() => setDrawerOpen(true)}
            />
            <SpeedDialAction
              icon={<ShareIcon />}
              tooltipTitle="Поделиться"
            />
          </SpeedDial>
        </Box>

        {/* Drawer для дополнительных настроек */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Дополнительные настройки
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Панель управления" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Уведомления" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Сообщения" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Контакты" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Dialog для предпросмотра */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Предпросмотр темы
          </DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mb: 2,
                  borderRadius: 2,
                }}
              />
              <Typography variant="h6">
                Текущая тема: {mode === 'dark' ? 'Тёмная' : 'Светлая'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Основной цвет: {primaryColor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Вторичный цвет: {secondaryColor}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Закрыть</Button>
            <Button variant="contained" onClick={handleSaveTheme}>
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeContext.Provider>
    </MUIThemeProvider>
  );
};

export default ThemeToggle;