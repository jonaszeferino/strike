import { verifyObservations } from './strikeManagement'

describe('verifyObservations', () => {
  test('should return default message when no observation is passed', () => {
    const result = verifyObservations()
    expect(result).toBe('Muita Mão Colocar uma Obs. Mas Mereceu certo')
  })

  test('should truncate observation when it is longer than 100 characters', () => {
    const dummyObservationWith128Characters =
      'Jaime enfrentou consequências por sua má conduta recente, levando a um impacto significativo em sua reputação e relacionamentos.'

    const expectedResult =
      'Jaime enfrentou consequências por sua má conduta recente, levando a um impacto significativo em sua '

    const result = verifyObservations(dummyObservationWith128Characters)
    expect(result).toBe(expectedResult)
  })

  test('should return observation when it is shorter than 100 characters', () => {
    const expectedResult = 'Zefa é uma pessoa muito legal'

    const result = verifyObservations('Zefa é uma pessoa muito legal')
    expect(result).toBe(expectedResult)
  })
})
