import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const { name, incidents, strikePoints, observations } = req.body;

  let strikePointConvert = parseInt(strikePoints)
  let date = new Date();
  console.log(strikePointConvert)

  console.log(req.body)
  const collection = client.db("strikeManager").collection("incidents");

  try {
    const result = await collection.insertOne({
      name: name ? name : null,
      incidents: incidents ? incidents : null,
      strikePoints: strikePointConvert ? strikePointConvert : null,
      observations: observations ? observations : "Muita Mão Colocar uma Obs. Mas Mereceu certo",
      updateDate: date

    });
   
    console.log(result);

    res.status(200).json({ message: "Strike Inserido!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}