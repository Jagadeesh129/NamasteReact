import { count } from "console";
import React from "react";
import UserContext from "../utils/UserContext";

class UserClass extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {   // state variables 
            count: 0,
            age: 24
        }
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/Jagadeesh129")
        const json = await data.json();
        console.log(json);
        this.setState({
            age:28
        })
    }

    componentDidUpdate() {
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        console.log("Component will Unmount");
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={()=> this.setState({count : this.state.count + 1}) }>Increase count</button>   // VIMP never update state variables directly
                <h2>Name: {this.props.name}</h2>
                <h3>Location: Andhra</h3>
                <h4>Contact: @mjagadeesh129</h4>
                <div>
                    LoggedIn User
                    <UserContext.Consumer>
                        { (data) => <h1>{data.loggedInUser}</h1>}
                    </UserContext.Consumer>
                </div>
            </div>
        )
    }
}

export default UserClass;


/* 
1. Constructor is called
2. Render is called (Loading or dummy data)
3. ComponentDidMount is called (Used for call api's and setState variables)
     when setState is called so render method is called again
6. Render is called (API Data)
7. ComponentDidUpdate is called
8. ComponentWillUnmount is called 
*/
