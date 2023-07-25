import students from '../fixtures/students.json'

import dash from '../support/pages/DashPage'

describe('students', () => {

    it('deve poder cadastrar um novo aluno', () => {

        const student = students.create
        
        cy.adminLogin()

        cy.contains('a', 'Cadastrar').click()

        cy.get('input[name=name]').type(student.name)
        cy.get('input[name=email]').type(student.email)
        cy.get('input[name=age]').type(student.age)
        cy.get('input[name=weight]').type(student.weight)
        cy.get('input[name=feet_tall]').type(student.feet_tall)

        cy.contains('button', 'Cadastrar').click()
    })

})