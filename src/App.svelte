<script>
	export let atividades;

	function tranformarParaAtividadesPorHora() {
		let trans = [];
		let transAtividadesPorDia;
		let transAtividadesAgrupadasPorHora;

		const nomesAtividades = { f: '<font color="#BA0B69">FitDance</font>', v: 'Dança do ventre', z: '<font color="#CDD854">Zumba</font>' };

		atividades.forEach(atividadesPorDia => {
			transAtividadesPorDia = {};
			transAtividadesPorDia.diaSemana = atividadesPorDia.diaSemana;
			transAtividadesPorDia.horarios = [];
			for (let h = 6; h <= 20; ++h) {
				atividadesPorDia.locais.forEach(local => {
					//  console.log('local', local);
					//  console.log('local.aulas', local.aulas);
					Object.entries(local.aulas).forEach(aulasHorarios => {
						// console.log('aulasHorarios', aulasHorarios);
						aulasHorarios[1].forEach(horario => {
							// console.log('horario', horario);
							if (horario == h) {
								transAtividadesPorDia.horarios.push({ hora: horario, atividade: nomesAtividades[aulasHorarios[0]], local: local.nome, professor: '' });
							} else {
								if (horario.h == h) {
									transAtividadesPorDia.horarios.push({ hora: horario.h, atividade: nomesAtividades[aulasHorarios[0]], local: local.nome, professor: horario.p });
								}
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
			transAtividadesPorDia.horarios = transAtividadesAgrupadasPorHora;

			trans.push(transAtividadesPorDia);

		});
		console.log('trans', trans);
		return trans;
	}
</script>

<style>
	[atividades-por-horario] {
		border-color: #200939;
		border-style: solid;
		display: flex;
		margin: .2em;
		border-style: solid;
		border-color: #EEC82F;
	}

	[horario] {
		min-width: 40px;
		padding: .5rem;
		text-align: center;
		color: #200939;
	}

	[base] {
		display: flex;
		flex-direction: column;
		border-style: solid;
		border-color: #EEC82F;
		align-items: center;
	}

	[topo] {
		display: flex;
		border-style: solid;
		border-color: #EEC82F;
		justify-content: center;
		flex-direction: column;
		width: 70%;
		text-align: justify;
	}

	[fundo-amarelo] {
		background-color: #EEC82F;
	}

	[local-e-atividade] {
		padding-left: .5em;
		width: 500px;
		text-align: left;
		border-style: solid;
		border-color: #EEC82F;

	}

	a {
		color: #EEC82F;
	}

	[espacador] {
		width: 80%;
		border-style: solid;
		border-color: #EEC82F;

	}

	[programacao] {
		display: flex;
		border-style: solid;
		border-color: #EEC82F;

	}

	[rodape] {
		width: 100;
		text-align: center;
	}

	[professor] {
		color: #8BAA6B;
	}
</style>

<div base>
	<div topo>
		<img src="images/alphadance.png" alt="alphadance">
		Horários não oficiais das aulas de dança nas unidades da Rede Alpha em: Aracaju, Caminho das Árvores, Costa
		Azul, Itaigara e Shopping Bella Vista.
	</div>
</div>
<br>
<br>
<div programacao>
	<div espacador></div>
	<div>
		{#each tranformarParaAtividadesPorHora() as dia}
				<h2>{dia.diaSemana}</h2>
				{#each Object.keys(dia.horarios) as hora}
					<div atividades-por-horario>
						<div horario fundo-amarelo>{hora}:10</div>
							<div>
								{#each Object.values(dia.horarios[hora]) as aula}
									{#if aula.professor}
										<div local-e-atividade>{aula.local}: {@html aula.atividade}, instrutor: <span professor>{aula.professor}</span></div>
									{:else}
										<div local-e-atividade>{aula.local}: {@html aula.atividade}</div>
									{/if}
								{/each}
							</div>
					</div>
				{/each}
	{/each}
	</div>
	<div espacador></div>
</div>


<br><br><br>
<div rodape>
	
			Para correções e sugestões fale com Evandro <a
				href="https://api.whatsapp.com/send?phone=5571982864766&text=Ol%C3%A1%20tenho%20uma%20sugest%C3%A3o%20sobre%20o%20alphadance.">WhatsApp:
				(71)98286-4766</a>
<br><br>
				Ou corrija diretamente <a href="https://github.com/evandrojr/alphadance/blob/master/src/main.js">aqui.</a>
</div>
<br>