const authService = require("../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        status: "success",
        ...result,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async verifyEmail(req, res) {
    try {
      const result = await authService.verifyEmail(req.params.token);
      res.send(`
        <html>
          <head>
            <title>Email Verification</title>
          </head>
          <body>
            <h1>Email Verification</h1>
            <p>Status: Success</p>
            <p>${result.message}</p>
          </body>
        </html>
      `);
    } catch (error) {
      res.status(400).send(`
        <html>
          <head>
            <title>Email Verification</title>
          </head>
          <body>
            <h1>Email Verification Failed</h1>
            <p>Status: Error</p>
            <p>${error.message}</p>
          </body>
        </html>
      `);
    }
  }

  async users(req, res) {
    try {
      const users = await authService.getUsers();
      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
