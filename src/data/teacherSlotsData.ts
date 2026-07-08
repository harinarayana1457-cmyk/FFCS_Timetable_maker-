export interface CourseSlotOption {
  theorySlot?: string;
  labSlot?: string;
  instructor: string;
}

export interface TeacherCourseData {
  code: string;
  title: string;
  credits: number;
  type: 'theory' | 'lab' | 'embedded';
  basket: 'UC' | 'PC' | 'PE' | 'UE';
  options: CourseSlotOption[];
}

export const teacherCoursesData: TeacherCourseData[] = [
  {
    code: 'ECE2005',
    title: 'Signals and Systems',
    credits: 4,
    type: 'theory',
    basket: 'PC',
    options: [
      { theorySlot: 'A2+TA2+TAA2', instructor: 'Hanumantharao Bitra' },
      { theorySlot: 'B2+TB2+TBB2', instructor: 'K N V P S Rajesh' }
    ]
  },
  {
    code: 'ECE2014',
    title: 'Microprocessors and Microcontrollers',
    credits: 4,
    type: 'embedded',
    basket: 'PC',
    options: [
      { theorySlot: 'C2+TC2', labSlot: 'L25+L26', instructor: 'Aruru Sai Kumar / Jayendra Kumar' },
      { theorySlot: 'B2+TB2', labSlot: 'L25+L26', instructor: 'Sudha Ellison Mathe / Jayendra Kumar' },
      { theorySlot: 'C1+TCC1', labSlot: 'L25+L26', instructor: 'Aruru Sai Kumar / Jayendra Kumar' }
    ]
  },
  {
    code: 'ECE2001',
    title: 'Analog Devices and Circuits',
    credits: 4,
    type: 'embedded',
    basket: 'PC',
    options: [
      { theorySlot: 'A2+TA2', labSlot: 'L47+L48', instructor: 'John Pradeep D / Neeraj Kumar Misra' },
      { theorySlot: 'A2+TA2', labSlot: 'L27+L28', instructor: 'John Pradeep D / Deepak Ch' },
      { theorySlot: 'A2+TA2', labSlot: 'L55+L56', instructor: 'John Pradeep D / Sambhudutta Nanda' },
      { theorySlot: 'A2+TA2', labSlot: 'L47+L48', instructor: 'Deepak Ch / Neeraj Kumar Misra' },
      { theorySlot: 'A2+TA2', labSlot: 'L27+L28', instructor: 'Deepak Ch / Deepak Ch' },
      { theorySlot: 'A2+TA2', labSlot: 'L55+L56', instructor: 'Deepak Ch / Sambhudutta Nanda' },
      { theorySlot: 'C2+TCC2', labSlot: 'L47+L48', instructor: 'Gurumurthy Komanapalli / Neeraj Kumar Misra' },
      { theorySlot: 'C2+TCC2', labSlot: 'L27+L28', instructor: 'Gurumurthy Komanapalli / Deepak Ch' },
      { theorySlot: 'C2+TCC2', labSlot: 'L55+L56', instructor: 'Gurumurthy Komanapalli / Sambhudutta Nanda' },
      { theorySlot: 'A1+TA1', labSlot: 'L47+L48', instructor: 'John Pradeep D / Neeraj Kumar Misra' },
      { theorySlot: 'A1+TA1', labSlot: 'L27+L28', instructor: 'John Pradeep D / Deepak Ch' },
      { theorySlot: 'A1+TA1', labSlot: 'L55+L56', instructor: 'John Pradeep D / Sambhudutta Nanda' }
    ]
  },
  {
    code: 'CSE2001',
    title: 'Data Structures and Algorithms',
    credits: 4,
    type: 'embedded',
    basket: 'UC',
    options: [
      { theorySlot: 'A1+TA1', labSlot: 'L7+L8', instructor: 'Ravi Sankar Barpanda' },
      { theorySlot: 'B1+TB1', labSlot: 'L9+L10', instructor: 'Deepasikha Mishra' },
      { theorySlot: 'C1+TC1', labSlot: 'L11+L12', instructor: 'Sheela jayachandran' },
      { theorySlot: 'D1+TD1', labSlot: 'L13+L14', instructor: 'Chirra Venkata Ramireddy' },
      { theorySlot: 'E1+TE1', labSlot: 'L15+L16', instructor: 'Dr. Saroja Kumar Rout' },
      { theorySlot: 'F1+TF1', labSlot: 'L17+L18', instructor: 'MEKATHOTI VAMSI KIRAN' },
      { theorySlot: 'G1+TG1', labSlot: 'L19+L20', instructor: 'Priyanka Singh' },
      { theorySlot: 'A2+TA2', labSlot: 'L21+L22', instructor: 'Nagaraju Devarakonda' },
      { theorySlot: 'B2+TB2', labSlot: 'L23+L24', instructor: 'Paidipogu Sowjanya' },
      { theorySlot: 'C2+TC2', labSlot: 'L25+L26', instructor: 'Sanal Kumar T S' },
      { theorySlot: 'D2+TD2', labSlot: 'L33+L34', instructor: 'Khasim Syed' },
      { theorySlot: 'E2+TE2', labSlot: 'L35+L36', instructor: 'Koduru Hajarathaiah' },
      { theorySlot: 'F2+TF2', labSlot: 'L39+L40', instructor: 'Pamulapati Ashok Reddy' },
      { theorySlot: 'G2+TG2', labSlot: 'L41+L42', instructor: 'Prabha Selvaraj' }
    ]
  },
  {
    code: 'STS2015',
    title: 'Qualitative and Quantitative Skills Practice II',
    credits: 1.5,
    type: 'theory',
    basket: 'UC',
    options: [
      { theorySlot: 'A2+TA2', instructor: 'Prabha Selvaraj' },
      { theorySlot: 'B1+TB1', instructor: 'Prof. VISH (Sig-On) Faculty 4' },
      { theorySlot: 'B1+TB1', instructor: 'Prabha Selvaraj' },
      { theorySlot: 'B1+TB1', instructor: 'Prof. VISH (Sig-On) Faculty 5' },
      { theorySlot: 'B2+TB2', instructor: 'MARUTHI' },
      { theorySlot: 'B2+TB2', instructor: 'Prof. VISH (Sig-On) Faculty 3' },
      { theorySlot: 'C1+TC1', instructor: 'Prof. VISH (Sig-On) Faculty 4' },
      { theorySlot: 'C1+TC1', instructor: 'Prof. Sravan Kumar M' },
      { theorySlot: 'A2+TA2', instructor: 'Mamatha' },
      { theorySlot: 'C2+TC2', instructor: 'Prof. VISH (Sig-On) Faculty 2' },
      { theorySlot: 'C2+TC2', instructor: 'RAMESH' },
      { theorySlot: 'D1+TD1', instructor: 'Prof. VISH (Sig-On) Faculty 4' },
      { theorySlot: 'D1+TD1', instructor: 'RAMESH' },
      { theorySlot: 'D1+TD1', instructor: 'Prof. VISH (Sig-On) Faculty 5' },
      { theorySlot: 'G1+TG1', instructor: 'Prof. Sravan Kumar M' }
    ]
  }
];
