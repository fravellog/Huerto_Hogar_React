export default function Button({ children, onClick, type = "button", className = "", disabled = false }) {
  // Aplica la clase base 'btn' y cualquier otra clase pasada
  const combinedClassName = `btn ${className}`.trim();
 
 
  return (
    <button
      type={type}
      xx={onClick}
      disabled={disabled}
      className={combinedClassName} // Usa la combinación de clases
    >
      {children}
    </button>
  );
}