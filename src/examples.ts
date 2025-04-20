// A JavaScript object representing tempo categories with example music and links
const tempoDatabase = [
  {
    tempoRange: "Larghissimo",
    bpmRange: "10–40 BPM",
    examples: {
      popular: [
        {
          title: "4′33″",
          artist: "John Cage",
          bpm: 20,
          link: "https://www.youtube.com/watch?v=HypmW4Yd7SY",
        },
        {
          title: "Weightless",
          artist: "Marconi Union",
          bpm: 35,
          link: "https://www.youtube.com/watch?v=UfcAVejslrU",
        },
        {
          title: "Spiegel im Spiegel",
          artist: "Arvo Pärt",
          bpm: 40,
          link: "https://www.youtube.com/watch?v=TJ6Mzvh3XCc",
        },
      ],
      classical: [
        {
          title: "Ich ruf zu dir, Herr Jesu Christ, BWV 639 (Bach)",
          bpm: 36,
          link: "https://www.youtube.com/watch?v=UQpgC5zMXwA",
        },
        {
          title: "Méditation (Thaïs – Massenet)",
          bpm: 40,
          link: "https://www.youtube.com/watch?v=2bosouX_d8Y",
        },
      ],
    },
  },
  {
    tempoRange: "Grave",
    bpmRange: "14–41 BPM",
    examples: {
      popular: [
        {
          title: "A Warm Place",
          artist: "Nine Inch Nails",
          bpm: 36,
          link: "https://www.youtube.com/watch?v=wU3qgPn3bGA",
        },
        {
          title: "Adagio for Strings",
          artist: "Samuel Barber",
          bpm: 40,
          link: "https://www.youtube.com/watch?v=izQsgE0L450",
        },
        {
          title: "Sunrise",
          artist: "Norah Jones",
          bpm: 40,
          link: "https://www.youtube.com/watch?v=fd02pGJx0s0",
        },
      ],
      classical: [
        {
          title: "Stabat Mater (Pergolesi)",
          bpm: 38,
          link: "https://www.youtube.com/watch?v=ZKz6XJlI_jk",
        },
        {
          title: "Piano Sonata No. 2, 1st mov. (Rachmaninoff)",
          bpm: 41,
          link: "https://www.youtube.com/watch?v=wNAwrWnVMnc",
        },
      ],
    },
  },
  {
    tempoRange: "Largo",
    bpmRange: "40–60 BPM",
    examples: {
      popular: [
        {
          title: "Fix You",
          artist: "Coldplay",
          bpm: 50,
          link: "https://www.youtube.com/watch?v=k4V3Mo61fJM",
        },
        {
          title: "The Sound of Silence",
          artist: "Simon & Garfunkel",
          bpm: 52,
          link: "https://www.youtube.com/watch?v=NAEppFUWLfc",
        },
        {
          title: "Hallelujah",
          artist: "Jeff Buckley",
          bpm: 56,
          link: "https://www.youtube.com/watch?v=y8AWFf7EAc4",
        },
      ],
      classical: [
        {
          title: "Largo from Xerxes (Handel)",
          bpm: 48,
          link: "https://www.youtube.com/watch?v=N1AloVxgE4I",
        },
        {
          title: "New World Symphony, 2nd mov. (Dvořák)",
          bpm: 60,
          link: "https://www.youtube.com/watch?v=p5favl2Qtx0",
        },
      ],
    },
  },
  {
    tempoRange: "Lento",
    bpmRange: "52–68 BPM",
    examples: {
      popular: [
        {
          title: "The Blower's Daughter",
          artist: "Damien Rice",
          bpm: 60,
          link: "https://www.youtube.com/watch?v=5YXVMCHG-Nk",
        },
        {
          title: "All I Want",
          artist: "Kodaline",
          bpm: 64,
          link: "https://www.youtube.com/watch?v=mtf7hC17IBM",
        },
        {
          title: "Skinny Love",
          artist: "Birdy",
          bpm: 68,
          link: "https://www.youtube.com/watch?v=aNzCDt2eidg",
        },
      ],
      classical: [
        {
          title: "Symphony No. 3, Lento (Górecki)",
          bpm: 64,
          link: "https://www.youtube.com/watch?v=MI1U1oGACqU",
        },
        {
          title: "Lento from Shostakovich Piano Trio No. 2",
          bpm: 66,
          link: "https://www.youtube.com/watch?v=NGZ5k2VQr60",
        },
      ],
    },
  },
  {
    tempoRange: "Adagio",
    bpmRange: "60–80 BPM",
    examples: {
      popular: [
        {
          title: "Someone Like You",
          artist: "Adele",
          bpm: 68,
          link: "https://www.youtube.com/watch?v=hLQl3WQQoQ0",
        },
        {
          title: "The Night We Met",
          artist: "Lord Huron",
          bpm: 72,
          link: "https://www.youtube.com/watch?v=KtlgYxa6BMU",
        },
        {
          title: "Let Her Go",
          artist: "Passenger",
          bpm: 75,
          link: "https://www.youtube.com/watch?v=RBumgq5yVrA",
        },
      ],
      classical: [
        {
          title: "Adagio in G minor (Albinoni/Giazotto)",
          bpm: 66,
          link: "https://www.youtube.com/watch?v=XMbvcp480Y4",
        },
        {
          title: "Adagio for Strings (Barber)",
          bpm: 72,
          link: "https://www.youtube.com/watch?v=izQsgE0L450",
        },
      ],
    },
  },
  {
    tempoRange: "Andante",
    bpmRange: "76 – 100",
    examples: {
      popular: [
        {
          title: "Wonderwall",
          artist: "Oasis",
          bpm: 87,
          link: "https://open.spotify.com/track/2uXubTjOd7feK9gVIL9vE2",
        },
        {
          title: "Human Nature",
          artist: "Michael Jackson",
          bpm: 92,
          link: "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5",
        },
        {
          title: "Stayin' Alive",
          artist: "Bee Gees",
          bpm: 103,
          link: "https://open.spotify.com/track/5L3ecEUqroPVmy0KZ3KgxY",
        },
      ],
      classical: [
        {
          title: "Schubert – Symphony No. 5, II",
          bpm: 84,
          link: "https://www.youtube.com/watch?v=sLSVQ1SJHxY",
        },
        {
          title: "Beethoven – Symphony No. 6, I",
          bpm: 96,
          link: "https://www.youtube.com/watch?v=iMJPZ-mu-Ts",
        },
      ],
    },
  },
  {
    tempoRange: "Moderato",
    bpmRange: "88 – 112",
    examples: {
      popular: [
        {
          title: "Counting Stars",
          artist: "OneRepublic",
          bpm: 108,
          link: "https://open.spotify.com/track/2b8fOow8UzyDFAE27YhOZM",
        },
        {
          title: "Uptown Funk",
          artist: "Mark Ronson ft. Bruno Mars",
          bpm: 115,
          link: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS",
        },
        {
          title: "Shivers",
          artist: "Ed Sheeran",
          bpm: 117,
          link: "https://open.spotify.com/track/50nfwKoDiSYg8zOCREWAm5",
        },
      ],
      classical: [
        {
          title: "Mozart – Eine kleine Nachtmusik, I",
          bpm: 104,
          link: "https://www.youtube.com/watch?v=o1FSN8_pp_o",
        },
        {
          title: "Haydn – Symphony No. 94, II",
          bpm: 108,
          link: "https://www.youtube.com/watch?v=lLjwkamp3lI",
        },
      ],
    },
  },
  {
    tempoRange: "Allegro",
    bpmRange: "112 – 160",
    examples: {
      popular: [
        {
          title: "Can’t Stop the Feeling!",
          artist: "Justin Timberlake",
          bpm: 113,
          link: "https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc",
        },
        {
          title: "Shake It Off",
          artist: "Taylor Swift",
          bpm: 160,
          link: "https://open.spotify.com/track/5WfhXLAwd0xP3iNQ2fVwBI",
        },
        {
          title: "Take On Me",
          artist: "a-ha",
          bpm: 169,
          link: "https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L",
        },
      ],
      classical: [
        {
          title: "Beethoven – Symphony No. 5, I",
          bpm: 108,
          link: "https://www.youtube.com/watch?v=fOk8Tm815lE",
        },
        {
          title: "Mozart – Symphony No. 40, I",
          bpm: 126,
          link: "https://www.youtube.com/watch?v=JTc1mDieQI8",
        },
      ],
    },
  },
  {
    tempoRange: "Vivace",
    bpmRange: "~ 140",
    examples: {
      popular: [
        {
          title: "I Wanna Dance with Somebody",
          artist: "Whitney Houston",
          bpm: 119,
          link: "https://open.spotify.com/track/5rZ4iQ7yqwxr0pZfkJyrhT",
        },
        {
          title: "September",
          artist: "Earth, Wind & Fire",
          bpm: 126,
          link: "https://open.spotify.com/track/3cHyrEgdyYRjgJKSOiOtcS",
        },
        {
          title: "Wake Me Up Before You Go-Go",
          artist: "Wham!",
          bpm: 164,
          link: "https://open.spotify.com/track/4JpKVNYnVcJ8tuMKjAj50A",
        },
      ],
      classical: [
        {
          title: "Beethoven – Symphony No. 7, II",
          bpm: 138,
          link: "https://www.youtube.com/watch?v=qzKjqijY1fg",
        },
        {
          title: "Rossini – William Tell Overture",
          bpm: 144,
          link: "https://www.youtube.com/watch?v=c7O91GDWGPU",
        },
      ],
    },
  },
  {
    tempoRange: "Presto",
    bpmRange: "140 – 200",
    examples: {
      popular: [
        {
          title: "Song 2",
          artist: "Blur",
          bpm: 135,
          link: "https://open.spotify.com/track/7H2G0bG3gQeK1ejqE4Wi3T",
        },
        {
          title: "Mr. Brightside",
          artist: "The Killers",
          bpm: 148,
          link: "https://open.spotify.com/track/0eGsygTp906u18L0Oimnem",
        },
        {
          title: "Misery Business",
          artist: "Paramore",
          bpm: 173,
          link: "https://open.spotify.com/track/4I9bg0U7c1LPJTZs7xOvzM",
        },
      ],
      classical: [
        {
          title: "Mozart – Turkish March",
          bpm: 144,
          link: "https://www.youtube.com/watch?v=GxTQGqL-Wc8",
        },
        {
          title: "Beethoven – Symphony No. 8, II",
          bpm: 152,
          link: "https://www.youtube.com/watch?v=v6rcEj50JgI",
        },
      ],
    },
  },
  {
    tempoRange: "Prestissimo",
    bpmRange: "> 188",
    examples: {
      popular: [
        {
          title: "Through the Fire and Flames",
          artist: "DragonForce",
          bpm: 200,
          link: "https://open.spotify.com/track/1w9x6A6HPL1NQh6Z9YuwOG",
        },
        {
          title: "Flight of the Bumblebee",
          artist: "Rimsky-Korsakov",
          bpm: 210,
          link: "https://www.youtube.com/watch?v=aYAJopwEYv8",
        },
        {
          title: "Raining Blood",
          artist: "Slayer",
          bpm: 220,
          link: "https://open.spotify.com/track/3x8Q0OfzlMLtvKzHv6TtAG",
        },
      ],
      classical: [
        {
          title: "Paganini – Caprice No. 5",
          bpm: 210,
          link: "https://www.youtube.com/watch?v=p2sZ9CL0o3U",
        },
        {
          title: "Liszt – La Campanella",
          bpm: 200,
          link: "https://www.youtube.com/watch?v=Q3CXGzHd0a0",
        },
      ],
    },
  },
];

export default tempoDatabase;
