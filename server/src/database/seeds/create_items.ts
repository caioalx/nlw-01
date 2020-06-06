import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('item').insert([
        { title: 'Lâmpada', image: 'lampadas.svg'},
        { title: 'Pilhas e baterias', image: 'baterias.svg'},
        { title: 'Papéis e papelão', image: 'papeis-papelao.svg'},
        { title: 'Resíduos Elêtronicos', image: 'eletronicos.svg'},
        { title: 'Resíduos Ogânicos', image: 'organicos.svg'},
        { title: 'Óleo de Cozinha', image: 'oleo.svg'},
    ]);
}