import Authorization from '../../cypress.env.example.json'
import Api_url from '../../env.json'

describe('Testes Automatizados Api Trello', () => {
    var nomeBoard = 'Teste' 
    var nomeCard = 'Trello Ntt Data'
    var id_List = '64a55f4b946435ab59de315e'
    var id_ExcluirBoard = 'qPRSTDju'
    var id_ExcluirCard = 'QPBvzOzk'
   
    
    it('[POST] Criar board', () => {
        cy.api({
            method: 'POST',
            url: `${Api_url.baseUrl}/1/boards/?name=${nomeBoard}&key=${Authorization.ACESS_API_KEY}&token=${Authorization.ACESS_TOKEN}`,
            
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('id')
            const listIdFromResponse = response.body.id;
            cy.log('ID board:', listIdFromResponse);
            cy.log(`Nome do board criado é ${nomeBoard}`)
            cy.screenshot('[POST] Criar board')
        })
    });

    it('[POST] Cadastrar Card', () => {
        
        cy.api({
            method: 'POST',    
            url: `${Api_url.baseUrl}/1/cards?idList=${id_List}&key=${Authorization.ACESS_API_KEY}&token=${Authorization.ACESS_TOKEN}`,
            body: {
                name: `${nomeCard}`,
            }
            
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
            expect(response.body).to.have.property('limits')
            expect(response.body).to.have.property('id')
            cy.screenshot('[POST] Cadastrar Card')
            cy.log(`O nome do Card criado é ${nomeCard}`)
            
        })
    });

    it.only('[DELETE] Excluir Card', () => {
        cy.api({
            method: 'DELETE',
            url: `${Api_url.baseUrl}/1/cards/${id_ExcluirCard}?key=${Authorization.ACESS_API_KEY}&token=${Authorization.ACESS_TOKEN}`,
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
            expect(response.headers).to.have.property('date')
            expect(response.body).to.have.property('limits')
            cy.screenshot('[DELETE] Excluir card')
        })

    });

    it('[DELETE] Excluir Board', () => {
        cy.api({
            method: 'DELETE',
            url: `${Api_url.baseUrl}/1/boards/${id_ExcluirBoard}?key=${Authorization.ACESS_API_KEY}&token=${Authorization.ACESS_TOKEN}`,
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
            expect(response.headers).to.have.property('date')
            cy.screenshot('[DELETE] Excluir Board')
            
        })

    });
})

