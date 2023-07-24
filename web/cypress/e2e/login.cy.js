import users from '../fixtures/users.json'

import login from '../support/pages/LoginPage'

describe('login', () => {

    it('deve logar com o perfil do admin', () => {

        const user = users.admin

        login.doLogin(user)

        cy.contains('.logged-user', 'Olá, ' + user.name)
            .should('be.visible')

    })

    it('não deve logar com e-mail inválido', () => {

        const emails = users.inv_emails

        login.go()

        emails.forEach((u) => {
            login.fill(u)
            login.submit()
            login.popUpHave('Insira um email válido.')
            login.popUpBack()
        })       

    })

    it('não deve logar com e-mail não cadastrado', () => {

        const user = users.email_not_found

        login.doLogin(user)
        login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com senha incorreta', () => {

        const user = users.inv_pass

        login.doLogin(user)
        login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

    })

    // it('logar com e-mail vazio e senha vazios', () => {

    //     cy.visit('http://localhost:3000')

    //     cy.contains('button', 'Entrar')
    //         .click()

    //     cy.contains('div', 'Os campos email e senha são obrigatórios.')
    //         .should('be.visible')

    // })

    it('não deve logar com e-mail vazio', () => {

        const user = users.empty_email

        login.doLogin(user)
        login.popUpHave('Os campos email e senha são obrigatórios.')

    })

    it('nao deve logar com senha vazio', () => {

        const user = users.empty_password

        login.doLogin(user)
        login.popUpHave('Os campos email e senha são obrigatórios.')

    })
})

