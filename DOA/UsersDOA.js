const pool = require('../index'); 

const User = {
  getAll: async () => {
    const result = await pool.query("SELECT user_id, email, username FROM users");
    return result.rows;
  },

 
  getById: async (id) => {
    const result = await pool.query(
      "SELECT user_id, email, username FROM users WHERE user_id = $1",
      [id]
    );
    return result.rows[0]; 
  },

  create: async ({ user_id, email, password_hash, username }) => {
    const result = await pool.query(
      "INSERT INTO users (user_id, email, password_hash, username) VALUES ($1, $2, $3, $4) RETURNING user_id, email, username",
      [user_id, email, password_hash, username]
    );
    return result.rows[0]; 
  },

  update: async (id, { email, password_hash, username }) => {
    const result = await pool.query(
      `UPDATE users
       SET email = $1,
           password_hash = $2,
           username = $3
       WHERE user_id = $4
       RETURNING user_id, email, username`,
      [email, password_hash, username, id]
    );
    return result.rows[0]; // Return the updated user
  },
  


  delete: async (id) => {
    const result = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING user_id", [id]);
    return result.rows[0]; 
  }
};

module.exports = User;