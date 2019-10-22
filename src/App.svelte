<script>
	export let name;
	export let atividades;
	console.log(atividades);
	
</script>

<style>
	h1 {
		color: yellow;
		text-shadow: 1px 1px #000000;
	}

    [atividades-por-horario] {
      /* border: 1px; */
      border-color: black;
      border-style: solid;
      display: flex;
      margin: 1rem;

    }

    [horario] {
      padding: 1rem;
    }
</style>

<h1>Alphadance</h1>




  <div>
    <h2>Segunda</h2>
    <div atividades-por-horario>
      <div horario>9:10</div>
      <div>
        <div>Pituba: Zumba</div>
        <div>Aracaju: Fitdance</div>

      </div>
    </div>

    <div atividades-por-horario>
      <div horario>19:10</div>
      <div>
        <div>Pituba: Fitdance</div>
      </div>
    </div>



  </div>