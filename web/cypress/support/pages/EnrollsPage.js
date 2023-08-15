import navbar from "./components/NavBar"
import popup from "./components/Popup"

class EnrollsPage {

    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToform() {
        cy.get('a[href="/enrollments/new"]')
            .click()
    }

    selectItem(item, value) {
        cy.get(`.select_${item}`)
            .click()

        cy.get(`input[aria-label="select_${item}"]`)
            .type(value)

        cy.contains('div[id*=option]', value)
            .click()
    }

    fillCard(student) {
        cy.get('#card_number').type('5555555555554444')
        cy.get('#card_holder').type(student.name)
        cy.get('#card_month').type('09')
        cy.get('#card_year').type('2027')
        cy.get('#card_cvv').type('423')
    }

    submit() {
        cy.contains('button', 'Cadastrar')
            .click()
    }

}

export default new EnrollsPage()