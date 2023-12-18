//import delle funzioni che recuperano la lista dei professori e le classi
import { recuperaDati, recuperaFile } from "/src/cache.js";
import { filtraClassiLezione } from "/src/ricerca.js";
import { crea_elenco_classi } from "./tabella.js";


//variabili per l'accesso
const submitAccedi = document.getElementById("submit");
const cardAccedi = document.getElementById("cardAccedi");
const cardSubmit = document.getElementById("cardSubmit");
const errore = document.getElementById("errore");
//variabili del singolo professore
let professore = {};
let array = [];

//compartimenti a scomparsa
const compartimenti_a_scomparsa = document.getElementById("compartimenti_a_scomparsa");


//acesso alla pagina del professore
submitAccedi.onclick = () => {

  //recupero dati di accesso
  const email = document.getElementById("emailProfessore").value;
  const password = document.getElementById("passwordProfessore").value;

  //funzione per il recupero dei dati del professore e delle sue classi
  recuperaFile("./json/professori.json").then((data) => {
    for (let i = 0; i < data.professori.length; i++) {
      if (data.professori[i].mail == email && data.professori[i].password == password) {
        professore = data.professori[i];
      }
    }
    recuperaDati("arrayClassiProfessore").then((classi) => {
      if (classi.result.message !== "Does not exist") {
      const arrayTot = JSON.parse(classi.result);
      const array = filtraClassiLezione(arrayTot, professore);
      if (array !== -1) {
        cardAccedi.classList.add("displayNone");
        cardSubmit.classList.remove("displayNone");
        crea_elenco_classi(array, arrayTot, compartimenti_a_scomparsa);
      } else {
        errore.innerHTML = `<div class="alert alert-danger" role="alert">
         CREDENZIALI ERRATE! Riprova
        </div>`;
      }
      }
    });
  });
}


