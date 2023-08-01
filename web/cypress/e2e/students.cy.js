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

        studentPage.requiredMessage('Nome completo', 'Nome é obrigatório')

    })

})