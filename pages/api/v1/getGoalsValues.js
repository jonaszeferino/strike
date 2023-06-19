import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const collection = client.db("strikeManager").collection("goals");

  try {
    const distinctNames = await collection.distinct("name");
    const pipeline = [
      { $match: { name: { $in: distinctNames } } },
      {
        $group: {
          _id: "$name",
          totalGoals: { $sum: "$goals" }
        }
      },
      {
        $sort: {
          totalGoals: -1,
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
