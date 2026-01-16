document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');

    fetch('data/creators.json')
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = ''; // Clear loading state
            
            data.forEach(creator => {
                const card = document.createElement('a');
                card.className = 'creator-card';
                card.href = creator.ct_link;
                card.target = '_blank';
                
                card.innerHTML = `
                    <div class="avatar-wrapper">
                        <img src="${creator.avatar}" alt="${creator.name}" onerror="this.src='https://via.placeholder.com/300?text=${creator.name}'">
                    </div>
                    <div class="creator-info">
                        <h3 class="creator-name">${creator.name}</h3>
                        <p class="creator-specialty">${creator.specialty}</p>
                    </div>
                `;
                
                gallery.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading creators:', error);
            gallery.innerHTML = '<div class="error">Failed to load creators. Please check back later.</div>';
        });
});
