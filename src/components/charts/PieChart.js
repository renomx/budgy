import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    dataton: {
      type: Object
    }
  },
  data: () => ({
    chartdata: {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Expenses",
            data: [],
            backgroundColor: [
              '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
            ],
            borderColor: [
              '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
            ]
          }
        ]
      }
    },
    options: {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "Expenses",
        fontSize: 18,
        fontColor: "#111"
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#333",
          fontSize: 16
        }
      }
    }
  }),
  mounted () {
    console.log()
    this.chartdata.datacollection.labels = this.dataton.labels
    this.chartdata.datacollection.data = this.dataton.data
    this.renderChart(this.chartdata.datacollection, this.chartdata.options)
  }
}
