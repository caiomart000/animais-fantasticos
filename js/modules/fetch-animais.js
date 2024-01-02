import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  //Cria a div contendo infos com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }
  //preenche cada animal no DOM
  function preencherAnimais(animal) {
    const numerosGrid = document.querySelector(target);
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  //anima os números de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }
  //puxa os animais pelo arquivo json
  //e cria cada animal usando createAnimal
  async function criarAnimais() {
    try {
      //fetch, espera resposta e transforma em Json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      //após transformar em json, ativa as funções
      //para preencher e animar os números
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
