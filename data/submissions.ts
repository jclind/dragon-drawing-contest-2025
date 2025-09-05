const submissionsPath = '/images/submissions'

export const submissions = [
  {
    id: 'christa',
    creator: 'Christa',
    dragonName: 'The Cloud Gem',
    dragonDescription: '',
    imageSrc: `${submissionsPath}/christa.webp`,
  },
  {
    id: 'ben',
    creator: 'Ben',
    dragonName: 'Merlynosaurus',
    dragonDescription:
      'Drum roll please…….. The Merlynosaurus has entered the ring! This guy has starry wings for nighttime flying camouflage, can summon volcanoes with the powerful thumps of his tail, harnesses lighting from the volcanic ash clouds, and is afraid of homework.',
    dragonInfo: [{}],
    imageSrc: `${submissionsPath}/ben.webp`,
  },
  {
    id: 'lucas',
    creator: 'Lucas',
    dragonName: 'Shenlong',
    dragonDescription: `Shenlong, the master dragon. His breath is as powerful as a Category 5 hurricane, and his winds can produce tornadoes. His tail holds a ruby that concentrates the power of magma from the Earth's core. His heart is a gem no human has ever seen before, and his eyes shoot laser beams as powerful as the sun.
He is the master dragon , that can capture the judges ( hehe ) imagination! `,
    imageSrc: `${submissionsPath}/lucas.webp`,
  },
  {
    id: 'patrick',
    creator: 'Patrick',
    dragonName: 'Lingwyrm (“Long Worm”)',
    dragonDescription: 'Amphibious nightmare',
    dragonInfo: [
      { key: 'Weakness', value: 'hoarded treasure' },
      { key: 'Delicacy', value: 'valiant warriors' },
      { key: 'Attack', value: 'strangles his prey and burns his foes' },
    ],
    imageSrc: `${submissionsPath}/patrick.webp`,
  },
  {
    id: 'mateo',
    creator: 'Mateo',
    dragonName: 'The Charchror',
    dragonDescription:
      'The Master Dragon - The Charchror - shall be the best dragon of all. It can resist 800,000 *C and breathes magma and can sting you to death with a single strike of its scorpion tail. It flies through the sky like a meteor on fire. Then it goes back to its volcano to sleep for 1000 years. ',
    imageSrc: `${submissionsPath}/mateo.webp`,
  },
  {
    id: 'jack',
    creator: 'Jack',
    dragonName: 'Madra',
    dragonDescription:
      'Every month on a full moon, the dragon comes out of his volcano for food, and the first thing he spots he hunts until capture. ',
    dragonInfo: [
      { key: 'Food', value: 'anything' },
      { key: 'Enemies', value: 'other madra dragons' },
      { key: 'Weakness', value: 'water' },
      { key: 'Habitat', value: 'volcanoes' },
    ],
    imageSrc: `${submissionsPath}/jack.webp`,
  },
  {
    id: 'andrew',
    creator: 'Andrew',
    dragonName: 'Fire Horn',
    dragonDescription: '',
    dragonInfo: [
      { food: 'Humans, birds, and bunnies' },
      { 'Attack Weapons': 'Horns, jaws, and tail.' },
      { Foe: 'Tornado dragons ' },
    ],
    imageSrc: `${submissionsPath}/andrew.webp`,
  },
  {
    id: 'jesse',
    creator: 'Jesse',
    dragonName: 'IRONFLAME',
    dragonDescription: `A fierce purple dragon from the depths of the underground who's chain tail and fiery breath leave destruction in it's wake.`,
    dragonInfo: [
      {
        'Special Attack': `Ignites it's chain tail and unleashes it upon it's prey to simultaneously bind and sear them.`,
      },
      {
        weakness: `The chain tail weighs it down making it less agile in flight.`,
      },
      { Diet: 'Mountain goats and unsuspecting wandering humans' },
    ],
    imageSrc: `${submissionsPath}/jesse.webp`,
  },
  {
    id: 'peter',
    creator: 'Peter',
    dragonName: 'Laser Eyes',
    dragonDescription: `Cooks his food with lasers before consumption. 
Weapons: laser machine and spiked tail`,
    dragonInfo: [{ food: 'Other dragons and rats.' }],
    imageSrc: `${submissionsPath}/peter.webp`,
  },
].sort(() => Math.random() - 0.5)
