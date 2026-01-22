// Comprehensive Data Mapping for Freshers Winter 2025-26
// Extracting every single slot mentioned in the image.

// Helper to generate sequences
// Mon Theory: TA1(9), TB1(10), E1(11), E1(12). (8am empty).
// Mon Lab: L61(8), L62(9), L63(10), L64(11), L65(12), L66(12:30-1:10? Let's map to 1pm or ignore? Actually image has 12:00-12:50 column. Then 12:30-1:10 col? No.
// Top row: 8-8.50, 9-9.50, 10-10.50, 11-11.50, 12-12.50.
// Lab row below it: 8-8.50, 8.50-9.40, 9.50-10.40...
// It aligns roughly with the hours.
// L1=8am, L2=9am, L3=10am, L4=11am, L5=12pm, L6=1pm?
// Let's stick to the grid columns:
// C0 (8am), C1 (9am), C2 (10am), C3 (11am), C4 (12pm).
// Lunch gap.
// C5 (2pm), C6 (3pm), C7 (4pm), C8 (5pm), C9 (6pm).

// MAPPINGS:

const mappings = [
    // --- MONDAY ---
    // Theory
    { slot: "TA1", day: "Mon", time: 1 },
    { slot: "TB1", day: "Mon", time: 2 },
    { slot: "E1", day: "Mon", time: 3 },
    { slot: "E1", day: "Mon", time: 4 }, // Occupies two slots?
    { slot: "TA2", day: "Mon", time: 5 },
    { slot: "TB2", day: "Mon", time: 6 },
    { slot: "E2", day: "Mon", time: 7 },
    { slot: "E2", day: "Mon", time: 8 },

    // Lab (Mon) -> L61-L66 (Morning), L67-L72 (Evening)
    { slot: "L61", day: "Mon", time: 0 },
    { slot: "L62", day: "Mon", time: 1 },
    { slot: "L63", day: "Mon", time: 2 },
    { slot: "L64", day: "Mon", time: 3 },
    { slot: "L65", day: "Mon", time: 4 },
    { slot: "L66", day: "Mon", time: 4 }, // Conflict overlap or 1pm? Let's hide L66 or put in 12pm too.

    { slot: "L67", day: "Mon", time: 5 },
    { slot: "L68", day: "Mon", time: 6 },
    { slot: "L69", day: "Mon", time: 7 },
    { slot: "L70", day: "Mon", time: 8 },
    { slot: "L71", day: "Mon", time: 9 },
    { slot: "L72", day: "Mon", time: 9 },

    // --- TUESDAY ---
    // Theory
    { slot: "TFF1", day: "Tue", time: 0 },
    { slot: "A1", day: "Tue", time: 1 }, { slot: "SE2", day: "Tue", time: 1 },
    { slot: "B1", day: "Tue", time: 2 }, { slot: "SD2", day: "Tue", time: 2 },
    { slot: "C1", day: "Tue", time: 3 },
    { slot: "D1", day: "Tue", time: 4 },
    // Eve
    { slot: "F2", day: "Tue", time: 5 },
    { slot: "A2", day: "Tue", time: 6 }, { slot: "SF1", day: "Tue", time: 6 },
    { slot: "B2", day: "Tue", time: 7 }, { slot: "SC1", day: "Tue", time: 7 },
    { slot: "C2", day: "Tue", time: 8 },
    { slot: "TDD2", day: "Tue", time: 9 },

    // Lab (Tue) -> L1-L6, L31-L36
    { slot: "L1", day: "Tue", time: 0 }, { slot: "L2", day: "Tue", time: 1 }, { slot: "L3", day: "Tue", time: 2 },
    { slot: "L4", day: "Tue", time: 3 }, { slot: "L5", day: "Tue", time: 4 }, { slot: "L6", day: "Tue", time: 4 },

    { slot: "L31", day: "Tue", time: 5 }, { slot: "L32", day: "Tue", time: 6 }, { slot: "L33", day: "Tue", time: 7 },
    { slot: "L34", day: "Tue", time: 8 }, { slot: "L35", day: "Tue", time: 9 }, { slot: "L36", day: "Tue", time: 9 },

    // --- WEDNESDAY ---
    // Theory
    { slot: "TEE1", day: "Wed", time: 0 },
    { slot: "D1", day: "Wed", time: 1 },
    { slot: "F1", day: "Wed", time: 2 },
    { slot: "G1", day: "Wed", time: 3 }, { slot: "TE1", day: "Wed", time: 3 },
    { slot: "B1", day: "Wed", time: 4 }, { slot: "SC2", day: "Wed", time: 4 },
    // Eve
    { slot: "D2", day: "Wed", time: 5 },
    { slot: "F2", day: "Wed", time: 6 },
    { slot: "B2", day: "Wed", time: 7 }, { slot: "SD1", day: "Wed", time: 7 },
    { slot: "G2", day: "Wed", time: 8 }, { slot: "TE2", day: "Wed", time: 8 },
    { slot: "TG2", day: "Wed", time: 9 },

    // Lab (Wed) -> L7-L12, L37-L42
    { slot: "L7", day: "Wed", time: 0 }, { slot: "L8", day: "Wed", time: 1 }, { slot: "L9", day: "Wed", time: 2 },
    { slot: "L10", day: "Wed", time: 3 }, { slot: "L11", day: "Wed", time: 4 }, { slot: "L12", day: "Wed", time: 4 },

    { slot: "L37", day: "Wed", time: 5 }, { slot: "L38", day: "Wed", time: 6 }, { slot: "L39", day: "Wed", time: 7 },
    { slot: "L40", day: "Wed", time: 8 }, { slot: "L41", day: "Wed", time: 9 }, { slot: "L42", day: "Wed", time: 9 },

    // --- THURSDAY ---
    // Theory
    { slot: "TG1", day: "Thu", time: 0 },
    { slot: "C1", day: "Thu", time: 1 },
    { slot: "D1", day: "Thu", time: 2 },
    { slot: "A1", day: "Thu", time: 3 }, { slot: "SB2", day: "Thu", time: 3 },
    { slot: "F1", day: "Thu", time: 4 },
    // Eve
    { slot: "E2", day: "Thu", time: 5 },
    { slot: "C2", day: "Thu", time: 6 },
    { slot: "A2", day: "Thu", time: 7 }, { slot: "SB1", day: "Thu", time: 7 },
    { slot: "D2", day: "Thu", time: 8 },
    { slot: "TFF2", day: "Thu", time: 9 },

    // Lab (Thu) -> L13-L18, L43-L48
    { slot: "L13", day: "Thu", time: 0 }, { slot: "L14", day: "Thu", time: 1 }, { slot: "L15", day: "Thu", time: 2 },
    { slot: "L16", day: "Thu", time: 3 }, { slot: "L17", day: "Thu", time: 4 }, { slot: "L18", day: "Thu", time: 4 },

    { slot: "L43", day: "Thu", time: 5 }, { slot: "L44", day: "Thu", time: 6 }, { slot: "L45", day: "Thu", time: 7 },
    { slot: "L46", day: "Thu", time: 8 }, { slot: "L47", day: "Thu", time: 9 }, { slot: "L48", day: "Thu", time: 9 },

    // --- FRIDAY ---
    // Theory
    { slot: "TDD1", day: "Fri", time: 0 },
    { slot: "B1", day: "Fri", time: 1 }, { slot: "SA2", day: "Fri", time: 1 },
    { slot: "A1", day: "Fri", time: 2 }, { slot: "SF2", day: "Fri", time: 2 },
    { slot: "G1", day: "Fri", time: 3 }, { slot: "TF1", day: "Fri", time: 3 },
    { slot: "E1", day: "Fri", time: 4 },
    // Eve
    { slot: "TC2", day: "Fri", time: 5 },
    { slot: "B2", day: "Fri", time: 6 }, { slot: "SA1", day: "Fri", time: 6 },
    { slot: "A2", day: "Fri", time: 7 }, { slot: "SE1", day: "Fri", time: 7 },
    { slot: "G2", day: "Fri", time: 8 }, { slot: "TF2", day: "Fri", time: 8 },
    { slot: "TEE2", day: "Fri", time: 9 },

    // Lab (Fri) -> L19-L24, L49-L54
    { slot: "L19", day: "Fri", time: 0 }, { slot: "L20", day: "Fri", time: 1 }, { slot: "L21", day: "Fri", time: 2 },
    { slot: "L22", day: "Fri", time: 3 }, { slot: "L23", day: "Fri", time: 4 }, { slot: "L24", day: "Fri", time: 4 },

    { slot: "L49", day: "Fri", time: 5 }, { slot: "L50", day: "Fri", time: 6 }, { slot: "L51", day: "Fri", time: 7 },
    { slot: "L52", day: "Fri", time: 8 }, { slot: "L53", day: "Fri", time: 9 }, { slot: "L54", day: "Fri", time: 9 },

    // --- SATURDAY ---
    // Theory
    // 8am empty
    { slot: "TC1", day: "Sat", time: 1 },
    { slot: "C1", day: "Sat", time: 2 },
    { slot: "F1", day: "Sat", time: 3 },
    { slot: "G1", day: "Sat", time: 4 }, { slot: "TD1", day: "Sat", time: 4 },
    // Eve
    { slot: "G2", day: "Sat", time: 5 }, { slot: "TD2", day: "Sat", time: 5 },
    { slot: "D2", day: "Sat", time: 6 },
    { slot: "F2", day: "Sat", time: 7 },
    { slot: "C2", day: "Sat", time: 8 },

    // Lab (Sat) -> L25-L30, L55-L60
    { slot: "L25", day: "Sat", time: 0 }, { slot: "L26", day: "Sat", time: 1 }, { slot: "L27", day: "Sat", time: 2 },
    { slot: "L28", day: "Sat", time: 3 }, { slot: "L29", day: "Sat", time: 4 }, { slot: "L30", day: "Sat", time: 4 },

    { slot: "L55", day: "Sat", time: 5 }, { slot: "L56", day: "Sat", time: 6 }, { slot: "L57", day: "Sat", time: 7 },
    { slot: "L58", day: "Sat", time: 8 }, { slot: "L59", day: "Sat", time: 9 }, { slot: "L60", day: "Sat", time: 9 },
];
