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
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [9], z: [19] }
			}
		]
	},
	{
		diaSemana: "Terça",
		locais: [
			{
				nome: "Aracaju",
				aulas: { f: [19], z: [8] },
			},
			{
				nome: 'Pituba',
				aulas: { z: [18] }
			},
			{
				nome: 'Itaigara',
				aulas: { f: [9, 19] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [9, 19] }
			}
		]
	},
	{
		diaSemana: "Quarta",
		locais: [
			{
				nome: "Aracaju",
				aulas: { z: [19] },
			},
			{
				nome: 'Pituba',
				aulas: { f: [7, 18, 19] }
			},
			{
				nome: 'Itaigara',
				aulas: { z: [8, 19] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { z: [8, 19] }
			}
		]
	},
	{
		diaSemana: "Quinta",
		locais: [
			{
				nome: "Aracaju",
				aulas: { f: [19], z: [8] },
			},
			{
				nome: 'Pituba',
				aulas: { z: [17] }
			},
			{
				nome: 'Itaigara',
				aulas: { f: [9, 19] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [9, 19] }
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