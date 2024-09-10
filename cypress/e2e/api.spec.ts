// cypress/e2e/api.spec.js
describe('API Testing with JSONPlaceholder', () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
  
    it('should fetch a list of posts', () => {
      cy.request(`${baseUrl}/posts`)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.have.property('userId');
          expect(response.body[0]).to.have.property('id');
          expect(response.body[0]).to.have.property('title');
          expect(response.body[0]).to.have.property('body');
        });
    });
  
    it('should create a new post', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        body: {
          title: 'foo',
          body: 'bar',
          userId: 1
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).should((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.eq('foo');
        expect(response.body.body).to.eq('bar');
      });
    });
  
    it('should fetch a specific post by ID', () => {
      cy.request(`${baseUrl}/posts/1`)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 1);
          expect(response.body).to.have.property('title');
          expect(response.body).to.have.property('body');
        });
    });
  
    it('should handle errors for a non-existent post', () => {
      cy.request({
        url: `${baseUrl}/posts/99999`,
        failOnStatusCode: false
      }).should((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  