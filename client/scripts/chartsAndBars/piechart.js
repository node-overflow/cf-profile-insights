export function renderVerdictChart(data) {
    const ctx = document.getElementById('verdictChart').getContext('2d');

    const labels = Object.keys(data);
    const values = labels.map(label => data[label]);
    const colors = ['#34a853', '#ea4335', '#fbbc05', '#4285f4', '#aa46bb', '#ff6d00'];

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                label: 'Verdict Breakdown',
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Submission Verdict Breakdown'
                }
            }
        }
    });
}
