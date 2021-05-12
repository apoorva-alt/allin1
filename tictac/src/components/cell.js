import React from 'react'

const Cell=(props)=>{
    let style
    if(props.onWin){
        props.onWin.forEach(ele => {
            if(props.id===ele){
                style={
                    backgroundColor:"rgb(255,255,31)"
                }
            }
        });  
    }
    return(
        <button className="cell" style={style} onClick={()=>props.onCellClick(props.id)}>{props.value}</button>
    )
}

export default Cell;