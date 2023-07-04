import Authorization from '../../cypress.env.example.json'
import Api_url from '../../env.json'

describe('Testes Automatizados Api Trello', () => {
    var nomeBoard = 'A' 
    var nomeCard = 'Teste-variavel'
    var id_List = '64a3086dfb5efaf2ac66eb27'
    var id_ExcluirCard = 'WJqQIYcu'
    var id_ExcluirBoard = 'Bn3zufzs'
    
    it.only('[POST] Criar board', () => {
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
            cy.screenshot('[POST] Cadastrar um board')
        })
    });

    it('[POST] Cadastrar um card', () => {
        
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
            cy.screenshot('[POST] Cadastrar um card')
            cy.log(`O nome do Card criado é ${nomeCard}`)
            
        })
    });

    it('[DELETE] Excluir card', () => {
        cy.api({
            method: 'DELETE',
            url: `${Api_url.baseUrl}/1/cards/${id_ExcluirCard}?key=${Authorization.ACESS_API_KEY}&token=${Authorization.ACESS_TOKEN}`,
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
            expect(response.body).to.have.property('limits')
            cy.screenshot('[DELETE] Excluir card')
        })

    });

    it('[DELETE] Excluir board', () => {
        cy.api({
            method: 'DELETE',
            url: `${Api_url.baseUrl}/1/boards/${id_ExcluirBoard}?key=${Authorization.ACESS_API_KEY}&token=${Authorization.ACESS_TOKEN}`,
            headers: { 'Accept-Language': 'en-us', },
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            cy.screenshot('[DELETE] Excluir board')
        })

    });
})

