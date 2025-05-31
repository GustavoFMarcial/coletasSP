import "./Header.css";
import "./ChangePasswordModal";
import ChangePasswordModal from "./ChangePasswordModal";

function Header({ collaborator, token }) {

    if (!collaborator) return <div> </div>;

    return (
            <div className="header-container">
                <a href="#">Coletas SP</a>
                <div className="nav-items-container">
                    <p>{collaborator.name}</p>
                    <p>{collaborator.role}</p>
                    <ChangePasswordModal collaborator={collaborator} token={token} />
                </div>
            </div>
    )
}

export default Header;