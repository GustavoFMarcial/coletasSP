import "./Header.css";

function Header({ collaborator }) {

    if (!collaborator) return <div> </div>;

    return (
            <div className="header-container">
                <a href="#">Coletas SP</a>
                <div className="nav-items-container">
                    <p>{collaborator.name}</p>
                    <p>{collaborator.role}</p>
                </div>
            </div>
    )
}

export default Header;