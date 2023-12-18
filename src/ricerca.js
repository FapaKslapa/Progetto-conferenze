export const filtraAlunno = (arrayDizionari, nomeAlunno, cognomeAlunno) => {
  const lezioniFiltrate = arrayDizionari.filter((dizionario) => {
    return dizionario.studenti.some((alunno) => {
      return alunno.nome === nomeAlunno && alunno.cognome === cognomeAlunno;
    });
  });
  if (lezioniFiltrate === undefined) return -1
  return lezioniFiltrate;
}


export const filtraNomeLezione = (arrayDizionari, nomeLezioneDaCercare) => {
  const lezioneTrovata = arrayDizionari.find((dizionario) => {
    return dizionario.nome === nomeLezioneDaCercare;
  });
  if (lezioneTrovata === undefined) return -1
  return [lezioneTrovata];
}

export const filtraProfessoreLezione = (arrayDizionari, professoreDaCercare) => {
  const lezioniFiltrate = arrayDizionari.filter((dizionario) => {
    return dizionario.professore === professoreDaCercare;
  });
  if (lezioniFiltrate === undefined) return -1
  return lezioniFiltrate;
}


export const filtraArgomentoLezione = (arrayDizionari, argomentoDaCercare) => {
  const lezioniFiltrate = arrayDizionari.filter((dizionario) => {
    return dizionario.argomento === argomentoDaCercare;
  });
  if (lezioniFiltrate === undefined) return -1
  return lezioniFiltrate;
}

export const filtraClassiLezione = (arrayDizionari, professore) => {
  const lezioneTrovata = arrayDizionari.find((dizionario) => {
    return dizionario.professore.mail === professore.mail && dizionario.professore.password === professore.password
  });
  if (lezioneTrovata === undefined) return -1
  return lezioneTrovata.classi;
}

export const filtraClassiLezioneNoPassword = (arrayDizionari, professore) => {
  const lezioneTrovata = arrayDizionari.find((dizionario) => {
    return dizionario.professore.mail === professore
  });
  if (lezioneTrovata === undefined) return -1
  return lezioneTrovata.classi;
}

export const trovaProfessore = (arrayDizionari, professoreScelto) => {
  for (let i = 0; i < arrayDizionari.length; i++) {
    const professore = arrayDizionari[i].professore;
    if (professore.mail === professoreScelto.mail && professore.password === professoreScelto.password) {
      return i;
    }
  }
  return -1;
}



export const ricercaAdmin = (admin, array) => {
  for (const utente of array) {
    if (utente.email === admin.email && utente.password === admin.password) {
      return true;
    }
  }
  return false;
}

export const checkRipetizione = (array, nome) => {
  console.log(array)
  console.log(nome);
  for (const lezione of array) {
    if (lezione.nome === nome) {
      return true;
    }
  }
  return false;
}
