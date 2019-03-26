<template>
    <div class="section">
        <ul class="collection">
            <li class="collection-item" v-for="exp in expenses">
                {{ exp.id }} - {{ exp.thing }} - {{ exp.cost }}
            </li>
        </ul>
    </div>
</template>

<script>
import Dexie from 'dexie'

export default {
  name: 'reports',
  data () {
    return {
      expenses: [],
      num: 0,
      db: null
    }
  },
  mounted () {
    this.db = new Dexie('expensesDb')
    this.db.version(1).stores({
      expenses: `++id, thing, cost, date`
    })
    this.db.open().catch(function (e) { alert('Open failed: ' + e) })

    var self = this
    this.db.expenses.toArray(function (exp) {
      self.expenses = exp
    })

    var result = []
    const reducer = (res, value) => {
      if (!res[value.type]) {
        res[value.type] = { thing: value.type, cost: 0 }
        result.push(res[value.type])
      }
      res[value.type].qty += value.qty
      return res
    }

    this.expenses.reduce(reducer)

    console.log(result)
  },
  methods: {

  }
}
</script>

<style>

</style>