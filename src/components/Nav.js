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
      <div className="justify-between item-center mb-5">
        <div className="justify-left items-center text-sm w-full grid grid-cols-2 xs:grid-cols-4" >
          <button type="button"
            onClick={() => {
              handleNav("/chat")
            }}
            className={"dark:bg-white shadow-md rounded px-2 mr-4 py-1 my-1 " + (selected === "/chat" ? "dark:bg-primary bg-primary text-white" : "")}
          >Chat</button>
          <button type="button"
            onClick={() => {
              handleNav("/google")
            }}
            className={"dark:bg-white shadow-md rounded px-2 mr-4 py-1 my-1 " + (selected === "/google" ? "dark:bg-primary bg-primary text-white" : "")}
          >Google</button>
          <button type="button"
            onClick={() => {
              handleNav("/outlook")
            }}
            className={"dark:bg-white shadow-md rounded px-2 mr-4 py-1 my-1 " + (selected === "/outlook" ? "dark:bg-primary bg-primary text-white" : "")}
          >Outlook</button>
          <button type="button"
            onClick={() => {
              handleNav("/icloud")
            }}
            className={"dark:bg-white shadow-md rounded px-2 mr-4 py-1 my-1 " + (selected === "/icloud" ? "dark:bg-primary bg-primary text-white" : "")}
          >iCloud</button>
        </div>
      </div>
    </>
  )
}
