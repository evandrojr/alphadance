import App from './App.svelte';


const atividades = [
	// Domingo
	{},
	// Segunda
	{
		Aracaju: { f: [9], z: [19] },
		Pituba: { f: [12, 19], z: [9] }
	}
]


const app = new App({
	target: document.body,
	props: {
		name: 'world',
		atividades: atividades
	}
});

export default app;