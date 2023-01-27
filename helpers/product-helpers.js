var db=require('../config/connection')
var collection=require('../config/collections');
const { ObjectId } = require('mongodb');
const { response } = require('express');
var objectId=require('mongodb').ObjectId
module.exports={

    addProduct:async(product,callback)=>{
        console.log(product);

        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data);
            callback(data.insertedId)

        })

    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
                    

            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
                    

            let users=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },
    getAllOrders:()=>{
        return new Promise(async(resolve,reject)=>{
                    

            let orders=await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
            resolve(orders)
        })
    },

    getCategoryProducts:()=>{
        return new Promise(async(resolve,reject)=>{
                    
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find({'Category':'classic'}).toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:ObjectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })

    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })    
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Author:proDetails.Author,
                    Price:proDetails.Price,
                }
            }).then((response)=>{
                resolve()
            })
        })    

    }
}