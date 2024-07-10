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
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true,
}

let activities = [atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-07-09 12:00"),
    finalizada: false
  },
  {
    nome: 'Gamming session',
    data: new Date("2024-07-09 16:00"),
    finalizada: true
  },
]

const createActivityItem = (atividade) => {
  let input = '<input type="checkbox" ';
  
  if (atividade.finalizada) {
    input += "checked";
  };
  
  input += ">"

  const dateFormated = formatDate(atividade.data)
  
  return `
  <div>
  ${input}
  <span>${atividade.nome}</span>
  <span>${dateFormated.dia.semana.longo}, dia ${dateFormated.dia.numerico} de ${dateFormated.mes} às ${dateFormated.hora}</span>
  </div>
  `
}

const updateActivityList = () => {
  const section = document.querySelector("section");
  section.innerHTML = '';

  if(activities.length == 0) {
    section.innerHTML = '<p>Nenhuma atividade cadastrada.</p>';
    return
  }

  for (let atividade of activities) {
    section.innerHTML += createActivityItem(atividade);
  }
}

updateActivityList();

const saveActivity = (event) => {
  event.preventDefault()
  const dadosForm = new FormData(event.target)

  const nome = dadosForm.get('atividade')
  const dia = dadosForm.get('dia')
  const hora = dadosForm.get('hora')
  const data = `${dia} ${hora}`

  const novaAtividade = {
    nome,
    data,
    finalizada: false
  }

  const atividadeExiste = activities.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if (atividadeExiste) {
    return alert('Dia/Hora indisponível')
  }

  activities = [novaAtividade, ...activities]
  updateActivityList();
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

const createHoursSelection = () => {
  let hoursAvailable = ''

  for(let i = 6; i < 23; i++) {
    hoursAvailable += `<option value="${i}:00">${i}:00</option>`
    hoursAvailable += `<option value="${i}:30">${i}:30</option>`
  }

  document
  .querySelector('select[name="hora"')
  .innerHTML = hoursAvailable
}

createHoursSelection();