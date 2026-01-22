export const slotData = {};

const rawData = [
    // --- MONDAY ---
    { slot: "L65", day: "Mon", time: 4 }, // 12 PM
    { slot: "L66", day: "Mon", time: 5 }, // 1 PM
    { slot: "TA2", day: "Mon", time: 6 }, // 2 PM
    // 3 PM Empty
    { slot: "E2", day: "Mon", time: 8 }, // 4 PM
    { slot: "E2", day: "Mon", time: 9 }, // 5 PM (Second one)

    // --- TUESDAY ---
    { slot: "TFF1", day: "Tue", time: 1 }, // 9 AM
    { slot: "SE2", day: "Tue", time: 2 }, // 10 AM
    { slot: "L3", day: "Tue", time: 3 }, // 11 AM
    { slot: "L4", day: "Tue", time: 4 }, // 12 PM
    { slot: "D1", day: "Tue", time: 5 }, // 1 PM
    // 2 PM Empty
    { slot: "A2", day: "Tue", time: 7 }, // 3 PM
    // 4 PM Empty
    { slot: "C2", day: "Tue", time: 9 }, // 5 PM

    // --- WEDNESDAY ---
    // 8, 9, 10, 11
    { slot: "D1", day: "Wed", time: 2 }, // 10 AM (Assumed same as English on Tue/Thu sometimes, but image shows English Tue 1PM, Thu 11AM?)
    // Wait, Image analysis for Wed:
    // 9 AM: Empty
    // 10 AM: Empty in image? Wait.
    // Let's re-read the image carefully.
    // Wed Row:
    // 8 AM: Empty
    // 9 AM: D1 English
    // 10 AM: F1 Java
    // 11 AM: Empty
    // 12 PM: SC2 semicond
    // 1 PM: Empty
    // 2 PM: D2 dld
    // 3 PM: Empty
    // 4 PM: Empty
    // 5 PM: TE2 Maths
    // Correction based on visual alignment:
    { slot: "D1", day: "Wed", time: 1 }, // 9 AM
    { slot: "F1", day: "Wed", time: 2 }, // 10 AM
    { slot: "SC2", day: "Wed", time: 4 }, // 12 PM
    { slot: "D2", day: "Wed", time: 6 }, // 2 PM
    { slot: "TE2", day: "Wed", time: 9 }, // 5 PM

    // --- THURSDAY ---
    // Thu Row:
    // 8 AM: Empty
    // 9 AM: D1 English (Wait, looks like it's at 9 AM visually? No, Tue English is at 1 PM. Wed English at 9 AM. Thu English...)
    // Let's look at Thu in image:
    // Slot "D1 english" is at 11 AM column? No, 9 AM.
    // Wait, let's look at the "Freshers" text alignment.
    // 9 AM Column: TFF1 (Tue), D1 (Wed), D1 (Thu).
    // So Thu D1 is at 9 AM.
    // 10 AM Column: SE2 (Tue), F1 (Wed). Thu is Empty.
    // 11 AM Column: L3 (Tue). Thu F1 java.
    // 12 PM Column: L4 (Tue), SC2 (Wed). Thu Empty.
    // 1 PM Column: L65(Mon), D1(Tue). Thu Empty.
    // 2 PM Column: L66(Mon), D2(Wed). Thu E2 Maths.
    // 3 PM Column: TA2(Mon), A2(Tue). Thu C2 semicond.
    // 4 PM Column: E2(Mon). Thu A2 principal electronic.
    // 5 PM Column: E2(Mon), C2(Tue), TE2(Wed), D2 dld (Thu).

    // Thu Re-mapping:
    { slot: "D1", day: "Thu", time: 1 }, // 9 AM
    { slot: "F1", day: "Thu", time: 3 }, // 11 AM
    { slot: "E2", day: "Thu", time: 6 }, // 2 PM
    { slot: "C2", day: "Thu", time: 7 }, // 3 PM
    { slot: "A2", day: "Thu", time: 8 }, // 4 PM
    { slot: "D2", day: "Thu", time: 9 }, // 5 PM

    // --- FRIDAY ---
    // Fri Row:
    // 8 AM: L19 java
    // 9 AM: L20 java
    // 10, 11 Empty
    // 12 PM: L23 English
    // 1 PM: L24 English
    // 2 PM: TC2 semicond
    // 3 PM: Empty
    // 4 PM: A2 principal electronic (Wait, Image shows A2 at 4 PM on Fri? Yes, under A2 Thu column).
    // 5 PM: Empty
    // 6 PM: L53 dld
    // 7 PM: L54 dld

    { slot: "L19", day: "Fri", time: 0 }, // 8 AM
    { slot: "L20", day: "Fri", time: 1 }, // 9 AM
    { slot: "L23", day: "Fri", time: 4 }, // 12 PM
    { slot: "L24", day: "Fri", time: 5 }, // 1 PM
    { slot: "TC2", day: "Fri", time: 6 }, // 2 PM
    { slot: "A2", day: "Fri", time: 8 }, // 4 PM
    { slot: "L53", day: "Fri", time: 10 }, // 6 PM
    { slot: "L54", day: "Fri", time: 11 }, // 7 PM

    // --- SATURDAY ---
    // Sat Row:
    // 8 AM: Empty
    // 9 AM: F1 java
    // 10, 11 Empty
    // 2 PM: TD2 dld
    // 3 PM: D2 dld
    // 4 Empty
    // 5 PM: C2 semicond

    { slot: "F1", day: "Sat", time: 1 }, // 9 AM
    { slot: "TD2", day: "Sat", time: 6 }, // 2 PM
    { slot: "D2", day: "Sat", time: 7 }, // 3 PM (Shifted? In Image, TD2 is 2 PM, D2 is 3 PM)
    { slot: "C2", day: "Sat", time: 9 }, // 5 PM
];

rawData.forEach(item => {
    if (!slotData[item.slot]) {
        slotData[item.slot] = { sessions: [] };
    }
    slotData[item.slot].sessions.push({ day: item.day, timeIndex: item.time });
});
