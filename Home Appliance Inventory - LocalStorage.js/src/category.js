// Função para adicionar categoria
function adicionarCategoria() {
    var novaCategoria = document.getElementById('novaCategoria').value;
    if (novaCategoria.trim() !== "") {
        var selectCategoriaRemover = document.getElementById('categoriaRemover');
        var option = document.createElement("option");
        option.text = novaCategoria;
        option.value = novaCategoria;
        selectCategoriaRemover.add(option);
        document.getElementById('novaCategoria').value = ""; 

        let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
        const novaCategoriaObj = { id: categorias.length + 1, nome: novaCategoria };
        categorias.push(novaCategoriaObj);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        console.log('Categoria adicionada:', novaCategoriaObj);

        alert('Categoria adicionada com sucesso!');
    }
}

// Função para remover categoria
function removerCategoria() {
    var categoriaRemover = document.getElementById('categoriaRemover').value;
    if (categoriaRemover.trim() !== "") {
        var selectCategoriaRemover = document.getElementById('categoriaRemover');
        for (var i = 0; i < selectCategoriaRemover.options.length; i++) {
            if (selectCategoriaRemover.options[i].value === categoriaRemover) {
                selectCategoriaRemover.remove(i);
                break;
            }
        }

        let categorias = JSON.parse(localStorage.getItem('categorias')) || [];
        categorias = categorias.filter(categoria => categoria.nome !== categoriaRemover);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        console.log('Categoria removida:', categoriaRemover);

        alert('Categoria removida com sucesso!');
    }
}

// Função para carregar os dados do localStorage ao carregar a página
function carregarDadosLocalStorage() {
    var categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    var selectCategoriaRemover = document.getElementById('categoriaRemover');

    selectCategoriaRemover.innerHTML = ""; // Limpa as opções existentes

    categorias.forEach(function(categoria) {
        var option = document.createElement("option");
        option.text = categoria.nome;
        option.value = categoria.nome;
        selectCategoriaRemover.add(option);
    });
    console.log('Dados carregados do localStorage:', categorias);
}

// Evento para carregar os dados quando a página for carregada
window.addEventListener('load', carregarDadosLocalStorage);


// Função para apagar todas as categorias
function apagarTodasCategorias() {
    if (confirm('Tem certeza que deseja apagar todas as categorias? Esta ação é irreversível!')) {
        localStorage.removeItem('categorias'); // Remove o item do localStorage
        var selectCategoriaRemover = document.getElementById('categoriaRemover');
        selectCategoriaRemover.innerHTML = ""; // Limpa o select de categorias

        console.log('Todas as categorias foram apagadas.');
        alert('Todas as categorias foram apagadas com sucesso!');
    }
}

function carregarCategorias() {
    var selectCategoria = document.getElementById('categoria');
    if (!selectCategoria) {
        console.error('Elemento select #categoria não encontrado!');
        return;
    }
    selectCategoria.innerHTML = ''; // Limpa o select antes de adicionar novas opções
    var categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    if (categorias.length === 0) {
        console.log('Nenhuma categoria encontrada no localStorage.');
    } else {
        // Adiciona uma opção padrão no select
        selectCategoria.appendChild(new Option('Select Category', '', false, false)); 
        // Popula o select com categorias do localStorage
        categorias.forEach(function(categoria) {
            selectCategoria.appendChild(new Option(categoria.nome, categoria.nome));
        });
    }
}

// Certifique-se de que este script é chamado corretamente em index.html
document.addEventListener('DOMContentLoaded', carregarCategorias);



