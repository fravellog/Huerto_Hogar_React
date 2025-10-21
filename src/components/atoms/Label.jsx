export default function Label({ htmlFor, children, className = "" }) {
    return (
      <label
        htmlFor={htmlFor}
        // Replica estilos de label de tu CSS original con Tailwind
        className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      >
        {children}
      </label>
    );
  }