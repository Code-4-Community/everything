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
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2020/sofie_duntugan.jpg',
    linkedin: 'https://www.linkedin.com/in/sofie-duntugan/',
    email: 'duntugan.s@northeastern.edu',
    github: 'https://github.com/SofieDunt',
    website: 'https://sofiedunt.github.io/',
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
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/crystal_zhang.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/crystal_zhang.jfif',
    linkedin: 'https://www.linkedin.com/in/cryystalzhang/',
    email: 'zhang.cr@northeastern.edu',
  },
  {
    name: 'Vivian Chen',
    position: 'Director of Marketing',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/vivian_chen.png',
    linkedin: 'https://www.linkedin.com/in/vivianchen0/',
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
  {
    name: 'Kenny Jung',
    position: 'Director of Engineering',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2021/kenny_jung.jpg',
    linkedin: 'https://www.linkedin.com/in/kenny-jung/',
    email: 'jung.du@northeastern.edu',
    github: 'https://github.com/chromium-52',
  },
  // Angeli
  // Lisa
  // Harrison
  // Fanny

  /* SFTT */
  {
    name: 'Avery Huang',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/avery_huang.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/avery_huang.jpg',
    linkedin: 'https://www.linkedin.com/in/averyhuang0h/',
    email: 'huang.av@northeastern.edu',
  },
  {
    name: 'Felix Yang',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/felix_yang.jpeg',
    linkedin: 'https://www.linkedin.com/in/felix-z-yang/',
    email: 'yang.fel@northeastern.edu',
    github: 'https://github.com/fzyang1227',
  },
  // Suubi
  {
    name: 'Surabhi Keesara',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/surabhi_keesara.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/surabhi_keesara.png',
    linkedin: 'https://www.linkedin.com/in/surabhikeesara',
    email: 'keesara.s@northeastern.edu',
  },
  {
    name: 'Oliver Toh',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/oliver_toh.jpg',
    linkedin: 'https://www.linkedin.com/in/olivertoh/',
    email: 'toh.o@northeastern.edu',
    github: 'https://github.com/CerberusLatrans',
    website: 'https://linktr.ee/neunicyclers',
  },
  {
    name: 'Cici Ling',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/cici_ling.jpeg',
    linkedin: 'https://www.linkedin.com/in/cici-ling-b53197239/',
    email: 'ling.jiax@northeastern.edu',
  },
  {
    name: 'Nalini Kantheti',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/nalini_kantheti.jpeg',
    linkedin: 'https://www.linkedin.com/in/nalinikantheti/',
    email: 'kantheti.n@northeastern.edu',
    github: 'https://github.com/nalinikantheti',
  },

  /* JPAL */
  // Derek
  {
    name: 'Dhivas Sugumar',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/dhivas_sugumar.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/dhivas_sugumar.jpg',
    linkedin: 'https://www.linkedin.com/in/dhivas-sugumar/',
    email: 'sugumar.d@northeastern.edu',
  },
  {
    name: 'Ruohan (Kitty) Li',
    position: 'Product Designer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/kitty_li.jpg',
    linkedin: 'https://www.linkedin.com/in/ruohan-kitty-li/',
    email: 'li.ruoh@northeastern.edu',
    website: 'https://kittyruohanli.squarespace.com',
  },
  {
    name: 'Michelle Velyunksiy',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/michelle_velyunskiy.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/michelle_velyunskiy.jpg',
    linkedin: 'https://www.linkedin.com/in/michelle-velyunskiy-2a028522b',
    email: 'velyunskiy.m@northeastern.edu',
  },
  {
    name: 'Dessy Dusichka',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/dessy_dusichka.png',
    linkedin: 'https://www.linkedin.com/in/dessy-dusichka/',
    email: 'dusichka.d@northeastern.edu',
    github: 'https://github.com/ddusichka',
    website: 'https://dessydusichka.com/',
  },
  {
    name: 'Leah Zeisner',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/leah_zeisner.jpeg',
    linkedin: 'https://www.linkedin.com/in/leah-zeisner/',
    email: 'zeisner.l@northeastern.edu',
    github: 'https://github.com/leahzeisner',
  },
  {
    name: 'Eunice Koo',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/eunice_koo.jpg',
    linkedin: 'https://www.linkedin.com/in/eunicekoo/',
    email: 'koo.e@northeastern.edu',
  },
  {
    name: 'Kirtana Krishnan',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/kirtana_krishnan.jpg',
    linkedin: 'https://www.linkedin.com/in/kirtanakrishnan/',
    email: 'krishnan.ki@northeastern.edu',
    github: 'https://github.com/kirtanakrishnan',
  },
  {
    name: 'Jamie Pan',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/jamie_pan.jpeg',
    linkedin: 'https://www.linkedin.com/in/jamie-pan/',
    email: 'pan.jam@northeastern.edu',
  },

  /* Constellation */
  {
    name: 'Nate Kirschner',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/nate_kirschner.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/nate_kirschner.jpg',
    linkedin: 'https://www.linkedin.com/in/nathan-kirschner/',
    email: 'kirschner.n@northeastern.edu',
  },
  {
    name: 'Belle Lim',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/belle_lim.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/belle_lim.jpg',
    linkedin: 'https://www.linkedin.com/in/isobelle-lim/',
    email: 'lim.i@northeastern.edu',
  },
  {
    name: 'Benjamin Cao',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/benjamin_cao.jpeg',
    linkedin: 'https://www.linkedin.com/in/benjamin-cao-61266a249',
    email: 'cao.ben@northeastern.edu',
  },
  // Ala'a
  {
    name: 'Shreya Venkataraman',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/shreya_venkataraman.jpg',
    linkedin: 'https://www.linkedin.com/in/shreya-venkataraman/',
    email: 'venkataraman.s@northeastern.edu',
    website: 'https://venkataramans.myportfolio.com/home',
  },
  {
    name: 'Fanny Zheng',
    position: 'Developer; Co-Director of Events',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/fanny_zheng.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/fanny_zheng.jpg',
    linkedin: 'https://www.linkedin.com/in/zfanny/',
    email: 'zheng.fan@northeastern.edu',
  },
  // Sahithi
  {
    name: 'Mouhamadou Sissoko',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/mouhamadou_sissoko.jpg',
    linkedin: 'https://www.linkedin.com/in/mouhamadou-sissoko/',
    email: 'sissoko.m@northeastern.edu',
    github: 'https://github.com/Mo-sissoko',
  },
  {
    name: 'Sarah Ninan',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/sarah_ninan.jpg',
    linkedin: 'https://www.linkedin.com/in/sarah-ninan-/',
    email: 'ninan.s@northeastern.edu',
    github: 'https://github.com/sninan1',
  },
  {
    name: 'Samuel Schumacher',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/samuel_schumacher.jpg',
    linkedin: 'https://www.linkedin.com/in/samuel-schumacher-b895a8232/',
    email: 'schumacher.sa@northeastern.edu',
  },

  /* Breaktime */
  {
    name: 'Izzy Conner',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/izzy_conner.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/izzy_conner.jpg',
    linkedin: 'https://www.linkedin.com/in/isabella-conner/',
    email: 'conner.i@northeastern.edu',
  },
  {
    name: 'David Levin',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/david_levin.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/david_levin.jpg',
    linkedin: 'https://www.linkedin.com/in/davidlevin55/',
    email: 'levin.da@northeastern.edu',
  },
  {
    name: 'Arunima Gupta',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/arunima_gupta.jpeg',
    linkedin: 'https://www.linkedin.com/in/arunimagupta123/',
    email: 'gupta.aru@northeastern.edu',
  },
  {
    name: 'Victoria Arzumanova',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/victoria_arzumanova.png',
    linkedin: 'https://www.linkedin.com/in/victoria-arzumanova/',
    email: 'arzumanova.v@northeastern.edu',
    website: 'https://www.victoriaarzu.com/',
  },
  // Ella
  {
    name: 'Adalia Lee',
    position: 'Product Designer; Co-Director of Events',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/adalia_lee.jpeg',
    linkedin: 'https://www.linkedin.com/in/adalia-lee/',
    email: 'lee.adal@northeastern.edu',
    website: 'https://adalialee.github.io/adalia-lee/',
  },
  {
    name: 'Kaylee Wu',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/kaylee_wu.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/kaylee_wu.jpg',
    linkedin: 'https://www.linkedin.com/in/kaylee-wu-7542a8205/',
    email: 'wu.kay@northeastern.edu',
  },
  // Aditya
  {
    name: 'Neeti Desai',
    position: 'Developer',
    image: 'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/neeti_desai.jpg',
    linkedin: 'https://www.linkedin.com/in/neeti-desai/',
    email: 'desai.ne@northeastern.edu',
    github: 'https://github.com/neetidesai'
  },
  {
    name: 'Ethan Kong',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/ethan_kong.jpg',
    linkedin: 'https://www.linkedin.com/in/ethan-kong/',
    email: 'kong.e@northeastern.edu',
    github: 'https://github.com/ethankong150',
  },
  {
    name: 'Rachel Ma',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/rachel_ma.png',
    linkedin: 'https://www.linkedin.com/in/rachel-ma2/',
    email: 'ma.ra@northeastern.edu',
  },

  /* GI Boston */
  // Hamsini
  {
    name: 'James Colesanti',
    position: 'Tech Lead',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/james_colesanti.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/james_colesanti.jpg',
    linkedin: 'https://www.linkedin.com/in/james-colesanti-a2b043234/',
    email: 'colesanti.j@northeastern.edu',
  },
  {
    name: 'Mahek Aggarwal',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/mahek_aggarwal.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/mahek_aggarwal.jpg',
    linkedin: 'https://www.linkedin.com/in/mahekagg/',
    email: 'aggarwal.ma@northeastern.edu',
  },
  // Urvi
  {
    name: 'Raaby Omar',
    position: 'Product Manager',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/raaby_omar.jpg',
    linkedin: 'https://www.linkedin.com/in/raabyomar',
    email: 'omar.r@northeastern.edu',
    github: 'https://github.com/raabyo',
    website: 'https://raabyo.squarespace.com',
  },
  {
    name: 'Chris He',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/chris_he.jpg',
    linkedin: 'https://www.linkedin.com/in/chris-he-/',
    email: 'he.chr@northeastern.edu',
    github: 'https://www.github.com/bobbyslug',
    website: 'https://chrishe.dev/',
  },
  {
    name: 'Armaan Agrawal',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/armaan_agrawal.png',
    linkedin: 'https://www.linkedin.com/in/agr1/',
    email: 'agrawal.arm@northeastern.edu',
    github: 'https://github.com/airman416',
    website: 'https://armaanagrawal.com/',
  },
  {
    name: 'Jaren Adams',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/jaren_adams.jpg',
    linkedin: 'https://www.linkedin.com/in/jarenadams/',
    email: 'adams.jar@northeastern.edu',
    github: 'https://github.com/jarenadams21',
  },
  // David

  /* Core Infrastructure */
  {
    name: 'Harrison Kim',
    position: 'Tech Lead; Co-Director of Events',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/harrison_kim.webp',
    altImage:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2022/harrison_kim.jpg',
    linkedin: 'https://www.linkedin.com/in/kimharr/',
    email: 'kim.harr@northeastern.edu',
  },
  // Khushi
  {
    name: 'Qian Xiao',
    position: 'Product Designer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/qian_xiao.jpg',
    linkedin: 'https://www.linkedin.com/in/qian-xiao-99697522b/',
    email: 'xiao.qi@northeastern.edu',
    website: 'https://www.qianxiao.space/',
  },
  {
    name: 'Olivier John Ndjike Nzia',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/olivier_john_ndjike_nzia.jpeg',
    linkedin: 'https://linkedin.com/in/ojn',
    email: 'ndjikenzia.o@northeastern.edu',
    github: 'https://github.com/ojn03',
    website: 'https://ojn.me/',
  },
  {
    name: 'Ananya Radhakrishnan',
    position: 'Developer',
    image:
      'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2023/ananya_radhakrishnan.jpg',
    linkedin: 'https://www.linkedin.com/in/ananya-radhakrishnan/',
    email: 'radhakrishnan.an@northeastern.edu',
    github: 'https://github.com/ananyar807',
  },
];
