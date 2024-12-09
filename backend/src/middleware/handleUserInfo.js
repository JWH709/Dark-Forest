const { connection } = require("../db/connection");

const updateUserInfo = (user) => {
  const queryUpdate = `UPDATE users
                       SET cognito_username = ?, cognito_email = ?, cognito_email_verified = ?
                       WHERE user_id = ?`;
  connection.query(
    queryUpdate,
    [user.username, user.email, user.status, user.sub],
    (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
      } else {
        console.log("User updated successfully:", results);
      }
    }
  );
};

createUserInfo = (user) => {
    const queryInsert = `INSERT INTO users (user_id, cognito_username, cognito_email, cognito_email_verified) 
                         VALUES (?, ?, ?, ?)`;
      connection.query(
        queryInsert,
        [user.sub, user.username, user.email, user.status],
        (error, results) => {
          if (error) {
            console.log("Error creating user: ", error);
          } else {
            console.log("New user created: ", results);
          }
        }
      );
    
}

const handleUserInfo = (user) => {
  const queryCheck = `SELECT * FROM users WHERE user_id = ?`;
  connection.query(queryCheck, [user.sub], (error, results) => {
    if (error) {
      console.error("Error checking for existing error");
      return
    }

    if (results.length > 0) {
        updateUserInfo(user)
        return
    } else {
        createUserInfo(user)
        return
    }

  });
};

module.exports = { handleUserInfo }