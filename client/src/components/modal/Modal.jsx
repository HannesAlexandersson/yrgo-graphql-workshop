export const Modal = ({ children, onClose }) => {
  return (
    <div>
      <div>
        {children}
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};
