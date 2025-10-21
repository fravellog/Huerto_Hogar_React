export default function Input({ type = "text", placeholder, value, onChange, name, id, required = false, className = "" }) {
  return (
    <input
      type={type}
      id={id}
      name={name} // Útil para formularios
      placeholder={placeholder}
      value={value}
      onChange={onChange} // Corregido
      required={required}
      className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${className}`} // Añadido w-full como base
    />
  );
}