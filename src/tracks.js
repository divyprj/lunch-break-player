import lunchBreakVinyl from './assets/vinyl-cover.jpg';
import lunchBreakBg from './assets/background.webp';
import nayaabVinyl from './assets/nayaab-vinyl.jpg';
import nayaabBg from './assets/nayaab-background.webp';

export const ALBUMS = {
  'Lunch Break': {
    title: 'Lunch Break',
    artist: 'Seedhe Maut',
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
  },
  'Nayaab': {
    title: 'Nayaab',
    artist: 'Seedhe Maut x Sez on the Beat',
    cover: nayaabVinyl,
    background: nayaabBg,
  }
};

const LUNCH_BREAK_AURAS = [
  { accent: '#f8f3d4', tint: 'rgba(248, 243, 212, 0.06)', glow: 'rgba(248, 243, 212, 0.30)' },
  { accent: '#d8ecff', tint: 'rgba(102, 164, 218, 0.08)', glow: 'rgba(102, 164, 218, 0.32)' },
  { accent: '#ffddd2', tint: 'rgba(214, 101, 70, 0.08)', glow: 'rgba(214, 101, 70, 0.28)' },
  { accent: '#e5f7c7', tint: 'rgba(153, 190, 96, 0.07)', glow: 'rgba(153, 190, 96, 0.30)' },
  { accent: '#fff3b8', tint: 'rgba(235, 189, 64, 0.07)', glow: 'rgba(235, 189, 64, 0.28)' },
  { accent: '#cde7ff', tint: 'rgba(79, 145, 204, 0.08)', glow: 'rgba(79, 145, 204, 0.32)' },
  { accent: '#f5d7ff', tint: 'rgba(171, 105, 190, 0.07)', glow: 'rgba(171, 105, 190, 0.28)' },
  { accent: '#d9ffe7', tint: 'rgba(95, 188, 131, 0.07)', glow: 'rgba(95, 188, 131, 0.30)' },
  { accent: '#ffe5bc', tint: 'rgba(205, 136, 54, 0.07)', glow: 'rgba(205, 136, 54, 0.26)' },
  { accent: '#d8fff8', tint: 'rgba(73, 176, 169, 0.07)', glow: 'rgba(73, 176, 169, 0.30)' },
];

const NAYAAB_AURAS = [
  { accent: '#f59e0b', tint: 'rgba(245, 158, 11, 0.09)', glow: 'rgba(245, 158, 11, 0.35)' },
  { accent: '#ef4444', tint: 'rgba(239, 68, 68, 0.08)', glow: 'rgba(239, 68, 68, 0.32)' },
  { accent: '#fbbf24', tint: 'rgba(251, 191, 36, 0.08)', glow: 'rgba(251, 191, 36, 0.30)' },
  { accent: '#ec4899', tint: 'rgba(236, 72, 153, 0.08)', glow: 'rgba(236, 72, 153, 0.30)' },
  { accent: '#f97316', tint: 'rgba(249, 115, 22, 0.08)', glow: 'rgba(249, 115, 22, 0.32)' },
  { accent: '#eab308', tint: 'rgba(234, 179, 8, 0.08)', glow: 'rgba(234, 179, 8, 0.30)' },
  { accent: '#f43f5e', tint: 'rgba(244, 63, 94, 0.08)', glow: 'rgba(244, 63, 94, 0.32)' },
];

export const TRACKS = [
  // --- LUNCH BREAK (29 TRACKS) ---
  {
    id: "lb-1",
    title: "11K",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 178,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-01-11k.m4a",
    aura: LUNCH_BREAK_AURAS[0]
  },
  {
    id: "lb-2",
    title: "Brand New",
    artist: "Seedhe Maut, Calm, Encore ABJ",
    album: "Lunch Break",
    duration: 223,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-02-brand-new.m4a",
    aura: LUNCH_BREAK_AURAS[1]
  },
  {
    id: "lb-3",
    title: "First Place",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 132,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-03-first-place.m4a",
    aura: LUNCH_BREAK_AURAS[2]
  },
  {
    id: "lb-4",
    title: "Focused Sedated",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 191,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-04-focused-sedated.m4a",
    aura: LUNCH_BREAK_AURAS[3]
  },
  {
    id: "lb-5",
    title: "Fanne Khan",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 260,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-05-fanne-khan.m4a",
    aura: LUNCH_BREAK_AURAS[4]
  },
  {
    id: "lb-6",
    title: "Joint in the Booth",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 177,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-06-joint-in-the-booth.m4a",
    aura: LUNCH_BREAK_AURAS[5]
  },
  {
    id: "lb-7",
    title: "Khatta Flow",
    artist: "Seedhe Maut, KR$NA",
    album: "Lunch Break",
    duration: 169,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-07-khatta-flow.m4a",
    aura: LUNCH_BREAK_AURAS[6]
  },
  {
    id: "lb-8",
    title: "Asal G",
    artist: "Seedhe Maut, Faris Shafi",
    album: "Lunch Break",
    duration: 236,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-08-asal-g.m4a",
    aura: LUNCH_BREAK_AURAS[7]
  },
  {
    id: "lb-9",
    title: "Peace of Mind",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 251,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-09-peace-of-mind.m4a",
    aura: LUNCH_BREAK_AURAS[8]
  },
  {
    id: "lb-10",
    title: "Swah!",
    artist: "Seedhe Maut, Badshah",
    album: "Lunch Break",
    duration: 297,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-10-swah.m4a",
    aura: LUNCH_BREAK_AURAS[9]
  },
  {
    id: "lb-11",
    title: "Sick & Proper",
    artist: "Seedhe Maut, Ayush",
    album: "Lunch Break",
    duration: 137,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-11-sick-and-proper.m4a",
    aura: LUNCH_BREAK_AURAS[0]
  },
  {
    id: "lb-12",
    title: "Luka Chippi",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 153,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-12-luka-chippi.m4a",
    aura: LUNCH_BREAK_AURAS[1]
  },
  {
    id: "lb-13",
    title: "Kehna Chahte Hain...",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 114,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-13-kehna-chahte-hain.m4a",
    aura: LUNCH_BREAK_AURAS[2]
  },
  {
    id: "lb-14",
    title: "Champions",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 232,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-14-champions.m4a",
    aura: LUNCH_BREAK_AURAS[3]
  },
  {
    id: "lb-15",
    title: "Pushpak Vimaan",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 202,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-15-pushpak-vimaan.m4a",
    aura: LUNCH_BREAK_AURAS[4]
  },
  {
    id: "lb-16",
    title: "Akatsuki",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 166,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-16-akatsuki.m4a",
    aura: LUNCH_BREAK_AURAS[5]
  },
  {
    id: "lb-17",
    title: "Taakat",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 167,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-17-taakat.m4a",
    aura: LUNCH_BREAK_AURAS[6]
  },
  {
    id: "lb-18",
    title: "Naam Kaam Sheher",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 177,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-18-naam-kaam-sheher.m4a",
    aura: LUNCH_BREAK_AURAS[7]
  },
  {
    id: "lb-19",
    title: "Khoon",
    artist: "Seedhe Maut, Sikander Kahlon",
    album: "Lunch Break",
    duration: 175,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-19-khoon.m4a",
    aura: LUNCH_BREAK_AURAS[8]
  },
  {
    id: "lb-20",
    title: "Lunch Break",
    artist: "Seedhe Maut, Sonny Chimienti",
    album: "Lunch Break",
    duration: 150,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-20-lunch-break.m4a",
    aura: LUNCH_BREAK_AURAS[9]
  },
  {
    id: "lb-21",
    title: "Dikkat",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 170,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-21-dikkat.m4a",
    aura: LUNCH_BREAK_AURAS[0]
  },
  {
    id: "lb-22",
    title: "Baat Aisi Ghar Jaisi",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 191,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-22-baat-aisi-ghar-jaisi.m4a",
    aura: LUNCH_BREAK_AURAS[1]
  },
  {
    id: "lb-23",
    title: "Off Beat",
    artist: "Seedhe Maut, Ab 17",
    album: "Lunch Break",
    duration: 190,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-23-off-beat.m4a",
    aura: LUNCH_BREAK_AURAS[2]
  },
  {
    id: "lb-24",
    title: "Kya Challa",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 107,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-24-kya-challa.m4a",
    aura: LUNCH_BREAK_AURAS[3]
  },
  {
    id: "lb-25",
    title: "Khauf",
    artist: "Seedhe Maut, Bandzo3rd",
    album: "Lunch Break",
    duration: 193,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-25-khauf.m4a",
    aura: LUNCH_BREAK_AURAS[4]
  },
  {
    id: "lb-26",
    title: "I Don't Miss That Life",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 184,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-26-i-dont-miss-that-life.m4a",
    aura: LUNCH_BREAK_AURAS[5]
  },
  {
    id: "lb-27",
    title: "Hausla",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 147,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-27-hausla.m4a",
    aura: LUNCH_BREAK_AURAS[6]
  },
  {
    id: "lb-28",
    title: "Pain",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 175,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-28-pain.m4a",
    aura: LUNCH_BREAK_AURAS[7]
  },
  {
    id: "lb-29",
    title: "W",
    artist: "Seedhe Maut",
    album: "Lunch Break",
    duration: 191,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/lb-29-w.m4a",
    aura: LUNCH_BREAK_AURAS[8]
  },

  // --- NAYAAB (16 TRACKS) ---
  {
    id: "nay-1",
    title: "Toh Kya",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 187,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-01-toh-kya.m4a",
    aura: NAYAAB_AURAS[0]
  },
  {
    id: "nay-2",
    title: "Teen Dost",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 175,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-02-teen-dost.m4a",
    aura: NAYAAB_AURAS[1]
  },
  {
    id: "nay-3",
    title: "Marne Ke Baad Bhi…",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 220,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-03-marne-ke-baad-bhi.m4a",
    aura: NAYAAB_AURAS[2]
  },
  {
    id: "nay-4",
    title: "Gandi Aulaad",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 226,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-04-gandi-aulaad.m4a",
    aura: NAYAAB_AURAS[3]
  },
  {
    id: "nay-5",
    title: "Nayaab",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 133,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-05-nayaab.m4a",
    aura: NAYAAB_AURAS[4]
  },
  {
    id: "nay-6",
    title: "Batti",
    artist: "Seedhe Maut, Sez on the Beat, AB17",
    album: "Nayaab",
    duration: 196,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-06-batti.m4a",
    aura: NAYAAB_AURAS[5]
  },
  {
    id: "nay-7",
    title: "Maina",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 237,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-07-maina.m4a",
    aura: NAYAAB_AURAS[6]
  },
  {
    id: "nay-8",
    title: "Chidiya Udd",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 132,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-08-chidiya-udd.m4a",
    aura: NAYAAB_AURAS[0]
  },
  {
    id: "nay-9",
    title: "Choti Soch",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 135,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-09-choti-soch.m4a",
    aura: NAYAAB_AURAS[1]
  },
  {
    id: "nay-10",
    title: "Dum Ghutte",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 210,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-10-dum-ghutte.m4a",
    aura: NAYAAB_AURAS[2]
  },
  {
    id: "nay-11",
    title: "Khoj",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 228,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-11-khoj.m4a",
    aura: NAYAAB_AURAS[3]
  },
  {
    id: "nay-12",
    title: "Jua",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 167,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-12-jua.m4a",
    aura: NAYAAB_AURAS[4]
  },
  {
    id: "nay-13",
    title: "Kohra",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 255,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-13-kohra.m4a",
    aura: NAYAAB_AURAS[5]
  },
  {
    id: "nay-14",
    title: "Hoshiyaar",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 202,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-14-hoshiyaar.m4a",
    aura: NAYAAB_AURAS[6]
  },
  {
    id: "nay-15",
    title: "Anaadi",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 207,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-15-anaadi.m4a",
    aura: NAYAAB_AURAS[0]
  },
  {
    id: "nay-16",
    title: "Rajdhani",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 273,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/nay-16-rajdhani.m4a",
    aura: NAYAAB_AURAS[1]
  }
];
