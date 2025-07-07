export function renderActivityHeatmap(containerId, submissions, selectedYear = new Date().getFullYear()) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const dailyCounts = {};
    for (const sub of submissions) {
        const date = new Date(sub.creationTimeSeconds * 1000);
        const year = date.getFullYear();
        if (year !== selectedYear) continue;

        const key = date.toISOString().split('T')[0];
        dailyCounts[key] = (dailyCounts[key] || 0) + 1;
    }

    const yearStart = new Date(`${selectedYear}-01-01`);
    const yearEnd = new Date(`${selectedYear}-12-31`);
    const days = [];

    for (let d = new Date(yearStart); d <= yearEnd; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split('T')[0];
        const count = dailyCounts[key] || 0;
        days.push({ date: key, count });
    }

    const maxCount = Math.max(...days.map(d => d.count), 1);
    const colors = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];

    const getColor = count => {
        if (count === 0) return colors[0];
        const level = Math.min(Math.floor(count / (maxCount / 4)), 4);
        return colors[level];
    };

    container.innerHTML = `
  <div style="text-align:center; margin-bottom:10px;">
    <label for="yearSelect">Select Year: </label>
    <select id="yearSelect">
      ${Array.from(new Set(submissions.map(s => new Date(s.creationTimeSeconds * 1000).getFullYear())))
            .sort((a, b) => b - a)
            .map(y => `<option value="${y}" ${y === selectedYear ? 'selected' : ''}>${y}</option>`).join('')}
    </select>
  </div>
  <div class="heatmap-scroll-container">
    <div class="heatmap-grid"></div>
  </div>
`;

    const grid = container.querySelector('.heatmap-grid');
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(53, minmax(10px, 1fr))";
    grid.style.gap = "2px";
    grid.style.justifyContent = "center";
    grid.style.width = "100%";

    if (window.innerWidth < 768) {
        const scrollContainer = container.querySelector('.heatmap-scroll-container');
        scrollContainer.style.overflowX = 'auto';
        scrollContainer.style.WebkitOverflowScrolling = 'touch';
        scrollContainer.style.paddingBottom = '4px';
        grid.style.minWidth = '650px';
    }


    for (const day of days) {
        const box = document.createElement('div');
        box.title = `${day.date}: ${day.count} submission${day.count !== 1 ? 's' : ''}`;
        box.style.width = "100%";
        box.style.aspectRatio = "1 / 1";
        box.style.backgroundColor = getColor(day.count);
        box.style.borderRadius = "2px";
        grid.appendChild(box);
    }

    document.getElementById("yearSelect").addEventListener("change", e => {
        renderActivityHeatmap(containerId, submissions, parseInt(e.target.value));
    });
}
