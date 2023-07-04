describe('Testes Automatizados Api Trello', () => {


    const apiKey = '5004433386400af25cff42a899de721b';
    const apiToken = 'ATTA716fa4d158439af4bf942ac77f871e7fcf4289a4d8e2548e52776a45d9d81f13A60291B7';
    const nomeBoard = 'Japao' // Inserir nome do Board
    //const url = 'https://api.trello.com/1/boards/?name='
    const url = 'https://api.trello.com'
    var id_List = '64a3086dfb5efaf2ac66eb27'
    var id_ExcluirCard = 'JtuhCHrV'
    var id_ExcluirBoard = 'Bn3zufzs'
    

    it('[POST] Cadastrar um board', () => {
        cy.api({
            method: 'POST',
            url: `${url}/1/boards/?name=${nomeBoard}&key=${apiKey}&token=${apiToken}`
            
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            const listIdFromResponse = response.body.id;
            cy.log('ID board:', listIdFromResponse);
            cy.log(`Nome do board criado é ${nomeBoard}`)
            cy.screenshot('[POST] Cadastrar um board')
        })
    });

    it.only('[POST] Cadastrar um card', () => {
        
        cy.api({
            method: 'POST',    
            url: `${url}/1/cards?idList=${id_List}&key=${apiKey}&token=${apiToken}`,
            body: {
                name: 'pinguim',
            }
        

        }).then((response) => {
            expect(response.status).to.be.equal(200)
            cy.screenshot('[POST] Cadastrar um card')
        })
    });

    it('[DELETE] Excluir card', () => {
        cy.request({
            method: 'DELETE',
            url: `${url}/1/cards/${id_ExcluirCard}?key=${apiKey}&token=${apiToken}`,
            //headers: { 'Accept-Language': 'en-us', },
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            cy.screenshot('[DELETE] Excluir card')
        })

    });

    it('[DELETE] Excluir board', () => {
        cy.request({
            method: 'DELETE',
            url: `${url}/1/boards/${id_ExcluirBoard}?key=${apiKey}&token=${apiToken}`,
            headers: { 'Accept-Language': 'en-us', },
        }).then((response) => {
            expect(response.status).to.be.equal(200)
            cy.screenshot('[DELETE] Excluir board')
        })

    });
})

