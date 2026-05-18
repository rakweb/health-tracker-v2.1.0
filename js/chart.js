// js/chart.js
let metricsChart = null;

const ChartManager = {
    init() {
        const canvas = document.getElementById('metricsChart');
        if (!canvas) {
            console.warn("Chart canvas not found");
            return;
        }

        metricsChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: false }
                },
                scales: {
                    y: { beginAtZero: false }
                }
            }
        });

        console.log("✅ Chart initialized");
    },

    update(labels, datasets) {
        if (!metricsChart) return;
        metricsChart.data.labels = labels;
        metricsChart.data.datasets = datasets;
        metricsChart.update();
    }
};

console.log("✅ chart.js loaded");
window.ChartManager = ChartManager;
