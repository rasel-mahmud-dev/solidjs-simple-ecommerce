import { ProductType } from "../types"

const firebaseInit = import("../firebase/init")

import { getDocs, collection, setDoc, doc, getDoc, query, updateDoc, where } from "firebase/firestore";


export default class ProductModel {
    title: string
    price: number
    description: string
    id: string
    image: string
    rating: {rate: number, count: number}
    categoryId: string
    brandId: string
    createdAt: Date

    static collection = "products"
   
    constructor(data: {title: string, price: number, description: string, image: string, rating:  {rate: number, count: number}, brandId: string, categoryId: string}){
        this.title = data.title
        this.price = data.price
        this.description = data.description
        this.id = ((Date.now().toString().slice(5)) + Math.floor((Math.random() * 1000))).toString()
        this.image = data.image
        this.rating = data.rating
        this.categoryId = data.categoryId
        this.brandId = data.brandId
        this.createdAt = new Date()
    }


    static async findAll(){
        return new Promise<ProductType[] | null>(async(resolve, reject)=>{
            try {
                let data: ProductType[] = []
                const {default: db} = await firebaseInit
                const querySnapshot  = await getDocs(collection(db, ProductModel.collection));
                querySnapshot.forEach((doc: any) => {
                    data.push({
                        id: doc.id,
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

    static async query(q: { categoryId?: string, brandIds?: string[] }){
        return new Promise<ProductType[] | null>(async(resolve, reject)=>{
            try {
                let data: ProductType[] = []
                const {default: db} = await firebaseInit
                
                const conditions = []
                if(q.categoryId){
                    conditions.push(where('categoryId', '==', q.categoryId))
                }
                if(q.brandIds){
                    conditions.push(where('brandId', 'in', [...q.brandIds]))
                }
                
                let q1 = query(collection(db, ProductModel.collection), ...conditions)
                const querySnapshot  = await getDocs(q1);                
                querySnapshot.forEach((doc: any) => {
                    data.push({
                        id: doc.id,
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

    static async findOne(id: string){
        return new Promise<ProductType[] | null>(async(resolve, reject)=>{
            try {
            
                const {default: db} = await firebaseInit

                const cityRef = doc(db, ProductModel.collection, id);
                const docSnap = await getDoc(cityRef);
                if (docSnap.exists()) {
                    resolve(docSnap.data());
                    } else {
                    // doc.data() will be undefined in this case
                    resolve(null);
                    }
        
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
                await setDoc(doc(db, ProductModel.collection, this.id), {
                    ...this,
                });
                resolve(this)

            } catch(ex){
                resolve(null)
            }
        })
        
    }
    
    static updateOne(data: ProductType, id: string){
        return new Promise<ProductType | null>(async(resolve, reject)=>{
            try {
                
                // get db
                const {default: db} = await firebaseInit
                const productRef = doc(db, ProductModel.collection, id);
                await updateDoc(productRef, data as any);
                resolve(data)

            } catch(ex){
                resolve(null)
            }
        })
        
    }

}
