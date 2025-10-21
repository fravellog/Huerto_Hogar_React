export default function Title({ children, level = "h2", className = "" }) {
  const Tag = level; // h1, h2, h3...
  // Clases base, ajusta según necesidad
  const baseStyle = "font-bold text-green-700";
  const levelStyles = {
    h1: "text-4xl mb-4",
    h2: "text-3xl mb-3",
    h3: "text-2xl mb-2",
    h4: "text-xl mb-1",
    h5: "text-lg",
    h6: "text-base",
  };
  return <Tag className={`${baseStyle} ${levelStyles[level] || levelStyles.h2} ${className}`}>{children}</Tag>;
}