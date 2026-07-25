/**
 * Short, playful one-liners shown on the start screen — one picked at random
 * per visit.
 *
 * These are deliberately unattributed party sayings rather than quotes put in
 * the mouth of a real person: inventing an attribution would be making up a
 * quote someone never said. Keep new ones short enough for one or two lines on
 * a phone.
 */
const QUOTES = [
  'Yksi kalja ei ole kalja.',
  'Kohtalo on jo sekoitettu.',
  'Nopat päättävät, sinä juot.',
  'Vesi on hyvä juoma. Toiselle.',
  'Tässä pelissä ei ole voittajia.',
  'Muisti on yliarvostettu.',
  'Kaikki hyvät tarinat alkavat näin.',
  'Kortti käskee, sinä tottelet.',
  'Kortit eivät neuvottele.',
  'Pakka on aina oikeassa.',
  'Rohkeus löytyy pakasta.',
  'Onni suosii rohkeita. Pakka ei.',
  'Jokainen kortti on uusi tilaisuus katua.',
  'Huominen on huomisen ongelma.',
  'Huomisen minä hoitaa tämän.',
  'Sanoit että vain yksi kierros.',
  'Vielä yksi kortti, sitten nukkumaan.',
  'Illan paras päätös oli tulla paikalle.',
  'Kukaan ei muista rauhallisia iltoja.',
  'Naapurit muistavat tämän illan.',
  'Tästä ei kerrota äidille.',
  'Ei huonoja kortteja, vain huonoa tuuria.',
  'Sattuma kaataa kovimmatkin.',
  'Suunnitelma B oli tämä peli.'
]

export const getRandomQuote = () => QUOTES[Math.floor(Math.random() * QUOTES.length)]
