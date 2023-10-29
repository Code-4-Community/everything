import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Helmet } from 'react-helmet';
import { Container, Box, Link } from '@material-ui/core';
import Hero from '../../components/Hero';
import { ReactComponent as SVG } from './faq.svg';
import { Link as RouterLink } from 'react-router-dom';
import Accordion from './Accordion';

export default function FAQ() {
  // this is the list of FAQs
  const frequently_asked_questions = [
    {
      title: 'What does C4C stand for?',
      body: 'C4C stands for Code4Community!',
    },
    {
      title: 'How does the application process work?',
      // TODO figure out how to link to the apply page from here
      body: "Visit the apply page and submit your application. We'll reach out to schedule an interview with 1-2 members of our team.",
    },
    {
      title: 'Who do we work with?',
      body: 'We work with nonprofits in the Greater Boston area that strive to improve the community we live in. We look for organizations that have a need for a software solution, but lack the resources to pursue typical development channels.',
    },
    {
      title: 'How often does C4C meet?',
      body: 'Product team members meet once a week.',
    },
    {
      title: 'What is the product team structure?',
      body: 'Teams are structured around a single project that everyone works on together. Each team is made up of: a project lead, 1-2 designers, and several software developers.',
    },
    {
      title:
        'How many people are in C4C? How many people are on a product team?',
      body: 'Depending on how many partners and projects we are taking on in a semester, our organization size may vary. However, our product teams are usually around 8 members each.',
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg">
      <Hero
        title="FAQs"
        subtitle="Everything you need to know about our product teams."
        SvgNode={SVG}
      />
      <Container maxWidth="xs">
        <Box py="5vh">
          <Accordion sections={frequently_asked_questions} />
        </Box>
      </Container>
    </Container>
  );
}
