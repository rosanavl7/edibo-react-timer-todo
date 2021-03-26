import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/style.css';



class Timer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ahora: new Date(),
            otra: "otra"
        }
    }

    componentDidMount() {
        console.log("timmer esta montado");
        setInterval(() => {
            this.setState({
                ahora: new Date(),
                otra: "otra"
            })
        }, 1000);
    }

    render() {
        return (
            <div className="timer">
                <h3>
                    {this.state.ahora.toLocaleDateString()}
                </h3>
                <h3>
                    {`${this.state.ahora.getHours()} : ${this.state.ahora.getMinutes()}: ${this.state.ahora.getSeconds()}`}
                </h3>
               
            </div>
        )
    }
}

export default Timer