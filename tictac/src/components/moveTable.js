import React from 'react'

const Table=(props)=>{
    return (
        <table className="movesTable">
            <tr>
                <th>Sl No</th>
                <th>Move By</th>
                <th>Move Position</th>
            </tr>
            {props.movesArray.map(move => {
               return ( 
                <tr>
                    <td>{move.slno}</td>
                    <td>{move.moveBy}</td>
                    <td>{move.movePosition}</td>
                </tr>
               )
            })
            }
        </table>
    )
}

export default Table