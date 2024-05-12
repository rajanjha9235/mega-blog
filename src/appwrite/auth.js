import conf from '../conf/conf.js'

import {Client, Account, ID} from 'appwrite'

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Create a new account
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if (userAccount){
                // call another method to create a profile
            }
            else{
                return;
            }
        }
        catch(error){
            throw error;
        }
    }

    // Login to an existing account
    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            throw error;
        }
        return null;
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;