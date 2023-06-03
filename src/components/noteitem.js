import React from 'react'

function notesItem(props) {
  const {note} = props;

  return (
      <div className="col-md-3 my-3" >
      {/* style={{width: "18rem"}} */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default notesItem
