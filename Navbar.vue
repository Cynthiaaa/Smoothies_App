<template>
   <div class="navbar">
     <nav class="nav-extended  green">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
       <span class="nav-title">Green Juices Shop</span>
        </router-link>
       <a href="" class="btn-floating btn-large halfway-fab light-green">
           <router-link :to="{ name: 'AddSmoothie' }">
        <i class="material-icons">add</i>
               </router-link>
       </a>
      </div>
     </nav>
    </div>
</template>

<script>
    export default {
        name: "navbar",
        data() {
            return {

            }
        }
    }

</script>

<style>
    .navbar nav {
        padding: 0 20px;
    }

</style>
