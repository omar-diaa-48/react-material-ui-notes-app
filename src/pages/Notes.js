import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'

export default function Notes() {

  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))

  }, [])

  const handleDelete = async (noteId) => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method:'DELETE'
    })

    const newNotes = notes.filter(note => note.id !== noteId)
    setNotes(newNotes)
  }

  const breakPoints = {
    default:3,
    1100:2,
    700:1
  }

  return (
    <div>
      <Masonry 
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div item key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </div>
  )
}
