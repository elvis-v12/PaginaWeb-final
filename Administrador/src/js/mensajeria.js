function mostrarBandeja() {
  document.getElementById("bandeja").style.display = "block";
  document.getElementById("redactar").style.display = "none";
  document.getElementById("mensaje-leido").style.display = "none";
}

function mostrarRedactar() {
  document.getElementById("redactar").style.display = "block";
  document.getElementById("bandeja").style.display = "none";
  document.getElementById("mensaje-leido").style.display = "none";
}

function abrirMensaje() {
  document.getElementById("bandeja").style.display = "none";
  document.getElementById("mensaje-leido").style.display = "block";
}

function cerrarMensaje() {
  document.getElementById("mensaje-leido").style.display = "none";
  document.getElementById("bandeja").style.display = "block";
}
