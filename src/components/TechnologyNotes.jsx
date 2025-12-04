import { useState, useEffect } from 'react';
import './TechnologyNotes.css';

function TechnologyNotes({ notes, onNotesChange, techId, techTitle }) {
  const [localNotes, setLocalNotes] = useState(notes);
  const [charCount, setCharCount] = useState(notes.length);

  useEffect(() => {
    setLocalNotes(notes);
    setCharCount(notes.length);
  }, [notes]);

  const handleChange = (e) => {
    const newNotes = e.target.value;
    setLocalNotes(newNotes);
    setCharCount(newNotes.length);
    
    // Сохраняем изменения в родительский компонент
    if (onNotesChange) {
      onNotesChange(techId, newNotes);
    }
  };

  const handleSave = () => {
    // Если нужно явное сохранение
    if (onNotesChange) {
      onNotesChange(techId, localNotes);
    }
  };

  const handleClear = () => {
    setLocalNotes('');
    setCharCount(0);
    if (onNotesChange) {
      onNotesChange(techId, '');
    }
  };

  return (
    <div className="technology-notes">
      <div className="notes-header">
        <h4> Заметки по технологии</h4>
        {techTitle && <span className="tech-title">{techTitle}</span>}
      </div>
      
      <textarea
        value={localNotes}
        onChange={handleChange}
        placeholder="Записывайте сюда важные моменты, ссылки, идеи..."
        rows="4"
        className="notes-textarea"
        maxLength="1000"
      />
      
      <div className="notes-footer">
        <div className="notes-info">
          <span className={`char-count ${charCount === 0 ? 'empty' : ''}`}>
            {charCount === 0 ? 'Добавьте заметку' : `${charCount} символов`}
          </span>
          <span className="char-limit">{charCount}/1000</span>
        </div>
        
        <div className="notes-actions">
          <button 
            onClick={handleClear}
            className="clear-button"
            disabled={charCount === 0}
          >
            Очистить
          </button>
          <button 
            onClick={handleSave}
            className="save-button"
            disabled={localNotes === notes}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default TechnologyNotes;