import users from '../fixtures/users.json'
describe('login', () => {

    it('deve logar com o perfil do admin', () => {

        const user = users.admin

        cy.doLogin(user)

        cy.contains('.logged-user', 'Olá, ' + user.name)
            .should('be.visible')

    })

    it('não deve logar com e-mail inválido', () => {

        const user = users.inv_email

        cy.doLogin(user)
        cy.popUpHave('Insira um email válido.')

    })

    it('não deve logar com e-mail não cadastrado', () => {

        const user = users.email_not_found

        cy.doLogin(user)
        cy.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com senha incorreta', () => {

        const user = users.inv_pass

        cy.doLogin(user)
        cy.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('logar com e-mail vazio e senha vazios', () => {

        cy.visit('http://localhost:3000')

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('div', 'Os campos email e senha são obrigatórios.')
            .should('be.visible')

    })

    it('não deve logar com e-mail vazio', () => {

        const user = users.empty_email

        cy.doLogin(user)
        cy.popUpHave('Os campos email e senha são obrigatórios.')

    })

    it('nao deve logar com senha vazio', () => {

        const user = users.empty_password

        cy.doLogin(user)
        cy.popUpHave('Os campos email e senha são obrigatórios.')

    })
})

