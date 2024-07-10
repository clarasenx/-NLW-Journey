const formatDate = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }  
}

const atividade = {
  nome: "Lunch Time",
  data: new Date("2024-07-09 12:00"),
  finalizada: true,
};

let activities = [atividade];

const createActivityItem = (atividade) => {
  let input = '<input type="checkbox" ';
  
  if (atividade.finalizada) {
    input += "checked";
  }
  
  input += ">";

  const dateFormated = formatDate(atividade.data);
  
  return `
  <div>
  ${input}
  <span>${atividade.nome}</span>
  <span>${dateFormated.dia.semana.longo}, dia ${dateFormated.dia.numerico} de ${dateFormated.mes} às ${dateFormated.hora}</span>
  </div>
  `;
};

const updateActivityList = () => {
  const section = document.querySelector("section");

  if(activities.length == 0) {
    section.innerHTML = '<p>Nenhuma atividade cadastrada.</p>'
    return
  }

  for (let atividade of activities) {
    section.innerHTML += createActivityItem(atividade);
  }
}

updateActivityList();

const saveActivity = (event) => {
  event.preventDefault()
}

const createDaysSelection = () => {
  const dias = [
    '2024-02-28',
    '2024-02-29',
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
  ]

  let diasSelecao = ''

  for(let dia of dias) {
    const formatar = formatDate(dia)
    const date = `
    ${formatar.dia.numerico} de ${formatar.mes}
    `
    diasSelecao += `
      <option value="${dia}">${date}</option>
    `
  }
  document
  .querySelector('select[name="dia"')
  .innerHTML = diasSelecao
}

createDaysSelection();