import acima from '../../public/db/acima10reais.json';

export default function handler(req, res) {
  res.status(200).json(acima)
}