<template>
<div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie </h2>
    <form @submit.prevent="editSmoothie">
    <div class="field title">
    <label for="title">Smoothie Title: </label>
        <input type="text" name="title" v-model="smoothie.title">
    </div>
        <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
            <label for="ingredients">Ingredient:</label>
            <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
    </div>
        
        <div class="field add-ingredient">
            <label for="add-ingredient">Add An Ingredient :</label>
            <input type="text" name="add-ingredient" @keydown.tab="addIngredient" v-model="another">
    
    </div>
        <div class="field center-align">
            <p v-if="feedback" class="red-text"> {{ feedback }}</p>
            <button class="btn pink">Update Smoothie</button>
    </div>
    </form>
    
    </div>

</template>

<script>
    import database from '@/firebase/init'
    import slugify from 'slugify'

    export default {
        name: 'editSmoothie',
        data() {
            return {
                smoothie: null,
                another: null,
                feedback: null
            }
        },
        methods: {
            editSmoothie() {
            if (this.smoothie.title){
                    this.feedback = null
                    //create a slug
                    this.smoothie.slug = slugify(this.smoothie.title, {
                        replacement: '-',
                        remove: /[$*_+-,()"'!\:@]/g,
                        lower: true
                    })
                    database.collection('smoothies').doc(this.smoothie.id).update({
                        title: this.smoothie.title,
                        ingredients: this.smoothie.ingredients, 
                        slug: this.smoothie.slug
                    }).then(() => {
                        this.$router.push({ name: 'Index' }).catch(err => {
                            console.log(err)
                        })
                    })
                }else {
                    this.feedback = 'You must enter a smoothie title'
                }
            },
                   addIngredient() {
                if (this.another) {
                    this.smoothie.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = 'You must enter a value to add an ingredient'
                }
            }, 
            deleteIng(ing){
                this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                    return ingredient != ing 
                })
            }
        },
        created() {
            let ref = database.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
            ref.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.smoothie = doc.data()
                    this.smoothie.id = doc.id
                })
            })
        }
    }

</script>

<style>
 .edit-smoothie {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .edit-smoothie h2 {
        font-size: 36px;
        margin: 20px auto;
    }

    .edit-smoothie .field {
        margin: 20px auto;
        position: relative;
    }
    
    .edit-smoothie .delete {
        position: absolute; 
        right: 0; 
        bottom: 16px; 
        color: deeppink; 
        font-size: 20px; 
        cursor: pointer;
    }

</style>
