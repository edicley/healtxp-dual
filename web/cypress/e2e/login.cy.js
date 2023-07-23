import users from '../fixtures/users.json'
describe('login', () => {

    // const user = {
    //     name: 'Admin',
    //     login: 'admin@healthxp.com',
    //     senha: 'xperience'
    // }    

    it.only('deve logar com o perfil do admin', function() {

        const user = users.admin

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type(user.email)
        cy.get('input[name=password]').type(user.password)

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('.logged-user', 'Olá, ' + user.name)
            .should('be.visible')
    })

    it('Tentar logar com e-mail inválido', () => {

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type('teste')
        cy.get('input[name=password]').type(user.senha)

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('div', 'Insira um email válido.')
            .should('be.visible')

    })

    it('não deve logar com senha incorreta', () => {

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type(user.login)
        cy.get('input[name=password]').type('teste')

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('div', 'Suas credenciais são inválidas, por favor tente novamente!')
            .should('be.visible')

    })

    it('logar com e-mail vazio e senha vazios', () => {

        cy.visit('http://localhost:3000')

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('div', 'Os campos email e senha são obrigatórios.')
            .should('be.visible')

    })

    it('logar com e-mail vazio', () => {

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type(user.login)

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('div', 'Os campos email e senha são obrigatórios.')
            .should('be.visible')
    })

    it('logar com campo senha vazio', () => {

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type(user.login)

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('div', 'Os campos email e senha são obrigatórios.')
            .should('be.visible')
    })



})

