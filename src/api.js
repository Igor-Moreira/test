export const API_URL =
  'https://sistemaagely.com.br:8345/recrutamentoagely/covid?service=';

export function Hash() {
  return {
    url: API_URL + 'uf&filter=mg',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  };
}

export function State(hash) {
  return {
    url: API_URL + `cidade&filter=passos&hash=${hash}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  };
}

export function City(hash) {
  return {
    url: API_URL + `dados&hash=${hash}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  };
}
