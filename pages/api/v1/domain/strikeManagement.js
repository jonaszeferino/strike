export function verifyObservations(observation) {
  if (!observation) return 'Muita Mão Colocar uma Obs. Mas Mereceu certo'
  if (observation.length > 100) return observation.substring(0, 100)

  return observation
}
