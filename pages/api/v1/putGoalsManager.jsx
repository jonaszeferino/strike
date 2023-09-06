import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const { name, incidents, goals, observationsGoals, user_email } = req.body;

  let goalsConvert = parseInt(goals)
  let date = new Date();
  console.log(goalsConvert)

  console.log(req.body)
  const collection = client.db("strikeManager").collection("goals");

  try {
    const result = await collection.insertOne({
      name: name ? name : null,
      incidents: incidents ? incidents : null,
      goals: goalsConvert ? goalsConvert : null,
      observationsGoals: observationsGoals ? observationsGoals : "Pontução por Caridade - Muita Mão Digitar algo",
      updateDate: date,
      user_email: user_email
 });
   
    console.log(result);

    res.status(200).json({ message: "Goal Inserido!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}