import {useState} from 'react'

function Form(props){
   const [name, setName] = useState("")
   const [URL, setURL] = useState("")

    const handleNameChange = (event) => {
            console.log(event.target.value)
            setName(event.target.value)
    }

    const handleURLchange = (event) => {
                console.log(event.target.value)
                setURL(event.target.value)
    
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        // Convert URL to lowercase 'url' to match database schema
        props.onNewLink({name, url: URL})
        
        // Clear form after submission
        setName("")
        setURL("")
    }

    return(
    <form onSubmit={handleSubmit}> 
        <label for="Link Name">Link Name:</label>
        <input type="text" id="linkName" name="linkName" value={name} onChange={handleNameChange}/>
        <br />
        <br />
        <label for="URL">Link URL:</label>
        <input type="text" id="linkURL" name="linkURL" value={URL} onChange={handleURLchange}/>
        <br/>
        <br />
        <input type="submit" value="Submit"></input>    
    
        </form>
    )
}

export default Form