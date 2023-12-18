import { salvaDati, recuperaDati, recuperaFile } from "/src/cache.js";
import { filtraAlunno, filtraNomeLezione, filtraArgomentoLezione, filtraProfessoreLezione, filtraClassiLezione, filtraClassiLezioneNoPassword } from "/src/ricerca.js";
import { createClassByArray } from "/src/tabella.js";

const selezione = document.getElementById("selezione");
const bottone = document.getElementById("bottone");
const ricerca = document.getElementById("ricerca");
const accordion = document.getElementById("classiAccordation");
let arrayClassiProfessori = [];
let classi = [];
let array = [];
recuperaDati("arrayClassiProfessore")
  .then((data) => {
    if (data.result.message !== "Does not exist") {
    const classisalvate = JSON.parse(data.result);
    if (classisalvate !== "Does not exist") {
      for (let i = 0; i < classisalvate.length; i++) {
        arrayClassiProfessori.push(classisalvate[i]);
      }
    }
    }
  });
recuperaDati("classi")
  .then((data) => {
    if (data.result.message !== "Does not exist") {
    const classisalvate = JSON.parse(data.result);
    if (classisalvate !== "Does not exist") {
      for (let i = 0; i < classisalvate.length; i++) {
        classi.push(classisalvate[i]);
      }
    }
    }
  });
bottone.onclick = () => {
  if (selezione.value === "0")
    array = filtraClassiLezioneNoPassword(arrayClassiProfessori, ricerca.value);
  else if (selezione.value === "1")
    array = filtraNomeLezione(classi, ricerca.value);
  else if (selezione.value === "2")
    array = filtraArgomentoLezione(classi, ricerca.value);
  else if (selezione.value === "3") {
    const nomeCognome = ricerca.value.split(" ");
    console.log(nomeCognome);
    array = filtraAlunno(classi, nomeCognome[0], nomeCognome[1]);
  }
  if (array !== -1 && array.length !== 0)
    accordion.innerHTML = createClassByArray(array);
  else {
    accordion.innerHTML = `<div class="alert alert-primary" role="alert">
       Nessun risultato
      </div>`
  }
}