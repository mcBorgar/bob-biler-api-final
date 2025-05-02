const API = "http://192.168.6.109:3000"

//henter navn og pris fra html kaller det navn og pris til senere
async function leggTil() {
  const navn = document.getElementById("navn").value
  const pris = document.getElementById("pris").value

//send data lagt inn i input med post til API (index.js)
  await fetch(`${API}/leggtil`, {
    method: "POST",                                  //sende data ikke hente
    headers: { "Content-Type": "application/json" }, //sender json data,  req.body forstår
    body: JSON.stringify({ navn, pris })             //konvertere til json
  })
  hentBiler()  //refresh
}


//slett
async function slett() {
  const navn = document.getElementById("navn").value   //lese input

//sende til api
  await fetch(`${API}/slett`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },   //sender json data til api
    body: JSON.stringify({ navn })                     //konvertere til json
  })
  hentBiler() //refresh
}

//bil liste
async function hentBiler() {
  const res = await fetch(`${API}/biler`)              //spør api om liste av biler
  const data = await res.json()                        //omformulere json-tekst
  const ul = document.getElementById("biler")          //slette gammel, gi ny
  ul.innerHTML = ""  //tom
  data.forEach(bil => {
    ul.innerHTML += `<li>${bil.navn} - ${bil.pris} kr (${bil.antall} stk)</li>`// biler
  })
}
//refresh
hentBiler()