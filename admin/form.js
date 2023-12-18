const templateProf = `<div class="form-check">
  <input class="form-check-input" type = "radio" name = "radioProf" id="radioProf%ID">
    <label class="form-check-label" for="radioProf%ID">%TESTO</label>
  </div > `
export const profForm = (professori) => {
  let string = '';
  for (let i = 0; i < professori.length; i++) {
    string += templateProf.replace("%ID", i).replace("%TESTO", "<p>" + professori[i].nome + " " + professori[i].cognome + "</p>");
  }
  return string + "</div>";
}

const templateProfEdit = `<div class="form-check">
  <input class="form-check-input" type = "radio" name = "radioProfEdit" id="radioProf%ID">
    <label class="form-check-label" for="radioProf%ID">%TESTO</label>
  </div > `
export const profFormEdit = (professori) => {
  let string = '';
  for (let i = 0; i < professori.length; i++) {
    string += templateProfEdit.replace("%ID", i).replace("%TESTO", "<p>" + professori[i].nome + " " + professori[i].cognome + "</p>");
  }
  return string + "</div>";
}



const templateStud = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" name="studenti" id="checkStud%ID">
  <label class="form-check-label" for="checkStud%ID">
    %TESTO
  </label>
</div>`

export const studForm = (studenti) => {
  let string = '';
  for (let i = 0; i < studenti.length; i++) {
    string += templateStud.replace("%ID", i).replace("%TESTO", "<p>" + studenti[i].nome + " " + studenti[i].cognome + "</p>");
  }
  return string + "</div>";
}

const templateStudEdit = `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" name="studentiEdit" id="checkStud%ID">
  <label class="form-check-label" for="checkStud%ID">
    %TESTO
  </label>
</div>`

export const studFormEdit = (studenti) => {
  let string = '';
  for (let i = 0; i < studenti.length; i++) {
    string += templateStudEdit.replace("%ID", i).replace("%TESTO", "<p>" + studenti[i].nome + " " + studenti[i].cognome + "</p>");
  }
  return string + "</div>";
}

export const recuperaStudenti = (studenti) => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"][name="studenti"]');
  let checkboxCliccate = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxCliccate.push(studenti[i]);
    }
    checkboxes[i].checked = false;
  }
  return checkboxCliccate;
}

export const recuperaProfessore = (professori) => {
  let checkboxes = document.querySelectorAll('input[type="radio"][name="radioProf"]');
  let scelta = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      scelta = professori[i];
    }
    checkboxes[i].checked = false;
  }
  return scelta;
}


export const recuperaStudentiEdit = (studenti) => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"][name="studentiEdit"]');
  let checkboxCliccate = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxCliccate.push(studenti[i]);
    }
    checkboxes[i].checked = false;
  }
  return checkboxCliccate;
}

export const recuperaProfessoreEdit = (professori) => {
  let checkboxes = document.querySelectorAll('input[type="radio"][name="radioProfEdit"]');
  let scelta = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      scelta = professori[i];
    }
    checkboxes[i].checked = false;
  }
  return scelta;
}