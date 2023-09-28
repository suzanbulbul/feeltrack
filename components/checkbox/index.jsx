import React from 'react'

//Icons
import { AiOutlineCheck } from "react-icons/ai";

const Checkbox = ({checked}) => {
  return (
    <div className={`${checked && `check`} checkbox`}>{checked && <AiOutlineCheck />}</div>
  )
}

export default Checkbox