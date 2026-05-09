const profile = {
    name: "Inggil Lilo Prayogo",
    hardSkills: ["HTML", "TailwindCSS", "JavaScript"],
    softSkills: ["Time Management", "Communication", "Problem Solving"],
};
const heroName = document.querySelector("#heroName");
heroName.textContent = profile.name;

const hardSkillContainer = document.querySelector("#hard-skill-container");
const softSkillContainer = document.querySelector("#soft-skill-container");

profile.hardSkills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    hardSkillContainer.appendChild(li);
});

profile.softSkills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    softSkillContainer.appendChild(li);
});

const contactForm = document.querySelector('#contactForm');
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const input_nama = document.querySelector('#nama').value;
    alert(`Terima kasih ${input_nama} sudah menghubungi saya!`);
})

/* ==========================================================================
TUGAS PERTEMUAN 6: FETCH API
==========================================================================
Tujuan: Mengambil data dari API dan menampilkannya ke halaman web.
*/

// TODO 1: Ambil elemen
const jokeText = document.getElementById("jokeDisplay"); 
const refreshBtn = document.getElementById("refresh-joke"); 

// TODO 2: Buat function bernama getJoke()
async function getJoke() {
    jokeText.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Menyiapkan lelucon...`;

    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming");
        const data = await response.json();

// TODO 3 & 4: Cek tipe joke dan tampilkan ke elemen #jokeDisplay
        if (data.type === "single") {
            jokeText.innerText = `"${data.joke}"`;
        } else {
            jokeText.innerText = `"${data.setup} ... ${data.delivery}"`;
        }
    } catch (error) {
        jokeText.innerText = "Gagal mengambil lelucon. Coba klik refresh lagi!";
        console.error("Fetch error:", error);
    }
}

// TODO 5: Tambahkan event click pada tombol #refresh-joke
if (refreshBtn) {
    refreshBtn.addEventListener("click", getJoke);
}

// TODO 6: Panggil function getJoke() saat halaman pertama kali dibuka
getJoke();