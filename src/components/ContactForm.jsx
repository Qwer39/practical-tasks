import { useState, useEffect } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};

      // Валидация имени
      if (!formData.name.trim()) {
        newErrors.name = 'Имя обязательно для заполнения';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Имя должно содержать минимум 2 символа';
      }

      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = 'Email обязателен для заполнения';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Введите корректный email адрес';
      }

      // Валидация сообщения
      if (!formData.message.trim()) {
        newErrors.message = 'Сообщение обязательно для заполнения';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Сообщение должно содержать минимум 10 символов';
      }

      // Валидация телефона (необязательное поле)
      if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
        newErrors.phone = 'Введите корректный номер телефона';
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    setIsSubmitting(true);

    // Имитация отправки на сервер
    setTimeout(() => {
      console.log('Данные для отправки:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Сброс формы
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Через 3 секунды скрыть сообщение об успехе
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="contact-form-container">
      <h2>📝 Форма обратной связи</h2>
      
      {submitSuccess && (
        <div className="success-message">
          ✅ Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        {/* Поле имени */}
        <div className="form-group">
          <label htmlFor="name" className="required">
            Имя
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Введите ваше имя"
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Поле email */}
        <div className="form-group">
          <label htmlFor="email" className="required">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="example@mail.com"
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Поле телефона */}
        <div className="form-group">
          <label htmlFor="phone">
            Телефон
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="+7 (999) 999-99-99"
            disabled={isSubmitting}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
          <div className="hint">Необязательное поле</div>
        </div>

        {/* Поле сообщения */}
        <div className="form-group">
          <label htmlFor="message" className="required">
            Сообщение
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={errors.message ? 'error' : ''}
            placeholder="Введите ваше сообщение..."
            disabled={isSubmitting}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
          <div className="character-count">
            {formData.message.length}/500 символов
          </div>
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`submit-button ${!isFormValid ? 'disabled' : ''}`}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-small"></span>
              Отправка...
            </>
          ) : (
            'Отправить сообщение'
          )}
        </button>

        <div className="form-hint">
          <span className="required-star">*</span> — обязательные поля для заполнения
        </div>
      </form>
    </div>
  );
}

export default ContactForm;