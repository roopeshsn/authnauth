import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <article className="p-4">
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="mt-8">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default NotFound