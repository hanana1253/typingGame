const word = {
  words: [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
    'american',
    'australian',
    'brazil',
    'british',
    'catalan',
    'canadian',
    'danish',
    'dutch',
    'gaelic',
    'german',
    'french',
    'frisian',
    'international',
    'italian',
    'malaysian',
    'portuguese',
    'spanish',
    'swedish',
    'welsh'
  ],
  get getLength() {
    return this.words.length;
  },
  get getWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
};

export default word;
