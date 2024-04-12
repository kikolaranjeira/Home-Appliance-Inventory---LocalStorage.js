var idProduto = document.getElementById("id");
var nomeProduto = document.getElementById("nome");
var marcaProduto = document.getElementById("marca");
var modeloProduto = document.getElementById("modelo");
var quantidade = document.getElementById("quantidade");
var preço = document.getElementById("preço");

function verificar() {
    var id = idProduto.value;
    var nome = nomeProduto.value;
    var marca = marcaProduto.value;
    var modelo = modeloProduto.value;
    var quantidade = parseInt(document.getElementById("quantidade").value);
    var preco = parseFloat(document.getElementById("preço").value);

    if (!id || !nome || !marca || !modelo || quantidade <= 0 || preco <= 0 || isNaN(quantidade) || isNaN(preco)) {
        window.alert('Preencha todos os campos corretamente para adicionar um produto/item no stock!');
        return false;
    }
}

function excluir() {

    if (confirm('Tem certeza que deseja eliminar todos os produtos/itens do stock?')) {

        if (localStorage.length === 0) {
            window.alert('stock vazio!');

        } else {
            localStorage.removeItem("stockItens");
            window.alert('stock excluído!');
        };

    } else {
        return false;

    };

};

function adicionar() {
    var novoId = document.getElementById("id").value; // Recebe o 'valor' da variavel (value)
    var novoNome = document.getElementById("nome").value;
    var novaMarca = document.getElementById("marca").value;
    var novoModelo = document.getElementById("modelo").value;
    var qtd = document.getElementById("quantidade").value;
    var prç = document.getElementById("preço").value;
    var novaCategoria = document.getElementById("categoria").value; // Adiciona a categoria

    if (!novoId || !novoNome || !novaMarca || !novoModelo || !qtd || !prç || !novaCategoria) {
        return false;
    }

    var item = {
        id: novoId,
        nome: novoNome,
        marca: novaMarca,
        modelo: novoModelo,
        quant: qtd,
        valor: prç,
        categoria: novaCategoria // Adiciona a categoria ao item
    };

    if (localStorage.getItem('stockItens') === null) {
        var itens = [];
        itens.push(item);
        localStorage.setItem('stockItens', JSON.stringify(itens));
    } else {
        var itens = JSON.parse(localStorage.getItem('stockItens'));
        itens.push(item);
        localStorage.setItem('stockItens', JSON.stringify(itens));
    }
}


function removerItem(nome) {

    var itens = JSON.parse(localStorage.getItem('stockItens')); // transforma uma 'string' em um JSON

    for (var i = 0; i < itens.length; i++) { // busca os itens dentro do 'array' e verifica a quantidade

        if (itens[i].nome === nome) {
            itens.splice(i, 1); // remove o item especifico
        };

        localStorage.setItem('stockItens', JSON.stringify(itens));

    };

    mostrarResultado(); // recarrega o estoque no html

};

function mostrarResultado() {
    var itens = JSON.parse(localStorage.getItem('stockItens'));
    var resultadoItens = document.getElementById('resultados');

    // Limpar o conteúdo atual da tabela
    resultadoItens.innerHTML = '';

    for (var i = 0; i < itens.length; i++) {
        var id = itens[i].id;
        var nome = itens[i].nome;
        var marca = itens[i].marca;
        var modelo = itens[i].modelo;
        var quant = itens[i].quant;
        var valor = itens[i].valor;
        var categoria = itens[i].categoria; // Adiciona a categoria

        // Criar uma nova linha na tabela para cada item
        var newRow = document.createElement('tr');
        newRow.innerHTML = '\
        <td style="word-wrap: break-word;">' + categoria + '</td>\
        <td style="word-wrap: break-word;' + (id < 2 ? ' color: red;' : '') + '">' + id + '</td>\
        <td style="word-wrap: break-word;">' + nome + '</td>\
        <td style="word-wrap: break-word;">' + marca + '</td>\
        <td style="word-wrap: break-word;">' + modelo + '</td>\
        <td style="word-wrap: break-word;">' + quant + '</td>\
        <td style="word-wrap: break-word;">' + valor + '</td>\
            <td><button class="botoes-tabela" onclick="removerItem(\'' + nome + '\')">X</button></td>\
            <td><button class="botoes-tabela" onclick="editarItem(\'' + nome + '\')">Editar</button></td>'; // Adiciona um botão de editar

        // Adicionar a nova linha à tabela
        resultadoItens.appendChild(newRow);
    }
}


function editarItem(nome) {
    var itens = JSON.parse(localStorage.getItem('stockItens'));

    for (var i = 0; i < itens.length; i++) {
        if (itens[i].nome === nome) {
            // Preenche os campos do formulário com os dados do item selecionado
            document.getElementById('id').value = itens[i].id;
            document.getElementById('nome').value = itens[i].nome;
            document.getElementById('marca').value = itens[i].marca;
            document.getElementById('modelo').value = itens[i].modelo;
            document.getElementById('quantidade').value = itens[i].quant;
            document.getElementById('preço').value = itens[i].valor;
            document.getElementById('categoria').value = itens[i].categoria;

            // Atualiza o botão "ADICIONAR" para "SALVAR"
            document.getElementById('adicionar').innerText = 'GUARDAR';
            // Atualiza a função chamada pelo botão "SALVAR" para "salvarEdicao()"
            document.getElementById('adicionar').onclick = function () {
                salvarEdicao(nome);
            };
            break;
        }
    }
}

function salvarEdicao(nome) {
    // Obtém os valores atualizados dos campos do formulário
    var id = document.getElementById('id').value;
    var novoNome = document.getElementById('nome').value;
    var novaMarca = document.getElementById('marca').value;
    var novoModelo = document.getElementById('modelo').value;
    var novaQuantidade = document.getElementById('quantidade').value;
    var novoPreco = document.getElementById('preço').value;
    var novaCategoria = document.getElementById('categoria').value; // Obtém a nova categoria

    // Obtém a lista de itens do localStorage
    var itens = JSON.parse(localStorage.getItem('stockItens'));

    // Encontra o item correspondente pelo nome
    for (var i = 0; i < itens.length; i++) {
        if (itens[i].nome === nome) {
            // Atualiza os valores do item
            itens[i].id = id;
            itens[i].nome = novoNome;
            itens[i].marca = novaMarca;
            itens[i].modelo = novoModelo;
            itens[i].quant = novaQuantidade;
            itens[i].valor = novoPreco;
            itens[i].categoria = novaCategoria; // Atualiza a categoria
            break;
        }
    }

    // Salva a lista atualizada de itens no localStorage
    localStorage.setItem('stockItens', JSON.stringify(itens));

    // Atualiza a visualização dos itens
    mostrarResultado();

    // Reinicia o formulário para adicionar novos itens
    reiniciarFormulario();

    // Restaura o botão "ADICIONAR" ao seu estado original
    document.getElementById('adicionar').innerText = 'ADICIONAR';
    document.getElementById('adicionar').onclick = function () {
        verificar(), adicionar(), mostrarResultado();
    };
}


function reiniciarFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preço').value = '';
    document.getElementById('categoria').value = '';
}



// Funcionalidade de pesquisa pelo nome do eletrodoméstico
function searchByName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


// Implementa uma funcionalidade de pesquisa pelo nome de um eletrodoméstico.
document.getElementById('searchInput').addEventListener('keyup', function () {
    searchByName();
});

function searchByName() {
    // Obtém o valor de pesquisa
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Aqui você realizaria a lógica de pesquisa (consultar os dados, encontrar correspondências, etc.)
    // Vamos supor que você tenha uma matriz de objetos representando seus eletrodomésticos
    const results = appliances.filter(appliance => appliance.nome.toLowerCase().includes(searchTerm));

    // Limpa a <div> dos resultados anteriores
    document.getElementById('searchResults').innerHTML = '';

    // Exibe os resultados na <div> dos resultados
    results.forEach(appliance => {
        const resultElement = document.createElement('p');
        resultElement.textContent = `Nome: ${appliance.nome}, Marca: ${appliance.marca}, Modelo: ${appliance.modelo}`;
        document.getElementById('searchResults').appendChild(resultElement);
    });
}

function sortByStock() {
    // Obtém os itens do localStorage
    var itens = JSON.parse(localStorage.getItem('stockItens'));

    // Ordena os itens com base na quantidade (do menor para o maior)
    itens.sort(function (a, b) {
        return a.quant - b.quant;
    });

    // Salva os itens ordenados de volta no localStorage
    localStorage.setItem('stockItens', JSON.stringify(itens));

    // Atualiza a visualização dos itens
    mostrarResultado();
}


