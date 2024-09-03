import { Card, Input, CardBody, CardFooter, CardHeader, Divider, Heading, Select, Text } from '@chakra-ui/react'
import CreateNoteForm from './components/CreateNoteForm'
import Note from './components/Note'
import Filters from './components/Filters'
import { useEffect, useState } from 'react'
import { createNote, fetchNotes } from './services/note'
import moment from 'moment/moment'

function App() {

  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc"
  })
  useEffect( () => {
    const fetchData = async () => {
      let notes = await fetchNotes(filter);
      setNotes(notes);
    };

    fetchData();
  }, [filter]);

  const onCreate = async (note) => {
    await createNote(note);
    let notes = await fetchNotes(filter);
    setNotes(notes);
  }

  return (
    <section className="p-8 flex flex-row justify-start item-start gap-12">
      <div className='flex flex-col w-1/3 gap-10'>
        <CreateNoteForm onCreate={onCreate}/>
        <Filters filter={filter} setFilter={setFilter}/>
      </div>

        <ul className='flex flex-col gap-5 w-1/2'>
          {notes.map((n) => (
            <li key={n.id}>
              <Note 
              title={n.title} 
              description={n.description} 
              createdAt={moment(n.createdAt).format("DD/MM/YYYY h:mm:ss")}
              />
            </li>
          ))}
        </ul>
    </section>
  )
}



export default App
