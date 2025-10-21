export default function Button({ children, onClick, type = "button", className = "", disabled = false }) {
  // Clases base + clases recibidas + clases para estado deshabilitado
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out";
  const enabledClasses = "bg-green-600 hover:bg-green-700 text-white";
  const disabledClasses = "bg-gray-400 text-gray-700 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}