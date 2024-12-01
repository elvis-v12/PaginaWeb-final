document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-img');

    // Añade una animación de hover a la imagen de perfil
    profileImg.addEventListener('mouseover', () => {
        profileImg.style.transform = 'scale(1.1)';
        profileImg.style.transition = 'transform 0.3s ease';
    });

    profileImg.addEventListener('mouseout', () => {
        profileImg.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', async function () {
    const correo = localStorage.getItem('correo'); // Recuperar el correo
  
    try {
      const respuesta = await fetch(`http://localhost:3000/api/perfil/${correo}`);
      const perfil = await respuesta.json();

      console.log('Respuesta del servidor:', perfil);
  
      if (respuesta.ok) {
        // Rellenar los campos del formulario con los datos recibidos
        document.getElementById('nombres').value = perfil.nombres || '';
        document.getElementById('apellidos').value = perfil.apellidos || '';
        document.getElementById('direccion').value = perfil.direccion || '';
        document.getElementById('numero-telefono').value = perfil.telefono || '';
        document.getElementById('biografia').value = perfil.biografia || '';
        //document.querySelector(`input[name="genero"][value="${perfil.genero}"]`)?.checked = true;
        document.getElementById('fecha de nacimiento').value = perfil.fecha_nacimiento || '';
      } else {
        alert(`Error: ${perfil.mensaje || 'No se pudo obtener el perfil.'}`);
      }
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      alert('Hubo un problema al cargar el perfil.');
    }
  });
  