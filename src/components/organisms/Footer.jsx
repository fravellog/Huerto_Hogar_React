// src/components/organisms/Footer.jsx
 
 
export default function Footer() {
  // Asumiendo que tu styles.css aplica estilos generales a <footer>
  // o si tenías una clase específica como 'footer-container'
  return (
    <footer>
      {/* <div className="footer-container"> */}
        <p>&copy; {new Date().getFullYear()} La Huerta.</p>
      {/* </div> */}
    </footer>
  );
}