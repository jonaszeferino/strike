import client from '../../../mongoConnection'
import { verifyObservations } from './domain/strikeManagement'

export default async function handler(req, res) {
  const { name, incidents, strikePoints, observations, user_email } = req.body

  let strikePointConvert = parseInt(strikePoints)
  let date = new Date()
  console.log(strikePointConvert)

  console.log(req.body)
  const collection = client.db('strikeManager').collection('incidents')

  try {
    const result = await collection.insertOne({
      name: name ? name : null,
      incidents: incidents ? incidents : null,
      strikePoints: strikePointConvert ? strikePointConvert : null,
      observations: verifyObservations(observations),
      updateDate: date,
      user_email, user_email
    })

    console.log(result)

    res.status(200).json({ message: 'Strike Inserido!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
