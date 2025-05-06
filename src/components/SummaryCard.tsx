import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';

interface SummaryCardProps {
  item: string;
  onDelete: () => void;
  onEdit?: (newValue: string) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (onEdit) {
      onEdit(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(item);
    setIsEditing(false);
  };

  return (
    <div className="summary-card">
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <span className="summary-delete-btn" onClick={onDelete} title="Удалить" style={{ cursor: 'pointer' }}>
          ×
        </span>
        <span
          className="summary-edit-btn"
          onClick={handleEdit}
          title="Редактировать"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M14.85 2.85a1.2 1.2 0 0 1 1.7 1.7l-9.2 9.2-2.3.6.6-2.3 9.2-9.2zm-9.2 9.2l2.3-.6-.6 2.3-2.3.6.6-2.3z"
              fill="#555"
            />
          </svg>
        </span>
      </div>
      {isEditing ? (
        <div>
          <ReactQuill value={editValue} onChange={setEditValue} theme="snow" />
          <div>
            <button onClick={handleSave} className="save-summary-btn">
              Сохранить
            </button>
            <button onClick={handleCancel} className="red-delete-btn">
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div dangerouslySetInnerHTML={{ __html: item }} />
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
