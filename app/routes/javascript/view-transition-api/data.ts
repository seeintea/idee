export interface Item {
  title: string;
  desc: string;
  url: string;
}

const prefix = "/images/routes/view-transition-api";

const data: Item[] = [
  {
    title: "Doraemon: Nobita's Three Visionary Swordsmen",
    desc: `Doraemon: Nobita's Three Visionary Swordsmen (ドラえもん: のび太と夢幻三剣士, Doraemon: Nobita to Mugen Sankenshi) is a 1994 Japanese animated science fantasy film which premiered in Japan on March 12, 1994, based on the 14th volume of the same name of the Doraemon Long Stories series. This film marks the 15th anniversary of the Doraemon television series on TV Asahi. It's the 15th Doraemon film.`,
    url: `${prefix}/vta-001.webp`,
  },
  {
    title: "Doraemon: Nobita's Great Battle of the Mermaid King",
    desc: `Doraemon: Nobita's Great Battle of the Mermaid King (ドラえもん のび太の人魚大海戦, Doraemon: Nobita no Ningyo Daikaisen) is a 2010 Japanese animated science fantasy action adventure film based on the manga and anime series Doraemon, and is the 30th Doraemon film. The film was released in Japan on March 6, 2010.`,
    url: `${prefix}/vta-002.webp`,
  },
  {
    title: "Stand by Me Doraemon",
    desc: `The film is primarily based on the first chapter of the manga "All the Way From the Future", the 1973 chapter "Mountain Rescue", the 1980 chapter "Goodbye Shizuka", the 1984 chapter "Imprinting Shizuka", the 1998 short film "Doraemon Comes Back" and the 1999 short film "Doraemon: Nobita's Night Before a Wedding", though several other chapters are briefly brought up as well.`,
    url: `${prefix}/vta-003.webp`,
  },
  {
    title: "Doraemon: Nobita's Earth Symphony",
    desc: `Doraemon the Movie: Nobita's Earth Symphony (映画ドラえもん のび太の地球交響楽, Eiga Doraemon Nobita no Chikyū Shinfonī) is a 2024 Japanese animated musical fantasy science fiction adventure film. It is the 43rd Doraemon feature film. Directed by Kazuaki Imai from a screenplay by Teruko Utsumi, it was released theatrically in Japan on March 1, 2024.`,
    url: `${prefix}/vta-004.webp`,
  },
  {
    title: "Stand by Me Doraemon 2",
    desc: `Stand by Me Doraemon 2 (STAND BY ME ドラえもん 2) is a 2020 Japanese animated science fiction comedy film based on the Doraemon manga series and a sequel to the previous movie, the 2014 film Stand by Me Doraemon. Directed by Ryūichi Yagi and Takashi Yamazaki, it is primarily inspired by Doraemon's 2000 short film Doraemon: A Grandmother's Recollections and Doraemon's 2002 short film The Day When I Was Born.`,
    url: `${prefix}/vta-005.webp`,
  },
];

export default data;
