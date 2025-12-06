import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="btn btn-show"
          onClick={toggleVisibility}
        >
          {props.showBtnLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="btn btn-hide"
          onClick={toggleVisibility}
        >
          {props.hideBtnLabel}
        </button>
      </div>
    </div>
  )
}

export default Togglable
