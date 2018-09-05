<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
    <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
     <h2 class="light-green-text">{{ smoothie.title }}</h2>
     <ul class="ingredients">
       <li v-for="(ing, index) in smoothie.ingredients" :key="index">
         <span class="chip">{{ ing }}</span>
       </li>
     </ul>
    </div>
        <span class="btn-floating btn-large halfway-fab light-green">
            <router-link :to="{ name: 'editSmoothie', params: {smoothie_slug: smoothie.slug} }">
    <i class="material-icons edit">edit</i>
    </router-link>
    </span>
    </div>
  </div>
</template>

<script>
    import database from '@/firebase/init'

    export default {
        name: 'Index',
        data() {
            return {
                smoothies: []
            }
        },
        methods: {
            deleteSmoothie(id) {
                //delete doc from firestore
                database.collection('smoothies').doc(id).delete()
                    .then(() => {
                        this.smoothies = this.smoothies.filter(smoothie => {
                            return smoothie.id != id
                        })
                    })
                 }
            },
            created() {
                //fetch data from firestore 
                database.collection('smoothies').get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            let smoothie = doc.data()
                            smoothie.id = doc.id
                            this.smoothies.push(smoothie)
                        })
                    })
            }
        }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .index {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
        margin-top: 10px;
    }

    .index h2 {
        font-size: 24px;
        text-align: center;
        margin-top: 5px;
    }

    .index .ingredients {
        margin: 30px auto;
        text-align: center;
    }

    .index .ingredients li {
        display: inline-block;
    }

    .index .chip {
        background-color: #fff9c4;
    }

    .index .delete {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #d7ccc8;
        font-size: 16px;
    }

</style>
