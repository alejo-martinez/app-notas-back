import utils from "../../utils/utils.js";

export default class userDTO{
    constructor(name, last_name, nickname, email, password){
        this.name = name;
        this.last_name = last_name;
        this.nickname = nickname;
        this.email = email;
        this.password = utils.createHash(password);
    }
}