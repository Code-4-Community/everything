export interface Project {
  readonly title: string;
  readonly paragraph: string;
  readonly appDesc: string;
  readonly path: string;
  readonly abbr: string;
  readonly learnMore: string;
}

export const projects: Project[] = [
  // {
  //   title: 'Boston Alliance of LGBTQ+ Youth',
  //   paragraph: `Code4Community is partnering with the Boston Alliance of LGBTQ+ Youth (BAGLY) to address LGBTQ+ youth homelessness in Boston. Project BAGLY aims to develop a user-friendly, map-based app that helps LGBTQ+ youth locate winter shelters. Users can input their ZIP code, city, or state to find the nearest shelter, with real-time updates and user-generated feedback. The project will prioritize a mobile-first design to enhance accessibility, supporting BAGLY's mission to create safe and inclusive spaces.`,
  //   appDesc: 'Winter Shelter Locator',
  //   path: 'https://images.squarespace-cdn.com/content/v1/5977811659cc6848f5a06520/1583166007228-B6G6LEW8WS8JAV68U6KJ/BAGLY+wide.png',
  //   abbr: 'BAGLY',
  //   learnMore: 'https://www.bagly.org/',
  // },
  {
    title: 'Green Infrastructure Boston',
    paragraph: `The City of Boston has rolled out a volunteer program to help maintain publicly owned Green Infrastructure (G.I.). Code4Community has partnered with the City of Boston to create a web application to support the volunteer program similar to an adopt-a-tree site we partnered with Speak for the Trees to build.`,
    appDesc: 'Infrastructure Stewardship System',
    path: 'https://patterns.boston.gov/images/public/logo.svg?sj39nd',
    abbr: 'G.I. Boston',
    learnMore: 'https://www.boston.gov/departments/green-infrastructure',
  },
  {
    title: 'Boston Climate Action Network',
    paragraph: `The Boston Climate Action Network (BCAN)’s mission is to organize Boston residents and collaborate with other social justice allies to advocate for climate justice and urgent action on the climate emergency by the City of Boston and other policymakers. Code4Community has partnered with BCAN to create a grant tracking service. This service will streamline their current grant tracking process, allowing employees to view the status of grants and take actions accordingly.`,
    appDesc: 'Grant Tracking System',
    path: 'https://ci3.googleusercontent.com/mail-sig/AIorK4xSr0Uil8mz_voznz4_oQUZ_7IxY_S5FdwSpbGNjuxevhwjbyWZkxjlFUGhrg6lby3k362p4OE',
    abbr: 'BCAN',
    learnMore: 'https://bostoncan.org/about/',
  },
  {
    title: 'Securing Safe Food',
    paragraph: `Securing Safe Food is a nonprofit with a mission to fight food insecurity among individuals with food allergies and to improve access to allergen-free foods by connecting with food pantries serving local communities across the nation. Code4Community has partnered with SSF to create a portal that allows the food pantries and SSF to track delivery of food shipments, provide feedback, and track budgeting for the organization.`,
    appDesc: 'Food Shipment Portal',
    path: 'https://static.wixstatic.com/media/1e98f9_a705ae4b19004e778d31f8a31aae8d9a~mv2.png/v1/fill/w_85,h_85,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Untitled-1.png',
    abbr: 'SSF',
    learnMore: 'https://www.securingsafefood.org/',
  },  
  {
    title: 'Breaktime',
    paragraph: `Breaktime’s mission is to break the cycle of homelessness by equipping young adults with the job and financial security they need to establish housing security. A key part of the program is by providing meaningful employment. We are assisting Breaktime in building a bespoke system for their unique needs.`,
    appDesc: 'Time Tracking & Grants System',
    path: 'https://static.wixstatic.com/media/1193ef_371853f9145b445fb883f16ed7741b60~mv2.jpg/v1/crop/x_0,y_2,w_1842,h_332/fill/w_466,h_84,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Breaktime%20Logo%20Comfortaa-2.jpg',
    abbr: 'Breaktime',
    learnMore: 'https://www.breaktime.org/',
  },
  {
    title: `This Star Won't Go Out`,
    paragraph: `Since its founding in 2011, TSWGO has helped hundreds of families, with gifts totaling over $450,000 to help families suffering from financial hardship related to childhood cancer. We're helping to streamline this system so that TSWGO can focus their attention on helping families.`,
    appDesc: 'Grant Application System',
    path: 'https://images.squarespace-cdn.com/content/v1/5afe1b373e2d09d58a8b7629/1548818988674-PNHSLS67AF1SRNW6JAX4/LOGO_TSWGO_1.png?format=1500w',
    abbr: 'TSWGO',
    learnMore: 'https://www.tswgo.org/',
  },
  {
    title: 'J-PAL',
    paragraph: `The Abdul Latif Jameel Poverty Action Lab (J-PAL) is a global research center working to reduce poverty by ensuring that policy is informed by scientific evidence. J-PAL works with the New York City Department of Youth and Community Development, which runs the country's largest summer youth employment program, to evaluate the impact of recommendation letters on participants’ educational and employment outcomes after the program. C4C is building a system that simplifies the creation, dissemination and completion of surveys that will be used to create unique letters of recommendation for each youth. Each youth will be sent their unique letter(s) of recommendation, which we hope will improve their educational and employment opportunities.`,
    appDesc: 'Letter of Recommendation System',
    path: 'https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/JPAL_logo.svg',
    abbr: 'J-PAL',
    learnMore: 'https://www.povertyactionlab.org/',
  },
  {
    title: "Lucy's Love Bus - Practitioner Network",
    paragraph: `Lucy’s Love Bus improves quality of life for children with cancer
            or other life-threatening illnesses with integrative therapies like massage, meditation,
            acupuncture, music therapy, and therapeutic horseback riding. Integrative therapies ease children’s
            pain and anxiety during and after traditional medical treatments. We are building an open search directory to allow families across New England to find integrative therapists in their area.`,
    appDesc: 'Practitioner Search Directory',
    path: 'https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/LLB_2019_rgb.png',
    abbr: 'LLB',
    learnMore: 'https://www.search.c4cneu.com/',
  },
  {
    title: "Lucy's Love Bus - Sajini Center",
    paragraph: ` The Sajni Center is a space of hope and healing for children with life-threatening illness or chronic
            medical conditions and their families. Here they host events for the children and their families. We created
            the event planning and ticket purchasing system for all the events hosted by Lucy's Love Bus.`,
    appDesc: 'Event Registration System',
    path: 'https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/LLB_2019_rgb.png',
    abbr: 'LLB',
    learnMore: 'https://www.lovebusprograms.org/',
  },
  {
    title: 'Speak For The Trees',
    paragraph: `Speak for the Trees Boston aims to improve the size and health
            of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods.
            They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.`,
    appDesc: 'Tree Stewardship System',
    path: 'https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png',
    abbr: 'SFFT',
    learnMore: 'https://treeboston.org/',
  },
];
