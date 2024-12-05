import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
import "../style/Chart.css";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const DoughnutChart = ({lipids,glucides, proteins, caloriesPerDay} :
  {lipids : number, glucides : number, proteins : number, caloriesPerDay:number}) => {
  // Plugin personnalisé pour afficher le texte au centre du donut
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart : any) => {
      const { ctx, chartArea, config } = chart;
      const calories = config.options.plugins.centerText.caloriesPerDay; // Récupération de la valeur depuis les options
      
      ctx.save();
      ctx.font = '17pt Be Vietnam Pro'; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.clearRect(0, 0, chart.width, chart.height); // Efface le texte précédent
      ctx.fillText(`${calories} Kcal`, chart.width / 2, chartArea.height / 2); // Affiche les calories au centre
      ctx.restore();
    },
  };

  // Données du graphique Doughnut
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
        borderWidth: 0,
        cutout: '80%', // Ajuste l'épaisseur de l'anneau
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      centerText: {
        caloriesPerDay,  // Passe la valeur ici
      },
      legend: {
        position: 'right',
        display: false,
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
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
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