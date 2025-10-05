import React, { useState } from 'react'

const mockUserId = 'MOCK_USER_1234567890_HERLIFE_DEMO'

function MenstrualTrackerModule({ userId, cycleLogs, setCycleLogs }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [logType, setLogType] = useState('Period Start')
  const [symptom, setSymptom] = useState('Cramps')
  const [notes, setNotes] = useState('')

  const handleLog = (e) => {
    e.preventDefault()
    const logEntry = { id: Date.now(), date, type: logType, symptom: logType === 'Symptom' ? symptom : null, notes, loggedAt: new Date().toISOString() }
    const newLogs = [...cycleLogs, logEntry].sort((a, b) => new Date(b.date) - new Date(a.date))
    setCycleLogs(newLogs)
    localStorage.setItem(`herlife_cyclelogs_${userId}`, JSON.stringify(newLogs))
    setDate(today)
    setLogType('Period Start')
    setSymptom('Cramps')
    setNotes('')
  }

  return (
    <div>
      <h3>Log Today's Status</h3>
      <form onSubmit={handleLog} className="card" style={{marginTop:10}}>
        <div style={{marginBottom:8}}>
          <label>Date</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} max={today} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}} />
        </div>
        <div style={{marginBottom:8}}>
          <label>What are you logging?</label>
          <select value={logType} onChange={(e)=>setLogType(e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}}>
            <option>Period Start</option>
            <option>Period End</option>
            <option>Symptom</option>
          </select>
        </div>
        {logType === 'Symptom' && (
          <div style={{marginBottom:8}}>
            <label>Select Symptom</label>
            <select value={symptom} onChange={(e)=>setSymptom(e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}}>
              <option>Cramps</option>
              <option>Headache</option>
              <option>Fatigue</option>
              <option>Mood Swings</option>
              <option>Bloating</option>
            </select>
          </div>
        )}
        <div style={{marginBottom:8}}>
          <label>Notes</label>
          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={2} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}} />
        </div>
        <button className="btn" type="submit">Log Entry</button>
      </form>

      <div className="card" style={{marginTop:12}}>
        <h4>Recent Logs ({cycleLogs.length})</h4>
        {cycleLogs.length === 0 ? <p style={{color:'#6b7280',fontStyle:'italic'}}>No entries logged yet.</p> : (
          <div>
            {cycleLogs.slice(0,5).map(log=> (
              <div key={log.id} style={{padding:8,border:'1px solid #f3f4f6',borderRadius:8,marginBottom:8}}>
                <div style={{fontWeight:700}}>{log.date} <span style={{color:'#7c3aed',marginLeft:8}}>({log.type})</span></div>
                {log.symptom && <div style={{fontSize:12,color:'#374151'}}>Symptom: {log.symptom}</div>}
                {log.notes && <div style={{fontSize:12,color:'#6b7280',fontStyle:'italic'}}>{log.notes}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function App(){
  const [userId] = useState(mockUserId)
  const [cycleLogs, setCycleLogs] = useState(()=>{ try{ const s = localStorage.getItem(`herlife_cyclelogs_${mockUserId}`); return s?JSON.parse(s):[] }catch(e){return []} })

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>HerLife — Full Demo</h1>
        <div style={{fontSize:12,color:'#6b7280'}}>User ID: <span style={{fontFamily:'monospace'}}>{userId}</span></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:20}}>
        <div className="card">
          <h2>Cycle Tracker</h2>
          <MenstrualTrackerModule userId={userId} cycleLogs={cycleLogs} setCycleLogs={setCycleLogs} />
        </div>

        <div className="card">
          <h2>Other Modules (Demo)</h2>
          <p style={{color:'#6b7280'}}>This is a buildable React project that includes your tracker UI. Expand other components from the original `nums.jsx` as needed.</p>
        </div>
      </div>

    </div>
  )
}
