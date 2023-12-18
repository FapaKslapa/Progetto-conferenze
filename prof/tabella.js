import { salvaDati } from "/src/cache.js";
import { trovaProfessore } from "/src/ricerca.js";
//template tabella
const tabella_testa = `<table class="table-custom"> <thead> <tr> <th>Studente</th> <th>Stato</th> <th>Modifica</th> </tr> </thead>`;
const tablella_corpo = `<tbody> %CONTENUTO_TABELLA </tbody> </table>`;
const tabella_contenuto = `<tr> <td>%NOME_COGNOME</td> <td id="stato%IDT0%IDT1">%STATO</td> <td><input type="checkbox" class="btn-check" id="bottoneModifica%ID1%ID2" autocomplete="off" %CHECK>
<label class="btn btn-outline-danger" for="bottoneModifica%ID1%ID2"><img width="30" height="30" src="icon/modifica.svg" alt="Modifica"></label>
 </td> </tr>`;

//template delle sezioni a scomparsa
const sezione_a_scomparsa = `
  <!-- sezione singola degli scompartimenti a scompartimenti a scomparsa -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne%NOME_DELLA_SEZIONE"
        aria-expanded="false" aria-controls="collapseOne%NOME_DELLA_SEZIONE">
        %NOME_DELLA_SEZIONE
      </button>
    </h2>
    <div id="collapseOne%NOME_DELLA_SEZIONE" class="accordion-collapse collapse" aria-labelledby="headingOne"
      data-bs-parent="#accordionExample" style="">
      <div class="accordion-body">
        <b>Argomento:</b> %CORPO_DELLA_SEZIONE
        <br>
        <br>
        <p>
          <!-- Pulsante per la sezione a scomparsa -->
          <button class="btn  btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample%NOME_DELLA_SEZIONE"
            aria-expanded="true" aria-controls="collapseExample%NOME_DELLA_SEZIONE">
            %TESTO_DEL_BOTTONE
          </button>
        </p>
        <br>
        <div class="collapse" id="collapseExample%NOME_DELLA_SEZIONE" style="">
          <div class="card card-body">
            %CONTENUTO_BOTTONE
          </div>
        </div>
      </div>
    </div>
  </div>
`;



//creazione dell'intero corpo centrale degli elementi a scomparsa
export const crea_elenco_classi = (array, arrayTot, div) => {

  //elenco delle classi del professore che poi verra messo su HTML
  let elenco_classi = "";

  //per ogni classe a cui il professore insegna genera la sezione a scomparsa della rispettiva classe
  for (let i = 0; i < array.length; i++) {

    let elenco_classe = sezione_a_scomparsa.replaceAll("%NOME_DELLA_SEZIONE", array[i].nome).replace("%CORPO_DELLA_SEZIONE", array[i].argomento).replace("%TESTO_DEL_BOTTONE", `Studenti iscritti<img width="30" height="30" src="icon/expand.svg" alt="Espandi">`);
    //crea una tabella degli studenti della rispettiva classe
    let tabella_classe = tabella_testa;
    let contenuto_tabella_classe = "";

    //per ogni studente della classe genera una riga della tabella
    for (let j = 0; j < array[i].studenti.length; j++) {
      contenuto_tabella_classe += tabella_contenuto.replace("%NOME_COGNOME", array[i].studenti[j].nome + " " + array[i].studenti[j].cognome).replace("%STATO", array[i].studenti[j].presenza ? 'Presente<img width="30" height="30" src="icon/presente.svg" alt="">' : 'Assente<img width="30" height="30" src="icon/assente.svg" alt="">').replace("%ID1", i).replace("%ID2", j).replace("%ID1", i).replace("%ID2", j).replace("%IDT0", i).replace("%IDT1", j).replace("%CHECK", array[i].studenti[j].presenza ? '' : 'checked');
    }
    console.log(contenuto_tabella_classe);
    //conclusione della tabella
    tabella_classe += tablella_corpo.replace("%CONTENUTO_TABELLA", contenuto_tabella_classe);
    elenco_classi += elenco_classe.replace("%CONTENUTO_BOTTONE", tabella_classe);
  }

  //mette il tutto sullla pagina HTML
  div.innerHTML = elenco_classi;
  checkClickPresenza(array, arrayTot);
}

const checkClickPresenza = (classi, arrayTot) => {
  for (let i = 0; i < classi.length; i++) {
    for (let j = 0; j < classi[i].studenti.length; j++) {
      const btnTmp = document.getElementById("bottoneModifica" + i + j)
      btnTmp.onclick = () => {
        if (!classi[i].studenti[j].presenza)
          classi[i].studenti[j].presenza = true;
        else
          classi[i].studenti[j].presenza = false;
        console.log(document.getElementById("stato" + i + j));
        document.getElementById("stato" + i + j).innerHTML = classi[i].studenti[j].presenza ? 'Presente<img width="30" height="30" src="icon/presente.svg" alt="">' : 'Assente<img width="30" height="30" src="icon/assente.svg" alt="">';
        const index = trovaProfessore(arrayTot, classi[0].professore);
        arrayTot[index].classi = classi;
        salvaDati(arrayTot, "arrayClassiProfessore");
      }
    }
  }
}