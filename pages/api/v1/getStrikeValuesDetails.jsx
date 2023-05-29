import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const collection = client.db("strikeManager").collection("incidents");
  const { name } = req.query;
  console.log(req.query)

  try {
    
    const pipeline = [
      { $match: { name } }, 
     
      {
        $sort: {
          totalStrikePoints: -1,
          _id: 1
        }
      }
    ];
    const result = await collection.aggregate(pipeline).toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os dados' });
  }
}
// aqui estão buscando pelo nome dentro da prop "name"
