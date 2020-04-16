<template>
  <q-card class="full-width">
    <q-item>
      <q-item-section  avatar>
<!--        <img style="height: 100px; width: 100px" :src="restaurant.img"/>-->
        <!--        <div style="width: 100%"><iframe width="100" height="100" url="https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed"  frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.mapsdirections.info/nl/maak-een-google-map/">Maak een Google Map</a> van <a href="https://www.mapsdirections.info/nl/">Nederland Kaart</a></iframe></div><br />-->
          <iframe width="100px" height="100px" data-cy="maps"
                  :src="iframeUrl"
                  frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{restaurant.title}}</q-item-label>
        <q-item-label caption><span v-html="restaurant.vicinity"></span> ({{(restaurant.distance /1000).toFixed(2)}} km from you)
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>

        <q-item-label>
          <q-rating
            v-if="restaurant.rating"
            :value="parseInt(restaurant.rating.average)"
            size="2em"
            readonly
            :max="5"
          />
        </q-item-label>  <q-item-label>
          <span v-if="restaurant.rating">{{restaurant.rating.average}} out of {{restaurant.rating.total}} reviews</span>
          <span v-else>No reviews yet</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  props: ['restaurant', 'detail'],
  name: 'RestaurantItem',
  data () {
    return {
    }
  },
  computed: {
    // The url for the iframe of google maps
    iframeUrl () {
      return `https://maps.google.com/maps?width=100%&height=100&hl=nl&q=${this.restaurant.vicinity.replace('<br/>', ' ')}+(${this.restaurant.title})&ie=UTF8&t=&z=14&iwloc=B&output=embed`
    }
  }
}
</script>
