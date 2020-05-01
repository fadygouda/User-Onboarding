describe("This is my first test from scratch!", function () {
    beforeEach(function() {
        cy.visit("http://localhost:3001/")
    })

    it("will add value to our inputs", function() {
        cy.get('[data-cy="name"]').type("Fady R Gouda").should("have.value", "Fady R Gouda");

        cy.get('[data-cy="email"]').type("fadygouda123@gmail.com").should("have.value", "fadygouda123@gmail.com");

        cy.get('[data-cy="password"]').type("abcde12345").should("have.value", "abcde12345");

        cy.get('[type="checkbox"]').check().should("be.checked");

        cy.get("form").submit();
    });

});