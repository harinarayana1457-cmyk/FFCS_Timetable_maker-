export type DayOfWeek = 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export interface Session {
  day: DayOfWeek;
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
}

export interface Slot {
  name: string; // e.g. "A1", "TA1", "L1", "L31"
  type: 'theory' | 'lab';
  sessions: Session[];
}

export type CourseType = 'theory' | 'lab' | 'embedded';

export interface Course {
  code: string;
  title: string;
  credits: number;
  type: CourseType;
  basket: 'UC' | 'PC' | 'PE' | 'UE';
  theoryCredits?: number;
  labCredits?: number;
}

export interface RegisteredCourse {
  id: string; // Unique identifier for the registration entry
  code: string;
  title: string;
  credits: number;
  type: CourseType;
  basket: 'UC' | 'PC' | 'PE' | 'UE';
  theorySlot?: string; // Selected theory slot combination, e.g. "A1+TA1"
  labSlot?: string;    // Selected lab slots, e.g. "L3+L4"
  color: string;       // Color theme for this course
  instructor?: string; // Optional instructor name
}

export interface ScheduleConflict {
  course1: string;
  course2: string;
  slot1: string;
  slot2: string;
  day: DayOfWeek;
  timeRange: string;
}
