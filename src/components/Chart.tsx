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
    beforeDraw: (chart: any) => {
      const { width } = chart;
      const { ctx } = chart;
  
      ctx.save();
      ctx.font = '17pt Be Vietnam Pro'; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgb(0, 0, 0)'; 
      ctx.fillText(`${caloriesPerDay} Kcal`, width / 2, chart.chartArea.height / 2);
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
        cutout: '80%', // Ajuste l'épaisseur de l'anneau
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
        position: 'right', 
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
          label: function (tooltipItem : any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}g`;
          },
        },
      },
    },
  };

  return (
    <div className="card-stat">
      <div className="doughnut-container">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]}/>
      </div>
      <div className="legend">
        <div className="contain-legend">
          <div className="glucides couleur"></div>
          <div className="text-legend">
            <h4>Glucides</h4>
            <p>{glucides}g</p>
          </div>
        </div>
        <div className="contain-legend">
          <div className="lipides couleur"></div>
          <div className="text-legend">
            <h4>Lipides</h4>
            <p>{lipids}g</p>
          </div>
        </div>
        <div className="contain-legend">
          <div className="proteines couleur"></div>
          <div className="text-legend">
            <h4>Protéines</h4>
            <p>{proteins}g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;