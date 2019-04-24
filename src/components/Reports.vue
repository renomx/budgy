<template>
    <div class="section">
        <ul class="collection">
            <li class="collection-item" v-for="exp in list">
                {{ exp.thing }} - {{ exp.cost }}
            </li>
        </ul>
        <pie-chart :dataton="datacollection"></pie-chart>
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
      datacollection: {},
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
        data: this.list.map(x => x.cost)
      }
    })  
  }
}
</script>

<style>

</style>
