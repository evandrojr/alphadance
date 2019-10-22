import App from './App.svelte';


const atividades = [
	{
		diaSemana: "Segunda",
		locais: [
			{
				nome: "Aracaju",
				aulas: { f: [9], z: [19] },
			},
			{
				nome: 'Pituba',
				aulas: { f: [12, 19], z: [9] }
			}
		]
	}
	,
	{
		diaSemana: "Terça",
		locais: [
			{
				nome: "Aracaju",
				aulas: { f: [9], z: [19] },
			},
			{
				nome: 'Pituba',
				aulas: { f: [12, 19], z: [9] }
			}
		]
	}

]


const app = new App({
	target: document.body,
	props: {
		atividades: atividades
	}
});

export default app;