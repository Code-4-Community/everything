export interface Person {
  readonly name: string;
  readonly position: string;
  readonly image: string;
  readonly altImage?: string;
  readonly linkedin?: string;
  readonly email?: string;
  readonly github?: string;
  readonly website?: string;
}

export const people: Person[] = [
  /* Eboard */
  {
    name: 'Sofie Duntugan',
    position: 'Director of Product',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/sofie_duntugan.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/sofie_duntugan.jfif',
    linkedin: 'https://www.linkedin.com/in/sofie-duntugan/',
    email: 'duntugan.s@northeastern.edu',
  },
  {
    name: 'Cecilia Chepkoech',
    position: 'Co-Director of Operations; Director of Finance',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/cecilia_chepkoech.jpg',
    linkedin: 'https://www.linkedin.com/in/cecilia-chepkoech/',
    email: 'chepkoech.c@northeastern.edu',
  },
  {
    name: 'Crystal Zhang',
    position: 'Co-Director of Operations',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/crystal_zhang.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/crystal_zhang.jfif',
    linkedin: 'https://www.linkedin.com/in/cryystalzhang/',
    email: 'zhang.cr@northeastern.edu',
  },
  {
    name: 'Vivian Chen',
    position: 'Director of Marketing',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/Vivian_Chen+-+Vivian+Chen.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/Vivian_Chen+-+Vivian+Chen.jpg',
    linkedin: 'https://www.linkedin.com/in/vivianchen1029/',
    email: 'chen.viv@northeastern.edu',
  },
  {
    name: 'Derek Leung',
    position: 'Director of Recruitment',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2021/derek_leung.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2021/derek_leung.png',
    linkedin: 'https://www.linkedin.com/in/derekleung27/',
    email: 'dleung2140@gmail.com',
  },
  // Kenny
  // Angeli
  // Lisa
  // Harrison
  // Fanny

  /* SFTT */
  {
    name: 'Avery Huang',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Avery_Huang.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Avery_Huang.jpg',
    linkedin: 'https://www.linkedin.com/in/averyhuang0h/',
    email: 'huang.av@northeastern.edu',
  },
  // Felix
  // Suubi
  {
    name: 'Surabhi Keesara',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/Surabhi_Keesara.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/Surabhi_Keesara.png',
    linkedin: 'https://www.linkedin.com/in/surabhikeesara',
    email: 'keesara.s@northeastern.edu',
  },
  // Oliver
  // Nalini
  // Cici

  /* JPAL */
  // Derek
  {
    name: 'Dhivas Sugumar',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Dhivas-S.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Dhivas-S.jpg',
    linkedin: 'https://www.linkedin.com/in/dhivas-sugumar/',
    email: 'sugumar.d@northeastern.edu',
  },
  // Kitty
  {
    name: 'Michelle Velyunksiy',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/michelle_velyunskiy+-+Michelle+Velyunskiy.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/michelle_velyunskiy+-+Michelle+Velyunskiy.jpg',
    linkedin: 'https://www.linkedin.com/in/michelle-velyunskiy-2a028522b',
    email: 'velyunskiy.m@northeastern.edu',
  },
  // Leah
  // Kirtana
  // Dessy
  // Eunice
  // Jamie

  /* Constellation */
  {
    name: 'Nate Kirschner',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Nate_Kirschner.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Nate_Kirschner.JPG',
    linkedin: 'https://www.linkedin.com/in/nathan-kirschner/',
    email: 'kirschner.n@northeastern.edu',
  },
  {
    name: 'Belle Lim',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Belle_Lim.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Belle_Lim.jpg',
    linkedin: 'https://www.linkedin.com/in/isobelle-lim/',
    email: 'lim.i@northeastern.edu',
  },
  // Benjamin
  // Ala'a
  // Shreya
  {
    name: 'Fanny Zheng',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Fanny-Z.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Fanny-Z.JPG',
    linkedin: 'https://www.linkedin.com/in/zfanny/',
    email: 'zheng.fan@northeastern.edu',
  },
  // Sahithi
  // Mouhamadou
  // Samuel
  // Sarah

  /* Breaktime */
  {
    name: 'Izzy Conner',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Izzy-C.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Izzy-C.jpg',
    linkedin: 'https://www.linkedin.com/in/isabella-conner/',
    email: 'conner.i@northeastern.edu',
  },
  {
    name: 'David Levin',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/David-L.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/David-L.jpg',
    linkedin: 'https://www.linkedin.com/in/davidlevin55/',
    email: 'levin.da@northeastern.edu',
  },
  // Arunima
  // Victoria
  // Ella
  // Adalia
  {
    name: 'Kaylee Wu',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Wu%2C+Kaylee.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Wu%2C+Kaylee.jpg',
    linkedin: 'https://www.linkedin.com/in/kaylee-wu-7542a8205/',
    email: 'wu.kay@northeastern.edu',
  },
  // Aditya
  // Neeti
  // Ethan
  // Rachel

  /* GI Boston */
  // Hamsini
  {
    name: 'James Colesanti',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/JamesColesantiC4CPicture.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/JamesColesantiC4CPicture.jpg',
    linkedin: 'https://www.linkedin.com/in/james-colesanti-a2b043234/',
    email: 'colesanti.j@northeastern.edu',
  },
  {
    name: 'Mahek Aggarwal',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Mahek_Aggarwal.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/Mahek_Aggarwal.jpg',
    linkedin: 'https://www.linkedin.com/in/mahekagg/',
    email: 'aggarwal.ma@northeastern.edu',
  },
  // Urvi
  // Raaby
  // Chris
  // David
  // Jaren
  // Armaan

  /* Core Infrastructure */
  {
    name: 'Harrison Kim',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Harrison-K.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/Harrison-K.jpg',
    linkedin: 'https://www.linkedin.com/in/kimharr/',
    email: 'kim.harr@northeastern.edu',
  },
  // Khushi
  // Qian
  // Olivier
  // Ananya
];
