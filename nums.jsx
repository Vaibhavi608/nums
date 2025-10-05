import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- MOCK USER ID ---
const mockUserId = "MOCK_USER_1234567890_HERLIFE_DEMO";

// --- Helper Icons (Lucide Icons adapted to JSX) ---
const HeartPulse = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 8.5H22"/></svg>);
const GraduationCap = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.016 4.976a1 1 0 0 0-.968 0L2.599 9.084a1 1 0 0 0-.019 1.838l8.47 3.868a1 1 0 0 0 .968 0Z"/><path d="M12 16.5v3.435"/><path d="M5.5 13.5v3.435"/><path d="M18.5 13.5v3.435"/><path d="M2 12v6"/><path d="M22 12v6"/></svg>);
const MessageCircleQuestion = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4"/><path d="M12 14V10"/><path d="M18 10a6 6 0 0 0-6-6H6a6 6 0 0 0 0 12h7"/><path d="M21 15v-5a6 6 0 0 0-6-6H9"/><path d="M17.5 17.5l-2.12-2.12"/></svg>);
const Sparkles = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1"/><path d="M10 8V6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v2"/><path d="M12 12L7 7l-2 2"/><path d="M12 12l5-5 2 2"/></svg>);
const User = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const Home = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const Zap = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const Globe = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a8 8 0 0 0 8 8 8 8 0 0 0-8 8 8 8 0 0 0-8-8 8 8 0 0 0 8-8z"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2v20"/></svg>);
const Briefcase = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const Users = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const Baby = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M12 12V4"/><circle cx="12" cy="18" r="4"/><path d="M5 12C3 12 3 6 12 6c9 0 9 6 7 6"/></svg>);
const BookOpen = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>);
const Shield = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const MessageSquare = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="15 8 12 11 9 8"/></svg>);
const ArrowLeft = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>);
const LogOut = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>);
const Info = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>);
const Calendar = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const Smile = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>);


// --- Color Definitions ---
const P1_PRIMARY_BG = 'bg-gradient-to-br from-pink-50 to-sky-100';
const P1_ACCENT_COLOR = 'text-pink-600';
const P1_HEADER_BG = 'bg-sky-400';
const P2_PRIMARY_BG = 'bg-gradient-to-br from-red-50 to-orange-100';
const P2_ACCENT_COLOR = 'text-red-700';
const P2_HEADER_BG = 'bg-red-500';
const P3_PRIMARY_BG = 'bg-gradient-to-br from-purple-50 to-teal-100';
const P3_ACCENT_COLOR = 'text-purple-600';
const P3_HEADER_BG = 'bg-teal-400';

// --- Interactive Module Component: Chatbot ---
const ChatbotModule = () => {
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', text: "Hi there! I'm Ava, your friendly health assistant. I can answer questions about your body, emotions, and general well-being. What's on your mind today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef(null);

    // Scroll to bottom when chat updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim() || isTyping) return;

        const userMessage = userInput.trim();
        setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
        setUserInput('');
        setIsTyping(true);

        // Simulate AI response delay and logic
        setTimeout(() => {
            const lowerCaseMsg = userMessage.toLowerCase();
            let aiResponse = "That's a thoughtful question. I'm still learning about that specific topic, but I can offer some general supportive advice. Remember, I'm here to support you, but I'm not a doctor!";

            if (lowerCaseMsg.includes('period') || lowerCaseMsg.includes('cramps')) {
                aiResponse = "Dealing with cramps can be tough! Try a heating pad, light exercise, or a warm bath. If they are severe, please talk to a parent or doctor.";
            } else if (lowerCaseMsg.includes('school') || lowerCaseMsg.includes('stress')) {
                aiResponse = "Stress is normal, especially with school. Try taking five deep breaths, writing in a journal, or talking to a trusted friend or adult.";
            } else if (lowerCaseMsg.includes('skin') || lowerCaseMsg.includes('acne')) {
                aiResponse = "For skin care, remember to wash your face twice a day and never pick at spots! Hydration is key. If acne is persistent, a dermatologist can help.";
            } else if (lowerCaseMsg.includes('am i normal') || lowerCaseMsg.includes('my body')) {
                aiResponse = "Every body is different, and that's completely normal! The most important thing is focusing on being healthy and kind to yourself. If you have specific concerns, check out our Educational Modules.";
            }

            setChatHistory(prev => [...prev, { role: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1500); // 1.5 second delay
    };

    return (
        <div className="flex flex-col h-[60vh] bg-white rounded-xl shadow-inner border border-purple-200">
            {/* Chat History */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-md ${
                            msg.role === 'user' 
                                ? 'bg-purple-500 text-white rounded-br-none' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-500 p-3 rounded-xl rounded-tl-none text-sm italic">
                            Ava is typing...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Field */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-purple-200 bg-gray-50 flex items-center">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your question..."
                    disabled={isTyping}
                    className="flex-1 p-3 border border-purple-300 rounded-l-lg focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-200"
                />
                <button
                    type="submit"
                    disabled={!userInput.trim() || isTyping}
                    className="p-3 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600 transition-colors disabled:bg-purple-300 shadow-md"
                >
                    <MessageSquare size={20} />
                </button>
            </form>
        </div>
    );
};

// --- Interactive Module Component: Menstrual Tracker ---
const MenstrualTrackerModule = ({ userId, cycleLogs, setCycleLogs }) => {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [logType, setLogType] = useState('Period Start');
    const [symptom, setSymptom] = useState('Cramps');
    const [notes, setNotes] = useState('');

    const handleLog = (e) => {
        e.preventDefault();
        const logEntry = {
            id: Date.now(),
            date,
            type: logType,
            symptom: logType === 'Symptom' ? symptom : null,
            notes,
            loggedAt: new Date().toISOString(),
        };

        // Add new log and sort by date descending
        const newLogs = [...cycleLogs, logEntry].sort((a, b) => new Date(b.date) - new Date(a.date));
        setCycleLogs(newLogs);
        localStorage.setItem(`herlife_cyclelogs_${userId}`, JSON.stringify(newLogs));
        
        // Reset form fields
        setDate(today);
        setLogType('Period Start');
        setSymptom('Cramps');
        setNotes('');
        console.log("Log saved locally.");
    };

    return (
        <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center"><Calendar className="mr-2 text-pink-500" /> Log Today's Status</h4>
            
            <form onSubmit={handleLog} className="bg-pink-50 p-5 rounded-xl shadow-inner border border-pink-200 space-y-4">
                
                {/* Date Input */}
                <div>
                    <label htmlFor="logDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        id="logDate"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        max={today}
                        className="w-full p-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                </div>

                {/* Log Type Selector */}
                <div>
                    <label htmlFor="logType" className="block text-sm font-medium text-gray-700 mb-1">What are you logging?</label>
                    <select
                        id="logType"
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                        className="w-full p-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-white"
                    >
                        <option>Period Start</option>
                        <option>Period End</option>
                        <option>Symptom</option>
                    </select>
                </div>

                {/* Symptom Selector (Conditional) */}
                {logType === 'Symptom' && (
                    <div>
                        <label htmlFor="symptom" className="block text-sm font-medium text-gray-700 mb-1">Select Symptom</label>
                        <select
                            id="symptom"
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                            className="w-full p-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 bg-white"
                        >
                            <option>Cramps</option>
                            <option>Headache</option>
                            <option>Fatigue</option>
                            <option>Mood Swings</option>
                            <option>Bloating</option>
                        </select>
                    </div>
                )}
                
                {/* Notes/Severity */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (e.g., severity)</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows="2"
                        placeholder="e.g. Mild cramps this morning."
                        className="w-full p-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition duration-150 shadow-md transform hover:scale-[1.01]"
                >
                    Log Entry
                </button>
            </form>

            {/* Log History */}
            <div className="bg-white p-5 rounded-xl shadow border border-pink-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><Smile className="mr-2 text-pink-500" size={20} /> Recent Logs ({cycleLogs.length})</h4>
                {cycleLogs.length === 0 ? (
                    <p className="text-gray-500 italic text-sm">No entries logged yet. Start tracking above!</p>
                ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {cycleLogs.slice(0, 5).map(log => (
                            <div key={log.id} className="p-3 bg-pink-50 rounded-lg flex justify-between items-center text-sm border-l-4 border-pink-400">
                                <div>
                                    <p className="font-bold text-gray-800">{log.date} <span className="text-pink-600 ml-2">({log.type})</span></p>
                                    {log.symptom && <p className="text-gray-600 text-xs mt-0.5">Symptom: {log.symptom}</p>}
                                    {log.notes && <p className="text-gray-500 text-xs italic mt-0.5">{log.notes}</p>}
                                </div>
                                <span className="text-xs text-gray-400">{new Date(log.loggedAt).toLocaleTimeString()}</span>
                            </div>
                        ))}
                        {cycleLogs.length > 5 && <p className="text-center text-xs text-gray-400 mt-2">... Showing 5 of {cycleLogs.length} total logs.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Static Content Generator (Unchanged) ---
const getDetailedContent = (feature, cycleLogs, setCycleLogs, userId) => {
    switch (feature) {
        // --- Early Teen Phase (UPDATED MENSTRUAL TRACKER ANALYSIS) ---
        case 'Teen_MenstrualTracker':
            const totalLogs = cycleLogs.length;
            const periodStarts = cycleLogs.filter(log => log.type === 'Period Start').length;

            // Calculate symptom frequency
            const symptomMap = {};
            cycleLogs.filter(log => log.type === 'Symptom').forEach(log => {
                const sym = log.symptom || 'Unspecified Symptom';
                symptomMap[sym] = (symptomMap[sym] || 0) + 1;
            });
            
            const sortedSymptoms = Object.entries(symptomMap).sort(([, a], [, b]) => b - a);
            const mostFrequentSymptom = sortedSymptoms.length > 0 ? sortedSymptoms[0] : null;

            // Calculate tracking duration (time since first log)
            const firstLogDate = cycleLogs.length > 0 
                ? new Date(cycleLogs[cycleLogs.length - 1].date) 
                : null;
            const daysTracking = firstLogDate 
                ? Math.ceil((new Date() - firstLogDate) / (1000 * 60 * 60 * 24)) 
                : 0;

            let summaryText = `You have recorded **${totalLogs}** total entries over **${daysTracking} days** of tracking.`;
            
            let symptomInsight = '';
            if (mostFrequentSymptom) {
                symptomInsight = `Your most frequent symptom is **${mostFrequentSymptom[0]}**, logged ${mostFrequentSymptom[1]} times.`;
                if (mostFrequentSymptom[0] === 'Cramps') {
                    symptomInsight += ' **Actionable Insight:** Try light stretching and hydration; logging notes about severity helps track if treatment works.';
                } else if (mostFrequentSymptom[0] === 'Fatigue') {
                    symptomInsight += ' **Actionable Insight:** Ensure you are prioritizing 8-10 hours of sleep, especially during your luteal phase.';
                } else {
                    symptomInsight += ' **Actionable Insight:** Keep logging to see if these symptoms form a clear pattern around your cycle start.';
                }
            } else {
                symptomInsight = 'Log some symptoms to unlock personalized insights!';
            }


            return {
                analysis: (
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500 shadow-inner">
                        <h3 className="text-lg font-bold text-pink-700 mb-2 flex items-center"><Info /> Cycle Analysis Summary</h3>
                        {totalLogs === 0 ? (
                            <p className="text-gray-700 text-sm">
                                **No data logged yet.** Start logging your cycle days and symptoms below to receive personalized analysis!
                            </p>
                        ) : (
                            <>
                                <p className="text-gray-700 text-sm font-semibold">{summaryText}</p>
                                <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                                    <li>{symptomInsight}</li>
                                    <li>**Cycle Prediction:** {periodStarts > 1 ? `With ${periodStarts} starts logged, prediction accuracy is high.` : `Log at least 2 cycle starts for a reliable prediction.`}</li>
                                    <li>**Health Tip:** Remember to focus on iron-rich foods (like spinach or lentils) around the time of your period to maintain energy.</li>
                                </ul>
                            </>
                        )}
                    </div>
                ),
                content: (
                    <MenstrualTrackerModule 
                        userId={userId} 
                        cycleLogs={cycleLogs} 
                        setCycleLogs={setCycleLogs}
                    />
                )
            };
        case 'Teen_EducationalModules':
            return {
                analysis: (
                    <div className="p-4 bg-sky-50 rounded-lg border-l-4 border-sky-500 shadow-inner">
                        <h3 className="text-lg font-bold text-sky-700 mb-2 flex items-center"><Info /> Module Progress Report</h3>
                        <p className="text-gray-700 text-sm">
                            You've completed 5 out of 8 core puberty modules. Your quiz scores show **strong understanding of hormonal changes**, but review is recommended on "Emotional Wellness in a Digital Age."
                        </p>
                        <p className="mt-2 text-sm font-semibold text-sky-600">
                            Upcoming Module: **"Nutrition: Fueling Your Growth Spurt"** (Estimated completion time: 12 minutes).
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Video Lesson Library: Puberty Decoded</h4>
                        <p className="text-gray-700">Tap on any topic to launch the interactive, animated lesson. All content is certified by adolescent health specialists.</p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="p-3 bg-white rounded-lg shadow-sm border border-sky-100 hover:bg-sky-50 cursor-pointer">Lesson 1: What are Hormones? (Completed)</li>
                            <li className="p-3 bg-white rounded-lg shadow-sm border border-sky-100 hover:bg-sky-50 cursor-pointer font-bold text-sky-600">Lesson 6: Managing Friendships and Conflict (In Progress)</li>
                            <li className="p-3 bg-white rounded-lg shadow-sm border border-sky-100">Lesson 7: Safe Internet Habits</li>
                        </ul>
                    </div>
                )
            };
        // --- Early Teen Phase (CHATBOT IMPLEMENTATION) ---
        case 'Teen_Chatbot':
            return {
                analysis: (
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 shadow-inner">
                        <h3 className="text-lg font-bold text-purple-700 mb-2 flex items-center"><Info /> Chatbot Usage Report</h3>
                        <p className="text-gray-700 text-sm">
                            You've asked 12 questions this week, primarily concerning **skin care and self-esteem**. The chatbot has suggested resources on positive body image.
                        </p>
                        <p className="mt-2 text-sm font-semibold text-purple-600">
                            Reminder: The chatbot provides supportive, general advice. For clinical emergencies, please call a healthcare professional.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Ava: Your Anonymous Health Assistant</h4>
                        <p className="text-gray-700">Your questions are private and anonymous. Type below to start a conversation with our health AI.</p>
                        <ChatbotModule />
                    </div>
                )
            };
        case 'Teen_ConfidenceCorner':
            return {
                analysis: (
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 shadow-inner">
                        <h3 className="text-lg font-bold text-yellow-700 mb-2 flex items-center"><Info /> Affirmation Engagement</h3>
                        <p className="text-gray-700 text-sm">
                            You engaged with 80% of daily affirmations last week. Your mood score improved **10% on days you completed the "Gratitude Challenge."**
                        </p>
                        <p className="mt-2 text-sm font-semibold text-yellow-600">
                            Today's Task: Write down 3 things you love about yourself.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Daily Boost: Self-Love & Tasks</h4>
                        <p className="text-gray-700">Start your day with a positive affirmation and a small task designed to build your self-esteem and confidence.</p>
                        <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                            <p className="text-lg font-bold text-yellow-800">"I am strong. I am worthy. I am unique."</p>
                        </div>
                    </div>
                )
            };
        case 'Teen_ParentGuide':
            return {
                analysis: (
                    <div className="p-4 bg-pink-100 rounded-lg border-l-4 border-pink-500 shadow-inner">
                        <h3 className="text-lg font-bold text-pink-700 mb-2 flex items-center"><Info /> Parent Communication Status</h3>
                        <p className="text-gray-700 text-sm">
                            You have shared 2 topics with your designated parent/guardian through the secure guide. This feature promotes open, constructive dialogue.
                        </p>
                        <p className="mt-2 text-sm font-semibold text-pink-600">
                            New Guide Available: "How to Discuss Internet Safety Without Being Scary."
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Secure Parent Resource Center</h4>
                        <p className="text-gray-700">This section allows the user (you) to selectively share educational resources or start a conversation with a trusted adult regarding sensitive topics.</p>
                        <button className="mt-3 w-full py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-150 shadow-md" onClick={() => console.log("Navigate to Parent Guide")}>
                            Browse Communication Scripts
                        </button>
                    </div>
                )
            };

        // --- Adult Phase ---
        case 'Adult_MentalHealth':
            return {
                analysis: (
                    <div className="p-4 bg-red-100 rounded-lg border-l-4 border-red-500 shadow-inner">
                        <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center"><Info /> Mood Trend Analysis</h3>
                        <p className="text-gray-800 text-sm">
                            Analysis of the last 30 days shows a **consistent spike in stress levels every Sunday evening**. This is often linked to anticipating the start of the work week.
                        </p>
                        <p className="mt-2 text-sm text-red-600 font-semibold">
                            Actionable Insight: Schedule a 30-minute digital detox or mindfulness session on Sunday afternoons to break the pattern. Access your personalized **"Sunday Scaries"** guide now.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Daily Mood Tracker & Mindfulness</h4>
                        <p className="text-gray-700">Log your mood, sleep, and major stressors daily. Use our guided audio meditations to manage anxiety and improve focus.</p>
                        <div className="flex space-x-4">
                            <button className="flex-1 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Start Guided Meditation</button>
                            <button className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">View CBT Journal Prompts</button>
                        </div>
                    </div>
                )
            };
        case 'Adult_ReproductiveHealth':
            return {
                analysis: (
                    <div className="p-4 bg-orange-100 rounded-lg border-l-4 border-orange-500 shadow-inner">
                        <h3 className="text-lg font-bold text-orange-700 mb-2 flex items-center"><Info /> Contraception Efficacy Review</h3>
                        <p className="text-gray-800 text-sm">
                            You've logged 6 months on your current oral contraceptive. Review shows **99.7% adherence rate**. We recommend scheduling your annual consultation soon.
                        </p>
                        <p className="mt-2 text-sm text-orange-600 font-semibold">
                            Actionable Insight: Review our summary of **legal reproductive rights** in your area to stay informed about recent policy changes.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Contraception & Health Rights</h4>
                        <p className="text-gray-700">Detailed information on various birth control methods, common side effects, and up-to-date legal rights information.</p>
                        <button className="w-full py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600">Explore Methods Comparison</button>
                    </div>
                )
            };
        case 'Adult_CareerBuilder':
            return {
                analysis: (
                    <div className="p-4 bg-green-100 rounded-lg border-l-4 border-green-500 shadow-inner">
                        <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center"><Info /> Career Goal Gap Analysis</h3>
                        <p className="text-gray-800 text-sm">
                            Your stated goal is promotion within 12 months. Current gap analysis highlights a **25% deficit in 'Advanced Data Visualization' skills**.
                        </p>
                        <p className="mt-2 text-sm text-green-700 font-semibold">
                            Actionable Insight: We have matched you with a mentor, **Sarah K.** (Senior Analyst), and provided links to two highly-rated online courses starting next week.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Your Professional Development Path</h4>
                        <p className="text-gray-700">Access networking events, salary negotiation templates, and connect with senior women in your industry.</p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="p-3 bg-white rounded-lg shadow-sm border border-green-100 hover:bg-green-50 cursor-pointer">Download: 5 Steps to Negotiation Success</li>
                            <li className="p-3 bg-white rounded-lg shadow-sm border border-green-100 hover:bg-green-50 cursor-pointer font-bold text-green-600">RSVP: Women in Tech Meetup (Oct 15th)</li>
                        </ul>
                    </div>
                )
            };
        case 'Adult_CommunityHub':
            return {
                analysis: (
                    <div className="p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500 shadow-inner">
                        <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center"><Info /> Engagement Insights</h3>
                        <p className="text-gray-800 text-sm">
                            You've posted 5 times in the **"Work-Life Balance"** group and received 12 helpful replies. Your primary sentiment score is **"Seeking support."**
                        </p>
                        <p className="mt-2 text-sm text-blue-600 font-semibold">
                            Actionable Insight: We suggest joining the live Q&A session on "Setting Boundaries at Work" this Wednesday.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Moderated Discussion Groups</h4>
                        <p className="text-gray-700">Connect with other women to discuss shared experiences, get advice, and find local meetups.</p>
                        <ul className="space-y-2 text-gray-700">
                            <li className="p-3 bg-white rounded-lg shadow-sm border border-blue-100 hover:bg-blue-50 cursor-pointer font-bold text-blue-600">Popular Thread: How do you handle microaggressions? (150 replies)</li>
                            <li className="p-3 bg-white rounded-lg shadow-sm border border-blue-100 hover:bg-blue-50 cursor-pointer">Start a New Topic</li>
                        </ul>
                    </div>
                )
            };
        case 'Adult_HealthCalendar':
            return {
                analysis: (
                    <div className="p-4 bg-red-100 rounded-lg border-l-4 border-red-500 shadow-inner">
                        <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center"><Info /> Appointment Compliance</h3>
                        <p className="text-gray-800 text-sm">
                            Your last general physical was **14 months ago**. The recommended interval is 12 months.
                        </p>
                        <p className="mt-2 text-sm text-red-600 font-semibold">
                            Actionable Insight: Schedule your next physical and Pap smear using the integrated booking tool before the end of the month.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Your Health Timeline</h4>
                        <p className="text-gray-700">View upcoming appointments and automated reminders for preventative health screenings based on your age.</p>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm font-mono text-gray-500">
                                [Calendar View Placeholder: Highlighted dates for next recommended checkups.]
                            </p>
                        </div>
                    </div>
                )
            };

        // --- Wellness Phase ---
        case 'Wellness_PregnancyPlanner':
            return {
                analysis: (
                    <div className="p-4 bg-pink-100 rounded-lg border-l-4 border-pink-600 shadow-inner">
                        <h3 className="text-lg font-bold text-pink-700 mb-2 flex items-center"><Info /> Fertility Window Prediction</h3>
                        <p className="text-gray-800 text-sm">
                            Based on your basal body temperature (BBT) and ovulation test logging, your **peak fertility window** is predicted to be **October 25th - October 29th**.
                        </p>
                        <p className="mt-2 text-sm text-pink-600 font-semibold">
                            Actionable Insight: Your current prenatal vitamin intake is good, but consider increasing Folate rich foods during this window. See today's suggested recipes.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Conception & Trimester Tracker</h4>
                        <p className="text-gray-700">Monitor ovulation, receive personalized health and nutrition tips for pre-conception, and track fetal development once pregnant.</p>
                        <button className="w-full py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600">Log Today's BBT & Symptoms</button>
                    </div>
                )
            };
        case 'Wellness_ParentingCenter':
            return {
                analysis: (
                    <div className="p-4 bg-teal-100 rounded-lg border-l-4 border-teal-500 shadow-inner">
                        <h3 className="text-lg font-bold text-teal-700 mb-2 flex items-center"><Info /> Child Development Summary</h3>
                        <p className="text-gray-800 text-sm">
                            Your child's tracked milestones show she is **on track for fine motor skills** but could benefit from more interactive play to enhance language development.
                        </p>
                        <p className="mt-2 text-sm text-teal-600 font-semibold">
                            Actionable Insight: Try the "Talk Back" game activity in the 18-month module to encourage new vocabulary.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Milestone Checklists & Resources</h4>
                        <p className="text-gray-700">Access age-appropriate guides, nutrition plans, and articles covering everything from infancy through school age.</p>
                        <button className="w-full py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600">View Child's Profile</button>
                    </div>
                )
            };
        case 'Wellness_MenopauseWellness':
            return {
                analysis: (
                    <div className="p-4 bg-purple-100 rounded-lg border-l-4 border-purple-500 shadow-inner">
                        <h3 className="text-lg font-bold text-purple-700 mb-2 flex items-center"><Info /> Symptom Severity Trend</h3>
                        <p className="text-gray-800 text-sm">
                            Your self-reported hot flash frequency has increased by **15% in the last month**, often correlating with high-caffeine mornings.
                        </p>
                        <p className="mt-2 text-sm text-purple-600 font-semibold">
                            Actionable Insight: Explore the **"Dietary Triggers"** resource guide and try replacing one morning coffee with herbal tea for 14 days, then re-log your symptoms.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Holistic Menopause Management</h4>
                        <p className="text-gray-700">Resources dedicated to hormonal balance, bone density preservation, sleep quality, and managing emotional changes during perimenopause and menopause.</p>
                        <button className="w-full py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600">Access Hormone Therapy Guides</button>
                    </div>
                )
            };
        case 'Wellness_Teleconsultation':
            return {
                analysis: (
                    <div className="p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500 shadow-inner">
                        <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center"><Info /> Health Priority Score: High</h3>
                        <p className="text-gray-800 text-sm">
                            Your combined symptom logging (fatigue, joint pain) results in a **high health priority score**. We recommend a virtual consult.
                        </p>
                        <p className="mt-2 text-sm text-blue-600 font-semibold">
                            Actionable Insight: Dr. Elena Rodriguez (Women's Health Specialist) has an opening tomorrow morning. Book now.
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Book a Virtual Appointment</h4>
                        <p className="text-gray-700">Connect instantly with licensed doctors specializing in women's health for non-emergency advice and prescription refills.</p>
                        <button className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Find Available Doctors</button>
                    </div>
                )
            };
        case 'Wellness_ExperienceForum':
            return {
                analysis: (
                    <div className="p-4 bg-teal-100 rounded-lg border-l-4 border-teal-500 shadow-inner">
                        <h3 className="text-lg font-bold text-teal-700 mb-2 flex items-center"><Info /> Forum Activity</h3>
                        <p className="text-gray-800 text-sm">
                            You have contributed valuable advice to the thread **"Navigating Empty Nest Syndrome"**. Thank you for your support!
                        </p>
                        <p className="mt-2 text-sm font-semibold text-teal-600">
                            Recommended Thread: "Financial Planning for Retirement and Grandchildren."
                        </p>
                    </div>
                ),
                content: (
                    <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Peer Support & Shared Wisdom</h4>
                        <p className="text-gray-700">A community space for sharing experiences about major life transitions, wisdom, and support.</p>
                        <button className="w-full py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600">Post a Question</button>
                    </div>
                )
            };
        default:
            return { analysis: <p className="text-gray-500 italic">No specific analysis available for this feature yet.</p>, content: <p className="text-gray-700">This feature is currently under active development. Check back soon for rich, analytical content!</p> };
    }
};


// --- Shared Component: Feature Card (UPDATED TO CIRCULAR) ---
const FeatureCard = ({ title, icon: Icon, onClick, colorClass }) => (
    <div
        className={`flex flex-col items-center justify-center 
                    w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 
                    rounded-full 
                    shadow-2xl 
                    transition-all transform hover:scale-[1.05] hover:ring-4 hover:ring-opacity-50
                    cursor-pointer 
                    ${colorClass} p-4 text-white font-bold text-center`}
        onClick={onClick}
        role="button"
        tabIndex="0"
        aria-label={title}
    >
        <div className="p-2 rounded-full mb-1">
            <Icon size={40} />
        </div>
        <h3 className="text-sm md:text-md font-extrabold leading-snug tracking-wider">{title}</h3>
    </div>
);

// --- Shared Component: Feature Content Page (ANIMATION ADDED HERE) ---
const FeatureContentPage = ({ title, description, accentColor, bgColor, onBack, featureName, userId, content, analysis, cycleLogs, setCycleLogs }) => {
    const [isEntering, setIsEntering] = useState(false);

    // Effect to trigger the entry animation
    useEffect(() => {
        // A small delay ensures the component is mounted with initial classes before the transition is triggered
        const timer = setTimeout(() => {
            setIsEntering(true);
        }, 50); 
        return () => clearTimeout(timer);
    }, []);

    // Mock handler for "Logout" in a no-auth environment
    const handleMockLogout = () => {
        // In a real app, this would sign out. Here, we just log and navigate back to the primary view.
        console.log("Mock Logout: Clearing view state.");
        onBack('EarlyTeen');
    };
    
    // Check if the content is a React element (like the MenstrualTrackerModule or ChatbotModule)
    const isInteractiveModule = (React.isValidElement(content) && content.type === MenstrualTrackerModule) || (React.isValidElement(content) && content.type === ChatbotModule);

    // Use a cloned element to pass props for interactive module, ensuring we only pass relevant props
    let contentToRender = content;
    if (React.isValidElement(content) && content.type === MenstrualTrackerModule) {
        contentToRender = React.cloneElement(content, { cycleLogs, setCycleLogs, userId }); 
    } else if (React.isValidElement(content) && content.type === ChatbotModule) {
        contentToRender = content; // Chatbot manages its own state
    }

    // Dynamic classes for the main content block's entry animation
    const contentEntryClasses = isEntering 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-6 scale-[0.98]';


    return (
        <div className={`p-5 min-h-screen ${bgColor}`}>
            <header className="flex items-center justify-between py-4 mb-6">
                <button 
                    onClick={() => onBack(accentColor.includes('pink') ? 'EarlyTeen' : accentColor.includes('red') ? 'Adult' : 'Wellness')}
                    className={`p-2 rounded-full transition duration-150 ${accentColor} bg-white/70 hover:bg-white/90 shadow-md`}
                    aria-label="Go back to dashboard"
                >
                    <ArrowLeft />
                </button>
                <div className='flex items-center'>
                    <h1 className={`text-2xl font-bold ml-4 hidden sm:block ${accentColor}`}>{title}</h1>
                    <button
                        onClick={handleMockLogout}
                        className="ml-4 p-2 bg-white rounded-full text-gray-500 hover:text-red-500 shadow-md transition-colors"
                        aria-label="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>
            
            {/* Main Content Area with Entry Animation */}
            <div 
                className={`bg-white p-6 rounded-xl shadow-2xl min-h-[70vh] border-t-4 border-current transition-all duration-700 ease-out transform ${contentEntryClasses}`} 
                style={{ borderColor: accentColor.replace('text-', '#').replace('600', '400').replace('700', '500') }}
            >
                <p className="text-gray-600 mb-6 border-b pb-4">{description}</p>
                
                {/* Analysis Block */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Personalized Health Analysis</h2>
                <div className="mb-8">
                    {analysis}
                </div>

                {/* Main Feature Content */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">👋 Your {featureName} Module</h2>
                    <div className="text-gray-700">
                        {contentToRender}
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t text-sm text-gray-400">
                    User ID: <span className="font-mono text-xs break-all">{userId}</span>
                </div>
            </div>
        </div>
    );
};

// --- Mock Firestore Listener (Unchanged) ---
const usePhaseData = (phaseName, userId) => {
    const lastUpdated = new Date().toLocaleTimeString();
    const statusMessage = `Running in static demo mode. Persistence via localStorage.`;
    
    // Simulate a brief loading state on first load only
    const [mockLoading, setMockLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setMockLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return { 
        statusMessage, 
        lastUpdated, 
        isLoading: mockLoading 
    };
};

// --- Dashboard Components ---

// DashboardHeader updated with a default animation class for phase switching
const DashboardHeader = ({ title, subTitle, userId, accentColor, headerBg, onLogout, isAnimated = false }) => (
    <header className={`flex justify-between items-center py-4 px-4 bg-white shadow-lg rounded-xl mb-6 transition-opacity duration-500 fade-in`}>
        <h1 className={`text-2xl font-extrabold ${accentColor} ${isAnimated ? 'pulse-subtle' : ''}`}>
            {title} <span className="text-sm font-medium block leading-none" style={{ color: headerBg.replace('bg-', '#').replace('400', '500') }}>{subTitle}</span>
        </h1>
        <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-gray-500 truncate max-w-[100px] font-medium">{userId || 'User ID'}</span>
                <span className="text-xs text-gray-400">DEMO MODE</span>
            </div>
            <button
                onClick={onLogout}
                className="p-2 rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-md bg-gray-50"
                aria-label="Logout"
            >
                <LogOut size={20} />
            </button>
        </div>
    </header>
);

// --- Phase 1: Early Teen Dashboard (Circular Sections) ---
const EarlyTeenDashboard = ({ userId, savePhaseData, navigate, onLogout }) => {
    const { statusMessage, lastUpdated } = usePhaseData('early_teen', userId);

    const handleFeatureClick = (featureName) => {
        savePhaseData(featureName);
        navigate(`Teen_${featureName}`);
    };

    return (
        // Added fade-in class to the dashboard itself for smooth phase transition
        <div className={`p-5 min-h-screen ${P1_PRIMARY_BG} shadow-inner fade-in`}>
            <DashboardHeader 
                title="HerLife" 
                subTitle="Phase 1: Early Teen (Growth & Discovery)" 
                userId={userId} 
                accentColor={P1_ACCENT_COLOR}
                headerBg={P1_HEADER_BG}
                onLogout={onLogout}
                isAnimated={true}
            />

            <div className={`text-center p-3 mb-10 rounded-lg shadow-inner ${P1_HEADER_BG} text-white`}>
                <p className="font-semibold">Welcome! Let's explore your journey.</p>
                <p className="text-xs text-sky-800 italic mt-1">
                    Status: {statusMessage} (Last Refreshed: {lastUpdated})
                </p>
            </div>

            {/* Circular Feature Grid - Centered */}
            <div className="flex justify-center mb-10">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 lg:gap-12">
                    <FeatureCard 
                        title="Cycle Tracker" 
                        icon={HeartPulse} 
                        onClick={() => handleFeatureClick('MenstrualTracker')} 
                        colorClass="bg-pink-500 hover:ring-pink-300" 
                    />
                    <FeatureCard 
                        title="Modules" 
                        icon={GraduationCap} 
                        onClick={() => handleFeatureClick('EducationalModules')} 
                        colorClass="bg-sky-500 hover:ring-sky-300" 
                    />
                    <FeatureCard 
                        title="Ask Ava (AI)" 
                        icon={MessageCircleQuestion} 
                        onClick={() => handleFeatureClick('Chatbot')} 
                        colorClass="bg-purple-500 hover:ring-purple-300" 
                    />
                    <FeatureCard 
                        title="Confidence" 
                        icon={Sparkles} 
                        onClick={() => handleFeatureClick('ConfidenceCorner')} 
                        colorClass="bg-yellow-500 hover:ring-yellow-300" 
                    />
                </div>
            </div>

            <div className="mt-8 p-4 bg-white rounded-xl shadow-lg border-t-4 border-sky-400">
                <h2 className={`text-xl font-bold ${P1_ACCENT_COLOR} mb-2`}>👨‍👩‍👧 Parent Guide Section</h2>
                <p className="text-gray-700 text-sm">
                    A safe place for parents to find tips on how to support their daughters through puberty.
                </p>
                <button className="mt-3 w-full py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-150 shadow-md" onClick={() => handleFeatureClick('ParentGuide')}>
                    Access Guides
                </button>
            </div>
        </div>
    );
};


// --- Phase 2: Adult Dashboard (Circular Sections) ---
const AdultDashboard = ({ userId, savePhaseData, navigate, onLogout }) => {
    const { statusMessage, lastUpdated } = usePhaseData('adult', userId);

    const handleFeatureClick = (featureName) => {
        savePhaseData(featureName);
        navigate(`Adult_${featureName}`);
    };

    return (
        // Added fade-in class to the dashboard itself for smooth phase transition
        <div className={`p-5 min-h-screen ${P2_PRIMARY_BG} shadow-inner fade-in`}>
            <DashboardHeader 
                title="HerLife" 
                subTitle="Phase 2: Adult (Dynamic & Focused)" 
                userId={userId} 
                accentColor={P2_ACCENT_COLOR}
                headerBg={P2_HEADER_BG}
                onLogout={onLogout}
            />

            <div className={`text-center p-3 mb-10 rounded-lg shadow-inner ${P2_HEADER_BG} text-white`}>
                <p className="font-semibold">Focus on balance, career, and community.</p>
                <p className="text-xs text-red-100 italic mt-1">
                    Status: {statusMessage} (Last Refreshed: {lastUpdated})
                </p>
            </div>
            
            {/* Circular Feature Grid - Centered (Energy Flow Animation surrounds this area) */}
            <div className="flex justify-center mb-10 energy-flow-border">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 lg:gap-12 p-4 md:p-6 lg:p-8">
                    <FeatureCard 
                        title="Mental Health" 
                        icon={Zap} 
                        onClick={() => handleFeatureClick('MentalHealth')} 
                        colorClass="bg-red-600 hover:ring-red-300" 
                    />
                    <FeatureCard 
                        title="Repro Health" 
                        icon={Globe} 
                        onClick={() => handleFeatureClick('ReproductiveHealth')} 
                        colorClass="bg-orange-500 hover:ring-orange-300" 
                    />
                    <FeatureCard 
                        title="Career Builder" 
                        icon={Briefcase} 
                        onClick={() => handleFeatureClick('CareerBuilder')} 
                        colorClass="bg-green-600 hover:ring-green-300" 
                    />
                    <FeatureCard 
                        title="Community Hub" 
                        icon={Users} 
                        onClick={() => handleFeatureClick('CommunityHub')} 
                        colorClass="bg-blue-600 hover:ring-blue-300" 
                    />
                </div>
            </div>

            <div className="mt-8 p-4 bg-white rounded-xl shadow-lg border-t-4 border-red-400">
                <h2 className={`text-xl font-bold ${P2_ACCENT_COLOR} mb-2`}>📅 Health Calendar</h2>
                <p className="text-gray-700 text-sm">
                    Automated reminders for essential health checkups (Pap smear, physical exams, etc.) to keep your health on track.
                </p>
                <button className="mt-3 w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-150 shadow-md" onClick={() => handleFeatureClick('HealthCalendar')}>
                    Set Reminders
                </button>
            </div>
        </div>
    );
};


// --- Phase 3: Post-Marriage/Wellness Dashboard (Circular Sections) ---
const WellnessDashboard = ({ userId, savePhaseData, navigate, onLogout }) => {
    const { statusMessage, lastUpdated } = usePhaseData('wellness', userId);

    const handleFeatureClick = (featureName) => {
        savePhaseData(featureName);
        navigate(`Wellness_${featureName}`);
    };

    return (
        // Added fade-in class to the dashboard itself for smooth phase transition
        <div className={`p-5 min-h-screen zen-gradient-shift shadow-inner fade-in`}> 
            <DashboardHeader 
                title="HerLife" 
                subTitle="Phase 3: Wellness (Calm & Flowing)" 
                userId={userId} 
                accentColor={P3_ACCENT_COLOR}
                headerBg={P3_HEADER_BG}
                onLogout={onLogout}
            />

            <div className={`text-center p-3 mb-10 rounded-lg shadow-inner ${P3_HEADER_BG} text-white`}>
                <p className="font-semibold">Guidance for family planning and long-term health.</p>
                <p className="text-xs text-teal-800 italic mt-1">
                    Status: {statusMessage} (Last Refreshed: {lastUpdated})
                </p>
            </div>

            {/* Circular Feature Grid - Centered */}
            <div className="flex justify-center mb-10">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 lg:gap-12">
                    <FeatureCard 
                        title="Pregnancy" 
                        icon={Baby} 
                        onClick={() => handleFeatureClick('PregnancyPlanner')} 
                        colorClass="bg-pink-600 hover:ring-pink-300" 
                    />
                    <FeatureCard 
                        title="Parenting" 
                        icon={BookOpen} 
                        onClick={() => handleFeatureClick('ParentingCenter')} 
                        colorClass="bg-teal-600 hover:ring-teal-300" 
                    />
                    <FeatureCard 
                        title="Menopause" 
                        icon={Shield} 
                        onClick={() => handleFeatureClick('MenopauseWellness')} 
                        colorClass="bg-purple-700 hover:ring-purple-300" 
                    />
                    <FeatureCard 
                        title="Teleconsult" 
                        icon={MessageSquare} 
                        onClick={() => handleFeatureClick('Teleconsultation')} 
                        colorClass="bg-blue-700 hover:ring-blue-300" 
                    />
                </div>
            </div>

            <div className="mt-8 p-4 bg-white rounded-xl shadow-lg border-t-4 border-teal-400">
                <h2 className={`text-xl font-bold ${P3_ACCENT_COLOR} mb-2`}>💬 Experience Forum</h2>
                <p className="text-gray-700 text-sm">
                    Peer sharing and support forum for family life, wellness, and experienced motherhood advice.
                </p>
                <button className="mt-3 w-full py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-150 shadow-md" onClick={() => handleFeatureClick('ExperienceForum')}>
                    Visit Forums
                </button>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    // Phase and view state are all we need now
    const [userId] = useState(mockUserId);
    const [currentPhase, setCurrentPhase] = useState('EarlyTeen'); 
    const [currentView, setCurrentView] = useState('EarlyTeen'); 
    
    // State for local data logging (simulating persistence via localStorage)
    const [cycleLogs, setCycleLogs] = useState(() => {
        try {
            const saved = localStorage.getItem(`herlife_cyclelogs_${userId}`);
            // Ensure logs are sorted by date descending on load
            const initialLogs = saved ? JSON.parse(saved) : [];
            return initialLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (e) {
            console.error("Could not load logs from localStorage", e);
            return [];
        }
    });

    // Mocks the database write function
    const savePhaseData = useCallback((feature) => {
        console.log(`[Demo] Simulating save to database for: ${currentPhase} -> ${feature}`);
    }, [currentPhase]);

    // Helper to switch the view
    const navigate = (view) => {
        if (view === 'EarlyTeen' || view === 'Adult' || view === 'Wellness') {
            setCurrentPhase(view);
        }
        setCurrentView(view);
    };

    const handleMockLogout = useCallback(() => {
        console.log("Mock Logout executed. Resetting to default phase.");
        setCurrentPhase('EarlyTeen');
        setCurrentView('EarlyTeen');
    }, []);

    // --- Dynamic Dashboard Rendering ---
    const renderContent = () => {
        const commonProps = { userId, savePhaseData, navigate, onLogout: handleMockLogout, cycleLogs, setCycleLogs };
        
        // Configuration for feature pages (expanded for completeness)
        const phaseToPageMap = {
            'Teen_MenstrualTracker': { title: "Menstrual Tracker", description: "Track your cycle, symptoms, and receive personalized hygiene tips.", accent: P1_ACCENT_COLOR, bg: P1_PRIMARY_BG, featureName: "Cycle Tracker" },
            'Teen_EducationalModules': { title: "Educational Lessons", description: "Engaging animated videos and articles about puberty and body changes.", accent: P1_ACCENT_COLOR, bg: P1_PRIMARY_BG, featureName: "Modules" },
            'Teen_Chatbot': { title: "Anonymous Health Chatbot", description: "A private, AI-powered space to ask sensitive health questions safely.", accent: P1_ACCENT_COLOR, bg: P1_PRIMARY_BG, featureName: "Ask Ava (AI)" },
            'Teen_ConfidenceCorner': { title: "Confidence Corner", description: "Daily affirmations, self-esteem building activities, and mood journaling.", accent: P1_ACCENT_COLOR, bg: P1_PRIMARY_BG, featureName: "Confidence" },
            'Teen_ParentGuide': { title: "Parent Guide Access", description: "Secure section providing resources and communication tips for parents.", accent: P1_ACCENT_COLOR, bg: P1_PRIMARY_BG, featureName: "Parent Guide" },
            'Adult_MentalHealth': { title: "Mental Health Tools", description: "Advanced mood charting, guided meditation, and immediate crisis resources.", accent: P2_ACCENT_COLOR, bg: P2_PRIMARY_BG, featureName: "Mental Health" },
            'Adult_ReproductiveHealth': { title: "Reproductive Health Hub", description: "Information on contraception options, fertility awareness, and health rights.", accent: P2_ACCENT_COLOR, bg: P2_PRIMARY_BG, featureName: "Repro Health" },
            'Adult_CareerBuilder': { title: "Career & Finance Builder", description: "Templates for resumes/negotiation, networking event access, and financial planning.", accent: P2_ACCENT_COLOR, bg: P2_PRIMARY_BG, featureName: "Career Builder" },
            'Adult_CommunityHub': { title: "Moderated Community", description: "Connect with peers for discussion on work-life balance and social issues.", accent: P2_ACCENT_COLOR, bg: P2_PRIMARY_BG, featureName: "Community Hub" },
            'Adult_HealthCalendar': { title: "Health Appointment Calendar", description: "Manage and receive reminders for regular health checkups and vaccinations.", accent: P2_ACCENT_COLOR, bg: P2_PRIMARY_BG, featureName: "Health Calendar" },
            'Wellness_PregnancyPlanner': { title: "Pregnancy Planning", description: "Comprehensive tracking for fertility, prenatal care information, and baby preparation.", accent: P3_ACCENT_COLOR, bg: P3_PRIMARY_BG, featureName: "Pregnancy" },
            'Wellness_ParentingCenter': { title: "Parenting Center", description: "Milestone checklists and nutrition guides." , accent: P3_ACCENT_COLOR, bg: P3_PRIMARY_BG, featureName: "Parenting" },
            'Wellness_MenopauseWellness': { title: "Menopause Health", description: "Dedicated resources for managing hormonal changes, nutrition, and long-term health.", accent: P3_ACCENT_COLOR, bg: P3_PRIMARY_BG, featureName: "Menopause" },
            'Wellness_Teleconsultation': { title: "Teleconsultation Services", description: "Book and attend virtual appointments with women's health specialists.", accent: P3_ACCENT_COLOR, bg: P3_PRIMARY_BG, featureName: "Teleconsult" },
            'Wellness_ExperienceForum': { title: "Experience Forum", description: "A private forum for sharing and seeking advice from experienced women on life changes.", accent: P3_ACCENT_COLOR, bg: P3_PRIMARY_BG, featureName: "Experience Forum" },
        };

        if (currentView in phaseToPageMap) {
            const config = phaseToPageMap[currentView];
            // Pass the state setters and current logs to getDetailedContent
            const contentData = getDetailedContent(currentView, cycleLogs, setCycleLogs, userId);
            
            return (
                <FeatureContentPage 
                    title={config.title}
                    description={config.description}
                    accentColor={config.accent}
                    bgColor={config.bg}
                    onBack={() => navigate(currentPhase)}
                    featureName={config.featureName}
                    userId={userId}
                    content={contentData.content}
                    analysis={contentData.analysis}
                    onLogout={handleMockLogout}
                    cycleLogs={cycleLogs}
                    setCycleLogs={setCycleLogs}
                />
            );
        }

        // Dashboard View Mappings
        switch (currentView) {
            case 'EarlyTeen':
                return <EarlyTeenDashboard {...commonProps} />;
            case 'Adult':
                return <AdultDashboard {...commonProps} />;
            case 'Wellness':
                return <WellnessDashboard {...commonProps} />;
            default:
                return <EarlyTeenDashboard {...commonProps} />;
        }
    }

    // Determine phase for footer
    const currentPhaseKey = currentPhase.replace('PostMarriage', 'Wellness'); 

    return (
        <div className="font-sans antialiased min-h-screen pb-20 bg-gray-50">
            {/* Load Tailwind CSS from CDN */}
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`
                /* Font Inter is assumed via Tailwind */
                .font-sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }
                
                /* Global Background Style (Subtle Texture/Gradient) */
                body {
                    background: linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%);
                }

                /* General Fade-in for Dasboards (when switching phases) */
                .fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* --- Phase 1 Animation: Subtle Pulse (Growth & Fluctuation) --- */
                @keyframes pulse-subtle {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.01); opacity: 0.95; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .pulse-subtle {
                    animation: pulse-subtle 2.5s infinite ease-in-out;
                    will-change: transform, opacity;
                }

                /* --- Phase 2 Animation: Energy Flow (Dynamic & Focused) --- */
                /* Base style for the border effect */
                .energy-flow-border {
                    border: 4px solid transparent;
                    border-radius: 2rem; /* Adjusted for overall shape */
                    background-clip: padding-box;
                    position: relative;
                    z-index: 10;
                    background: white; /* Ensure content is on top of the gradient */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
                    transition: all 0.5s;
                }
                /* Use a pseudo-element for the animated gradient border */
                .energy-flow-border::before {
                    content: '';
                    position: absolute;
                    top: -4px; bottom: -4px; left: -4px; right: -4px;
                    background: linear-gradient(45deg, #f97316, #ef4444, #f97316); /* Orange to Red */
                    background-size: 200% 200%;
                    border-radius: 2rem; /* Matches container */
                    z-index: -1;
                    animation: energy-flow 4s linear infinite;
                    opacity: 0.5;
                }
                @keyframes energy-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* --- Phase 3 Animation: Zen Gradient Shift (Calm & Flowing) --- */
                .zen-gradient-shift {
                    background: linear-gradient(135deg, #f3e8ff, #ccfbf1, #f3e8ff); /* Purple-Teal colors */
                    background-size: 400% 400%;
                    animation: zen-flow 30s ease infinite; /* Very slow movement */
                }
                @keyframes zen-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

            `}</style>
            
            {renderContent()}

            {/* Simple Phase Selector Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl flex justify-around p-3 z-10">
                <button 
                    className={`flex flex-col items-center p-2 rounded-lg text-sm transition-colors font-semibold ${currentPhaseKey === 'EarlyTeen' ? 'text-pink-600 bg-pink-100 shadow-inner' : 'text-gray-500 hover:text-pink-500 hover:bg-gray-50'}`}
                    onClick={() => navigate('EarlyTeen')}
                >
                    <Home size={20} />
                    Teen Phase
                </button>
                <button 
                    className={`flex flex-col items-center p-2 rounded-lg text-sm transition-colors font-semibold ${currentPhaseKey === 'Adult' ? 'text-red-600 bg-red-100 shadow-inner' : 'text-gray-500 hover:text-red-500 hover:bg-gray-50'}`}
                    onClick={() => navigate('Adult')}
                >
                    <User size={20} />
                    Adult Phase
                </button>
                <button 
                    className={`flex flex-col items-center p-2 rounded-lg text-sm transition-colors font-semibold ${currentPhaseKey === 'Wellness' ? 'text-purple-600 bg-purple-100 shadow-inner' : 'text-gray-500 hover:text-purple-500 hover:bg-gray-50'}`}
                    onClick={() => navigate('Wellness')}
                >
                    <HeartPulse size={20} />
                    Wellness Phase
                </button>
            </footer>
        </div>
    );
}
