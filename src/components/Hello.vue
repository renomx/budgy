<template>
  <div class="hello">

    <div class="columns">
      <div class="column is-three-quarters">
          <div class="field">
            <label class="label">What are you spending on?</label>
            <div class="control has-icons-left has-icons-right">
              <input v-model="newThing" class="input" v-bind:class="thingClass" type="text" placeholder="What are you buying?" value="">
              <span class="icon is-small is-left">
                <i class="fas fa-shopping-basket"></i>
              </span>            
            </div>            
          </div>
      </div>
    </div>


    <div class="columns">
      <div class="column is-three-quarters">
        <div class="field">
          <label class="label">How much are you spending?</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="newCost" class="input" v-bind:class="costClass" type="text" placeholder="How much?" value="">
            <span class="icon is-small is-left">
              <i class="fas fa-dollar-sign"></i>
            </span>            
          </div>         
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <div class="control">
          <button v-on:click="createExpense" v-on:keyup.enter="createExpense" class="button is-primary">Save</button>
        </div>
      </div>
    </div>

    <br /><br />


    <div class="columns" v-for="exp in expenses">
      <div class="column is-three-quarters">
        <div class="box">
          <article class="media">        
            <div class="media-content">
              <div class="content">
                {{ exp.Id }}
                <strong>${{ exp.cost }}</strong> on <strong>{{ exp.thing }}</strong><br />
                <span class="is-size-7">{{ exp.date }}</span>          
              </div>

              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" aria-label="reply">
                    <span class="icon is-large">
                      <i class="fas fa-lg fa-reply" aria-hidden="true"></i>
                    </span>
                  </a>
                  <a class="level-item" aria-label="delete" >
                    <span class="icon is-large">
                      <i class="fas fa-lg fa-trash-alt" aria-hidden="true"></i>
                    </span>
                  </a>              
                </div>
              </nav>    
            </div>
          </article>     
        </div>
      </div>
    </div>
  

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      expenses: [
        { Id: 1, thing: 'Gas', cost: 25.00, date: '3/22/2019 5:13 PM' },
        { Id: 2, thing: 'Lunch', cost: 9.25, date: '3/22/2019 11:50 AM' },
        { Id: 3, thing: 'Smash Bros Ultimate :)', cost: 60.00, date: '3/20/2019 7:30 PM' }
      ],
      newThing: '',
      newThingValid: true,
      newCost: 0.0,
      newCostValid: true
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
    for (var expense of this.expenses) {
      console.log(expense)
      localStorage.setItem(`budgy.${expense.Id}`, JSON.stringify(expense))
    }
  },
  methods: {
    createExpense: function () {
      this.newThingValid = (this.newThing !== '')
      this.newCostValid = (this.newCost > 0)

      if (this.newThing !== '' && this.newCost > 0) {
        this.expenses.push({
          Id: this.expenses.length + 1,
          thing: this.newThing,
          cost: this.newCost,
          date: new Date().toLocaleDateString()
        })

        this.newThing = ''
        this.newCost = 0
      }
    },
    // Data from local storage
    getExpenses: function () {

    },
    addExpense: function () {

    },
    deleteExpense: function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
