import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Box, Link } from '@material-ui/core';
import Hero from '../../components/Hero';
import { ReactComponent as SVG } from './faq.svg';
import JumpstartAccordion from '../../components/Accordion';
import { Link as RouterLink } from 'react-router-dom';
/*
Template for future page components.
Use MUI's CSS-in-JS makeStyles() as shown below for more complex CSS/
Otherwise, use <Box> components where possible for inline styling.
Every page must have a Helmet tag for SEO purposes.
*/

const faq = [
  {
    title: "Can I still apply to join C4C if I'm not on campus this semester?",
    body:
      'Absolutely! No matter where you are you can still join C4C and help the Boston community. Our teams are comfortable working with others in different timezones, and we will never consider your current location to be a negative factor in our application process.',
  },
  {
    title: 'How does the application process work?',
    body: (
      <>
        Visit the{' '}
        <RouterLink to="/apply">
          <Link>Apply</Link>
        </RouterLink>{' '}
        page and submit your application. We’ll reach out to schedule a brief
        interview with 1-2 members of our team.
        <br />
        Note: C4C does not believe coding challenges belong in our interview
        process, and we never factor school year into our decisions.
      </>
    ),
  },
  {
    title: 'Who do we work with?',
    body:
      'We work with nonprofits in the Greater Boston area that strive to improve the community we live in. We look for organizations that have a need for a software solution, but lack the resources to pursue typical development channels.',
  },
  {
    title: 'How much of a time commitment is C4C?',
    body: (
      <>
        About 5 hours a week comprised of:
        <Box mt={-2}>
          <ol>
            <li> A weekly, one hour meeting with your team</li>
            <li>
              Individual product work which is determined weekly during the team
              meeting. We like to assign work weekly because it gives our team
              members flexibility in their work, (e.g. if you know you’ll be
              super busy one week you can always take on less work and vice
              versa)
            </li>
          </ol>
        </Box>
      </>
    ),
  },
  {
    title: 'How often does C4C meet?',
    body: 'Product team members meet once a week.',
  },
  {
    title: 'What is the product team structure?',
    body:
      'Teams are structured around a single project that everyone works on together. Each team is made up of: a project lead, 1-2 designers, and several software developers.',
  },
  {
    title: 'How many people are in C4C? How many people are on a product team?',
    body:
      'Depending on how many partners and projects we are taking on in a semester, our organization size may vary. However, our product teams are usually around 8 members each.',
  },
  {
    title: 'What have you worked on in the past?',
    body: (
      <>
        Check out our past projects on our{' '}
        <Link href="https://github.com/Code-4-Community">Github</Link>!
      </>
    ),
  },
];

const FAQ: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>FAQs</title>
        <meta
          name="description"
          content="Frequently asked questions about Code4Community."
        />
      </Helmet>

      <Hero
        title="FAQs"
        subtitle="Everything you need to know about our product teams."
        SvgNode={SVG}
      />
      <Container maxWidth="sm">
        <Box py="5vh">
          <JumpstartAccordion sections={faq} />
        </Box>
      </Container>
    </Container>
  );
};

export default FAQ;
