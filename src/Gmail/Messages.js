import React from 'react'

export default function Messages({
  message,
  handleEmail
}) {
  const from = message.result.payload.headers.find((item) => item.name === 'From').value;
  const subject = message.result.payload.headers.find((item) => item.name === 'Subject').value;
  const from_name = (from) ? from.substr(0, from.indexOf(' <')) : "";
  const date = new Date(message.result.payload.headers.find((item) => item.name === 'Date').value);
  const date_value = date.toLocaleString("en-US", {month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'});
  return (
    <button
      type="button"
      onClick={() => {
        handleEmail(message.result.id)
      }}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded w-full">
      <div className="flex justify-between">
        <div className="text-base block font-medium text-gray-600 dark:text-white text-left truncate overflow-hidden">
          {from_name ? from_name : from}
        </div>
        <div className="text-sm text-gray-600 w-32 text-right">{date_value}</div>
      </div>
      <div className="text-sm text-gray-600 dark:text-slate-400 text-left truncate overflow-hidden">
        {subject}</div>
    </button >
  )
}
