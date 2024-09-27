const db = require("../models");
const { TEAM } = require("../utils/constants");
const Team = db.Team;
const User = db.User;

class AuthService {
    async registerUser(name, surname, email, password) {
        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: "Email already exists" });
            }

            const invite = await Invite.findOne({
                where: { invitedEmail: email }
            })
            if(!invite) {
                return res.status(400).json({ error: "No invite" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, surname, email, password: hashedPassword });
            
            return newUser;
        }
        catch(err) {
            throw new Error("Error registering user");
        }
    }
    async loginUser() {
        try {
            
        }
        catch(err) {
            throw new Error("");
        }
    }
    async forgetPassword() {
        try {
            
        }
        catch(err) {
            throw new Error("");
        }
    }
    async resetPassword() {
        try {
            
        }
        catch(err) {
            throw new Error("");
        }
    }
    async deleteUser() {
        try {
            
        }
        catch(err) {
            throw new Error("");
        }
    }
}

module.exports = AuthService;
