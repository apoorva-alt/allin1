import React from 'react'
import Board from './components/board'
import Input from './components/input'
import Table from './components/moveTable'
import Timer from './components/timer'
import './style.css'

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            player1:'0',
            player2:'x',
            current:'o',
            cells:[null,null,null,null,null,null,null,null,null],
            movesArray:[],
            toggleDisplay:false,
            initalTimeOfPlayer1:0,
            initalTimeOfPlayer2:0,
            resetStatus:false
        }
    }
    handleClick=(id)=>{
        let currentValue=this.state.cells[id]
        if(findWinner(this.state.cells) || currentValue)
            return
        let nextValue=this.state.current==='o'?'x':'o'
        let newCells=[...this.state.cells]
        newCells[id]=this.state.current
        let moves={
            slno:0,moveBy:'',movePosition:0
        }
        moves.slno=(this.state.cells.filter((i)=>i!==null).length)+1
        if(this.state.current==='o'){
            moves.moveBy=(this.state.player1)
        }
        else{
            moves.moveBy=(this.state.player2)
        }
        moves.movePosition=id+1
        let temp=this.state.movesArray
        temp.push(moves)
        this.setState({
            current:nextValue,
            cells:newCells,
            movesArray:temp,
        })
    }
    reset=()=>{
        this.setState({
            current:'o',
            cells:[null,null,null,null,null,null,null,null,null],
            movesArray:[],
            initalTimeOfPlayer1:0,
            initalTimeOfPlayer2:0,
            whosTurn:true,
            resetStatus:!this.state.resetStatus
        })
    }

    handleSavePlayerName=(name,label)=>{
        if(label==='Player 1'){
            this.setState({
                player1:name
            })
        }
        else{
            this.setState({
                player2:name
            })
        }
       
    }
    renderBoardAndRelated=()=>{
        let status
        let winnerIsFound
        let remaining=this.state.cells.filter((i)=>i!==null)
        let winner=findWinner(this.state.cells)
        if(remaining.length===this.state.cells.length && !(winner)){
            winnerIsFound=true
            status=`It's a Tie :(`
        }
            
        else if(winner){
            winnerIsFound=true
            if(winner.winValue==='o')
                status=this.state.player1+' Wins :)'
            else 
                status=this.state.player2+' Wins :)' 
        }
        else{
            if(this.state.current==='o')
             status='Next Move ' +this.state.player1+' { O }'
            else
            status='Next Move ' +this.state.player2+' { X }'
        }
        console.log(this.state.whosTurn+ " "+this.state.current)
        return (
            <>
            <table className="main">
                <tr>
                    <td className="boardTD">
                    <h3 className="status">{status}</h3>
                    <Board cells={this.state.cells} handleCellClick={this.handleClick} winnerIs={winner}/>
                    </td>
                    <td className="boardTD">
                    <Table movesArray={this.state.movesArray}/><br/>
                    </td>
                </tr>
            </table>
            <br/><br/>
            <button className="reset button" onClick={this.reset}>RESET</button><br></br><br/>
            {/* {this.state.current==='o'?<Timer whosTurn={this.state.whosTurn} time={this.state.initialTimeOfPlayer1} from="1"/>:<Timer whosTurn={this.state.whosTurn} time={this.state.initalTimeOfPlayer2} from="2"/>} */}
            <Timer whosTurn={this.state.current} time={this.state.initalTimeOfPlayer1} from="o" reset={this.state.resetStatus} winnerIsFound={winnerIsFound}/>
            <Timer whosTurn={this.state.current} time={this.state.initalTimeOfPlayer2} from="x" reset={this.state.resetStatus} winnerIsFound={winnerIsFound}/>
            </>
        )
    }
    renderPlayNameInput=()=>{
        return(
            <>
            <br/><br/>
            <Input className="inputComponent" label="Player 1" value="o" onSave={this.handleSavePlayerName}></Input>
            <Input className="inputComponent" label="Player 2" value="x" onSave={this.handleSavePlayerName}></Input>
            <button className="button start" onClick={()=>this.setState({toggleDisplay:true})}>START</button>
            </>
        )
     
    }
    render(){
        return(
            <>
            <h1 className="title">Tic Tac Toe</h1>
            {this.state.toggleDisplay?this.renderBoardAndRelated():this.renderPlayNameInput()}
            </>
        )
    }
}
function findWinner(cells){
    const winnerIndxes=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let line of winnerIndxes){
        if(cells[line[0]] && cells[line[0]]===cells[line[1]] && cells[line[0]]===cells[line[2]])
            return {winValue:cells[line[0]],
                    winLine:line}
    }
    return null
}
export default Game