describe('Testes Automatizados Api Trello', () => {

    const apiKey = 'ATTA716fa4d158439af4bf942ac77f871e7fcf4289a4d8e2548e52776a45d9d81f13A60291B7';
    const apiToken = '5004433386400af25cff42a899de721b_API_TOKEN';
    const boardName = 'Cadastrar Board'

    it.only('[POST] Cadastrar um board', () => {
        cy.request({
            method: 'POST',
        url: 'https://api.trello.com/1/boards/?name=Douglas&key=5004433386400af25cff42a899de721b&token=ATTA716fa4d158439af4bf942ac77f871e7fcf4289a4d8e2548e52776a45d9d81f13A60291B7'
            //headers: { 'Accept': 'aplication/json' },

        }).then((response) => {
            expect(response.status).to.be.equal(200)
            const listIdFromResponse = response.body.id;
            cy.log('ID da lista de cartões:', listIdFromResponse);

        })
    });

    it('[POST] Cadastrar um card', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.trello.com/1/cards?idList=64a3086dfb5efaf2ac66eb27&key=5004433386400af25cff42a899de721b&token=ATTA716fa4d158439af4bf942ac77f871e7fcf4289a4d8e2548e52776a45d9d81f13A60291B7',
            body: {
                name: 'TREINAMENTO DE API COM CYPRESS 40'
            }

        }).then((response) => {
            expect(response.status).to.be.equal(200)
        })
    });

    it('[DELETE]Excluir card', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.trello.com/1/cards/NLX7ynzQ?key=5004433386400af25cff42a899de721b&token=ATTA716fa4d158439af4bf942ac77f871e7fcf4289a4d8e2548e52776a45d9d81f13A60291B7',
            //headers: { 'Accept-Language': 'en-us', },
        });
        
    });

    it('[DELETE] Excluir board', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.trello.com/1/boards/Mnyjctbn?key=5004433386400af25cff42a899de721b&token=ATTA716fa4d158439af4bf942ac77f871e7fcf4289a4d8e2548e52776a45d9d81f13A60291B7',
            headers: { 'Accept-Language': 'en-us', },
        });
        
    });
})

