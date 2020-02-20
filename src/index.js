import React, { useState } from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import './style.css'

const MultilineText = ({ label, value, onChange }) => (
  <div>
    <div><label>{label}</label></div>
    <div><textarea rows='5' style={{ width: '100%' }} value={value} onChange={onChange}></textarea></div>
  </div>
)

const Popup = ({ children, show, onDismiss }) => {
  return show ? (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} onClick={onDismiss}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        minWidth: window.innerWidth * 0.6,
        minHeight: window.innerHeight * 0.1,
        boxShadow: '0 0 8px black'
      }}>
        {children}
      </div>
    </div>
  ) : null
}

const App = () => {
  const [date, setDate] = useState(new Date())
  const [workingOn, setWorkingOn] = useState('')
  const [blockers, setBlockers] = useState('')
  const [pblockers, setPBlockers] = useState('')
  const [betterLife, setBetterLife] = useState('')
  const [popupMessage, setPopupMessage] = useState('')
  const [popupVisible, setPopupVisible] = useState(false)

  const changeDate = e => {
    setDate(e.target.value)
  }

  const changeWorkingOn = e => {
    setWorkingOn(e.target.value)
  }

  const changeBlockers = e => {
    setBlockers(e.target.value)
  }

  const changePBlockers = e => {
    setPBlockers(e.target.value)
  }

  const changeBetterLife = e => {
    setBetterLife(e.target.value)
  }

  const showPopup = message => {
    setPopupMessage(message)
    setPopupVisible(true)
  }

  const hidePopup = () => {
    setPopupVisible(false)
  }

  const slackMarkup = [
      `*date:* ${moment(date).format('MM/DD/YY')}`,
      `*working on:* ${workingOn}`,
      `*blockers:* ${blockers}`,
      `*potential blockers:* ${pblockers}`,
      `*life would be better if:* ${betterLife}`,
    ].join('\n')

  return (
    <div style={{ padding: 10 }}>
      <h1>Slack Standup Assistant</h1>
      <div style={{ marginBottom: 20 }}>
        <div><label>Date: {moment(date).format('MM/DD/YY')}</label></div>
      </div>

      <MultilineText
        label='Working on:'
        value={workingOn}
        onChange={changeWorkingOn}
      />

      <MultilineText
        label='Blockers:'
        value={blockers}
        onChange={changeBlockers}
      />

      <MultilineText
        label='Potential Blockers:'
        value={pblockers}
        onChange={changePBlockers}
      />

      <MultilineText
        label='Life would be better if:'
        value={betterLife}
        onChange={changeBetterLife}
      />

      <div>
        <div style={{ marginBottom: 10 }}><label>Slack Standup Markup:</label></div>
        <button className='btn' onClick={() => {
          navigator.clipboard.writeText(slackMarkup).then(r => {
            showPopup('Copied standup content formatted for slack to your clipboard.')
          })
        }}>Copy to Clipboard</button>
        <div>
          <pre style={{
            padding: 10,
            backgroundColor: '#ddd',
            fontFamily: 'monospace',
            fontSize: 16
          }}>{slackMarkup}</pre>
        </div>
        
      </div>

      <Popup show={popupVisible} onDismiss={hidePopup}>
        {popupMessage}
      </Popup>
    </div>
  )
}

render(<App />, document.getElementById('root'))
