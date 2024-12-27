export const sample = (arr, seed = '') => {
  const random = seed === '' ? Math.random() : pseudoRandom(seed)
  return arr[Math.floor(random * arr.length)]
}

export const loadingSpinners = ['compass.svg', 'skull.svg']
const loadingMsg = ['']

const pseudoRandom = (seed) => {
  return Math.sin(seed * 10000) / 2 + 0.5
}

export const zeroMessage = [
  'Arrr, ye be flat broke!',
  "Ye're as poor as a landlubber!",
  "Ye've got no doubloons!",
  "Can't buy nothin' with nothin'!",
]

export const shopGreetings = [
  'icon:bapanada|*sigh* bapanada-|icon:freaking|errrr... i mean... |icon:scallywag|come in!',
  'well, if it isnt my favorite customer!',
  'Ahh, my favorite customer!',
  'raccoon has wares if you have coin!',
  'have a pretty penny you want to spend?',
  'your pockets look shiny today!',
  'that coinpurse looks heavy, let me help you with that.',
  "I have a feeling you're going to like what you see today.",
  'Hey there! You look like you could use some help.',
]

export const shopNoMoney = [
  "wait, you don't have any doubloons?!",
  "hold up, I can't smell any coin on you!",
  "hang on, where's the doubloons?",
  "wwwwaaitaminute... you don't got any doubloons?",
  "how much you got... wait, you don't got any doubloons?",
]

export const shopGetOut = [
  'Getouttahere!',
  'out out out!',
  'Get out!',
  'Come back once you got gold!',
  'whaddya take me for? wonathose nonprofit thingymajigs?',
  "you tryin ta steal from a thief! what's the world coming to!",
  "you can't take this stuff, i stole it fare and square!",
  'you trying to pull my tail?!',
]

export const tooManyBells = [
  'icon:freaking|Alright! |icon:threat|Enough with the bloody bells!~',
  'icon:holdingears|S-stop it! I got sensitive hear-holes over here!',
  'icon:freaking|stop ringing that annoysing bell!',
  "icon:notamused|argh, I'm regretting plundering that bell in the first place",
  'icon:threat|I swear on me mum & all my 27 siblings, stop with the bell!',
  "icon:threat|I didn't get marooned on this island to listen to that!",
  'S-stop taunting me with those infernal bells!',
  'Go annoy some tanuki on another island with those bells!',
]

const pirateyThings = [
  'bilge rat',
  'salty dog',
  'scurvy dog',
  'scallywag',
  'landlubber',
  'scurvy swashbuckler',
  'scurvy pirate',
  'scurvy sea dog',
  'scurvy sea rat',
  'scurvy sea scoundrel',
  'scurvy rat',
  'scurvy scallywag',
]

export const shopSelfClick = [
  "icon:question|w-what? but I'm not for sale",
  'icon:info|The only thing for sale here is the merchandise',
  'icon:holdingEars|hey buddy, hands to yourself',
  `icon:holdingEars|hands off ${sample(pirateyThings)}!`,
  "icon:threat|I'll have you know I'm not for sale!",
  "icon:threat|You ain't gonna plunder this booty!",
  "icon:freaking|N-no! You can't buy me! |icon:sticker|I'm not gonna be some collectible sticker sheet!",
  "icon:freaking|N-no! You can't buy me! |icon:sticker2|I'm not gonna be some collectible sticker sheet!",
  "icon:threat|hey!! i'm allergic to cursors!",
  "icon:thumbs|guess who's got 2 thumbs and is not for sale!",
  `click me one more time, i dare you... ya ${sample(pirateyThings)}!`,
  'icon:freaking|w-wait. |icon:blushing|you want to buy me? really?',
  'icon:fluster|stop clicking! t-that tickles!',
  'd-did you just click me?!',
]

export const shopHelp = [
  'how can i help ye?',
  'wadya wanna buy?',
  "the mutinied capt' trash-beard at your service!",
]

const superstitionItems = [
  'black cat',
  "rabbit's foot",
  'horseshoe',
  "horse's paw",
  "rabbit's shoe",
  "monkey's paw",
  'whole rabbit',
  'broken mirror',
  'ladder',
  'whole salt shaker',
  'four-leaf clover',
  'three-leaf clover with an extra leaf taped on',
  'whole leprechaun (not just the bones)',
  'whole leprechaun (not just the charms)',
  'whole leprechaun (not just the gold)',
  'lucky coin',
  'pinch of salt',
]

const superstitions = [
  'spits over shoulder',
  'spins around three times',
  'knocks on wood',
  'throws salt over shoulder',
  'crosses fingers',
  'signs the cross with her tail',
  'spits in her hat',
  "grabs a rabbit's foot",
  `throws a ${sample(superstitionItems)} over her shoulder`, // be careful. this one... is pretty out there
]

export const shopCursed = [
  `Blimey! You've been cursed? *${sample(superstitions)}* and then *${sample(superstitions)}*`,
  `Ye've been cursed? *${sample(superstitions)}* and then *${sample(superstitions)}*`,
  "By the seven seas! You've been cursed? *spits over shoulder*",
  `You've been cursed?! Get off me island you ${sample(pirateyThings)}!`,
  "Hang on, you're cursed? Go take a long walk off a short plank!",
  'Hold on... are you cursed? Read the sign– no blessing, no business!',
  "wait... are you C-C-CURSED?! I don't want any trouble!",
]

export const shopBlessed = [
  "Blimey! You got a blessing, didja? Well that's gotta do good for business seeing such upstanding pirate folk shoping here.",
  "Wow! You got the boon of a pirate's blessing!",
  `Blimey, a pirate's blessing! *She ${sample(superstitions)}, according to pirate tradition.* Please, shop to your heart's content!`,
]

export const purchaseWords = [
  // Don't uniquify this! Some are rarer than others
  'Acquire',
  'Acquire',
  'Buye',
  'Buye',
  'Obtain',
  'Obtain',
  'Procure',
  'Procure',
  'Steal',
  'Plunder',
  'Plunder',
  'Plunder',
  'BitTorrent',
]

export const cantAffordWords = [
  'too expensive...',
  // "can't afford this...",
  "can't afford...",
  'unaffordable...',
  'out of reach...',
  'need doubloons...',
  'too pricey...',
  // "when you're richer...",
]

export const shopBanner = [
  'buy something or get out!',
  'spend your doubloons here!',
  'get that booty!',
  'NO REFUNDS',
  'feeling overburdened by money?',
  'plundered from the best dead adventurers in the land',
  'we accept doubloons and PiratePay™',
  'YARR',
  '🏴‍☠️',
  "you wouldn't download a ship...",
  "These prices are walkin' the plank!",
  'you break it, you buy it!',
  'pirate-owned and operated!',
  'caveat emptor',
  'all sales are final',
]

export const shopIcons = {
  freaking: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/0freaking.png',
  ded: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/1ded.png',
  info: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/2info.png',
  peefest: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/3pf.png',
  threat: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/4threatened.png',
  reading: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/5reading_2.png',
  reading2: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/6reading.png',
  scallywag: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/7scallywag.png',
  search: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/8searching_2.png',
  search2: 'https://cloud-iz667ljca-hack-club-bot.vercel.app/9searching.png',
  question: 'https://cloud-nfmmdwony-hack-club-bot.vercel.app/0000.png',
  cute: 'https://cloud-nfmmdwony-hack-club-bot.vercel.app/3003.png',
  tinfoil: 'https://cloud-nfmmdwony-hack-club-bot.vercel.app/4004.png',
  holdingEars: 'https://cloud-nfmmdwony-hack-club-bot.vercel.app/4004.png', // todo: draw this
  woah: 'https://cloud-e9zuzn0u0-hack-club-bot.vercel.app/3003.png',
  thumbs: 'https://cloud-r04a8za6c-hack-club-bot.vercel.app/1001.png',
}

export const shopMusicStart = [
  "icon:question|where's that music coming from?",
  "icon:question|who's playing that music?",
  "icon:question|where are those instruments?",
  "icon:holdingEars|that music is a little loud",
]

export const outOfStock = [
  "icon:question|where'd all the stock go?",
  "icon:question|come back when more washes up on shore",
]