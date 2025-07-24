import React from 'react';

const MeetingItem = ({ meeting, onDelete, onToggle }) => {
  return (
    <li className={`meeting-item ${meeting.completed ? 'completed' : ''}`}>
      <span
        className="meeting-text"
        onClick={() => onToggle(meeting.id)}
        style={{ cursor: 'pointer' }}
      >
        {meeting.text}
      </span>
      <div>
        <button onClick={() => onDelete(meeting.id)} title="Удалить">
          🗑️
        </button>
      </div>
    </li>
  );
};

export default MeetingItem;