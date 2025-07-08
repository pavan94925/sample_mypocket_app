const { mypocket_info } = require('../model/Db')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'
const bcrypt = require('bcryptjs')

module.exports = {
  //  Register user
  async createmypocketinfo(req, res) {
    try {
      const { fullname, password } = req.body
      const email = req.body.email.toLowerCase() 

      const existingUser = await mypocket_info.findOne({
        where: { email },
      })

      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'User already registered with this email.' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await mypocket_info.create({
        fullname,
        email,
        password: hashedPassword,
      })

      res.status(201).json({
        message: 'Registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          fullname: newUser.fullname,
        },
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  //  Login user
  async loginmypocketinfo(req, res) {
    try {
      const password = req.body.password
      const email = req.body.email.toLowerCase()

      const user = await mypocket_info.findOne({ where: { email } })

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' })

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
        },
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  //  Forgot Password
  async forgotPassword(req, res) {
    try {
      const { email, newPassword } = req.body
      const lowerEmail = email.toLowerCase()

      // Check if user exists
      const user = await mypocket_info.findOne({ where: { email: lowerEmail } })

      if (!user) {
        return res.status(404).json({ message: 'Email not found' })
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Update user password
      await user.update({ password: hashedPassword })

      res.status(200).json({ message: 'Password reset successful' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  //  Read all users
  async getmypocketinfo(req, res) {
    try {
      const read = await mypocket_info.findAll(req.body)
      res.status(200).json(read)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  //  Read user by ID
  async getbyidmypocketinfo(req, res) {
    try {
      const user = await mypocket_info.findByPk(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },
}
