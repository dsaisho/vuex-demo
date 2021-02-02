<template>
  <div class="about">
    <h1>pics of ur drinks for:</h1>
    <h2>{{ drinkType }}</h2>

    <div v-html="drinkPicsMarkup"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "About",
  data() {
    return {
      drinkType: this.$store.state.selectedDrink,
      drinkResultsMarkup_default: "<b>no results loaded</b>",
      drinkPicsMarkup: "",
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
        this.drinkPicsMarkup = this.drinkResultsMarkup_default;
        return;
      }
      const drinkDataMarkup = _drinkData.reduce((acc, val) => {
        acc += `
        <div style="border: black solid thin">
          ${val.strDrink}
          <br/>
          <img src="${val.strDrinkThumb}" width="100px" />
          <br/><br/>
        </div>
        `;
        return acc;
      }, "");

      this.drinkPicsMarkup = `${drinkDataMarkup}`;
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
