// src/components/pages/ProfilePage.jsx

import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



function ProfilePage() {
  const { user, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [correo, setCorreo] = useState(user?.correo || '');
  const [foto, setFoto] = useState(user?.foto || '');
  const [fotoFile, setFotoFile] = useState(null);
  // Dirección separada
  const [calle, setCalle] = useState(user?.calle || '');
  const [numeroDir, setNumeroDir] = useState(user?.numeroDir || '');
  const [ciudad, setCiudad] = useState(user?.ciudad || '');
  const [region, setRegion] = useState(user?.region || '');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    setNombre(user?.nombre || '');
    setCorreo(user?.correo || '');
    setFoto(user?.foto || '');
    setCalle(user?.calle || '');
    setNumeroDir(user?.numeroDir || '');
    setCiudad(user?.ciudad || '');
    setRegion(user?.region || '');
  }, [user]);

  const handleEdit = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
        setFotoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Guardar dirección separada en el usuario
    login({
      ...user,
      nombre,
      correo: user?.correo || correo,
      foto,
      calle,
      numeroDir,
      ciudad,
      region
    });
    setShowModal(false);
  };

  return (
    <MainLayout>
      <div className="perfil-container">
        <div className="perfil-card">
          <div className="perfil-foto" style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: '#f8f8f8',
            border: '3px solid #e0e0e0',
            marginBottom: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(60,185,23,0.10)',
            fontSize: 48,
            color: '#bbb',
            overflow: 'hidden',
          }}>
            {user?.foto ? (
              <img src={user.foto} alt="Foto de perfil" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div className="perfil-info" style={{ textAlign: 'center', marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 6 }}>Nombre:</div>
            <div style={{ fontSize: 17, color: '#388E3C', marginBottom: 10 }}>{user?.nombre}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 6 }}>Correo:</div>
            <div style={{ fontSize: 17, color: '#388E3C' }}>{user?.correo}</div>
          </div>
          <div className="perfil-actions" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 10 }}>
            <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={handleEdit}>
              ✏️ Editar perfil
            </button>
            <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#e74c3c' }} onClick={logout}>
              ⏻ Cerrar sesión
            </button>
          </div>
        </div>
        {/* Modal de edición */}
        {showModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <form style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(60,185,23,0.18)', padding: 32, minWidth: 320, maxWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }} onSubmit={handleSave}>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#388E3C', marginBottom: 8 }}>Editar perfil</div>
              <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#f8f8f8', border: '2px solid #e0e0e0', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#bbb', overflow: 'hidden' }}>
                {foto ? <img src={foto} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : <span>👤</span>}
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 8, width: '100%' }} />
              <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #dadce0', fontSize: 16, marginBottom: 4 }} required />
              {/* Mostrar el correo como texto (no editable) dentro del modal */}
              <div style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #eee', background: '#fafafa', color: '#666', fontSize: 16, marginBottom: 4 }} aria-live="polite">
                {user?.correo}
              </div>
              {/* Dirección separada */}
              <input type="text" placeholder="Calle" value={calle} onChange={e => setCalle(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #dadce0', fontSize: 16, marginBottom: 4 }} required />
              <input type="text" placeholder="Número" value={numeroDir} onChange={e => setNumeroDir(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #dadce0', fontSize: 16, marginBottom: 4 }} required />
              <input type="text" placeholder="Ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #dadce0', fontSize: 16, marginBottom: 4 }} required />
              <input type="text" placeholder="Región" value={region} onChange={e => setRegion(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #dadce0', fontSize: 16, marginBottom: 4 }} required />
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" className="btn" style={{ background: '#bbb', color: '#fff' }} onClick={handleClose}>Cancelar</button>
                <button type="submit" className="btn" style={{ background: '#4CAF50', color: '#fff' }}>Guardar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ProfilePage;