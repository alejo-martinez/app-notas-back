export default class noteDTO {
    constructor(title, content, userID, fecha, users){
        this.title = title;
        this.content = content;
        this.created_by = userID;
        this.created_at = fecha;
        this.share_with = users;
    }
}