import "./Header.css";
import Logout from "./Logout";
import ChangePasswordModal from "./ChangePasswordModal";

function Header({ collaborator, token }) {

    if (!collaborator) return <div> </div>;

    return (
            <div className="header-container">
                <a href="#">Coletas SP</a>
                <div className="nav-items-container">
                    <p>{collaborator.name}</p>
                    <p>{collaborator.role}</p>
                    <div className="flex gap-2">
                        <ChangePasswordModal collaborator={collaborator} token={token} />
                        <Logout />  
                    </div>
                </div>
            </div>
    )
}

export default Header;