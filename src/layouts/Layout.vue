<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer class="bg-secondary">
      <q-tabs
        dense
        active-color="text-secondary"
        indicator-color="secondary"
        align="justify"
      >
        <q-route-tab data-cy="find" name="find" to="/" icon="search" label="Find" exact/>
        <q-route-tab data-cy="review" name="review" to="/review" icon="add" label="Review" exact/>
        <q-route-tab data-cy="profile" name="profile" to="/profile" icon="person" label="Profile" exact/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {}
  }
}
</script>
