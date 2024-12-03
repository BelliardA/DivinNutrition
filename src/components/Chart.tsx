import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
import "../style/Chart.css"

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);


const DoughnutChart = ({lipids,glucides, proteins, caloriesPerDay} :
  {lipids : number, glucides : number, proteins : number, caloriesPerDay:number}) => {
  // Données de test pour le graphique Doughnut
  // Données du graphique Doughnut

  // Plugin personnalisé pour afficher le texte au centre du donut
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width } = chart;
      const { ctx } = chart;
  
      ctx.save();
      ctx.font = 'bold 6.7pt Arial'; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgb(0, 0, 0)'; 
      ctx.fillText(`${caloriesPerDay} Calorie`, width / 2, chart.chartArea.height / 2);
      ctx.restore();
    },
  };

  const data = {
    labels: ['Lipides', 'Glucides', 'Protéines'], 
    datasets: [
      {
        label: 'Apports nutritionnels',
        data: [lipids, glucides, proteins],
        backgroundColor: [
          '#FF9999', // Rose pour les lipides
          '#FFD700', // Jaune pour les glucides
          '#4169E1', // Bleu pour les protéines
        ],
        borderWidth: 0, // Supprimer les bordures pour un look plus épuré
        cutout: '70%', // Ajuste l'épaisseur de l'anneau
      },
    ],
    caloriesPerDay, // Ajout des calories pour le plugin
  };

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Légende à droite
        display:false,
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}g`;
          },
        },
      },
    },
  };

  return (
    <div className="card-stat">
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]}/>
    </div>
  );
};

export default DoughnutChart;