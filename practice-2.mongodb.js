// show('dbs')

// use('garba')

// show('collections')


//Q1.  product count by category

db.products.aggregate([
    {
        $group: {
            _id: "$category",
            total: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            category: -1
        }
    }
])

// order anlysis with product details

// db.orders.aggregate([
//   {
//     $match: {
//       status: "completed",
//     },
//   },
//   {
//     $lookup: {
//       from: "products",
//       localField: "productId",
//       foreignField: "_id",
//       as: "product",
//     },
//   },
//   { $unwind: "$product" },
//   {
//     $addFields: {
//       productName: "$product.name",
//       productPrice: "$product.price",
//     },
//   },
//   {
//     $project: { product: 0 },
//   },
// ]);


// db.orders.aggregate([
//   {
//     $group: {
//       _id: "$productName",
//       totalQuantitySold: { $sum: "$quantity" },
//       totalRevenue: {
//         $sum: { $multiply: ["$quantity", "$productPrice"] }
//       },
//       totalOrders: { $sum: 1 }
//     }
//   }
// ])


db.orders.aggregate([
    {
        $match: {
            status: "completed"
        }
    },
    {
        $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product"
        }
    },
    {
        $unwind: "$product"
    },
    {
        $project: {
            _id: 1,
            customerId: 1,
            productId: 1,
            quantity: 1,
            orderDate: 1,
            status: 1,
            productName: "$product.name",
            productPrice: "$product.price",
            totalAmount: {
                $multiply: ["$quantity", "$product.price"]
            }
        }
    }
]);


// Q5 Age above 25 and limit 2

db.users.aggregate([
    {
        $match: {
            age: { $gt: 25 }
        }
    },
    {
        $limit: 2
    }
]);


// Q3 customer purchase summary

db.orders.aggregate([
    {
        $group: {
            _id: "$customerId",
            totalOrders: { $sum: 1 },
            totalQuantity: { $sum: "$quantity" },
            totalSpent: {
                $sum: {
                    $multiply: ["$quantity", "$productPrice"]
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            customerId: "$_id",
            totalOrders: 1,
            totalQuantity: 1,
            totalSpent: 1
        }
    },
    {
        $sort: {
            totalSpent: -1
        }
    }
]);



db.customer.aggregate([
    {
        $lookup: {
            from: "orders",
            let: { customerId: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$customerId", "$$customerId"] },
                                { $eq: ["$status", "completed"] }
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalOrders: { $sum: 1 },
                        totalQuantity: { $sum: "$quantity" },
                        totalSpent: {
                            $sum: {
                                $multiply: ["$quantity", "$productPrice"]
                            }
                        }
                    }
                }
            ],
            as: "purchaseSummary"
        }
    },
    {
        $unwind: {
            path: "$purchaseSummary",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $project: {
            _id: 0,
            customerId: "$_id",
            customerName: "$name",
            totalOrders: {
                $ifNull: ["$purchaseSummary.totalOrders", 0]
            },
            totalQuantity: {
                $ifNull: ["$purchaseSummary.totalQuantity", 0]
            },
            totalSpent: {
                $ifNull: ["$purchaseSummary.totalSpent", 0]
            }
        }
    },
    {
        $sort: {
            totalSpent: -1
        }
    }
]);