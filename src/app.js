const funcionarios = [];
let proximoId = 1;
let editandoId = null;
let relatorioAtual = null;

const relatorios = {
  salarioAlto: () => funcionarios.filter(funcionario => funcionario.salario > 5000).map(funcionario => funcionario.toString()),
  mediaSalarial: () => funcionarios.length
    ? [`Média salarial: ${moeda(funcionarios.reduce((soma, funcionario) => soma + funcionario.salario, 0) / funcionarios.length)}`]
    : [],
  cargos: () => [...new Set(funcionarios.map(funcionario => funcionario.cargo))],
  nomes: () => funcionarios.map(funcionario => funcionario.nome.toUpperCase())
};

const exibirRelatorio = () => {
  if (!relatorioAtual) return;
  const linhas = relatorios[relatorioAtual]();
  document.getElementById("relatorio").textContent = linhas.length ? linhas.join("\n") : "Nenhum funcionário encontrado.";
};

document.querySelectorAll("[data-relatorio]").forEach(botao => {
  botao.onclick = function () {
    relatorioAtual = this.dataset.relatorio;
    exibirRelatorio();
  };
});

const buscarPorId = id => funcionarios.find(funcionario => funcionario.id === id);

const remover = id => {
  const indice = funcionarios.findIndex(funcionario => funcionario.id === id);
  if (indice >= 0) funcionarios.splice(indice, 1);
};

const atualizar = (funcionario, dados) => {
  funcionario.nome = dados.nome;
  funcionario.idade = dados.idade;
  funcionario.cargo = dados.cargo;
  funcionario.salario = dados.salario;
};

const lerFormulario = () => ({
  nome: document.getElementById("nome").value,
  idade: Number(document.getElementById("idade").value),
  cargo: document.getElementById("cargo").value,
  salario: Number(document.getElementById("salario").value)
});

const limparFormulario = () => {
  document.getElementById("form").reset();
  document.getElementById("salvar").textContent = "Cadastrar";
  editandoId = null;
};

document.getElementById("salvar").onclick = function () {
  if (!document.getElementById("form").reportValidity()) return;
  const dados = lerFormulario();

  if (editandoId === null) {
    funcionarios.push(new Funcionario(proximoId++, dados.nome, dados.idade, dados.cargo, dados.salario));
  } else {
    atualizar(buscarPorId(editandoId), dados);
  }

  limparFormulario();
  renderizar();
};

const renderizar = () => {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  for (const funcionario of funcionarios) {
    const linha = document.createElement("tr");

    for (const valor of [funcionario.id, funcionario.nome, funcionario.idade, funcionario.cargo, moeda(funcionario.salario)]) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    }

    const editar = document.createElement("button");
    editar.type = "button";
    editar.textContent = "Editar";
    editar.onclick = function () {
      document.getElementById("nome").value = funcionario.nome;
      document.getElementById("idade").value = funcionario.idade;
      document.getElementById("cargo").value = funcionario.cargo;
      document.getElementById("salario").value = funcionario.salario;
      document.getElementById("salvar").textContent = "Salvar";
      editandoId = funcionario.id;
    };

    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.textContent = "Excluir";
    excluir.onclick = function () {
      remover(funcionario.id);
      if (editandoId === funcionario.id) limparFormulario();
      renderizar();
    };

    const acoes = document.createElement("td");
    acoes.append(editar, " ", excluir);
    linha.appendChild(acoes);

    tabela.appendChild(linha);
  }

  exibirRelatorio();
};
