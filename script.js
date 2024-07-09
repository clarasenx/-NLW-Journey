const section = document.querySelector("section");

const atividade = {
  nome: "lunch",
  data: new Date("2024-07-09 12:00"),
  finalizada: true,
};

const activities = [
  atividade,
  {
    nome: "gaming session",
    data: new Date("2024-07-09 17:00"),
    finalizada: true,
  },
  {
    nome: "sleep time",
    data: new Date("2024-07-09 22:00"),
    finalizada: true,
  },
];

const createActivityItem = (atividade) => {
  let input = '<input type="checkbox" ';

  if (atividade.finalizada) {
    input += "checked";
  }

  input += ">";

  return `
  <div>
    ${input}
    <span>${atividade.nome}</span>
    <span>${atividade.data}</span>
  </div>
  `;
};

for (let atividade of atividades) {
  section.innerHTML += createActivityItem(atividade);
}
