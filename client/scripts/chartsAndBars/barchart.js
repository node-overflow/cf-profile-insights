export function renderDifficultyChart(data) {
    const ctx = document.getElementById('difficultyChart').getContext('2d');

    const labels = Object.keys(data).sort((a, b) => Number(a) - Number(b));
    const values = labels.map(label => data[label]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Problems Solved',
                data: values,
                backgroundColor: '#4285F4'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Problem Difficulty Distribution'
                },
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
        }
    });
}
