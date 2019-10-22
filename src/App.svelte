<script>
	export let name;
	export let atividades;
	
	function tranformarParaAtividadesPorHora() {
		return atividades;
  	}
	
</script>

<style>
	h1 {
		color: yellow;
		text-shadow: 1px 1px #000000;
	}

    [atividades-por-horario] {
      border-color: black;
      border-style: solid;
      display: flex;
	  margin: 1rem;
	  padding: .2rem;

    }

    [horario] {
      padding: 1rem;
	}
	
	[topo] {
		padding: .5em;
		text-align: center;
		border-bottom: solid 1px;
	}

	[preto]{
		color: #000000;
	}

	[fundo-amarelo]{
		background-color: #EEC82F;
		
	}

	[local-e-atividade]{
		padding-left: .5em;

	}
</style>

<div topo fundo-amarelo>
<h1 preto>alphadance</h1>
</div>

<div>

{#each tranformarParaAtividadesPorHora() as atividade}
    <h2>{atividade.dia_semana}</h2>
    <div atividades-por-horario>
      <div horario fundo-amarelo>9:10</div>
      <div>
        <div local-e-atividade>Pituba: Zumba</div>
        <div local-e-atividade>Aracaju: Fitdance</div>

      </div>
    </div>


{/each}

 



  </div>