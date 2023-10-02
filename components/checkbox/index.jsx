import React from 'react'

//Icons
import { FaCheck } from "react-icons/fa";

const Checkbox = ({checked}) => {
  return (
    <div className={`${checked && `check`} checkbox`}>{checked && <FaCheck />}</div>
  )
}

export default Checkbox