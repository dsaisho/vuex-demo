import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedDrink: "margarita",
    drinkData: null,
  },
  mutations: {
    /*
      mutations just put values in the store, they are normally called by actions
    */
    set_selectedDrink(state, _selectedDrink) {
      state.selectedDrink = _selectedDrink;
      console.log("Setting Selected Drink in Store::", _selectedDrink);
    },
    set_drinkData(state, _drinkData) {
      state.drinkData = _drinkData;
      console.log("Setting Drink Data in Store", _drinkData);
    },
  },
  actions: {
    /*
    actions are typically called from components to change data in the store
    Then commit the data that was retrieved/updated from your logic which puts the data in the store via mutations

      getDrinksData first requests data, formats the data, then it commits a mutation which will put the data in the store.

    */
    async getDrinkData(context, _selectedDrink) {
      console.log("Requesting Data For This Drink::", _selectedDrink);

      const fileUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        _selectedDrink
      )}`;

      const drinkData = await axios.get(fileUrl).then((_drinkData) => {
        return _drinkData.data?.drinks || null;
      });

      context.commit("set_drinkData", drinkData);
      context.commit("set_selectedDrink", _selectedDrink);
    },
  },
  getters: {
    /*
      getters are used to get values from the store.

      if used in a watcher, they will trigger the watcher to run anytime a mutation updates a value the getter is associated with

      EXAMPLE:::
              import { mapGetters } from "vuex";
              computed:{
              ...mapGetters(["drinkData"])
              },  
              watch:{
                drinkData: function(_data){
                  do stuff with data
                }
              },
    */
    drinkData: state => {
      return state.drinkData;
    },
  },
});
