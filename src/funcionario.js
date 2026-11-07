const moeda = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

class Funcionario {
  #id;
  #nome;
  #idade;
  #cargo;
  #salario;

  constructor(id, nome, idade, cargo, salario) {
    this.#id = id;
    this.#nome = nome;
    this.#idade = idade;
    this.#cargo = cargo;
    this.#salario = salario;
  }

  get id() { return this.#id; }

  get nome() { return this.#nome; }
  set nome(valor) { this.#nome = valor; }

  get idade() { return this.#idade; }
  set idade(valor) { this.#idade = valor; }

  get cargo() { return this.#cargo; }
  set cargo(valor) { this.#cargo = valor; }

  get salario() { return this.#salario; }
  set salario(valor) { this.#salario = valor; }

  toString() {
    return `#${this.#id} ${this.#nome}, ${this.#idade} anos, ${this.#cargo}, ${moeda(this.#salario)}`;
  }
}
