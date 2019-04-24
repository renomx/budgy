<template>
    <div class="section">
        <ul class="collection">
            <li class="collection-item" v-for="exp in list">
                {{ exp.thing }} - {{ exp.cost }}
            </li>
        </ul>
        <br /><br />
        <pie-chart :chart-data="datacollection"></pie-chart>
    </div>
</template>

<script>
import Dexie from 'dexie'
import PieChart from './charts/PieChart.js'


export default {
  components: {
      PieChart
  },
  name: 'reports',
  data () {
    return {
      list: [],
      lineChart: [],
      report: 0,
      num: 0,
      db: null,
      datacollection: null
    }
  },
  mounted () {
    this.db = new Dexie('expensesDb')
    this.db.version(1).stores({
      expenses: `++id, thing, cost, date`
    })
    this.db.open().catch(function (e) { alert('Open failed: ' + e) })

    let report = {};

    this.db.expenses.toArray().then(exp => {
      let data = exp.reduce((prev, cur) => {
        if(prev === undefined) {
          prev = []
        }

        let index = prev.findIndex(item => {
          return item.thing == cur.thing
        })

        if(index < 0) {
          prev.push({
            thing: cur.thing,
            cost: parseFloat(cur.cost)
          })
        } else {
          prev[index].cost += parseFloat(cur.cost)
        }

        return prev

      }, [])

      this.list = data

      this.datacollection = {
        labels: this.list.map(x => x.thing),
        datasets: [
            {
              label: "Expenses",
              data: this.list.map(x => x.cost),
              backgroundColor: [
                '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
              ],
              borderColor: [
                '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
              ]
            }
        ]
      }

    })
  }
}
</script>

<style>

</style>
