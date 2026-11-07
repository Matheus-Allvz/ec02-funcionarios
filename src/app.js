const funcionarios = [];
let proximoId = 1;

function cadastrar() {
  const form = document.getElementById("form");
  if (!form.reportValidity()) return;

  funcionarios.push(new Funcionario(
    proximoId++,
    document.getElementById("nome").value,
    Number(document.getElementById("idade").value),
    document.getElementById("cargo").value,
    Number(document.getElementById("salario").value)
  ));

  form.reset();
  renderizar();
}

function renderizar() {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  for (const funcionario of funcionarios) {
    const linha = document.createElement("tr");

    for (const valor of [funcionario.id, funcionario.nome, funcionario.idade, funcionario.cargo, moeda(funcionario.salario)]) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    }

    tabela.appendChild(linha);
  }
}
