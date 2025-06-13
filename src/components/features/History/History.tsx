import React from 'react'
export default function History() {
  return (
    <div  className='h-full bg-accent-foreground'>
      <ul className="list bg-base-100 shadow-md">
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide text-gray-50">Past Conversations</li>
        <li className="list-row cursor-pointer">
          <div className="text-4xl font-thin opacity-30 tabular-nums text-gray-50">01</div>
          <div className="list-col-grow">
=            <div className="textarea-lg uppercase font-semibold opacity-80 text-gray-50">Remaining Reason</div>
          </div>
          <button className="btn btn-square btn-ghost">
          </button>
        </li>
      </ul>

    </div>
  )
}
