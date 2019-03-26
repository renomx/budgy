<template>
  <div class="hello">

    <div class="row">
      <div class="col s12">
          <div class="field">
            <label class="label">What are you spending on?</label>
            <div class="control">
              <input v-model="newThing" class="input" v-bind:class="thingClass" v-on:keyup.enter="createExpense" type="text" placeholder="Write here" value="">             
            </div>
          </div>
      </div>
    </div>


   <div class="row">
      <div class="col s12">
        <div class="field">
          <label class="label">How much are you spending?</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="newCost" class="input" v-bind:class="costClass" v-on:keyup.enter="createExpense" type="text" placeholder="How much?" value="">           
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <div class="control">
          <button v-on:click="createExpense" class="waves-effect waves-light btn">Save</button>
        </div>
      </div>
    </div>

    <br /><br />

    <ul class="collection">
      <li class="collection-item" v-if="expenses.length > 0" v-for="exp in expenses">
        <div>          
          <strong>${{ exp.cost }}</strong> on <strong>{{ exp.thing }}</strong><br />
          <span class="is-size-7">{{ exp.date }}</span>          
          <a class="secondary-content" aria-label="delete" v-on:click="deleteExpense(exp.id)">
            <i class="material-icons">delete_forever</i>
          </a>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import Dexie from 'dexie'

export default {
  name: 'hello',
  data () {
    return {
      expenses: [],
      newThing: '',
      newThingValid: true,
      newCost: 0.0,
      newCostValid: true,
      db: null
    }
  },
  computed: {
    thingClass: function () {
      return {
        'is-success': this.newThingValid === true,
        'is-danger': this.newThingValid === false,
        'text-danger': this.newThingValid === false
      }
    },
    costClass: function () {
      return {
        'is-success': this.newCostValid === true,
        'is-danger': this.newCostValid === false,
        'text-danger': this.newCostValid === false
      }
    }
  },
  mounted () {
    this.db = new Dexie('expensesDb')
    this.db.version(1).stores({
      expenses: `++id, thing, cost, date`
    })
    this.db.open().catch(function (e) { alert('Open failed: ' + e) })

    this.getExpenses()
  },
  methods: {
    createExpense: function () {
      console.log('Called')
      this.newThingValid = (this.newThing !== '')
      this.newCostValid = (this.newCost > 0)

      if (this.newThing !== '' && this.newCost > 0) {
        this.addExpense()

        this.newThing = ''
        this.newCost = 0
      }
    },
    // Data from local storage
    getExpenses: function () {
      var self = this
      this.db.expenses.reverse().toArray(function (exp) {
        self.expenses = exp
      })
    },
    addExpense: function () {
      this.db.expenses.add({
        thing: this.newThing,
        cost: this.newCost,
        date: new Date().toLocaleString()
      })

      this.getExpenses()
    },
    deleteExpense: function (id) {
      this.db.expenses.delete(id)

      this.getExpenses()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
