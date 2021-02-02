# vuex_demo

## live example:
[https://vue-vuex-demo.herokuapp.com/](https://vue-vuex-demo.herokuapp.com/)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Details
This demo was based off the normal setup from view-cli. I found an easy api to work with that gets you drink recipes. the app just loads whatever recipe you search for and displays a list on the same page.

This demo will show how you can preserve and reuse already requested data with vuex. 

App.js holds global navigation that is changing pages with pushes like in your app.

The Home page loads HelloWorld.vue and thats where all the action is.

HelloWorld.vueis what you initially see when viewing the demo. The initial values of 'margarita' have been loaded from the store.

When you click 'Click to check for recipes' That dispatches an action in the store called 'getDrinkData'. That store action method will do the work to grab the data, then it will commit that data to a mutation which will put it in the store. With vuex actions call mutations to update data in the store. mutations are methods that actually put the values in the store. Actions are used by components to start the processing of data, so in my case getting the data and doing a little formatting. Actions can be asyncronys vs mutations which are not. So that is why you would do the data requests in the action then mutate the data the store needs with commits. vs requesting data in a mutation.

Once the store has been updated via the mutation, any getters that are using a store value that has been updated will see a change and can be picked up with computed props / watchers.

On HelloWorld.vue you will notice I have a "...mapGetters(["drinkData"])," in the computed section. That is the vuex way of getting store values as computed props in your component. Having that allows me to use a watcher on that property like this: 
watch:{
drinkData: function(_drinkData) {
      this.createDrinkListMarkup(_drinkData);
    }
}

So when I call getDrinkData by clicking the link, all the click listener method is running is this one line:
this.$store.dispatch("getDrinkData", this.drinkType);

 getDrinksData is an action method in the store, it will get the data then commit the data. the getter will see that the data has changed and the method of drinkData in the watcher on HelloWorld.vue will fire. That drinkData method just passes the store data to another method which creates the markup and renders the list.

After you load the list, hit the 'about' link on the nav.
That loads a list of images. The data for that list was not requested again, it was a part of the data which was in the store from the initial request. Since the initial loading of data was saved in the store, it was accessible on the about page. Same thing when you go back to home, the same results will load because the 'created' lifecycle method on HelloWorld.vue checks if there is data in the store and will create the list with the store data vs requesting it again.