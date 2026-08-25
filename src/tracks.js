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
  // --- LUNCH BREAK ---
  {
    id: "lb-1",
    title: "11K",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 174,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/11K%20%5Bl79W7TCggyk%5D.m4a",
    aura: LUNCH_BREAK_AURAS[0]
  },
  {
    id: "lb-2",
    title: "Brand New",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 140,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Brand%20New%20%5BRFEVbcFgJdU%5D.m4a",
    aura: LUNCH_BREAK_AURAS[1]
  },
  {
    id: "lb-3",
    title: "First Place",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 118,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/First%20Place%20%5B3Ex7QYgXkuI%5D.m4a",
    aura: LUNCH_BREAK_AURAS[2]
  },
  {
    id: "lb-4",
    title: "Focused Sedated",
    artist: "Seedhe Maut, Boudhayan Kundu, Siddhant Sharma",
    album: "Lunch Break",
    duration: 176,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Focused%20Sedated%20%5BM54URfWchD8%5D.m4a",
    aura: LUNCH_BREAK_AURAS[3]
  },
  {
    id: "lb-5",
    title: "Fanne Khan",
    artist: "Seedhe Maut, yungsta, Nitin Randhawa, Siddhant Sharma",
    album: "Lunch Break",
    duration: 243,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Fanne%20Khan%20%5B25ruuvtj31g%5D.m4a",
    aura: LUNCH_BREAK_AURAS[4]
  },
  {
    id: "lb-6",
    title: "Joint in the Booth",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 166,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Joint%20in%20the%20Booth%20%5BB4ex_KCiVpE%5D.m4a",
    aura: LUNCH_BREAK_AURAS[5]
  },
  {
    id: "lb-7",
    title: "Khatta Flow",
    artist: "Seedhe Maut, KR$NA, Siddhant Sharma",
    album: "Lunch Break",
    duration: 152,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Khatta%20Flow%20%5BIBkT4Yww7zk%5D.m4a",
    aura: LUNCH_BREAK_AURAS[6]
  },
  {
    id: "lb-8",
    title: "Asal G",
    artist: "Seedhe Maut, Faris Shafi, Talal Qureshi, Siddhant Sharma",
    album: "Lunch Break",
    duration: 221,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Asal%20G%20%5BimaDr8QausY%5D.m4a",
    aura: LUNCH_BREAK_AURAS[7]
  },
  {
    id: "lb-9",
    title: "Peace of Mind",
    artist: "Seedhe Maut, Lil Bhavi, Bhaskar, Ab 17, Siddhant Sharma",
    album: "Lunch Break",
    duration: 237,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Peace%20of%20Mind%20%5BpaOFscgw7Vg%5D.m4a",
    aura: LUNCH_BREAK_AURAS[8]
  },
  {
    id: "lb-10",
    title: "Swah!",
    artist: "Seedhe Maut, Badshah, Siddhant Sharma",
    album: "Lunch Break",
    duration: 284,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Swah!%20%5BKy-QenzQD6U%5D.m4a",
    aura: LUNCH_BREAK_AURAS[9]
  },
  {
    id: "lb-11",
    title: "Sick & Proper",
    artist: "Seedhe Maut, Siddhant Sharma, Boudhayan Kundu",
    album: "Lunch Break",
    duration: 127,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Sick%20%26%20Proper%20%5BfOt5gw9dZhY%5D.m4a",
    aura: LUNCH_BREAK_AURAS[0]
  },
  {
    id: "lb-12",
    title: "Luka Chippi",
    artist: "Seedhe Maut, Bandzo3rd, Siddhant Sharma",
    album: "Lunch Break",
    duration: 142,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Luka%20Chippi%20%5B9mH-57TvCGo%5D.m4a",
    aura: LUNCH_BREAK_AURAS[1]
  },
  {
    id: "lb-13",
    title: "Kehna Chahte Hain...",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 108,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Kehna%20Chahte%20Hain...%20%5BflZ_LohtqB4%5D.m4a",
    aura: LUNCH_BREAK_AURAS[2]
  },
  {
    id: "lb-14",
    title: "Champions",
    artist: "Seedhe Maut, Rawal, Siddhant Sharma",
    album: "Lunch Break",
    duration: 214,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Champions%20%5BWGlu7qJCOIk%5D.m4a",
    aura: LUNCH_BREAK_AURAS[3]
  },
  {
    id: "lb-15",
    title: "Pushpak Vimaan",
    artist: "Seedhe Maut, Sonnyjim, Siddhant Sharma",
    album: "Lunch Break",
    duration: 193,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Pushpak%20Vimaan%20%5BgAkbSydU3kw%5D.m4a",
    aura: LUNCH_BREAK_AURAS[4]
  },
  {
    id: "lb-16",
    title: "Akatsuki",
    artist: "Seedhe Maut, Raga, Siddhant Sharma",
    album: "Lunch Break",
    duration: 156,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Akatsuki%20%5B5Jmhm3LoKao%5D.m4a",
    aura: LUNCH_BREAK_AURAS[5]
  },
  {
    id: "lb-17",
    title: "Taakat",
    artist: "Seedhe Maut, DJ Sa, Lil Bhavi, Sanket Arjunwade, Siddhant Sharma",
    album: "Lunch Break",
    duration: 156,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Taakat%20%5By6ABG8tjfbw%5D.m4a",
    aura: LUNCH_BREAK_AURAS[6]
  },
  {
    id: "lb-18",
    title: "Naam Kaam Sheher",
    artist: "Seedhe Maut, Qaab, Rebel 7, Siddhant Sharma",
    album: "Lunch Break",
    duration: 166,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Naam%20Kaam%20Sheher%20%5BVa2efwPb8Ao%5D.m4a",
    aura: LUNCH_BREAK_AURAS[7]
  },
  {
    id: "lb-19",
    title: "Khoon",
    artist: "Seedhe Maut, Sikander Kahlon, Siddhant Sharma",
    album: "Lunch Break",
    duration: 165,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Khoon%20%5BhInbR9Qm8cQ%5D.m4a",
    aura: LUNCH_BREAK_AURAS[8]
  },
  {
    id: "lb-20",
    title: "Lunch Break",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 141,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Lunch%20Break%20%5Bdj0O_6NX59Y%5D.m4a",
    aura: LUNCH_BREAK_AURAS[9]
  },
  {
    id: "lb-21",
    title: "Dikkat",
    artist: "Seedhe Maut, Hurricane, Siddhant Sharma, Boudhayan Kundu",
    album: "Lunch Break",
    duration: 158,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Dikkat%20%5BB9nKEZeAq4I%5D.m4a",
    aura: LUNCH_BREAK_AURAS[0]
  },
  {
    id: "lb-22",
    title: "Baat Aisi Ghar Jaisi",
    artist: "Seedhe Maut, Siddhant Sharma, Sanket Arjunwade",
    album: "Lunch Break",
    duration: 180,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Baat%20Aisi%20Ghar%20Jaisi%20%5BXiz0CW5Xpx4%5D.m4a",
    aura: LUNCH_BREAK_AURAS[1]
  },
  {
    id: "lb-23",
    title: "Off Beat",
    artist: "Seedhe Maut, Hurricane, Boudhayan Kundu, Siddhant Sharma",
    album: "Lunch Break",
    duration: 181,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Off%20Beat%20%5B6BrBgsYYXUg%5D.m4a",
    aura: LUNCH_BREAK_AURAS[2]
  },
  {
    id: "lb-24",
    title: "Kya Challa",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 101,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Kya%20Challa%20%5BIExPsNSBeu8%5D.m4a",
    aura: LUNCH_BREAK_AURAS[3]
  },
  {
    id: "lb-25",
    title: "Khauf",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 182,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Khauf%20%5BzY2xL4Zvhf4%5D.m4a",
    aura: LUNCH_BREAK_AURAS[4]
  },
  {
    id: "lb-26",
    title: "I Don't Miss That Life",
    artist: "Seedhe Maut, Siddhant Sharma",
    album: "Lunch Break",
    duration: 174,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/I%20Don't%20Miss%20That%20Life%20%5BtVljR5oTKrc%5D.m4a",
    aura: LUNCH_BREAK_AURAS[5]
  },
  {
    id: "lb-27",
    title: "Hausla",
    artist: "Seedhe Maut, Boudhayan Kundu, Siddhant Sharma",
    album: "Lunch Break",
    duration: 139,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Hausla%20%5BRVF2CRMXKJQ%5D.m4a",
    aura: LUNCH_BREAK_AURAS[6]
  },
  {
    id: "lb-28",
    title: "Pain",
    artist: "Seedhe Maut, Nitin Randhawa, Siddhant Sharma",
    album: "Lunch Break",
    duration: 165,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/Pain%20%5BJmYYK3rWnVk%5D.m4a",
    aura: LUNCH_BREAK_AURAS[7]
  },
  {
    id: "lb-29",
    title: "W",
    artist: "Seedhe Maut, Boudhayan Kundu, Siddhant Sharma",
    album: "Lunch Break",
    duration: 181,
    cover: lunchBreakVinyl,
    background: lunchBreakBg,
    audioUrl: "/audio/W%20%5BcV6sq4ByyK8%5D.m4a",
    aura: LUNCH_BREAK_AURAS[8]
  },

  // --- NAYAAB ---
  {
    id: "nay-1",
    title: "Toh Kya",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 180,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Toh%20Kya'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5B7TCXqyCK6yE%5D.m4a",
    aura: NAYAAB_AURAS[0]
  },
  {
    id: "nay-2",
    title: "Teen Dost",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 168,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Teen%20Dost'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BdYqx-GbFE5A%5D.m4a",
    aura: NAYAAB_AURAS[1]
  },
  {
    id: "nay-3",
    title: "Marne Ke Baad Bhi…",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 212,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Marne%20Ke%20Baad%20Bhi%E2%80%A6'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BL9XS7BMo07k%5D.m4a",
    aura: NAYAAB_AURAS[2]
  },
  {
    id: "nay-4",
    title: "Gandi Aulaad",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 218,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Gandi%20Aulaad'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BNq0X7zlR14o%5D.m4a",
    aura: NAYAAB_AURAS[3]
  },
  {
    id: "nay-5",
    title: "Nayaab",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 128,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Nayaab'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BblJQvjUfDdg%5D.m4a",
    aura: NAYAAB_AURAS[4]
  },
  {
    id: "nay-6",
    title: "Batti",
    artist: "Seedhe Maut, Sez on the Beat, AB17",
    album: "Nayaab",
    duration: 188,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Batti'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20ft.%20AB17%20%EF%BD%9C%20Nayaab%20%5Bang7r_Br8bY%5D.m4a",
    aura: NAYAAB_AURAS[5]
  },
  {
    id: "nay-7",
    title: "Maina",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 229,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Maina'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5Bk-6ZDSIMEtY%5D.m4a",
    aura: NAYAAB_AURAS[6]
  },
  {
    id: "nay-8",
    title: "Chidiya Udd’ (Official Lyric Video)",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 126,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Chidiya%20Udd%E2%80%99%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5Bnbw96QEJJGM%5D.m4a",
    aura: NAYAAB_AURAS[0]
  },
  {
    id: "nay-9",
    title: "Choti Soch",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 128,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Choti%20Soch'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BaOOZgIhVIKg%5D.m4a",
    aura: NAYAAB_AURAS[1]
  },
  {
    id: "nay-10",
    title: "Dum Ghutte",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 202,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Dum%20Ghutte'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BWsz28sZraTk%5D.m4a",
    aura: NAYAAB_AURAS[2]
  },
  {
    id: "nay-11",
    title: "Khoj",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 220,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Khoj'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5Be04zr2dpHdY%5D.m4a",
    aura: NAYAAB_AURAS[3]
  },
  {
    id: "nay-12",
    title: "Jua",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 160,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Jua'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BWtZ4_lCCTZU%5D.m4a",
    aura: NAYAAB_AURAS[4]
  },
  {
    id: "nay-13",
    title: "Kohra",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 246,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Kohra'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BDj2cCoSNovo%5D.m4a",
    aura: NAYAAB_AURAS[5]
  },
  {
    id: "nay-14",
    title: "Hoshiyaar",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 194,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Hoshiyaar'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5B-zjSIPaHihk%5D.m4a",
    aura: NAYAAB_AURAS[6]
  },
  {
    id: "nay-15",
    title: "Anaadi",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 199,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Anaadi'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5Bvc-GlDwK6cc%5D.m4a",
    aura: NAYAAB_AURAS[0]
  },
  {
    id: "nay-16",
    title: "Rajdhani",
    artist: "Seedhe Maut, Sez on the Beat",
    album: "Nayaab",
    duration: 267,
    cover: nayaabVinyl,
    background: nayaabBg,
    audioUrl: "/audio/'Rajdhani'%20(Official%20Lyric%20Video)%20%EF%BD%9C%20Seedhe%20Maut%20x%20Sez%20on%20the%20Beat%20%EF%BD%9C%20Nayaab%20%5BShJq33LoWxg%5D.m4a",
    aura: NAYAAB_AURAS[1]
  }
];
