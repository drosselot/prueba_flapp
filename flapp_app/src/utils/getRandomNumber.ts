const getRandomNaturalNumber = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
}

export default getRandomNaturalNumber;