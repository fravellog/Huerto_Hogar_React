import Input from '../atoms/Input';
import Label from '../atoms/Label';

export default function IconInput({ icon, label, id, ...inputProps }) {
  return (
    // Replicando .campo y .campo-icono con Tailwind
    <div className="mb-4 w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      {/* Replicando .input-icono */}
      <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
        {/* Replicando .icono */}
        {icon && <span className="pl-3 pr-2 text-gray-500">{icon}</span>}
        {/* El Input ya tiene sus propios estilos */}
        <Input
          id={id}
          className="border-none bg-transparent focus:ring-0 flex-1 py-2" // Quita estilos redundantes y permite que crezca
          {...inputProps} // Pasa el resto de props (type, placeholder, value, onChange, etc.)
        />
      </div>
    </div>
  );
}