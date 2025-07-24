import React, { useState, useEffect } from 'react';
import MeetingItem from './MeetingItem';

const MeetingApp = () => {
  const [meetings, setMeetings] = useState([]);
  const [currentMeeting, setCurrentMeeting] = useState('');
  const [filter, setFilter] = useState('Все');

  // Загружаем из localStorage при монтировании
  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem('meetings')) || [];
    setMeetings(storedMeetings);
  }, []);

  // Сохраняем в localStorage при изменениях
  useEffect(() => {
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }, [meetings]);

  const addMeeting = () => {
    if (currentMeeting.trim() === '') return;
    const newMeeting = {
      id: Date.now(),
      text: currentMeeting,
      completed: false,
    };
    setMeetings([...meetings, newMeeting]);
    setCurrentMeeting('');
  };

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  const toggleComplete = (id) => {
    setMeetings(
      meetings.map(meeting =>
        meeting.id === id ? { ...meeting, completed: !meeting.completed } : meeting
      )
    );
  };

  const clearCompleted = () => {
    setMeetings(meetings.filter(meeting => !meeting.completed));
  };

  const filteredMeetings = meetings.filter(meeting => {
    if (filter === 'Все') return true;
    if (filter === 'Активные') return !meeting.completed;
    if (filter === 'Выполненные') return meeting.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Мои встречи</h1>
      {/* Добавление встречи */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Добавьте встречу"
          value={currentMeeting}
          onChange={(e) => setCurrentMeeting(e.target.value)}
          className="form-control"
        />
        <button className="btn-primary" onClick={addMeeting}>Добавить</button>
      </div>
      
      {/* Фильтр */}
      <div className="controls">
        <div className="filters">
          <button
            className={filter === 'Все' ? 'active' : ''}
            onClick={() => setFilter('Все')}
          >
            Все
          </button>
          <button
            className={filter === 'Активные' ? 'active' : ''}
            onClick={() => setFilter('Активные')}
          >
            Активные
          </button>
          <button
            className={filter === 'Выполненные' ? 'active' : ''}
            onClick={() => setFilter('Выполненные')}
          >
            Выполненные
          </button>
        </div>
        {meetings.some(m => m.completed) && (
          <button id="clearCompleted" onClick={clearCompleted}>
            Очистить выполненные
          </button>
        )}
      </div>
      
      {/* Список встреч */}
      <ul id="meetingList" className="meeting-list">
        {filteredMeetings.map(meeting => (
          <MeetingItem
            key={meeting.id}
            meeting={meeting}
            onDelete={deleteMeeting}
            onToggle={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeetingApp;