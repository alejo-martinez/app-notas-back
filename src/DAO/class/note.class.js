import { noteModel } from "../models/note.model.js";

export default class NoteManager {
    async get(){
        try {
            return await noteModel.find().lean();
        } catch (error) {
            return error;
        }
    }

    async getById(id){
        try {
            return await noteModel.findOne({_id: id}).lean().populate('share_with.user');
        } catch (error) {
            return error;
        }
    }

    async create(note){
        try {
            return await noteModel.create(note);
        } catch (error) {
            return error;
        }
    }

    async updateTitle(id, title){
        try {
            return await noteModel.updateOne({_id:id}, {$set:{title: title}});
        } catch (error) {
            return error;
        }
    }

    async updateContent(id, content){
        try {
            return await noteModel.updateOne({_id:id}, {$set:{content: content}});
        } catch (error) {
            return error;
        }
    }

    async deleteNote(id){
        try {
            return await noteModel.deleteOne({_id:id});
        } catch (error) {
            return error;
        }
    }
}