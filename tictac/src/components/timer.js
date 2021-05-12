import React from 'react'

class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            count:props.time,
            reset:false
        }
    }
    resetTimer=()=>{
        if(this.state.reset!==this.props.reset)
        this.setState({
            count:0,
            reset:!this.state.reset
        })
    }
    render(){
        this.resetTimer()
        let resTime=''
        if(this.state.count<=60){
            if(this.state.count<=9){
                resTime='00 : 0'+this.state.count
            }
            else{
                resTime='00 : '+this.state.count
            }
        }
        else{
            let minutes=Math.trunc(this.state.count/60)
            let seconds=Math.trunc(this.state.count%60)
            if(seconds<=9 && minutes<=9){
                resTime='0'+minutes+' : 0 '+seconds
            }
            else if(seconds<=9){
                resTime=minutes+' : 0 '+seconds
            }
            else if(minutes<=9){
                resTime='0'+minutes+' : '+seconds
            }
            else{
                resTime=minutes+' : '+seconds
            }
        }
        return(
            <div className="outerdiv">
            <div className="timer">
            <label class="label">Player {this.props.from}</label>
            <p className="time">{resTime}</p>
            </div>
            </div>
        )
    }
    componentDidMount(){
        this.iid=setInterval(() => {
            if(this.props.whosTurn === this.props.from && !this.props.winnerIsFound)
            this.setState({
                count:this.state.count+1
            })
            else if(!this.props.whosTurn === this.props.from && !this.props.winnerIsFound)
            this.setState({
                count:this.state.count+1
            })
        }, 1000);
    }

}
export default Timer;