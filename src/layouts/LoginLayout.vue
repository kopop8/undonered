<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Undönered
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
  data () {
    return {}
  }
}
</script>
