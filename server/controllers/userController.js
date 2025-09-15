const { User } = require('../models/models');

class UserController {
    async register(req, res) {
        const { email, password } = req.body;
        const candidate = await User.findOne({ where: { email } }); 
        if (candidate) {
            return res.status(400).json({ message: `User with email ${email} already exists` });
        }       
        const user = await User.create({ email, password });
        return res.json(user);
    }
    async login(req, res) { 
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });  
        if (!user) {
            return res.status(400).json({ message: `User with email ${email} not found` });
        }
        return res.json({ message: "Login successful" });

    }
    async check(req, res) {
        return res.json({ message: "User is authenticated" });
    }

    async updateUser(req, res) {
    try {
      const { id } = req.params; // id пользователя из URL
      const { name, email, phone, address } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // обновляем поля
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.phone = phone ?? user.phone;
      user.address = address ?? user.address;

      await user.save();

      return res.json({ message: 'User updated', user });
    } catch (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ message: 'Error updating user', error: err.message });
    }
  }

}
module.exports = new UserController();
