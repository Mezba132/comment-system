export default function EditComment({
  isOpen,
  value,
  onChange,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Edit Comment</h3>

        <textarea
          className="modal-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn" onClick={onSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
