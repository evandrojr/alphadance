<script>
	export let atividades;

	let fitdanceCheckbox;
	let zumbaCheckbox;
	let fitdanceCheckboxLocalStorage = JSON.parse(localStorage.getItem("fitdanceCheckbox"));
	let zumbaCheckboxLocalStorage = JSON.parse(localStorage.getItem("zumbaCheckbox"));

	if (fitdanceCheckboxLocalStorage !== null) {
		fitdanceCheckbox = fitdanceCheckboxLocalStorage;
		console.log('fitdanceCheckboxCarregado', fitdanceCheckbox);
	} else {
		fitdanceCheckbox = true;
		localStorage.setItem("fitdanceCheckbox", JSON.stringify(true));
	}

	if (zumbaCheckboxLocalStorage !== null) {
		zumbaCheckbox = zumbaCheckboxLocalStorage;
		console.log('zumbaCheckboxCarregado', zumbaCheckbox);
	} else {
		zumbaCheckbox = true;
		localStorage.setItem("zumbaCheckbox", JSON.stringify(true));
	}

	function toggleFitdance() {
		localStorage.setItem('fitdanceCheckbox', JSON.stringify(!fitdanceCheckbox));
		window.location.reload(true);
	}

	function toggleZumba() {
		localStorage.setItem('zumbaCheckbox', JSON.stringify(!zumbaCheckbox));
		window.location.reload(true);
	}


	function tranformarParaAtividadesPorHora() {
		let trans = [];
		let transAtividadesPorDia;
		let transAtividadesAgrupadasPorHora;

		const nomesAtividades = { f: '<font color="#BA0B69">Fitdance</font>', v: 'Dança do ventre', z: '<font color="#CDD854">Zumba</font>' };

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

							if (aulasHorarios[0] == 'f' && fitdanceCheckbox || aulasHorarios[0] == 'z' && zumbaCheckbox || aulasHorarios[0] == 'v') {
								if (horario == h) {
									transAtividadesPorDia.horarios.push({ hora: horario, atividade: nomesAtividades[aulasHorarios[0]], local: local.nome, professor: '' });
								} else {
									if (horario.h == h) {
										transAtividadesPorDia.horarios.push({ hora: horario.h, atividade: nomesAtividades[aulasHorarios[0]], local: local.nome, professor: horario.p });
									}
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
		// console.log('trans', trans);
		return trans;
	}

</script>

<style>
	[atividades-por-horario] {
		border-color: #200939;
		border-style: solid;
		display: flex;
		margin: .2rem;
		/* border-style: solid;
		border-color: #EEC82F; */
	}

	[horario] {
		min-width: 40px;
		padding: .5rem;
		text-align: center;
		color: #200939;
	}

	[base-topo] {
		display: flex;
		flex-direction: column;
		/* border-style: solid;
		border-color: #EEC82F; */
		align-items: center;
	}

	[base-programacao] {
		display: flex;
		flex-direction: column;
		/* border-style: solid;
		border-color: #EEC82F; */
		align-items: center;
		/* justify-content: center; */
		/* width: 100%; */
	}

	[topo] {
		display: flex;
		/* border-style: solid;
		border-color: #EEC82F; */
		justify-content: center;
		flex-direction: column;
		width: 80%;
		text-align: justify;
	}

	[fundo-amarelo] {
		background-color: #EEC82F;
	}

	[local-e-atividade] {
		padding-left: .5em;
		/* width: 500px; */
		text-align: left;
		/* border-style: solid;
		border-color: #EEC82F; */

	}

	a {
		color: #EEC82F;
	}

	[programacao] {
		/* display: flex; */
		width: 90%;
		min-width: 60%;
		/* border-style: solid;
		border-color: #EEC82F; */

	}

	[rodape] {
		width: 90%;
		text-align: center;
	}

	[professor] {
		color: #8BAA6B;
	}

	[text-align-center] {
		text-align: center;
	}

	[fitdance-cor] {
		color: #BA0B69;
	}

	[zumba-cor] {
		color: #CDD854;
	}

	[inline] {
		display: inline;
	}
</style>

<div base-topo>
	<div topo>
		<div text-align-center>
			<img src="images/alphadance.png" alt="alphadance" width="200px">
		</div>
		<div>
			Horários não oficiais das aulas de dança nas unidades da Rede Alpha em: Aracaju, Caminho das Árvores, Costa
			Azul, Itaigara e Shopping Bella Vista.
		</div>
	</div>
</div>

<br>
<br>

<div opcoes text-align-center>
	<input type="checkbox" bind:checked={fitdanceCheckbox} checked={fitdanceCheckbox} on:click={toggleFitdance}>
	<div inline fitdance-cor on:click={toggleFitdance}>FitDance</div>
	&nbsp;&nbsp;&nbsp;
	<input type="checkbox" bind:checked={zumbaCheckbox} checked={zumbaCheckbox} on:click={toggleZumba}>
	<div inline zumba-cor on:click={toggleZumba}>Zumba</div>
</div>

<br>

<div base-programacao>
	{#each tranformarParaAtividadesPorHora() as dia}
		<div programacao>
				<h2>{dia.diaSemana}</h2>
				{#each Object.keys(dia.horarios) as hora}
					<div atividades-por-horario>
						<div horario fundo-amarelo>{hora}:10</div>
						<div>
							{#each Object.values(dia.horarios[hora]) as aula}
								{#if aula.professor}
									<div local-e-atividade>{aula.local}: {@html aula.atividade} <span professor>#{aula.professor}</span></div>
								{:else}
									<div local-e-atividade>{aula.local}: {@html aula.atividade}</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
	{/each}
</div>
<br><br><br>
<div rodape>
			Para correções e sugestões fale com: <a
				href="https://api.whatsapp.com/send?phone=5571982864766&text=Ol%C3%A1%2C%20tenho%20uma%20sugest%C3%A3o%20sobre%20o%20alphadance.">Evandro WhatsApp:
				(71)98286-4766</a>
<br><br>
				Ou corrija diretamente <a href="https://github.com/evandrojr/alphadance/blob/master/src/main.js">aqui.</a>
</div>
<br>