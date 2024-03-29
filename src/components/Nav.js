import React, {useState} from 'react'
import {useNavigate, useLocation} from "react-router-dom";

export default function Nav() {
  let navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleNav = (item) => {
    setSelected(item);
    navigate(item);
  }

  return (
    <>
      <div className="justify-between item-center mb-5 text-primary">
        <div className="justify-left items-center text-sm w-full grid grid-cols-5 xs:grid-cols-5 gap-1" >
          <button type="button"
            onClick={() => {
              handleNav("/chat")
            }}
            className={"dark:bg-white shadow-md rounded py-1 " + (selected === "/chat" ? "dark:bg-primary bg-primary text-white" : "")}
          >Chat</button>
          <button type="button"
            onClick={() => {
              handleNav("/gmail")
            }}
            className={"dark:bg-white shadow-md rounded py-1 " + (selected === "/gmail" ? "dark:bg-primary bg-primary text-white" : "")}
          >Gmail</button>
          <button type="button"
            onClick={() => {
              handleNav("/outlook")
            }}
            className={"dark:bg-white shadow-md rounded py-1 " + (selected === "/outlook" ? "dark:bg-primary bg-primary text-white" : "")}
          >Outlook</button>
          <button type="button"
            onClick={() => {
              handleNav("/icloud")
            }}
            className={"dark:bg-white shadow-md rounded py-1 " + (selected === "/icloud" ? "dark:bg-primary bg-primary text-white" : "")}
          >iCloud</button>
          <button type="button"
            onClick={() => {
              handleNav("/clinica")
            }}
            className={"dark:bg-white shadow-md rounded py-1 " + (selected === "/clinica" ? "dark:bg-primary bg-primary text-white" : "")}
          >Clinica</button>
        </div>
      </div>
    </>
  )
}
