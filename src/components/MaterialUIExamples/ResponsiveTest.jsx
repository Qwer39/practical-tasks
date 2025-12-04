import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Badge,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  Paper,
  useTheme,
  useMediaQuery,
  CardMedia,
  CardActions,
  CardHeader,
  Rating,
  Slider,
  Switch,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Breadcrumbs,
  Link,
  Alert,
  Snackbar,
  CircularProgress,
  LinearProgress,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Send as SendIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  List as ListIcon,
  GridView as GridViewIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const ResponsiveTest = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [ratingValue, setRatingValue] = useState(3);
  const [sliderValue, setSliderValue] = useState(50);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const steps = ['Выбор', 'Детали', 'Подтверждение'];

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Toolbar>
        <Typography variant="h6">Меню</Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Главная', 'Профиль', 'Настройки', 'Помощь'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {text === 'Главная' && <HomeIcon />}
              {text === 'Профиль' && <PersonIcon />}
              {text === 'Настройки' && <SettingsIcon />}
              {text === 'Помощь' && <DashboardIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Адаптивный интерфейс
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Button color="inherit">Главная</Button>
            <Button color="inherit">Документация</Button>
            <Button color="inherit">Примеры</Button>
            <Button color="inherit">О нас</Button>
          </Box>

          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={handleMenuClose}>Настройки</MenuItem>
            <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Sidebar для десктопа */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Мобильный drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Основной контент */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            {/* Информация о размере экрана */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                📱 Размер экрана: {isMobile ? 'Мобильный' : isTablet ? 'Планшет' : 'Десктоп'}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Chip 
                    label={`xs: ${isMobile ? '✓' : '✗'}`} 
                    color={isMobile ? 'success' : 'default'}
                    variant={isMobile ? 'filled' : 'outlined'}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Chip 
                    label={`sm-md: ${isTablet ? '✓' : '✗'}`} 
                    color={isTablet ? 'success' : 'default'}
                    variant={isTablet ? 'filled' : 'outlined'}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Chip 
                    label={`md+: ${isDesktop ? '✓' : '✗'}`} 
                    color={isDesktop ? 'success' : 'default'}
                    variant={isDesktop ? 'filled' : 'outlined'}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Tabs */}
            <Paper sx={{ mb: 3 }}>
              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                <Tab label="Компоненты" />
                <Tab label="Формы" />
                <Tab label="Данные" />
                <Tab label="Настройки" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {tabValue === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2 }}>
                            <PersonIcon fontSize="large" />
                          </Avatar>
                          <Typography variant="h6">Профиль</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Управление профилем пользователя
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <DashboardIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                          <Typography variant="h6">Панель</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Аналитика и статистика
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <SettingsIcon sx={{ fontSize: 60, mb: 2, color: 'secondary.main' }} />
                          <Typography variant="h6">Настройки</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Конфигурация системы
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                          <NotificationsIcon sx={{ fontSize: 60, mb: 2, color: 'warning.main' }} />
                          <Typography variant="h6">Уведомления</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Оповещения и сообщения
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {tabValue === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Форма ввода
                        </Typography>
                        <TextField fullWidth label="Имя" margin="normal" />
                        <TextField fullWidth label="Email" type="email" margin="normal" />
                        <TextField fullWidth label="Сообщение" multiline rows={3} margin="normal" />
                        
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Выбор</InputLabel>
                          <Select label="Выбор" defaultValue="">
                            <MenuItem value="option1">Опция 1</MenuItem>
                            <MenuItem value="option2">Опция 2</MenuItem>
                            <MenuItem value="option3">Опция 3</MenuItem>
                          </Select>
                        </FormControl>
                        
                        <Box sx={{ mt: 2 }}>
                          <Button variant="contained" startIcon={<SendIcon />}>
                            Отправить
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Элементы формы
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography gutterBottom>Рейтинг: {ratingValue}</Typography>
                          <Rating
                            value={ratingValue}
                            onChange={(event, newValue) => {
                              setRatingValue(newValue);
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography gutterBottom>Слайдер: {sliderValue}</Typography>
                          <Slider
                            value={sliderValue}
                            onChange={(event, newValue) => {
                              setSliderValue(newValue);
                            }}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                          />
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <FormControlLabel control={<Switch defaultChecked />} label="Включить" />
                          <FormControlLabel control={<Radio />} label="Опция 1" />
                          <FormControlLabel control={<Checkbox defaultChecked />} label="Согласен" />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                )}

                {tabValue === 2 && (
                  <Box>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Действия</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[1, 2, 3, 4, 5].map((row) => (
                            <TableRow key={row}>
                              <TableCell>{row}</TableCell>
                              <TableCell>Пользователь {row}</TableCell>
                              <TableCell>user{row}@example.com</TableCell>
                              <TableCell>
                                <Chip 
                                  label={row % 2 === 0 ? 'Активен' : 'Неактивен'} 
                                  color={row % 2 === 0 ? 'success' : 'error'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton size="small">
                                  <EditIcon />
                                </IconButton>
                                <IconButton size="small">
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Pagination count={5} color="primary" />
                    </Box>
                  </Box>
                )}

                {tabValue === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Настройки аккаунта</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Управление настройками вашего аккаунта и профиля.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Конфиденциальность</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Настройки конфиденциальности и видимости данных.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Paper>

            {/* Stepper */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  Назад
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (activeStep === steps.length - 1) {
                      setDialogOpen(true);
                    } else {
                      setActiveStep((prev) => prev + 1);
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Завершить' : 'Далее'}
                </Button>
              </Box>
            </Paper>

            {/* Прогресс и индикаторы */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Индикаторы прогресса
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Круговой прогресс
                    </Typography>
                    <CircularProgress />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Линейный прогресс
                    </Typography>
                    <LinearProgress variant="determinate" value={75} />
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Сообщения
                  </Typography>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Успешное выполнение операции!
                  </Alert>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Информационное сообщение для пользователя.
                  </Alert>
                  <Alert severity="warning">
                    Внимание! Это предупреждающее сообщение.
                  </Alert>
                </Paper>
              </Grid>
            </Grid>

            {/* Кнопки действий */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              <Button variant="contained" startIcon={<AddIcon />}>
                Добавить
              </Button>
              <Button variant="outlined" startIcon={<EditIcon />}>
                Редактировать
              </Button>
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                Удалить
              </Button>
              <Button variant="contained" color="secondary" startIcon={<RefreshIcon />}>
                Обновить
              </Button>
              
              {/* FAB для мобильных */}
              <Fab
                color="primary"
                sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', bottom: 80, right: 16 }}
                onClick={() => setDialogOpen(true)}
              >
                <AddIcon />
              </Fab>
            </Box>

            {/* Диалоговое окно */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>Подтверждение</DialogTitle>
              <DialogContent>
                <Typography>
                  Вы уверены, что хотите выполнить это действие?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
                <Button variant="contained" onClick={() => setDialogOpen(false)}>
                  Подтвердить
                </Button>
              </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message="Операция выполнена успешно!"
              action={
                <Button color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
                  Закрыть
                </Button>
              }
            />
          </Container>
        </Box>
      </Box>

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
          <BottomNavigationAction label="Избранное" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Поиск" icon={<SearchIcon />} />
          <BottomNavigationAction label="Профиль" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>

      {/* Speed Dial (для планшетов и десктопов) */}
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'fixed', bottom: 80, right: 16, display: { xs: 'none', sm: 'flex' } }}
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
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          tooltipTitle="Поделиться"
        />
      </SpeedDial>
    </Box>
  );
};

export default ResponsiveTest;