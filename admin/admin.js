import { salvaDati, recuperaDati, recuperaFile } from "/src/cache.js";
import { profForm, studForm, recuperaStudenti, recuperaProfessore } from "./form.js";
import { addClass, createClassByArray, checkClickRemove, checkClickEdit, filtraClassi } from "./tabella.js";
import { ricercaAdmin, checkRipetizione } from "/src/ricerca.js";
const accordion = document.getElementById("classiAccordation");
const submitAccedi = document.getElementById("submit");
const cardAccedi = document.getElementById("cardAccedi");
const cardSubmit = document.getElementById("cardMain");
const modalProfBody = document.getElementById("modalProfBody");
const modalStudBody = document.getElementById("modalStudBody");
const inviaClasse = document.getElementById("inviaClasse");
const modificaStudBody = document.getElementById("modificaModalStudBody");
const modificaModalProfBody = document.getElementById("modificaModalProfBody");
const nomeAdmin = document.getElementById("nomeAdmin");
const passwordAdmin = document.getElementById("passwordAdmin");
const errore = document.getElementById("errore");
const erroreForm = document.getElementById("erroreForm");

const arrayStudenti = [];
const arrayProfessori = [];
let arrayClassi = [];
let arrayClassiProfessori = [];
const nome = document.getElementById("nomeLezione");
const argomento = document.getElementById("argomentoLezione");
let professore = 0;
let studenti = 0;

submitAccedi.onclick = () => {
  recuperaFile("./json/admin.json")
    .then((data) => {
      const array = data.admin;
      const dict = { email: nomeAdmin.value, password: passwordAdmin.value };
      const check = ricercaAdmin(dict, array);
      if (check) {
        recuperaFile("./json/studenti.json")
          .then((data) => {
            modalStudBody.innerHTML = studForm(data.studenti);
            for (let i = 0; i < data.studenti.length; i++) {
              arrayStudenti.push(data.studenti[i]);
            }
          })
        recuperaFile("./json/professori.json")
          .then((data) => {
            modalProfBody.innerHTML = profForm(data.professori);
            for (let i = 0; i < data.professori.length; i++) {
              arrayProfessori.push(data.professori[i]);
            }
          })
        recuperaDati("classi")
          .then((data) => {
            if (data.result.message !== "Does not exist") {
               const classisalvate = JSON.parse(data.result);
              for (let i = 0; i < classisalvate.length; i++) {
                arrayClassi.push(classisalvate[i]);
              }
            }
            accordion.innerHTML = createClassByArray(arrayClassi);
            checkClickRemove(arrayClassi, accordion);
            checkClickEdit(arrayClassi, accordion, arrayStudenti, arrayProfessori, modificaStudBody, modificaModalProfBody, erroreForm);
          })
        recuperaDati("arrayClassiProfessore")
          .then((data) => {  
            if (data.result.message !== "Does not exist") {
              const classisalvate = JSON.parse(data.result);
              for (let i = 0; i < classisalvate.length; i++) {
                arrayClassiProfessori.push(classisalvate[i]);
              }
            }
          })
        cardAccedi.classList.add("displayNone");
        cardSubmit.classList.remove("displayNone");
      } else {
        errore.innerHTML = `<div class="alert alert-danger" role="alert">
         CREDENZIALI ERRATE! Riprova
        </div>`;
      }
    })
}

inviaClasse.onclick = () => {
  professore = recuperaProfessore(arrayProfessori);
  studenti = recuperaStudenti(arrayStudenti);
  if (professore !== 0 && studenti !== [] && nome.value !== "" && argomento.value !== "") {
    if (checkRipetizione(arrayClassi, nome.value)) {
      erroreForm.innerHTML = `<div class="alert alert-danger align-items-center" role="alert">
        <div>
          ERRORE, il nome della classe deve essere univoco <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>`;
    } else {
      arrayClassi.push(addClass(nome.value, argomento.value, professore, studenti));
      accordion.innerHTML = createClassByArray(arrayClassi);
      salvaDati(arrayClassi, "classi");
      arrayClassiProfessori = filtraClassi(arrayClassi, arrayProfessori);
      salvaDati(arrayClassiProfessori, "arrayClassiProfessore");
    }
  } else {
    erroreForm.innerHTML = `<div class="alert alert-danger align-items-center" role="alert">
      <div>
        ERRORE, compila tutti i campi! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>`;
  }
  nome.value = "";
  argomento.value = "";
  checkClickRemove(arrayClassi, accordion);
  checkClickEdit(arrayClassi, accordion, arrayStudenti, arrayProfessori, modificaStudBody, modificaModalProfBody, erroreForm);

}

