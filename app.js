const express = require('express');
const customerRoute = require('./routes/customerRoutes')
const productRoute = require('./routes/productRoutes')
const departmentRoute = require('./routes/departmentRoutes')
const supplierRoute = require('./routes/supplierRoutes')
const employeeRoute = require('./routes/employeeRoutes')
const userRoute = require('./routes/userRoutes')
const permissionRoute = require('./routes/permissionRoutes')
const errorHadnler = require('./controllers/errorController');
const { protectedRoute, permissions } = require('./utils/Auth');
const { signIn } = require('./controllers/userController');

const app = express();

//#region  MiddleWares..
app.use(express.json());
//#endregion


//#region Routes..
app.post(`${process.env.root}/auth/signIn`,signIn);
app.use(`${process.env.root}/auth/permissions`,permissionRoute);
app.use(protectedRoute,permissions);


app.use(`${process.env.root}/customers`,customerRoute);
app.use(`${process.env.root}/employees`,employeeRoute);
app.use(`${process.env.root}/products`,productRoute);
app.use(`${process.env.root}/departments`,departmentRoute);
app.use(`${process.env.root}/suppliers`,supplierRoute);
app.use(`${process.env.root}/users`,userRoute);
app.use('*',(req, res) => {
    res
        .status(404)
        .json({
            status: 'fail',
            reason: `Could not found ${req.originalUrl} 😪`
        })
})

app.use(errorHadnler)
//#endregion


module.exports = app;