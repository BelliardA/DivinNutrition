import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
import "../style/Chart.css"

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const DoughnutChart = ({lipids,glucides, proteins, caloriesPerDay} :
  {lipids : number, glucides : number, proteins : number, caloriesPerDay:number}) => {
  // Données de test pour le graphique Doughnut
  const data = {
    labels: ['Lipides', 'Glucides', 'Protéines'], // Labels des secteurs
    datasets: [
      {
        label: 'My First Dataset', // Légende du graphique
        data: [lipids, glucides, proteins], // Données (valeurs de chaque secteur)
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Couleur du secteur 1 (rouge)
          'rgba(54, 162, 235, 0.2)', // Couleur du secteur 2 (bleu)
          'rgba(255, 206, 86, 0.2)', // Couleur du secteur 3 (jaune)
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Bordure du secteur 1
          'rgba(54, 162, 235, 1)', // Bordure du secteur 2
          'rgba(255, 206, 86, 1)', // Bordure du secteur 3
        ],
        borderWidth: 1, // Largeur des bordures
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Position de la légende
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="card">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;