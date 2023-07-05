import { userModel } from "../models/user.model.js"

export default class UserManager {
    async get(){
        try {
            return await userModel.find().lean();
        } catch (error) {
            return error;
        }
    }

    async getByID(id){
        try {
            return await userModel.findOne({_id: id}).populate('share_with.user');
        } catch (error) {
            return error;
        }
    }

    async getByEmail(userEmail){
        try {
            return await userModel.findOne({email: userEmail}).lean();
        } catch (error) {
            return error;
        }
    }

    async getByNickname(nick){
        try {
            return await userModel.findOne({nickname: nick}).lean();
        } catch (error) {
            return error;
        }
    }

    async create(user){
        try {
            return await userModel.create(user);
        } catch (error) {
            return error;
        }
    }
}