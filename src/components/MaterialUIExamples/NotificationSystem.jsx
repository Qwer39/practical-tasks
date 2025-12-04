import React, { useState } from 'react';
import {
  Button,
  Box,
  Snackbar,
  Alert,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Chip
} from '@mui/material';
import {
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Технология React успешно добавлена!', type: 'success', autoHide: true, duration: 4000 },
    { id: 2, message: 'Ошибка при загрузке данных. Проверьте соединение.', type: 'error', autoHide: false, duration: 6000 },
    { id: 3, message: 'Обновление доступно. Перезагрузите приложение.', type: 'warning', autoHide: true, duration: 3000 },
    { id: 4, message: 'Новые технологии ждут изучения!', type: 'info', autoHide: true, duration: 5000 },
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({
    message: '',
    type: 'info',
    autoHide: true,
    duration: 4000
  });

  const [position, setPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const [maxNotifications, setMaxNotifications] = useState(3);

  const handleAddNotification = () => {
    if (!currentNotification.message.trim()) return;

    const newNotification = {
      id: Date.now(),
      ...currentNotification,
      duration: currentNotification.autoHide ? currentNotification.duration : null
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, maxNotifications));
    setCurrentNotification({
      message: '',
      type: 'info',
      autoHide: true,
      duration: 4000
    });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleCloseNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🔔 Система уведомлений
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Использование Snackbar и Alert из Material-UI для отображения уведомлений
      </Typography>

      <Grid container spacing={3}>
        {/* Форма создания уведомления */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Создать уведомление
              </Typography>
              
              <TextField
                fullWidth
                label="Сообщение уведомления"
                value={currentNotification.message}
                onChange={(e) => setCurrentNotification(prev => ({ ...prev, message: e.target.value }))}
                multiline
                rows={3}
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Тип уведомления</InputLabel>
                <Select
                  value={currentNotification.type}
                  onChange={(e) => setCurrentNotification(prev => ({ ...prev, type: e.target.value }))}
                  label="Тип уведомления"
                >
                  <MenuItem value="success">✅ Success</MenuItem>
                  <MenuItem value="error">❌ Error</MenuItem>
                  <MenuItem value="warning">⚠️ Warning</MenuItem>
                  <MenuItem value="info">ℹ️ Info</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={currentNotification.autoHide}
                    onChange={(e) => setCurrentNotification(prev => ({ ...prev, autoHide: e.target.checked }))}
                  />
                }
                label="Автоматическое закрытие"
              />

              {currentNotification.autoHide && (
                <TextField
                  fullWidth
                  type="number"
                  label="Длительность (мс)"
                  value={currentNotification.duration}
                  onChange={(e) => setCurrentNotification(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  margin="normal"
                  inputProps={{ min: 1000, max: 10000 }}
                />
              )}

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleAddNotification}
                  disabled={!currentNotification.message.trim()}
                  startIcon={<NotificationsIcon />}
                >
                  Добавить уведомление
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenSnackbar(true)}
                  startIcon={<NotificationsIcon />}
                >
                  Показать текущее
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Настройки отображения */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⚙️ Настройки отображения
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Позиция по вертикали</InputLabel>
                <Select
                  value={position.vertical}
                  onChange={(e) => setPosition(prev => ({ ...prev, vertical: e.target.value }))}
                  label="Позиция по вертикали"
                >
                  <MenuItem value="top">Вверху</MenuItem>
                  <MenuItem value="bottom">Внизу</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Позиция по горизонтали</InputLabel>
                <Select
                  value={position.horizontal}
                  onChange={(e) => setPosition(prev => ({ ...prev, horizontal: e.target.value }))}
                  label="Позиция по горизонтали"
                >
                  <MenuItem value="left">Слева</MenuItem>
                  <MenuItem value="center">По центру</MenuItem>
                  <MenuItem value="right">Справа</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="number"
                label="Максимум уведомлений"
                value={maxNotifications}
                onChange={(e) => setMaxNotifications(parseInt(e.target.value))}
                margin="normal"
                inputProps={{ min: 1, max: 10 }}
              />

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearAll}
                  startIcon={<DeleteIcon />}
                  disabled={notifications.length === 0}
                >
                  Очистить все уведомления
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Список активных уведомлений */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Активные уведомления ({notifications.length})
                </Typography>
                <Chip 
                  label={`Максимум: ${maxNotifications}`} 
                  color="primary" 
                  variant="outlined"
                />
              </Box>

              {notifications.length === 0 ? (
                <Typography color="text.secondary" textAlign="center" py={3}>
                  Нет активных уведомлений
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {notifications.map((notification) => (
                    <Alert
                      key={notification.id}
                      severity={getTypeColor(notification.type)}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => handleCloseNotification(notification.id)}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ alignItems: 'center' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ fontSize: '20px' }}>
                          {getTypeIcon(notification.type)}
                        </span>
                        <Typography variant="body1">
                          {notification.message}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {notification.autoHide 
                          ? `Автоматически закроется через ${notification.duration / 1000} сек`
                          : 'Требуется ручное закрытие'
                        }
                      </Typography>
                    </Alert>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar для демонстрации */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={currentNotification.autoHide ? currentNotification.duration : null}
        onClose={handleCloseSnackbar}
        anchorOrigin={position}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={getTypeColor(currentNotification.type)}
          sx={{ width: '100%' }}
          action={
            currentNotification.autoHide ? null : (
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ fontSize: '20px' }}>
              {getTypeIcon(currentNotification.type)}
            </span>
            <Typography>
              {currentNotification.message || 'Пример уведомления'}
            </Typography>
          </Box>
        </Alert>
      </Snackbar>

      {/* Информационная панель */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ℹ️ Особенности реализации
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography color="success.main" variant="h5">✅</Typography>
                <Typography variant="body2">4 типа уведомлений</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography color="primary.main" variant="h5">⏱️</Typography>
                <Typography variant="body2">Настраиваемая длительность</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography color="warning.main" variant="h5">📱</Typography>
                <Typography variant="body2">Адаптивный дизайн</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography color="info.main" variant="h5">⚙️</Typography>
                <Typography variant="body2">Гибкие настройки</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationSystem;