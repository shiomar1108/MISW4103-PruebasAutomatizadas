import { AdminPage } from "../../pageObject/adminPage";
import { PublishedPostsPage } from "../../pageObject/publishedPostsPage";
import { MemberPage } from "../../pageObject/membersPage";
const adminPage = new AdminPage();
const publishedPostsPage = new PublishedPostsPage();
const memberPage = new MemberPage();

describe('Ghost tests', () => {
    
    beforeEach(() => {
        /* Given I log in into Ghost admin */
        cy.visit('http://localhost:2368/ghost')
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.wait(1000);
    })

    afterEach(() => {
        /* Clean Up after test */
        adminPage.navigateToPostsPage();
        cy.deletePost('My second of 3 posts');
        cy.wait(1000)
        cy.deletePost('post editado');
        cy.wait(1000)
        cy.deletePost('My first of 3 posts');
        cy.wait(1000)
    })

    it('15. Despues de hacer Login, quiero Crear un nuevo Post y Crear un nuevo Post y Crear un nuevo Post y Editar un Post existente y espero que todos los pasos se puedan ejecutar correctamente', () => {
        /*When I create a new Post */
        adminPage.navigateToMainPage();
        adminPage.getNewPostButton().click();
        cy.wait(1000)
        cy.createPost('My first of 3 posts', 'This is the first of three post for this test');

        /* And I create a new Post */
        adminPage.navigateToMainPage();
        adminPage.getNewPostButton().click();
        cy.wait(1000)
        cy.createPost('My second of 3 posts', 'This is the second of three post for this test');

        /* And I created a new Post */
        adminPage.navigateToMainPage();
        adminPage.getNewPostButton().click();
        cy.wait(1000)
        cy.createPost('My Third of 3 posts', 'This is the Third of three post for this test');
        adminPage.navigateToPostsPage();
        adminPage.getPublishedPostsButton().click();
        cy.wait(1000)

        /* And I edit an existing Post */
        adminPage.navigateToPostsPage();
        cy.editPost('My Third of 3 posts', 'post editado', 'My last  post was editted');
        cy.wait(500)

        /* Then I expect to see all thre post */
        adminPage.navigateToPostsPage();
        adminPage.getPublishedPostsButton().click();
        publishedPostsPage.getAllPostTitles().contains('post editado').should('exist');
        publishedPostsPage.getAllPostTitles().contains('My first of 3 posts').should('exist');
        publishedPostsPage.getAllPostTitles().contains('My second of 3 posts').should('exist');
        cy.screenshot();
    })
})