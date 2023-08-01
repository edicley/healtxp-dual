import users from '../fixtures/users.json'

import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

describe('login', () => {

    it('deve logar com o perfil do admin', () => {

        const user = users.admin

        loginPage.doLogin(user)
        studentPage.navbar.userLoggedIn(user.name)
    })

    it('não deve logar com e-mail inválido', () => {

        let outputMessages = []
        let expectedMesages = []

        const emails = users.inv_emails

        loginPage.go()

        emails.forEach((u) => {
            loginPage.fill(u)
            loginPage.submit()    
            
            loginPage.popup.content()
                .invoke('text')
                .then((t) => {
                    cy.log(t)
                    outputMessages.push(t)
                    expectedMesages.push('Insira um email válido.')
                })

            //login.popUpHave('Insira um email válido.')
            loginPage.popup.back()
        })    
        
        cy.wrap(outputMessages).should('deep.equal', expectedMesages)

    })

    it('não deve logar com e-mail não cadastrado', () => {

        const user = users.email_not_found

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com senha incorreta', () => {

        const user = users.inv_pass

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

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

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })

    it('nao deve logar com senha vazio', () => {

        const user = users.empty_password

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })
})

