import React from 'react';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import useFetch from './Hooks/useFetch';
import { Hash, State, City } from './api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import styles from './styles/App.module.css';
import {
  MediaCovid,
  MedCovidLess,
  YoungPerson,
  OldPerson,
  PercCovid,
  PercCovidThree,
  MediaDoses,
} from './Utils/functions';
const App = () => {
  const { request } = useFetch();
  const [data, setData] = React.useState(null);
  const [mediaCovid, setMediaCovid] = React.useState(null);
  const [medCovidLess, setMedCovidLess] = React.useState(null);
  const [youngPerson, setYoungPerson] = React.useState(null);
  const [oldPerson, setOldPerson] = React.useState(null);
  const [percCovid, setPercCovid] = React.useState(null);
  const [percCovidThree, setPercCovidThree] = React.useState(null);
  const [mediaDoses, setMediaDoses] = React.useState(null);

  React.useEffect(() => {
    async function fetchHash() {
      const { url, options } = Hash();
      const { response, json } = await request(url, options);

      if (response && response.ok) {
        const { hash } = json;
        const { url, options } = State(hash);
        const resp = await request(url, options);

        if (resp.response && resp.response.ok) {
          const { url, options } = City(resp.json.hash);
          const resp2 = await request(url, options);
          if (resp2.response && resp2.response.ok) {
            const { dados } = resp2.json;
            // console.log(dados);
            const newDados = dados.map((el, idx) => {
              el.teveCovid = el.teveCovid === true ? 'Sim' : 'Não';
              el.id = idx;
              return el;
            });
            setData(newDados);
          }
        }
      }
    }
    fetchHash();
  }, [request]);

  React.useEffect(() => {
    if (data) {
      setMediaCovid(MediaCovid(data));
      setMedCovidLess(MedCovidLess(data));
      setYoungPerson(YoungPerson(data));
      setOldPerson(OldPerson(data));
      setPercCovid(PercCovid(data));
      setPercCovidThree(PercCovidThree(data));
      setMediaDoses(MediaDoses(data));
    }
  }, [data]);

  const theme = createTheme(ptBR);

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 300 },
    { field: 'idade', headerName: 'Idade', width: 150 },
    { field: 'doses', headerName: 'Doses', width: 150 },
    { field: 'teveCovid', headerName: 'Pegou Covid', width: 150 },
  ];

  return (
    <>
      <div className={styles.table}>
        <ThemeProvider theme={theme}>
          <DataGrid rows={data ? data : []} columns={columns} />
        </ThemeProvider>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Idade da pessoa mais jovem que tomou as 3 doses da vacina.
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {youngPerson}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={styles.card}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Idade da pessoa mais velha que tomou as 3 doses da vacina.
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {oldPerson}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={styles.card}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Porcentagem de pessoas que tiveram covid sem tomar nenhuma dose
                da vacina.
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {`${percCovid} %`}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={styles.card}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Porcentagem de pessoas que tiveram covid tomando as 3 doses da
                vacina.
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {`${percCovidThree} %`}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={styles.card}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Média de doses por pessoas.
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {mediaDoses}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={styles.card}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Média de idade das pessoas que tiveram covid.
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {mediaCovid}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={styles.card}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Média de idade das pessoas que não tiveram covid.
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {medCovidLess}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default App;
