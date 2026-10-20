// use('practice')
// show('collections')

// const { startTransition } = require("react");

// db.orders.insertMany([
//   {
//     orderId: 1001, customerId: 1, productId: 101,
//     quantity: 1, orderDate: ISODate("2026-10-01"), status: "Delivered"
//   },
//   {
//     orderId: 1002, customerId: 1, productId: 103,
//     quantity: 2, orderDate: ISODate("2026-10-03"), status: "Delivered"
//   },
//   {
//     orderId: 1003, customerId: 2, productId: 102,
//     quantity: 1, orderDate: ISODate("2026-10-04"), status: "Shipped"
//   },
//   {
//     orderId: 1004, customerId: 2, productId: 104,
//     quantity: 3, orderDate: ISODate("2026-10-05"), status: "Delivered"
//   },
//   {
//     orderId: 1005, customerId: 3, productId: 103,
//     quantity: 5, orderDate: ISODate("2026-10-06"), status: "Delivered"
//   },
//   {
//     orderId: 1006, customerId: 3, productId: 106,
//     quantity: 2, orderDate: ISODate("2026-10-07"), status: "Pending"
//   },
//   {
//     orderId: 1007, customerId: 4, productId: 105,
//     quantity: 1, orderDate: ISODate("2026-10-08"), status: "Delivered"
//   },
//   {
//     orderId: 1008, customerId: 4, productId: 104,
//     quantity: 2, orderDate: ISODate("2026-10-09"), status: "Cancelled"
//   },
//   {
//     orderId: 1009, customerId: 5, productId: 101,
//     quantity: 2, orderDate: ISODate("2026-10-10"), status: "Shipped"
//   },
//   {
//     orderId: 1010, customerId: 5, productId: 105,
//     quantity: 2, orderDate: ISODate("2026-10-11"), status: "Delivered"
//   },
//   {
//     orderId: 1011, customerId: 6, productId: 102,
//     quantity: 2, orderDate: ISODate("2026-10-12"), status: "Delivered"
//   },
//   {
//     orderId: 1012, customerId: 6, productId: 103,
//     quantity: 1, orderDate: ISODate("2026-10-13"), status: "Pending"
//   },
//   {
//     orderId: 1013, customerId: 1, productId: 106,
//     quantity: 1, orderDate: ISODate("2026-10-14"), status: "Shipped"
//   },
//   {
//     orderId: 1014, customerId: 2, productId: 101,
//     quantity: 1, orderDate: ISODate("2026-10-15"), status: "Delivered"
//   },
//   {
//     orderId: 1015, customerId: 3, productId: 102,
//     quantity: 1, orderDate: ISODate("2026-10-16"), status: "Cancelled"
//   }
// ])


// db.orders.find().pretty()


// db.products.insertMany([
//   {
//     productId: 101, name: "Laptop",
//     category: "Electronics", price: 60000, stock: 10
//   },
//   {
//     productId: 102, name: "Phone",
//     category: "Electronics", price: 25000, stock: 20
//   },
//   {
//     productId: 103, name: "Headphones",
//     category: "Accessories", price: 2000, stock: 50
//   },
//   {
//     productId: 104, name: "Keyboard",
//     category: "Accessories", price: 1500, stock: 30
//   },
//   {
//     productId: 105, name: "Chair",
//     category: "Furniture", price: 8000, stock: 15
//   },
//   {
//     productId: 106, name: "Monitor",
//     category: "Electronics", price: 12000, stock: 8
//   }
// ])


// db.products.find().pretty()





// db.customers.insertMany([
//   {
//     customerId: 1, name: "Amit", city: "Rajkot",
//     age: 25, membership: "Gold"
//   },
//   {
//     customerId: 2, name: "Priya", city: "Ahmedabad",
//     age: 30, membership: "Silver"
//   },
//   {
//     customerId: 3, name: "Rahul", city: "Surat",
//     age: 22, membership: "Gold"
//   },
//   {
//     customerId: 4, name: "Neha", city: "Rajkot",
//     age: 28, membership: "Bronze"
//   },
//   {
//     customerId: 5, name: "Karan", city: "Vadodara",
//     age: 35, membership: "Silver"
//   },
//   {
//     customerId: 6, name: "Meera", city: "Ahmedabad",
//     age: 26, membership: "Gold"
//   }
// ])


// db.customers.find().pretty()


// question 1
// display all customer who live in Rajkot

// db.customers.find({
//     city: "Rajkot"
// }).pretty()


// count all order

// db.orders.aggregate([
//     {
//         $count: "totalOrder"
//     }
// ])


// find order by status

// db.orders.aggregate([
//     {
//         $match: {
//             status: "Delivered"
//         }
//     }
// ])


// Count order by status

// db.orders.aggregate([
//     {
//         $group: {
//             _id: "$status",
//             totalOrder: {
//                 $sum: 1
//             }
//         }
//     },
//     {
//         $sort: {
//             totalOrder: -1
//         }
//     }
// ])


// total Quantity sold per product

// db.orders.aggregate([
//     {
//         $group:{
//         _id: "$productId",
//         totalQuantity: {
//             $sum: "$quantity"
//         }
//     }
//     },
//     {
//         $sort: {
//             totalQuantity: -1
//         }
//     }
// ])



// Q13 . Total spending per customer

// db.orders.aggregate([
//   {
//     $lookup: {
//       from: "products",
//       localField: "productId",
//       foreignField: "productId",
//       as: "product"
//     }
//   },
//   {
//     $unwind: "$product"
//   },
//   {
//     $group: {
//       _id: "$customerId",
//       totalOrders: { $sum: 1 },
//       totalQuantity: { $sum: "$quantity" },
//       totalSpent: {
//         $sum: {
//           $multiply: ["$quantity", "$product.price"]
//         }
//       }
//     }
//   },
//   {
//     $sort: { totalSpent: -1 }
//   }
// ])



// Q14. Calculate total revenue by product category

// db.orders.aggregate([
//     {
//         $lookup: {
//             from: "products",
//             localField: "productId",
//             foreignField: "productId",
//             as: "product"
//         }
//     },
//     {
//         $unwind: "$product"
//     },
//     {
//         $group: {
//             _id: "$product.category",
//             totalRevenue: {
//                 $sum: {
//                     $multiply: ["$quantity", "$product.price"]
//                 }
//             }
//         }
//     },
//     {
//         $sort: { totalRevenue: -1 }
//     }
// ])



// Q15. Find the top three customers by spending

// db.orders.aggregate([
//     {
//         $lookup: {
//             from: "products",
//             localField: "productId",
//             foreignField: "productId",
//             as: "product"
//         }
//     },
//     { $unwind: "$product" },
//     {
//         $group: {
//             _id: "$customerId",
//             totalSpent: {
//                 $sum: {
//                     $multiply: ["$quantity", "$product.price"]
//                 }
//             }
//         }
//     },
//     { $sort: { totalSpent: -1 } },
//     { $limit: 3 },
//     {
//         $lookup: {
//             from: "customers",
//             localField: "_id",
//             foreignField: "customerId",
//             as: "customer"
//         }
//     },
//     { $unwind: "$customer" },
//     {
//         $project: {
//             _id: 0,
//             customerId: "$_id",
//             customerName: "$customer.name",
//             totalSpent: 1
//         }
//     }
// ])



// Q16.Average product price by category

db.products.find()

db.products.aggregate([
    {
        $group: {
            _id: "$category",
            avgPrice: {
                $avg: "$price"
            },
            productCount: {
                $sum: 1
            }
        }
    },
    {
        $project: {
            _id: 0,
            category: "$_id",
            averagePrice: { $round: ["$avgPrice", 2] },
            productCount: 1
        }
    },
    { $sort: { averagePrice: -1 } }
])



// Q17.Find products above the average price

db.products.aggregate([
    {
        $group: {
            _id: null,
            averagePrice: { $avg: "$price" },
            products: { $push: "$$ROOT" }
        }
    },
    { $unwind: "$products" },
    {
        $match: {
            $expr: {
                $gt: ["$products.price", "$averagePrice"]
            }
        }
    },
    {
        $replaceRoot: {
            newRoot: "$products"
        }
    },
    {
        $project: {
            _id: 0,
            productId: 1,
            name: 1,
            price: 1
        }
    }
])



// Q18 . Find Customer with more than two order

db.orders.aggregate([
    {
        $group: {
            _id: "$customerId",
            totalOrder: {
                $sum: 1
            }
        }
    },
    {
        $match: {
            totalOrder: {
                $gt: 2
            }
        }
    },
    {
        $sort: {
            totalOrder: -1
        }
    }
])


// Q19 Join order with customer detsils

db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "customerId",
            as: "customer"
        }
    },
    {
        $unwind: "$customer"
    },
    {
        $project: {
            _id: 0,
            orderId: 1,
            customerId: 1,
            customerName: "$customer.name",
            city: "$customer.city",
            status: 1
        }
    }
])


// Q20 find customer who never placed an order

db.customers.aggregate([
    {
        $lookup: {
            from: "orders",
            localField: "customerId",
            foreignField: "customerId",
            as: "orders"
        }
    },
    {
        $match: {
            orders: { $eq: [] }
        }
    },
    {
        $project: {
            _id: 0,
            customerId: 1,
            name: 1
        }
    }
])


// Q21 . find the highest and lowest priced product in ach category

db.products.aggregate([
    {
        $group: {
            _id: "$category",
            lowestPrice: {
                $min: "$price"
            },
            highestPrice: {
                $max: "$price"
            }
        }
    },
    {
        $sort: {
            lowestPrice: 1
        }
    }
])


// Q22 calculate delivered order value

db.orders.aggregate([
    {
        $match: { status: "Delivered" }
    },
    {
        $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "productId",
            as: "product"
        }
    },
    { $unwind: "$product" },
    {
        $group: {
            _id: "$customerId",
            deliveredValue: {
                $sum: {
                    $multiply: ["$quantity", "$product.price"]
                }
            }
        }
    },
    { $sort: { deliveredValue: -1 } }
])


// Q23 Add a discount field

db.products.aggregate([
    {
        $addFields: {
            discountAmount: {
                $multiply: ["$price", 0.10]
            },
            discountedPrice: {
                $multiply: ["$price", 0.90]
            }
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            price: 1,
            discountAmount: 1,
            discountedPrice: 1
        }
    }
])


// Q24 Classify customers by total spending

db.orders.aggregate([
    {
        $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "productId",
            as: "product"
        }
    },
    { $unwind: "$product" },
    {
        $group: {
            _id: "$customerId",
            totalSpent: {
                $sum: {
                    $multiply: ["$quantity", "$product.price"]
                }
            }
        }
    },
    {
        $addFields: {
            spendingCategory: {
                $switch: {
                    branches: [
                        {
                            case: { $gte: ["$totalSpent", 70000] },
                            then: "High"
                        },
                        {
                            case: { $gte: ["$totalSpent", 30000] },
                            then: "Medium"
                        }
                    ],
                    default: "Low"
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            customerId: "$_id",
            totalSpent: 1,
            spendingCategory: 1
        }
    }
])

// Q25 Complete order analytics report

db.orders.aggregate([
    {
        $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "productId",
            as: "product"
        }
    },
    { $unwind: "$product" },
    {
        $group: {
            _id: "$customerId",
            totalOrders: { $sum: 1 },
            totalQuantity: { $sum: "$quantity" },
            totalSpent: {
                $sum: {
                    $multiply: ["$quantity", "$product.price"]
                }
            },
            deliveredOrders: {
                $sum: {
                    $cond: [
                        { $eq: ["$status", "Delivered"] },
                        1,
                        0
                    ]
                }
            },
            cancelledOrders: {
                $sum: {
                    $cond: [
                        { $eq: ["$status", "Cancelled"] },
                        1,
                        0
                    ]
                }
            }
        }
    },
    {
        $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "customerId",
            as: "customer"
        }
    },
    { $unwind: "$customer" },
    {
        $project: {
            _id: 0,
            customerId: "$_id",
            customerName: "$customer.name",
            city: "$customer.city",
            totalOrders: 1,
            totalQuantity: 1,
            totalSpent: 1,
            deliveredOrders: 1,
            cancelledOrders: 1
        }
    },
    { $sort: { totalSpent: -1 } }
])