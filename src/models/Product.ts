import { ProductType } from "../types"

const firebaseInit = import("../firebase/init")
import { getDocs, collection, setDoc, doc } from "firebase/firestore";


export class Product {
    title: string
    price: number
    description: string
    id: string
    image: string
    rating: {rate: number, count: number}
    category: string
    createdAt: Date

    static collection = "products"
   
    constructor(data: {title: string, price: number, description: string, image: string, rating:  {rate: number, count: number}, category: string}){
        this.title = data.title
        this.price = data.price
        this.description = data.description
        this.id = ((Date.now().toString().slice(5)) + Math.floor((Math.random() * 1000))).toString()
        this.image = data.image
        this.rating = data.rating
        this.category = data.category
        this.createdAt = new Date()
    }


    static async findAll(){
        return new Promise<ProductType[] | null>(async(resolve, reject)=>{
            try {
                let data: ProductType[] = []
                const {default: db} = await firebaseInit
                const querySnapshot  = await getDocs(collection(db, "products"));
                querySnapshot.forEach((doc: any) => {
                    data.push({
                        uid: doc.id,
                        ...doc.data()
                    })
                });     
                resolve(data)   
            } catch (e) {
                console.error(e);
                resolve(null)   
            }
        })        
    }


    save(){
        return new Promise<ProductType | null>(async(resolve, reject)=>{
            try {
                
                // get db
                const {default: db} = await firebaseInit
            
                // Add a new document in collection "cities"
                await setDoc(doc(db, Product.collection, this.id), {
                    ...this,
                });
                resolve(this)

            } catch(ex){
                resolve(null)
            }
        })
        
    }

}
