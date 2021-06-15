const productsCtrl = {
    getProducts: (req, res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM product', (err, products) => {
                if(err) {
                    res.json(err)
                }
                res.render('products', {
                    data: products
                })
            })
        })
    },
    createProduct: (req, res) => {
        const data = req.body;

        req.getConnection((err, conn) => {
            conn.query('INSERT INTO product set ?', [data], (err, product) => {
                res.redirect('/')
            })
        })
    },
    getProduct: (req, res) => {
        const { id } = req.params;
    
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM product WHERE id = ?', [id], (err, rows) => {
                res.render('products_edit', {
                    data: rows[0]
                })
            })
        })
    },
    updateProduct: (req, res) => {
        const { id } = req.params;
        const newProduct = req.body;
        req.getConnection((err, conn) => {
            conn.query('UPDATE product set ? WHERE id = ?', [newProduct, id], (err, rows) => {
                res.redirect('/')
            })
        })
    },
    deleteProduct: (req, res) => {
        const { id } = req.params;

        req.getConnection((err, conn) => {
            conn.query('DELETE FROM product WHERE id = ?', [id], (err, rows) => {
                res.redirect('/')
            })
        })
    },
}

module.exports = productsCtrl