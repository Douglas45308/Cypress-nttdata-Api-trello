import Authorization from '../../cypress.env.example.json'
import Api_url from '../../env.json'

/*Link para documentação das Api's
https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-delete]
*/

describe('Testes Automatizados Api Trello', () => {
    
    //variaveis
    var nomeBoard = 'Teste'
    var nomeCard = 'Card - Automação de API do Trello com Cypress'
    var id_List = '64a55f4b946435ab59de315e'
    var id_ExcluirCard = 'NUldYXwp'
    var id_ExcluidBoard = 'G2Zm1Z1H'

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
            cy.log(`O nome do board criado é ${nomeBoard}`)
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

    it('[DELETE] Excluir Card', () => {
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


    it.only('[DELETE] Excluir Board', () => {
        cy.api({
        method: 'DELETE',
        url: `${Api_url.baseUrl}/1/boards/${id_ExcluidBoard}?key=${Authorization.ACESS_API_KEY}&token=${Authorization.ACESS_TOKEN}`,
        }).then((response) => {
        expect(response.status).to.be.equal(200)
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
        expect(response.headers).to.have.property('date')
        cy.screenshot('[DELETE] Excluir Board')

    })

})


})
