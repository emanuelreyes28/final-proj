import Table from "./Table"
import Form from "./Form"

import {useState, useEffect} from 'react'

function LinkContainer(){
    
const [expenses, setExpenses] = useState([])

// Fetch expenses from server on component mount
useEffect(() => {
    fetchExpenses()
}, [])

const fetchExpenses = async () => {
    try {
        const response = await fetch('/expenses')
        const data = await response.json()
        setExpenses(data)
    } catch (error) {
        console.error('Error fetching expenses:', error)
    }
}

const handleSubmit = async (newExpense) => {
    try {
        const response = await fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpense)
        })
        
        if (response.ok) {
            const createdExpense = await response.json()
            setExpenses([...expenses, createdExpense])
        } else {
            console.error('Failed to create expense')
        }
    } catch (error) {
        console.error('Error creating expense:', error)
    }
}

const handleRemove = async (index) => {
    const expenseToDelete = expenses[index]
    if (!expenseToDelete || !expenseToDelete.id) {
        console.error('Expense or ID not found')
        return
    }
    
    try {
        const response = await fetch(`/expenses/${expenseToDelete.id}`, {
            method: 'DELETE'
        })
        
        if (response.ok) {
            // Refetch expenses from server to ensure consistency
            await fetchExpenses()
        } else {
            const errorData = await response.json().catch(() => ({}))
            console.error('Failed to delete expense:', errorData)
        }
    } catch (error) {
        console.error('Error deleting expense:', error)
    }
}

// Calculate total expenses
const calculateTotal = () => {
    return expenses.reduce((sum, expense) => {
        return sum + parseFloat(expense.amount || 0)
    }, 0)
}

const total = calculateTotal()

    return(
        <div>
          <h1>Expense Logging System</h1>
          <p>Track your expenses by adding the type, amount, and any notes.</p>
          <Table expenseData={expenses} removeExpense={handleRemove} /> 
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', border: '2px solid #333', borderRadius: '5px' }}>
            <h2>Total Expenses: ${total.toFixed(2)}</h2>
          </div>
          <h2>Add New Expense</h2>
          <Form onNewExpense={handleSubmit} />

        </div>
    )
}

export default LinkContainer