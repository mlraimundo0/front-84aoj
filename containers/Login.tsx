export const Login = () => {
    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            <div className="input">
                <img src="/mail.svg" alt="Informe seu usuário"/>
                <input />
            </div>
            <div className="input">
                <img src="/lock.svg" alt="Informe sua senha"/>
                <input />
            </div>
            <button>Login</button>
        </div>
    )
}