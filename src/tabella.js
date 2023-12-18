const template = `
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#Collapse%ID">
      %TITOLO </button>
  </h2>
  <div id="Collapse%ID" class="accordion-collapse collapse" data-bs-parent="#classiAccordation">
    <div class="accordion-body">
     <b>Argomento: </b> %TESTO
      <br>
      <b>Professore: </b> %PROF
      <br>
      <br>
      <div class="row justify-content-end">
      <div class="col">
      <button class="btn  btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStud%ID" aria-expanded="false" aria-controls="collapseStud%ID">
        Studenti iscritti<img width="30" height="30"
                src="icon/expand.svg" alt="Espandi">
      </button>
      </div>
      </div>
      <br>
      <br>
      <div class="collapse" id="collapseStud%ID">
        <div class="card card-body">
          %STUDENTI
        </div>
      </div>
    </div>
    </div>
  </div>`;


export const createClassByArray = (array) => {
  let stringa = '';
  for (let i = 0; i < array.length; i++) {

    stringa += template.replace("%ID", i).replace("%ID", i).replace("%TITOLO", "<b>" + array[i].nome + "</b>")
      .replace("%TESTO", array[i].argomento).replace("%PROF", array[i].professore.nome + " " + array[i].professore.cognome).replace("%ID", i).replace("%ID", i).replace("%ID", i);
    let stringaStudenti = '';
    for (let j = 0; j < array[i].studenti.length; j++) {
      stringaStudenti += array[i].studenti[j].nome + " " + array[i].studenti[j].cognome + "<br>"
    }
    stringa = stringa.replace("%STUDENTI", stringaStudenti)
  }
  return stringa;
}