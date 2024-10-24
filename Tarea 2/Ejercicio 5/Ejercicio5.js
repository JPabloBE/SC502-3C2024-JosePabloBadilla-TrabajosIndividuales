const estudiantes = [
  { nombre: "José Pablo", apellido: "Badilla", nota: 90 },
  { nombre: "Jackdanny", apellido: "Delgado", nota: 90 },
  { nombre: "Gersan", apellido: "Agüero", nota: 70 },
  { nombre: "Christiam", apellido: "Jiménez", nota: 92 },
];

const listaDiv = document.getElementById("listaEstudiantes");
let totalNotas = 0;

estudiantes.forEach((estudiante) => {
  listaDiv.innerHTML += `<p>${estudiante.nombre} ${estudiante.apellido} - Nota: ${estudiante.nota}</p>`;
  totalNotas += estudiante.nota;
});

const promedio = totalNotas / estudiantes.length;

const promedioNota = document.getElementById("promedioNota");
promedioNota.innerHTML = `Promedio de Notas: ${promedio.toFixed(2)}`;
