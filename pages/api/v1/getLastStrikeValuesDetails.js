import client from "../../../mongoConnection";

// req.query - usa uma querystring
// req.body - usa no corpo

export default async function handler(req, res) {
  const collection = client.db("strikeManager").collection("incidents");
  const { name } = req.query;
  console.log(req.query);

  try {
    let pipeline = [];

    if (name) {
      // Se um nome foi fornecido, adicione a condição de pesquisa por nome
      pipeline.push({ $match: { name } });
    }

    // Adicione a etapa de classificação com base em updateDate
    pipeline.push({
      $sort: {
        updateDate: -1, // Classifique por updateDate em ordem decrescente
      },
    });

    pipeline.push({
      $limit: 20, // Limita o resultado aos últimos 20 registros
    });

    const result = await collection.aggregate(pipeline).toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os dados' });
  }
}
