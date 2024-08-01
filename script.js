document.addEventListener('DOMContentLoaded', () => {
    const machines = [
        { name: "Panneaux solaires", rate: 1, type: 'production' },
        { name: "Panneaux solaire amélioré", rate: 4, type: 'production' },
        { name: "Générateur à charbon", rate: 10, type: 'production' },
        { name: "Groupe électrogène", rate: 65, type: 'production' },
        { name: "Repair machine", rate: 15, type: 'consumption' }
    ];

    const upgrades = [
        { name: "Amélioration du rayon d'action", range: 20, energy: 20 },
        { name: "Amélioration de durabilité", durability: 20, energy: 10 },
        { name: "Amélioration de production", production: 20, energy: 20 },
        { name: "Amélioration de consommation", energy: -30 }
    ];

    let addedMachines = [];
    let selectedMachineIndex = null;

    function generateMachineOptions() {
        const select = document.getElementById('machineSelect');
        machines.forEach(machine => {
            const option = document.createElement('option');
            option.value = machine.name;
            option.textContent = machine.name;
            select.appendChild(option);
        });
    }

    function handleMachineSelection() {
        const select = document.getElementById('machineSelect');
        const selectedMachineName = select.value;
        const machine = machines.find(m => m.name === selectedMachineName);

        if (machine) {
            const newMachine = {
                ...machine,
                durability: 100,
                upgrades: []
            };
            addedMachines.push(newMachine);
            updateMachineList();
        }
    }

    function updateMachineList() {
        const listContainer = document.getElementById('machineListContainer');
        listContainer.innerHTML = '';

        addedMachines.forEach((machine, index) => {
            const machineCard = document.createElement('div');
            machineCard.className = 'machine-card';

            const machineImage = document.createElement('img');
            machineImage.src = `/images/${machine.name.replace(/\s+/g, '-')}.png`; // Chemin de l'image
            machineImage.alt = machine.name;

            const machineInfo = document.createElement('div');

            const machineTitle = document.createElement('div');
            machineTitle.textContent = machine.name;

            const machineDetails = document.createElement('div');
            machineDetails.className = 'machine-details';
            const currentRate = calculateMachineRate(machine);
            machineDetails.textContent = `${machine.durability}% | ${currentRate.toFixed(2)} kW/min`;

            const upgradeIconsContainer = document.createElement('div');
            upgradeIconsContainer.className = 'upgrade-icons';
            machine.upgrades.forEach(upgradeName => {
                const upgrade = upgrades.find(u => u.name === upgradeName);
                if (upgrade) {
                    const upgradeIcon = document.createElement('img');
                    upgradeIcon.src = `/images/upgrade-2-${upgradeName.replace(/\s+/g, '-')}.png`; // Chemin de l'image de l'amélioration
                    upgradeIcon.alt = upgradeName;
                    upgradeIcon.className = 'upgrade-2-icon'; // Ajouter la classe pour les icônes d'amélioration
                    upgradeIconsContainer.appendChild(upgradeIcon);
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', () => {
                addedMachines.splice(index, 1);
                updateMachineList();
                clearMachineDetails();
                selectedMachineIndex = null; // Réinitialiser l'index sélectionné
            });

            machineCard.addEventListener('click', () => {
                selectedMachineIndex = index;
                displayMachineDetails(index);
            });

            machineInfo.appendChild(machineTitle);
            machineInfo.appendChild(machineDetails);
            machineInfo.appendChild(upgradeIconsContainer);
            machineCard.appendChild(machineImage);
            machineCard.appendChild(machineInfo);
            machineCard.appendChild(deleteButton);
            listContainer.appendChild(machineCard);
        });

        calculateTotalRate();
        if (selectedMachineIndex === null) {
            clearMachineDetails();
        }
    }

    function clearMachineDetails() {
        const machineDetailsContainer = document.getElementById('machineInstances');
        machineDetailsContainer.innerHTML = '';
        machineDetailsContainer.style.display = 'none';
    }

    function displayMachineDetails(index) {
        if (index === null || index >= addedMachines.length) {
            clearMachineDetails();
            return;
        }

        const machineDetailsContainer = document.getElementById('machineInstances');
        machineDetailsContainer.innerHTML = '';
        const machine = addedMachines[index];

        // Créer un conteneur pour le nom et l'image de la machine
        const headerContainer = document.createElement('div');
        headerContainer.style.textAlign = 'center';
        headerContainer.style.marginBottom = '20px';

        // Ajouter l'image de la machine avec une classe nommée d'après la machine
        const machineImage = document.createElement('img');
        machineImage.src = `/images/${machine.name.replace(/\s+/g, '-')}.png`; // Chemin de l'image
        machineImage.alt = machine.name;
        machineImage.className = machine.name.replace(/\s+/g, '-'); // Ajoute la classe nommée d'après la machine
        headerContainer.appendChild(machineImage);

        // Ajouter le nom de la machine
        const title = document.createElement('h3');
        title.textContent = machine.name;
        headerContainer.appendChild(title);

        // Ajouter le conteneur d'en-tête au conteneur principal
        machineDetailsContainer.appendChild(headerContainer);

        // Créer le conteneur des détails de la machine
        const detailsDiv = document.createElement('div');
        detailsDiv.style.textAlign = 'center';

        const durabilityLabel = document.createElement('label');
        durabilityLabel.textContent = 'Durabilité:';
        detailsDiv.appendChild(durabilityLabel);

        const durabilityInput = document.createElement('input');
        durabilityInput.type = 'number';
        durabilityInput.value = machine.durability;
        durabilityInput.min = 0;
        durabilityInput.max = 100;
        durabilityInput.style.margin = '10px 0';
        durabilityInput.addEventListener('input', (e) => {
            machine.durability = Math.max(0, parseInt(e.target.value));
            updateMachineList();
        });
        detailsDiv.appendChild(durabilityInput);

        // Créer le conteneur des améliorations
        const upgradesContainer = document.createElement('div');
        upgradesContainer.className = 'upgrades-container';

        upgrades.forEach(upgrade => {
            const upgradeDiv = document.createElement('div');

            const upgradeImage = document.createElement('img');
            upgradeImage.src = `/images/${upgrade.name.replace(/\s+/g, '-')}.png`; // Chemin de l'image de l'amélioration
            upgradeImage.alt = upgrade.name;
            upgradeImage.className = 'upgrade-2-icon'; // Ajouter la classe pour les icônes d'amélioration

            const upgradeCheckbox = document.createElement('input');
            upgradeCheckbox.type = 'checkbox';
            upgradeCheckbox.checked = machine.upgrades.includes(upgrade.name);
            upgradeCheckbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    machine.upgrades.push(upgrade.name);
                } else {
                    machine.upgrades = machine.upgrades.filter(u => u !== upgrade.name);
                }
                updateMachineList();
            });

            upgradeDiv.appendChild(upgradeImage);
            upgradeDiv.appendChild(upgradeCheckbox);
            upgradesContainer.appendChild(upgradeDiv);
        });

        machineDetailsContainer.appendChild(detailsDiv);
        machineDetailsContainer.appendChild(upgradesContainer);
        machineDetailsContainer.style.display = 'block';
    }

    function calculateMachineRate(machine) {
        let machineRate = machine.rate;

        machine.upgrades.forEach(upgradeName => {
            const upgrade = upgrades.find(u => u.name === upgradeName);
            if (upgrade) {
                if (machine.type === 'production' && upgrade.production) {
                    machineRate += (machine.rate * upgrade.production / 100);
                }
                if (machine.type === 'consumption' && upgrade.energy) {
                    machineRate += (machine.rate * upgrade.energy / 100);
                }
            }
        });

        machineRate *= (machine.durability / 100);
        return machineRate;
    }

    function calculateTotalRate() {
        let totalProduction = 0;
        let totalConsumption = 0;

        addedMachines.forEach(machine => {
            const rate = calculateMachineRate(machine);
            if (machine.type === 'production') {
                totalProduction += rate;
            } else {
                totalConsumption += rate;
            }
        });

        document.getElementById('totalKwMin').textContent = `Production Totale: ${totalProduction.toFixed(2)} kW/min, Consommation Totale: ${totalConsumption.toFixed(2)} kW/min`;
    }

    generateMachineOptions();

    document.getElementById('addMachineButton').addEventListener('click', handleMachineSelection);
});
