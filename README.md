# EC02 - Funcionários

Sistema de gestão de funcionários de uma startup de tecnologia.

## Como rodar

```bash
docker compose up --build
```

Acesse http://localhost:8081. A pasta `src` é montada no container, então as alterações aparecem ao recarregar a página.

## Função anônima tradicional x arrow function

Antes (Exercício 2):

```js
function buscarPorId(id) {
  return funcionarios.find(function (funcionario) {
    return funcionario.id === id;
  });
}
```

Depois (Exercício 3):

```js
const buscarPorId = id => funcionarios.find(funcionario => funcionario.id === id);
```

A arrow function dispensa a palavra `function`, os parênteses quando há um único parâmetro e o `return` quando o corpo é uma única expressão.
