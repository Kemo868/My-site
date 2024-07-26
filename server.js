document.addEventListener('DOMContentLoaded', () => {
    const starList = document.getElementById('star-list');
    const starDetails = document.getElementById('star-details');
    const addStarButton = document.getElementById('add-star-button');
    const addStarForm = document.getElementById('add-star-form');
    const saveStarButton = document.getElementById('save-star-button');

    const fetchStars = async () => {
        const response = await fetch('http://localhost:3000/api/stars');
        const stars = await response.json();
        renderStarList(stars);
    };

    const renderStarList = (stars) => {
        starList.innerHTML = '<h2>Stars</h2>';
        stars.forEach(star => {
            const starItem = document.createElement('div');
            starItem.textContent = star.name;
            starItem.addEventListener('click', () => showStarDetails(star));
            starList.appendChild(starItem);
        });
    };

    const showStarDetails = (star) => {
        starDetails.innerHTML = `
            <h2>${star.name}</h2>
            <p>${star.biography}</p>
            <h3>Achievements</h3>
            <ul>${star.achievements.map(a => `<li>${a.title} (${a.year}): ${a.description}</li>`).join('')}</ul>
            <h3>Contributions</h3>
            <ul>${star.contributions.map(c => `<li>${c.title}: ${c.description}</li>`).join('')}</ul>
        `;
    };

    addStarButton.addEventListener('click', () => {
        addStarForm.style.display = 'block';
    });

    saveStarButton.addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const biography = document.getElementById('biography').value;
        const achievements = document.getElementById('achievements').value.trim().split('\n').map(line => {
            const [title, year, description] = line.split(',');
            return { title, year: parseInt(year), description };
        });
        const contributions = document.getElementById('contributions').value.trim().split('\n').map(line => {
            const [title, description] = line.split(',');
            return { title, description };
        });

        const newStar = { name, biography };
