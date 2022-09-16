// GET /markets

/*
    {
        status: 200,
        data: [
            {
                id: 1,
                name: 'Korzinka'
            },
            {
                id: 2,
                name: 'Makro'
            }
        ]
    }
*/

// GET /markets/1

/* 
    If not 

    {
        status: 400,
        message: "Market not found"
    }
*/ 

/* 
    {
        status: 200,
        data: {
                id: 1,
                name: 'Korzinka',
                branches: [
                    {
                        id: 1,
                        name: "Korzinka Olmazor",
                        workers: [
                            {
                                id: 1,
                                name: "Eshmat",
                                age: 40,
                                experience: 5,
                                salary: "2 000 000"
                            }
                        ],
                        products: [
                            {
                                id: 1,
                                name: "Kola",
                                price: "10 000"
                            }
                        ]
                    }
                ]
            }
    }
*/ 

// GET /products/1

// GET /workers/1

// POST /market

/* 
    {
        name: "Korzinka"
    }
*/

// POST /branch

/* 
    {
        name: "Korzinka chorsu",
        marketId: 1
    }
*/

// POST /products

/* 
    {
        name: "Kiyim",
        price: "200 000"
        branchId: 1
    }
*/

// POST /workers

/* 
    {
        name: "Kiyim",
        age: 26,
        experience: 10,
        salary: "2 000 000"
        branchId: 1
    }
*/

// PUT markets/1

/* 
    {
        name: "Havas"
    }
*/

// DELETE markets/1