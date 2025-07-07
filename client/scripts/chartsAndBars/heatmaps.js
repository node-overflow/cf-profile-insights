export function renderTagHeatmap(canvasId, submissions) {
  if (!Array.isArray(submissions) || submissions.length === 0) return;

  const ratingSet = new Set();
  submissions.forEach(s => {
    if (s.verdict === "OK" && s.problem?.rating) {
      ratingSet.add(s.problem.rating);
    }
  });
  const ratings = Array.from(ratingSet).sort((a, b) => a - b);

  const tagSet = new Set();
  submissions.forEach(s => {
    s.problem?.tags?.forEach(tag => tagSet.add(tag));
  });
  const tags = Array.from(tagSet).sort();

  const dataMatrix = {};
  tags.forEach(tag => {
    dataMatrix[tag] = new Array(ratings.length).fill(0);
  });

  const solvedProblems = new Set();
  submissions.forEach(s => {
    if (s.verdict === "OK" && s.problem?.tags && s.problem?.rating) {
      const key = `${s.problem.contestId}-${s.problem.index}`;
      if (!solvedProblems.has(key)) {
        solvedProblems.add(key);
        const ratingIndex = ratings.indexOf(s.problem.rating);
        if (ratingIndex !== -1) {
          s.problem.tags.forEach(tag => {
            dataMatrix[tag][ratingIndex]++;
          });
        }
      }
    }
  });

  const datasets = tags.map((tag, idx) => ({
    label: tag,
    data: dataMatrix[tag],
    backgroundColor: `hsl(${(idx * 360 / tags.length) % 360}, 70%, 55%)`,
  }));

  const ctx = document.getElementById(canvasId).getContext("2d");
  ctx.canvas.height = tags.length * 18;

  if (window.tagHeatmapChartInstance) {
    window.tagHeatmapChartInstance.destroy();
  }

  window.tagHeatmapChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ratings.map(r => r.toString()),
      datasets: datasets
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: "Solved Problems Count"
          }
        },
        y: {
          stacked: true,
          reverse: true
        }
      },
      plugins: {
        legend: {
          position: "right",
          maxHeight: 200,
          labels: {
            boxWidth: 14,
            font: {
              size: 10
            }
          }
        },
        title: {
          display: true,
          text: "Tag Heatmap (Solved Problems by Rating)"
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.x}`
          }
        }
      }
    }
  });
}
