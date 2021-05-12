import React from 'react'
import Cell from './cell'


const Board=(props)=>{
    return (
        <>
            <div className="board">
            {props.cells.map((value,id)=>
            <Cell id={id} value={value} onCellClick={props.handleCellClick} onWin={props.winnerIs?props.winnerIs.winLine:null}/>
            )}
            </div>
            <br/>
        </>  
    )
}
export default Board