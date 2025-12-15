function TableHeader(){
//responsible for rendering the head of our table 

return(
    <thead>
    <tr>
    <th>Expense Type</th>
    <th>Amount</th>
    <th>Notes</th>
    <th>Remove</th>
  </tr>
  </thead>
)
}


const TableBody = (props) => {
    const rows = props.expenseData.map((row, index) => {
        return(
            <tr key={row.id || index}>
            <td>{row.expense_type}</td>
            <td>${parseFloat(row.amount || 0).toFixed(2)}</td>
            <td>{row.notes || '-'}</td>
            <td>
                <button onClick = {() => props.removeExpense(index)}>Delete</button>
            </td>
            </tr>
        )
    })
    
    return(
        <tbody>
            {rows}
        </tbody>
    )
}

function Table(props){
    return(
        <table>
            <TableHeader/>
            <TableBody expenseData={props.expenseData} removeExpense={props.removeExpense}/>
           
        </table>
    )
}
export default Table