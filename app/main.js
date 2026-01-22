import { slotData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const gridBody = document.getElementById('grid-body');
    const selectedSlots = new Set();
    // Storage for custom details: { "A1": { subject: "Maths", teacher: "Mr. X" } }
    const slotDetails = {};
    const dayMap = { "Mon": 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4, "Sat": 5 };

    // Modal Elements
    const editModal = document.getElementById('edit-modal');
    const modalSlotId = document.getElementById('modal-slot-id');
    const inpSlotId = document.getElementById('edit-slot-id');
    const inpSubject = document.getElementById('subject-name');
    const inpTeacher = document.getElementById('teacher-name');
    const btnSave = document.getElementById('save-edit');
    const btnCancel = document.getElementById('cancel-edit');

    const hours = [
        "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
        "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"
    ];

    function initGrid() {
        gridBody.innerHTML = '';

        // Grid Header
        const headerRow = document.createElement('div');
        headerRow.className = 'grid-header-row';
        // Empty corner cell
        headerRow.appendChild(document.createElement('div'));

        hours.forEach(h => {
            const cell = document.createElement('div');
            cell.className = 'grid-header-cell';
            cell.textContent = h;
            headerRow.appendChild(cell);
        });
        // We need to insert this header row somewhere if we are changing the layout structure
        // But the current HTML has a separate .grid-header. 
        // Actually, let's keep the current row-based structure but update the rendering logic to match the image's matrix.
        // The image has Time on X-axis, Days on Y-axis?
        // Wait, the image has "Day/Time" 8 AM ... 7 PM across the top.
        // And "Mon", "Tue"... down the left.
        // My current HTML has `div class="grid-header"` with Day Columns... wait.
        // My current HTML implementation (lines 276-284) has TIME | Mon | Tue ...
        // The current implementation is Transposed compared to the image!
        // Current: Rows are Time slots? Or Rows are Days?
        // Let's check `initGrid` in the original main.js.
        // Original: `hours.forEach... row... timeCol... for (d=0; d<6)`
        // This means Rows were Times (8:00), and Columns were Days.
        // THE IMAGE SHOWS: Rows are Days (Mon, Tue...), Columns are Times (8 AM... 7 PM).
        // I NEED TO INVERT THE GRID RENDERING.
    }

    // RE-WRITING INITGRID TO MATCH IMAGE (Rows = Days)
    function initGrid() {
        gridBody.innerHTML = '';
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // We need 12 columns for time + 1 for Day label
        gridBody.style.display = 'grid';
        gridBody.style.gridTemplateColumns = '80px repeat(12, 1fr)';

        // Render Header (Time Labels)
        const corner = document.createElement('div');
        corner.className = 'grid-header-cell';
        corner.textContent = "Day/Time";
        gridBody.appendChild(corner);

        hours.forEach(h => {
            const cell = document.createElement('div');
            cell.className = 'grid-header-cell';
            cell.textContent = h;
            gridBody.appendChild(cell);
        });

        // Render Rows (Days)
        days.forEach((day, dayIndex) => {
            // Day Label
            const dayLabel = document.createElement('div');
            dayLabel.className = 'day-label';
            dayLabel.textContent = day;
            gridBody.appendChild(dayLabel);

            // Time Slots
            for (let t = 0; t < 12; t++) {
                const cell = document.createElement('div');
                cell.className = 'grid-slot';
                cell.dataset.dayIndex = dayIndex;
                cell.dataset.timeIndex = t;
                gridBody.appendChild(cell);
            }
        });
    }

    function updateGrid() {
        document.querySelectorAll('.grid-slot').forEach(cell => {
            cell.innerHTML = '';
        });

        selectedSlots.forEach(slotId => {
            const data = slotData[slotId];
            if (data) {
                data.sessions.forEach(session => {
                    const dayIndex = dayMap[session.day];
                    const timeIndex = session.timeIndex;

                    if (dayIndex !== undefined) {
                        const cell = document.querySelector(`.grid-slot[data-day-index="${dayIndex}"][data-time-index="${timeIndex}"]`);
                        if (cell) {
                            const block = document.createElement('div');
                            block.className = 'slot-block';
                            block.dataset.slotId = slotId;

                            // Colors based on image logic (Purple/Blue)
                            // Image: "TFF1" is purple. "L65" is purple. "E2" is purple.
                            // They all look similar (Purple with white text).
                            // Maybe some minor variation.
                            block.classList.add('purple');

                            const details = slotDetails[slotId] || {};
                            // Use sidebar input if available and this is the most recently added slot? 
                            // Or just use pre-defined.

                            const subject = details.subject || slotId;
                            const subText = details.description ? `<div style="font-size:0.7em; opacity:0.8">${details.description}</div>` : '';

                            block.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; line-height:1.2;">
                                <span style="font-weight:bold;">${subject}</span>
                                ${subText}
                            </div>`;

                            cell.appendChild(block);
                        }
                    }
                });
            }
        });
    }

    // Sidebar Course Title Input Logic
    const inpSidebarTitle = document.getElementById('sidebar-course-title');

    // When adding a slot via sidebar button, we can auto-set the subject name if the user typed one
    document.querySelectorAll('.mini-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slotId = btn.dataset.slot;

            // If selecting (not deselecting)
            if (!selectedSlots.has(slotId)) {
                // If user typed a custom title, save it
                if (inpSidebarTitle && inpSidebarTitle.value.trim()) {
                    if (!slotDetails[slotId]) slotDetails[slotId] = {};
                    slotDetails[slotId].subject = inpSidebarTitle.value.trim();
                }
            }

            // Existing Logic
            if (selectedSlots.has(slotId)) {
                selectedSlots.delete(slotId);
                btn.classList.remove('selected');
                updateGrid();
            } else {
                const conflicts = checkCollision(slotId);
                if (conflicts.length > 0) {
                    if (confirm(`Collision with: ${conflicts.join(', ')}. Replace?`)) {
                        conflicts.forEach(c => {
                            selectedSlots.delete(c);
                            updateButtonState(c, false);
                        });
                        selectedSlots.add(slotId);
                        btn.classList.add('selected');
                        updateGrid();
                    }
                } else {
                    selectedSlots.add(slotId);
                    btn.classList.add('selected');
                    updateGrid();
                }
            }
        });
    });

    // Initial Population of Slot Details from a static map (to match image)
    const initialDetails = {
        "L65": { subject: "L65", description: "indian studies" },
        "L66": { subject: "L66", description: "indian studies" },
        "TA2": { subject: "TA2", description: "principal electronic" },
        "E2": { subject: "E2", description: "Maths" },
        "TFF1": { subject: "TFF1", description: "java" },
        "SE2": { subject: "SE2", description: "Maths" },
        "L3": { subject: "L3", description: "principal electronic" },
        "L4": { subject: "L4", description: "principal electronic" },
        "D1": { subject: "D1", description: "english" },
        "F1": { subject: "F1", description: "java" },
        "SC2": { subject: "SC2", description: "semicond" },
        "D2": { subject: "D2", description: "dld" },
        "A2": { subject: "A2", description: "principal electronic" },
        "TC2": { subject: "TC2", description: "semicond" },
        "TDD2": { subject: "TDD2", description: "" }, // Default
        "L19": { subject: "L19", description: "java" },
        "L20": { subject: "L20", description: "java" },
        "L23": { subject: "L23", description: "English" },
        "L24": { subject: "L24", description: "English" },
        "L53": { subject: "L53", description: "dld" },
        "L54": { subject: "L54", description: "dld" },
        "C2": { subject: "C2", description: "semicond" },
        "TE2": { subject: "TE2", description: "Maths" },
    };
    Object.assign(slotDetails, initialDetails);

    initGrid();


    // Modal Logic
    function openEditModal(slotId) {
        if (!editModal) return;
        const details = slotDetails[slotId] || {};

        modalSlotId.textContent = slotId;
        inpSlotId.value = slotId;
        inpSubject.value = details.subject || '';
        inpTeacher.value = details.teacher || '';

        editModal.classList.remove('hidden');
    }

    function closeEditModal() {
        editModal.classList.add('hidden');
    }

    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const slotId = inpSlotId.value;
            if (slotId) {
                slotDetails[slotId] = {
                    subject: inpSubject.value.trim(),
                    teacher: inpTeacher.value.trim()
                };
                updateGrid();
                closeEditModal();
            }
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', closeEditModal);
    }

    // Grid Click Delegation
    gridBody.addEventListener('click', (e) => {
        // Check if clicked ON a slot block
        const block = e.target.closest('.slot-block');
        if (block) {
            e.stopPropagation(); // Prevent propagation if needed
            const slotId = block.dataset.slotId;
            openEditModal(slotId);
        }
    });

    // Sidebar Slot Selection Logic (Collision Check)
    function checkCollision(newSlotId) {
        const newSessions = slotData[newSlotId]?.sessions || [];
        const conflicts = [];
        selectedSlots.forEach(existingId => {
            if (existingId === newSlotId) return;
            const existingSessions = slotData[existingId]?.sessions || [];
            let isOverlap = false;
            for (const newSess of newSessions) {
                for (const exSess of existingSessions) {
                    if (newSess.day === exSess.day && newSess.timeIndex === exSess.timeIndex) {
                        isOverlap = true; break;
                    }
                }
                if (isOverlap) break;
            }
            if (isOverlap) conflicts.push(existingId);
        });
        return conflicts;
    }

    function updateButtonState(slotId, isSelected) {
        const btn = document.querySelector(`.mini-btn[data-slot="${slotId}"]`);
        if (btn) {
            isSelected ? btn.classList.add('selected') : btn.classList.remove('selected');
        }
    }

    document.querySelectorAll('.mini-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slotId = btn.dataset.slot;
            if (selectedSlots.has(slotId)) {
                selectedSlots.delete(slotId);
                btn.classList.remove('selected');
                updateGrid();
            } else {
                const conflicts = checkCollision(slotId);
                if (conflicts.length > 0) {
                    if (confirm(`Collision with: ${conflicts.join(', ')}. Replace?`)) {
                        conflicts.forEach(c => {
                            selectedSlots.delete(c);
                            updateButtonState(c, false);
                        });
                        selectedSlots.add(slotId);
                        btn.classList.add('selected');
                        updateGrid();
                    }
                } else {
                    selectedSlots.add(slotId);
                    btn.classList.add('selected');
                    updateGrid();
                }
            }
        });
    });

    // Toggle Logic
    const btnTheory = document.getElementById('btn-theory');
    const btnLab = document.getElementById('btn-lab');
    const theoryView = document.getElementById('theory-view');
    const labView = document.getElementById('lab-view');

    if (btnTheory && btnLab && theoryView && labView) {
        btnTheory.addEventListener('click', () => {
            btnTheory.classList.add('active');
            btnLab.classList.remove('active');
            theoryView.classList.remove('hidden');
            labView.classList.add('hidden');
        });
        btnLab.addEventListener('click', () => {
            btnLab.classList.add('active');
            btnTheory.classList.remove('active');
            labView.classList.remove('hidden');
            theoryView.classList.add('hidden');
        });
    }

    initGrid();
});
