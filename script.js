document.addEventListener("DOMContentLoaded", () => {
    fetch("tutorials.json")
        .then(res => res.json())
        .then(videos => renderSidebar(videos))
        .catch(err => console.error("Error loading videos", err));
});

function renderSidebar(videos) {
    const container = document.getElementById("Video-sidebar");
    container.innerHTML = "";

    const categories = {};
    videos.forEach(v => {
        if (!categories[v.category]) categories[v.category] = [];
        categories[v.category].push(v);
    });

    for (const [catName, videoList] of Object.entries(categories)) {
        const group = document.createElement("div");
        group.classList.add("category-group");

        group.innerHTML = `
        <h3>${catName}</h3>
        <div class ="tutorials-grid">
        ${videoList.map(v => `
            <article class = "tutorials-card">
                    <div class="video-container">
                        <iframe
                            src="https://www.youtube.com/embed/${v.id}"
                            title="${v.title}"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="card-details">
                        <span class="skill-badge">${v.level}</span>
                        <h3>${v.title}</h3>
                        </div>
            </article>
        `).join("")}
        </div>
        `;
        container.appendChild(group);
    }
}
           
    