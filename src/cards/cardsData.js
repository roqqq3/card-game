const cardsDataWithoutIds = [
  {
    "name": "Juo 3",
    "description": "Juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Huora",
    "description": "Olet huora. Juot aina, kun joku toinen juo, mutta enintään kerran per vuoro.",
    "rarity": 0,
    "continuous": true
  },
  {
    "name": "Valitse 3",
    "description": "Valitse joku juomaan 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "JUO",
    "description": "Juo juomasi tyhjäksi. Sinulla on 60 sekuntia aikaa.",
    "rarity": 80,
    "continuous": false
  },
  {
    "name": "Juo",
    "description": "Juo kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Valitse",
    "description": "Valitse joku juomaan kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "KELLOTA",
    "description": "Kellota juoma tai ota shotti (4cl).",
    "rarity": 80,
    "continuous": false
  },
  {
    "name": "Kysymysmestari",
    "description": "Olet kysymysmestari. Kaikki jotka vastaavat kysymyksiisi juovat kerran.",
    "rarity": 0,
    "continuous": true
  },
  {
    "name": "Sääntö",
    "description": "Keksi sääntö, jota kaikkien tulee noudattaa. Vanhat säännöt eivät ole enää voimassa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kesäpojat",
    "description": "Kaikki kesällä syntyneet juovat 3 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Jaa 5",
    "description": "Jaa 5 juontikertaa pelaajien kesken.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Juo n kertaa",
    "description": "Juo niin monta kertaa kuin on pelaajia pelissä.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kategoria",
    "description": "Keksi kategoria ja pelaajat vuorollaan sanovat tähän kategoriaan kuuluvia asioita. Se, jolla kestää yli 10 sekuntia, juo juomansa loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Riimi",
    "description": "Valitse sana ja pelaajat vuorollaan sanovat tätä sanaa rimmaavia sanoja. Se, jolla kestää yli 10 sekuntia, juo juomansa loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Vesiputous",
    "description": "Kaikki aloittavat juomisen ja voivat lopettaa, kun oikealla oleva pelaaja lopettaa. Sinä voit lopettaa milloin tahansa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "123",
    "description": "Juo yksi, oikealla istuva pelaaja 2, seuraava 3 jne. kunnes kierros käydään läpi.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Tarina",
    "description": "Aloita tarina yhdellä sanalla. Pelaajat vuorollaan lisäävät yhden sanan toistaen vanhat. Se, joka ei muista kaikkia sanoja, juo juomansa loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Demokratia",
    "description": "Äänestäkää pelaajaa yhtäaikaa. Pelaaja, joka sai eniten ääniä kellottaa juoman tai ottaa shotin (4cl).",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Kolikonheitto",
    "description": "Heitä kolikkoa. Jos klaava, kaikki juo 3 kertaa. Jos kruuna, sinä juot 6 kertaa.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Puolikas juoma",
    "description": "Jos juomastasi on alle puolet jäljellä, juo se loppuun. Jos ei, valitse joku juomaan juomansa loppuun.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Kaljamestari",
    "description": "Voit missä tahansa vaiheessa käskeä jotakin pelaajaa juomaan juomansa loppuun. Voidaan käyttää vain kerran.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Otahan lisää",
    "description": "Edellinen pelaaja juo 3 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Peukalomestari",
    "description": "Aina kun laitat peukalon pöytää vasten, pitää muiden pelaajien tehdä se myös. Viimeinen pelaajista juo. Tämän voi tehdä korkeintaan kerran vuorossa.",
    "rarity": 0,
    "continuous": true
  },
  {
    "name": "Epäonnen luku",
    "description": "Pelaajat aloittavat laskemisen vuorotellen. Kaikki numerot, jotka sisältävät tai ovat jaollisia numerolla 7 pitää skipata. Häviäjä juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Talvipojat",
    "description": "Kaikki talvella syntyneet juovat 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Pisimmät hiukset",
    "description": "Pelaaja, jolla on pisimmät hiukset, juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Osoittelupeli",
    "description": "Kaikki osoittavat sormella jotakin pelaajaa yhtäaikaa. Pelaaja, johon osoitetaan eniten juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Parillinen ikä",
    "description": "Jos ikäsi on on parillinen numero, juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Tiedekysymys",
    "description": "Kysy oikealla olevalta tiedekysymys. Jos vastaus on oikein, sinä juot 3. Jos väärin, hän juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Rumpali",
    "description": "Rummuta tahti pöytään. Oikealla olevan tulee rummuttaa sama. Jos epäonnistuu, juo 3. Jos onnistuu, sinä juot 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Totuus vai tehtävä",
    "description": "Oikealla oleva kysyy sinulta totuus vai tehtävä. Jos kieltäydyt, juot juomasi loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "2 totuutta ja valhe",
    "description": "Kerro 2 totuutta ja valhe itsestäsi. Oikealla oleva yrittää arvata valheen. Jos oikein, sinä juot 3. Jos väärin, hän juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kännissä?",
    "description": "Jos et muista edellistä korttiasi, juo. Muussa tapauksessa, valitse joku juomaan.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Mustat sukat",
    "description": "Kaikki pelaajat, joilla on mustat sukat, juovat.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Yleistieto",
    "description": "Kysy oikealla olevalta yleistietokysymys. Jos vastaus oikein, sinä juot 3. Jos väärin, hän juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Juomassa sairaana",
    "description": "Kaikki, jotka ovat joskus olleet juomassa sairaana, juovat yhden.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Apple",
    "description": "Kaikki, jotka omistavat jonkin Apple tuotteen, juovat kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Android",
    "description": "Kaikki, jotka omistavat Android puhelimen, juovat kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Sisarukset",
    "description": "Juo niin monta kertaa, kuin sinulla on sisaruksia.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Kalpea",
    "description": "Kalpein pelaaja juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "21",
    "description": "Pelaajat aloittavat laskemisen vuorotellen järjestyksessä alkaen numerosta yksi. Kerralla voi sanoa enintään 3 numeroa. Pelaaja, joka sanoo 21, juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Käsipaini",
    "description": "Ota kädenvääntö oikealla olevan kanssa. Häviäjä juo 3 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Käteiskuningas",
    "description": "Pelaaja, jolla on eniten käteistä, juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Anteeksianto",
    "description": "Valitse pelaaja. Kaikki, paitsi sinä ja valitsemasi pelaaja juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Hyräily",
    "description": "Hyräile biisi. Ensimmäinen pelaaja, joka arvaa biisin nimen voi valita jonkun juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Eniten todennäköinen",
    "description": "Pelatkaa kierros 'most likely to' peliä. Jokaisella kierroksella pelaaja sanoo vuorollaan yhden asian ja eniten ääniä saanut juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Enemmistö",
    "description": "Kaikki pelaajat valitsevat joko mustan tai valkoisen ja sanovat sen yhtä aikaa. Vähemmistö juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kaliaa",
    "description": "Jos olet juomassa kaljaa, juo 3 kertaa. Muussa tapauksessa valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Lonkero",
    "description": "Jos olet juomassa lonkeroa, juo 3 kertaa. Muussa tapauksessa valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Isoimmat kengät",
    "description": "Pelaaja, jolla on isoin kengännumero, juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Yksi vielä",
    "description": "Pelaaja, joka joi viimeksi, juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Luotan sinuun",
    "description": "Valitse pelaaja. Aloittakaa juomaan yhtä aikaa. Voit lopettaa vasta, kun valitsemasi pelaaja lopettaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Peukalopaini",
    "description": "Ota peukalopaini oikealla olevan kenssa. Häviäjä juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kivi paperi sakset",
    "description": "Pelaa kivi paperi sakset oikealla olevan kanssa. Häviäjä juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Ilmainen juoma",
    "description": "Valitse jonkun pelaajan juoma ja juo siitä kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Videopelejä",
    "description": "Pelaaja, jolla on eniten videopelejä, juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Huono nimi",
    "description": "Juo niin monta kertaa kuin nimessäsi on kirjaimia.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Tasapaino",
    "description": "Kaikki seisovat yhdellä jalallaan. Ensimmäinen, joka ei pysy tasapainossa, juo 3.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Meen baariin",
    "description": "Sinusta alkaen pelaajat sanovat 'Meen baariin...' lisäten yhden juoman nimen ja toistaen vanhat. Pelaaja, joka ei muista kaikkia juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kaikki tyhjäks",
    "description": "Kaikki juovat juomansa tyhjäksi. PS: Tämä on harvinainen kortti :)",
    "rarity": 90,
    "continuous": false
  },
  {
    "name": "Kohtalon koura",
    "description": "Valitse joku juomaan juoma tyhjäksi.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Heikoin lenkki",
    "description": "Pelaaja, jolla on heikoin juoma, juo kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Soittajat",
    "description": "Kaikki, jotka osaavat soittaa instrumenttiä, juovat kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Koirarotuja",
    "description": "Alkaen sinusta pelaajat vuorollaan sanovat koirarotuja. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Puhelimet pois",
    "description": "Kaikki, jotka ovat tällä hetkellä puhelimellansa, juovat 5.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Vie jano pois",
    "description": "Pelaaja, joka ei ole juonut pisimpään aikaan, juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Mr. Worldwide",
    "description": "Pelaaja, joka on käynyt eniten ulkomailla, juo kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Arvoitus",
    "description": "Kerro oikealla olevalle arvoitus. Jos et keksi tai hän arvaa oikein, sinä juot 3. Muussa tapauksessa hän juo 3.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Automerkit",
    "description": "Alkaen sinusta, pelaajat vuorollaan sanovat automerkkejä. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Korkeampi vai matalampi",
    "description": "Pelaa 'higher or lower' positiivisella luvulla alle 100. Pelaajilla on 5 yritystä ja arvaavat vuorotellen. Häviäjä(t) juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Salainen juoma",
    "description": "Sulje silmät ja yritä arvata salainen juoma oikealla oleva antaa sinulle. Jos oikein, oikealla oleva juo 3. Jos väärin, sinä juot 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Elokuvalainaus",
    "description": "Siteeraa elokuvaa. Oikealla oleva yrittää arvata elokuvan nimen. Jos väärä arvaus, molemmat juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Yhdyssanapeli",
    "description": "Valitse sana. Pelaajat vuorotellen sanovat sanan, jonka yhdistämällä edelliseen sanaan saa yhdyssanan. Häviäjä juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Olkapää",
    "description": "Käänny ympäri. Joku pelaajista koskettaa sinua olkapäästä. Jos arvaat, kuka sinua kosketti, juo koskija 3. Muuten sinä juot 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kielimies",
    "description": "Älä puhu suomea yhden kierroksen ajan. Jos jäät kiinni suomen puhumisesta, juot juomasi tyhjäksi.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "KELLOTUSKISA",
    "description": "Ota kellotuskisa jonkun pelaajan kanssa. Hitaampi juo 6 kertaa uudesta juomasta. PS: Harvinainen kortti :)",
    "rarity": 80,
    "continuous": false
  },
  {
    "name": "Bonuskortti",
    "description": "Kaikki, joilla on lompakossa K-Plussa kortti, juovat.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "S-Etukortti",
    "description": "Kaikki, joilla on lompakossa S-Etukortti, juovat.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Pelihai",
    "description": "Kaikki, joilla on lompakossa Veikkauksen asiakaskortti, juovat.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Pikku kakkosen posti",
    "description": "Laula pikku kakkosen posti. Jos et osaa, juo 3.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Teekkarihymni",
    "description": "Laula teekkarihymni. Jos et osaa, juo juomasi tyhjäksi.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Pelikonsoli",
    "description": "Kaikki, jotka omistavat pelikonsolin, juovat kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Fortnite",
    "description": "Kaikki, jotka ovat pelanneet Fortniteä, juovat kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Pokemon GO",
    "description": "Kaikki, jotka ovat pelanneet joskus Pokemon Gota, juovat yhden.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Minecraft OG",
    "description": "Kaikki, jotka pelasivat Minecraftia alphassa, juovat 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Allergia",
    "description": "Jos olet allerginen koivuille, juo 3. Jos et, valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "En oo ikinä",
    "description": "Pelaajat nostavat ylös 3 sormea. Listaa asioita, joita et ole ikinä tehnyt. Kaikki, jotka ovat tehneet asian laskevat sormen. Viimeisen sormen laskija juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Valuutat",
    "description": "Alkaen sinusta, pelaajat vuorollaan sanovat valuuttoja. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Osavaltiot",
    "description": "Alkaen sinusta, pelaajat vuorollaan sanovat Yhdysvaltojen osavaltioita. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Euroopan maat",
    "description": "Alkaen sinusta, pelaajat vuorollaan sanovat Euroopan maita. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Kiltoja",
    "description": "Alkaen sinusta, pelaajat vuorollaan sanovat kiltoja tai virallisia ainejärjestöjä. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Valta valita",
    "description": "Valitse montako kertaa kaikki juovat.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Parillinen päivä",
    "description": "Jos olet syntynyt parillisena päivänä, juo 3. Muussa tapauksessa valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Valitse numero",
    "description": "Oikealla oleva pelaaja valitsee numeron yhden ja kymmenen väliltä. Jos arvaat numeron oikein, juo hän juomansa loppuun. Jos et, sinä juot 3.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Olutmerkit",
    "description": "Alkaen sinusta, pelaajat vuorollaan sanovat olutmerkkejä. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "UKKOMETSO",
    "description": "Laita ukkometso soimaan. Kaikkien tulee juoda juomansa loppuun biisin loppuun mennessä.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Hienoja miehiä",
    "description": "Alkaen sinusta, pelaajat vuorollaan luettelevat hienoja miehiä perustellen. Mikäli muiden mielestä kyseessä ei ole hieno mies, loppuu peli ja häviäjä juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Bohemian Rhapsody",
    "description": "Laula Bohemian Rhapsodyn sanat välillä 'Mama, just killed a man' ja 'Carry on, carry on as if nothing really matters'. Jos et osaa, juot juomasi loppuun.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Valinnan valta",
    "description": "Valitse joku valitsemaan joku juomaan 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Hyvä teko?",
    "description": "Valitse juotko itse 3 kertaa vai juoko joku toinen 6 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kieli rullalle",
    "description": "Jos et osaa laittaa kieltäsi rullalle, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Teini ninjat",
    "description": "Nimeä kaikki teini-ikäiset mutantti ninja kilpikonnat. Jos et osaa, juo 3 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Noppa",
    "description": "Heitä noppaa ja juo silmäluvun verran. Jos ei ole noppaa, juo 4 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Kruuna",
    "description": "Heitä kolikkoa. Jos kruuna, juo 3 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Klaava",
    "description": "Heitä kolikkoa. Jos klaava, juo 3 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Uusi kokemus",
    "description": "Juo jotain, mitä et ole vielä juonut tänään.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "JUOMAKISA",
    "description": "Ota juomakisa oikealla olevan kanssa. Se, joka juo juomansa hitaammin loppuun, juo toisen juoman tai ottaa shotin (4cl).",
    "rarity": 90,
    "continuous": false
  },
  {
    "name": "Adjektiiveja",
    "description": "Kuvaile vasemmalla olevaa kolmella adjektiivilla. Molemmat juovat 3 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Laavaa",
    "description": "Lattia on laavaa yhden kierroksen ajan. Jos joku pelaajista jää kiinni lattiaan koskemisesta, tulee hänen juoda juomansa loppuun.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Arvaa kortti",
    "description": "Arvaa kortti ja nosta korttipakasta satunnainen kortti. Jos arvasit oikein, kaikki muut juovat juomansa tyhjiksi. Jos et tai ei ole korttipakkaa, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kuoleman kortit",
    "description": "Jaa kaikille kortit. Kaikki juovat oman kortin luvun määrän. Jos ei ole korttipakkaa, kaikki juovat 7 kertaa.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Suurin kortti",
    "description": "Jaa kaikille kortit. Suurimman kortin saaja juo 3 kertaa. Jos ei ole korttipakkaa, sinä juot 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Pienin kortti",
    "description": "Jaa kaikille kortit. Pienimmän kortin saaja juo 3 kertaa. Jos ei ole korttipakkaa, sinä juot 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Blackjack",
    "description": "Jaa kierros blackjackia. Kaikki jotka häviävät jakajalle juovat juomansa loppuun. Jos ei ole korttipakkaa, sinä juot juomasi loppuun.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Suurin noppa",
    "description": "Kaikki heittävät vuorollaan noppaa. Suurimman silmäluvun saaja(t) juo silmäluvun verran. Jos ei ole noppaa, sinä juot 6 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Kossuvissy",
    "description": "Jos olet juonut tänä iltana kossuvissyä, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Laskettelu",
    "description": "Kaikki, jotka ovat joskus käyneet laskettelemassa, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Huojuva torni",
    "description": "Jos pelaat huojuvaa tornia samalla, nosta toinenkin palikka nostamatta kuitenkaan toista korttia. Jos et pelaa huojuvaa tornia, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Laulumiehiä",
    "description": "Valitse kappale ja laula se karaokena alusta loppuun. Jos et halua, juot juomasi loppuun.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Turnajaiset",
    "description": "Ottakaa kädenvääntöturnaus jakautuen pareihin ja aina häviäjän jatkaen seuraaviin erään. Se, joka häviää viimeiseksi juo juomansa loppuun.",
    "rarity": 100,
    "continuous": false
  },
  {
    "name": "Euroopan ulkopuolella",
    "description": "Kaikki, jotka eivät ole ikinä käyneet Euroopan ulkopuolella, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Maailman mestari",
    "description": "Monessako maassa olet käynyt? Juo niin monta kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Korkeasaari",
    "description": "Alkaen sinusta pelaajat vuorollaan sanovat eläinlajeja, joita on Korkeasaaressa. Pelaaja, jolla kestää yli 10 sekuntia tai sanoo väärän eläimen, juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Pisin matka autolla",
    "description": "Mikä on pisin matka kilometreissä, jonka olet ajanut autolla? Jaa se sadalla ja pyöristä ylöspäin. Juo sen verran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Eksoottiset pojat",
    "description": "Kaikki, jotka ovat käyneet Aasiassa, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Palomies",
    "description": "Laita puhelimen taustakuvaksi kuva palomiehestä tai juo juomasi loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Paha kierre",
    "description": "Montako annosta olet juonut tänään? Juo niin monta kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kieli solmussa",
    "description": "Sano ääneen ''Kas vain!' sanoi kasvain, ja kasvoi vain. Vain kasvain voi kasvaa noin vain.' Jos epäonnistuit muiden mielestä, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kieli solmussa",
    "description": "Sano ääneen 'Appilan pappilan piski paksuposki pakkas kapsäkin ja pinkaisi juoksuun.' Jos epäonnistuit muiden mielestä, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kieli solmussa",
    "description": "Sano ääneen 'Presidenttipari pariloi Floridan kolesterolitonta broileria.' Jos epäonnistuit muiden mielestä, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Risto Räppääjä",
    "description": "Miten jatkuu riimi 'Elämä ei ole hassumpaa...'? Et voi sanoa samaa, mitä on jo sanottu tässä pelissä. Jos et tiedä, juo 3. Jos tiedät, valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kaksi kaverusta",
    "description": "Mitkä oli Leijonakuninkaassa eräiden mangustin ja pahkasian nimet? Jos et tiedä, häpeä ja juo 3 kertaa. Jos tiedät, valitse joku juomaan 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "San Andreas",
    "description": "Kaikki juovat 3 kertaa, paitsi ne, jotka muistavat jonkin huijauskoodin GTA San Andreasiin (PC tai PS2).",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Epic gamer",
    "description": "Kaikki juovat kerran jokaista videopeliä kohden, jota ovat pelanneet yli 1000 tuntia.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Poliisin valvonnassa",
    "description": "Kaikki, jotka ovat saaneet varoituksen tai sakon poliisilta, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Sitsien haltija",
    "description": "Alkaen sinusta pelaajat vuorollaan sanovat virallisen laulukirjan sisältämiä lauluja. Pelaaja, jolla kestää yli 10 sekuntia, juo 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Festarit",
    "description": "Monillako festareilla olet käynyt? Juo niin monta kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kahvia",
    "description": "Kaikki, jotka ovat juoneet kahvia tänään, juovat kerran.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Ring of death",
    "description": "Tehkää korteista pieni ympyrä. Nostakaa vuorotellen kortteja ympärästä. Se, joka rikkoo ympyrän, juo juomansa tyhjäksi. Jos ei ole kortteja, sinä juot juomasi tyhjäksi.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Ikä ja siis häh?",
    "description": "Valitse joku juomaan niiden oma ikänsä modulo 10 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Avatar",
    "description": "Kaikki juovat 3 kertaa, paitsi ne, jotka muistavat minkä tahansa hahmon nimen James Cameronin Avatarista.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "KUNNON TYÖ UKKO",
    "description": "Jos olet juomassa kaljaa tölkistä, voit huutaa RÄYH ja pakottaa jonkun muun, kuin kaljaa tölkistä juovan, juomaan juomansa loppuun. Voit tehdä tämän vain nyt ja kerran.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Köyhät kävelee",
    "description": "Kaikki juovat 3 kertaa, paitsi ne, jotka ovat ajaneet autolla tänään.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Bionicle",
    "description": "Kaikki, jotka ovat joskus omistaneet tai omistavat Bioniclen, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Batman",
    "description": "Jos et ole nähnyt kaikkia Batman-elokuvia, juo 3 kertaa. Jos olet, valitse joku juomaan 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kotona",
    "description": "Kaikki, jotka eivät ole kotipaikkakunnallansa, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Savo",
    "description": "Jos olet syntynyt Savossa, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Pullonpyöritys",
    "description": "Laita pullo pyörimään. Se, kehen kaula osoittaa, juo 3 kertaa. Jos ei ole pulloa, sinä juot 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Etelän vetelä",
    "description": "Jos olet syntynyt etelempänä kuin Tampere, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Telephone",
    "description": "Ensimmäinen, joka soittaa tämän kortin saaneelle henkilölle, saa määrätä jonkun juomaan 6 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Mun hoodit",
    "description": "Pelaaja, joka asuu lähimpänä tätä paikkaa saa määrätä jonkun juomaan 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Iso raha",
    "description": "Pelaaja, jolla on suurin kolikko, tulee joko juoda 7 kertaa tai antaa suurin kolikko jollekkin ja määrätä kolikon saaneen juomaan 7 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Jämerät ukot",
    "description": "Kaikki parrakkaat pelaajat juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kuurojen tarina",
    "description": "Aloita tarina yhdellä eleellä. Pelaajat vuorollaan lisäävät yhden eleen toistaen vanhat. Se, joka ei muista kaikkia eleitä, juo juomansa loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Seinä",
    "description": "Kaikkien pelaajien pitää koskettaa seinää. Viimeinen seinän koskija juo 6 kertaa.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Syntymäpäivä",
    "description": "Sano oikealla olevan syntymäpäivä. Jos oikein, juo oikealla oleva 3 kertaa. Jos väärin, juot sinä 3 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Äläpäs mene",
    "description": "Seuraava pelaaja, joka haluaa poistua huoneesta, pitää juoda juomansa loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Tuu tänne",
    "description": "Kaikkien pelaajien pitää koskettaa kortin saajaa. Viimeinen koskettaja juo 6 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Namskis",
    "description": "Pelaaja, joka viimeksi söi mitään, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kaatunut",
    "description": "Mene selällesi makaamaan lattialle ja juo.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "90s kids",
    "description": "Kaikki pelaajat, jotka ovat syntyneet 90-luvulla, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Zoomerit",
    "description": "Kaikki pelaajat, jotka ovat syntyneet 00-luvulla, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Yhestä kymppii",
    "description": "Valitse luonnollinen luku yhden ja kymmenen väliltä. Muiden pelaajien tulee vuorotellen yrittää arvata luku. Oikein arvannut määrää 6 juomaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "öö ää åå",
    "description": "Sano aakkoset takaperin tai juo juomasi loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Mitä sää sanoit?",
    "description": "Saat puhua vain kuiskailemalla kunnes tulee uudestaan vuorosi. Mikäli jäät kiinni normaalisti puhumisesta, juo 6 kertaa.",
    "rarity": 20,
    "continuous": false
  },
  {
    "name": "Voimakas",
    "description": "Tee 10 punnerrusta. Mikäli et pysty tai halua, juo 6 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Väärä käsi",
    "description": "Saat käyttää vain väärää kättäsi kunnes tulee uudestaan vuorosi. Mikäli jäät kiinni oikean käden käytöstä, juo 6 kertaa.",
    "rarity": 20,
    "continuous": false
  },
  {
    "name": "Pieni rakko",
    "description": "Pelaaja, joka kävi viimeksi vessassa, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Huono näkö",
    "description": "Kaikki pelaajat, joilla on silmälasit, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kertotaulu",
    "description": "Luettele 6 kertotaulu. Jos menee jossain kohtaa väärin, juo 6 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kyynärpää",
    "description": "Kaikki pelaajat, jotka eivät pysty nuolemaan kyynärpäitään, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kellojäbä",
    "description": "Kaikki pelaajat, joilla on rannekello kädessä, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Suurimmat kädet",
    "description": "Vertailkaa käsiä kaikkien pelaajien kesken. Pelaaja, jolla on isoimmat kädet, juo 6 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Lampaat",
    "description": "Kaikki pelaajat, jotka käyvät tällä hetkellä töissä, juovat 3 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Megis",
    "description": "Jos olet juonut tänään energiajuomaa, juo 3 kertaa. Jos et, valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Olutkiljut",
    "description": "Kaikki pelaajat, jotka ovat valmistaneet omaa alkoholijuomaa käymällä, juovat 6 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Pohjoisin paikka",
    "description": "Pelaaja, joka on käynyt pohjoisimmassa paikassa, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Eteläisin paikka",
    "description": "Pelaaja, joka on käynyt eteläisimmässä paikassa, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kukkia",
    "description": "Juo kerran jokaista asunnossasi olevaa kasvia kohden. Jos sinulla ei ole kasveja, juo 6 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Huvipuistot",
    "description": "Juo kerran jokaista huvipuistoa kohden missä olet käynyt. Jos et ole käynyt huvipuistoissa, juo 6 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Erivärisukat",
    "description": "Kaikki pelaajat, joilla on eriväriset sukat, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kuopijjoo",
    "description": "Kaikki pelaajat, jotka eivät ole ikinä käyneet Kuopiossa, juovat 3 kertaa.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Lappibois",
    "description": "Kaikki pelaajat, jotka eivät ole ikinä käyneet Lapissa, juovat 3 kertaa.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Opiskelija",
    "description": "Jos opiskelet tällä hetkellä jossain, juo 3 kertaa. Muussa tapauksessa valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Taskupuhelin",
    "description": "Jos sinulla on tällä hetkellä puhelin taskussa, juo 3 kertaa. Muussa tapauksessa valitse joku juomaan 3.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Tatuointeja",
    "description": "Kaikki pelaajat, joilla on tatuointeja, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Lävistyksiä",
    "description": "Kaikki pelaajat, joilla on lävistyksiä, esimerkiksi korvakoruja, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Hiljaa",
    "description": "Kaikki pelaavat ovat hiljaa, mutta peli jatkuu. Ensimmäinen pelaaja, joka puhuu, juo juomansa loppuun.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Paikan vaihto",
    "description": "Valitse pelaaja. Sinä ja valitsemasi pelaaja vaihtavat paikkaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Sikin sokin",
    "description": "Kaikki pelaajat vaihtavat paikkaa.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Värikkäät vaatteet",
    "description": "Valitse väri. Kaikki pelaajat, joiden vaatteissa on tätä väriä, juovat 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Mikä biisi",
    "description": "Nimeä muistista biisi joka soi tällä hetkellä. Jos nimeät väärin tai ette kuuntele musiikkia, juo 6 kertaa.",
    "rarity": 20,
    "continuous": false
  },
  {
    "name": "Tekijä",
    "description": "Sano joku asia jonka voi tehdä. Pelaaja, joka on viimeksi tehnyt kyseisen asian, juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Aasinsilta",
    "description": "Muut pelaajat sanovat jonkun sanan. Keksi aasinsilta, jossa käytetään tätä sanaa. Jos aasinsilta on muiden mielestä huono, juo 6 kertaa.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Lempiväri",
    "description": "Arvaa oikealla olevan pelaajan lempiväri. Jos arvaat oikein, he juovat 3 kertaa. Jos arvaat väärin, sinä juot 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kaksoisolento",
    "description": "Valitse toinen pelaaja. Pelaajan on jäljitettävä sinun eleitä ja liikkeitä kierroksen ajan. Jos ei halua, juo juomansa loppuun.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Taikatemppu",
    "description": "Suorita taikatemppu. Jos et osaa tai jos muiden mielestä temppu on todella huono, juo 6 kertaa.",
    "rarity": 70,
    "continuous": false
  },
  {
    "name": "Kielletty sana",
    "description": "Valitse sana, jota ei saa sanoa tämän kierroksen aikana. Joka kerta kun joku pelaajista sanoo sanan, juo hän 3 kertaa.",
    "rarity": 40,
    "continuous": false
  },
  {
    "name": "Biisei",
    "description": "Valitse musiikkikategoria. Pelaajat vuorollaan mainitsevat yhden biisin kyseisestä kategoriasta. Se, joka ei keksi biisiä, juo 3 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Sormileikki",
    "description": "Haasta jokin pelaaja haasteeseen, joka vaatii taituruutta sormilta. Jos pelaaja epäonnistuu, juo hän 3 kertaa. Jos onnistuu, sinä juot 3 kertaa.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Värikäs totuus",
    "description": "Jokainen pelaaja kertoo yhden asian itsestään, ja muut pelaajat arvaavat, onko se totta vai tarua. Väärin arvanneet juovat 3 kertaa.",
    "rarity": 60,
    "continuous": false
  },
  {
    "name": "Päivänsankari",
    "description": "Pelaaja, jonka syntymäpäivä on lähimpänä tätä päivää juo 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Salainen esine",
    "description": "Valitse mielessäsi jokin esine tässä huoneessa. Muut pelaajat vuorollaan kysyvät yhden kyllä/ei kysymyksen esineestä. Kaikki paitsi sinä ja esineen oikein arvaaja juovat 3 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Gaming moment",
    "description": "Jos olet pelannut videopeliä tänään, juo 3 kertaa. Muussa tapauksessa valitse joku pelaaja juomaan 3 kertaa.",
    "rarity": 20,
    "continuous": false
  },
  {
    "name": "Lämpötila",
    "description": "Arvaa monta astetta ulkona on lämmintä ja tarkista arvauksen jälkeen puhelimesta. Jos arvasit oikein, määrää joku juomaan 6 kertaa. Jos arvasit väärin, juo 3 kertaa.",
    "rarity": 20,
    "continuous": false
  },
  {
    "name": "Maan kaupungit",
    "description": "Valitse maa. Kaikki pelaajat, sinä mukaan lukien, luettelevat vuorollaan kaupunkeja tästä maasta. Se, jolla kestää yli 10 sekuntia, juo 6 kertaa.",
    "rarity": 50,
    "continuous": false
  },
  {
    "name": "Patsas",
    "description": "Kaikki jähmettyvät paikoilleen. Ensimmäinen, joka liikkuu tai nauraa, juo 3 kertaa.",
    "rarity": 20,
    "continuous": false
  },
  {
    "name": "Tasan kymmenen",
    "description": "Pelaajat näyttävät yhtä aikaa 0–5 sormea. Jos sormia on yhteensä tasan 10, sinä määräät 6 juomakertaa. Muuten juot kerran.",
    "rarity": 30,
    "continuous": false
  },
  {
    "name": "Huono vitsi",
    "description": "Kerro vitsi. Jos yksikin pelaaja nauraa, saat määrätä 3 juomakertaa. Jos kukaan ei naura, juot itse 3 kertaa.",
    "rarity": 0,
    "continuous": false
  },
  {
    "name": "Kielletty kirjain",
    "description": "Valitse kirjain. Kukaan ei saa sanoa kyseisen kirjaimen sisältävää sanaa ennen seuraavaa vuoroasi. Virheen tehnyt juo 3 kertaa.",
    "rarity": 50,
    "continuous": true
  }
]

export const cardsData = cardsDataWithoutIds.map((card, index) => ({
  ...card,
  id: index + 1
}))
