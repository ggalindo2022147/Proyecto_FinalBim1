'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import { adminDefault } from '../src/admin/admin.controller.js'
import { categoryDefault } from '../src/category/category.controller.js'
import authRoutes from '../src/auth/auth.routes.js';
import clientRoutes from '../src/client/client.routes.js';
import productRoutes from '../src/product/product.routes.js';
import categoryRoutes from '../src/category/category.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/onlineSales/v2/auth';
        this.clientPath = '/onlineSales/v2/client';
        this.productPath = '/onlineSales/v2/product';
        this.categoryPath = '/onlineSales/v2/category';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
        await adminDefault();
        await categoryDefault();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.clientPath, clientRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;