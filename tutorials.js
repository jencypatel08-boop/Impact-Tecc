document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("video-sidebar");

    if (!container) return;


    fetch("tutorials.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load JSON");
            }
            return response.json();
        })
        .then(videos => {
            if (!Array.isArray(videos)||videos.length === 0){
                container.textContent = "No tutorials are avaliable yet.";
                return;
            }
            
            renderSidebar(videos);

        })
        .catch(error => {
            console.error("Error loading videos:", error);

            container.textContent = 
            "Unable to load tutorials";
        });
});
function renderSidebar(videos) {
    const container = document.getElementById("video-sidebar");
    if (!container) return;

    container.innerHTML = "";

    const categories = {};
    videos.forEach(video => {
        const category =
        video.Category || 
        video.category || 
        "Other Tutorials";
        if (!categories[category]) {
            categories[category] = [];
        }

        categories[category].push(video);
    });

    for (const [categoryName, videoList] of Object.entries(categories)) {
        const group = document.createElement("section");
        group.classList.add("category-group");

        const heading = document.createElement("h2");
        heading.textContent = categoryName;

        const grid = document.createElement("div");
        grid.classList.add("tutorials-grid");

        videoList.forEach(video => {
            const card = document.createElement("article");
            card.classList.add("tutorials-card");
            const videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            const iframe = document.createElement("iframe");
            iframe.src = 
            `https://www.youtube.com/embed/${encodeURIComponent(video.id)}`;
            iframe.title = video.title || "Craft tutorial";
            iframe.loading ="lazy";
            iframe.allow = 
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            
            videoContainer.appendChild(iframe);

            const details = document.createElement("div");
            details.classList.add("card-details");

            const badge = document.createElement("span");
            badge.classList.add("skill-badge");
            badge.textContent = video.level || "All levels";

            const title = document.createElement("h3");
            title.textContent = video.title || "Untitled tutorial";

            details.append(badge, title);
            card.append(videoContainer, details);
            grid.appendChild(card);
        });

        group.append(heading, grid);
        container.appendChild(group);
    }
}

