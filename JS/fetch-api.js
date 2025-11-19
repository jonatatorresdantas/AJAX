let tempoInicio;
const API_BASE = 'https://jsonplaceholder.typicode.com';

async function carregarUsuarios() {
    await carregarDados(`${API_BASE}/users`, formatarUsuario);
}

async function carregarPosts() {
    await carregarDados(`${API_BASE}/posts`, formatarPost);
}

async function carregarTodos() {
    await carregarDados(`${API_BASE}/todos`, formatarTodo);
}

async function carregarDados(url, formatador) {
    try {
        tempoInicio = Date.now();
        document.getElementById('loading').style.display = 'block';
        document.getElementById('dados-container').innerHTML = '';
        esconderMensagens();

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const dados = await response.json();
        const dadosLimitados = dados.slice(0, 10);
        
        preencherDados(dadosLimitados, formatador);
        atualizarStats(dadosLimitados.length);
        exibirMensagemSucesso('Dados carregados com sucesso!');

    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        exibirMensagemErro(`Erro ao carregar dados: ${erro.message}`);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function preencherDados(dados, formatador) {
    const container = document.getElementById('dados-container');
    container.innerHTML = '';

    dados.forEach(item => {
        const elemento = document.createElement('div');
        elemento.className = 'item';
        elemento.innerHTML = formatador(item);
        container.appendChild(elemento);
    });
}

function formatarUsuario(usuario) {
    return `
        <h3>👤 ${usuario.name}</h3>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Empresa:</strong> ${usuario.company.name}</p>
        <p><strong>Cidade:</strong> ${usuario.address.city}</p>
    `;
}

function formatarPost(post) {
    return `
        <h3>📝 ${post.title}</h3>
        <p>${post.body}</p>
        <p style="margin-top: 10px; color: #999; font-size: 12px;">
            Post #${post.id} | Usuário #${post.userId}
        </p>
    `;
}

function formatarTodo(todo) {
    const status = todo.completed ? '✅ Completo' : '⏳ Pendente';
    const statusColor = todo.completed ? '#4caf50' : '#ff9800';
    return `
        <h3>${todo.title}</h3>
        <p style="color: ${statusColor}; font-weight: bold;">
            ${status}
        </p>
        <p style="margin-top: 10px; color: #999; font-size: 12px;">
            Tarefa #${todo.id}
        </p>
    `;
}

function atualizarStats(total) {
    const tempoDecorrido = ((Date.now() - tempoInicio) / 1000).toFixed(2);
    document.getElementById('total-items').textContent = total;
    document.getElementById('tempo-carregamento').textContent = `${tempoDecorrido}s`;
    document.getElementById('stats').style.display = 'flex';
}

function exibirMensagemErro(mensagem) {
    const erroDiv = document.getElementById('erro-mensagem');
    erroDiv.textContent = mensagem;
    erroDiv.style.display = 'block';
    setTimeout(() => erroDiv.style.display = 'none', 5000);
}

function exibirMensagemSucesso(mensagem) {
    const sucessoDiv = document.getElementById('sucesso-mensagem');
    sucessoDiv.textContent = mensagem;
    sucessoDiv.style.display = 'block';
    setTimeout(() => sucessoDiv.style.display = 'none', 3000);
}

function esconderMensagens() {
    document.getElementById('erro-mensagem').style.display = 'none';
    document.getElementById('sucesso-mensagem').style.display = 'none';
}

function limparDados() {
    document.getElementById('dados-container').innerHTML = '';
    document.getElementById('stats').style.display = 'none';
    esconderMensagens();
}