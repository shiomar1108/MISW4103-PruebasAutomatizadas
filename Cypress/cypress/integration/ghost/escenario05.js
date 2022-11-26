import { AdminPage } from "../../pageObject/adminPage";
import { PublishedPostsPage } from "../../pageObject/publishedPostsPage";
import { MemberPage } from "../../pageObject/membersPage";
const adminPage = new AdminPage();
const publishedPostsPage = new PublishedPostsPage();
const memberPage = new MemberPage();

describe('Ghost tests', () => {
   
    beforeEach(() => {
        cy.visit('http://localhost:2368/ghost')
        cy.screenshot();

        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.wait(1000);

        adminPage.getNewPostButton().click();
        cy.wait(1000)
        cy.createPost('post to delete', 'This is a post to delete');
        adminPage.navigateToPostsPage();
        adminPage.getPublishedPostsButton().click();
        cy.deleteAllPosts()
        cy.wait(1000);

        adminPage.navigateToMainPage();
        adminPage.navigateToMembersPage();
        cy.createMember('user to delete', 'test@test1.com', 'This is a test member');
        adminPage.navigateToMembersPage();
        cy.wait(1000)
        adminPage.navigateToMembersPage();
        cy.deleteAllMembers();
        cy.wait(1000);
    })


    it('5. Despues de hacer Login, quiero Crear un nuevo Post y Eliminar un Post existente y Crear un nuevo Post y Editar un Post existente y espero que todos los pasos se puedan ejecutar correctamente', () => {
        adminPage.navigateToMainPage();
        cy.wait(1000)
        cy.screenshot();
        adminPage.getNewPostButton().click();
        cy.wait(1000)
        cy.screenshot();
        cy.createPost('My third post', 'This is my third post');
        cy.screenshot();

        adminPage.navigateToPostsPage();
        cy.screenshot();
        adminPage.getPublishedPostsButton().click();
        cy.wait(1000)
        cy.screenshot();

        cy.deletePost('My third post');
        cy.wait(1000)
        cy.screenshot();
        adminPage.navigateToPostsPage();
        cy.screenshot();
        adminPage.getPublishedPostsButton().click();
        cy.screenshot();
        publishedPostsPage.getAllPostTitles().should('not.exist')

        adminPage.navigateToMainPage();
        cy.screenshot();
        adminPage.getNewPostButton().click();
        cy.wait(1000)
        cy.screenshot();
        cy.createPost('My fourth post', 'This is my fourth post');
        cy.screenshot();

        adminPage.navigateToPostsPage();
        cy.screenshot();
        adminPage.getPublishedPostsButton().click();
        cy.wait(1000)
        cy.screenshot();

        cy.editPost('My fourth post', 'My fourth post edited', 'This is my fourth post edited');
        cy.wait(500)
        cy.screenshot();
        adminPage.navigateToPostsPage();
        cy.screenshot();
        adminPage.getPublishedPostsButton().click();
        cy.screenshot();
        publishedPostsPage.getAllPostTitles().contains('My fourth post edited').should('exist');
    });
});