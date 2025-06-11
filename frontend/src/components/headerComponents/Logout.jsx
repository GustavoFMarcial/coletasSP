function Logout() {
    function handleLogout() {
        sessionStorage.removeItem("authToken");
        window.location.reload();
    }

    return (
        <>
            <img onClick={handleLogout} src="assets/images/poweroff.svg" alt="" />
        </>
    )
}

export default Logout;