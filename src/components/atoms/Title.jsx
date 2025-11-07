export default function Title({ children, level = "h2", className = "" }) {
  // 1. Lista de etiquetas de encabezado válidas
  const validLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
  
  // 2. Si el 'level' es válido, úsalo. Si no (ej: "h7"), usa "h2" como TAG.
  const Tag = validLevels.includes(level) ? level : "h2"; 

  // Clases base (basado en tu snippet)
  const baseStyle = "font-bold text-green-700";
  
  // 3. Lógica de clases (esta ya cubría el fallback)
  const levelStyles = {
    h1: "text-4xl mb-4",
    h2: "text-3xl mb-3",
    h3: "text-2xl mb-2",
    h4: "text-xl mb-1",
    h5: "text-lg",
    h6: "text-base",
  };
  
  // 4. Renderiza usando el Tag validado y la lógica de clases
  return <Tag className={`${baseStyle} ${levelStyles[level] || levelStyles.h2} ${className}`}>{children}</Tag>;
}