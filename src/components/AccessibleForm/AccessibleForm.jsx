import { useState } from 'react';
import './AccessibleForm.css';

function AccessibleForm() {
  // Состояния для полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Состояния для ошибок
  const [errors, setErrors] = useState({});

  // Состояние отправки
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};

    // Валидация имени
    if (!name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    // Валидация email с помощью регулярного выражения
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    // Валидация сообщения
    if (!message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Имитация отправки на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Очистка формы после успешной отправки
      setName('');
      setEmail('');
      setMessage('');

      // Скрытие сообщения об успехе через 3 секунды
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="accessible-form-container">
      <h1>Контактная форма</h1>

      {/* Область для скринридера - объявляет статус отправки */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {isSubmitting && 'Отправка формы...'}
        {submitSuccess && 'Форма успешно отправлена!'}
      </div>

      {/* Визуальное сообщение об успехе */}
      {submitSuccess && (
        <div className="success-message" role="alert">
          <span className="success-icon">✓</span>
          <div>
            <h3>Успешно!</h3>
            <p>Спасибо! Ваше сообщение успешно отправлено.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Поле имени */}
        <div className="form-field">
          <label htmlFor="contact-name">
            Ваше имя <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only">(обязательное поле)</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={errors.name ? 'error' : ''}
            placeholder="Введите ваше имя"
          />
          {errors.name && (
            <span id="name-error" className="error-text" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        {/* Поле email */}
        <div className="form-field">
          <label htmlFor="contact-email">
            Email <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only">(обязательное поле)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={errors.email ? 'error' : ''}
            placeholder="example@email.com"
          />
          {errors.email && (
            <span id="email-error" className="error-text" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Поле сообщения */}
        <div className="form-field">
          <label htmlFor="contact-message">
            Сообщение <span className="required-asterisk" aria-hidden="true">*</span>
            <span className="sr-only">(обязательное поле)</span>
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={errors.message ? 'error' : ''}
            placeholder="Введите ваше сообщение..."
          />
          {errors.message && (
            <span id="message-error" className="error-text" role="alert">
              {errors.message}
            </span>
          )}
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              Отправка...
            </>
          ) : 'Отправить сообщение'}
        </button>
      </form>

      {/* Информация о доступности */}
      <div className="accessibility-info">
        <h3>ℹ️ Особенности доступности этой формы:</h3>
        <ul>
          <li>Все поля имеют четкие метки с помощью <code>htmlFor</code> и <code>id</code></li>
          <li>Обязательные поля помечены текстом для скринридеров</li>
          <li>Ошибки имеют <code>role="alert"</code> для немедленного объявления</li>
          <li>Состояние отправки объявляется скринридерам через <code>aria-live</code></li>
          <li>Кнопка имеет <code>aria-busy</code> во время отправки</li>
          <li>Поля с ошибками имеют <code>aria-invalid="true"</code></li>
          <li>Все элементы имеют достаточный контраст для слабовидящих</li>
        </ul>
      </div>
    </div>
  );
}

export default AccessibleForm;