/* ==========================================================================
TUGAS PERTEMUAN 5: JS LANJUTAN & DOM MANIPULATION
========================================================================== */

// TODO 4: Object & Array 
const profile = {
    name: "Inggil Lilo Prayogo",
    // Skill disesuaikan dengan isi Hard Skill di HTML kamu
    skills: ["HTML", "CSS", "JavaScript", "Tailwind CSS"] 
};

const heroNameElement = document.querySelector("#heroName");
if (heroNameElement) {
    heroNameElement.textContent = profile.name;
}


// TODO 5: Loop & Create Element 
/** 
 * KOREKSI: Di HTML kamu tidak ada id="skillList". 
 * Container Hard Skill kamu adalah <ul> di dalam seksi #skills. 
 * Karena <ul> tersebut tidak punya ID, kita gunakan querySelector yang lebih spesifik.
 */
const skillContainer = document.querySelector("#skills ul"); 

if (skillContainer) {
    // Kosongkan dulu isi HTML bawaan agar tidak double
    skillContainer.innerHTML = ""; 

    profile.skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillContainer.appendChild(li);
    });
}


// TODO 6: Event Handling 
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        /** 
         * KOREKSI: Di HTML kamu, ID input nama adalah "nama" (id="nama"), 
         * bukan "nameInput". Ini alasan kenapa muncul "Pengunjung".
         */
        const nameInput = document.querySelector("#nama"); 
        const visitorName = nameInput && nameInput.value ? nameInput.value : "Pengunjung";
        
        alert(`Terima kasih ${visitorName} sudah menghubungi saya!`);
    });
}