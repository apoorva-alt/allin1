import React from 'react'

class input extends React.Component{
    constructor(props){
        super(props)
        this.state={
            player:props.value
        }
    }
    handleChange=(e)=>{
        this.setState({player:e.target.value})
    }
    handleSave=()=>{
        this.props.onSave(this.state.player,this.props.label)
    }
    render(){
        return(
            <>
            <label className="label">{this.props.label}</label>
            <input className="input" type="text" onChange={this.handleChange}></input>
            <button className="button" onClick={this.handleSave}>SAVE</button>
            </>
        )
    }
}

export default input