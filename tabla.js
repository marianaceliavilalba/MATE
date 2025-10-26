const elementos = [
  {simbolo:"A",nombre:"Área Cuadrado",   formula:"A = a²",         desc:"Área de un cuadrado de lado a"},
  {simbolo:"B",nombre:"Área Rectángulo", formula:"A = b × h",      desc:"Área de un rectángulo de base b y altura h"},
  {simbolo:"C",nombre:"Área Triángulo",  formula:"A = (b × h)/2",  desc:"Área de un triángulo de base b y altura h"},
  {simbolo:"D",nombre:"Área Círculo",    formula:"A = π r²",       desc:"Área de un círculo de radio r"},
  {simbolo:"E",nombre:"Volumen Cubo",    formula:"V = a³",         desc:"Volumen de un cubo de arista a"},
  {simbolo:"F",nombre:"Volumen Esfera",  formula:"V = 4/3 π r³",   desc:"Volumen de una esfera de radio r"},
  {simbolo:"G",nombre:"Identidad (a+b)²",formula:"(a+b)² = a²+2ab+b²",desc:"Cuadrado de un binomio"},
  {simbolo:"H",nombre:"Identidad (a-b)²",formula:"(a-b)² = a²-2ab+b²",desc:"Cuadrado de un binomio diferencia"},
  {simbolo:"I",nombre:"Diferencia Cuadrados",formula:"a²-b²=(a+b)(a-b)",desc:"Factorización de diferencia de cuadrados"},
  {simbolo:"J",nombre:"Teorema Pitágoras",formula:"c² = a² + b²",  desc:"En triángulo rectángulo, hipotenusa c"},
  {simbolo:"K",nombre:"Ecuación Cuadrática",formula:"x = (-b±√Δ)/2a",desc:"Solución general de ax²+bx+c=0"},
  {simbolo:"L",nombre:"Distancia",       formula:"d = √[(x₂-x₁)²+(y₂-y₁)²]",desc:"Distancia entre dos puntos"},
  {simbolo:"M",nombre:"Pendiente",       formula:"m = (y₂-y₁)/(x₂-x₁)",desc:"Pendiente de una recta"},
  {simbolo:"N",nombre:"Media",           formula:"x̄ = Σx/n",        desc:"Media aritmética de n datos"},
  {simbolo:"O",nombre:"Mediana",         formula:"Posición central",desc:"Valor central de datos ordenados"},
  {simbolo:"P",nombre:"Varianza",        formula:"σ² = Σ(x-x̄)²/n", desc:"Medida de dispersión"},
  {simbolo:"Q",nombre:"Combinatoria",    formula:"C(n,k)=n!/(k!(n-k)!)",desc:"Combinaciones de n elementos tomados de k en k"},
  {simbolo:"R",nombre:"Probabilidad",    formula:"P = casos favorables/casos totales",desc:"Probabilidad simple"},
  {simbolo:"S",nombre:"Logaritmo",       formula:"log_b(x)=y ↔ b^y=x",desc:"Definición de logaritmo en base b"},
  {simbolo:"T",nombre:"Interés Simple",  formula:"I = P·r·t",      desc:"Interés simple: P capital, r tasa, t tiempo"}
];

let actual = null;
const $ = id => document.getElementById(id);
const hidden = el => el.classList.add("hidden");
const show = el => el.classList.remove("hidden");

function renderTabla(lista = elementos) {
  const tabla = $("tabla");
  tabla.innerHTML = "";
  lista.forEach(el => {
    const div = document.createElement("div");
    div.className = "elemento";
    div.innerHTML = `
      <div class="simbolo">${el.simbolo}</div>
      <div class="nombre">${el.nombre}</div>
      <div class="formula">${el.formula}</div>
    `;
    div.onclick = () => mostrarDetalle(el);
    tabla.appendChild(div);
  });
}

function mostrarDetalle(el) {
  actual = el;
  $("modal-title").textContent = el.nombre;
  $("modal-formula").textContent = el.formula;
  $("modal-desc").textContent = el.desc;
  $("ejercicio-box").classList.add("hidden");
  $("feedback").textContent = "";
  $("resp-user").value = "";
  show($("modal"));
}

$("close-modal").onclick = () => hidden($("modal"));

$("btn-ejercicio").onclick = () => generarEjercicio(actual);

function generarEjercicio(el) {
  const box = $("ejercicio-box");
  box.classList.remove("hidden");
  $("feedback").textContent = "";

  let texto = "", sol = 0;
  switch (el.simbolo) {
    case "A":
      const lado = Math.floor(Math.random() * 9) + 2;
      texto = `Calcula el área de un cuadrado de lado ${lado} cm.`;
      sol = lado * lado;
      break;
    case "D":
      const r = Math.floor(Math.random() * 9) + 1;
      texto = `Hallá el área de un círculo de radio ${r} cm (π ≈ 3.14).`;
      sol = Math.round(Math.PI * r * r);
      break;
    case "J":
      const a = Math.floor(Math.random() * 6) + 3;
      const b = Math.floor(Math.random() * 6) + 3;
      texto = `Un triángulo rectángulo tiene catetos ${a} cm y ${b} cm. Calcula la hipotenusa.`;
      sol = Math.round(Math.sqrt(a * a + b * b));
      break;
    case "N":
      const datos = Array.from({length: 5}, () => Math.floor(Math.random() * 10) + 1);
      texto = `Hallá la media de los datos: ${datos.join(", ")}.`;
      sol = Math.round(datos.reduce((s, v) => s + v, 0) / datos.length);
      break;
    default:
      texto = "Ejercicio no implementado para esta fórmula.";
      sol = 0;
  }
  $("ejercicio-text").textContent = texto;
  box.dataset.sol = sol;
}

$("btn-check").onclick = () => {
  const resUser = Number($("resp-user").value);
  const sol = Number($("ejercicio-box").dataset.sol);
  const feed = $("feedback");
  if (resUser === sol) {
    feed.textContent = "¡Correcto! 🎉";
    feed.style.color = "#4caf50";
  } else {
    feed.textContent = `Incorrecto. Respuesta: ${sol}`;
    feed.style.color = "#f44336";
  }
};

// Buscador
$("buscador").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtrados = elementos.filter(el =>
    el.nombre.toLowerCase().includes(q) ||
    el.formula.toLowerCase().includes(q)
  );
  renderTabla(filtrados);
});

// Dark mode
$("btn-dark").onclick = () => {
  document.body.classList.toggle("dark");
  $("btn-dark").innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
};

// Arranque
renderTabla();