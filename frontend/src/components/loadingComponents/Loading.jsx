import "./Loading.css";
import Header from "../headerComponents/Header.jsx";

function Loading() {
    return (
        <>
            <Header />
            <div className="loading-container">
                <h2>Carregando...</h2>
            </div>
        </>
    )
}

export default Loading;