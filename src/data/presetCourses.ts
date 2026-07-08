import type { Course } from '../types';

export const presetCourses: Course[] = [
  {
    code: 'CSE2001',
    title: 'Data Structures and Algorithms',
    credits: 4,
    type: 'embedded',
    basket: 'UC',
    theoryCredits: 3,
    labCredits: 2
  },
  {
    code: 'ECE2001',
    title: 'Analog Devices and Circuits',
    credits: 4,
    type: 'embedded',
    basket: 'PC',
    theoryCredits: 3,
    labCredits: 2
  },
  {
    code: 'ECE2005',
    title: 'Signals and Systems',
    credits: 4,
    type: 'theory',
    basket: 'PC',
    theoryCredits: 4
  },
  {
    code: 'ECE2014',
    title: 'Microprocessors and Microcontrollers',
    credits: 4,
    type: 'embedded',
    basket: 'PC',
    theoryCredits: 3,
    labCredits: 2
  },
  {
    code: 'MGT1040',
    title: 'Entrepreneurship',
    credits: 3,
    type: 'theory',
    basket: 'UC',
    theoryCredits: 3
  },
  {
    code: 'ECS2002',
    title: 'Engineering Clinics - System Design',
    credits: 4,
    type: 'embedded',
    basket: 'UC',
    theoryCredits: 3,
    labCredits: 2
  },
  {
    code: 'STS2010',
    title: 'Qualitative and Quantitative Skills Practice-I',
    credits: 1,
    type: 'theory',
    basket: 'UC',
    theoryCredits: 3 // Needs a 3-credit slot combination (e.g. A1+TA1), but contributes 1 credit
  },
  {
    code: 'STS2015',
    title: 'Qualitative and Quantitative Skills Practice II',
    credits: 1.5,
    type: 'theory',
    basket: 'UC',
    theoryCredits: 3
  },
  {
    code: 'EXC1001',
    title: 'Clubs and Chapters',
    credits: 2,
    type: 'lab',
    basket: 'UC',
    labCredits: 2
  }
];

export const courseColors = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#8b5cf6', // violet
  '#f59e0b', // amber
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f43f5e', // rose
  '#14b8a6', // teal
  '#a855f7', // purple
  '#eab308'  // yellow
];
