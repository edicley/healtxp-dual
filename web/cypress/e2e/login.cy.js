import users from '../fixtures/users.json'
describe('login', () => {

    // const user = {
    //     name: 'Admin',
    //     login: 'admin@healthxp.com',
    //     senha: 'xperience'
    // }    

    it('deve logar com o perfil do admin', function () {

        const user = users.admin

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type(user.email)
        cy.get('input[name=password]').type(user.password)

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('.logged-user', 'Olá, ' + user.name)
            .should('be.visible')
    })

    it('não deve logar com e-mail inválido', () => {

        const user = users.inv_email

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type(user.email)
        cy.get('input[name=password]').type(user.password)

        cy.contains('button', 'Entrar')
            .click()

        cy.get('#swal2-content')
            .should('be.visible')
            .should('have.text', 'Insira um email válido.')

    })

    it('não deve logar com senha incorreta', () => {

        const user = users.inv_pass

        cy.visit('http://localhost:3000')

        cy.get('input[name=email]').type(user.email)
        cy.get('input[name=password]').type(user.password)

        cy.contains('button', 'Entrar')
            .click()

        cy.get('#swal2-content')
            .should('be.visible')
            .should('have.text', 'Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('logar com e-mail vazio e senha vazios', () => {

        cy.visit('http://localhost:3000')

        cy.contains('button', 'Entrar')
            .click()

        cy.contains('div', 'Os campos email e senha são obrigatórios.')
            .should('be.visible')

    })

    it.only('logar com e-mail vazio', () => {

        const user = users.empty_email

        cy.visit('http://localhost:3000')

        if(user.email) {
            cy.get('input[name=email]').type(user.email)
        }
        
        cy.get('input[name=password]').type(user.password)

        cy.contains('button', 'Entrar')
            .click()

        cy.get('#swal2-content')
            .should('be.visible')
            .should('have.text', 'Os campos email e senha são obrigatórios.')


        // cy.contains('div', 'Os campos email e senha são obrigatórios.')
        //     .should('be.visible')
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

