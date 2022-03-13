import abaixo from '../../public/db/abaixo10reais.json';

export default function handler(req, res) {
  res.status(200).json(abaixo)
}
