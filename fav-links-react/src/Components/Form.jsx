import {useState} from 'react'

function Form(props){
   const [expenseType, setExpenseType] = useState("")
   const [amount, setAmount] = useState("")
   const [notes, setNotes] = useState("")

    const handleExpenseTypeChange = (event) => {
            setExpenseType(event.target.value)
    }

    const handleAmountChange = (event) => {
                setAmount(event.target.value)
    }

    const handleNotesChange = (event) => {
                setNotes(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        // Convert amount to number
        const expenseAmount = parseFloat(amount) || 0
        
        props.onNewExpense({
            expense_type: expenseType, 
            amount: expenseAmount,
            notes: notes
        })
        
        // Clear form after submission
        setExpenseType("")
        setAmount("")
        setNotes("")
    }

    return(
    <form onSubmit={handleSubmit}> 
        <label htmlFor="expenseType">Expense Type:</label>
        <input 
            type="text" 
            id="expenseType" 
            name="expenseType" 
            value={expenseType} 
            onChange={handleExpenseTypeChange}
            required
        />
        <br />
        <br />
        <label htmlFor="amount">Amount:</label>
        <input 
            type="number" 
            id="amount" 
            name="amount" 
            value={amount} 
            onChange={handleAmountChange}
            step="0.01"
            min="0"
            required
        />
        <br/>
        <br />
        <label htmlFor="notes">Notes:</label>
        <textarea 
            id="notes" 
            name="notes" 
            value={notes} 
            onChange={handleNotesChange}
            rows="3"
            cols="30"
        />
        <br/>
        <br />
        <input type="submit" value="Add Expense"></input>    
    
        </form>
    )
}

export default Form