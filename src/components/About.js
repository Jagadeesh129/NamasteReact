import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div>
            <User name={"Jagadeesh"} />

            <div>Class Based Component</div>
            <hr/>
            <UserClass name={"Jagadeesh"} />
        </div>
    )
}

export default About;