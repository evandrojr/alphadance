<script>
	export let atividades;
	
	function tranformarParaAtividadesPorHora() {
		let trans=[]; 
		let transAtividadesPorDia;
		const nomesAtividades = {f: 'Fitdance', z: 'Zumba' };	
		
		atividades.forEach(atividadesPorDia => {
			transAtividadesPorDia = {};	
			transAtividadesPorDia.diaSemana = atividadesPorDia.diaSemana;
			transAtividadesPorDia.horarios = [];	
			for(let h=6; h<=20; ++h){
				atividadesPorDia.locais.forEach(local => {
			//  console.log('local', local);
			//  console.log('local.aulas', local.aulas);
				Object.entries(local.aulas).forEach(aulasHorarios => {
					console.log('aulasHorarios', aulasHorarios);
					aulasHorarios[1].forEach(horario => {
						console.log('horario', horario);
						if(horario==h){
							transAtividadesPorDia.horarios.push({h: horario, atividade: nomesAtividades[aulasHorarios[0]], local: local.nome }); 
						}
					});
				});
			 });
		 }
		 trans.push(transAtividadesPorDia);	
			
		});
		
		console.log('trans',trans);
		
		return trans;
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
    <h2>{atividade.diaSemana}</h2>
    <div atividades-por-horario>
      <div horario fundo-amarelo>9:10</div>
      <div>
        <div local-e-atividade>Pituba: Zumba</div>
        <div local-e-atividade>Aracaju: Fitdance</div>

      </div>
    </div>
{/each}

 



  </div>