/// <reference types="cypress" />
import students from '../fixtures/students.json'

import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {

    it('deve poder cadastrar um novo aluno', () => {
        const student = students.create

        cy.task('deleteStudent', student.email)        
        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')        
    })

    it('não deve cadastrar com e-mail duplicado', () => {
        const student = students.duplicate

        cy.task('resetStudent', student)
  
        cy.adminLogin()        

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matrícula', () => {

        const student = students.remove

        cy.task('resetStudent', student)

        cy.adminLogin()        

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')
    })

    it('todos os campos são obrigatórios', () => {

        const student = students.requirede
        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Nome completo', 'Nome é obrigatório')

    })

    it.only('Não deve cadastrar aluno com menos de 16 anos', () => {
        const student = students.under_16_years
        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Idade', 'A idade mínima para treinar é 16 anos!')
    })

    it.only('Não deve cadastrar aluno com peso igual ou menor que 0', () => {
        const student = students.inv_weight
        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Peso (em kg)', 'Peso não permitido')
    })

    it.only('Não deve cadastrar aluno com altura igual ou menor que 0', () => {
        const student = students.inv_feet_tall
        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Altura', 'Altura não permitida')
    })

})