<script>
	export let atividades;
	
	function tranformarParaAtividadesPorHora() {
		let trans=[]; 
		let transAtividadesPorDia;
		let transAtividadesAgrupadasPorHora;
		const nomesAtividades = {f: 'FitDance', z: 'Zumba' };	
		
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
							transAtividadesPorDia.horarios.push({hora: horario, atividade: nomesAtividades[aulasHorarios[0]], local: local.nome }); 
						}
					});
				});
			 });
		 }

		transAtividadesAgrupadasPorHora = transAtividadesPorDia.horarios.reduce(function (r, a) {
				r[a.hora] = r[a.hora] || [];
				r[a.hora].push(a);
				return r;
		}, Object.create(null));
		transAtividadesPorDia.horarios= transAtividadesAgrupadasPorHora;

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
	  margin: .2rem;
	  padding: .2rem;

    }

    [horario] {
	  width: 2.5em;	
      padding: 1rem;
	  text-align: center;
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

{#each tranformarParaAtividadesPorHora() as dia}
    <h2>{dia.diaSemana}</h2>
	{#each Object.keys(dia.horarios) as hora}
		<div atividades-por-horario>
		<div horario fundo-amarelo>{hora}:10</div>
		<div>
		{#each Object.values(dia.horarios[hora]) as aula}
			<div local-e-atividade>{aula.local}: {aula.atividade}</div>
		{/each}
		</div>
		</div>
	{/each}
{/each}

 



  </div>