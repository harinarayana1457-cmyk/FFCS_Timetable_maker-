import type { DayOfWeek, Session } from '../types';

// Raw Theory Slot Sessions (Based on Annexure-I Fall Semester 2026-27 Slot Timetable)
// Theory hours:
// Period 1: 08:00 - 08:50
// Period 2: 09:00 - 09:50
// Period 3: 10:00 - 10:50
// Period 4: 11:00 - 11:50
// Period 5: 12:00 - 12:50
// Period 6: 14:00 - 14:50
// Period 7: 15:00 - 15:50
// Period 8: 16:00 - 16:50
// Period 9: 17:00 - 17:50
// Period 10: 18:00 - 18:50

export const theorySlots: Record<string, Session[]> = {
  // General Theory Slots (2 credits each, meets twice a week)
  'A1': [
    { day: 'TUE', startTime: '09:00', endTime: '09:50' },
    { day: 'SAT', startTime: '12:00', endTime: '12:50' }
  ],
  'A2': [
    { day: 'TUE', startTime: '15:00', endTime: '15:50' },
    { day: 'THU', startTime: '17:00', endTime: '17:50' }
  ],
  'B1': [
    { day: 'TUE', startTime: '10:00', endTime: '10:50' },
    { day: 'WED', startTime: '12:00', endTime: '12:50' }
  ],
  'B2': [
    { day: 'TUE', startTime: '16:00', endTime: '16:50' },
    { day: 'WED', startTime: '17:00', endTime: '17:50' }
  ],
  'C1': [
    { day: 'THU', startTime: '09:00', endTime: '09:50' },
    { day: 'SAT', startTime: '10:00', endTime: '10:50' }
  ],
  'C2': [
    { day: 'THU', startTime: '15:00', endTime: '15:50' },
    { day: 'FRI', startTime: '14:00', endTime: '14:50' }
  ],
  'D1': [
    { day: 'TUE', startTime: '12:00', endTime: '12:50' },
    { day: 'WED', startTime: '09:00', endTime: '09:50' }
  ],
  'D2': [
    { day: 'WED', startTime: '14:00', endTime: '14:50' },
    { day: 'SAT', startTime: '14:00', endTime: '14:50' }
  ],
  'E1': [
    { day: 'WED', startTime: '11:00', endTime: '11:50' },
    { day: 'SAT', startTime: '09:00', endTime: '09:50' }
  ],
  'E2': [
    { day: 'WED', startTime: '16:00', endTime: '16:50' },
    { day: 'SAT', startTime: '15:00', endTime: '15:50' }
  ],
  'F1': [
    { day: 'WED', startTime: '10:00', endTime: '10:50' },
    { day: 'FRI', startTime: '11:00', endTime: '11:50' }
  ],
  'F2': [
    { day: 'TUE', startTime: '14:00', endTime: '14:50' },
    { day: 'FRI', startTime: '17:00', endTime: '17:50' }
  ],
  'G1': [
    { day: 'TUE', startTime: '11:00', endTime: '11:50' },
    { day: 'SAT', startTime: '11:00', endTime: '11:50' }
  ],
  'G2': [
    { day: 'TUE', startTime: '17:00', endTime: '17:50' },
    { day: 'WED', startTime: '15:00', endTime: '15:50' }
  ],

  // Tutorial Slots (1 credit each, meets once a week)
  'TA1': [{ day: 'FRI', startTime: '10:00', endTime: '10:50' }],
  'TA2': [{ day: 'FRI', startTime: '16:00', endTime: '16:50' }],
  'TB1': [{ day: 'FRI', startTime: '09:00', endTime: '09:50' }],
  'TB2': [{ day: 'FRI', startTime: '15:00', endTime: '15:50' }],
  'TC1': [{ day: 'TUE', startTime: '11:00', endTime: '11:50' }],
  'TC2': [{ day: 'TUE', startTime: '17:00', endTime: '17:50' }],
  'TD1': [{ day: 'THU', startTime: '10:00', endTime: '10:50' }],
  'TD2': [{ day: 'THU', startTime: '16:00', endTime: '16:50' }],
  'TE1': [{ day: 'FRI', startTime: '12:00', endTime: '12:50' }],
  'TE2': [{ day: 'THU', startTime: '14:00', endTime: '14:50' }],
  'TF1': [{ day: 'SAT', startTime: '11:00', endTime: '11:50' }],
  'TF2': [{ day: 'WED', startTime: '15:00', endTime: '15:50' }],
  'TG1': [{ day: 'THU', startTime: '10:00', endTime: '10:50' }],
  'TG2': [{ day: 'THU', startTime: '16:00', endTime: '16:50' }],

  // Special & Afternoon Theory Slots (1 credit each, meets once a week)
  'TAA1': [{ day: 'THU', startTime: '11:00', endTime: '11:50' }],
  'TAA2': [{ day: 'SAT', startTime: '16:00', endTime: '16:50' }],
  'TBB1': [{ day: 'THU', startTime: '12:00', endTime: '12:50' }],
  'TBB2': [{ day: 'SAT', startTime: '17:00', endTime: '17:50' }],
  'TCC1': [{ day: 'FRI', startTime: '08:00', endTime: '08:50' }],
  'TCC2': [{ day: 'WED', startTime: '18:00', endTime: '18:50' }],
  'TDD1': [{ day: 'SAT', startTime: '08:00', endTime: '08:50' }],
  'TDD2': [{ day: 'TUE', startTime: '18:00', endTime: '18:50' }],
  'TEE1': [{ day: 'THU', startTime: '08:00', endTime: '08:50' }],
  'TEE2': [{ day: 'FRI', startTime: '18:00', endTime: '18:50' }],
  'TFF1': [{ day: 'TUE', startTime: '08:00', endTime: '08:50' }],
  'TFF2': [{ day: 'THU', startTime: '18:00', endTime: '18:50' }],
  'TGG1': [{ day: 'WED', startTime: '08:00', endTime: '08:50' }],
  'TGG2': [{ day: 'SAT', startTime: '18:00', endTime: '18:50' }],

  // Slash / Alternate Theory Slots (1 credit each)
  'SC1': [{ day: 'WED', startTime: '16:00', endTime: '16:50' }],
  'SC2': [{ day: 'WED', startTime: '11:00', endTime: '11:50' }],
  'SD1': [{ day: 'SAT', startTime: '15:00', endTime: '15:50' }],
  'SD2': [{ day: 'FRI', startTime: '12:00', endTime: '12:50' }],
  'SE1': [{ day: 'THU', startTime: '14:00', endTime: '14:50' }],
  'SE2': [{ day: 'SAT', startTime: '09:00', endTime: '09:50' }],

  // Slash aliases for engineering clinics & clubs
  'ECS': [
    { day: 'THU', startTime: '11:00', endTime: '11:50' },
    { day: 'SAT', startTime: '16:00', endTime: '16:50' }
  ],
  'CLUB': [
    { day: 'THU', startTime: '12:00', endTime: '12:50' },
    { day: 'SAT', startTime: '17:00', endTime: '17:50' }
  ]
};

// Days helper array
export const days: DayOfWeek[] = ['TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Generates time configurations for all 60 lab slots.
// Lab periods:
// Morning:
// Hour 1: 08:00 - 08:50
// Hour 2: 08:50 - 09:40
// Hour 3: 09:50 - 10:40
// Hour 4: 10:40 - 11:30
// Hour 5: 11:40 - 12:30
// Hour 6: 12:30 - 13:10
// Afternoon:
// Hour 7: 14:00 - 14:50
// Hour 8: 14:50 - 15:40
// Hour 9: 15:50 - 16:40
// Hour 10: 16:40 - 17:30
// Hour 11: 17:40 - 18:30
// Hour 12: 18:30 - 19:10
export const getLabSlotSessions = (slotName: string): Session[] => {
  const match = slotName.match(/^L(\d+)$/);
  if (!match) return [];
  const slotNum = parseInt(match[1], 10);
  if (slotNum < 1 || slotNum > 60) return [];

  // Determine day and index
  if (slotNum <= 30) {
    // Morning labs L1 - L30
    const zeroIndex = slotNum - 1;
    const dayIdx = Math.floor(zeroIndex / 6); // 0 to 4 (TUE to SAT)
    const hourIdx = (zeroIndex % 6) + 1; // 1 to 6
    const day = days[dayIdx];

    const timeMap: Record<number, { start: string; end: string }> = {
      1: { start: '08:00', end: '08:50' },
      2: { start: '08:50', end: '09:40' },
      3: { start: '09:50', end: '10:40' },
      4: { start: '10:40', end: '11:30' },
      5: { start: '11:40', end: '12:30' },
      6: { start: '12:30', end: '13:10' }
    };

    const times = timeMap[hourIdx];
    return [{ day, startTime: times.start, endTime: times.end }];
  } else {
    // Afternoon labs L31 - L60
    const zeroIndex = slotNum - 31;
    const dayIdx = Math.floor(zeroIndex / 6); // 0 to 4 (TUE to SAT)
    const hourIdx = (zeroIndex % 6) + 7; // 7 to 12
    const day = days[dayIdx];

    const timeMap: Record<number, { start: string; end: string }> = {
      7: { start: '14:00', end: '14:50' },
      8: { start: '14:50', end: '15:40' },
      9: { start: '15:50', end: '16:40' },
      10: { start: '16:40', end: '17:30' },
      11: { start: '17:40', end: '18:30' },
      12: { start: '18:30', end: '19:10' }
    };

    const times = timeMap[hourIdx];
    return [{ day, startTime: times.start, endTime: times.end }];
  }
};

// Retrieve sessions for any slot (theory or lab)
export const getSlotSessions = (slotName: string): Session[] => {
  if (slotName.startsWith('L') && !isNaN(Number(slotName.slice(1)))) {
    return getLabSlotSessions(slotName);
  }
  
  // Handlers for combined formats like "L1+L2" or "A1+TA1"
  if (slotName.includes('+')) {
    const parts = slotName.split('+');
    return parts.flatMap(part => getSlotSessions(part.trim()));
  }

  // Handle slash formats like "TC1/G1" -> match with the active database entry
  if (slotName.includes('/')) {
    const parts = slotName.split('/');
    // Check if we have sessions for any of the slash parts
    for (const part of parts) {
      if (theorySlots[part.trim()]) {
        return theorySlots[part.trim()];
      }
    }
  }

  return theorySlots[slotName] || [];
};

// Predetermined Valid Credit Slot Combinations from the Annexure-I Slot Timetable
export const PRESET_COMBINATIONS = {
  theory: {
    '4': [
      'A1+TA1+TAA1', 'B1+TB1+TBB1', 'C1+TC1+TCC1', 'C1+SC1+TC1', 'D1+TD1+TDD1', 'D1+TD1+SD1',
      'A2+TA2+TAA2', 'B2+TB2+TBB2', 'C2+TC2+TCC2', 'C2+SC2+TC2', 'D2+TD2+TDD2', 'D2+SD2+TD2',
      'E1+TE1+TEE1', 'E1+SE1+TE1', 'F1+TF1+TFF1', 'F1+TF1+TBB2', 'G1+TG1+TGG1',
      'E2+TE2+TEE2', 'E2+SE2+TE2', 'F2+TF2+TFF2', 'F2+TF2+TBB1', 'G2+TG2+TGG2'
    ],
    '3': [
      'A1+TA1', 'B1+TB1', 'C1+TC1', 'C1+TCC1', 'D1+TD1', 'D1+TDD1',
      'A2+TA2', 'B2+TB2', 'C2+TC2', 'C2+TCC2', 'D2+TD2', 'D2+TDD2',
      'E1+TE1', 'E1+TEE1', 'F1+TF1', 'F1+TFF1', 'G1+TG1', 'G1+TGG1',
      'E2+TE2', 'E2+TEE2', 'F2+TF2', 'F2+TFF2', 'G2+TG2', 'G2+TGG2'
    ],
    '2': [
      'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G1', 'G2'
    ],
    '1': [
      'TA1', 'TB1', 'TC1', 'TD1', 'TE1', 'TF1', 'TA2', 'TB2', 'TC2', 'TD2', 'TF2', 'TG1',
      'TEE1', 'TCC1', 'TDD1', 'TAA1', 'TBB1', 'TG2', 'TAA2', 'TBB2', 'TDD2', 'TCC2', 'TEE2',
      'SC1', 'SC2', 'SD1', 'SD2', 'SE1', 'SE2'
    ]
  },
  lab: {
    // Generate consecutive lab slots for convenience (e.g. L1+L2)
    '2': [
      // Morning
      'L1+L2', 'L3+L4', 'L5+L6',
      'L7+L8', 'L9+L10', 'L11+L12',
      'L13+L14', 'L15+L16', 'L17+L18',
      'L19+L20', 'L21+L22', 'L23+L24',
      'L25+L26', 'L27+L28', 'L29+L30',
      // Afternoon
      'L31+L32', 'L33+L34', 'L35+L36',
      'L37+L38', 'L39+L40', 'L41+L42',
      'L43+L44', 'L45+L46', 'L47+L48',
      'L49+L50', 'L51+L52', 'L53+L54',
      'L55+L56', 'L57+L58', 'L59+L60'
    ],
    // Single credit lab (rare but possible)
    '1': Array.from({ length: 60 }, (_, i) => `L${i + 1}`)
  }
};
