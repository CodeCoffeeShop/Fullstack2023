const MainTitle = ({title}) => {
return (
    <h1>{title}</h1>
)
}

const Header = ({title}) => {
return (
    <h2>{title}</h2>
)
}
const Content = ({cont}) => {
const courses = cont.map(c => <p key={c.id}>{c.name} {c.exercises}</p>)
console.log(cont)
return (
    <>
    {courses}
    <Total exerc={cont} />
    </>

    
)
}
const Total = ({exerc}) => {
const exercises = exerc.map(val => val.exercises)
const sum = exerc.map(val => val.exercises).reduce((a, b) => a + b)
console.log(exercises)
return (
    <p>Number of exercises {sum}</p>
)
}

const Course = ({ courses }) => {
const allCourses = courses.map(course => course)
console.log(courses, allCourses)
return (
    <div>
    <MainTitle title="Web development curriculum" />
    {allCourses.map(course => {
        return (
        <div key={course.id}>
            <Header title={course.name}/>
            <Content cont={course.parts}/>
        </div>
        )
    
    })}
    </div>
)
}

export default Course