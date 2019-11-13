// src/services/pokemon.service.ts

import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "./config";
import { User } from "./models/user.model";

// For encrypting passwords
const bcrypt = require("bcrypt");
const saltRounds = 10;
//

export class UserService {

    // Get all users
    public getAllUsers(req: Request, res: Response) {
        User.findAll()
            .then(users => res.status(200).json(users))
            .catch(err => res.send(err));
    }

    // Add new user
    public async addNewUser(req: Request, res: Response) {
        req.body.username = req.body.username.toLowerCase();
        req.body.hash = bcrypt.hashSync(req.body.hash, saltRounds); // Hash plaintext password
        console.log(req.body);
        User.create(req.body)
            .then((user: User) => res.status(200).json(user))
            .catch(err => res.send(err)); // Create and user object
    }

    // Update general user information such as caught pokemon and display name
    public updateUser(req: Request, res: Response) {
        const user = req.body;
        User.update(user,
            {
                where: {
                    id: user.id,
                    username: user.username
                },
                returning: true
            })
            .then(updates => res.status(200).json(updates[1][0])) // updates is an array of 1) the amount of rows updated (index 0) and 2) the updated rows (index 1)
            .catch(err => res.send(err));
    }

    // Update user password
    public updateHash(req: Request, res: Response) {
        req.body.hash = bcrypt.hashSync(req.body.hash, saltRounds);
        const user = req.body;
        User.update(user,
            {
                where: {
                    id: user.id,
                    username: user.username
                },
                fields: ["hash"],
                returning: true
            })
            .then(updates => res.status(200).json(updates[1][0])) // updates is an array of 1) the amount of rows updated (index 0) and 2) the updated rows (index 1)
            .catch(err => res.send(err));
    }

    // Get user from db and check password. If matching, send jwt token
    public login(req: Request, res: Response) {
        let { username, hash } = req.body;
        
        // Check if username & password are set
        if ( !(username && hash) ) {
            res.sendStatus(400);
            return;
        }

        username = username.toLowerCase();
        
        // Get user from db
        const user = User.findOne({ where: { username }})
            .then((userDoc) => {
                // Return if user does not exist
                if (!userDoc) {
                    res.sendStatus(401);
                    return;
                }

                // Compare hashed password to plaintext password in request
                const user: any = Object.assign(userDoc.toJSON());
                
                const passMatch = bcrypt.compareSync(hash, user.hash);

                // Return if hashed password !== plaintext password
                if (!passMatch) {
                    res.sendStatus(401);
                    return;
                }

                // Create and send jwt token if passwords match
                user.token = jwt.sign( {username: user.username}, config.secret, {expiresIn: '1y'} );
                res.status(200).send(user);
            })
            .catch(err => res.send(err));
    }

}