document.addEventListener('DOMContentLoaded', () => {

    const suspects = [
    {
        id: 'rio',
        name: 'Rio Poluído',
        scientificName: 'Contaminação por Resíduos Urbanos',
        image: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/09/plasticos_0.webp?w=419&h=283&crop=0',
        description: 'O rio da cidade está contaminado por esgoto e lixo, afetando peixes e a saúde da população local.\nAs pessoas estão com infecções de pele e diarreia.\nRelacione o problema com a falta de saneamento e discutir o que os povos indígenas ensinam sobre o cuidado com a água.'
    },
    {
        id: 'desmatamento',
        name: 'Desmatamento',
        scientificName: 'Perda de Habitat Natural',
        image: 'https://climatetransform.com/wp-content/uploads/2021/03/industrial-logging-photo.jpg',
        description: 'Uma comunidade desmata para abrir pastos. A retirada de árvores reduz a biodiversidade, altera o clima da região e há aumento de casos de doenças respiratórias.'
    },
    {
        id: 'hospital',
        name: 'Hospital Rural',
        scientificName: 'Impacto de Infraestruturas Humanas',
        image: 'https://s2-g1.glbimg.com/yqv5ASeL2fe8rm7Tqi05zEvw8J4=/696x390/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/W/w/rfMKfwSWWcYiQDKa5zmA/hospital.png',
        description: 'A construção de um hospital rural trouxe benefícios sociais, mas gerou impacto ambiental local.\nO hospital rural descarta lixo hospitalar de forma inadequada.\nDiscuta o impacto ambiental e os riscos biológicos, propondo um plano de descarte responsável.'
    }
];


    const screens = document.querySelectorAll('.screen');
    const startBtn = document.getElementById('start-btn');
    const suspectsGrid = document.getElementById('suspects-grid');
    const investigationForm = document.getElementById('investigation-form');
    const finalReportContainer = document.getElementById('final-report');
    const printBtn = document.getElementById('print-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    let currentSuspect = null;

    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.toggle('active', screen.id === screenId);
        });
    }

    function populateSuspects() {
        suspectsGrid.innerHTML = '';
        suspects.forEach(suspect => {
            const card = document.createElement('div');
            card.className = 'suspect-card';
            card.dataset.id = suspect.id;
            card.innerHTML = `
                <img src="${suspect.image}" alt="Foto de ${suspect.name}">
                <h3>${suspect.name}</h3>
                <p class="suspect-description">${suspect.description}</p>
            `;
            card.addEventListener('click', () => selectSuspect(suspect.id));
            suspectsGrid.appendChild(card);
        });
    }

    function selectSuspect(suspectId) {
        currentSuspect = suspects.find(s => s.id === suspectId);
        document.getElementById('suspect-img-header').src = currentSuspect.image;
        document.getElementById('suspect-name-header').innerHTML = `Estudo do caso: <span>${currentSuspect.name}</span>`;
        document.getElementById('suspect-description').textContent = currentSuspect.description;
        investigationForm.reset();
        showScreen('investigation-screen');
    }

    function generateReport(event) {
        event.preventDefault();

        const formData = {
            team: document.getElementById('team-name').value,
            impact: document.getElementById('impact-report').value,
            mitigation: document.getElementById('mitigation-plan').value
        };

        finalReportContainer.innerHTML = `
            <h2>Elaboração para Apresentação</h2>
            <p><strong>DESCRIÇÃO:</strong> ${currentSuspect.description}</p>
            <p><strong>ALUNOS:</strong> ${formData.team}</p>

            <h3>Relatório</h3>
            <p>${formData.impact}</p>

            <h3>Considerações Finais</h3>
            <p>${formData.mitigation}</p>
        `;
        showScreen('report-screen');
    }

    startBtn.addEventListener('click', () => showScreen('selection-screen'));
    
    investigationForm.addEventListener('submit', generateReport);
    
    printBtn.addEventListener('click', () => window.print());

    restartBtn.addEventListener('click', () => {
        showScreen('selection-screen');
    });

    populateSuspects();
    showScreen('start-screen');
});