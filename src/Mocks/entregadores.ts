export interface Entregador {
  name: string;
  averageTime: string;
  rank: number;
  month: string;
}
const nomes = ["João", "Maria", "José", "Ana", "Pedro", "Mariana", "Carlos", "Julia", "Fernando", "Luana"];
const sobrenomes = ["Silva", "Santos", "Pereira", "Ferreira", "Gomes", "Rodrigues", "Lima", "Costa", "Almeida", "Nunes"];
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


const objetos: Entregador[] = [];

for (let i = 0; i < 100; i++) {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const averageTime = Math.floor(Math.random() * 50 + 10) + "m";
  const rank = i + 1;
  const month = meses[Math.floor(Math.random() * meses.length)];

  const objeto: Entregador = {
    name: `${nome} ${sobrenome}`,
    averageTime: averageTime,
    rank: rank,
    month: month
  };

  objetos.push(objeto);
}

export const entregadores: Entregador[] = objetos