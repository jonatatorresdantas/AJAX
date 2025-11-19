function carregarDadosXMLHttp() {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.exemplo.com/dados', true);
        
        xhr.onload = function() {
            try {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const dados = JSON.parse(xhr.responseText);
                    preencherDados(dados);
                } else {
                    throw new Error(`Erro HTTP: ${xhr.status}`);
                }
            } catch (erro) {
                console.error('Erro ao processar resposta:', erro);
                exibirMensagemErro('Erro ao processar os dados.');
            }
        };
        
        xhr.onerror = function() {
            console.error('Erro de rede');
            exibirMensagemErro('Erro de conexão. Verifique sua internet.');
        };
        
        xhr.timeout = 10000;
        xhr.ontimeout = function() {
            console.error('Timeout na requisição');
            exibirMensagemErro('A requisição demorou muito. Tente novamente.');
        };
        
        xhr.send();
        
    } catch (erro) {
        console.error('Erro ao criar requisição:', erro);
        exibirMensagemErro('Erro ao iniciar requisição.');
    }
}