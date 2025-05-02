    const API = "http://localhost:3000"

    async function leggTil() {
        const navn = document.getElementById("navn").value
        const pris = document.getElementById("pris").value
  
        await fetch(`${API}/leggtil`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ navn, pris })
        })
        hentBiler()
    }
//https://www.w3schools.com/nodejs/nodejs_mysql.asp 


    async function slett() {
      const navn = document.getElementById("navn").value

    }

    async function hentBiler() {

    }

    //hent lista
    hentBiler()