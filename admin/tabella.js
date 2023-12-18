import { salvaDati } from "/src/cache.js";
import { profFormEdit, studFormEdit, recuperaStudentiEdit, recuperaProfessoreEdit } from "./form.js";
import { checkRipetizione } from "/src/ricerca.js";

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
      <div class="col-auto">
      <button type="button" class="btn btn-outline-primary" id="buttonModifica%ID"><img width="30" height="30"
        src="icon/modifica.svg" alt="Modifica" data-bs-toggle="modal" data-bs-target="#modalModifica"></button>
      </div>
      <div class="col-auto">
      <button type="button" class="btn btn-outline-danger" id="buttonElimina%ID"><img width="30" height="30"
        src="icon/elimina.svg" alt="Elimina"></button>
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

export const createClass = (nome, argomento, professore, studenti, id) => {

  let stringa = template.replace("%ID", id).replace("%ID", id).replace("%TITOLO", "<b>" + nome + "</b>")
    .replace("%TESTO", argomento).replace("%PROF", professore.nome + " " + professore.cognome).replace("%ID", id).replace("%ID", id).replace("%ID", id).replace("%ID", id);
  let stringaStudenti = '';
  for (let i = 0; i < studenti.length; i++) {
    stringaStudenti += studenti[i].nome + " " + studenti[i].cognome + "<br>"
  }
  return stringa.replace("%STUDENTI", stringaStudenti);
}

export const createClassByArray = (array) => {
  let stringa = '';
  for (let i = 0; i < array.length; i++) {
    stringa += template.replace("%ID", i).replace("%ID", i).replace("%TITOLO", "<b>" + array[i].nome + "</b>")
      .replace("%TESTO", array[i].argomento).replace("%PROF", array[i].professore.nome + " " + array[i].professore.cognome).replace("%ID", i).replace("%ID", i).replace("%ID", i).replace("%ID", i).replace("%ID", i);
    let stringaStudenti = '';
    for (let j = 0; j < array[i].studenti.length; j++) {
      stringaStudenti += array[i].studenti[j].nome + " " + array[i].studenti[j].cognome + "<br>"
    }
    stringa = stringa.replace("%STUDENTI", stringaStudenti)
  }
  return stringa;
}


export const addClass = (nome, argomento, professore, studenti) => {
  for (let i = 0; i < studenti.length; i++) {
    studenti[i].presenza = false;
  }
  return {
    "professore": professore,
    "nome": nome,
    "argomento": argomento,
    "studenti": studenti
  }
}

export const checkClickRemove = (array, div) => {
  for (let i = 0; i < array.length; i++) {
    const btnTmp = document.getElementById("buttonElimina" + i)
    btnTmp.onclick = () => {
      array.splice(i, 1);
      div.innerHTML = createClassByArray(array);
      salvaDati(array, "classi");
      checkClickRemove(array, div);
    }
  }
}


export const checkClickEdit = (array, div, arrayStudenti, arrayProfessori, divStudenti, divProfessori, divErrore) => {
  for (let i = 0; i < array.length; i++) {
    const btnTmp = document.getElementById("buttonModifica" + i)
    btnTmp.onclick = () => {
      document.getElementById("modificaNomeLezione").value = array[i].nome;
      document.getElementById("modificaArgomentoLezione").value = array[i].argomento;
      divStudenti.innerHTML = studFormEdit(arrayStudenti);
      divProfessori.innerHTML = profFormEdit(arrayProfessori);
      modificaClasse.onclick = () => {
        const nome = document.getElementById("modificaNomeLezione");
        const argomento = document.getElementById("modificaArgomentoLezione");
        const professore = recuperaProfessoreEdit(arrayProfessori);
        const studenti = recuperaStudentiEdit(arrayStudenti);
        if (professore !== 0 && studenti !== [] && nome.value !== "" && argomento.value !== "") {
          if (checkRipetizione(array, nome.value)) {
            divErrore.innerHTML = `<div class="alert alert-danger align-items-center" role="alert">
              <div>
                ERRORE, il nome della classe deve essere univoco <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>`;
          } else {
            edit(array, addClass(nome.value, argomento.value, professore, studenti), i);
            div.innerHTML = createClassByArray(array);
            salvaDati(filtraClassi(array, arrayProfessori), "arrayClassiProfessore");
            salvaDati(array, "classi");
          }
        } else {
          divErrore.innerHTML = `<div class="alert alert-danger align-items-center" role="alert">
            <div>
              ERRORE, compila tutti i campi! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>`;
        }
        checkClickRemove(array, div);
        checkClickEdit(array, div, arrayStudenti, arrayProfessori, divStudenti, divProfessori, divErrore);
      }
    }
  }
}

const edit = (array, dict, pos) => {
  array[pos] = dict;
}


export const filtraClassi = (classi, professori) => {
  const result = professori.map(professore => {
    const professorClasses = classi.filter(classe => classe.professore.mail === professore.mail);
    return {
      professore,
      classi: professorClasses.length > 0 ? professorClasses : []
    };
  });
  return result;

}