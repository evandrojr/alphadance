import App from './App.svelte';


const atividades = [
	{
		diaSemana: "Segunda",
		locais: [
			{
				nome: "Aracaju teste",
				aulas: { f: [9], z: [19] },
			},
			{
				nome: "Caminho das Árvores",
				aulas: { f: [6] },
			},
			{
				nome: "Costa Azul",
				aulas: { f: [19] },
			},
			{
				nome: 'Itaigara',
				aulas: { z: [19] }
			},
			{
				nome: 'Pituba',
				aulas: { f: [12, 19], z: [9] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [8] }
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
				nome: "Caminho das Árvores",
				aulas: { f: [18], z: [9] },
			},
			{
				nome: "Costa Azul",
				aulas: { f: [12], z: [7] },
			},
			{
				nome: 'Itaigara',
				aulas: { f: [9, 19] }
			},
			{
				nome: 'Pituba',
				aulas: { z: [18] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [19] }
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
				nome: "Costa Azul",
				aulas: { f: [7, 19] },
			},
			{
				nome: 'Pituba',
				aulas: { f: [7, 18, 19], z: [9] }
			},
			{
				nome: 'Itaigara',
				aulas: { z: [8, 19] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [12], z: [8], }
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
				nome: "Caminho das Árvores",
				aulas: { f: [19], z: [9] },
			},
			{
				nome: "Costa Azul",
				aulas: { f: [12], z: [19] },
			},
			{
				nome: 'Pituba',
				aulas: { z: [17], v: [18] }
			},
			{
				nome: 'Itaigara',
				aulas: { f: [9, 19] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [19], z: [8] }
			}
		]
	},
	{
		diaSemana: "Sexta",
		locais: [
			{
				nome: "Aracaju",
				aulas: { f: [8] },
			},
			{
				nome: "Caminho das Árvores",
				aulas: { z: [10] },
			},
			{
				nome: "Costa Azul",
				aulas: { f: [19], z: [7] },
			},
			{
				nome: 'Pituba',
				aulas: { f: [12], z: [18] }
			},

			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [8], z: [19] }
			}
		]
	},
	{
		diaSemana: "Sábado",
		locais: [
			{
				nome: "Aracaju",
				aulas: { f: [11] },
			},
			{
				nome: "Costa Azul",
				aulas: { f: [11] },
			},
			{
				nome: 'Pituba',
				aulas: { f: [11] }
			},
			{
				nome: 'Itaigara',
				aulas: { f: [10] }
			},
			{
				nome: 'Shopping Bella Vista',
				aulas: { f: [9] }
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
