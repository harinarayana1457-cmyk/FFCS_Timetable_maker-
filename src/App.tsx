import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Download, 
  AlertTriangle, 
  Check, 
  RefreshCw, 
  Search, 
  Sparkles, 
  Grid, 
  Layers, 
  Clock,
  User,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { presetCourses, courseColors } from './data/presetCourses';
import { 
  getSlotSessions, 
  days, 
  PRESET_COMBINATIONS 
} from './data/slotsData';
import { teacherCoursesData } from './data/teacherSlotsData';
import type { Course, RegisteredCourse, Session } from './types';
import './App.css';

// Time-to-minutes helper for collision detection
const timeToMinutes = (timeStr: string): number => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// Check if two sessions overlap in time
const checkOverlap = (s1: Session, s2: Session): boolean => {
  if (s1.day !== s2.day) return false;
  const start1 = timeToMinutes(s1.startTime);
  const end1 = timeToMinutes(s1.endTime);
  const start2 = timeToMinutes(s2.startTime);
  const end2 = timeToMinutes(s2.endTime);
  return start1 < end2 && start2 < end1;
};

// Check if two slot combinations overlap
const getSlotsOverlap = (slotA: string, slotB: string): boolean => {
  const sessionsA = getSlotSessions(slotA);
  const sessionsB = getSlotSessions(slotB);
  for (const sA of sessionsA) {
    for (const sB of sessionsB) {
      if (checkOverlap(sA, sB)) return true;
    }
  }
  return false;
};

const CURATED_TIMETABLE: RegisteredCourse[] = [
  {
    id: 'ece2005-curated',
    code: 'ECE2005',
    title: 'Signals and Systems',
    credits: 4,
    type: 'theory',
    basket: 'PC',
    theorySlot: 'B2+TB2+TBB2',
    instructor: 'K N V P S Rajesh',
    color: '#3b82f6'
  },
  {
    id: 'ece2014-curated',
    code: 'ECE2014',
    title: 'Microprocessors and Microcontrollers',
    credits: 4,
    type: 'embedded',
    basket: 'PC',
    theorySlot: 'C2+TC2',
    labSlot: 'L25+L26',
    instructor: 'Aruru Sai Kumar / Jayendra Kumar',
    color: '#10b981'
  },
  {
    id: 'ece2001-curated',
    code: 'ECE2001',
    title: 'Analog Devices and Circuits',
    credits: 4,
    type: 'embedded',
    basket: 'PC',
    theorySlot: 'A2+TA2',
    labSlot: 'L27+L28',
    instructor: 'John Pradeep D / Deepak Ch',
    color: '#8b5cf6'
  },
  {
    id: 'cse2001-curated',
    code: 'CSE2001',
    title: 'Data Structures and Algorithms',
    credits: 4,
    type: 'embedded',
    basket: 'UC',
    theorySlot: 'A1+TA1',
    labSlot: 'L7+L8',
    instructor: 'Ravi Sankar Barpanda',
    color: '#f59e0b'
  },
  {
    id: 'sts2015-curated',
    code: 'STS2015',
    title: 'Qualitative and Quantitative Skills Practice II',
    credits: 1.5,
    type: 'theory',
    basket: 'UC',
    theorySlot: 'B1+TB1',
    instructor: 'Prabha Selvaraj',
    color: '#ec4899'
  }
];

const findValidCombinations = (): RegisteredCourse[][] => {
  const results: RegisteredCourse[][] = [];
  
  const search = (courseIndex: number, currentAssignments: RegisteredCourse[]) => {
    if (courseIndex === teacherCoursesData.length) {
      results.push([...currentAssignments]);
      return;
    }
    
    const course = teacherCoursesData[courseIndex];
    for (const option of course.options) {
      let hasClash = false;
      
      const optionSessions = [
        ...(option.theorySlot ? getSlotSessions(option.theorySlot) : []),
        ...(option.labSlot ? getSlotSessions(option.labSlot) : [])
      ];
      
      for (const assigned of currentAssignments) {
        const assignedSessions = [
          ...(assigned.theorySlot ? getSlotSessions(assigned.theorySlot) : []),
          ...(assigned.labSlot ? getSlotSessions(assigned.labSlot) : [])
        ];
        
        for (const oSess of optionSessions) {
          for (const aSess of assignedSessions) {
            if (checkOverlap(oSess, aSess)) {
              hasClash = true;
              break;
            }
          }
          if (hasClash) break;
        }
        if (hasClash) break;
      }
      
      if (!hasClash) {
        const color = courseColors[courseIndex % courseColors.length];
        const newEntry: RegisteredCourse = {
          id: `${course.code}-auto-${Math.random().toString(36).substr(2, 5)}`,
          code: course.code,
          title: course.title,
          credits: course.credits,
          type: course.type,
          basket: course.basket,
          theorySlot: option.theorySlot,
          labSlot: option.labSlot,
          instructor: option.instructor,
          color
        };
        
        currentAssignments.push(newEntry);
        search(courseIndex + 1, currentAssignments);
        currentAssignments.pop();
      }
    }
  };
  
  search(0, []);
  return results;
};

export default function App() {
  // Application State
  const [customCourses, setCustomCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ffcs_custom_courses');
    return saved ? JSON.parse(saved) : [];
  });

  const allCourses = [...presetCourses, ...customCourses];

  const [registered, setRegistered] = useState<RegisteredCourse[]>(() => {
    const saved = localStorage.getItem('ffcs_registered');
    return saved ? JSON.parse(saved) : CURATED_TIMETABLE;
  });

  // Find all valid combinations from the database
  const validCombos = useMemo(() => {
    return findValidCombinations();
  }, []);

  const [comboIndex, setComboIndex] = useState<number>(() => {
    const savedIdx = localStorage.getItem('ffcs_combo_index');
    return savedIdx ? parseInt(savedIdx, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('ffcs_combo_index', comboIndex.toString());
  }, [comboIndex]);

  const handleNextCombo = () => {
    if (validCombos.length === 0) return;
    const nextIdx = (comboIndex + 1) % validCombos.length;
    setComboIndex(nextIdx);
    setRegistered(validCombos[nextIdx]);
  };

  const handlePrevCombo = () => {
    if (validCombos.length === 0) return;
    const prevIdx = (comboIndex - 1 + validCombos.length) % validCombos.length;
    setComboIndex(prevIdx);
    setRegistered(validCombos[prevIdx]);
  };

  const handleShuffleCombo = () => {
    if (validCombos.length === 0) return;
    const randomIdx = Math.floor(Math.random() * validCombos.length);
    setComboIndex(randomIdx);
    setRegistered(validCombos[randomIdx]);
  };

  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [searchTerm, setSearchTerm] = useState('');
  const [basketFilter, setBasketFilter] = useState<string>('All');
  
  // Custom Course Form State
  const [customCode, setCustomCode] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customBasket, setCustomBasket] = useState<'UC' | 'PC' | 'PE' | 'UE'>('PC');
  const [customType, setCustomType] = useState<'theory' | 'lab' | 'embedded'>('embedded');
  const [customCredits, setCustomCredits] = useState(4);
  const [customTheoryCredits, setCustomTheoryCredits] = useState(3);
  const [customLabCredits, setCustomLabCredits] = useState(2);
  const [customInstructor, setCustomInstructor] = useState('');

  // Scheduling Modal State
  const [schedulingCourse, setSchedulingCourse] = useState<Course | null>(null);
  const [selectedTheorySlot, setSelectedTheorySlot] = useState<string>('');
  const [selectedLabSlot, setSelectedLabSlot] = useState<string>('');
  const [modalInstructor, setModalInstructor] = useState<string>('');

  // Auto-save to LocalStorage
  useEffect(() => {
    localStorage.setItem('ffcs_custom_courses', JSON.stringify(customCourses));
  }, [customCourses]);

  useEffect(() => {
    localStorage.setItem('ffcs_registered', JSON.stringify(registered));
  }, [registered]);

  // Adjust theory/lab credit inputs based on custom course types
  useEffect(() => {
    if (customType === 'theory') {
      setCustomTheoryCredits(customCredits);
      setCustomLabCredits(0);
    } else if (customType === 'lab') {
      setCustomTheoryCredits(0);
      setCustomLabCredits(customCredits);
    } else {
      // Embedded
      if (customCredits === 4) {
        setCustomTheoryCredits(3);
        setCustomLabCredits(2);
      } else if (customCredits === 3) {
        setCustomTheoryCredits(2);
        setCustomLabCredits(2); // Wait, usually 2 theory, 2 lab hours (1 credit lab) = 3 credits
      } else {
        setCustomTheoryCredits(Math.max(1, customCredits - 1));
        setCustomLabCredits(2);
      }
    }
  }, [customType, customCredits]);

  // Helper: Find which registered courses clash with a given slot
  const getClashingCourses = (slotName: string, ignoreCourseCode?: string): string[] => {
    if (!slotName) return [];
    const clashes: string[] = [];
    const prospectiveSessions = getSlotSessions(slotName);

    for (const reg of registered) {
      if (reg.code === ignoreCourseCode) continue;

      const regSessions = [
        ...(reg.theorySlot ? getSlotSessions(reg.theorySlot) : []),
        ...(reg.labSlot ? getSlotSessions(reg.labSlot) : [])
      ];

      for (const pSess of prospectiveSessions) {
        for (const rSess of regSessions) {
          if (checkOverlap(pSess, rSess)) {
            const label = `${reg.code} (${reg.theorySlot || ''}${reg.theorySlot && reg.labSlot ? ' & ' : ''}${reg.labSlot || ''})`;
            if (!clashes.includes(label)) {
              clashes.push(label);
            }
          }
        }
      }
    }
    return clashes;
  };

  // Check if a specific slot cell (by name) is occupied in the calendar
  const getCellOccupancy = (slotName: string): { regCourse: RegisteredCourse; type: 'theory' | 'lab'; mainSlot: string }[] => {
    const results: { regCourse: RegisteredCourse; type: 'theory' | 'lab'; mainSlot: string }[] = [];
    
    // Split the cell slot name, e.g. "TC1/G1" -> ["TC1", "G1"]
    const cellSlots = slotName.split('/').map(s => s.trim());

    for (const reg of registered) {
      // Check theory slot match
      if (reg.theorySlot) {
        const theoryParts = reg.theorySlot.split('+').map(s => s.trim());
        for (const cellS of cellSlots) {
          if (theoryParts.includes(cellS)) {
            results.push({ regCourse: reg, type: 'theory', mainSlot: cellS });
          }
        }
      }
      // Check lab slot match
      if (reg.labSlot) {
        const labParts = reg.labSlot.split('+').map(s => s.trim());
        for (const cellS of cellSlots) {
          if (labParts.includes(cellS)) {
            results.push({ regCourse: reg, type: 'lab', mainSlot: cellS });
          }
        }
      }
    }
    return results;
  };

  // Handle Preset Course Click - Open Scheduler
  const handleOpenScheduler = (course: Course) => {
    const existing = registered.find(r => r.code === course.code);
    setSelectedTheorySlot(existing?.theorySlot || '');
    setSelectedLabSlot(existing?.labSlot || '');
    setModalInstructor(existing?.instructor || '');
    setSchedulingCourse(course);
  };

  // Save Scheduled Course
  const handleSaveSchedule = () => {
    if (!schedulingCourse) return;

    // Check self-conflicts between selected theory and lab
    if (selectedTheorySlot && selectedLabSlot) {
      if (getSlotsOverlap(selectedTheorySlot, selectedLabSlot)) {
        alert("CRITICAL ERROR: Selected Theory Slot and Lab Slot clash with each other! Please select different slots.");
        return;
      }
    }

    // Verify no external conflicts remain
    const tClashes = getClashingCourses(selectedTheorySlot, schedulingCourse.code);
    const lClashes = getClashingCourses(selectedLabSlot, schedulingCourse.code);
    
    if (tClashes.length > 0 || lClashes.length > 0) {
      alert(`CRITICAL ERROR: Overlapping schedule detected! Please fix the conflicts before saving.`);
      return;
    }

    // Color picker
    const existingReg = registered.find(r => r.code === schedulingCourse.code);
    const color = existingReg?.color || courseColors[registered.length % courseColors.length];

    const updatedRegistered = registered.filter(r => r.code !== schedulingCourse.code);
    const newEntry: RegisteredCourse = {
      id: existingReg?.id || Math.random().toString(36).substr(2, 9),
      code: schedulingCourse.code,
      title: schedulingCourse.title,
      credits: schedulingCourse.credits,
      type: schedulingCourse.type,
      basket: schedulingCourse.basket,
      theorySlot: selectedTheorySlot || undefined,
      labSlot: selectedLabSlot || undefined,
      instructor: modalInstructor || undefined,
      color
    };

    setRegistered([...updatedRegistered, newEntry]);
    setSchedulingCourse(null);
    setComboIndex(-1);
  };

  // Remove Course from Timetable
  const handleUnregisterCourse = (code: string) => {
    setRegistered(registered.filter(r => r.code !== code));
    setComboIndex(-1);
  };

  // Reset entire timetable
  const handleResetTimetable = () => {
    if (window.confirm("Are you sure you want to reset your timetable? All scheduled courses will be cleared.")) {
      setRegistered([]);
      setComboIndex(-1);
    }
  };

  // Load curated teacher timetable
  const handleLoadCurated = () => {
    if (registered.length === 0 || window.confirm("Overwrite current timetable with the curated clash-free teacher timetable?")) {
      setRegistered(CURATED_TIMETABLE);
    }
  };

  // Custom Course Submission
  const handleAddCustomCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCode || !customTitle) {
      alert("Please fill in the course code and title.");
      return;
    }

    if (allCourses.some(c => c.code.toLowerCase() === customCode.toLowerCase())) {
      alert("A course with this code already exists.");
      return;
    }

    const newCourse: Course = {
      code: customCode.toUpperCase(),
      title: customTitle,
      credits: customCredits,
      type: customType,
      basket: customBasket,
      theoryCredits: customTheoryCredits > 0 ? customTheoryCredits : undefined,
      labCredits: customLabCredits > 0 ? customLabCredits : undefined
    };

    setCustomCourses([newCourse, ...customCourses]);
    
    // Clear Form
    setCustomCode('');
    setCustomTitle('');
    setCustomInstructor('');
    
    // Automatically open slot scheduling modal for the newly created course!
    setSchedulingCourse(newCourse);
    setSelectedTheorySlot('');
    setSelectedLabSlot('');
    setModalInstructor(customInstructor);
  };

  // Export Timetable as Image (PNG)
  const handleExportPNG = () => {
    const timetableElement = document.getElementById('timetable-capture');
    if (!timetableElement) return;

    html2canvas(timetableElement, {
      backgroundColor: '#070913',
      scale: 2, // High resolution
      logging: false,
      useCORS: true,
      onclone: (clonedDoc) => {
        // Expand elements in cloned DOM to capture the full overflowing table
        const clonedPanel = clonedDoc.getElementById('timetable-capture');
        const clonedWrapper = clonedDoc.querySelector('.timetable-scroll-wrapper') as HTMLElement;
        const clonedTable = clonedDoc.querySelector('.timetable-table') as HTMLElement;

        if (clonedPanel) {
          clonedPanel.style.width = '1450px'; // Give enough width to cover 1350px table + paddings
          clonedPanel.style.maxWidth = 'none';
          clonedPanel.style.overflow = 'visible';
        }
        if (clonedWrapper) {
          clonedWrapper.style.overflow = 'visible';
          clonedWrapper.style.overflowX = 'visible';
          clonedWrapper.style.width = '100%';
        }
        if (clonedTable) {
          clonedTable.style.width = '1350px';
          clonedTable.style.minWidth = '1350px';
        }
      }
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `vit-ffcs-timetable-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  // Preset combinations grids
  const getTheoryCombos = () => {
    if (!schedulingCourse) return [];
    // If STS2010 (a special case), it needs 3 theory credits worth of slots
    const theoryCreds = schedulingCourse.theoryCredits || 0;
    const lookupKey = theoryCreds.toString() as '1' | '2' | '3' | '4';
    return PRESET_COMBINATIONS.theory[lookupKey] || [];
  };

  const getLabCombos = () => {
    if (!schedulingCourse) return [];
    // Lab credits: e.g. 2 practical hours = 2 credits in preset list
    const labCreds = schedulingCourse.labCredits || 0;
    const lookupKey = labCreds >= 2 ? '2' : '1';
    return PRESET_COMBINATIONS.lab[lookupKey] || [];
  };

  // Calculations for Stats
  const totalCredits = registered.reduce((acc, c) => acc + c.credits, 0);
  const totalCourses = registered.length;
  const theorySlotsCount = registered.reduce((acc, c) => acc + (c.theorySlot ? c.theorySlot.split('+').length : 0), 0);
  const labSlotsCount = registered.reduce((acc, c) => acc + (c.labSlot ? c.labSlot.split('+').length : 0), 0);
  
  // Find all current global overlaps in the registered list
  const getGlobalConflicts = (): { msg: string; id: string }[] => {
    const list: { msg: string; id: string }[] = [];
    for (let i = 0; i < registered.length; i++) {
      for (let j = i + 1; j < registered.length; j++) {
        const c1 = registered[i];
        const c2 = registered[j];

        const slots1 = [
          ...(c1.theorySlot ? [c1.theorySlot] : []),
          ...(c1.labSlot ? [c1.labSlot] : [])
        ];
        const slots2 = [
          ...(c2.theorySlot ? [c2.theorySlot] : []),
          ...(c2.labSlot ? [c2.labSlot] : [])
        ];

        for (const s1 of slots1) {
          for (const s2 of slots2) {
            if (getSlotsOverlap(s1, s2)) {
              list.push({
                id: `${c1.code}-${c2.code}-${s1}-${s2}`,
                msg: `Clash detected: ${c1.code} (${s1}) overlaps with ${c2.code} (${s2})`
              });
            }
          }
        }
      }
    }
    return list;
  };

  const globalConflicts = getGlobalConflicts();

  // Filtered preset courses
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBasket = basketFilter === 'All' || course.basket === basketFilter;
    return matchesSearch && matchesBasket;
  });

  return (
    <div className="container app-container">
      {/* Dashboard Top Banner */}
      <header className="app-header glass-panel">
        <div className="header-logo">
          <Calendar className="logo-icon animate-pulse-glow" size={32} />
          <div className="logo-text">
            <h1>VIT FFCS TIMETABLE CURATOR</h1>
            <span>FALL SEMESTER 2026-27</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-success" onClick={handleLoadCurated}>
            <Sparkles size={16} /> Load Curated Slots
          </button>
          {registered.length > 0 && (
            <button className="btn btn-danger" onClick={handleResetTimetable}>
              <RefreshCw size={16} /> Reset All
            </button>
          )}
          <button className="btn btn-primary" onClick={handleExportPNG} disabled={registered.length === 0}>
            <Download size={16} /> Export Timetable (PNG)
          </button>
        </div>
      </header>

      {/* Auto-Scheduler Control Bar */}
      <div className="scheduler-bar glass-panel animate-pulse-glow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15, 23, 42, 0.3)', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={20} style={{ color: 'var(--secondary)', filter: 'drop-shadow(0 0 8px var(--secondary-glow))' }} />
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>Dynamic Teacher Slot Generator</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Automatically curates unique, clash-free combinations of your preferred teachers</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            {comboIndex >= 0 ? `Option ${comboIndex + 1} of ${validCombos.length} Unique Timetables` : `Custom Configuration (${validCombos.length} possible)`}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={handlePrevCombo} style={{ padding: '0.5rem' }} title="Previous combination">
              <ChevronLeft size={16} />
            </button>
            <button className="btn btn-secondary" onClick={handleNextCombo} style={{ padding: '0.5rem' }} title="Next combination">
              <ChevronRight size={16} />
            </button>
            <button className="btn btn-primary" onClick={handleShuffleCombo} style={{ gap: '0.3rem' }}>
              <RefreshCw size={14} /> Shuffle
            </button>
          </div>
        </div>
      </div>

      {/* Main Core Dashboard Grid */}
      <main className="dashboard-layout">
        
        {/* Left Sidebar Control Panel */}
        <section className="sidebar-panel glass-panel">
          <div className="panel-title">
            <h2>Course catalog</h2>
            <Sparkles className="logo-icon" size={18} />
          </div>

          {/* Catalog Tab Toggle */}
          <div className="panel-tabs">
            <button 
              className={`tab-btn ${activeTab === 'preset' ? 'active' : ''}`}
              onClick={() => setActiveTab('preset')}
            >
              Preset Courses
            </button>
            <button 
              className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              Add Custom Course
            </button>
          </div>

          {/* Tab 1: Preset Course Catalog */}
          {activeTab === 'preset' && (
            <>
              {/* Search & Filter Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="form-control"
                    style={{ paddingLeft: '2.25rem', width: '100%' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="form-control" 
                  value={basketFilter} 
                  onChange={(e) => setBasketFilter(e.target.value)}
                >
                  <option value="All">All Baskets</option>
                  <option value="UC">University Core (UC)</option>
                  <option value="PC">Program Core (PC)</option>
                  <option value="PE">Program Elective (PE)</option>
                  <option value="UE">University Elective (UE)</option>
                </select>
              </div>

              {/* Course Catalog List */}
              <div className="course-list">
                {filteredCourses.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', padding: '1rem' }}>No courses match filters.</p>
                ) : (
                  filteredCourses.map(course => {
                    const isReg = registered.some(r => r.code === course.code);
                    const regDetails = registered.find(r => r.code === course.code);
                    const color = regDetails?.color || '#3b82f6';
                    return (
                      <div 
                        key={course.code} 
                        className={`course-card ${isReg ? 'registered' : ''}`}
                        style={{ '--color-theme': isReg ? color : 'var(--text-muted)' } as React.CSSProperties}
                        onClick={() => handleOpenScheduler(course)}
                      >
                        <div className="course-card-header">
                          <span className="course-code">{course.code}</span>
                          <span className="course-basket">{course.basket}</span>
                        </div>
                        <div className="course-title">{course.title}</div>
                        <div className="course-footer">
                          <span className="course-credits">
                            Credits: <strong>{course.credits}</strong> ({course.type})
                          </span>
                          {isReg ? (
                            <span className="course-action-indicator" style={{ color }}>
                              <Check size={14} /> Scheduled
                            </span>
                          ) : (
                            <span className="course-action-indicator" style={{ color: 'var(--text-muted)' }}>
                              <Plus size={14} /> Add Slots
                            </span>
                          )}
                        </div>
                        {isReg && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>
                            Slots: {regDetails?.theorySlot ? `[Theory: ${regDetails.theorySlot}]` : ''} {regDetails?.labSlot ? `[Lab: ${regDetails.labSlot}]` : ''}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* Tab 2: Custom Course Form */}
          {activeTab === 'custom' && (
            <form onSubmit={handleAddCustomCourse} className="course-list">
              <div className="form-group">
                <label>Course Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. CSE3002" 
                  className="form-control"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  maxLength={10}
                />
              </div>

              <div className="form-group">
                <label>Course Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Web Development" 
                  className="form-control"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Teacher / Instructor Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dr. Satish Kumar" 
                  className="form-control"
                  value={customInstructor}
                  onChange={(e) => setCustomInstructor(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Basket</label>
                  <select 
                    className="form-control" 
                    value={customBasket}
                    onChange={(e) => setCustomBasket(e.target.value as 'UC'|'PC'|'PE'|'UE')}
                  >
                    <option value="PC">Program Core (PC)</option>
                    <option value="UC">University Core (UC)</option>
                    <option value="PE">Program Elective (PE)</option>
                    <option value="UE">University Elective (UE)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Course Type</label>
                  <select 
                    className="form-control"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as 'theory'|'lab'|'embedded')}
                  >
                    <option value="embedded">Theory + Lab (Embedded)</option>
                    <option value="theory">Theory Only</option>
                    <option value="lab">Lab Only</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Total Credits</label>
                  <select 
                    className="form-control"
                    value={customCredits}
                    onChange={(e) => setCustomCredits(Number(e.target.value))}
                  >
                    <option value="4">4 Credits</option>
                    <option value="3">3 Credits</option>
                    <option value="2">2 Credits</option>
                    <option value="1">1 Credit</option>
                  </select>
                </div>
                
                {customType === 'embedded' && (
                  <div className="form-group">
                    <label>Theory Slot Credits</label>
                    <select 
                      className="form-control"
                      value={customTheoryCredits}
                      onChange={(e) => setCustomTheoryCredits(Number(e.target.value))}
                    >
                      <option value="3">3 Credits (e.g. A1+TA1)</option>
                      <option value="2">2 Credits (e.g. A1)</option>
                      <option value="4">4 Credits (e.g. A1+TA1+TAA1)</option>
                    </select>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
                <Plus size={16} /> Create & Select Slots
              </button>
            </form>
          )}

          {/* Registered Courses Summary List */}
          {registered.length > 0 && (
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Scheduled Courses ({registered.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
                {registered.map(reg => (
                  <div key={reg.code} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: reg.color }}></div>
                      <div>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{reg.code}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>({reg.credits} Credits)</span>
                        {reg.instructor && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                            Faculty: <span style={{ color: 'var(--text-secondary)' }}>{reg.instructor}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', padding: '0.2rem' }}
                      onClick={() => handleUnregisterCourse(reg.code)}
                      title="Unschedule course"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Dashboard Area (Visual Schedule & Stats) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Global Conflict Panel (Warning Glow) */}
          {globalConflicts.length > 0 && (
            <section className="conflict-banner glass-panel animate-pulse-glow">
              <div className="conflict-banner-header">
                <AlertTriangle size={18} className="clash-icon" />
                <span>FFCS Slot Clashes Warning!</span>
              </div>
              <ul className="conflict-list">
                {globalConflicts.map(conf => (
                  <li key={conf.id}>{conf.msg}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Curated Timetable Component */}
          <section className="timetable-panel glass-panel" id="timetable-capture">
            <div className="timetable-header-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Grid size={18} className="logo-icon" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Curated Schedule Matrix</h2>
              </div>
              
              <div className="timetable-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px dashed rgba(255,255,255,0.2)' }}></div>
                  <span>Available Slot</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444' }}></div>
                  <span>Clashed Slot</span>
                </div>
              </div>
            </div>

            {/* Timetable Interactive Grid Scroller */}
            <div className="timetable-scroll-wrapper">
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th className="day-header-cell" style={{ height: '56px' }}>DAY</th>
                    <th className="type-header-cell">CLASS</th>
                    {/* Morning Hours 8:00 - 13:10 */}
                    <th className="time-header">08:00 - 08:50<span>Period 1 / L1</span></th>
                    <th className="time-header">09:00 - 09:50<span>Period 2 / L2</span></th>
                    <th className="time-header">10:00 - 10:50<span>Period 3 / L3</span></th>
                    <th className="time-header">11:00 - 11:50<span>Period 4 / L4</span></th>
                    <th className="time-header">12:00 - 12:50<span>Period 5 / L5</span></th>
                    <th className="time-header">12:30 - 01:10<span>L6</span></th>
                    {/* LUNCH */}
                    <th className="lunch-cell" style={{ letterSpacing: 'normal' }}>LUNCH</th>
                    {/* Afternoon Hours 14:00 - 19:10 */}
                    <th className="time-header">14:00 - 14:50<span>Period 6 / L31</span></th>
                    <th className="time-header">15:00 - 15:50<span>Period 7 / L32</span></th>
                    <th className="time-header">16:00 - 16:50<span>Period 8 / L33</span></th>
                    <th className="time-header">17:00 - 17:50<span>Period 9 / L34</span></th>
                    <th className="time-header">18:00 - 18:50<span>Period 10 / L35</span></th>
                    <th className="time-header">18:30 - 07:10<span>L36</span></th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => {
                    // Define slot cells for the Theory Row for this day
                    let theorySlotGrid: string[] = [];
                    if (day === 'TUE') theorySlotGrid = ['TFF1', 'A1', 'B1', 'TC1/G1', 'D1', '', 'F2', 'A2', 'B2', 'TC2/G2', 'TDD2', ''];
                    else if (day === 'WED') theorySlotGrid = ['TGG1', 'D1', 'F1', 'E1/SC2', 'B1', '', 'D2', 'TF2/G2', 'E2/SC1', 'B2', 'TCC2', ''];
                    else if (day === 'THU') theorySlotGrid = ['TEE1', 'C1', 'TD1/TG1', 'TAA1/ECS', 'TBB1/CLUB', '', 'TE2/SE1', 'C2', 'TD2/TG2', 'A2', 'TFF2', ''];
                    else if (day === 'FRI') theorySlotGrid = ['TCC1', 'TB1', 'TA1', 'F1', 'TE1/SD2', '', 'C2', 'TB2', 'TA2', 'F2', 'TEE2', ''];
                    else if (day === 'SAT') theorySlotGrid = ['TDD1', 'E1/SE2', 'C1', 'TF1/G1', 'A1', '', 'D2', 'E2/SD1', 'TAA2/ECS', 'TBB2/CLUB', 'TGG2', ''];

                    // Define slot cells for the Lab Row for this day
                    const dayIdx = days.indexOf(day);
                    const morningLabSlots = Array.from({ length: 6 }, (_, i) => `L${dayIdx * 6 + i + 1}`);
                    const afternoonLabSlots = Array.from({ length: 6 }, (_, i) => `L${30 + dayIdx * 6 + i + 1}`);
                    const labSlotGrid = [...morningLabSlots, ...afternoonLabSlots];

                    return (
                      <React.Fragment key={day}>
                        {/* 1. Theory Row */}
                        <tr>
                          <td className="day-header-cell" rowSpan={2}>{day}</td>
                          <td className="type-header-cell">Theory</td>
                          
                          {/* Morning Theory Periods 1 - 5 + Empty L6 */}
                          {theorySlotGrid.slice(0, 6).map((slotName, idx) => {
                            if (!slotName) {
                              return <td key={`t-m-empty-${idx}`} style={{ background: 'rgba(0,0,0,0.1)' }}></td>;
                            }
                            
                            const cellOccupancy = getCellOccupancy(slotName);
                            const isOccupied = cellOccupancy.length > 0;
                            const isClash = cellOccupancy.length > 1;

                            if (isClash) {
                              return (
                                <td key={slotName} className="slot-cell clash">
                                  <div className="clash-cell-content">
                                    <AlertTriangle size={14} className="clash-icon" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>CLASH</span>
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>Collision:</strong>
                                    {cellOccupancy.map((o, i) => (
                                      <div key={i}>{o.regCourse.code} ({o.mainSlot})</div>
                                    ))}
                                  </div>
                                </td>
                              );
                            }

                            if (isOccupied) {
                              const o = cellOccupancy[0];
                              return (
                                <td 
                                  key={slotName} 
                                  className="slot-cell filled" 
                                  style={{
                                    '--course-color-bg': `${o.regCourse.color}25`,
                                    '--course-color-border': o.regCourse.color
                                  } as React.CSSProperties}
                                >
                                  <div className="filled-cell-content">
                                    <span className="filled-course-code">{o.regCourse.code}</span>
                                    <span className="filled-slot-type">Theory</span>
                                    <span className="filled-slot-name">{o.mainSlot}</span>
                                    {o.regCourse.instructor && (
                                      <span className="filled-instructor" title={o.regCourse.instructor}>
                                        {o.regCourse.instructor}
                                      </span>
                                    )}
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>{o.regCourse.code}</strong>
                                    <div>{o.regCourse.title}</div>
                                    <div>Slot: {o.mainSlot} ({o.regCourse.theorySlot})</div>
                                    {o.regCourse.instructor && <div>Faculty: {o.regCourse.instructor}</div>}
                                  </div>
                                </td>
                              );
                            }

                            return (
                              <td key={slotName} className="slot-cell">
                                <span className="cell-slot-name">{slotName}</span>
                              </td>
                            );
                          })}

                          {/* 2. LUNCH Column (Rowspan=2 handles alignment) */}
                          <td className="lunch-cell" rowSpan={2}>LUNCH</td>

                          {/* Afternoon Theory Periods 6 - 10 + Empty L36 */}
                          {theorySlotGrid.slice(6).map((slotName, idx) => {
                            if (!slotName) {
                              return <td key={`t-a-empty-${idx}`} style={{ background: 'rgba(0,0,0,0.1)' }}></td>;
                            }

                            const cellOccupancy = getCellOccupancy(slotName);
                            const isOccupied = cellOccupancy.length > 0;
                            const isClash = cellOccupancy.length > 1;

                            if (isClash) {
                              return (
                                <td key={slotName} className="slot-cell clash">
                                  <div className="clash-cell-content">
                                    <AlertTriangle size={14} className="clash-icon" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>CLASH</span>
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>Collision:</strong>
                                    {cellOccupancy.map((o, i) => (
                                      <div key={i}>{o.regCourse.code} ({o.mainSlot})</div>
                                    ))}
                                  </div>
                                </td>
                              );
                            }

                            if (isOccupied) {
                              const o = cellOccupancy[0];
                              return (
                                <td 
                                  key={slotName} 
                                  className="slot-cell filled"
                                  style={{
                                    '--course-color-bg': `${o.regCourse.color}25`,
                                    '--course-color-border': o.regCourse.color
                                  } as React.CSSProperties}
                                >
                                  <div className="filled-cell-content">
                                    <span className="filled-course-code">{o.regCourse.code}</span>
                                    <span className="filled-slot-type">Theory</span>
                                    <span className="filled-slot-name">{o.mainSlot}</span>
                                    {o.regCourse.instructor && (
                                      <span className="filled-instructor" title={o.regCourse.instructor}>
                                        {o.regCourse.instructor}
                                      </span>
                                    )}
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>{o.regCourse.code}</strong>
                                    <div>{o.regCourse.title}</div>
                                    <div>Slot: {o.mainSlot} ({o.regCourse.theorySlot})</div>
                                    {o.regCourse.instructor && <div>Faculty: {o.regCourse.instructor}</div>}
                                  </div>
                                </td>
                              );
                            }

                            return (
                              <td key={slotName} className="slot-cell">
                                <span className="cell-slot-name">{slotName}</span>
                              </td>
                            );
                          })}
                        </tr>

                        {/* 2. Lab Row */}
                        <tr>
                          <td className="type-header-cell" style={{ borderTop: 'none' }}>Lab</td>

                          {/* Morning Labs L1 - L6 */}
                          {labSlotGrid.slice(0, 6).map((slotName) => {
                            const cellOccupancy = getCellOccupancy(slotName);
                            const isOccupied = cellOccupancy.length > 0;
                            const isClash = cellOccupancy.length > 1;

                            if (isClash) {
                              return (
                                <td key={slotName} className="slot-cell clash">
                                  <div className="clash-cell-content">
                                    <AlertTriangle size={14} className="clash-icon" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>CLASH</span>
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>Collision:</strong>
                                    {cellOccupancy.map((o, i) => (
                                      <div key={i}>{o.regCourse.code} ({o.mainSlot})</div>
                                    ))}
                                  </div>
                                </td>
                              );
                            }

                            if (isOccupied) {
                              const o = cellOccupancy[0];
                              return (
                                <td 
                                  key={slotName} 
                                  className="slot-cell filled"
                                  style={{
                                    '--course-color-bg': `${o.regCourse.color}25`,
                                    '--course-color-border': o.regCourse.color
                                  } as React.CSSProperties}
                                >
                                  <div className="filled-cell-content">
                                    <span className="filled-course-code">{o.regCourse.code}</span>
                                    <span className="filled-slot-type">Lab</span>
                                    <span className="filled-slot-name">{o.mainSlot}</span>
                                    {o.regCourse.instructor && (
                                      <span className="filled-instructor" title={o.regCourse.instructor}>
                                        {o.regCourse.instructor}
                                      </span>
                                    )}
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>{o.regCourse.code}</strong>
                                    <div>{o.regCourse.title}</div>
                                    <div>Slot: {o.mainSlot} ({o.regCourse.labSlot})</div>
                                    {o.regCourse.instructor && <div>Faculty: {o.regCourse.instructor}</div>}
                                  </div>
                                </td>
                              );
                            }

                            return (
                              <td key={slotName} className="slot-cell">
                                <span className="cell-slot-name">{slotName}</span>
                              </td>
                            );
                          })}

                          {/* Lunch is spanned, no td here */}

                          {/* Afternoon Labs L31 - L36 */}
                          {labSlotGrid.slice(6).map((slotName) => {
                            const cellOccupancy = getCellOccupancy(slotName);
                            const isOccupied = cellOccupancy.length > 0;
                            const isClash = cellOccupancy.length > 1;

                            if (isClash) {
                              return (
                                <td key={slotName} className="slot-cell clash">
                                  <div className="clash-cell-content">
                                    <AlertTriangle size={14} className="clash-icon" />
                                    <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>CLASH</span>
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>Collision:</strong>
                                    {cellOccupancy.map((o, i) => (
                                      <div key={i}>{o.regCourse.code} ({o.mainSlot})</div>
                                    ))}
                                  </div>
                                </td>
                              );
                            }

                            if (isOccupied) {
                              const o = cellOccupancy[0];
                              return (
                                <td 
                                  key={slotName} 
                                  className="slot-cell filled"
                                  style={{
                                    '--course-color-bg': `${o.regCourse.color}25`,
                                    '--course-color-border': o.regCourse.color
                                  } as React.CSSProperties}
                                >
                                  <div className="filled-cell-content">
                                    <span className="filled-course-code">{o.regCourse.code}</span>
                                    <span className="filled-slot-type">Lab</span>
                                    <span className="filled-slot-name">{o.mainSlot}</span>
                                    {o.regCourse.instructor && (
                                      <span className="filled-instructor" title={o.regCourse.instructor}>
                                        {o.regCourse.instructor}
                                      </span>
                                    )}
                                  </div>
                                  <div className="tooltip-box">
                                    <strong>{o.regCourse.code}</strong>
                                    <div>{o.regCourse.title}</div>
                                    <div>Slot: {o.mainSlot} ({o.regCourse.labSlot})</div>
                                    {o.regCourse.instructor && <div>Faculty: {o.regCourse.instructor}</div>}
                                  </div>
                                </td>
                              );
                            }

                            return (
                              <td key={slotName} className="slot-cell">
                                <span className="cell-slot-name">{slotName}</span>
                              </td>
                            );
                          })}
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Statistics Section */}
          <section className="stats-container">
            <div className="stat-card glass-panel">
              <span className="stat-value">{totalCredits} / 27</span>
              <span className="stat-label">Total Credits</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-value">{totalCourses}</span>
              <span className="stat-label">Registered Courses</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-value">{theorySlotsCount} hrs</span>
              <span className="stat-label">Theory / Lectures</span>
            </div>
            <div className="stat-card glass-panel">
              <span className="stat-value">{labSlotsCount * 50} mins</span>
              <span className="stat-label">Practical / Lab time</span>
            </div>
          </section>

        </div>
      </main>

      {/* Course Scheduling Modal Popup */}
      {schedulingCourse && (
        <div className="selection-overlay">
          <div className="selection-modal glass-panel">
            
            <div className="modal-header">
              <div>
                <h3>Schedule {schedulingCourse.code}</h3>
                <p>{schedulingCourse.title}</p>
              </div>
              <button className="close-btn" onClick={() => setSchedulingCourse(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Optional Instructor Detail Input */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} /> Instructor Name (Optional)
              </label>
              <input 
                type="text" 
                placeholder="e.g. Dr. Satish Kumar" 
                className="form-control"
                value={modalInstructor}
                onChange={(e) => setModalInstructor(e.target.value)}
              />
            </div>

            {/* Theory Slot Selector */}
            {(schedulingCourse.type === 'theory' || schedulingCourse.type === 'embedded') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} /> Select Theory Slot ({schedulingCourse.theoryCredits} Credits)
                </label>
                <div className="combo-grid">
                  {getTheoryCombos().map(combo => {
                    const clashes = getClashingCourses(combo, schedulingCourse.code);
                    const isClashing = clashes.length > 0;
                    const isSelected = selectedTheorySlot === combo;
                    
                    return (
                      <div 
                        key={combo}
                        className={`combo-card ${isSelected ? 'selected' : ''} ${isClashing ? 'disabled' : ''}`}
                        onClick={() => {
                          if (!isClashing) {
                            setSelectedTheorySlot(isSelected ? '' : combo);
                          }
                        }}
                        title={isClashing ? `Clashes with: ${clashes.join(', ')}` : ''}
                      >
                        <span>{combo}</span>
                        {isClashing && (
                          <div style={{ fontSize: '0.6rem', color: 'var(--danger)', marginTop: '0.2rem', fontWeight: '700' }}>
                            Clash
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Lab Slot Selector */}
            {(schedulingCourse.type === 'lab' || schedulingCourse.type === 'embedded') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} /> Select Lab Slot ({schedulingCourse.labCredits || schedulingCourse.credits} Hours)
                </label>
                <div className="combo-grid">
                  {getLabCombos().map(combo => {
                    const clashes = getClashingCourses(combo, schedulingCourse.code);
                    
                    // Also check if it overlaps with the currently selected theory slot in the modal
                    const selfOverlap = selectedTheorySlot && getSlotsOverlap(combo, selectedTheorySlot);
                    const isClashing = clashes.length > 0 || selfOverlap;
                    const isSelected = selectedLabSlot === combo;

                    return (
                      <div 
                        key={combo}
                        className={`combo-card ${isSelected ? 'selected' : ''} ${isClashing ? 'disabled' : ''}`}
                        onClick={() => {
                          if (!isClashing) {
                            setSelectedLabSlot(isSelected ? '' : combo);
                          }
                        }}
                        title={
                          selfOverlap 
                            ? 'Clashes with selected Theory slot above!' 
                            : isClashing 
                              ? `Clashes with: ${clashes.join(', ')}` 
                              : ''
                        }
                      >
                        <span>{combo}</span>
                        {isClashing && (
                          <div style={{ fontSize: '0.6rem', color: 'var(--danger)', marginTop: '0.2rem', fontWeight: '700' }}>
                            {selfOverlap ? 'Self Clash' : 'Clash'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Confirm Save / Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <div>
                {registered.some(r => r.code === schedulingCourse.code) && (
                  <button 
                    className="btn btn-danger" 
                    onClick={() => {
                      handleUnregisterCourse(schedulingCourse.code);
                      setSchedulingCourse(null);
                    }}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Remove from Timetable
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {(selectedTheorySlot || selectedLabSlot) && (
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setSelectedTheorySlot('');
                      setSelectedLabSlot('');
                    }}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Clear Selections
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => setSchedulingCourse(null)}>
                  Cancel
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleSaveSchedule}
                  disabled={
                    (schedulingCourse.type === 'theory' && !selectedTheorySlot) ||
                    (schedulingCourse.type === 'lab' && !selectedLabSlot) ||
                    (schedulingCourse.type === 'embedded' && !selectedTheorySlot && !selectedLabSlot)
                  }
                >
                  Save Schedule
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
