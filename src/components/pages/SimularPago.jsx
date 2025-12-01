
import React, { useState, useContext, useEffect } from 'react';
// Listas de regiones y comunas de Chile
const regionesYcomunas = [
  { nombre: 'Región de Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
  { nombre: 'Región de Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'] },
  { nombre: 'Región de Antofagasta', comunas: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena'] },
  { nombre: 'Región de Atacama', comunas: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'] },
  { nombre: 'Región de Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'] },
  { nombre: 'Región de Valparaíso', comunas: ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Isla de Pascua', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'San Antonio', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María', 'Quilpué', 'Limache', 'Olmué', 'Villa Alemana'] },
  { nombre: 'Región Metropolitana de Santiago', comunas: ['Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón', 'Santiago', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'Colina', 'Lampa', 'Tiltil', 'San Bernardo', 'Buin', 'Calera de Tango', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro', 'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor'] },
  { nombre: 'Región del Libertador General Bernardo O’Higgins', comunas: ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente', 'Pichilemu', 'La Estrella', 'Litueche', 'Marchigüe', 'Navidad', 'Paredones', 'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz'] },
  { nombre: 'Región del Maule', comunas: ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas'] },
  { nombre: 'Región de Ñuble', comunas: ['Chillán', 'Bulnes', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'] },
  { nombre: 'Región del Biobío', comunas: ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualpén', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Talcahuano', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Lebu', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío'] },
  { nombre: 'Región de La Araucanía', comunas: ['Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria'] },
  { nombre: 'Región de Los Ríos', comunas: ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno'] },
  { nombre: 'Región de Los Lagos', comunas: ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena'] },
  { nombre: 'Región de Aysén del Gral. Carlos Ibáñez del Campo', comunas: ['Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O’Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez'] },
  { nombre: 'Región de Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine'] },
];
import ComprobantePago from '../organisms/ComprobantePago';
import { AuthContext } from '../context/AuthContext';
import '../../styles/pages/simularPago.css';
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

const SimularPago = () => {
  // Estado de los campos
  const { user, login } = useContext(AuthContext);
  const [numero, setNumero] = useState('');
  const [nombre, setNombre] = useState('');
  const [expiracion, setExpiracion] = useState('');
  const [cvv, setCvv] = useState('');
  // Monto real del carrito
  const [monto, setMonto] = useState(0);
  const [carrito, setCarrito] = useState([]);

  // Al cargar, obtener carrito y calcular total
  useEffect(() => {
    const carritoLS = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(carritoLS);
    const total = carritoLS.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    setMonto(total);
  }, []);
  const [mostrarComprobante, setMostrarComprobante] = useState(false);
  const [datosPago, setDatosPago] = useState(null); // {fecha, tarjeta}
  // Dirección local si falta en usuario
  const [calle, setCalle] = useState(user?.calle || '');
  const [numeroDir, setNumeroDir] = useState(user?.numeroDir || '');
  // Región y comuna select
  const [region, setRegion] = useState(user?.region || '');
  const [comuna, setComuna] = useState(user?.ciudad || '');
  const direccionIncompleta = !user?.calle || !user?.numeroDir || !user?.region || !user?.ciudad;
  const [pidiendoDireccion, setPidiendoDireccion] = useState(direccionIncompleta);
  const [feedback, setFeedback] = useState(null); // { tipo: 'exito'|'error', mensaje: string }
  const [loading, setLoading] = useState(false);



  // Simulación de pago: éxito si la tarjeta es 4242 4242 4242 4242, error si es 4000 0000 0000 0002
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    // Si falta dirección, pedirla
    if (pidiendoDireccion) {
      if (!calle || !numeroDir || !region || !comuna) {
        setFeedback({ tipo: 'error', mensaje: 'Por favor, completa todos los campos de dirección.' });
        return;
      }
      // Guardar dirección en contexto usuario
      login({ ...user, calle, numeroDir, ciudad: comuna, region });
      setPidiendoDireccion(false);
      setFeedback(null);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (numero.replace(/\s/g, '') === '4242424242424242') {
        setFeedback(null);
        // Guardar monto y carrito antes de limpiar
        const montoFinal = monto;
        const carritoFinal = [...carrito];
        localStorage.setItem('carrito', '[]');
        setCarrito([]);
        setMonto(0);
        setDatosPago({
          fecha: new Date().toLocaleString('es-CL'),
          tarjeta: numero.replace(/\s/g, ''),
          productos: carritoFinal,
          monto: montoFinal,
        });
        setMostrarComprobante(true);
        setNumero(''); setNombre(''); setExpiracion(''); setCvv('');
      } else if (numero.replace(/\s/g, '') === '4000000000000002') {
        setFeedback({ tipo: 'error', mensaje: 'El pago no fue realizado, vuelva a intentarlo más tarde.' });
      } else {
        setFeedback({ tipo: 'error', mensaje: 'Tarjeta de prueba no reconocida. Usa una de las tarjetas de ejemplo.' });
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <MainLayout>
      <div className="simular-pago-flex-center">
        <div className="simular-pago-card">
        <Title level="h2" className="text-center mb-6">Simular Pago</Title>
        {mostrarComprobante ? (
          <ComprobantePago
            user={user}
            monto={datosPago?.monto ?? monto}
            fecha={datosPago?.fecha}
            datosTarjeta={datosPago?.tarjeta}
            direccion={{ calle: user?.calle, numeroDir: user?.numeroDir, ciudad: user?.ciudad, region: user?.region }}
            productos={datosPago?.productos || []}
            onDescargar={() => window.print()} 
            onImprimir={() => window.print()}
          />
        ) : (
        <form onSubmit={handleSubmit} autoComplete="off">
          {pidiendoDireccion ? (
            <>
              <div className="mb-4">
                <Label htmlFor="calle">Calle</Label>
                <Input id="calle" name="calle" type="text" placeholder="Ej: Av. Siempre Viva" value={calle} onChange={e => setCalle(e.target.value)} required />
              </div>
              <div className="mb-4">
                <Label htmlFor="numeroDir">Número</Label>
                <Input id="numeroDir" name="numeroDir" type="text" placeholder="Ej: 742" value={numeroDir} onChange={e => setNumeroDir(e.target.value)} required />
              </div>
              <div className="mb-4">
                <Label htmlFor="region">Región</Label>
                <div className="relative">
                  <select
                    id="region"
                    name="region"
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition text-gray-800 text-base hover:border-green-400 disabled:bg-gray-100 disabled:text-gray-400"
                    value={region}
                    onChange={e => {
                      setRegion(e.target.value);
                      setComuna('');
                    }}
                    required
                  >
                    <option value="">Selecciona una región</option>
                    {regionesYcomunas.map(r => (
                      <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6"/></svg>
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="comuna">Comuna</Label>
                <div className="relative">
                  <select
                    id="comuna"
                    name="comuna"
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition text-gray-800 text-base hover:border-green-400 disabled:bg-gray-100 disabled:text-gray-400"
                    value={comuna}
                    onChange={e => setComuna(e.target.value)}
                    required
                    disabled={!region}
                  >
                    <option value="">{region ? 'Selecciona una comuna' : 'Primero selecciona una región'}</option>
                    {region && regionesYcomunas.find(r => r.nombre === region)?.comunas.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6"/></svg>
                  </span>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Guardando dirección...' : 'Guardar dirección y continuar'}</Button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <Label htmlFor="numero">Número de tarjeta</Label>
                <Input id="numero" name="numero" type="text" placeholder="1234 5678 9012 3456" value={numero} onChange={e => setNumero(e.target.value)} required maxLength={19} />
              </div>
              <div className="mb-4">
                <Label htmlFor="nombre">Nombre del titular</Label>
                <Input id="nombre" name="nombre" type="text" placeholder="Como aparece en la tarjeta" value={nombre} onChange={e => setNombre(e.target.value)} required />
              </div>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="expiracion">Expiración</Label>
                  <Input id="expiracion" name="expiracion" type="text" placeholder="MM/AA" value={expiracion} onChange={e => setExpiracion(e.target.value)} required maxLength={5} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" name="cvv" type="password" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} required maxLength={4} />
                </div>
              </div>
              <div className="mb-6">
                <Label htmlFor="monto">Monto</Label>
                <Input id="monto" name="monto" type="text" value={monto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })} readOnly className="bg-gray-100 cursor-not-allowed" tabIndex={-1} />
                <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
                  Monto total de tu compra (no editable)
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Procesando...' : 'Simular Pago'}</Button>
              <div style={{ fontSize: 14, color: '#666', marginTop: 18, marginBottom: 0, lineHeight: 1.6 }}>
                <b>Tarjetas de prueba:</b><br />
                <span style={{ color: '#222' }}>Éxito:</span><br />
                <span style={{fontFamily:'monospace'}}>N°: 4242 4242 4242 4242</span><br />
                <span style={{fontFamily:'monospace'}}>Nombre: Juan Pérez</span><br />
                <span style={{fontFamily:'monospace'}}>Expiración: 12/29</span><br />
                <span style={{fontFamily:'monospace'}}>CVV: 123</span><br /><br />
                <span style={{ color: '#222' }}>Error:</span><br />
                <span style={{fontFamily:'monospace'}}>N°: 4000 0000 0000 0002</span><br />
                <span style={{fontFamily:'monospace'}}>Nombre: María Test</span><br />
                <span style={{fontFamily:'monospace'}}>Expiración: 11/28</span><br />
                <span style={{fontFamily:'monospace'}}>CVV: 456</span>
              </div>
            </>
          )}
        </form>
        )}
        {feedback && (
          <div className={`simular-pago-feedback ${feedback.tipo}`}>{feedback.mensaje}</div>
        )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SimularPago;
