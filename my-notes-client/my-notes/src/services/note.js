import axios from 'axios'

export const fetchNotes = async(filter) => {
    try {
        const response = await axios.get('http://localhost:5204/notes', {
            params: {
                search: filter?.search,
                sortItem: filter?.sortItem,
                sortOrder: filter?.sortOrder
            }
        });
        return response.data.notes;
    } catch(e) {
        console.error(e);
    }
}

export const createNote = async(note) => {
    try {
        const response = await axios.post('http://localhost:5204/notes', note);
        return response.status;
    } catch(e) {
        console.error(e);
    }
}