export const MediaCovid = (dados) => {
  let total = 0;
  let count = 0;
  dados.forEach((el) => {
    if (el.teveCovid === 'Sim') {
      total += el.idade;
      count++;
    }
  });
  return (total / count).toFixed(4);
};

export const MedCovidLess = (dados) => {
  let total = 0;
  let count = 0;
  dados.forEach((el) => {
    if (el.teveCovid !== 'Sim') {
      total += el.idade;
      count++;
    }
  });
  return (total / count).toFixed(4);
};

export const YoungPerson = (dados) => {
  let idade = 100;
  dados.forEach((el) => {
    if (el.idade <= idade && el.doses === 3) {
      idade = el.idade;
    }
  });
  return idade;
};

export const OldPerson = (dados) => {
  let idade = 0;
  dados.forEach((el) => {
    if (el.idade >= idade && el.doses === 3) {
      idade = el.idade;
    }
  });
  return idade;
};

export const PercCovid = (dados) => {
  let total = 0;
  let pessoas = 0;
  dados.forEach((el) => {
    total++;
    if (el.teveCovid === 'Sim' && el.doses === 0) {
      pessoas++;
    }
  });
  return (pessoas * 100) / total;
};

export const PercCovidThree = (dados) => {
  let total = 0;
  let pessoas = 0;
  dados.forEach((el) => {
    total++;
    if (el.teveCovid === 'Sim' && el.doses === 3) {
      pessoas++;
    }
  });
  return (pessoas * 100) / total;
};

export const MediaDoses = (dados) => {
  let doses = 0;
  let pessoas = 0;
  dados.forEach((el) => {
    doses += el.doses;
    pessoas++;
  });
  return (pessoas / doses).toFixed(4);
};
