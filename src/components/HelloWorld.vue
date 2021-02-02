<template>
  <div class="hello">
    <h1>Type in a drink to see recipes</h1>
    <h2>{{ drinkType }}</h2>

    <br />
    <br />
    <input v-model="drinkType" type="text" />
    <br />
    <br />
    <div @click="loadDataClicked">Click to check for recipes</div>

    <br />
    <div v-html="drinkResultsMarkup"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      drinkType: this.$store.state.selectedDrink,
      drinkResultsMarkup_default: "<b>no results loaded</b>",
      drinkResultsMarkup: "",
    };
  },
  computed: {
    ...mapGetters(["drinkData"]),
  },
  watch: {
    drinkData: function(_drinkData) {
      this.createDrinkListMarkup(_drinkData);
    },
  },
  mounted() {
      this.createDrinkListMarkup(this.drinkData);
    },
  methods: {
    
    loadDataClicked() {
      this.$store.dispatch("getDrinkData", this.drinkType);
    },
    createDrinkListMarkup(_drinkData){
      if(!_drinkData){
        this.drinkResultsMarkup = this.drinkResultsMarkup_default;
        return;
      }
      const drinkDataMarkup = _drinkData.reduce((acc, val) => {
        acc += `
        <div style="border: black solid thin">
          ${val.strDrink}
          <br/>
          ${val.strInstructions}
          <br/><br/>
        </div>
        `;
        return acc;
      }, "");

      this.drinkResultsMarkup = `<b>Drink Recipes for ${this.drinkType}</b> <br/> ${drinkDataMarkup}`;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
