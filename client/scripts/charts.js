let tagChartInstance = null;

// 1. Problem tags chart
export function renderTagChart(tagData) {
    const ctx = document.getElementById('tagsChart');
    if (!ctx) {
        console.warn("Canvas #tagsChart not found in DOM");
        return;
    }

    if (tagChartInstance) {
        tagChartInstance.destroy();
        tagChartInstance = null;
    }

    const labels = Object.keys(tagData || {});
    const counts = Object.values(tagData || {});

    if (labels.length === 0 || counts.length === 0) {
        ctx.parentElement.innerHTML += `<p style="color:gray;">No tag data available to display.</p>`;
        return;
    }

    const backgroundColors = labels.map((_, i) => {
        const hue = (i * 360 / labels.length) % 360;
        return `hsl(${hue}, 70%, 50%)`;
    });

    tagChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                label: 'Solved Problems by Tag',
                data: counts,
                backgroundColor: backgroundColors,
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Solved Problem Tags',
                    font: { size: 18 }
                },
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}


// 2. language chart
export function renderMostUsedLanguageChart(languageData) {
    const ctx = document.getElementById('languageChart');
    if (!ctx || !languageData) return;

    let chartData;
    if (typeof languageData === 'string') {
        chartData = {
            labels: [languageData],
            datasets: [{
                label: 'Usage Count',
                data: [1],
                backgroundColor: ['#4bc0c0'],
                borderColor: ['#fff'],
                borderWidth: 2
            }]
        };
    }
    else {
        const label = languageData.language || 'Unknown';
        const count = languageData.count || 0;

        chartData = {
            labels: [label, 'Others'],
            datasets: [{
                label: 'Usage Count',
                data: [count, 100 - count],
                backgroundColor: ['#36a2eb', '#e0e0e0'],
                borderColor: ['#fff', '#fff'],
                borderWidth: 2
            }]
        };
    }

    if (window.languageChartInstance) window.languageChartInstance.destroy();

    window.languageChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
}
